import { createClient } from "@/lib/supabase/server";
import { FALLBACK_COURSES } from "@/data/courses-fallback";
import type { CourseRow, LessonRow } from "@/types/database";

export type CourseWithLessons = CourseRow & { lessons: LessonRow[] };

function mergeWithFallback(courses: CourseWithLessons[]) {
  const existingSlugs = new Set(courses.map((course) => course.slug));
  const missing = FALLBACK_COURSES.filter((course) => !existingSlugs.has(course.slug));
  return [...courses, ...missing].sort((a, b) => a.order_index - b.order_index);
}

function hasSupabaseEnv() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getCoursesWithLessons(): Promise<CourseWithLessons[]> {
  if (!hasSupabaseEnv()) {
    return FALLBACK_COURSES;
  }
  try {
    const supabase = await createClient();
    const { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .order("order_index", { ascending: true });
    if (error || !courses?.length) {
      return FALLBACK_COURSES;
    }
    const { data: lessons, error: le } = await supabase
      .from("lessons")
      .select("*")
      .order("order_index", { ascending: true });
    if (le || !lessons) {
      return FALLBACK_COURSES;
    }
    const byCourse = new Map<string, LessonRow[]>();
    for (const l of lessons as LessonRow[]) {
      const arr = byCourse.get(l.course_id) ?? [];
      arr.push(l);
      byCourse.set(l.course_id, arr);
    }
    const rows = (courses as CourseRow[]).map((c) => ({
      ...c,
      lessons: byCourse.get(c.id) ?? [],
    }));
    return mergeWithFallback(rows);
  } catch {
    return FALLBACK_COURSES;
  }
}

export async function getCourseBySlug(slug: string): Promise<CourseWithLessons | null> {
  const all = await getCoursesWithLessons();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getLessonBySlugs(
  courseSlug: string,
  lessonSlug: string
): Promise<{ course: CourseWithLessons; lesson: LessonRow } | null> {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;
  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { course, lesson };
}

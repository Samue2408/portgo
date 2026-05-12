import { getProfile } from "@/services/profile.service";
import { getCoursesWithLessons } from "@/services/courses.service";
import { getProgressForUser } from "@/services/progress.service";
import {
  getRecentQuizResults,
  getQuizResultsSince,
  getQuizResultsCount,
} from "@/services/quiz-results.service";
import { getShipmentsForUser } from "@/services/shipments.service";
import type { ProfileRow, QuizResultRow, ShipmentRow, ProgressRow } from "@/types/database";
import type { CourseWithLessons } from "@/services/courses.service";
import { buildQuizActivityByMonth, sixMonthsAgoIso, type ChartPoint } from "@/utils/dashboard-chart-data";
import { formatRelativeEs } from "@/lib/format-relative-es";
import { quizIdToLabel } from "@/data/quiz-labels";

export type DashboardActivity = {
  id: string;
  text: string;
  time: string;
  sortKey: number;
};

export type DashboardSnapshot = {
  displayName: string;
  email: string;
  memberSinceLabel: string | null;
  profile: ProfileRow | null;
  courses: CourseWithLessons[];
  avgProgress: number;
  quizTotal: number;
  shipmentCount: number;
  lessonTotal: number;
  chartData: ChartPoint[];
  chartHasRealData: boolean;
  activities: DashboardActivity[];
  shipments: ShipmentRow[];
  progressByCourseId: Record<string, number>;
};

function courseTitle(courses: CourseWithLessons[], courseId: string) {
  return courses.find((c) => c.id === courseId)?.title ?? "Curso";
}

export async function getDashboardSnapshot(
  userId: string,
  email: string | null,
  authCreatedAt: string | undefined
): Promise<DashboardSnapshot> {
  const since = sixMonthsAgoIso();
  const [profile, courses, progressRows, recentQuizzes, chartQuizzes, quizTotal, shipments] = await Promise.all([
    getProfile(userId),
    getCoursesWithLessons(),
    getProgressForUser(userId),
    getRecentQuizResults(userId, 15),
    getQuizResultsSince(userId, since),
    getQuizResultsCount(userId),
    getShipmentsForUser(userId),
  ]);

  const displayName = profile?.full_name?.trim() || email?.split("@")[0] || "Usuario";
  const memberSince =
    profile?.created_at && !Number.isNaN(new Date(profile.created_at).getTime())
      ? profile.created_at
      : authCreatedAt;

  const progressByCourseId = Object.fromEntries(
    (progressRows as ProgressRow[]).map((p) => [p.course_id, p.progress_percentage])
  ) as Record<string, number>;

  const progressByCourse = new Map(progressRows.map((p) => [p.course_id, p.progress_percentage]));
  const avgProgress =
    courses.length === 0
      ? 0
      : Math.round(
          courses.reduce((acc, c) => acc + (progressByCourse.get(c.id) ?? 0), 0) / courses.length
        );

  const lessonTotal = courses.reduce((n, c) => n + c.lessons.length, 0);
  const chartData = buildQuizActivityByMonth(chartQuizzes as QuizResultRow[]);
  const chartHasRealData = chartQuizzes.length > 0;

  const activities: DashboardActivity[] = [];

  for (const q of recentQuizzes as QuizResultRow[]) {
    activities.push({
      id: `quiz-${q.id}`,
      text: `Completaste «${quizIdToLabel(q.quiz_id)}» — ${q.score}/${q.max_score}`,
      time: formatRelativeEs(q.completed_at),
      sortKey: new Date(q.completed_at).getTime(),
    });
  }

  for (const p of progressRows as ProgressRow[]) {
    activities.push({
      id: `prog-${p.course_id}-${p.updated_at}`,
      text: `Progreso en «${courseTitle(courses, p.course_id)}»: ${p.progress_percentage}%`,
      time: formatRelativeEs(p.updated_at),
      sortKey: new Date(p.updated_at).getTime(),
    });
  }

  activities.sort((a, b) => b.sortKey - a.sortKey);
  const topActivities = activities.slice(0, 10);

  return {
    displayName,
    email: email ?? "",
    memberSinceLabel: memberSince ? new Date(memberSince).toLocaleDateString("es", { month: "long", year: "numeric" }) : null,
    profile,
    courses,
    avgProgress,
    quizTotal,
    shipmentCount: shipments.length,
    lessonTotal,
    chartData,
    chartHasRealData,
    activities: topActivities,
    shipments,
    progressByCourseId,
  };
}

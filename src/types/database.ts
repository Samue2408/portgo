export type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type CourseRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  slug: string;
  order_index: number;
  created_at: string;
};

export type LessonRow = {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  content_json: Record<string, unknown>;
  order_index: number;
};

export type ProgressRow = {
  id: string;
  user_id: string;
  course_id: string;
  progress_percentage: number;
  updated_at: string;
};

export type QuizResultRow = {
  id: string;
  user_id: string;
  quiz_id: string;
  course_id: string | null;
  score: number;
  max_score: number;
  completed_at: string;
};

export type ShipmentRow = {
  id: string;
  user_id: string;
  tracking_code: string;
  origin: string | null;
  destination: string | null;
  status: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

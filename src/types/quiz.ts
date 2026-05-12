export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
};

export type QuizDefinition = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

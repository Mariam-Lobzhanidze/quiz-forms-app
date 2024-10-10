export type QuestionState = "PRESENT_REQUIRED" | "PRESENT_OPTIONAL";

export interface Question {
  title: string;
  description: string;
  id: string;
  type: string;
  state: QuestionState;
  text: string;
  options?: string[];
}

export interface Template {
  title: string;
  description: string;
  /*

  imageUrl: string;
  userId: number;
  topicId: number;
   */
  questions: Question[];
}

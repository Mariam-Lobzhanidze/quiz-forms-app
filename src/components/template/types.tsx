type QuestionState = "NOT_PRESENT" | "PRESENT_OPTIONAL" | "PRESENT_REQUIRED";

export interface Template {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userId: number;
  topicId: number;

  checkbox1_question_state: QuestionState;
  checkbox1_question_text: string | null;
  checkbox1_question_options: string[] | null;

  checkbox2_question_state: QuestionState;
  checkbox2_question_text: string | null;
  checkbox2_question_options: string[] | null;

  checkbox3_question_state: QuestionState;
  checkbox3_question_text: string | null;
  checkbox3_question_options: string[] | null;

  checkbox4_question_state: QuestionState;
  checkbox4_question_text: string | null;
  checkbox4_question_options: string[] | null;
}

export interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "admin" | "user";
}

export interface LoginForm {
  email: string;
  password: string;
}

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
  userId?: number;
  /*

  imageUrl: string;
  userId: number;
  topicId: number;
   */
  questions: Question[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  templates: Template[];
  role: "admin" | "user";
  status: "active" | "blocked";
  profile_image_url?: string | null;
  language?: string;
  theme?: "light" | "dark";
}
//may need change
export interface LoginResponse {
  token: string;
  user: User;
}

export interface UsersData {
  users: User[];
  limit: number;
  page: number;
  totalUsers: number;
}

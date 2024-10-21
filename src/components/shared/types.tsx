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
export interface Option {
  id: string;
  value: string;
}
export interface Question {
  title: string;
  description: string;
  id: string;
  type: string;
  state: QuestionState;
  text: string;
  options?: Option[];
}

export interface Template {
  id: string;
  title: string;
  description: string;
  userId?: string;
  questions: Question[];
  accessSettings?: "PUBLIC" | "PRIVATE" | string[];
  likesCount?: number;
  commentsEnabled?: boolean;
  topicId?: number;
  imageUrl: string;
  imagePublicId: string;
  date: Date;
}

export interface templateResponse {
  data: Template;
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

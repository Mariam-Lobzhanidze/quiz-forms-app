export interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "Admin" | "user";
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

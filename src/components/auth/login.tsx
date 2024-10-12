import { SubmitHandler, useForm } from "react-hook-form";
import { LoginForm } from "../shared/types";
import AuthLink from "../shared/authlink";
import httpClient from "../../axios";
import { emailPattern } from "../../validation/patterns";
import { useAuth } from "../../context/authContext";
import { useAuthErrors } from "./useAuthErrors";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();

  const { login } = useAuth();
  const { handleAuthError } = useAuthErrors(setError);

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    try {
      const response = await httpClient.post("/login", data);
      const { token, user } = response.data;
      login(token, user);
    } catch (error: unknown) {
      handleAuthError(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6" style={{ maxWidth: "400px" }}>
          <form id="login-form" className="form shadow px-4 py-4 rounded" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center mb-4">Login</h3>

            <div className="form-group mb-3">
              <input
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailPattern,
                    message: "Invalid email address",
                  },
                })}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="form-group mb-4">
              <input
                placeholder="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-4">
              Submit
            </button>
            <AuthLink text="Don't have an account?" linkText="Create one" linkTo="/register" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

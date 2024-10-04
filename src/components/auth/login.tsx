import { useForm } from "react-hook-form";
import { LoginForm } from "./types";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6" style={{ maxWidth: "400px" }}>
          <form id="login-form" className="form shadow px-4 py-4 rounded" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center mb-4">Login</h3>

            <div className="form-group mb-3">
              <input
                placeholder="Username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
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

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

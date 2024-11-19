/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegistrationForm } from "../shared/types";
import AuthLink from "../shared/authlink";
import { emailPattern } from "../../validation/patterns";
import httpClient from "../../axios";
import { useNavigate } from "react-router-dom";
import { useAuthErrors } from "./useAuthErrors";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<RegistrationForm>();

  const navigate = useNavigate();
  const { handleAuthError } = useAuthErrors(setError);

  const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
    try {
      const { confirmPassword, ...dataForRegister } = data;
      const response = await httpClient.post("/register", dataForRegister);

      navigate("/login");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const password = watch("password");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6" style={{ maxWidth: "400px" }}>
          <form
            id="register-form"
            className="form shadow px-4 py-4 rounded"
            onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center mb-4">Register</h3>

            <div className="form-group mb-3">
              <input
                placeholder="Username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

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
                {...register("password", {
                  required: "Password is required",
                })}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="form-group mb-4">
              <input
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-4">
              Submit
            </button>

            <AuthLink text="Already have an account?" linkText="Login" linkTo="/login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useForm } from "react-hook-form";
import { Template } from "./types";
import { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "./questionsComponents/checkbox";

const TemplateForm: React.FC = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState("Short answer");
  const options = ["Short answer", "Paragraph", "Checkboxes", "Multiple choice"];

  const {
    register,
    handleSubmit,
    formState: { errors },

    // watch,
  } = useForm<Template>();

  const onSubmit = (data: Template) => {
    console.log(data);
  };

  return (
    <div className="container" data-bs-theme={"light"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-start border-secondary border-5 rounded p-3 shadow-sm">
          <div className="mb-3">
            <input
              placeholder="title"
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>

          <div className="mb-3">
            <textarea
              placeholder="description"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              id="description"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>
        </div>

        <hr />
        <div className="container border-start border-secondary border-5 rounded p-3 shadow-sm">
          <div className="d-flex gap-3 align-items-center flex-column flex-lg-row">
            <input type="text" className="form-control" placeholder="Question" aria-label="question" />
            <div className="dropdown">
              <button
                style={{ minWidth: "180px" }}
                className="btn btn-secondary dropdown-toggle d-flex gap-3 align-items-center justify-content-between"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                {selectedQuestionType}
                <i className="bi bi-caret-down-fill fs-6"></i>
              </button>
              <ul className="dropdown-menu">
                {options.map((option) => (
                  <li key={option}>
                    <Link
                      className={`dropdown-item ${selectedQuestionType === option ? "active" : ""}`}
                      to="#"
                      onClick={() => setSelectedQuestionType(option)}>
                      {option}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {selectedQuestionType === "Checkboxes" && (
            <div>
              <Checkbox />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;

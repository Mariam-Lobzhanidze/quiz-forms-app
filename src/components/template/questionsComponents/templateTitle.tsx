import { Template } from "../../shared/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TemplateTitleProps {
  register: UseFormRegister<Template>;
  errors: FieldErrors<Template>;
}

const TemplateTitle: React.FC<TemplateTitleProps> = ({ register, errors }) => {
  return (
    <div className="border-start border-secondary border-5 rounded p-3 shadow-sm w-100">
      <div className="mb-3">
        <input
          placeholder="Title"
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
      </div>

      <div className="mb-3">
        <textarea
          placeholder="Description"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          id="description"
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
      </div>
    </div>
  );
};

export default TemplateTitle;

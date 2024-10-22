/* eslint-disable @typescript-eslint/no-unused-vars */
import { Control, FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form";
import { Template } from "../../shared/types";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

interface QuestionOptionsProps {
  register: UseFormRegister<Template>;
  errors: FieldErrors<Template>;
  questionIndex: number;
  control: Control<Template>;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({ register, errors, questionIndex, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const addNewOption = () => {
    append({ id: uuidv4(), value: "" });
  };

  const loadDefaultOption = () => {
    if (fields.length === 0) {
      append({ id: uuidv4(), value: "" });
    }
  };

  useEffect(() => {
    loadDefaultOption();
  }, []);

  return (
    <div className="mt-2 d-flex flex-column gap-3">
      {fields.map((field, index) => (
        <div className="input-group d-flex flex-column gap-1 position-relative mb-3" key={field.id}>
          <div className="d-flex gap-2 align-items-center">
            <i className="bi bi-app fs-5"></i>
            <input
              type="text"
              className={`form-control form-control-sm bg-transparent ${
                errors.questions?.[questionIndex]?.options?.[index] ? "is-invalid" : ""
              }`}
              placeholder="Option"
              {...register(`questions.${questionIndex}.options.${index}.value`, {
                required: "Option is required",
              })}
            />
            <i className="bi bi-x-lg" onClick={() => remove(index)}></i>
          </div>
          {errors.questions?.[questionIndex]?.options?.[index] && (
            <div className="invalid-feedback position-absolute" style={{ bottom: "-22px", left: "28px" }}>
              {errors.questions[questionIndex].options[index]?.value?.message}
            </div>
          )}
        </div>
      ))}
      <div className="input-group mb-3 w-50">
        <input
          type="text"
          className="form-control border-0 border-bottom bg-transparent"
          placeholder="Add option"
          onClick={addNewOption}
        />
      </div>
    </div>
  );
};

export default QuestionOptions;

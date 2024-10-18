import { useFieldArray, useForm } from "react-hook-form";
import { Question, Template } from "../shared/types";
import { Link } from "react-router-dom";
import QuestionOptions from "./templateComponents/questionOptions";
import TemplateTitle from "./templateComponents/templateTitle";
import AnswersPlaceholder from "./templateComponents/answerPlaceholder";
import { QuestionType } from "../../enums/questionTypes";
import { useAuth } from "../../context/authContext";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import httpClient from "../../axios";

const TemplateForm: React.FC = () => {
  const questionTypes = Object.values(QuestionType);
  const [skipStorage, setSkipStorage] = useState(false);
  const { activeUser } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<Template>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const formData = watch();

  useEffect(() => {
    const storedTemplate = localStorage.getItem(`templateFormData_${activeUser?.id}`);
    if (storedTemplate) {
      reset(JSON.parse(storedTemplate));
    }
  }, [reset, activeUser?.id]);

  useEffect(() => {
    if (!skipStorage) {
      localStorage.setItem(`templateFormData_${activeUser?.id}`, JSON.stringify(formData));
    } else {
      localStorage.removeItem(`templateFormData_${activeUser?.id}`);
    }
  }, [formData, activeUser?.id, skipStorage]);

  const onSubmit = async (data: Template) => {
    const templateData = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      userId: activeUser?.id,
      date: new Date(),
      questions: data.questions,
    };

    console.log(templateData);

    try {
      const response = await httpClient.post("/templates", templateData);
      console.log(response.data);
      setSkipStorage(true);
      reset({
        title: "",
        description: "",
        questions: [],
      });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const currentQuestion = getValues(`questions.${index}`);

    if (updates.type && updates.type !== "Checkboxes") {
      delete currentQuestion.options;
    }

    setValue(`questions.${index}`, {
      ...currentQuestion,
      ...updates,
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-5 mb-5">
        <TemplateTitle register={register} errors={errors} />

        {fields.map((question, index) => {
          const questionType = getValues(`questions.${index}.type`);

          const options = [
            { value: "PRESENT_REQUIRED", label: "Required", id: `required-${question.id}` },
            { value: "PRESENT_OPTIONAL", label: "Optional", id: `optional-${question.id}` },
          ];

          return (
            <div key={question.id} className="container border-start border-5 rounded p-3 shadow-sm">
              <div className="d-flex gap-3 mb-4">
                <input
                  type="text"
                  className="form-control form-control-sm w-25 custom-border bg-transparent"
                  placeholder="Question title"
                  {...register(`questions.${index}.title`)}
                />
                <input
                  type="text"
                  className="form-control form-control-sm custom-border bg-transparent"
                  placeholder="Question description"
                  {...register(`questions.${index}.description`)}
                />
              </div>

              <div className="d-flex gap-3 align-items-center flex-column flex-lg-row mb-5">
                <div className="position-relative w-100">
                  <input
                    {...register(`questions.${index}.text`, { required: "Question text is required" })}
                    placeholder="Question text"
                    className={`form-control bg-transparent ${
                      errors.questions?.[index]?.text ? "is-invalid" : ""
                    }`}
                  />
                  {errors.questions?.[index]?.text && (
                    <div className="invalid-feedback position-absolute" style={{ bottom: "-1.5rem" }}>
                      {errors.questions[index].text.message}
                    </div>
                  )}
                </div>

                <div className="dropdown">
                  <button
                    id="dropdownMenuButton"
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown">
                    {questionType || "Select type"}
                  </button>
                  <ul className="dropdown-menu">
                    {questionTypes.map((option) => (
                      <li key={option}>
                        <Link
                          className={`dropdown-item ${questionType === option ? "active" : ""}`}
                          to="#"
                          onClick={() => {
                            updateQuestion(index, { type: option });
                          }}>
                          {option}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {questionType === "Checkboxes" && (
                <QuestionOptions
                  register={register}
                  questionIndex={index}
                  errors={errors}
                  control={control}
                />
              )}

              {questionType !== "Checkboxes" && (
                <AnswersPlaceholder placeholderText={`${questionType} answer`} />
              )}

              <div className="d-flex align-items-center gap-3 mt-4">
                <div className="d-flex align-items-center gap-3 mt-4 w-100 justify-content-between">
                  <div className="d-flex gap-3 align-items-center">
                    {options.map((option) => (
                      <div className="form-check" key={option.id}>
                        <input
                          {...register(`questions.${index}.state`)}
                          className="form-check-input"
                          type="radio"
                          name={`questions.${index}.state`}
                          id={option.id}
                          value={option.value}
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <i className="bi bi-trash3 fs-4" onClick={() => remove(index)}></i>
                </div>
              </div>
            </div>
          );
        })}

        <button type="submit" className="btn btn-primary mt-4 align-self-end">
          Save
        </button>
      </form>

      <div style={{ position: "fixed", bottom: "10%", left: "100px" }}>
        <i
          title="Add question"
          className="bi bi-plus-circle fs-3"
          onClick={() =>
            append({
              title: "",
              description: "",
              id: uuidv4(),
              type: "Checkboxes",
              state: "PRESENT_REQUIRED",
              text: "",
              options: [],
            })
          }></i>{" "}
      </div>
    </div>
  );
};

export default TemplateForm;

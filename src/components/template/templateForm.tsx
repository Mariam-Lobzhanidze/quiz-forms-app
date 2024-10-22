/* eslint-disable @typescript-eslint/no-unused-vars */
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
import ImageUploadModal from "./templateComponents/imageUploadModal";
import TemplateImage from "./templateComponents/templateImage";
import { base64ToBlob } from "base64-blob";
import { uploadImageOnCloud } from "../../utils/imageUtils";
import ToastComponent from "../shared/toast";

const TemplateForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [templateId, setTemplateId] = useState<string>(uuidv4());

  const questionTypes = Object.values(QuestionType);
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
  } = useForm<Template>({
    defaultValues: {
      id: templateId,
      title: "",
      description: "",
      questions: [],
      imageUrl: imageSrc,
      imagePublicId: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const formData = watch();

  useEffect(() => {
    const storedTemplate = localStorage.getItem(`templateFormData_${activeUser?.id}`);

    if (storedTemplate) {
      const fromStorage = JSON.parse(storedTemplate);
      reset(fromStorage);
      setImageSrc(fromStorage.imageUrl);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`templateFormData_${activeUser?.id}`, JSON.stringify(formData));
  }, [formData]);

  const onSubmit = async (data: Template) => {
    setIsLoading(true);
    const uploadedImageData = await templateImageUpload(imageSrc);

    if (uploadedImageData) {
      setValue("imagePublicId", uploadedImageData.publicId);
      setValue("imageUrl", uploadedImageData.imageUrl);
    } else {
      console.error("Image upload failed.");
      return;
    }

    const templateData = {
      userId: activeUser?.id,
      date: new Date(),
      id: templateId,
      title: data.title,
      description: data.description,
      questions: data.questions,
      imageUrl: uploadedImageData.imageUrl,
      imagePublicId: uploadedImageData.publicId,
    };

    try {
      await httpClient.post("/templates", templateData);
      setIsLoading(false);
      setShowToast(true);

      resetForm();
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const resetForm = () => {
    localStorage.removeItem(`templateFormData_${activeUser?.id}`);
    setImageSrc("");

    const newTemplateId = uuidv4();
    setTemplateId(newTemplateId);

    setTimeout(() => {
      setShowToast(false);
    }, 5000);

    reset({
      id: newTemplateId,
      title: "",
      description: "",
      questions: [],
      imageUrl: "",
      imagePublicId: "",
    });
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

  const getTempLateImageData = (templateImage: string | null) => {
    if (templateImage) {
      setImageSrc(templateImage);
      setValue("imageUrl", templateImage);
    }
  };

  const templateImageUpload = async (image: string) => {
    try {
      const blob = await base64ToBlob(image);
      const data = await uploadImageOnCloud(blob);
      return data;
    } catch (error: unknown) {
      console.error("Error during image upload:");
      return null;
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-5 mb-5">
        <TemplateImage imgSrc={imageSrc} />
        <div className="z-3 d-flex gap-3 bg-light shadow-sm p-3 border-start border-5 rounded position-sticky top-30 start-0 controls">
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
          <i
            className="bi bi-image fs-3"
            title="Add image"
            data-bs-toggle="modal"
            data-bs-target="#templateImage"></i>
          <ImageUploadModal modalId="templateImage" onImageUpload={getTempLateImageData} />
          {showToast && <ToastComponent message="Template created successfully" show={showToast} />}
        </div>
        <TemplateTitle register={register} errors={errors} />

        {fields.map((question, index) => {
          const questionType = getValues(`questions.${index}.type`);

          const options = [
            { value: "PRESENT_REQUIRED", label: "Required", id: `required-${question.id}` },
            { value: "PRESENT_OPTIONAL", label: "Optional", id: `optional-${question.id}` },
          ];

          return (
            <div key={question.id} className="container border-start border-5 rounded p-3 shadow-sm">
              <div className="d-flex flex-column flex-lg-row gap-3 mb-4">
                <input
                  type="text"
                  className="form-control form-control-sm  custom-border bg-transparent"
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

              <div className="d-flex gap-3 flex-column align-items-center flex-lg-row mb-5">
                <div className="position-relative w-100">
                  <input
                    {...register(`questions.${index}.text`, { required: "Question text is required" })}
                    placeholder="Question text"
                    className={`form-control bg-transparent ${
                      errors.questions?.[index]?.text ? "is-invalid" : ""
                    }`}
                  />
                  {errors.questions?.[index]?.text && (
                    <div className="invalid-feedback position-absolute">
                      {errors.questions[index].text.message}
                    </div>
                  )}
                </div>

                <div className="dropdown align-self-end">
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

        <button type="submit" className="btn btn-primary mt-4 align-self-end" disabled={isLoading}>
          Save
          {isLoading && (
            <div
              className="spinner-border text-success ms-2"
              role="status"
              style={{ width: "1rem", height: "1rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default TemplateForm;

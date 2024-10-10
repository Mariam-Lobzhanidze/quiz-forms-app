import { useForm } from "react-hook-form";
import { Template } from "./types";
import { Link } from "react-router-dom";
import { useQuestions } from "../../context/questionsContext";
import QuestionOptions from "./questionsComponents/quiestionOptions";
import TemplateTitle from "./questionsComponents/templateTitle";

const TemplateForm: React.FC = () => {
  const { questions, addQuestion, updateQuestion, deleteQuestion } = useQuestions();
  const questionTypes = ["Short answer", "Paragraph", "Checkboxes", "Positive integer"];

  const handleOptionsChange = (questionId: string, newOptions: string[]) => {
    updateQuestion(questionId, { options: newOptions });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },

    // watch,
  } = useForm<Template>();

  const onSubmit = (data: Template) => {
    const currentUser = "user123";
    const submissionDate = new Date().toISOString();

    const mergedData = {
      title: data.title,
      description: data.description,
      user: currentUser,
      date: submissionDate,
      questions: questions,
    };

    console.log(mergedData);
  };

  return (
    <div className="container" data-bs-theme={"light"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-5"
        style={{ marginBottom: "150px" }}>
        <h2 className="text-center mb-1">Template</h2>
        <TemplateTitle register={register} errors={errors} />

        {questions.map((question) => (
          <div
            key={question.id}
            className="container border-start border-secondary border-5 rounded p-3 shadow-sm">
            <div className="d-flex gap-3 mb-4">
              {/* Title Input */}
              <input
                type="text"
                className="form-control form-control-sm w-25 custom-border bg-transparent"
                placeholder="Question title"
                value={question.title}
                onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
              />

              {/* Description Input */}
              <input
                type="text"
                className="form-control form-control-sm custom-border bg-transparent"
                placeholder="Question description"
                value={question.description}
                onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
              />
            </div>

            <div className="d-flex gap-3 align-items-center flex-column flex-lg-row">
              <input
                type="text"
                className="form-control"
                placeholder="Question"
                value={question.text}
                onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
              />

              <div className="dropdown">
                <button
                  id="dropdownMenuButton"
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown">
                  {question.type}
                </button>
                <ul className="dropdown-menu">
                  {questionTypes.map((option) => (
                    <li key={option}>
                      <Link
                        className={`dropdown-item ${question.type === option ? "active" : ""}`}
                        to="#"
                        onClick={() => updateQuestion(question.id, { type: option })}>
                        {option}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {question.type === "Checkboxes" && (
              <QuestionOptions
                options={question.options || []}
                onOptionsChange={(newOptions) => handleOptionsChange(question.id, newOptions)}
              />
            )}

            <div className="d-flex align-items-center gap-3 mt-4">
              <div className="d-flex align-items-center gap-3 mt-4 w-100 justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                  <div className="form-check">
                    <input
                      role="button"
                      className="form-check-input"
                      type="radio"
                      name={`questionState-${question.id}`}
                      id={`required-${question.id}`}
                      value="PRESENT_REQUIRED"
                      checked={question.state === "PRESENT_REQUIRED"}
                      onChange={() => updateQuestion(question.id, { state: "PRESENT_REQUIRED" })}
                    />
                    <label className="form-check-label" htmlFor={`required-${question.id}`}>
                      Required
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      role="button"
                      className="form-check-input"
                      type="radio"
                      name={`questionState-${question.id}`}
                      id={`optional-${question.id}`}
                      value="PRESENT_OPTIONAL"
                      checked={question.state === "PRESENT_OPTIONAL"}
                      onChange={() => updateQuestion(question.id, { state: "PRESENT_OPTIONAL" })}
                    />
                    <label className="form-check-label" htmlFor={`optional-${question.id}`}>
                      Optional
                    </label>
                  </div>
                </div>
                <i
                  role="button"
                  className="bi bi-trash3 fs-4"
                  onClick={() => deleteQuestion(question.id)}></i>
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary mt-4 align-self-end">
          Save
        </button>
      </form>

      <div className="bg-body shadow-lg p-3 position-sticky bottom-0 rounded-top">
        <i
          data-bs-toggle="tooltip"
          title="Add Question"
          data-bs-placement="top"
          role="button"
          className="bi bi-plus-circle fs-3"
          onClick={addQuestion}></i>{" "}
      </div>
    </div>
  );
};

export default TemplateForm;

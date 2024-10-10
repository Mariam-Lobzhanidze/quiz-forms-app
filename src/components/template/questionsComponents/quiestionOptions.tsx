import React, { useRef } from "react";

interface QuestionOptionsProps {
  options: string[];
  onOptionsChange: (newOptions: string[]) => void;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({ options, onOptionsChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addNewOption = () => {
    const newOptions = [...options, ""];
    onOptionsChange(newOptions);

    handleInputFocus();
  };

  const handleInputFocus = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    onOptionsChange(updatedOptions);
  };

  const deleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    onOptionsChange(updatedOptions);
  };

  return (
    <div className="mt-3">
      {options.map((option, index) => (
        <div className="input-group mb-3 d-flex gap-3 align-items-center" key={index}>
          <i className="bi bi-app fs-5" style={{ color: "#9ca3af" }}></i>
          <input
            ref={index === options.length - 1 ? inputRef : null}
            className="form-control custom-border bg-transparent"
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
          />
          <i onClick={() => deleteOption(index)} className="bi bi-x-lg" style={{ cursor: "pointer" }}></i>
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

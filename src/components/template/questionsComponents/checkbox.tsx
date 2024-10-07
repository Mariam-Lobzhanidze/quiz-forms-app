import { useState, useRef, useEffect } from "react";
import "./checkboxOptions.scss";

const Checkbox: React.FC = () => {
  const [checkboxOptions, setCheckboxOptions] = useState<string[]>(["Option 1"]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const addNewOption = () => {
    setCheckboxOptions((prevOptions) => [...prevOptions, ""]);
  };

  const updateCheckboxOption = (index: number, value: string) => {
    const updatedOptions = [...checkboxOptions];
    updatedOptions[index] = value;
    setCheckboxOptions(updatedOptions);
  };

  const deleteOption = (index: number) => {
    setCheckboxOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  const handleFocus = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      const lastInput = inputRefs.current[inputRefs.current.length - 1];
      if (lastInput) lastInput.focus();
    }
  }, [checkboxOptions]);

  return (
    <div className="mt-3">
      {checkboxOptions.map((option, index) => (
        <div className="input-group mb-3 d-flex gap-3 align-items-center" key={index}>
          <i
            onClick={() => handleFocus(index)}
            className="bi bi-app fs-5"
            style={{ color: "#9ca3af", cursor: "pointer" }}></i>
          <input
            className="form-control custom-border bg-transparent"
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => updateCheckboxOption(index, e.target.value)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
          <i onClick={() => deleteOption(index)} className="bi bi-x-lg" style={{ cursor: "pointer" }}></i>
        </div>
      ))}

      <div className="input-group mb-3 w-25">
        <input
          type="text"
          className="form-control border-0 border-bottom bg-transparent"
          placeholder="Add option"
          onFocus={addNewOption}
        />
      </div>
    </div>
  );
};

export default Checkbox;

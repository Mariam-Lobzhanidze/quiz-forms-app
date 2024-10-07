import { useState } from "react";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("En");

  const toggleLanguage = () => {
    const newLanguage = language === "En" ? "Ge" : "En";
    setLanguage(newLanguage);
  };

  return (
    <div className="d-flex align-items-center">
      <button
        data-bs-toggle="button"
        type="button"
        className="btn btn-sm  btn-secondary  d-flex gap-2 align-items-center"
        onClick={toggleLanguage}
        style={{ maxWidth: "50px" }}>
        {language}

        <i
          className={`bi ${language === "Ge" ? "bi bi-circle-half" : "bi bi-circle-fill"}`}
          style={{ fontSize: "8px" }}></i>
      </button>
    </div>
  );
};

export default LanguageSwitcher;

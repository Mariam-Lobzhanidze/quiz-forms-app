import React from "react";
import { useState } from "react";
const TemplateForm = React.lazy(() => import("./templateForm"));

const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState("questions");

  const renderContent = () => {
    switch (activeTab) {
      case "questions":
        return <TemplateForm />;
      case "responses":
        return (
          <div>
            <h5>Editable Questions</h5>
          </div>
        );
      case "results":
        return (
          <div>
            <h5>Results</h5>
          </div>
        );

        return (
          <div>
            <h5>Aggregation</h5>
            {/* Add your aggregation display here */}
          </div>
        );
      default:
        return <div>Select a tab to see content.</div>;
    }
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs d-flex justify-content-center mb-5">
        <li className="nav-item ">
          <a
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}>
            Questions
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link  ${activeTab === "responses" ? "active" : ""}`}
            onClick={() => setActiveTab("responses")}>
            Responses
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "results" ? "active" : ""}`}
            onClick={() => setActiveTab("results")}>
            Results
          </a>
        </li>
      </ul>

      <div className="tab-content mt-3">{renderContent()}</div>
    </div>
  );
};

export default TabNavigation;

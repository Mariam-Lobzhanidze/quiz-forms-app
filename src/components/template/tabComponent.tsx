import React, { useEffect } from "react";
import { useState } from "react";
import httpClient from "../../axios";
const TemplateForm = React.lazy(() => import("./templateForm"));

const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState("template");

  const getAllTemplates = async () => {
    try {
      const response = await httpClient.get("/templates");
      console.log(response.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "template":
        return <TemplateForm />;
      case "responses":
        return (
          <div>
            <h5>Editable </h5>
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
            className={`nav-link ${activeTab === "template" ? "active" : ""}`}
            onClick={() => setActiveTab("template")}>
            template
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

import React, { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Question } from "../components/template/types";

type QuestionsContextType = {
  questions: Question[];
  addQuestion: () => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
};

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const createNewQuestion = (): Question => ({
    title: "",
    description: "",
    id: uuidv4(),
    type: "Checkboxes",
    state: "PRESENT_REQUIRED",
    text: "",
    options: [""],
  });

  const [questions, setQuestions] = useState<Question[]>([createNewQuestion()]);

  const getQuestionTypeCounts = () => {
    return questions.reduce((acc, question) => {
      acc[question.type] = (acc[question.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const addQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, createNewQuestion()]);
    console.log(getQuestionTypeCounts());
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id !== id) {
          return question;
        }

        const updatedQuestion = { ...question, ...updates };

        if (updates.type && updates.type !== "Checkboxes") {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { options, ...rest } = updatedQuestion;
          return rest;
        }

        return updatedQuestion;
      })
    );
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
  };

  return (
    <QuestionsContext.Provider value={{ questions, addQuestion, updateQuestion, deleteQuestion }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
};

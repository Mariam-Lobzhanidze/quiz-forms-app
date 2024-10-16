import { Question } from "../components/shared/types";

export const validateInput = (questions: Question[]): boolean => {
  let isValid = true;

  questions.forEach((question) => {
    question.error = undefined;

    if (!question.text || question.text.trim() === "") {
      question.error = "Question text is required";
      isValid = false;
    }

    if (question.type === "Checkboxes" && question.options) {
      question.options.forEach((option) => {
        option.error = undefined;

        if (!option.text || option.text.trim() === "") {
          option.error = "Option text is required.";
          isValid = false;
        }
      });
    }
  });

  return isValid;
};

export const getQuestionTypeCounts = (questions: Question[]) => {
  return questions.reduce((acc, question) => {
    acc[question.type] = (acc[question.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const validateTypeLimit = (questions: Question[], newType: string, maxLimit = 4): boolean => {
  const typeCounts = getQuestionTypeCounts(questions);

  if (typeCounts[newType] >= maxLimit) {
    return false;
  }

  return true;
};

export const validateQuestionTypes = (questions: Question[], maxLimit = 4): boolean => {
  const typeCounts = getQuestionTypeCounts(questions);

  for (const [type, count] of Object.entries(typeCounts)) {
    if (count > maxLimit) {
      alert(`You can have a maximum of ${maxLimit} questions of type ${type}.`);
      return false;
    }
  }

  return true;
};

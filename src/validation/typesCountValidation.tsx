// validation.ts

import { Question } from "../components/template/types";

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

export const validateTypes = (questions: Question[], maxLimit = 4): boolean => {
  const typeCounts = getQuestionTypeCounts(questions);

  for (const [type, count] of Object.entries(typeCounts)) {
    if (count > maxLimit) {
      alert(`You can have a maximum of ${maxLimit} questions of type ${type}.`);
      return false;
    }
  }

  return true;
};

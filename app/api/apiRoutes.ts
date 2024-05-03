"use client";

import { AnswerTypeEnums } from "../components/admin/QuestionForm/QuestionForm";

export const getApi = async () => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/getTime",
      {
        method: "POST",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api get sample");
  }
};

export const postSectionsApi = async (
  name: string,
  subsection: string,
  description: string
) => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/subjects",
      {
        method: "POST",
        body: JSON.stringify({
          subject_name: name,
          subject_description: description,
          sub_section: subsection,
          authority: "ALL",
          level: "ALL",
          user: "Nathu Ram",
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post section");
  }
};

export type GetSectionApiType = {
  subject_id: string;
  subject_name: string;
  subject_description: string;
  sub_subject: string;
  user: string;
};

export type QuestionsAndAnswersType = {
  question: string;
  attachments: string[];
  answerType: AnswerTypeEnums | string;
  options: string[];
  correctOption: string[];
};

export const getSectionApi = async (): Promise<GetSectionApiType[]> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/subjects?user=Nathu Ram",
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api get section");
    return [];
  }
};

export const getQuestionsApi = async (): Promise<GetSectionApiType[]> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/questions?user=Nathu Ram",
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api get section");
    return [];
  }
};

export const postQuestionsApi = async (
  subjectId: string,
  questionText: string,
  questionType: string
) => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/questions",
      {
        method: "POST",
        body: JSON.stringify({
          subject_id: subjectId,
          question_text: questionText,
          question_type: questionType,
          authority: "ALL",
          level: "ALL",
          user: "Nathu Ram",
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post question");
  }
};

export const postAnswersApi = async (
  questionId: string,
  answerText: string
) => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/answers",
      {
        method: "POST",
        body: JSON.stringify({
          question_id: questionId,
          answer_text: answerText,
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post answer");
  }
};

export const postCorrectOptionApi = async (
  questionId: string,
  answerId: string
) => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/correctanswers",
      {
        method: "POST",
        body: JSON.stringify({
          question_id: questionId,
          answer_id: answerId,
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post answer");
  }
};

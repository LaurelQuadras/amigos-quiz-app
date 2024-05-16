"use client";

import { AnswerTypeEnums } from "../components/admin/QuestionForm/QuestionForm";

export type GetSectionApiType = {
  subject_id: string;
  subject_name: string;
  subject_description: string;
  sub_subject: string;
  user: string;
};

export type QuestionsAndAnswersType = {
  questionId: string;
  question: string;
  image_data: Blob | undefined;
  answerType: AnswerTypeEnums | string;
  options: AnswerType[];
  correctOption: string[];
};

export type AnswerType = {
  answerId: string;
  answerText: string;
};

export type GetQuestionType = {
  question_id: string;
  subject_id: string;
  question_text: string;
  question_type: string;
  authority: string;
  level: string;
  image_data: Blob;
};

export type GetAnswerType = {
  question_id: string;
  answer_text: string;
  answer_id: string;
};

export type GetCorrectAnswerType = {
  answer_id: string;
  correct_answer_id: string;
  question_id: string;
};

// Get API
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

export const getQuestionsApi = async (): Promise<GetQuestionType[]> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/questions?user=Nathu Ram",
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post question");
    return [];
  }
};

export const getQuestionsWithSubjectIdApi = async (
  subjectId: string
): Promise<GetQuestionType[]> => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/questions?subject_id=${subjectId}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch {
    console.log("Failed api get question with Subject Id");
    return [];
  }
};

export const getAnswersWithQuestionId = async (
  questionId: string
): Promise<GetAnswerType[]> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/answers?question_id=" + questionId,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api get answer with question Id");
    return [];
  }
};

export const getCorrectOptionWithQuestionIdApi = async (
  questionId: string
): Promise<GetCorrectAnswerType[]> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/correctanswers?question_id=" +
        questionId,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api get correct answer");
    return [];
  }
};

// Put API
export const putSectionsApi = async (
  id: string,
  name: string,
  subsection: string,
  description: string
) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/subjects?id=${id}`,
      {
        method: "PUT",
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
    console.log("Failed api put section");
  }
};

export const putQuestionApi = async (
  id: string,
  subjectId: string,
  questionText: string,
  answerType: string
) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/questions?id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          subject_id: subjectId,
          question_text: questionText,
          question_Type: answerType,
          authority: "ALL",
          level: "ALL",
          user: "Nathu Ram",
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api put question");
  }
};

export const putAnswerApi = async (
  id: string,
  questionId: string,
  answerText: string
) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/answers?id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          question_id: questionId,
          answer_text: answerText,
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api put answer");
  }
};

// Delete API
export const deleteSectionsApi = async (id: string) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/subjects?id=${id}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post section");
  }
};

// Post API
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
    console.log("Failed api post correct answer");
  }
};

"use client";

import {
  AnswerTypeEnums,
  AuthorityEnums,
} from "../components/admin/QuestionForm/QuestionForm";

export type GetSectionApiType = {
  subject_id: string;
  subject_name: string;
  subject_description: string;
  subsectionID: string;
  subsection_name: string;
  subsection_description: string;
  user: string;
  authority: AuthorityEnums;
};

export type QuestionsAndAnswersType = {
  questionId: string;
  question: string;
  authority: AuthorityEnums;
  image_data: Blob[] | undefined;
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
  authority: AuthorityEnums;
  level: string;
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

export type GetExamsType = {
  exam_id: string;
  exam_description: string;
  subject_id: string;
  subject_authority: string;
  question_authority: string;
  level: string;
  number_of_questions: string;
  random: string;
  max_time: string;
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
      "https://gamewithcolors.online/exams/subjects?user=1",
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
      "https://gamewithcolors.online/exams/questions?user=1",
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

export const getQuestionImageApi = async (questionId: string) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/questionImages?question_id=${questionId}`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post question");
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

export const getExamsListApi = async (
  userId: string,
  examId?: string
): Promise<GetExamsType[]> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/exams?user_id=" +
        userId +
        (examId ? "&id=" + examId : ""),
      {
        method: "GET",
      }
    );
    var e = await response.json();
    console.log(e);
    return e;
  } catch {
    console.log("Failed api get exams");
    return [];
  }
};

// Put API
export const putSectionsApi = async (
  id: string,
  name: string,
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
          authority: "ALL",
          level: "ALL",
          user: "1",
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api put section");
  }
};

export const putSubSubjectApi = async (
  subjectId: string,
  subSubjectId: string,
  subsection: string,
  subSectionDescription: string,
  authority: AuthorityEnums
) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/sub-subjects?id=${subSubjectId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          subject_id: subjectId,
          subsection_name: subsection,
          subsection_description: subSectionDescription,
          authority: authority,
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api put sub subject");
  }
};

export const putQuestionApi = async (
  id: string,
  subjectId: string,
  questionText: string,
  answerType: string,
  authority: AuthorityEnums
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
          authority: authority,
          level: "ALL",
          user: "1",
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

export const deleteSubSubjectsApi = async (id: string) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/sub-subjects?id=${id}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post sub subject");
  }
};

// Post API
export const postSectionsApi = async (
  name: string,
  description: string,
  authority: AuthorityEnums
) => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/subjects",
      {
        method: "POST",
        body: JSON.stringify({
          subject_name: name,
          subject_description: description,
          authority: authority,
          level: "ALL",
          user: "1",
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post section");
  }
};

export const postSubSubjectApi = async (
  subjectId: string,
  subSectionName: string,
  subSectionDescription: string
) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/sub-subjects?subject_id=${subjectId}`,
      {
        method: "POST",
        body: JSON.stringify({
          subject_id: subjectId,
          subsection_name: subSectionName,
          subsection_description: subSectionDescription,
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
  questionType: string,
  authority: AuthorityEnums
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
          authority: authority,
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

export const postQuestionImageApi = async (
  questionId: string,
  imageData: Blob
) => {
  try {
    const response: Response = await fetch(
      `https://gamewithcolors.online/exams/questionImages?question_id=${questionId}`,
      {
        method: "POST",
        body: JSON.stringify({
          image_data: imageData,
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

export const postExamsApi = async (
  userId: string,
  subSubjectId: string,
  examDescription: string,
  questionCount: number,
  subjectAuthority: AuthorityEnums,
  questionsAuthority: AuthorityEnums,
  level: string,
  maxTime: number
): Promise<any> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/exams",
      {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          subject_id: subSubjectId,
          exam_description: examDescription,
          questions_count: questionCount,
          subject_authority: subjectAuthority,
          questions_authority: questionsAuthority,
          level: level,
          max_time: maxTime,
        }),
      }
    );
    return await response.json();
  } catch {
    console.log("Failed api post exams");
  }
};

export const postExamsQuestionsApi = async (
  examId: string,
  questionId: string
): Promise<any> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/examQuestions",
      {
        method: "POST",
        body: JSON.stringify({
          exam_id: examId,
          question_id: questionId,
        }),
      }
    );
  } catch {
    console.log("Failed post examQuestions");
  }
};

export const postExamTestsApi = async (
  examId: string,
  questionId: string,
  answerId: string
): Promise<any> => {
  try {
    const response: Response = await fetch(
      "https://gamewithcolors.online/exams/examresults",
      {
        method: "POST",
        body: JSON.stringify({
          exam_id: examId,
          user_id: "1",
          question_id: questionId,
          answer_id: answerId,
          time_taken: 15,
          exam_date_time: new Date().toUTCString(),
        }),
      }
    );
  } catch {
    console.log("Failed post examQuestions");
  }
};

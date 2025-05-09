"use client";

import {
  GetSectionApiType,
  getSectionApi,
  QuestionsAndAnswersType,
  postQuestionsApi,
  postAnswersApi,
  postCorrectOptionApi,
  getQuestionsWithSubjectIdApi,
  GetQuestionType,
  GetAnswerType,
  getAnswersWithQuestionId,
  getCorrectOptionWithQuestionIdApi,
  GetCorrectAnswerType,
  putQuestionApi,
  putAnswerApi,
  AnswerType,
  getQuestionImageApi,
} from "@/app/api/apiRoutes";
import { output_script } from "@/app/fonts/fonts";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import QuestionForm from "../QuestionForm/QuestionForm";

export interface AdminEditPageProps {
  subSubject: string;
}

export default function AdminEditPage({ subSubject }: AdminEditPageProps) {
  const [noOfQuestions, setNoOfQuestions] = useState<number>(10);
  const [sectionSelected, setSectionSelected] = useState<GetSectionApiType>();
  const [questionsAndAnswersListValues, setQuestionAndAnswersListValues] =
    useState<QuestionsAndAnswersType[]>([]);
  const [noQuestionsPresent, setNoQuestionsPresent] = useState<boolean>(false);

  const welcomeAdminText: string[] = "Welcome to Admin Panel".split(" ");
  const fillInformationText: string = "Please fill the following information.";

  const onPreviousButtonClick = (questionId: string): void => {
    if (
      confirm(
        "Are you sure you want to delete this question? It will delete the attachments, options and correct options as well"
      )
    ) {
      const questionAndAnswerListRemaining: QuestionsAndAnswersType[] =
        questionsAndAnswersListValues.filter(
          (questionAndAnswerValue: QuestionsAndAnswersType) =>
            questionAndAnswerValue.questionId !== questionId
        );
      setQuestionAndAnswersListValues(questionAndAnswerListRemaining);
      setNoOfQuestions((noOfQuestions) => noOfQuestions - 1);
    }
  };

  const getSubjectWithId = async (): Promise<void> => {
    const sectionList: GetSectionApiType[] = await getSectionApi();
    setSectionSelected(
      sectionList.filter(
        (section: GetSectionApiType) => section.subsectionID === subSubject
      )[0]
    );
  };

  const getQuestionsWithSubjectId = async (): Promise<void> => {
    const questions: GetQuestionType[] = await getQuestionsWithSubjectIdApi(
      subSubject
    );

    if (questions.length === undefined) {
      setNoQuestionsPresent(true);
      return;
    }

    const uniqueQuestions: GetQuestionType[] = questions.filter(
      (obj, index, self) => {
        const key = obj.question_text;
        return index === self.findIndex((item) => item.question_text === key);
      }
    );

    const questionAndAnswerList: QuestionsAndAnswersType[] =
      await getQuestionAndAnswerList(uniqueQuestions);

    setNoOfQuestions(questionAndAnswerList.length);
    setQuestionAndAnswersListValues(questionAndAnswerList);
  };

  const getQuestionAndAnswerList = async (
    questions: GetQuestionType[]
  ): Promise<QuestionsAndAnswersType[]> => {
    const questionsAndAnswersList: QuestionsAndAnswersType[] = [];

    await Promise.all(
      questions.map(async (question: GetQuestionType, index: number) => {
        const questionAndAnswerValue: QuestionsAndAnswersType | undefined =
          await getQuestionAndAnswerApiResponseList(question);

        if (questionAndAnswerValue) {
          questionsAndAnswersList.push(questionAndAnswerValue);
        }
      })
    );

    return questionsAndAnswersList;
  };

  const getQuestionAndAnswerApiResponseList = async (
    question: GetQuestionType
  ): Promise<QuestionsAndAnswersType | undefined> => {
    const imagesDataList: any[] = await getQuestionImageApi(
      question.question_id
    );

    const answerList: GetAnswerType[] = await getAnswersWithQuestionId(
      question.question_id
    );

    const correctOptionList: GetCorrectAnswerType[] =
      await getCorrectOptionWithQuestionIdApi(question.question_id);

    const correctOptionWithText: string[] = [];

    if (correctOptionList[0]) {
      correctOptionList.forEach((correctOption: GetCorrectAnswerType) => {
        answerList.forEach((answer: GetAnswerType) => {
          if (correctOption.answer_id === answer.answer_id) {
            correctOptionWithText.push(answer.answer_text);
          }
        });
      });

      const questionAndAnswerValue: QuestionsAndAnswersType = {
        questionId: question.question_id,
        question: question.question_text,
        authority: question.authority,
        image_data:
          imagesDataList.length > 0
            ? imagesDataList.map((image: any) => image.image_data)
            : undefined,
        answerType: question.question_type,
        options: answerList.map((answer: GetAnswerType) => {
          return {
            answerId: answer.answer_id,
            answerText: answer.answer_text,
          };
        }),
        correctOption: correctOptionWithText,
      };

      return questionAndAnswerValue;
    }
  };

  useEffect(() => {
    if (subSubject) {
      getSubjectWithId();
      getQuestionsWithSubjectId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subSubject]);

  const updateQuestionsAndAnswersListValues = (
    questionsAndAnswers: QuestionsAndAnswersType,
    index: number
  ): void => {
    const newQuestionsAndAnswers: QuestionsAndAnswersType[] =
      questionsAndAnswersListValues;
    newQuestionsAndAnswers[index] = questionsAndAnswers;
  };

  const updateQuestion = async (
    questionAndAnswerValue: QuestionsAndAnswersType
  ): Promise<void> => {
    const editedQuestionAndAnswerValue = questionsAndAnswersListValues.filter(
      (questionAndAnswerListValue: QuestionsAndAnswersType) =>
        questionAndAnswerValue.questionId ===
        questionAndAnswerListValue.questionId
    )[0];

    if (editedQuestionAndAnswerValue.question === "") {
      alert("Please add a valid question.");
      return;
    }

    try {
      const response = await putQuestionApi(
        editedQuestionAndAnswerValue.questionId,
        subSubject,
        editedQuestionAndAnswerValue.question,
        editedQuestionAndAnswerValue.answerType,
        editedQuestionAndAnswerValue.authority
      );
      if (response) {
        alert("Question updated successfully");
      }
    } catch {
      alert("Error");
    }
  };

  const updateAnswers = async (
    questionAndAnswerValue: QuestionsAndAnswersType
  ): Promise<void> => {
    const editedQuestionAndAnswerValue = questionsAndAnswersListValues.filter(
      (questionAndAnswerListValue: QuestionsAndAnswersType) =>
        questionAndAnswerValue.questionId ===
        questionAndAnswerListValue.questionId
    )[0];

    if (
      editedQuestionAndAnswerValue.options[0].answerText === "" ||
      editedQuestionAndAnswerValue.options[1].answerText === "" ||
      editedQuestionAndAnswerValue.options[2].answerText === "" ||
      editedQuestionAndAnswerValue.options[3].answerText === ""
    ) {
      alert(
        "Please add all valid answers to question '" +
          editedQuestionAndAnswerValue.question +
          "'"
      );
      return;
    }

    try {
      editedQuestionAndAnswerValue.options.forEach(
        async (answer: AnswerType) => {
          await putAnswerApi(
            answer.answerId,
            editedQuestionAndAnswerValue.questionId,
            answer.answerText
          );
        }
      );
      alert("Answers updated successfully");
    } catch {
      alert("Error");
    }
  };

  //Need to implement once backend is ready
  const updateCorrectAnswers = async (
    questionAndAnswerValue: QuestionsAndAnswersType
  ): Promise<void> => {
    const questionAndAnswerList = questionsAndAnswersListValues.filter(
      (questionAndAnswerListValue: QuestionsAndAnswersType) =>
        questionAndAnswerValue.questionId ===
        questionAndAnswerListValue.questionId
    )[0];

    try {
      questionAndAnswerList.options.forEach(async (answer: AnswerType) => {
        await putAnswerApi(
          answer.answerId,
          questionAndAnswerList.questionId,
          answer.answerText
        );
      });
      alert("Correct Answers updated successfully");
    } catch {
      alert("Error");
    }
  };

  const editOptions = (
    questionAndAnswerValue: QuestionsAndAnswersType
  ): JSX.Element => {
    return (
      <div className="flex flex-col">
        <Button
          className="bg-lime-600 text-black px-4 py-2 rounded-lg hover:bg-lime-900 mb-[8.8rem] h-fit text-wrap"
          onClick={() => updateQuestion(questionAndAnswerValue)}
        >
          Update Question, Authority, Attachments and Answer Type
        </Button>
        <Button
          className="bg-lime-600 text-black px-4 py-2 rounded-lg hover:bg-lime-900 mb-4"
          onClick={() => updateAnswers(questionAndAnswerValue)}
        >
          Update Answers
        </Button>
        <Button className="bg-lime-600 text-black px-4 py-2 rounded-lg hover:bg-lime-900">
          Update Correct Answer
        </Button>
      </div>
    );
  };

  const saveNewQuestionAndAnswer = async (index: number): Promise<void> => {
    const selectedQuestionAndAnswer: QuestionsAndAnswersType =
      questionsAndAnswersListValues[index];

    if (selectedQuestionAndAnswer.question === "") {
      alert("Please add a valid question.");
      return;
    }
    if (
      selectedQuestionAndAnswer.options[0].answerText === "" ||
      selectedQuestionAndAnswer.options[1].answerText === "" ||
      selectedQuestionAndAnswer.options[2].answerText === "" ||
      selectedQuestionAndAnswer.options[3].answerText === ""
    ) {
      alert(
        "Please add all valid answers to question '" +
          selectedQuestionAndAnswer.question +
          "'"
      );
      return;
    }
    if (
      selectedQuestionAndAnswer.correctOption.length === 1 &&
      selectedQuestionAndAnswer.correctOption[0] === ""
    ) {
      alert(
        "Please add all valid correct answers to question '" +
          selectedQuestionAndAnswer.question +
          "'"
      );
      return;
    }

    const questionId: any = await postQuestionsApi(
      sectionSelected?.subject_id!,
      selectedQuestionAndAnswer.question,
      selectedQuestionAndAnswer.answerType,
      selectedQuestionAndAnswer.authority
    );

    selectedQuestionAndAnswer.options.forEach(
      async (option: AnswerType, index: number) => {
        const answerIdResponse: any = await postAnswersApi(
          questionId.question_id,
          option.answerText
        );
        if (
          selectedQuestionAndAnswer.correctOption.includes(
            answerIdResponse.answerText
          )
        ) {
          await postCorrectOptionApi(
            questionId.question_id,
            answerIdResponse.answer_id
          );
        }
      }
    );
  };

  return (
    <div className="flex flex-col h-full w-full gap-8 md:gap-16 text-white">
      <span className={`${output_script.className} mx-4 text-3xl md:text-6xl`}>
        {welcomeAdminText.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              delay: i / 10,
            }}
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </span>
      <span className="mx-4 text-xl md:text-4xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 1.2,
          }}
        >
          {fillInformationText}
        </motion.span>
      </span>
      {noQuestionsPresent && (
        <span className="mx-4 text-xl md:text-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              delay: 1.2,
            }}
          >
            {
              "You cannot edit a Question Set which has not yet been created. Please create the questions in the Admin New Page."
            }
          </motion.span>
        </span>
      )}
      <div className="flex flex-col gap-4 m-4">
        <div className="flex flex-col md:flex-row gap-8 md:items-center w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="w-40"
          >
            Section
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex"
          >
            <span className="w-40 text-base">
              {sectionSelected?.subject_name.toString()}
            </span>
            <span className="text-white flex items-center">
              Sub section:{" "}
              {sectionSelected ? sectionSelected.subject_description : ""}
            </span>
          </motion.div>
        </div>
        <div className="flex flex-col gap-16">
          {questionsAndAnswersListValues.length > 0 && (
            <>
              {[...Array(noOfQuestions)].map((e: number, i) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 1.4,
                  }}
                  className="flex gap-4 border-2 p-4 rounded-lg"
                  key={i}
                >
                  <div className="flex flex-col gap-4">
                    <QuestionForm
                      index={i}
                      questionsAndAnswers={questionsAndAnswersListValues[i]}
                      updateQuestionsAndAnswersListValues={
                        updateQuestionsAndAnswersListValues
                      }
                    />
                    <div className="w-full flex justify-center items-center">
                      <Button
                        className="bg-red-600 text-black px-4 py-2 rounded-lg hover:bg-red-800 w-64"
                        onClick={() =>
                          onPreviousButtonClick(
                            questionsAndAnswersListValues[i].questionId
                          )
                        }
                        disabled={noOfQuestions === 1}
                      >
                        Delete Question
                      </Button>
                    </div>
                  </div>
                  {questionsAndAnswersListValues[i] &&
                  questionsAndAnswersListValues[i].questionId !== "0" ? (
                    editOptions(questionsAndAnswersListValues[i])
                  ) : (
                    <Button
                      className="w-full bg-lime-600 text-black px-4 py-2 rounded-lg hover:bg-lime-900 mb-[8.8rem] h-20 text-wrap"
                      onClick={() => saveNewQuestionAndAnswer(i)}
                    >
                      Add a new Question {i + 1}
                    </Button>
                  )}
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

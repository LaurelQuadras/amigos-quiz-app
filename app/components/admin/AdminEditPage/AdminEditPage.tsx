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
} from "@/app/api/apiRoutes";
import { output_script } from "@/app/fonts/fonts";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import QuestionForm from "../QuestionForm/QuestionForm";
import questionsAndAnswersMockValues from "../../../json/questionsAndAnswersMock.json";

export interface AdminEditPageProps {
  sectionId: string;
}

export default function AdminEditPage({ sectionId }: AdminEditPageProps) {
  const [noOfQuestions, setNoOfQuestions] = useState<number>(10);
  const [sectionSelected, setSectionSelected] = useState<GetSectionApiType>();
  const [questionsAndAnswersListValues, setQuestionAndAnswersListValues] =
    useState<QuestionsAndAnswersType[]>([]);

  const welcomeAdminText: string[] = "Welcome to Admin Panel".split(" ");
  const fillInformationText: string = "Please fill the following information.";

  const onNextButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions + 1);
  };

  const onPreviousButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions - 1);
  };

  const MotionButton = motion(Button);

  const getSubjectWithId = async (): Promise<void> => {
    const sectionList: GetSectionApiType[] = await getSectionApi();
    setSectionSelected(
      sectionList.filter(
        (section: GetSectionApiType) => section.subject_id === sectionId
      )[0]
    );
  };

  const getQuestionsWithSubjectId = async (): Promise<void> => {
    const questions: GetQuestionType[] = await getQuestionsWithSubjectIdApi(
      sectionId
    );

    const uniqueQuestions: GetQuestionType[] = questions.filter(
      (obj, index, self) => {
        const key = obj.question_text;
        return index === self.findIndex((item) => item.question_text === key);
      }
    );

    const questionAndAnswerList: QuestionsAndAnswersType[] =
      await getQuestionAndAnswerList(uniqueQuestions);

    console.log(uniqueQuestions);

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
        image_data: question.image_data,
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
    if (sectionId) {
      getSubjectWithId();
      getQuestionsWithSubjectId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

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
    const questionAndAnswerList = questionsAndAnswersListValues.filter(
      (questionAndAnswerListValue: QuestionsAndAnswersType) =>
        questionAndAnswerValue.questionId ===
        questionAndAnswerListValue.questionId
    )[0];

    try {
      const response = await putQuestionApi(
        questionAndAnswerList.questionId,
        sectionId,
        questionAndAnswerList.question,
        questionAndAnswerList.answerType
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
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 mb-[8.8rem] h-fit text-wrap"
          onClick={() => updateQuestion(questionAndAnswerValue)}
        >
          Update Question, Attachments and Answer Type
        </Button>
        <Button
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 mb-4"
          onClick={() => updateAnswers(questionAndAnswerValue)}
        >
          Update Answers
        </Button>
        <Button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300">
          Update Correct Answer
        </Button>
      </div>
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
                      <Button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 w-64">
                        Delete Question
                      </Button>
                    </div>
                  </div>
                  {questionsAndAnswersListValues[i] &&
                    questionsAndAnswersListValues[i].questionId !== "0" &&
                    editOptions(questionsAndAnswersListValues[i])}
                </motion.div>
              ))}
            </>
          )}
        </div>
        <div className="flex justify-end gap-8">
          <MotionButton
            onClick={onPreviousButtonClick}
            disabled={noOfQuestions === 1}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Previous{" "}
          </MotionButton>
          <MotionButton
            onClick={onNextButtonClick}
            disabled={noOfQuestions === 10}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Next
          </MotionButton>
        </div>
      </div>
    </div>
  );
}

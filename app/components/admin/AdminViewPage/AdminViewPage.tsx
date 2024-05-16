"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import QuizPagination from "../../user/QuizPagination";
import QuizQuestion from "../../user/QuizQuestion";
import {
  GetSectionApiType,
  QuestionsAndAnswersType,
  getSectionApi,
  GetQuestionType,
  getQuestionsWithSubjectIdApi,
  GetAnswerType,
  getAnswersWithQuestionId,
  GetCorrectAnswerType,
  getCorrectOptionWithQuestionIdApi,
} from "@/app/api/apiRoutes";
import { Button } from "@/components/ui/button";

export interface AdminViewPageProps {
  sectionId: string;
}

export default function AdminViewPage({ sectionId }: AdminViewPageProps) {
  const [isVisible, setIsVisible] = useState<number>(0);

  const [noOfQuestions, setNoOfQuestions] = useState<number>(0);
  const [sectionSelected, setSectionSelected] = useState<GetSectionApiType>();
  const [questionsAndAnswersListValues, setQuestionAndAnswersListValues] =
    useState<QuestionsAndAnswersType[]>([]);

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

    console.log(questionAndAnswerList);

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

  useEffect(() => {
    setIsVisible(Array.from({ length: noOfQuestions }, (_, i) => i)[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noOfQuestions]);

  const onNextButtonClick = (): void => {
    const index: number = [...Array(noOfQuestions)].indexOf(isVisible);
    setIsVisible(Array.from({ length: noOfQuestions }, (_, i) => i)[index + 1]);
  };

  const onPreviousButtonClick = (): void => {
    const index: number = [...Array(noOfQuestions)].indexOf(isVisible);
    setIsVisible(Array.from({ length: noOfQuestions }, (_, i) => i)[index - 1]);
  };

  const onCustomQuestionPageLink = (value: number): void => {
    setIsVisible(Array.from({ length: noOfQuestions }, (_, i) => i)[value]);
  };

  return (
    noOfQuestions !== 0 &&
    questionsAndAnswersListValues.length > 0 && (
      <div>
        {Array.from({ length: noOfQuestions }, (_, i) => i).map(
          (e: number, i) =>
            i === isVisible ? (
              <QuizQuestion
                visibleQuestion={isVisible}
                onNextButtonClick={onNextButtonClick}
                onPreviousButtonClick={onPreviousButtonClick}
                key={i}
                lastQuestionIndex={noOfQuestions}
                questionAndAnswerValue={questionsAndAnswersListValues[i - 1]}
              />
            ) : (
              <></>
            )
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.25,
          }}
        >
          <QuizPagination
            noOfQuestions={noOfQuestions}
            visibleQuestion={isVisible}
            onNextButtonClick={onNextButtonClick}
            onPreviousButtonClick={onPreviousButtonClick}
            onCustomQuestionPageLink={onCustomQuestionPageLink}
          />
        </motion.div>
      </div>
    )
  );
}

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
  getQuestionImageApi,
} from "@/app/api/apiRoutes";
import { output_script } from "@/app/fonts/fonts";

export interface AdminViewPageProps {
  subSubject: string;
}

export default function AdminViewPage({ subSubject }: AdminViewPageProps) {
  const [isVisible, setIsVisible] = useState<number>(0);

  const [noOfQuestions, setNoOfQuestions] = useState<number>(0);
  const [sectionSelected, setSectionSelected] = useState<GetSectionApiType>();
  const [questionsAndAnswersListValues, setQuestionAndAnswersListValues] =
    useState<QuestionsAndAnswersType[]>([]);
  const [noQuestionsPresent, setNoQuestionsPresent] = useState<boolean>(false);

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

  useEffect(() => {
    setIsVisible(Array.from({ length: noOfQuestions }, (_, i) => i)[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noOfQuestions]);

  const onNextButtonClick = (): void => {
    const index: number = Array.from(
      { length: noOfQuestions },
      (_, i) => i
    ).indexOf(isVisible);
    setIsVisible(Array.from({ length: noOfQuestions }, (_, i) => i)[index + 1]);
  };

  const onPreviousButtonClick = (): void => {
    const index: number = Array.from(
      { length: noOfQuestions },
      (_, i) => i
    ).indexOf(isVisible);
    setIsVisible(
      Array.from({ length: noOfQuestions - 1 }, (_, i) => i)[index - 1]
    );
  };

  const onCustomQuestionPageLink = (value: number): void => {
    setIsVisible(Array.from({ length: noOfQuestions }, (_, i) => i)[value]);
  };

  return (
    <div className="flex flex-col h-full w-full gap-8 md:gap-16 text-white">
      {sectionSelected && (
        <>
          <span
            className={`${output_script.className} mx-4 text-3xl md:text-6xl`}
          >
            {`${sectionSelected.subject_name}`.split(" ").map((el, i) => (
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
                delay: 0,
              }}
            >
              {sectionSelected.subject_description}
            </motion.span>
          </span>
          {noQuestionsPresent && (
            <span className="mx-4 text-xl md:text-2xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 2,
                  delay: 0,
                }}
              >
                {
                  "There are no Questions for this Subject and Subject. Please create the questions in the Admin New Page."
                }
              </motion.span>
            </span>
          )}
        </>
      )}
      {noOfQuestions !== 0 && questionsAndAnswersListValues.length > 0 && (
        <div>
          {Array.from({ length: noOfQuestions }, (_, i) => i).map(
            (e: number, i) =>
              e === isVisible ? (
                <QuizQuestion
                  visibleQuestion={isVisible}
                  key={i}
                  questionAndAnswerValue={questionsAndAnswersListValues[e]}
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
      )}
    </div>
  );
}

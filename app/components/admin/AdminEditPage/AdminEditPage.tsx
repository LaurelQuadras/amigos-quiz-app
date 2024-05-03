"use client";

import {
  GetSectionApiType,
  postSectionsApi,
  getSectionApi,
  getApi,
  QuestionsAndAnswersType,
  postQuestionsApi,
  postAnswersApi,
  postCorrectOptionApi,
} from "@/app/api/apiRoutes";
import { output_script } from "@/app/fonts/fonts";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import QuestionForm from "../QuestionForm/QuestionForm";
import questionsAndAnswersMockValues from "../../../json/questionsAndAnswersMock.json";
import sectionsListValues from "../../../json/sectionsList.json";

export interface AdminEditPageProps {
  sectionId: string;
}

export default function AdminEditPage({ sectionId }: AdminEditPageProps) {
  const [noOfQuestions, setNoOfQuestions] = useState<number>(
    questionsAndAnswersMockValues.length
  );
  const [sectionSelected, setSectionSelected] = useState<GetSectionApiType>();
  const [sectionsList, setSectionsList] = useState<GetSectionApiType[]>([]);

  const [questionsAndAnswersListValues, setQuestionAndAnswersListValues] =
    useState<QuestionsAndAnswersType[]>(questionsAndAnswersMockValues);

  const welcomeAdminText: string[] = "Welcome to Admin Panel".split(" ");
  const fillInformationText: string = "Please fill the following information.";

  const onNextButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions + 1);
  };

  const onPreviousButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions - 1);
  };

  const MotionButton = motion(Button);

  const onSectionOptionSelected = (value: string): void => {
    const getSectionSelected: GetSectionApiType = sectionsList.filter(
      (section: GetSectionApiType) => section.subject_name === value
    )[0];
    setSectionSelected(getSectionSelected);
  };

  const getSectionList = async (): Promise<void> => {
    const response: GetSectionApiType[] = await getSectionApi();
    setSectionsList(response);
  };

  useEffect(() => {
    getSectionList();
    getApi();
  }, []);

  useEffect(() => {
    if (sectionId) {
      setSectionSelected(sectionsListValues[0]);
    }
  }, [sectionId]);

  const updateQuestionsAndAnswersListValues = (
    questionsAndAnswers: QuestionsAndAnswersType,
    index: number
  ): void => {
    const newQuestionsAndAnswers: QuestionsAndAnswersType[] =
      questionsAndAnswersListValues;
    newQuestionsAndAnswers[index] = questionsAndAnswers;
    console.log(newQuestionsAndAnswers);
  };

  const postQuestionAndAnswers = async (): Promise<void> => {
    console.log("came ", questionsAndAnswersListValues);
    questionsAndAnswersListValues.forEach(
      async (questionAndAnswers: QuestionsAndAnswersType) => {
        const questionId: any = await postQuestionsApi(
          "9",
          questionAndAnswers.question,
          questionAndAnswers.answerType
        );

        questionAndAnswers.options.forEach(
          async (option: string, index: number) => {
            const answerIdResponse: any = await postAnswersApi(
              questionId.question_id,
              option
            );
            if (
              questionAndAnswers.correctOption.includes(
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
      }
    );
  };

  return (
    <div className="flex flex-col h-full w-full gap-16 m-8 text-white">
      <span className={`${output_script.className} text-6xl`}>
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
      <span className="text-4xl">
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
        <div className="flex gap-8 items-center w-full">
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
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
            className="flex gap-8 items-center text-sm"
          >
            <span className="w-40 text-base">
              {sectionSelected?.subject_name.toString()}
            </span>
            <span className="w-40 text-base">
              Sub Section:{" "}
              {sectionSelected ? sectionSelected.subject_description : ""}
            </span>
            <div
              className="p-3 px-8 cursor-pointer bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white"
              onClick={postQuestionAndAnswers}
            >
              Save
            </div>
          </motion.span>
        </div>
        {sectionSelected && (
          <div className="flex flex-col gap-16">
            {[...Array(noOfQuestions)].map((e: number, i) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 1.4,
                }}
                className="flex flex-col gap-4 border-2 p-4 rounded-lg"
                key={i}
              >
                <QuestionForm
                  index={i}
                  questionsAndAnswers={questionsAndAnswersMockValues[i]}
                  updateQuestionsAndAnswersListValues={
                    updateQuestionsAndAnswersListValues
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
        {sectionSelected && (
          <div className="flex justify-end gap-8">
            <MotionButton
              onClick={onPreviousButtonClick}
              disabled={noOfQuestions === 1}
              whileTap={{ scale: 0.8 }}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Previous{" "}
            </MotionButton>
            <MotionButton
              onClick={onNextButtonClick}
              disabled={noOfQuestions === 10}
              whileTap={{ scale: 0.8 }}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Next
            </MotionButton>
          </div>
        )}
      </div>
    </div>
  );
}

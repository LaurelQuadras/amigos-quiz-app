"use client";

import { output_script } from "@/app/fonts/fonts";
import SectionComponent from "../SectionComponent/SectionComponent";
import QuestionForm from "../QuestionForm/QuestionForm";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  AnswerType,
  GetSectionApiType,
  QuestionsAndAnswersType,
  getApi,
  getSectionApi,
  postAnswersApi,
  postCorrectOptionApi,
  postQuestionsApi,
} from "@/app/api/apiRoutes";
import sectionsListValues from "../../../json/sectionsList.json";

export default function AdminNewPage() {
  const [noOfQuestions, setNoOfQuestions] = useState<number>(1);
  const [sectionSelected, setSectionSelected] = useState<GetSectionApiType>();
  const [sectionsList, setSectionsList] = useState<GetSectionApiType[]>([]);

  const [questionsAndAnswersListValues, setQuestionAndAnswersListValues] =
    useState<QuestionsAndAnswersType[]>([]);

  const welcomeAdminText: string[] = "Welcome to Admin Panel".split(" ");
  const fillInformationText: string = "Please fill the following information.";

  const onNextButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions + 1);
  };

  const onPreviousButtonClick = (): void => {
    if (
      confirm(
        "Are you sure you want to delete this question? It will delete the attachments, options and correct options as well"
      )
    ) {
      setNoOfQuestions((noOfQuestions) => noOfQuestions - 1);
    }
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

  const updateQuestionsAndAnswersListValues = (
    questionsAndAnswers: QuestionsAndAnswersType,
    index: number
  ): void => {
    const newQuestionsAndAnswers: QuestionsAndAnswersType[] =
      questionsAndAnswersListValues;
    newQuestionsAndAnswers[index] = questionsAndAnswers;
    setQuestionAndAnswersListValues(newQuestionsAndAnswers);
  };

  const postQuestionAndAnswers = async (): Promise<void> => {
    console.log("came ", questionsAndAnswersListValues);
    questionsAndAnswersListValues.forEach(
      async (questionAndAnswers: QuestionsAndAnswersType) => {
        if (questionAndAnswers.question === "") {
          alert("Please add a valid question.");
          return;
        }
        if (
          questionAndAnswers.options[0].answerText === "" ||
          questionAndAnswers.options[1].answerText === "" ||
          questionAndAnswers.options[2].answerText === "" ||
          questionAndAnswers.options[3].answerText === ""
        ) {
          alert(
            "Please add all valid answers to question '" +
              questionAndAnswers.question +
              "'"
          );
          return;
        }
        if (
          questionAndAnswers.correctOption.length === 1 &&
          questionAndAnswers.correctOption[0] === ""
        ) {
          alert(
            "Please add all valid correct answers to question '" +
              questionAndAnswers.question +
              "'"
          );
          return;
        }
        const questionId: any = await postQuestionsApi(
          sectionSelected?.subsectionID!,
          questionAndAnswers.question,
          questionAndAnswers.answerType
        );

        questionAndAnswers.options.forEach(
          async (option: AnswerType, index: number) => {
            const answerIdResponse: any = await postAnswersApi(
              questionId.question_id,
              option.answerText
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
            className="flex  items-center text-sm"
          >
            <div className="flex gap-2 md:gap-8 flex-col md:flex-row">
              <SectionComponent
                sectionsList={
                  sectionsList.length !== undefined
                    ? sectionsList.map(
                        (section: GetSectionApiType) => section.subject_name
                      )
                    : []
                }
                onSectionOptionSelected={onSectionOptionSelected}
              />
              <span className="text-white flex items-center">
                {sectionSelected ? sectionSelected.subject_description : ""}
              </span>
              <div
                className="p-3 px-8 cursor-pointer bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white"
                onClick={postQuestionAndAnswers}
              >
                Save
              </div>
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
                  questionsAndAnswers={questionsAndAnswersListValues[i]}
                  updateQuestionsAndAnswersListValues={
                    updateQuestionsAndAnswersListValues
                  }
                />
                <div className="w-full flex justify-center items-center">
                  <Button
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 w-64"
                    onClick={onPreviousButtonClick}
                    disabled={noOfQuestions === 1}
                  >
                    Delete Question
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {sectionSelected && (
          <div className="flex justify-end gap-8">
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
        )}
      </div>
    </div>
  );
}

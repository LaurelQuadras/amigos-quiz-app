"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionsAndAnswersType } from "@/app/api/apiRoutes";
import { AnswerTypeEnums } from "../../../components/admin/QuestionForm/QuestionForm";
import Image from "next/image";
import { AnswersChosenType } from "./TestsExamPage";

export interface TestsQuestionsAndAnswersProps {
  visibleQuestion: number;
  questionAndAnswerValue: QuestionsAndAnswersType;
  onUpdateAnswersChosenClick: (questionId: string, answerId: string) => void;
  answersChosen: AnswersChosenType[];
}

export default function TestsQuestionsAndAnswers({
  visibleQuestion,
  questionAndAnswerValue,
  onUpdateAnswersChosenClick,
  answersChosen,
}: TestsQuestionsAndAnswersProps) {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>("0");
  const questionId: string = questionAndAnswerValue.questionId;
  const selectedAnswer: string = answersChosen.filter(
    (answerChosen: AnswersChosenType) => answerChosen.questionId === questionId
  )[0]?.answerId;

  const onOptionClick = (optionSelected: string): void => {
    if (optionSelected === selectedAnswerId) {
      setSelectedAnswerId("0");
      onUpdateAnswersChosenClick(questionAndAnswerValue.questionId, "0");
    } else {
      setSelectedAnswerId(optionSelected);
      onUpdateAnswersChosenClick(
        questionAndAnswerValue.questionId,
        optionSelected
      );
    }
  };

  return (
    <AnimatePresence>
      {typeof visibleQuestion === "number" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            delay: 0.25,
          }}
          className="w-full h-full flex flex-col"
        >
          <div className="md:m-16 m-4 mt-16 md:mt-4 md:p-8 p-4 border-2 rounded-lg flex flex-col gap-8 justify-center">
            <span className="text-white whitespace-pre-line">
              {questionAndAnswerValue.question}
            </span>
            <div className="flex gap-2 flex-wrap">
              {questionAndAnswerValue.image_data !== undefined &&
                questionAndAnswerValue.image_data.length > 0 &&
                questionAndAnswerValue.image_data.map(
                  (image: Blob, index: number) =>
                    image.toString().includes("image") ? (
                      <div className="w-auto h-auto" key={index}>
                        <Image
                          src={`${image}`}
                          alt={`Preview`}
                          className="rounded-md h-fit object-contain"
                          width={250}
                          height={256}
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-auto h-auto" key={index}>
                        <audio src={`${image}`} controls />
                      </div>
                    )
                )}
            </div>
            <div className="flex flex-col gap-4">
              <Button
                className={`${
                  questionAndAnswerValue.options[0].answerId === selectedAnswer
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }  hover:text-white border-2 rounded-lg`}
                onClick={() =>
                  onOptionClick(questionAndAnswerValue.options[0].answerId)
                }
              >
                {questionAndAnswerValue.options[0].answerText}
              </Button>
              <Button
                className={`${
                  questionAndAnswerValue.options[1].answerId === selectedAnswer
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }  hover:text-white border-2 rounded-lg`}
                onClick={() =>
                  onOptionClick(questionAndAnswerValue.options[1].answerId)
                }
              >
                {questionAndAnswerValue.options[1].answerText}
              </Button>
              {questionAndAnswerValue.answerType !==
              AnswerTypeEnums.BooleanAnswer ? (
                <>
                  <Button
                    className={`${
                      questionAndAnswerValue.options[2].answerId ===
                      selectedAnswer
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }  hover:text-white border-2 rounded-lg`}
                    onClick={() =>
                      onOptionClick(questionAndAnswerValue.options[2].answerId)
                    }
                  >
                    {questionAndAnswerValue.options[2].answerText}
                  </Button>
                  <Button
                    className={`${
                      questionAndAnswerValue.options[3].answerId ===
                      selectedAnswer
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }  hover:text-white border-2 rounded-lg`}
                    onClick={() =>
                      onOptionClick(questionAndAnswerValue.options[3].answerId)
                    }
                  >
                    {questionAndAnswerValue.options[3].answerText}
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </motion.div>
      )}{" "}
    </AnimatePresence>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionsAndAnswersType } from "@/app/api/apiRoutes";
import { AnswerTypeEnums } from "../admin/QuestionForm/QuestionForm";
import Image from "next/image";

export interface QuizQuestionProps {
  visibleQuestion: number;
  questionAndAnswerValue: QuestionsAndAnswersType;
}

export default function QuizQuestion({
  visibleQuestion,
  questionAndAnswerValue,
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const onOptionClick = (optionSelected: number): void => {
    if (optionSelected === selectedOption) {
      setSelectedOption(0);
    } else {
      setSelectedOption(optionSelected);
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
          <div className="m-16 mt-16 p-8 border-2 rounded-lg flex flex-col gap-8 justify-center">
            <span className="text-white">
              {questionAndAnswerValue.question}
            </span>
            <div className="flex">
              {questionAndAnswerValue.image_data !== undefined &&
                questionAndAnswerValue.image_data.length > 0 &&
                questionAndAnswerValue.image_data.map(
                  (image: Blob, index: number) =>
                    image.toString().includes("image") ? (
                      <div className="w-auto h-auto" key={index}>
                        <Image
                          src={`${image}`}
                          alt={`Preview`}
                          className="rounded-md h-64 object-contain"
                          width={250}
                          height={256}
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-auto h-auto" key={index}>
                        <audio src={`${image}`} controls autoPlay />
                      </div>
                    )
                )}
            </div>
            <div className="flex flex-col gap-4">
              <Button
                className={`${
                  selectedOption === 1
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }  hover:text-white border-2 rounded-lg`}
                onClick={() => onOptionClick(1)}
              >
                {questionAndAnswerValue.options[0].answerText}
              </Button>
              <Button
                className={`${
                  selectedOption === 2
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }  hover:text-white border-2 rounded-lg`}
                onClick={() => onOptionClick(2)}
              >
                {questionAndAnswerValue.options[1].answerText}
              </Button>
              {questionAndAnswerValue.answerType !==
              AnswerTypeEnums.BooleanAnswer ? (
                <>
                  <Button
                    className={`${
                      selectedOption === 3
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }  hover:text-white border-2 rounded-lg`}
                    onClick={() => onOptionClick(3)}
                  >
                    {questionAndAnswerValue.options[2].answerText}
                  </Button>
                  <Button
                    className={`${
                      selectedOption === 4
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }  hover:text-white border-2 rounded-lg`}
                    onClick={() => onOptionClick(4)}
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

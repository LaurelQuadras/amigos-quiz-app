"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionsAndAnswersType } from "@/app/api/apiRoutes";

export interface QuizQuestionProps {
  visibleQuestion: number;
  onNextButtonClick: () => void;
  onPreviousButtonClick: () => void;
  lastQuestionIndex: number;
  questionAndAnswerValue: QuestionsAndAnswersType;
}

export default function QuizQuestion({
  visibleQuestion,
  onNextButtonClick,
  onPreviousButtonClick,
  lastQuestionIndex,
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
          <div className="m-16 p-8 border-2 rounded-lg flex flex-col gap-8 justify-center">
            <span className="text-white">
              {questionAndAnswerValue.question}
            </span>
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
            </div>
          </div>
          <div className="mx-16 flex items-end justify-end gap-8">
            <Button
              disabled={visibleQuestion === 0}
              onClick={onPreviousButtonClick}
            >
              Previous
            </Button>
            <Button
              disabled={visibleQuestion === lastQuestionIndex}
              onClick={onNextButtonClick}
            >
              Next
            </Button>
          </div>
        </motion.div>
      )}{" "}
    </AnimatePresence>
  );
}

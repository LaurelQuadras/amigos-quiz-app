"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  GetQuestionType,
  getQuestionsWithSubjectIdApi,
} from "../api/apiRoutes";
import { motion } from "framer-motion";
import { output_script } from "@/app/fonts/fonts";
import QuestionImageData from "../components/admin/QuestionImageData/QuestionImageData";
import { Button } from "@/components/ui/button";

export interface ExamsQuestionsProps {
  subSubject: string;
}

export default function ExamsQuestions({ subSubject }: ExamsQuestionsProps) {
  const [examsQuestions, setExamsQuestions] = useState<GetQuestionType[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const welcomeAdminText: string[] =
    "Please choose the required questions".split(" ");

  const getExamQuestions = async (): Promise<void> => {
    const response: GetQuestionType[] = await getQuestionsWithSubjectIdApi(
      subSubject
    );
    setExamsQuestions(response);
  };

  const updateSelectedQuestionsList = (questionId: number): void => {
    if (selectedQuestions.includes(questionId)) {
      const newSelectedQuestions: number[] = selectedQuestions.filter(
        (selectedQuestionId: number) => selectedQuestionId !== questionId
      );
      setSelectedQuestions(newSelectedQuestions);
    } else {
      const newSelectedArray: number[] = [...selectedQuestions, questionId];
      setSelectedQuestions(newSelectedArray);
    }
  };

  useEffect(() => {
    getExamQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <span
        className={`${output_script.className} mx-4 text-3xl md:text-6xl text-white`}
      >
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
      <div className="m-16 mx-32 flex flex-col gap-8 text-white">
        {examsQuestions &&
          examsQuestions.length > 0 &&
          examsQuestions.map((examQuestion: GetQuestionType) => (
            <div
              key={examQuestion.question_id}
              className="border rounded-lg p-6 flex"
            >
              <div className="w-9/12">
                <span>{examQuestion.question_text}</span>
              </div>
              <div className="w-3/12 flex justify-end">
                <Checkbox
                  checked={selectedQuestions.includes(
                    parseInt(examQuestion.question_id)
                  )}
                  className="border-white"
                  onClick={(e: any) =>
                    updateSelectedQuestionsList(
                      parseInt(examQuestion.question_id)
                    )
                  }
                />
              </div>
            </div>
          ))}
        <div className="flex w-full justify-center">
          {examsQuestions && examsQuestions.length > 0 && (
            <Button
              className="w-96 bg-lime-600 text-black px-4 py-2 rounded-lg hover:bg-lime-900 mb-[8.8rem] h-14 text-wrap"
              disabled={selectedQuestions.length !== 3}
            >
              Save selected questions
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

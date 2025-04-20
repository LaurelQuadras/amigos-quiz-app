"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  GetExamsType,
  GetQuestionType,
  getExamsListApi,
  getQuestionsWithSubjectIdApi,
  postExamsQuestionsApi,
} from "../api/apiRoutes";
import { motion } from "framer-motion";
import { output_script } from "@/app/fonts/fonts";
import QuestionImageData from "../components/admin/QuestionImageData/QuestionImageData";
import { Button } from "@/components/ui/button";

export enum QuestionMode {
  Viewmode,
  Createmode,
  Editmode,
}

export interface ExamsQuestionsProps {
  examId: string;
  mode: QuestionMode;
}

export default function ExamsQuestions({ examId, mode }: ExamsQuestionsProps) {
  const router = useRouter();

  const [examsQuestions, setExamsQuestions] = useState<GetQuestionType[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const createExamQuestionsString: string[] =
    "Please choose the required questions".split(" ");
  const viewExamQuestionsString: string[] = "Here are the questions".split(" ");

  const getExamQuestions = async (): Promise<void> => {
    const examData: GetExamsType[] = await getExamsListApi("1", examId);
    const currentExamData: GetExamsType = examData.filter(
      (exam: GetExamsType) => exam.exam_id === examId
    )[0];

    const response: GetQuestionType[] = await getQuestionsWithSubjectIdApi(
      currentExamData.subject_id
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

  const postExamsQuestions = async (): Promise<void> => {
    selectedQuestions.forEach(async (selectedQuestion: number) => {
      await postExamsQuestionsApi(examId, selectedQuestion.toString());
    });

    router.push("/");
  };

  return (
    <>
      <span
        className={`${output_script.className} mx-4 text-3xl md:text-6xl text-white`}
      >
        {(mode === QuestionMode.Createmode
          ? createExamQuestionsString
          : viewExamQuestionsString
        ).map((el, i) => (
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
      <div className="md:m-16 m-4 md:mx-32 flex flex-col gap-8 text-white">
        {examsQuestions &&
          examsQuestions.length > 0 &&
          examsQuestions.map((examQuestion: GetQuestionType) => (
            <div
              key={examQuestion.question_id}
              className="border rounded-lg p-6 flex"
            >
              <div
                className={mode === QuestionMode.Viewmode ? "w-full" : "w-9/12"}
              >
                <span>{examQuestion.question_text}</span>
              </div>
              {(mode === QuestionMode.Createmode ||
                mode === QuestionMode.Editmode) && (
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
              )}
            </div>
          ))}
        <div className="flex w-full justify-center">
          {(mode === QuestionMode.Createmode ||
            mode === QuestionMode.Editmode) &&
            examsQuestions &&
            examsQuestions.length > 0 && (
              <Button
                className="w-96 bg-lime-600 text-black px-4 py-2 rounded-lg hover:bg-lime-900 mb-[8.8rem] h-14 text-wrap"
                disabled={selectedQuestions.length <= 3}
                onClick={postExamsQuestions}
              >
                Save selected questions
              </Button>
            )}
        </div>
      </div>
    </>
  );
}

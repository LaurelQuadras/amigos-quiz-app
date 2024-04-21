"use client";

import { dancing_script } from "@/app/fonts/fonts";
import SectionComponent from "../SectionComponent/SectionComponent";
import QuestionForm from "../QuestionForm/QuestionForm";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getApi } from "@/app/api/apiRoutes";

export default function AdminHomePage() {
  const [noOfQuestions, setNoOfQuestions] = useState<number>(1);

  const welcomeAdminText: string[] = "Welcome to Admin Panel".split(" ");
  const fillInformationText: string = "Please fill the following information.";

  const onNextButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions + 1);
  };

  const onPreviousButtonClick = (): void => {
    setNoOfQuestions((noOfQuestions) => noOfQuestions - 1);
  };

  const MotionButton = motion(Button);

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-16 m-8">
      <span className={`${dancing_script.className} text-6xl`}>
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
        <div className="flex gap-8 items-cente">
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
          >
            <SectionComponent />
          </motion.span>
        </div>
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.3,
            }}
            className="flex flex-col gap-4 border-2 p-4 rounded-lg"
          >
            <QuestionForm index={1} />
          </motion.div>
          {[...Array(noOfQuestions).splice(1)].map((e: number, i) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.1,
              }}
              className="flex flex-col gap-4 border-2 p-4 rounded-lg"
              key={i}
            >
              <QuestionForm index={i + 2} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-end gap-8">
          <MotionButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0,
              delay: 1.4,
            }}
            onClick={onPreviousButtonClick}
            disabled={noOfQuestions === 1}
            whileTap={{ scale: 0.8 }}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Previous{" "}
          </MotionButton>
          <MotionButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0,
              delay: 1.4,
            }}
            onClick={onNextButtonClick}
            disabled={noOfQuestions === 10}
            whileTap={{ scale: 0.8 }}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Next
          </MotionButton>
        </div>
      </div>
    </div>
  );
}

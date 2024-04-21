"use client";

import { useEffect, useState } from "react";
import QuizQuestion from "../components/user/QuizQuestion";
import QuizPagination from "../components/user/QuizPagination";
import { motion } from "framer-motion";

export default function Home() {
  const [isVisible, setIsVisible] = useState<number>(0);
  const ArrayList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    setIsVisible(ArrayList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNextButtonClick = (): void => {
    const index: number = ArrayList.indexOf(isVisible);
    setIsVisible(ArrayList[index + 1]);
  };

  const onPreviousButtonClick = (): void => {
    const index: number = ArrayList.indexOf(isVisible);
    setIsVisible(ArrayList[index - 1]);
  };

  const onCustomQuestionPageLink = (value: number): void => {
    console.log(ArrayList[7]);

    setIsVisible(ArrayList[value - 1]);
  };

  return (
    <div>
      {ArrayList.map((value: number, index: number) =>
        value === isVisible ? (
          <QuizQuestion
            visibleQuestion={isVisible}
            onNextButtonClick={onNextButtonClick}
            onPreviousButtonClick={onPreviousButtonClick}
            key={index}
            lastQuestionIndex={ArrayList.length}
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
          visibleQuestion={isVisible}
          onNextButtonClick={onNextButtonClick}
          onPreviousButtonClick={onPreviousButtonClick}
          onCustomQuestionPageLink={onCustomQuestionPageLink}
        />
      </motion.div>
    </div>
  );
}

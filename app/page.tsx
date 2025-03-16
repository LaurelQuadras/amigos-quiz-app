"use client";

import { useRouter } from "next/navigation";
import ExamsTable from "./home/ExamsTable";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { output_script } from "@/app/fonts/fonts";
import ExamUpdateDialog from "./home/ExamUpdateDialog";
import { QuestionMode } from "./home/ExamsQuestions";

export default function Home() {
  const router = useRouter();

  const welcomeAdminText: string[] = "Welcome to Quiz".split(" ");

  return (
    <main className="h-full w-full">
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.4,
        }}
        className="m-20 md:m-20 flex justify-center items-center flex-wrap gap-4"
      >
        <Button
          className="w-[32rem] h-32 bg-lime-600 hover:bg-lime-900 text-white rounded-lg"
          onClick={() => router.push(`/exams`)}
        >
          Create an Exam
        </Button>
        <ExamUpdateDialog
          height={32}
          buttonWidth={"[32rem]"}
          backgroundColor="lime-600"
          hoverBackgroundColor="lime-900"
          textColor="white"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.4,
        }}
      >
        <span className="md:m-20 text-white flex justify-center">
          List of all available Exams created.
        </span>
        <div className="flex m-8 md:mx-20 justify-center overflow-auto">
          <ExamsTable mode={QuestionMode.Viewmode} />
        </div>
      </motion.div>
    </main>
  );
}

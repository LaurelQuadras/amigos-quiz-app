"use client";

import { useRouter } from "next/navigation";
import ExamsTable from "./home/ExamsTable";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { output_script } from "@/app/fonts/fonts";

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
        className="m-44 mt-16 mb-16 flex justify-between"
      >
        <Button
          className="w-[32rem] h-32 bg-lime-600 hover:bg-lime-900 text-white rounded-xl"
          onClick={() => router.push(`/exams`)}
        >
          Create an Exam
        </Button>
        <Button className="w-[32rem] h-32 bg-lime-600 hover:bg-lime-900 text-white rounded-xl">
          Update an Exam
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.4,
        }}
      >
        <span className="m-32 text-white">
          List of all available Exams created.
        </span>
        <ExamsTable />
      </motion.div>
    </main>
  );
}

"use client";

import { output_script } from "@/app/fonts/fonts";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GetExamsType, getExamsListApi } from "../api/apiRoutes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TestsPage() {
  const testsHeaderPage: string[] = "Please enter the Exam code".split(" ");

  const router = useRouter();

  const [examIdChosen, setExamIdChosen] = useState<string>();
  const [examDataAvailable, setExamDataAvailable] = useState<GetExamsType[]>();

  const getExamData = async (): Promise<void> => {
    const examData: GetExamsType[] = await getExamsListApi("1");
    setExamDataAvailable(examData);
  };

  useEffect(() => {
    getExamData();
  }, []);

  return (
    <>
      <span
        className={`${output_script.className} mx-4 text-3xl md:text-6xl text-white`}
      >
        {testsHeaderPage.map((el, i) => (
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
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
        }}
      >
        <div className="flex justify-around gap-x-44 gap-y-8 text-black m-4 md:m-32 md:mt-16 mb-16 flex-wrap">
          <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {examIdChosen ?? "Choose an Exam"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Exam Ids available</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={examIdChosen}
                  onValueChange={setExamIdChosen}
                >
                  {examDataAvailable &&
                    examDataAvailable.map((examData: GetExamsType) => (
                      <DropdownMenuRadioItem
                        key={examData.exam_id}
                        value={examData.exam_id}
                      >
                        {examData.exam_id + " " + examData.exam_description}
                      </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="w-96 bg-lime-600 text-black px-4 py-2 rounded-lg hover:bg-lime-900 text-wrap"
              onClick={() => router.push(`/tests/exam/${examIdChosen}`)}
            >
              Start Exam
            </Button>
          </div>
        </div>
      </motion.span>
    </>
  );
}

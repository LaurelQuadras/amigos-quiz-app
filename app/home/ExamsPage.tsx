"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { output_script } from "@/app/fonts/fonts";
import { useState } from "react";
import { AuthorityEnums } from "../components/admin/QuestionForm/QuestionForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { postExamsApi } from "../api/apiRoutes";
import { useRouter } from "next/navigation";

export default function ExamsPage() {
  const router = useRouter();
  const welcomeAdminText: string[] = "Please fill the form".split(" ");

  const [userId, setUserId] = useState<string>("");
  const [subSubjectId, setSubSubjectId] = useState<number>(0);
  const [examDescription, setExamDescription] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [random, setRandom] = useState<boolean>(true);
  const [subjectAuthority, setSubjectAuthority] = useState<AuthorityEnums>(
    AuthorityEnums.ALL
  );
  const [questionAuthority, setQuestionAuthority] = useState<AuthorityEnums>(
    AuthorityEnums.ALL
  );
  const [level, setLevel] = useState<string>("All");
  const [maxTime, setMaxtime] = useState<number>(30);

  const onRandomRadioButtonUpdate = (value: string) => {
    console.log(random);
    setRandom(Boolean(value));
  };

  const onCreateExamButton = async (): Promise<void> => {
    if (
      userId === "" ||
      subSubjectId === 0 ||
      examDescription === "" ||
      questionCount === 0 ||
      level === "" ||
      maxTime === 0
    ) {
      alert("Please fill all the required fields");
      return;
    }

    const response = await postExamsApi(
      userId,
      subSubjectId,
      examDescription,
      questionCount,
      random,
      subjectAuthority,
      questionAuthority,
      level,
      maxTime
    );

    if (response) {
      router.push(`/exams/questions/${subSubjectId}`);
    }
  };

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
      <div className="flex justify-around gap-x-44 gap-y-8 text-black m-32 mt-16 mb-16 flex-wrap">
        <div className="flex gap-8 items-center w-[400px]">
          <Label htmlFor="section" className="text-white w-[150px]">
            UserId:
          </Label>
          <Input
            type="text"
            id="userId"
            value={userId}
            onChange={(e: any) => setUserId(e.target.value)}
          />
        </div>
        <div className="flex gap-8 items-center w-[400px]">
          <Label htmlFor="section" className="text-white w-[150px]">
            SubjectId:
          </Label>
          <Input
            type="number"
            id="subjectId"
            value={subSubjectId}
            onChange={(e: any) => setSubSubjectId(e.target.value)}
          />
        </div>
        <div className="flex gap-3 items-center w-[400px]">
          <Label htmlFor="section" className="text-white text-nowrap w-[150px]">
            Exam Description:
          </Label>
          <Input
            type="text"
            id="examDescription"
            value={examDescription}
            onChange={(e: any) => setExamDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-5 items-center w-[400px]">
          <Label htmlFor="section" className="text-white text-nowrap w-[150px]">
            Question Count:
          </Label>
          <Input
            type="number"
            id="questionCount"
            value={questionCount}
            onChange={(e: any) => setQuestionCount(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center w-[400px]">
          <Label
            htmlFor="subjectAuthoritydescription"
            className="text-white text-nowrap w-[150px]"
          >
            Subject Authority:
          </Label>
          <Select
            defaultValue={subjectAuthority}
            onValueChange={(value: AuthorityEnums) =>
              setSubjectAuthority(value)
            }
          >
            <SelectTrigger className="md:w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="md:w-full">
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                <SelectItem value={AuthorityEnums.ALL}>All</SelectItem>
                <SelectItem value={AuthorityEnums.BASIC}>Basic</SelectItem>
                <SelectItem value={AuthorityEnums.ADVANCE}>Advance</SelectItem>
                <SelectItem value={AuthorityEnums.PREMIUM}>Premium</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center w-[400px]">
          <Label
            htmlFor="questionAuthoritydescription"
            className="text-white text-nowrap w-[150px]"
          >
            Question Authority:
          </Label>
          <Select
            defaultValue={questionAuthority}
            onValueChange={(value: AuthorityEnums) =>
              setQuestionAuthority(value)
            }
          >
            <SelectTrigger className="md:w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="md:w-full">
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                <SelectItem value={AuthorityEnums.ALL}>All</SelectItem>
                <SelectItem value={AuthorityEnums.BASIC}>Basic</SelectItem>
                <SelectItem value={AuthorityEnums.ADVANCE}>Advance</SelectItem>
                <SelectItem value={AuthorityEnums.PREMIUM}>Premium</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-8 items-center w-[400px]">
          <Label htmlFor="section" className="text-white w-[150px]">
            Level:
          </Label>
          <Input
            type="text"
            id="level"
            value={level}
            onChange={(e: any) => setLevel(e.target.value)}
          />
        </div>
        <div className="flex gap-10 items-center w-[400px]">
          <Label htmlFor="section" className="text-white w-[150px]">
            Max Time:
          </Label>
          <Input
            type="number"
            id="maxTime"
            value={maxTime}
            onChange={(e: any) => setMaxtime(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex justify-center gap-16">
        <Button
          className="bg-lime-600 hover:bg-lime-900 w-72 text-black"
          onClick={onCreateExamButton}
        >
          Choose Questions
        </Button>
        <Button
          className="bg-lime-600 hover:bg-lime-900 w-72 text-black"
          onClick={onCreateExamButton}
        >
          Choose Random Questions
        </Button>
      </div>
    </>
  );
}

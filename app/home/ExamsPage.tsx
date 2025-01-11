"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { output_script } from "@/app/fonts/fonts";
import { useEffect, useState } from "react";
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
import {
  GetSectionApiType,
  getSectionApi,
  postExamsApi,
} from "../api/apiRoutes";
import { useRouter } from "next/navigation";

export default function ExamsPage() {
  const router = useRouter();
  const welcomeAdminText: string[] = "Please fill the form".split(" ");

  const [userId, setUserId] = useState<string>("");
  const [subSubjectId, setSubSubjectId] = useState<string>("");
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
  const [sectionsList, setSectionsList] = useState<GetSectionApiType[]>([]);

  const onRandomRadioButtonUpdate = (value: string) => {
    console.log(random);
    setRandom(Boolean(value));
  };

  const getSectionList = async (): Promise<void> => {
    const response: GetSectionApiType[] = await getSectionApi();
    setSectionsList(response);
  };

  useEffect(() => {
    getSectionList();
  }, []);

  const onCreateExamButton = async (): Promise<void> => {
    if (
      userId === "" ||
      subSubjectId === "" ||
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
      subjectAuthority,
      questionAuthority,
      level,
      maxTime
    );

    if (response) {
      router.push(`/exams/createExam/${response.exam_Id}`);
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
      <div className="flex justify-around gap-x-44 gap-y-8 text-black m-4 md:m-32 md:mt-16 mb-16 flex-wrap">
        <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
          <Label htmlFor="section" className="text-white md:w-[150px]">
            UserId:
          </Label>
          <Input
            type="text"
            id="userId"
            value={userId}
            onChange={(e: any) => setUserId(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
          <Label htmlFor="section" className="text-white md:w-[150px]">
            SubjectId:
          </Label>
          {sectionsList && sectionsList.length > 0 && (
            <Select
              defaultValue={sectionsList[0].subsectionID}
              onValueChange={(value: string) => setSubSubjectId(value)}
            >
              <SelectTrigger className="md:w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="md:w-full">
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  {sectionsList.map((section: GetSectionApiType) => (
                    <SelectItem
                      value={section.subsectionID}
                      key={section.subsectionID}
                    >
                      {section.subsectionID}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
          <Label
            htmlFor="section"
            className="text-white text-nowrap md:w-[150px]"
          >
            Exam Description:
          </Label>
          <Input
            type="text"
            id="examDescription"
            value={examDescription}
            onChange={(e: any) => setExamDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
          <Label
            htmlFor="section"
            className="text-white text-nowrap md:w-[150px]"
          >
            Question Count:
          </Label>
          <Input
            type="number"
            id="questionCount"
            value={questionCount}
            onChange={(e: any) => setQuestionCount(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
          <Label
            htmlFor="subjectAuthoritydescription"
            className="text-white text-nowrap md:w-[150px]"
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
        <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
          <Label
            htmlFor="questionAuthoritydescription"
            className="text-white text-nowrap md:w-[150px]"
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
        <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
          <Label htmlFor="section" className="text-white md:w-[150px]">
            Level:
          </Label>
          <Input
            type="text"
            id="level"
            value={level}
            onChange={(e: any) => setLevel(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:gap-8 flex-col md:flex-row items-center md:w-[400px] w-[200px]">
          <Label htmlFor="section" className="text-white md:w-[150px]">
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
      <div className="w-full flex-col md:flex-row flex justify-center items-center md:gap-16 gap-8">
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

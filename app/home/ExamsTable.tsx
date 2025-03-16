"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetExamsType, getExamsListApi } from "../api/apiRoutes";
import { QuestionMode } from "./ExamsQuestions";
import { Input } from "@/components/ui/input";

export interface ExamsTableInterface {
  mode: QuestionMode;
}

export default function ExamsTable({ mode }: ExamsTableInterface) {
  const router = useRouter();

  const [examsList, setExamsList] = useState<any[]>([]);

  const [examDescription, setExamDescription] = useState<string>("");
  const [maxTime, setMaxTime] = useState<number>(0);
  const [numOfQuestions, setNumOfQuestions] = useState<number>(0);

  const getExamsList = async (): Promise<void> => {
    const examsListValues = await getExamsListApi("1");
    console.log("E ", examsListValues);
    setExamsList(examsListValues);
  };

  useEffect(() => {
    getExamsList();
  }, []);

  return (
    <Table>
      <TableCaption>
        {examsList.length === undefined
          ? "There are no Exams created"
          : "A list of all Exams available."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Exam ID</TableHead>
          <TableHead>Exam Desription</TableHead>
          <TableHead>Subject Id</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Max Time</TableHead>
          <TableHead>Number of Questions</TableHead>
          <TableHead>Questions Authority</TableHead>
          <TableHead>Auto Select Questions</TableHead>
          <TableHead>Subject Authority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {examsList.length !== undefined &&
          examsList.map((section: GetExamsType) => (
            <TableRow
              key={section.exam_id}
              className="text-white hover:bg-slate-800"
              onClick={() =>
                mode === QuestionMode.Viewmode
                  ? router.push(`/exams/questions/${section.exam_id}`)
                  : router.push(`/exams/editExam/${section.exam_id}`)
              }
            >
              <TableCell align="center" className="font-medium">
                {section.exam_id}
              </TableCell>
              <TableCell align="center" className="font-medium">
                <Input
                  placeholder="Enter the searched text"
                  value={section.exam_description}
                  onChange={(e) => {
                    setExamDescription(e.target.value);
                  }}
                  className="w-48 bg-white text-black"
                />
              </TableCell>
              <TableCell align="center">{section.subject_id}</TableCell>
              <TableCell align="center">{section.level}</TableCell>
              <TableCell align="center">
                <Input
                  placeholder="Enter the searched text"
                  value={section.max_time}
                  onChange={(e) => {
                    setMaxTime(Number(e.target.value));
                  }}
                  className="w-28 bg-white text-black"
                />
              </TableCell>
              <TableCell align="center">
                <Input
                  placeholder="Enter the searched text"
                  value={section.number_of_questions}
                  onChange={(e) => {
                    setNumOfQuestions(Number(e.target.value));
                  }}
                  className="w-28 bg-white text-black"
                />
              </TableCell>
              <TableCell align="center">{section.question_authority}</TableCell>
              <TableCell align="center">{section.random}</TableCell>
              <TableCell align="center">{section.subject_authority}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

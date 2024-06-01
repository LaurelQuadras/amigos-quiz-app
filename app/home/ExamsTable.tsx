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
import { useEffect, useState } from "react";
import { GetExamsType, getExamsListApi } from "../api/apiRoutes";

export default function ExamsTable() {
  const [examsList, setExamsList] = useState<any[]>([]);

  const getExamsList = async (): Promise<void> => {
    const examsListValues = await getExamsListApi("1");
    console.log("E ", examsListValues);
    setExamsList(examsListValues);
  };

  useEffect(() => {
    getExamsList();
  }, []);

  return (
    <div className="flex m-8 mx-32">
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
              >
                <TableCell align="center" className="font-medium">
                  {section.exam_id}
                </TableCell>
                <TableCell align="center" className="font-medium">
                  {section.exam_description}
                </TableCell>
                <TableCell align="center">{section.subject_id}</TableCell>
                <TableCell align="center">{section.level}</TableCell>
                <TableCell align="center">{section.max_time}</TableCell>
                <TableCell align="center">
                  {section.number_of_questions}
                </TableCell>
                <TableCell align="center">
                  {section.question_authority}
                </TableCell>
                <TableCell align="center">{section.random}</TableCell>
                <TableCell align="center">
                  {section.subject_authority}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

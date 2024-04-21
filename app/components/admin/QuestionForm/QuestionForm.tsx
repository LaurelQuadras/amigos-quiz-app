import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import CorrectOptionComponent from "../MultipleCorrectOptionComponent/MultipleCorrectOptionComponent";
import AnswerTypeComponent from "../AnswerTypeComponent/AnswerTypeComponent";
import { useState } from "react";
import SingleCorrectAnswerComponent from "../SingleCorrectOptionComponent/SingleCorrectOptionComponent";
import TrueFalseComponent from "../TrueFalseComponent/TrueFalseComponent";
import Image from "next/image";

export interface QuestionFormInterface {
  index: number;
}

export enum AnswerTypeEnums {
  MultipleChoiceAnswers = "MultipleChoiceAnswers",
  SingleAnswer = "SingleAnswer",
  BooleanAnswer = "BooleanAnswer",
}

export default function QuestionForm({ index }: QuestionFormInterface) {
  const [answerTypeSelected, setAnswerTypeSelected] = useState<AnswerTypeEnums>(
    AnswerTypeEnums.MultipleChoiceAnswers
  );
  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const onAnswerTypeOptionSelected = (value: AnswerTypeEnums): void => {
    setAnswerTypeSelected(value);
  };

  const handleFileChange = (e: any): void => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles([...selectedFiles, ...fileArray]);
    }
  };

  return (
    <>
      <div className="flex gap-8 items-center">
        <span className="w-40">Question {index}</span>
        <div className="w-[1010px]">
          <Textarea placeholder="Please enter your question here." />
        </div>
      </div>
      <div className="flex gap-8 items-center flex-wrap h-auto">
        <span className="w-40">Attachments</span>
        <div>
          <Input
            id="picture"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFiles.length > 0 && (
            <div className="mt-2 h-64 object-contain flex gap-3 flex-wrap">
              {selectedFiles.map((file: any, index: number) => (
                <Image
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="rounded-md h-64"
                  width={250}
                  height={250}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <span className="w-40">Answer Type</span>
        <div>
          <AnswerTypeComponent
            onAnswerTypeOptionSelected={onAnswerTypeOptionSelected}
          />
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <span className="w-40">Options</span>
        {answerTypeSelected !== AnswerTypeEnums.BooleanAnswer && (
          <div className="flex gap-4">
            <Input placeholder="Option 1" />
            <Input placeholder="Option 2" />
            <Input placeholder="Option 3" />
            <Input placeholder="Option 4" />
          </div>
        )}
        {answerTypeSelected === AnswerTypeEnums.BooleanAnswer && (
          <div className="flex gap-4">
            <span className="w-44 border p-2  rounded-lg text-sm">True</span>
            <span className="w-44 border p-2  rounded-lg text-sm">False</span>
          </div>
        )}
      </div>
      <div className="flex gap-8 items-center">
        <span className="w-40">Correct Option</span>
        {answerTypeSelected === AnswerTypeEnums.MultipleChoiceAnswers && (
          <CorrectOptionComponent />
        )}
        {answerTypeSelected === AnswerTypeEnums.SingleAnswer && (
          <SingleCorrectAnswerComponent />
        )}
        {answerTypeSelected === AnswerTypeEnums.BooleanAnswer && (
          <TrueFalseComponent />
        )}
      </div>
    </>
  );
}

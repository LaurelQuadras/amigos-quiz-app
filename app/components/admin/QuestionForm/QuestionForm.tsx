import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import CorrectOptionComponent from "../MultipleCorrectOptionComponent/MultipleCorrectOptionComponent";
import AnswerTypeComponent from "../AnswerTypeComponent/AnswerTypeComponent";
import { useEffect, useState } from "react";
import SingleCorrectAnswerComponent from "../SingleCorrectOptionComponent/SingleCorrectOptionComponent";
import TrueFalseComponent from "../TrueFalseComponent/TrueFalseComponent";

export interface QuestionFormInterface {
  index: number;
}

export enum AnswerTypeEnums {
  None = "None",
  MultipleChoiceAnswers = "MultipleChoiceAnswers",
  SingleAnswer = "SingleAnswer",
  BooleanAnswer = "BooleanAnswer",
}

export default function QuestionForm({ index }: QuestionFormInterface) {
  const [answerTypeSelected, setAnswerTypeSelected] = useState<AnswerTypeEnums>(
    AnswerTypeEnums.None
  );

  const onAnswerTypeOptionSelected = (value: AnswerTypeEnums): void => {
    setAnswerTypeSelected(value);
  };

  useEffect(() => {
    console.log("AA ", answerTypeSelected);
  }, [answerTypeSelected]);

  return (
    <>
      <div className="flex gap-8 items-center">
        <span className="w-40">Question {index}</span>
        <div className="w-[1010px]">
          <Textarea placeholder="Please enter your question here." />
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
      {answerTypeSelected !== AnswerTypeEnums.None && (
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
      )}
      <div className="flex gap-8 items-center">
        {answerTypeSelected !== AnswerTypeEnums.None && (
          <span className="w-40">Correct Option</span>
        )}
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

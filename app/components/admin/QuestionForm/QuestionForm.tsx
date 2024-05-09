import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import MultipleCorrectOptionComponent from "../MultipleCorrectOptionComponent/MultipleCorrectOptionComponent";
import AnswerTypeComponent from "../AnswerTypeComponent/AnswerTypeComponent";
import { useEffect, useState } from "react";
import SingleCorrectAnswerComponent from "../SingleCorrectOptionComponent/SingleCorrectOptionComponent";
import TrueFalseComponent from "../TrueFalseComponent/TrueFalseComponent";
import Image from "next/image";
import { QuestionsAndAnswersType } from "@/app/api/apiRoutes";
import QuestionImageData from "../QuestionImageData/QuestionImageData";

export interface QuestionFormInterface {
  index: number;
  questionsAndAnswers: QuestionsAndAnswersType;
  updateQuestionsAndAnswersListValues: (
    questionsAndAnswers: QuestionsAndAnswersType,
    index: number
  ) => void;
}

export enum AnswerTypeEnums {
  MultipleChoiceAnswers = "MULTIPLE_CHOICE",
  SingleAnswer = "SingleAnswer",
  BooleanAnswer = "BooleanAnswer",
}

export enum AnswerOptions {
  one,
  two,
  three,
  four,
}

export default function QuestionForm({
  index,
  questionsAndAnswers,
  updateQuestionsAndAnswersListValues,
}: QuestionFormInterface) {
  const [question, setQuestion] = useState<string>(
    questionsAndAnswers ? questionsAndAnswers.question : ""
  );

  const [optionOne, setOptionOne] = useState<string>(
    questionsAndAnswers ? questionsAndAnswers.options[0] : ""
  );
  const [optionTwo, setOptionTwo] = useState<string>(
    questionsAndAnswers ? questionsAndAnswers.options[1] : ""
  );
  const [optionThree, setOptionThree] = useState<string>(
    questionsAndAnswers ? questionsAndAnswers.options[2] : ""
  );
  const [optionFour, setOptionFour] = useState<string>(
    questionsAndAnswers ? questionsAndAnswers.options[3] : ""
  );

  const [correctOption, setCorrectOption] = useState<string[]>(
    questionsAndAnswers ? questionsAndAnswers.correctOption : []
  );
  const [answerTypeSelected, setAnswerTypeSelected] = useState<
    AnswerTypeEnums | string
  >(
    questionsAndAnswers
      ? questionsAndAnswers.answerType
      : AnswerTypeEnums.MultipleChoiceAnswers
  );
  const onAnswerTypeOptionSelected = (value: AnswerTypeEnums): void => {
    setAnswerTypeSelected(value);
  };

  const handleContentChange = (): void => {
    const optionsList: string[] =
      answerTypeSelected === AnswerTypeEnums.BooleanAnswer
        ? ["true", "false"]
        : [optionOne, optionTwo, optionThree, optionFour];
    const newQuestionsAndAnswers: QuestionsAndAnswersType = {
      question,
      attachments: [],
      image_data: new Blob(),
      answerType: answerTypeSelected,
      options: optionsList,
      correctOption,
    };

    updateQuestionsAndAnswersListValues(newQuestionsAndAnswers, index);
  };

  useEffect(() => {
    handleContentChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    question,
    answerTypeSelected,
    correctOption,
    optionOne,
    optionTwo,
    optionThree,
    optionFour,
  ]);

  return (
    <>
      <div className="flex gap-8 items-center">
        <span className="w-40">Question {index + 1}</span>
        <div className="w-[1010px] text-black">
          <Textarea
            placeholder="Please enter your question here."
            defaultValue={questionsAndAnswers?.question}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-8 items-center flex-wrap h-auto">
        {questionsAndAnswers && questionsAndAnswers.image_data && (
          <QuestionImageData image_data={questionsAndAnswers.image_data} />
        )}
      </div>
      <div className="flex gap-8 items-center">
        <span className="w-40">Answer Type</span>
        <div>
          <AnswerTypeComponent
            defaultOptionSelected={questionsAndAnswers?.answerType}
            onAnswerTypeOptionSelected={onAnswerTypeOptionSelected}
          />
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <span className="w-40">Options</span>
        {answerTypeSelected !== AnswerTypeEnums.BooleanAnswer && (
          <div className="flex gap-4 text-black flex-col md:flex-row">
            <Input
              placeholder="Option 1"
              defaultValue={questionsAndAnswers?.options[0]}
              value={optionOne}
              onChange={(e) => {
                setOptionOne(e.target.value);
              }}
            />
            <Input
              placeholder="Option 2"
              defaultValue={questionsAndAnswers?.options[1]}
              value={optionTwo}
              onChange={(e) => {
                setOptionTwo(e.target.value);
              }}
            />
            <Input
              placeholder="Option 3"
              defaultValue={questionsAndAnswers?.options[2]}
              value={optionThree}
              onChange={(e) => {
                setOptionThree(e.target.value);
              }}
            />
            <Input
              placeholder="Option 4"
              defaultValue={questionsAndAnswers?.options[3]}
              value={optionFour}
              onChange={(e) => {
                setOptionFour(e.target.value);
              }}
            />
          </div>
        )}
        {answerTypeSelected === AnswerTypeEnums.BooleanAnswer && (
          <div className="flex gap-4 flex-col md:flex-row">
            <span className="w-44 border p-2  rounded-lg text-sm">True</span>
            <span className="w-44 border p-2  rounded-lg text-sm">False</span>
          </div>
        )}
      </div>
      <div className="flex gap-8 items-center">
        <span className="w-40">Correct Option</span>
        {answerTypeSelected === AnswerTypeEnums.MultipleChoiceAnswers &&
          optionOne !== "" &&
          optionTwo !== "" &&
          optionThree !== "" &&
          optionFour !== "" && (
            <MultipleCorrectOptionComponent
              optionList={[optionOne, optionTwo, optionThree, optionFour]}
              correctOptionList={
                questionsAndAnswers ? questionsAndAnswers.correctOption : []
              }
              setCorrectOption={setCorrectOption}
            />
          )}
        {answerTypeSelected === AnswerTypeEnums.SingleAnswer &&
          optionOne !== "" &&
          optionTwo !== "" &&
          optionThree !== "" &&
          optionFour !== "" && (
            <SingleCorrectAnswerComponent
              optionList={[optionOne, optionTwo, optionThree, optionFour]}
              correctOption={questionsAndAnswers?.correctOption
                .toString()
                .trim()}
              setCorrectOption={setCorrectOption}
            />
          )}
        {answerTypeSelected === AnswerTypeEnums.BooleanAnswer && (
          <TrueFalseComponent
            correctOption={questionsAndAnswers?.correctOption.toString().trim()}
            setCorrectOption={setCorrectOption}
          />
        )}
      </div>
    </>
  );
}

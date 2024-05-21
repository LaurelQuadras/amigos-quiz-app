import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import MultipleCorrectOptionComponent from "../MultipleCorrectOptionComponent/MultipleCorrectOptionComponent";
import AnswerTypeComponent from "../AnswerTypeComponent/AnswerTypeComponent";
import { useEffect, useState } from "react";
import SingleCorrectAnswerComponent from "../SingleCorrectOptionComponent/SingleCorrectOptionComponent";
import TrueFalseComponent from "../TrueFalseComponent/TrueFalseComponent";
import Image from "next/image";
import { AnswerType, QuestionsAndAnswersType } from "@/app/api/apiRoutes";
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
  SingleAnswer = "SINGLE_CHOICE",
  BooleanAnswer = "TRUE_FALSE",
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

  const [optionOne, setOptionOne] = useState<AnswerType>(
    questionsAndAnswers
      ? questionsAndAnswers.options[0]
      : { answerId: "", answerText: "" }
  );
  const [optionTwo, setOptionTwo] = useState<AnswerType>(
    questionsAndAnswers
      ? questionsAndAnswers.options[1]
      : { answerId: "", answerText: "" }
  );
  const [optionThree, setOptionThree] = useState<AnswerType>(
    questionsAndAnswers
      ? questionsAndAnswers.options[2]
      : { answerId: "", answerText: "" }
  );
  const [optionFour, setOptionFour] = useState<AnswerType>(
    questionsAndAnswers
      ? questionsAndAnswers.options[3]
      : { answerId: "", answerText: "" }
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
  const [selectedImageFiles, setSelectedImageFiles] = useState<any>([]);
  const [validAnswersEntered, setValidAnswersEntered] =
    useState<boolean>(false);

  const onAnswerTypeOptionSelected = (value: AnswerTypeEnums): void => {
    setAnswerTypeSelected(value);
  };

  const handleContentChange = async (): Promise<void> => {
    const optionsList: AnswerType[] =
      answerTypeSelected === AnswerTypeEnums.BooleanAnswer
        ? [
            { answerId: optionOne.answerId, answerText: "true" },
            { answerId: optionTwo.answerId, answerText: "false" },
            { answerId: optionOne.answerId, answerText: "true" },
            { answerId: optionTwo.answerId, answerText: "false" },
          ]
        : [optionOne, optionTwo, optionThree, optionFour];

    if (selectedImageFiles.length > 0) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedImageFiles[0]);

      const imageBlobs: Blob[] = [];
      const promises = [];

      for (const file of selectedImageFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        promises.push(
          new Promise((resolve, reject) => {
            reader.onload = (event: any) => {
              const base64Image = event.target.result;
              console.log("cc ", base64Image);
              imageBlobs.push(base64Image);
            };
          })
        );
      }

      const newQuestionsAndAnswers: QuestionsAndAnswersType = {
        questionId: questionsAndAnswers ? questionsAndAnswers.questionId : "0",
        question,
        image_data: selectedImageFiles.length > 0 ? imageBlobs : undefined,
        answerType: answerTypeSelected,
        options: optionsList,
        correctOption,
      };

      updateQuestionsAndAnswersListValues(newQuestionsAndAnswers, index);
    }
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
    selectedImageFiles,
  ]);

  useEffect(() => {
    const validAnswersResponse: boolean =
      optionOne.answerText !== "" &&
      optionTwo.answerText !== "" &&
      optionThree.answerText !== "" &&
      optionFour.answerText !== "";
    setValidAnswersEntered(validAnswersResponse);
  }, [
    optionOne.answerText,
    optionTwo.answerText,
    optionThree.answerText,
    optionFour.answerText,
    answerTypeSelected,
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
        <QuestionImageData
          image_data={questionsAndAnswers?.image_data}
          selectedImageFiles={selectedImageFiles}
          setSelectedImageFiles={setSelectedImageFiles}
        />
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
        <span className="w-40">Answers</span>
        {answerTypeSelected !== AnswerTypeEnums.BooleanAnswer && (
          <div className="flex gap-4 text-black flex-col md:flex-row">
            <Input
              placeholder="Answer 1"
              defaultValue={questionsAndAnswers?.options[0].answerText}
              value={optionOne.answerText}
              onChange={(e) => {
                setOptionOne({
                  answerId: optionOne.answerId,
                  answerText: e.target.value,
                });
              }}
            />
            <Input
              placeholder="Answer 2"
              defaultValue={questionsAndAnswers?.options[1].answerText}
              value={optionTwo.answerText}
              onChange={(e) => {
                setOptionTwo({
                  answerId: optionTwo.answerId,
                  answerText: e.target.value,
                });
              }}
            />
            <Input
              placeholder="Answer 3"
              defaultValue={questionsAndAnswers?.options[2].answerText}
              value={optionThree.answerText}
              onChange={(e) => {
                setOptionThree({
                  answerId: optionThree.answerId,
                  answerText: e.target.value,
                });
              }}
            />
            <Input
              placeholder="Answer 4"
              defaultValue={questionsAndAnswers?.options[3].answerText}
              value={optionFour.answerText}
              onChange={(e) => {
                setOptionFour({
                  answerId: optionFour.answerId,
                  answerText: e.target.value,
                });
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
        <span className="w-40">Correct Answer</span>
        {answerTypeSelected === AnswerTypeEnums.MultipleChoiceAnswers &&
          validAnswersEntered && (
            <MultipleCorrectOptionComponent
              optionList={[
                optionOne.answerText,
                optionTwo.answerText,
                optionThree.answerText,
                optionFour.answerText,
              ]}
              correctOptionList={
                questionsAndAnswers ? questionsAndAnswers.correctOption : []
              }
              setCorrectOption={setCorrectOption}
            />
          )}
        {answerTypeSelected === AnswerTypeEnums.SingleAnswer &&
          validAnswersEntered && (
            <SingleCorrectAnswerComponent
              optionList={[
                optionOne.answerText,
                optionTwo.answerText,
                optionThree.answerText,
                optionFour.answerText,
              ]}
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnswerTypeEnums } from "../QuestionForm/QuestionForm";

export interface AnswerTypeComponentProps {
  defaultOptionSelected?: AnswerTypeEnums | string;
  onAnswerTypeOptionSelected: (value: AnswerTypeEnums) => void;
}

export default function AnswerTypeComponent({
  defaultOptionSelected,
  onAnswerTypeOptionSelected,
}: AnswerTypeComponentProps) {
  const onAnswerTypeValueChange = (value: AnswerTypeEnums): void => {
    let answerType: AnswerTypeEnums = value;
    onAnswerTypeOptionSelected(answerType);
  };

  return (
    <div className="text-black">
      <Select
        defaultValue={
          defaultOptionSelected ? defaultOptionSelected : "MULTIPLE_CHOICE"
        }
        onValueChange={onAnswerTypeValueChange}
      >
        <SelectTrigger className="md:w-[324px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="md:w-[324px]">
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            <SelectItem value={AnswerTypeEnums.MultipleChoiceAnswers}>
              Multiple Choice Answers
            </SelectItem>
            <SelectItem value={AnswerTypeEnums.SingleAnswer}>
              Single Answer
            </SelectItem>
            <SelectItem value={AnswerTypeEnums.BooleanAnswer}>
              True / False Answer
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

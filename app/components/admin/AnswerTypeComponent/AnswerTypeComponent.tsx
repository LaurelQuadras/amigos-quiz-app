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
  onAnswerTypeOptionSelected: (value: AnswerTypeEnums) => void;
}

export default function AnswerTypeComponent({
  onAnswerTypeOptionSelected,
}: AnswerTypeComponentProps) {
  return (
    <div>
      <Select onValueChange={onAnswerTypeOptionSelected}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
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

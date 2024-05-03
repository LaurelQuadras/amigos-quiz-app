import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export interface SingleCorrectAnswerComponentProps {
  correctOptionsList: string[];
  correctOption?: string;
  setCorrectOption: Dispatch<SetStateAction<string[]>>;
}

export default function SingleCorrectAnswerComponent({
  correctOptionsList,
  correctOption,
  setCorrectOption,
}: SingleCorrectAnswerComponentProps) {
  const handleValueChange = (value: string): void => {
    setCorrectOption([value]);
  };

  return (
    <div>
      <Select defaultValue={correctOption} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup onChange={() => console.log("s")}>
            <SelectLabel>Options</SelectLabel>
            <SelectItem value={correctOptionsList[0]}>
              {correctOptionsList[0]}
            </SelectItem>
            <SelectItem value={correctOptionsList[1]}>
              {correctOptionsList[1]}
            </SelectItem>
            <SelectItem value={correctOptionsList[2]}>
              {correctOptionsList[2]}
            </SelectItem>
            <SelectItem value={correctOptionsList[3]}>
              {correctOptionsList[3]}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

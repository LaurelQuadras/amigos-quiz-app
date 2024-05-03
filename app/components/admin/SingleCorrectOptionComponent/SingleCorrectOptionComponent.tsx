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
  optionList: string[];
  correctOption?: string;
  setCorrectOption: Dispatch<SetStateAction<string[]>>;
}

export default function SingleCorrectAnswerComponent({
  optionList,
  correctOption,
  setCorrectOption,
}: SingleCorrectAnswerComponentProps) {
  const handleValueChange = (value: string): void => {
    setCorrectOption([value]);
  };

  return (
    <div className="text-black">
      <Select defaultValue={correctOption} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup onChange={() => console.log("s")}>
            <SelectLabel>Options</SelectLabel>
            <SelectItem value={optionList[0]}>{optionList[0]}</SelectItem>
            <SelectItem value={optionList[1]}>{optionList[1]}</SelectItem>
            <SelectItem value={optionList[2]}>{optionList[2]}</SelectItem>
            <SelectItem value={optionList[3]}>{optionList[3]}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

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

export interface TrueFalseComponentProps {
  correctOption?: string;
  setCorrectOption: Dispatch<SetStateAction<string[]>>;
}

export default function TrueFalseComponent({
  correctOption,
  setCorrectOption,
}: TrueFalseComponentProps) {
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
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            <SelectItem value="true" className="text-sm">
              True
            </SelectItem>
            <SelectItem value="false" className="text-sm">
              False
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

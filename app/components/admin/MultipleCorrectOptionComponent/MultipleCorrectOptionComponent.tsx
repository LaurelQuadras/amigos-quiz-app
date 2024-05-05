import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export interface MultipleCorrectOptionComponentProps {
  optionList: string[];
  correctOptionList: string[];
  setCorrectOption: Dispatch<SetStateAction<string[]>>;
}

export default function MultipleCorrectOptionComponent({
  optionList,
  correctOptionList,
  setCorrectOption,
}: MultipleCorrectOptionComponentProps) {
  const [optionOne, setOptionOne] = useState<Checked>(
    correctOptionList.includes(optionList[0]) ? true : false
  );
  const [optionTwo, setOptionTwo] = useState<Checked>(
    correctOptionList.includes(optionList[1]) ? true : false
  );
  const [optionThree, setOptionThree] = useState<Checked>(
    correctOptionList.includes(optionList[2]) ? true : false
  );
  const [optionFour, setOptionFour] = useState<Checked>(
    correctOptionList.includes(optionList[3]) ? true : false
  );

  const [selectedOptions, setSelectedOptions] = useState<string>("");

  useEffect(() => {
    let selectedOptionsText: string = "";
    if (optionOne) {
      selectedOptionsText = selectedOptionsText + optionList[0];
    }
    if (optionTwo) {
      selectedOptionsText = selectedOptionsText + ", " + optionList[1];
    }
    if (optionThree) {
      selectedOptionsText = selectedOptionsText + ", " + optionList[2];
    }
    if (optionFour) {
      selectedOptionsText = selectedOptionsText + ", " + optionList[3];
    }
    if (selectedOptionsText[0] === ",") {
      selectedOptionsText = selectedOptionsText.slice(1);
    }
    setSelectedOptions(selectedOptionsText);
    let validCorrectOptions: string[] = selectedOptionsText
      .split(",")
      .map((a) => a.trim());

    setCorrectOption(validCorrectOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionOne, optionTwo, optionThree, optionFour]);

  return (
    <div className="md:w-[180px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-black text-wrap h-fit">
            {selectedOptions ? selectedOptions : "Options"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={optionOne}
            onCheckedChange={setOptionOne}
          >
            {optionList[0]}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionTwo}
            onCheckedChange={setOptionTwo}
          >
            {optionList[1]}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionThree}
            onCheckedChange={setOptionThree}
          >
            {optionList[2]}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionFour}
            onCheckedChange={setOptionFour}
          >
            {optionList[3]}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

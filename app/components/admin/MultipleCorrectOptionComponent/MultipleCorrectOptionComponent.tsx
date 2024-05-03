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
  correctOptionsList: string[];
  setCorrectOption: Dispatch<SetStateAction<string[]>>;
}

export default function MultipleCorrectOptionComponent({
  correctOptionsList,
  setCorrectOption,
}: MultipleCorrectOptionComponentProps) {
  const [optionOne, setOptionOne] = useState<Checked>(
    correctOptionsList
      ? correctOptionsList.includes("One")
        ? true
        : false
      : false
  );
  const [optionTwo, setOptionTwo] = useState<Checked>(
    correctOptionsList
      ? correctOptionsList.includes("Two")
        ? true
        : false
      : false
  );
  const [optionThree, setOptionThree] = useState<Checked>(
    correctOptionsList
      ? correctOptionsList.includes("Three")
        ? true
        : false
      : false
  );
  const [optionFour, setOptionFour] = useState<Checked>(
    correctOptionsList
      ? correctOptionsList.includes("Four")
        ? true
        : false
      : false
  );

  const [selectedOptions, setSelectedOptions] = useState<string>("");

  useEffect(() => {
    let selectedOptionsText: string = "";
    if (optionOne) {
      selectedOptionsText = selectedOptionsText + correctOptionsList[0];
    }
    if (optionTwo) {
      selectedOptionsText = selectedOptionsText + ", " + correctOptionsList[1];
    }
    if (optionThree) {
      selectedOptionsText = selectedOptionsText + ", " + correctOptionsList[2];
    }
    if (optionFour) {
      selectedOptionsText = selectedOptionsText + ", " + correctOptionsList[3];
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
    <div className="w-[180px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {selectedOptions ? selectedOptions : "Please choose your options"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={optionOne}
            onCheckedChange={setOptionOne}
          >
            {correctOptionsList[0]}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionTwo}
            onCheckedChange={setOptionTwo}
          >
            {correctOptionsList[1]}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionThree}
            onCheckedChange={setOptionThree}
          >
            {correctOptionsList[2]}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionFour}
            onCheckedChange={setOptionFour}
          >
            {correctOptionsList[3]}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

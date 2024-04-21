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
import { useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function CorrectOptionComponent() {
  const [optionOne, setOptionOne] = useState<Checked>(false);
  const [optionTwo, setOptionTwo] = useState<Checked>(false);
  const [optionThree, setOptionThree] = useState<Checked>(false);
  const [optionFour, setOptionFour] = useState<Checked>(false);

  return (
    <div className="w-[180px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Please choose your options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={optionOne}
            onCheckedChange={setOptionOne}
          >
            Option One
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionTwo}
            onCheckedChange={setOptionTwo}
          >
            Option Two
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionThree}
            onCheckedChange={setOptionThree}
          >
            Option Three
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={optionFour}
            onCheckedChange={setOptionFour}
          >
            Option Four
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

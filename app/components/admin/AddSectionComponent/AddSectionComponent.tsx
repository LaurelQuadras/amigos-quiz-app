import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnswerTypeEnums, AuthorityEnums } from "../QuestionForm/QuestionForm";

export interface AddSectionComponentProps {
  onAddNewSection: (
    newSection: string,
    newDescription: string,
    newSubSectionValue: string,
    newSubSubjectDescriptionValue: string,
    newAuthority: AuthorityEnums
  ) => void;
}

export default function AddSectionComponent({
  onAddNewSection,
}: AddSectionComponentProps) {
  const [open, setOpen] = useState(false);

  const onFormSubmitButtonClick = (
    event: any,
    newSectionValue: string,
    newDescriptionValue: string,
    newSubSectionValue: string,
    newSubSubjectDescriptionValue: string,
    newAuthority: AuthorityEnums
  ): void => {
    event.preventDefault();
    onAddNewSection(
      newSectionValue,
      newSubSectionValue,
      newDescriptionValue,
      newSubSubjectDescriptionValue,
      newAuthority
    );
    setOpen(false);
  };

  return (
    <div className="max-w-ful">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <div className="w-full p-3 bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white">
            Add a new Section
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-72 sm:max-w-[425px] bg-slate-900 overflow-y-scroll md:overflow-auto max-h-[400px] md:max-h-full">
          <DialogHeader>
            <DialogTitle className="text-white">Add Section</DialogTitle>
            <DialogDescription>
              {`Please add a Section. Make sure that it doesn't exist before. Click on Save Button after adding a section.`}
            </DialogDescription>
          </DialogHeader>
          <ProfileForm onFormSubmitButtonClick={onFormSubmitButtonClick} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ProfileFormProps {
  onFormSubmitButtonClick: (
    event: any,
    newSectionValue: string,
    newDescriptionValue: string,
    newSubSectionValue: string,
    newSubSubjectDescriptionValue: string,
    newAuthority: AuthorityEnums
  ) => void;
}

function ProfileForm({ onFormSubmitButtonClick }: ProfileFormProps) {
  const [newSubject, setNewSubject] = useState<string>("");
  const [newSubjectDescription, setNewSubjectDescription] =
    useState<string>("");
  const [newSubSubject, setNewSubSubject] = useState<string>("");
  const [newSubSubjectDescription, setNewSubSubjectDescription] =
    useState<string>("");
  const [newAuthority, setNewAuthority] = useState<AuthorityEnums>(
    AuthorityEnums.ALL
  );

  const [error, setError] = useState<string>("");

  const onFormSubmitClick = (
    event: any,
    newSectionValue: string,
    newSubSectionValue: string,
    newDescriptionValue: string,
    newSubSubjectDescriptionValue: string,
    newAuthority: AuthorityEnums
  ): void => {
    event.preventDefault();

    if (newSubject === "" || newSubSubject === "") {
      setError("Subject Name and Sub Subject name is mandatory field");
      return;
    } else {
      setError("");
      onFormSubmitButtonClick(
        event,
        newSectionValue,
        newDescriptionValue,
        newSubSectionValue,
        newSubSubjectDescriptionValue,
        newAuthority
      );
    }
  };

  const onAuthorityChange = (value: AuthorityEnums): void => {
    let answerType: AuthorityEnums = value;
    setNewAuthority(answerType);
  };

  return (
    <form
      className={cn("grid items-start gap-4")}
      onSubmit={(e: any) =>
        onFormSubmitClick(
          e,
          newSubject,
          newSubSubject,
          newSubjectDescription,
          newSubSubjectDescription,
          newAuthority
        )
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="section" className="text-white">
          Subject
        </Label>
        <Input
          type="text"
          id="section"
          value={newSubject}
          onChange={(e: any) => setNewSubject(e.target.value)}
        />
        <span className="text-sm text-red-600">{error}</span>
        <br />
        <Label htmlFor="description" className="text-white">
          Subject Description
        </Label>
        <Input
          type="text"
          id="description"
          value={newSubjectDescription}
          onChange={(e: any) => setNewSubjectDescription(e.target.value)}
        />
        <br />
        <Label htmlFor="section" className="text-white">
          Sub-subject
        </Label>
        <Input
          type="text"
          id="section"
          value={newSubSubject}
          onChange={(e: any) => setNewSubSubject(e.target.value)}
        />
        <span className="text-sm text-red-600">{error}</span>
        <br />
        <Label htmlFor="subsubjectdescription" className="text-white">
          Sub-subject Description
        </Label>
        <Input
          type="text"
          id="description"
          value={newSubSubjectDescription}
          onChange={(e: any) => setNewSubSubjectDescription(e.target.value)}
        />
        <br />
      </div>
      <Label htmlFor="authoritydescription" className="text-white">
        Authority
      </Label>
      <div className="w-full flex justify-center">
        <Select defaultValue={newAuthority} onValueChange={onAuthorityChange}>
          <SelectTrigger className="md:w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent className="md:w-full">
            <SelectGroup>
              <SelectLabel>Options</SelectLabel>
              <SelectItem value={AuthorityEnums.ALL}>All</SelectItem>
              <SelectItem value={AuthorityEnums.BASIC}>Basic</SelectItem>
              <SelectItem value={AuthorityEnums.ADVANCE}>Advance</SelectItem>
              <SelectItem value={AuthorityEnums.PREMIUM}>Premium</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <br />
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          className="bg-lime-600 text-black hover:bg-lime-900 w-48"
        >
          Save changes
        </Button>
      </div>
    </form>
  );
}

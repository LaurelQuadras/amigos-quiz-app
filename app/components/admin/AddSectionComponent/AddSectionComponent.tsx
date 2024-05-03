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

export interface AddSectionComponentProps {
  onAddNewSection: (
    newSection: string,
    newSubSectionValue: string,
    newDescription: string
  ) => void;
}

export default function AddSectionComponent({
  onAddNewSection,
}: AddSectionComponentProps) {
  const [open, setOpen] = useState(false);

  const onFormSubmitButtonClick = (
    event: any,
    newSectionValue: string,
    newSubSectionValue: string,
    newDescriptionValue: string
  ): void => {
    event.preventDefault();
    onAddNewSection(newSectionValue, newSubSectionValue, newDescriptionValue);
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
        <DialogContent className="sm:max-w-[425px] bg-slate-900">
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
    newSubSectionValue: string,
    newDescriptionValue: string
  ) => void;
}

function ProfileForm({ onFormSubmitButtonClick }: ProfileFormProps) {
  const [newSection, setNewSection] = useState<string>("");
  const [newSubSection, setNewSubSection] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onFormSubmitClick = (
    event: any,
    newSectionValue: string,
    newSubSectionValue: string,
    newDescriptionValue: string
  ): void => {
    event.preventDefault();

    if (newSection === "") {
      setError("Subject Name is mandatory field");
      return;
    } else {
      setError("");
      onFormSubmitButtonClick(
        event,
        newSectionValue,
        newSubSectionValue,
        newDescriptionValue
      );
    }
  };

  return (
    <form
      className={cn("grid items-start gap-4")}
      onSubmit={(e: any) =>
        onFormSubmitClick(e, newSection, newSubSection, newDescription)
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="section" className="text-white">
          Section
        </Label>
        <Input
          type="text"
          id="section"
          value={newSection}
          onChange={(e: any) => setNewSection(e.target.value)}
        />
        <span className="text-sm text-red-600">{error}</span>
        <br />
        <Label htmlFor="section" className="text-white">
          Sub Section
        </Label>
        <Input
          type="text"
          id="section"
          value={newSubSection}
          onChange={(e: any) => setNewSubSection(e.target.value)}
        />
        <br />
        <Label htmlFor="description" className="text-white">
          Description
        </Label>
        <Input
          type="text"
          id="description"
          value={newDescription}
          onChange={(e: any) => setNewDescription(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          className="bg-white text-black hover:bg-slate-300 w-48"
        >
          Save changes
        </Button>
      </div>
    </form>
  );
}

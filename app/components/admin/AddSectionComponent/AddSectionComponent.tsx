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
  onAddNewSection: (newSection: string, newDescription: string) => void;
}

export default function AddSectionComponent({
  onAddNewSection,
}: AddSectionComponentProps) {
  const [open, setOpen] = useState(false);

  const onFormSubmitButtonClick = (
    event: any,
    newSectionValue: string,
    newDescriptionValue: string
  ): void => {
    event.preventDefault();
    onAddNewSection(newSectionValue, newDescriptionValue);
    setOpen(false);
  };

  return (
    <div className="w-full max-w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <div className="w-full p-3 bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white">
            Add a new Section
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Section</DialogTitle>
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
    newDescriptionValue: string
  ) => void;
}

function ProfileForm({ onFormSubmitButtonClick }: ProfileFormProps) {
  const [newSection, setNewSection] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  return (
    <form
      className={cn("grid items-start gap-4")}
      onSubmit={(e: any) =>
        onFormSubmitButtonClick(e, newSection, newDescription)
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="section">Section</Label>
        <Input
          type="text"
          id="section"
          value={newSection}
          onChange={(e: any) => setNewSection(e.target.value)}
        />
        <br />
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          value={newDescription}
          onChange={(e: any) => setNewDescription(e.target.value)}
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

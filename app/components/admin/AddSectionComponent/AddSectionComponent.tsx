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
  onAddNewSection: (value: string) => void;
}

export default function AddSectionComponent({
  onAddNewSection,
}: AddSectionComponentProps) {
  const [open, setOpen] = useState(false);

  const onFormSubmitButtonClick = (
    event: any,
    newSectionValue: string
  ): void => {
    event.preventDefault();
    onAddNewSection(newSectionValue);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Section</Button>
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
  onFormSubmitButtonClick: (event: any, newSectionValue: string) => void;
}

function ProfileForm({ onFormSubmitButtonClick }: ProfileFormProps) {
  const [newSection, setNewSection] = useState<string>("");
  return (
    <form
      className={cn("grid items-start gap-4")}
      onSubmit={(e: any) => onFormSubmitButtonClick(e, newSection)}
    >
      <div className="grid gap-2">
        <Label htmlFor="section">Section</Label>
        <Input
          type="text"
          id="section"
          value={newSection}
          onChange={(e: any) => setNewSection(e.target.value)}
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

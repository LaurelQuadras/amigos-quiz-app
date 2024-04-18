import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import CorrectOptionComponent from "../CorrectOptionComponent/CorrectOptionComponent";

export interface QuestionFormInterface {
  index: number;
}

export default function QuestionForm({ index }: QuestionFormInterface) {
  return (
    <>
      <div className="flex gap-8 items-center">
        <span className="w-40">Question {index}</span>
        <div className="w-[1010px]">
          <Textarea placeholder="Please enter your question here." />
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <span className="w-40">Options</span>
        <div className="flex gap-4">
          <Input placeholder="Option 1" />
          <Input placeholder="Option 2" />
          <Input placeholder="Option 3" />
          <Input placeholder="Option 4" />
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <span className="w-40">Correct Option</span>
        <div>
          <CorrectOptionComponent />
        </div>
      </div>
    </>
  );
}

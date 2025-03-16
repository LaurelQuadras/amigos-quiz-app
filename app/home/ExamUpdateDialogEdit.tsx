import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExamsTable from "./ExamsTable";
import { QuestionMode } from "./ExamsQuestions";

export interface ExamUpdateDialogEditProps {
  height: number;
  buttonWidth: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
  textColor: string;
}

export default function ExamUpdateDialogEdit({
  height,
  buttonWidth,
  backgroundColor,
  hoverBackgroundColor,
  textColor,
}: ExamUpdateDialogEditProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger className={`w-${buttonWidth} flex flex-wrap`}>
          <div
            className={`w-full h-${height} bg-${backgroundColor} hover:bg-${hoverBackgroundColor} text-${textColor} rounded-lg flex items-center justify-center`}
          >
            Update an Exam
          </div>
        </DialogTrigger>
        <DialogContent className="w-10/12 min-h-[400px] max-w-full bg-slate-900 overflow-y-scroll max-h-8">
          <DialogTitle>
            <span className="text-2xl text-white">
              Please choose the Exam to Update
            </span>
          </DialogTitle>
          <ExamsTable mode={QuestionMode.Editmode} />
        </DialogContent>
      </Dialog>
    </>
  );
}

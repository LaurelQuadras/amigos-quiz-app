import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExamsTable from "./ExamsTable";
import { QuestionMode } from "./ExamsQuestions";

export interface ExamUpdateDialogProps {}

export default function ExamUpdateDialog() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="w-[32rem] h-32 bg-lime-600 hover:bg-lime-900 text-white rounded-xl flex justify-center items-center">
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
    </div>
  );
}

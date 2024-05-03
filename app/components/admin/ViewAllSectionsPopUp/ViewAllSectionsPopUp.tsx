import {
  GetSectionApiType,
  getQuestionsApi,
  getSectionApi,
} from "@/app/api/apiRoutes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import sectionsListValues from "../../../json/sectionsList.json";
import { useRouter } from "next/navigation";

export interface ViewAllSectionsPopUpProps {
  title: string;
}

export default function ViewAllSectionsPopUp({
  title,
}: ViewAllSectionsPopUpProps) {
  const router = useRouter();
  const [sectionsList, setSectionsList] = useState<GetSectionApiType[]>([]);

  const getSectionList = async (): Promise<void> => {
    const response: GetSectionApiType[] = await getSectionApi();
    console.log(sectionsListValues);
    setSectionsList(sectionsListValues);
  };

  useEffect(() => {
    getSectionList();
    getQuestionsApi();
  }, []);

  return (
    <div className="w-full max-w-full">
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="w-full p-3 bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white">
            {title}
          </div>
        </DialogTrigger>
        <DialogContent className="w-10/12 min-h-[400px] max-w-full">
          <DialogHeader>
            <DialogTitle>
              <span className="text-2xl">All Sections</span>
            </DialogTitle>
            <DialogDescription>
              <Table>
                <TableCaption>A list of all sections available.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section ID</TableHead>
                    <TableHead>Section Name</TableHead>
                    <TableHead>Section Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectionsList.map((section: GetSectionApiType) => (
                    <TableRow
                      key={section.subject_id}
                      onClick={() =>
                        router.push(`/admin/edit/${section.subject_id}`)
                      }
                    >
                      <TableCell className="font-medium">
                        {section.subject_id}
                      </TableCell>
                      <TableCell>{section.subject_name}</TableCell>
                      <TableCell>{section.subject_description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { GetSectionApiType, getSectionApi } from "@/app/api/apiRoutes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import EditSectionsRow from "../EditSectionsRow/EditSectionsRow";

export default function EditSectionsPopUp() {
  const [sectionsListApiResponse, setSectionsListApiResponse] = useState<
    GetSectionApiType[]
  >([]);
  const [sectionsList, setSectionsList] = useState<GetSectionApiType[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const getSectionList = async (): Promise<void> => {
    const response: GetSectionApiType[] = await getSectionApi();
    setSectionsListApiResponse(response);
    setSectionsList(response);
  };

  useEffect(() => {
    getSectionList();
  }, []);

  const onSearchTextResponse = (text: string): void => {
    setSearchText(text);
    const newSectionList: GetSectionApiType[] = sectionsListApiResponse.filter(
      (section: GetSectionApiType) => {
        if (
          section.subject_name.includes(text) ||
          section.subject_description.includes(text)
        ) {
          return section;
        }
      }
    );
    setSectionsList(newSectionList);
  };

  return (
    <div className="w-full max-w-full">
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="w-full p-3 bg-white text-black border-2 rounded-lg hover:bg-gray-300 hover:text-white">
            Edit Sections
          </div>
        </DialogTrigger>
        <DialogContent className="w-10/12 min-h-[400px] max-w-full bg-slate-900 overflow-y-scroll max-h-8">
          <DialogHeader>
            <DialogTitle>
              <span className="text-2xl text-white">All Sections</span>
              <span className="w-full flex justify-center">
                <Input
                  placeholder="Enter the searched text"
                  value={searchText}
                  onChange={(e) => {
                    onSearchTextResponse(e.target.value);
                  }}
                  className="w-96 bg-slate-900 text-white"
                />
              </span>
            </DialogTitle>
            <DialogDescription>
              <Table>
                <TableCaption>
                  {sectionsList.length === undefined
                    ? "There are no Subjects created"
                    : "A list of all subjects available."}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject ID</TableHead>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Subject Description</TableHead>
                    <TableHead>Sub-subject Name</TableHead>
                    <TableHead>Sub-subject Description</TableHead>
                    <TableHead>Save</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectionsList.length !== undefined &&
                    sectionsList.map((section: GetSectionApiType) => (
                      <EditSectionsRow
                        key={section.subject_id}
                        section={section}
                        getSectionList={getSectionList}
                      />
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

import { GetSectionApiType, putSectionsApi } from "@/app/api/apiRoutes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { useState } from "react";

export interface EditSectionsRowProps {
  section: GetSectionApiType;
  getSectionList: () => Promise<void>;
}

export default function EditSectionsRow({
  section,
  getSectionList,
}: EditSectionsRowProps) {
  const [subjectName, setSubjectName] = useState<string>(section.subject_name);
  const [subSubject, setSubSubject] = useState<string>(section.sub_subject);
  const [subjectDescription, setSubjectDescription] = useState<string>(
    section.subject_description
  );

  const onSaveButtonClick = async () => {
    const result: any = await putSectionsApi(
      section.subject_id,
      subjectName,
      subSubject,
      subjectDescription
    );
    if (result.error) {
      alert("Two or more subjects cannot have the same Subject Description");
    } else if (result.message.length > 0) {
      alert("Subject Updated succesfully");
      await getSectionList();
    }
  };

  return (
    <TableRow
      key={section.subject_id}
      className="text-white hover:bg-slate-800"
    >
      <TableCell className="font-medium text-white">
        {section.subject_id}
      </TableCell>
      <TableCell className="text-black">
        <Input
          className="w-1/2"
          value={subjectName}
          onChange={(e: any) => setSubjectName(e.target.value)}
        />
      </TableCell>
      <TableCell className="text-black">
        <Input
          className="w-1/2"
          value={subSubject}
          onChange={(e: any) => setSubSubject(e.target.value)}
        />
      </TableCell>
      <TableCell className="text-black">
        <Input
          className="w-1/2"
          value={subjectDescription}
          onChange={(e: any) => setSubjectDescription(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Button
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={onSaveButtonClick}
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
}

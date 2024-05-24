import {
  GetSectionApiType,
  putSectionsApi,
  putSubSubjectApi,
} from "@/app/api/apiRoutes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { AuthorityEnums } from "../QuestionForm/QuestionForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface EditSectionsRowProps {
  section: GetSectionApiType;
  getSectionList: () => Promise<void>;
}

export default function EditSectionsRow({
  section,
  getSectionList,
}: EditSectionsRowProps) {
  const [subjectName, setSubjectName] = useState<string>(section.subject_name);
  const [subjectDescription, setSubjectDescription] = useState<string>(
    section.subject_description
  );
  const [subSubject, setSubSubject] = useState<string>(section.subsection_name);
  const [subSubjectDescription, setSubSubjectDescription] = useState<string>(
    section.subsection_description
  );
  const [authority, setAuthority] = useState<AuthorityEnums>(section.authority);

  useEffect(() => {
    console.log("auu ", section.authority);
  }, [section]);

  const onSaveButtonClick = async () => {
    const subSubjectResponse: any = await putSubSubjectApi(
      section.subject_id,
      section.subsectionID,
      subSubject,
      subSubjectDescription,
      authority
    );

    if (subSubjectResponse.error) {
      alert(
        "Two or more Sub subjects cannot have the same Subject Description"
      );
      return;
    }

    const subjectResponse: any = await putSectionsApi(
      section.subject_id,
      subjectName,
      subjectDescription
    );
    if (subjectResponse.error) {
      alert("Two or more subjects cannot have the same Subject Description");
    } else if (
      subjectResponse.message.length > 0 &&
      subSubjectResponse.message.length > 0
    ) {
      alert("Subject and SubSubject Updated succesfully");
      await getSectionList();
    }
  };

  const onAuthorityChange = (value: AuthorityEnums): void => {
    let answerType: AuthorityEnums = value;
    setAuthority(answerType);
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
          className="w"
          value={subjectName}
          onChange={(e: any) => setSubjectName(e.target.value)}
        />
      </TableCell>
      <TableCell className="text-black">
        <Input
          className="w"
          value={subjectDescription}
          onChange={(e: any) => setSubjectDescription(e.target.value)}
        />
      </TableCell>
      <TableCell className="text-black">
        <Input
          className="w"
          value={subSubject}
          onChange={(e: any) => setSubSubject(e.target.value)}
        />
      </TableCell>
      <TableCell className="text-black">
        <Input
          className="w"
          value={subSubjectDescription}
          onChange={(e: any) => setSubSubjectDescription(e.target.value)}
        />
      </TableCell>
      <TableCell className="text-black">
        <Select defaultValue={authority} onValueChange={onAuthorityChange}>
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
      </TableCell>
      <TableCell>
        <Button
          className="bg-lime-600 text-black px-4 py-2 rounded-lg hover:bg-lime-900"
          onClick={onSaveButtonClick}
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
}

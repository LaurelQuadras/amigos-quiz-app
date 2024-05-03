import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SectionComponentProps {
  sectionsList: string[];
  onSectionOptionSelected: (value: string) => void;
}

export default function SectionComponent({
  sectionsList,
  onSectionOptionSelected,
}: SectionComponentProps) {
  return (
    <div className="text-black">
      <Select onValueChange={onSectionOptionSelected}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a section" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sections</SelectLabel>
            {sectionsList.map((section: string) => (
              <SelectItem key={section} value={section} className="text-black">
                {section}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

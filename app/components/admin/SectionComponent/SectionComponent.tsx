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
    <div>
      <Select onValueChange={onSectionOptionSelected}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a section" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sections</SelectLabel>
            {sectionsList.map((section: string) => (
              <SelectItem key={section} value={section}>
                {section}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

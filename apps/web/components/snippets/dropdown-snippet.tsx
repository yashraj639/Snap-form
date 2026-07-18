import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { Label } from "@repo/ui/components/ui/label";
import type { DropdownSnippetProps } from "./types";

export function DropdownSnippet({
  element,
  value = "",
  onChange,
  readOnly,
}: DropdownSnippetProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={element.id}>
        {element.label}
        {element.required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {element.description && (
        <p className="text-xs text-muted-foreground">{element.description}</p>
      )}
      <Select
        value={value}
        onValueChange={(val) => val && onChange?.(val)}
        disabled={readOnly}
        required={element.required}
      >
        <SelectTrigger>
          <SelectValue placeholder={element.placeholder ?? "Select an option…"} />
        </SelectTrigger>
        <SelectPopup>
          {element.options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  );
}

import { RadioGroup, Radio } from "@repo/ui/components/ui/radio-group";
import { Label } from "@repo/ui/components/ui/label";
import type { MultipleChoiceSnippetProps } from "./types";

export function MultipleChoiceSnippet({
  element,
  value = "",
  onChange,
  readOnly,
}: MultipleChoiceSnippetProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium leading-none mb-1">
        {element.label}
        {element.required && <span className="ml-1 text-destructive">*</span>}
      </legend>
      {element.description && (
        <p className="text-xs text-muted-foreground -mt-1">{element.description}</p>
      )}
      <RadioGroup
        value={value}
        onValueChange={(val) => !readOnly && onChange?.(val)}
        disabled={readOnly}
      >
        {element.options.map((option) => (
          <Label
            key={option.id}
            className="flex items-center gap-2.5 cursor-pointer font-normal"
          >
            <Radio value={option.id} />
            {option.label}
          </Label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}

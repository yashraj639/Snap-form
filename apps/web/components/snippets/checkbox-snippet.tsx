import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Label } from "@repo/ui/components/ui/label";
import type { CheckboxSnippetProps } from "./types";

export function CheckboxSnippet({
  element,
  value = [],
  onChange,
  readOnly,
}: CheckboxSnippetProps) {
  const toggle = (optionId: string) => {
    if (readOnly) return;
    const next = value.includes(optionId)
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];
    onChange?.(next);
  };

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium leading-none mb-1">
        {element.label}
        {element.required && <span className="ml-1 text-destructive">*</span>}
      </legend>
      {element.description && (
        <p className="text-xs text-muted-foreground -mt-1">{element.description}</p>
      )}
      {element.options.map((option) => (
        <Label
          key={option.id}
          className="flex items-center gap-2.5 cursor-pointer font-normal"
        >
          <Checkbox
            checked={value.includes(option.id)}
            disabled={readOnly}
            onCheckedChange={() => toggle(option.id)}
          />
          {option.label}
        </Label>
      ))}
    </fieldset>
  );
}

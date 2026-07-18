import {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldInput,
  NumberFieldIncrement,
} from "@repo/ui/components/ui/number-field";
import { Label } from "@repo/ui/components/ui/label";
import type { NumberInputSnippetProps } from "./types";

export function NumberInputSnippet({
  element,
  value,
  onChange,
  readOnly,
}: NumberInputSnippetProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={element.id}>
        {element.label}
        {element.required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {element.description && (
        <p className="text-xs text-muted-foreground">{element.description}</p>
      )}
      <NumberField
        id={element.id}
        value={value ?? undefined}
        onValueChange={(val) => onChange?.(val ?? null)}
        min={element.min}
        max={element.max}
        step={element.step}
        disabled={readOnly}
        required={element.required}
      >
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput placeholder={element.placeholder} />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}

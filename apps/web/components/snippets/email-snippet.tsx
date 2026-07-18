import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import type { EmailSnippetProps } from "./types";

export function EmailSnippet({
  element,
  value = "",
  onChange,
  readOnly,
}: EmailSnippetProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={element.id}>
        {element.label}
        {element.required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {element.description && (
        <p className="text-xs text-muted-foreground">{element.description}</p>
      )}
      <Input
        id={element.id}
        type="email"
        readOnly={readOnly}
        placeholder={element.placeholder ?? "you@example.com"}
        value={value}
        onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
        required={element.required}
      />
    </div>
  );
}

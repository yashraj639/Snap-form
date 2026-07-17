import type { FormDefinition, FormResponseData } from "@repo/types";
import { snippetRegistry, type SnippetType } from "./registry";

type FormRendererProps = {
  definition: FormDefinition;
  values?: FormResponseData;
  onChange?: (elementId: string, value: FormResponseData[string]) => void;
  readOnly?: boolean;
  className?: string;
};

export function FormRenderer({
  definition,
  values = {},
  onChange,
  readOnly = false,
  className,
}: FormRendererProps) {
  return (
    <div className={["flex flex-col gap-6", className].filter(Boolean).join(" ")}>
      {definition.elements.map((element) => {
        const type = element.type as SnippetType;
        const SnippetComponent = snippetRegistry[type];

        if (!SnippetComponent) {
          return (
            <div
              key={element.id}
              className="rounded-md border border-dashed border-muted-foreground/30 px-4 py-3 text-sm text-muted-foreground"
            >
              Unknown element type:{" "}
              <code className="font-mono text-xs">{element.type}</code>
            </div>
          );
        }

        return (
          <SnippetComponent
            key={element.id}
            element={element}
            value={values[element.id]}
            onChange={(value: FormResponseData[string]) =>
              onChange?.(element.id, value)
            }
            readOnly={readOnly}
          />
        );
      })}
    </div>
  );
}

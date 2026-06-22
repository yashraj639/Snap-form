# Form Schema Implementation Checklist

## Phase 1 — Define the JSON Contract

- [x] Decided on top-level shape: `{ version: "1.0", elements[] }` using `elements` as the key
      (consistent with what `form.prisma` was already calling `fields` — the DB column name stays `fields`,
      but the *structure inside it* uses `elements[]` for clarity)
- [x] Supported snippet types in v1:
      `textInput`, `textarea`, `rating`, `multipleChoice`, `checkbox`, `dropdown`,
      `email`, `phone`, `datePicker`, `heading`, `paragraph`
- [x] Shared properties on EVERY element: `id`, `label`, `description`, `required`
      Unique properties per type (e.g. `max` only on rating, `options` only on choice types, `rows` only on textarea)
- [x] `required` lives on input elements only — `heading` and `paragraph` omit it (they're display-only)
- [x] Full JSON structure defined via Zod schema (the schema IS the contract)

## Phase 2 — Zod Schema in @repo/types ✅

- [x] Added `zod` as a dependency to `packages/types/package.json`
- [x] Created `packages/types/src/form-schema.ts`
- [x] Defined `BaseElementSchema` with shared fields
- [x] Defined one Zod schema per element type
- [x] Combined with `z.discriminatedUnion("type", [...])` → `FormElementSchema`
- [x] Defined `FormDefinitionSchema` wrapping `version` + `elements[]`
- [x] Defined `FormResponseDataSchema` for validating submitted response data
- [x] Exported all inferred TypeScript types from `index.ts`
- [x] Added `tsconfig.json` and `check-types` script to the package
- [x] Zero TypeScript errors ✅

## Phase 3 — Snippet Component Registry in @repo/ui ✅

- [x] Created `packages/ui/src/components/snippets/types.ts` — shared prop types
- [x] Created one component per snippet type:
      `text-input-snippet.tsx`, `textarea-snippet.tsx`, `rating-snippet.tsx`,
      `multiple-choice-snippet.tsx`, `checkbox-snippet.tsx`, `dropdown-snippet.tsx`,
      `email-snippet.tsx`, `phone-snippet.tsx`, `date-picker-snippet.tsx`,
      `heading-snippet.tsx`, `paragraph-snippet.tsx`
- [x] Created `registry.ts` — maps every `FormElementType` string to its component
      (TypeScript enforces completeness: missing a type = compile error)
- [x] Created `form-renderer.tsx` — `<FormRenderer definition={...} values={...} onChange={...} />`
      with graceful fallback for unknown types
- [x] Created barrel `index.ts` for clean imports from `@repo/ui/components/snippets`
- [x] Added `@repo/types` as dependency and exposed snippets export path in `package.json`

## Phase 4 — Connect & Validate in API ✅

- [x] Created `apps/api/src/middleware/validate.ts` — generic Zod middleware
      (uses `safeParse`, fills defaults into `req.body`, returns structured 400 errors)
- [x] Created `apps/api/src/lib/form-schemas.ts` — API-layer schemas:
      `CreateFormSchema`, `UpdateFormSchema`, `SubmitResponseSchema`
- [x] Created `apps/api/src/controllers/form.controller.ts` with full CRUD:
      `listForms`, `createForm`, `getForm`, `updateForm`, `deleteForm`, `togglePublish`
      — `getForm` validates the JSON coming OUT of the DB before sending to frontend
- [x] Created `apps/api/src/routes/form/form.routes.ts`
- [x] Wired form router into `apps/api/src/routes/index.ts` at `/api/v1/forms`

## Still To Do

- [x] Write at least one integration test for form creation with invalid `elements` data
      (20 tests, 0 failures — run with `bun test` in `packages/types`)
- [x] Create a `SubmitResponse` route + controller (`POST /api/v1/forms/:id/responses`)
      + `GET /api/v1/forms/:id/responses` (owner-only, paginated)
- [x] Handle the public-facing form render endpoint (no auth required, only `published` forms)
      `GET /api/v1/public/forms/:slug` + `POST /api/v1/public/forms/:slug/responses`
- [x] Form builder UI in the `web` app that writes to the `definition` shape
      3-panel layout: palette → canvas (reorder/delete) → inspector + live preview
      Route: `/builder`

## Key Concepts to Understand

- [ ] What is `z.discriminatedUnion()` vs `z.union()`? Try breaking one and see the error messages
- [ ] How does `z.infer<typeof Schema>` let you avoid writing types twice?
- [ ] Why does `getForm` validate the JSON coming *out* of the DB, not just going in?
- [ ] What does the `version` field on FormDefinition protect against?
- [ ] How does TypeScript's `Record<FormElementType, ComponentType>` enforce registry completeness?

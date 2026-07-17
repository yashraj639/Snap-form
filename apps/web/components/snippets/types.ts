import type {
  TextInputElement,
  RatingElement,
  MultipleChoiceElement,
  CheckboxElement,
  DropdownElement,
  EmailElement,
} from "@repo/types";

// ============================================
// LOCAL ELEMENT TYPES (not in @repo/types)
// ============================================

export type NumberInputElement = {
  id: string;
  type: "numberInput";
  label: string;
  description?: string;
  required: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
};

// ============================================
// SHARED PROP SHAPE
// ============================================

export type SnippetProps<T, V = string | number | boolean | string[] | null> = {
  element: T;
  value?: V;
  onChange?: (value: V) => void;
  readOnly?: boolean;
};

export type TextInputSnippetProps = SnippetProps<TextInputElement, string>;
export type NumberInputSnippetProps = SnippetProps<NumberInputElement, number | null>;
export type RatingSnippetProps = SnippetProps<RatingElement, number>;
export type MultipleChoiceSnippetProps = SnippetProps<MultipleChoiceElement, string>;
export type CheckboxSnippetProps = SnippetProps<CheckboxElement, string[]>;
export type DropdownSnippetProps = SnippetProps<DropdownElement, string>;
export type EmailSnippetProps = SnippetProps<EmailElement, string>;

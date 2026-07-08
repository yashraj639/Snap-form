"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Separator } from "@repo/ui/components/ui/separator";
import { Label } from "@repo/ui/components/ui/label";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  MessageSquare,
  Wrench,
  Type,
  Mail,
  Hash,
  Copy,
  Trash2,
  Plus,
  Send,
  Bot,
  User,
  Eye,
  Monitor,
  Smartphone,
  GripVertical,
  ChevronDown,
  ScrollText,
  ListOrdered,
  MessageCircle,
  Upload,
  Phone,
  Calendar,
  Star,
  AlignLeft,
  Heading,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────────────── */

type FormFieldType =
  | "textInput"
  | "textarea"
  | "email"
  | "phone"
  | "dropdown"
  | "multipleChoice"
  | "checkbox"
  | "datePicker"
  | "rating"
  | "heading";

type FormField = {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder: string;
  required: boolean;
  validateFormat: boolean;
};

type ChatMessage = {
  id: string;
  role: "ai" | "user";
  content: string;
  code?: string;
};

type FormType = "scroll" | "step" | "chat";

/* ── Field Type Metadata ─────────────────────────────────────────── */

const FIELD_TYPE_OPTIONS: { value: FormFieldType; label: string; icon: typeof Type }[] = [
  { value: "textInput", label: "Short Text", icon: Type },
  { value: "textarea", label: "Long Text", icon: AlignLeft },
  { value: "email", label: "Email", icon: Mail },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "dropdown", label: "Dropdown", icon: ChevronDown },
  { value: "multipleChoice", label: "Multiple Choice", icon: ListOrdered },
  { value: "checkbox", label: "Checkbox", icon: Checkbox as unknown as typeof Type },
  { value: "datePicker", label: "Date", icon: Calendar },
  { value: "rating", label: "Rating", icon: Star },
  { value: "heading", label: "Heading", icon: Heading },
];

function getFieldIcon(type: FormFieldType) {
  switch (type) {
    case "textInput": return Type;
    case "textarea": return AlignLeft;
    case "email": return Mail;
    case "phone": return Phone;
    case "dropdown": return ChevronDown;
    case "multipleChoice": return ListOrdered;
    case "checkbox": return Checkbox as unknown as typeof Type;
    case "datePicker": return Calendar;
    case "rating": return Star;
    case "heading": return Heading;
    default: return Type;
  }
}

/* ── Mock Data ───────────────────────────────────────────────────── */

const INITIAL_FIELDS: FormField[] = [
  {
    id: "field-1",
    type: "textInput",
    label: "Full Name",
    placeholder: "Jane Doe",
    required: true,
    validateFormat: false,
  },
  {
    id: "field-2",
    type: "email",
    label: "Email Address",
    placeholder: "jane@example.com",
    required: true,
    validateFormat: true,
  },
];

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "msg-1",
    role: "ai",
    content: "Hi! What kind of form do you want to build today?",
  },
  {
    id: "msg-2",
    role: "user",
    content: "I need an event registration form for a tech meetup.",
  },
  {
    id: "msg-3",
    role: "ai",
    content: "Great. I've drafted a basic structure on the right.",
    code: "Added fields: Name, Email, Role, Dietary Req.",
  },
  {
    id: "msg-4",
    role: "ai",
    content: "Do you want to add payment processing or custom branding?",
  },
];

/* ── Field Config Card ───────────────────────────────────────────── */

function FieldConfigCard({
  field,
  onUpdate,
  onDuplicate,
  onDelete,
}: {
  field: FormField;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const IconComponent = getFieldIcon(field.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="border border-border p-4 bg-background rounded-lg flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border pb-2">
        <span className="font-semibold text-sm text-foreground flex items-center gap-2">
          <GripVertical className="size-3.5 text-muted-foreground cursor-grab" />
          <IconComponent className="size-4" />
          {field.label}
        </span>
        <div className="flex gap-1 text-muted-foreground">
          <button
            onClick={() => onDuplicate(field.id)}
            className="hover:text-foreground transition-colors p-1 rounded"
            aria-label="Duplicate field"
          >
            <Copy className="size-3.5" />
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="hover:text-destructive transition-colors p-1 rounded"
            aria-label="Delete field"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Config */}
      <div className="flex flex-col gap-3">
        {/* Field Type */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Field Type
          </Label>
          <div className="relative">
            <select
              className="w-full border border-border bg-background text-sm p-2 pr-8 outline-none focus:border-foreground transition-colors rounded-md appearance-none"
              value={field.type}
              onChange={(e) =>
                onUpdate(field.id, { type: e.target.value as FormFieldType })
              }
            >
              {FIELD_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Label */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Label
          </Label>
          <input
            className="w-full border border-border bg-background text-sm p-2 outline-none focus:border-foreground transition-colors rounded-md"
            type="text"
            value={field.label}
            onChange={(e) => onUpdate(field.id, { label: e.target.value })}
          />
        </div>

        {/* Placeholder */}
        {field.type !== "heading" && (
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Placeholder
            </Label>
            <input
              className="w-full border border-border bg-background text-sm p-2 outline-none focus:border-foreground transition-colors rounded-md text-muted-foreground"
              type="text"
              value={field.placeholder}
              onChange={(e) =>
                onUpdate(field.id, { placeholder: e.target.value })
              }
            />
          </div>
        )}

        {/* Validation */}
        <div className="flex items-center gap-4 mt-1">
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <Checkbox
              checked={field.required}
              onCheckedChange={(checked) =>
                onUpdate(field.id, { required: !!checked })
              }
            />
            Required
          </label>
          {(field.type === "email" || field.type === "phone") && (
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <Checkbox
                checked={field.validateFormat}
                onCheckedChange={(checked) =>
                  onUpdate(field.id, { validateFormat: !!checked })
                }
              />
              Validate Format
            </label>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Chat Message Bubble ─────────────────────────────────────────── */

function ChatBubble({ message }: { message: ChatMessage }) {
  const isAI = message.role === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-2.5 ${isAI ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
          isAI
            ? "bg-muted border border-border"
            : "bg-foreground"
        }`}
      >
        {isAI ? (
          <Bot className="size-3.5 text-foreground" />
        ) : (
          <User className="size-3.5 text-background" />
        )}
      </div>
      <div
        className={`rounded-lg p-3 text-sm max-w-[85%] flex flex-col gap-2 ${
          isAI
            ? "bg-muted border border-border text-foreground"
            : "bg-background border border-border text-foreground"
        }`}
      >
        <span>{message.content}</span>
        {message.code && (
          <div className="bg-background border border-border rounded p-2 text-xs font-mono text-muted-foreground">
            {message.code}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Live Preview Field Renderer ─────────────────────────────────── */

function PreviewField({ field }: { field: FormField }) {
  if (field.type === "heading") {
    return (
      <div className="py-2">
        <h3 className="font-semibold text-lg text-foreground">{field.label}</h3>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-foreground">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="w-full h-20 border border-border bg-background rounded p-3 text-sm text-muted-foreground">
          {field.placeholder}
        </div>
      </div>
    );
  }

  if (field.type === "dropdown") {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-foreground">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="w-full h-10 border border-border bg-background rounded flex items-center justify-between px-3 text-sm text-muted-foreground">
          <span>{field.placeholder || "Select..."}</span>
          <ChevronDown className="size-4" />
        </div>
      </div>
    );
  }

  if (field.type === "multipleChoice") {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-foreground">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="flex flex-col gap-2">
          {["Option 1", "Option 2", "Option 3"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded-full border border-border" />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-foreground">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="flex gap-4">
          {["Option 1", "Option 2"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded border border-border" />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "rating") {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-foreground">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-5 text-border hover:text-foreground transition-colors cursor-pointer"
            />
          ))}
        </div>
      </div>
    );
  }

  // Default: textInput, email, phone, datePicker
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-sm text-foreground">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        className="w-full border border-border bg-background rounded p-3 text-sm outline-none placeholder:text-muted-foreground"
        placeholder={field.placeholder}
        type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text"}
        readOnly
      />
    </div>
  );
}

/* ── Main Create Form Component ──────────────────────────────────── */

export function CreateFormPage() {
  const [mode, setMode] = useState<"chat" | "manual">("manual");
  const [formTitle, setFormTitle] = useState("Registration Form");
  const [formDescription, setFormDescription] = useState(
    "Please fill out the information below to complete your registration."
  );
  const [formType, setFormType] = useState<FormType>("scroll");
  const [fields, setFields] = useState<FormField[]>(INITIAL_FIELDS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState("");
  const [saveState, setSaveState] = useState<"unsaved" | "saving" | "saved">("unsaved");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  /* ── Field Operations ────────────────────────────────────────── */

  const updateField = useCallback(
    (id: string, updates: Partial<FormField>) => {
      setFields((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
      );
      setSaveState("unsaved");
    },
    []
  );

  const duplicateField = useCallback((id: string) => {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx === -1) return prev;
      const clone = {
        ...prev[idx],
        id: `field-${Date.now()}`,
        label: `${prev[idx].label} (Copy)`,
      };
      const next = [...prev];
      next.splice(idx + 1, 0, clone);
      return next;
    });
    setSaveState("unsaved");
  }, []);

  const deleteField = useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    setSaveState("unsaved");
  }, []);

  const addField = useCallback(() => {
    setFields((prev) => [
      ...prev,
      {
        id: `field-${Date.now()}`,
        type: "textInput",
        label: "New Field",
        placeholder: "Enter value...",
        required: false,
        validateFormat: false,
      },
    ]);
    setSaveState("unsaved");
  }, []);

  /* ── Chat Operations ─────────────────────────────────────────── */

  const sendChatMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: chatInput,
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "ai",
        content:
          "I've updated the form based on your request. Check the preview on the right.",
        code: "Modified fields: Updated structure",
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  }, [chatInput]);

  /* ── Mock Save ───────────────────────────────────────────────── */

  const handlePublish = useCallback(() => {
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 1500);
    setTimeout(() => setSaveState("unsaved"), 5000);
  }, []);

  return (
    <div className="bg-background text-foreground h-screen flex flex-col overflow-hidden">
      {/* ─── Top Navigation ──────────────────────────────────────── */}
      <nav className="border-b border-border bg-background shrink-0 z-10">
        <div className="flex justify-between items-center w-full h-14 px-6 lg:px-8 max-w-[1440px] mx-auto">
          <Link
            href="/dashboard"
            className="font-bold text-lg font-[family-name:var(--font-space-grotesk)] text-foreground"
          >
            Snap-Form
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {saveState === "unsaved" && "Unsaved changes"}
              {saveState === "saving" && "Saving..."}
              {saveState === "saved" && "✓ Published"}
            </span>
            <Button size="sm" onClick={handlePublish}>
              <Upload className="size-3.5" />
              Publish
            </Button>
          </div>
        </div>
      </nav>

      {/* ─── Main Workspace (Split Screen) ───────────────────────── */}
      <main className="flex-1 flex overflow-hidden">
        {/* ── Left Panel ─────────────────────────────────────────── */}
        <aside className="w-full md:w-[400px] border-r border-border bg-background flex flex-col shrink-0 h-full">
          {/* Tab Switcher */}
          <div className="p-4 border-b border-border shrink-0">
            <div className="flex w-full border border-border rounded-lg p-1 bg-muted/30">
              <button
                onClick={() => setMode("chat")}
                className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-all ${
                  mode === "chat"
                    ? "bg-background text-foreground border border-border shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquare className="size-4" />
                Chat
              </button>
              <button
                onClick={() => setMode("manual")}
                className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-all ${
                  mode === "manual"
                    ? "bg-background text-foreground border border-border shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Wrench className="size-4" />
                Manual
              </button>
            </div>
          </div>

          {/* Form Type Selector */}
          <div className="px-4 py-3 border-b border-border shrink-0">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Form Type
            </Label>
            <div className="flex gap-2 mt-2">
              {(
                [
                  { id: "scroll", label: "Scroll", icon: ScrollText },
                  { id: "step", label: "Step", icon: ListOrdered },
                  { id: "chat", label: "Chat", icon: MessageCircle },
                ] as const
              ).map((ft) => (
                <button
                  key={ft.id}
                  onClick={() => setFormType(ft.id)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 border transition-all ${
                    formType === ft.id
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:border-foreground/30"
                  }`}
                >
                  <ft.icon className="size-3.5" />
                  {ft.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {mode === "manual" ? (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full overflow-y-auto p-4 flex flex-col gap-4"
                >
                  <AnimatePresence>
                    {fields.map((field) => (
                      <FieldConfigCard
                        key={field.id}
                        field={field}
                        onUpdate={updateField}
                        onDuplicate={duplicateField}
                        onDelete={deleteField}
                      />
                    ))}
                  </AnimatePresence>

                  {/* Add Field Button */}
                  <button
                    onClick={addField}
                    className="w-full py-3 border border-dashed border-border text-muted-foreground text-sm font-medium hover:border-foreground/30 hover:text-foreground transition-colors flex justify-center items-center gap-2 rounded-lg bg-muted/20"
                  >
                    <Plus className="size-4" />
                    Add Field
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  {/* Chat History */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {chatMessages.map((msg) => (
                      <ChatBubble key={msg.id} message={msg} />
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-3 border-t border-border shrink-0">
                    <div className="flex items-center bg-background border border-border rounded-lg focus-within:border-foreground/50 transition-colors">
                      <input
                        aria-label="Chat prompt input"
                        className="flex-1 bg-transparent border-none text-sm p-3 placeholder:text-muted-foreground outline-none"
                        placeholder="Input prompt..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") sendChatMessage();
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="mr-1 text-foreground"
                        onClick={sendChatMessage}
                      >
                        <Send className="size-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* ── Right Panel: Live Preview ──────────────────────────── */}
        <section className="flex-1 bg-accent/30 overflow-y-auto relative hidden md:flex flex-col">
          {/* Preview Header */}
          <div className="sticky top-0 z-10 px-8 py-4 flex justify-between items-center bg-accent/30 backdrop-blur-sm">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Eye className="size-3.5" />
              Live Preview
            </h2>
            <div className="flex gap-1">
              <Button
                variant={previewMode === "desktop" ? "outline" : "ghost"}
                size="icon-sm"
                onClick={() => setPreviewMode("desktop")}
              >
                <Monitor className="size-4" />
              </Button>
              <Button
                variant={previewMode === "mobile" ? "outline" : "ghost"}
                size="icon-sm"
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone className="size-4" />
              </Button>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="flex-1 flex items-start justify-center p-8 pt-4">
            <motion.div
              className={`bg-background border border-border shadow-sm relative ${
                previewMode === "mobile" ? "w-full max-w-sm" : "w-full max-w-2xl"
              }`}
              animate={{ maxWidth: previewMode === "mobile" ? "24rem" : "42rem" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: "2px" }}
            >
              {/* Subtle blueprint dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative z-10 p-8 md:p-12 flex flex-col gap-6">
                {/* Form Header */}
                <div className="border-b border-border pb-6 mb-2">
                  <input
                    className="w-full font-bold text-2xl md:text-3xl font-[family-name:var(--font-space-grotesk)] text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      setSaveState("unsaved");
                    }}
                    placeholder="Form Title"
                  />
                  <input
                    className="w-full text-sm text-muted-foreground mt-2 bg-transparent outline-none placeholder:text-muted-foreground/50"
                    value={formDescription}
                    onChange={(e) => {
                      setFormDescription(e.target.value);
                      setSaveState("unsaved");
                    }}
                    placeholder="Form description..."
                  />
                </div>

                {/* Form Type Badge */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" size="sm" className="capitalize gap-1">
                    {formType === "scroll" && <ScrollText className="size-3" />}
                    {formType === "step" && <ListOrdered className="size-3" />}
                    {formType === "chat" && <MessageCircle className="size-3" />}
                    {formType} form
                  </Badge>
                </div>

                {/* Rendered Fields */}
                <AnimatePresence>
                  {fields.map((field) => (
                    <motion.div
                      key={field.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PreviewField field={field} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Submit Button */}
                {fields.length > 0 && (
                  <div className="mt-4 pt-6 border-t border-border flex justify-end">
                    <Button>Submit Form</Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

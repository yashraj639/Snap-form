"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "@repo/ui/components/ui/input-group";
import { Separator } from "@repo/ui/components/ui/separator";
import { ArrowRight, Check, X, Loader2 } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";

/* ── Mock Data ───────────────────────────────────────────────────── */

const TAKEN_USERNAMES = ["admin", "test", "snap-form", "snapform"];

type AvailabilityStatus = "idle" | "checking" | "available" | "taken";

/* ── Onboarding Page Component ───────────────────────────────────── */

export function OnboardingPage() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [githubConnected, setGithubConnected] = useState(false);

  /* Mock availability check — simulates a 600ms API call */
  function handleUsernameChange(value: string) {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    setUsername(sanitized);

    if (sanitized.length === 0) {
      setStatus("idle");
      return;
    }

    setStatus("checking");

    /* Simulate network delay */
    setTimeout(() => {
      if (TAKEN_USERNAMES.includes(sanitized)) {
        setStatus("taken");
      } else {
        setStatus("available");
      }
    }, 600);
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex selection:bg-primary selection:text-primary-foreground">
      {/* ─── Left Column: Form ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:flex-none lg:w-1/2 xl:w-5/12 relative">
        {/* Brand Anchor */}
        <div className="absolute top-8 left-6 md:left-12 lg:left-16">
          <Link
            href="/"
            className="font-bold font-[family-name:var(--font-space-grotesk)] text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            Snap-Form
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[400px] mx-auto lg:mx-0 mt-16 lg:mt-0">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-bold font-[family-name:var(--font-space-grotesk)] text-4xl md:text-[40px] leading-[1.2] tracking-[-0.02em] text-foreground mb-2">
              Claim your space
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Set up your profile to start building powerful, data-driven forms.
            </p>
          </div>

          {/* Form Card */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* ── Username Field ─────────────────────────── */}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <div className="w-full relative">
                  <Input
                    id="username"
                    name="username"
                    placeholder="e.g. acmecorp"
                    value={username}
                    onChange={(e) =>
                      handleUsernameChange(
                        (e.target as HTMLInputElement).value,
                      )
                    }
                  />
                  {/* Availability indicator */}
                  {status !== "idle" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {status === "checking" && (
                        <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                      )}
                      {status === "available" && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                      {status === "taken" && (
                        <X className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
                {status === "available" && (
                  <p className="text-xs text-green-600">
                    Username is available!
                  </p>
                )}
                {status === "taken" && (
                  <p className="text-xs text-destructive">
                    Username is already taken.
                  </p>
                )}
              </Field>

              {/* ── Profile Link Field ─────────────────────── */}
              <Field>
                <FieldLabel>Profile Link</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText className="font-mono text-xs select-none">
                      snapform.ai/
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    value={username}
                    readOnly
                    className="font-mono text-xs"
                    placeholder="username"
                  />
                </InputGroup>
                <FieldDescription>
                  This will be your public URL.
                </FieldDescription>
              </Field>

              {/* ── Social Integration ─────────────────────── */}
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4">
                  Social Integration
                </span>
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2"
                  onClick={() => setGithubConnected(!githubConnected)}
                >
                  <GithubIcon className="w-4 h-4" />
                  {githubConnected ? "GitHub Connected ✓" : "Connect GitHub"}
                </Button>
              </div>

              {/* ── CTA ────────────────────────────────────── */}
              <div className="pt-2">
                <Button
                  size="lg"
                  className="w-full justify-center gap-2"
                  disabled={!username || status !== "available"}
                >
                  Continue to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="text-foreground underline hover:opacity-80 transition-opacity"
              >
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* ─── Right Column: Decorative ──────────────────────────── */}
      <div className="hidden lg:flex relative flex-1 bg-accent/30 border-l border-border overflow-hidden items-center justify-center">
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.15,
          }}
        />

        {/* Decorative Mock Dashboard Preview */}
        <div className="relative z-10 w-[460px] max-w-[90%]">
          <Card className="shadow-2xl">
            <CardContent className="p-6 space-y-5">
              {/* Mock header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs font-[family-name:var(--font-space-grotesk)]">
                      SF
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm font-[family-name:var(--font-space-grotesk)]">
                      Snap-Form
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Dashboard Preview
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
              </div>

              <Separator />

              {/* Mock stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Forms", value: "12" },
                  { label: "Responses", value: "1.2k" },
                  { label: "Completion", value: "94%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border p-3 text-center"
                  >
                    <div className="font-bold font-[family-name:var(--font-space-grotesk)] text-lg">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock form list */}
              <div className="space-y-2">
                {[
                  { name: "Customer Feedback", status: "Live" },
                  { name: "Job Application", status: "Live" },
                  { name: "Event Registration", status: "Draft" },
                ].map((form) => (
                  <div
                    key={form.name}
                    className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                  >
                    <span className="text-sm">{form.name}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        form.status === "Live"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-accent text-muted-foreground"
                      }`}
                    >
                      {form.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

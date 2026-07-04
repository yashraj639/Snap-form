"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Separator } from "@repo/ui/components/ui/separator";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

/* ── Inline SVG Icons ────────────────────────────────────────────── */

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "w-5 h-5"}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "w-5 h-5"}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-4 h-4"}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-5 h-5"}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function BranchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-5 h-5"}
    >
      <path d="M6 3v12" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-5 h-5"}
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-4 h-4"}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────── */

function handleOAuthLogin(provider: "google" | "github") {
  // Thread any ?callbackUrl from the middleware redirect through the OAuth flow
  const params = new URLSearchParams(window.location.search);
  const intendedDest = params.get("callbackUrl") ?? "";
  const callbackURL = new URL(`${API_URL}/api/v1/auth/oauth/callback`);
  if (intendedDest) {
    callbackURL.searchParams.set("callbackUrl", intendedDest);
  }
  window.location.href = `${API_URL}/api/auth/sign-in/social?provider=${provider}&callbackURL=${encodeURIComponent(callbackURL.toString())}`;
}

function scrollToGetStarted() {
  document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" });
}

/* ── Main Component ──────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground">
      {/* ─── Navbar ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight"
            >
              Snap-Form
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <a
                href="#features"
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              >
                How It Works
              </a>
              <a
                href="#get-started"
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              >
                Get Started
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={scrollToGetStarted}>
              Sign In
            </Button>
            <Button size="sm" onClick={scrollToGetStarted}>
              Get Started
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* ─── Main Content ───────────────────────────────────────── */}
      <main className="flex-grow pt-16">
        {/* ── Hero Section ───────────────────────────────────────── */}
        <section className="w-full flex flex-col items-center text-center pt-20 md:pt-32 pb-16 md:pb-24 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border bg-accent/50 text-sm text-muted-foreground">
            <SparklesIcon className="w-3.5 h-3.5 text-foreground" />
            <span>AI-native form builder</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-[-0.03em] leading-[1.1] max-w-4xl">
            Forms at the speed
            <br />
            of thought.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            The AI-native form builder for technical teams. Describe your logic,
            and let the engine generate production-ready interfaces instantly.
          </p>

          {/* AI Prompt Pill (decorative teaser) */}
          <div className="w-full max-w-2xl mt-10 relative group">
            <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500 rounded-full" />
            <div
              role="button"
              tabIndex={0}
              onClick={scrollToGetStarted}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") scrollToGetStarted(); }}
              className="relative flex items-center bg-background border border-border rounded-full p-1.5 shadow-sm cursor-pointer transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
            >
              <SparklesIcon className="ml-4 mr-2 text-muted-foreground w-5 h-5 shrink-0" />
              <span className="flex-grow text-muted-foreground text-base h-11 flex items-center select-none">
                Describe your form...
              </span>
              <Button
                className="rounded-full h-10 px-6 shrink-0 pointer-events-none"
                tabIndex={-1}
                aria-hidden
              >
                Generate
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button variant="outline" size="lg" onClick={scrollToGetStarted}>
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="lg"
              render={<Link href="/dashboard" />}
            >
              Open Dashboard
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Button>
          </div>
        </section>

        {/* ── Social Proof ───────────────────────────────────────── */}
        <section className="w-full py-12 border-y border-border bg-accent/30">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">
              Trusted by engineering teams
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-300">
              {[
                { name: "TechCorp", icon: "⚡" },
                { name: "NeuroSys", icon: "🧠" },
                { name: "BuildKite", icon: "🔧" },
                { name: "DataFlow", icon: "📊" },
              ].map((company) => (
                <div
                  key={company.name}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <span className="text-xl">{company.icon}</span>
                  <span className="font-semibold font-[family-name:var(--font-space-grotesk)] text-base">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Bento Grid ────────────────────────────────── */}
        <section
          id="features"
          className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-20 md:py-28 scroll-mt-20"
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight">
              Engineered for speed.
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Stop dragging and dropping. Start prompting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feature 1 — AI Generation */}
            <Card className="group hover:border-primary/50 transition-colors duration-300">
              <CardContent className="p-8 flex flex-col gap-6 h-full">
                <div className="w-12 h-12 rounded-xl border border-border bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-space-grotesk)] text-lg mb-2">
                    AI Generation
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Translate complex natural language requirements into strict
                    JSON schemas and rendering logic instantly.
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-border">
                  <span className="inline-flex items-center text-sm font-medium text-foreground cursor-pointer hover:underline">
                    Explore syntax
                    <ChevronRightIcon className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 — Logic Mapping */}
            <Card className="group hover:border-primary/50 transition-colors duration-300">
              <CardContent className="p-8 flex flex-col gap-6 h-full">
                <div className="w-12 h-12 rounded-xl border border-border bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                  <BranchIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-space-grotesk)] text-lg mb-2">
                    Logic Mapping
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Visual representation of branching paths and validation
                    rules, rendered with stark clarity.
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-border w-full h-24 bg-accent/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <BranchIcon className="w-16 h-16 text-border absolute" />
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 — Analytics */}
            <Card className="group hover:border-primary/50 transition-colors duration-300">
              <CardContent className="p-8 flex flex-col gap-6 h-full">
                <div className="w-12 h-12 rounded-xl border border-border bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                  <ChartIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-space-grotesk)] text-lg mb-2">
                    High-Density Analytics
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Raw performance data. No fluff. Track conversion rates,
                    drop-offs, and interaction times at the field level.
                  </p>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <div className="w-full flex justify-between items-center border-b border-border py-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      /api/v1/submit
                    </span>
                    <span className="font-mono text-xs font-bold text-foreground">
                      12ms
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center border-b border-border py-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      Conversion
                    </span>
                    <span className="font-mono text-xs font-bold text-foreground">
                      68.4%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── How It Works ───────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="w-full bg-accent/30 border-y border-border py-20 md:py-28 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight">
                Three steps. Zero friction.
              </h2>
              <p className="mt-3 text-muted-foreground text-lg">
                From idea to production-ready form in minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Describe",
                  desc: "Write your form requirements in plain English. Include validation rules, branching logic, and field types.",
                },
                {
                  step: "02",
                  title: "Generate",
                  desc: "Our AI engine converts your description into a production-ready form with proper schema validation.",
                },
                {
                  step: "03",
                  title: "Deploy",
                  desc: "Share a link, embed in your app, or export the schema. Get real-time analytics on every submission.",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col gap-4">
                  <span className="font-mono text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    Step {item.step}
                  </span>
                  <h3 className="font-semibold font-[family-name:var(--font-space-grotesk)] text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Get Started / Auth Section ─────────────────────────── */}
        <section
          id="get-started"
          className="w-full max-w-5xl mx-auto px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center scroll-mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight">
              Start building today.
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Sign in to create your first form in seconds.
            </p>
          </div>

          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Welcome to Snap-Form</CardTitle>
              <CardDescription>
                Choose your preferred method to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                id="google-login-btn"
                variant="outline"
                size="lg"
                className="w-full justify-center gap-3"
                onClick={() => handleOAuthLogin("google")}
              >
                <GoogleIcon className="w-5 h-5" />
                Continue with Google
              </Button>

              <Button
                id="github-login-btn"
                variant="outline"
                size="lg"
                className="w-full justify-center gap-3"
                onClick={() => handleOAuthLogin("github")}
              >
                <GitHubIcon className="w-5 h-5" />
                Continue with GitHub
              </Button>

              <div className="relative py-2">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                  or
                </span>
              </div>

              <p className="text-xs text-center text-muted-foreground leading-relaxed">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <footer className="w-full border-t border-border bg-background mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold font-[family-name:var(--font-space-grotesk)] text-sm">
              Snap-Form
            </span>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Snap-Form AI. Precision Engineered.
            </span>
          </div>
          <div className="flex gap-6">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Support", href: "/support" },
              { label: "API", href: "/api-docs" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

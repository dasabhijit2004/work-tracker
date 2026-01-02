"use client";

import { signIn } from "next-auth/react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Work Tracker</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => signIn("google")}
              className="hidden sm:flex items-center gap-2 rounded-full border bg-white px-5 py-2 text-sm font-medium shadow-sm hover:shadow-md transition"
            >
              <GoogleIcon />
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <span className="inline-block mb-4 rounded-full bg-black px-4 py-1 text-xs text-white">
          Productivity • Simplicity • Focus
        </span>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Plan your work.
          <br />
          <span className="text-gray-600">
            Execute with clarity.
          </span>
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-base sm:text-lg">
          Work Tracker is a modern, date-based task management platform that
          helps you stay focused, organized, and productive — one day at a time.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-3 rounded-lg bg-black px-8 py-4 text-white font-medium hover:bg-gray-800 transition"
          >
            <GoogleIcon />
            Get started for free
          </button>

          <a
            href="#features"
            className="rounded-lg border px-8 py-4 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            See how it works
          </a>
        </div>

        {/* Social Proof */}
        <p className="mt-8 text-sm text-gray-500">
          Trusted by students, developers, and professionals
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 pb-32"
      >
        <h3 className="text-3xl font-bold text-center">
          Everything you need to stay productive
        </h3>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature
            title="Date-based planning"
            description="Organize tasks by date with a clean calendar-driven workflow."
          />
          <Feature
            title="Fast & modern UI"
            description="Optimistic updates, smooth animations, and instant feedback."
          />
          <Feature
            title="Secure authentication"
            description="Google sign-in with strict user-level data isolation."
          />
          <Feature
            title="Task completion tracking"
            description="Track pending and completed tasks with clear visual feedback."
          />
          <Feature
            title="Keyboard shortcuts"
            description="Designed for speed with shortcuts and power-user features."
          />
          <Feature
            title="Fully responsive"
            description="Works beautifully on mobile, tablet, and desktop."
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <h3 className="text-3xl font-bold text-center">
            How Work Tracker works
          </h3>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <Step
              step="1"
              title="Sign in securely"
              description="Login using your Google account — no passwords to remember."
            />
            <Step
              step="2"
              title="Plan your day"
              description="Select a date and add tasks you want to accomplish."
            />
            <Step
              step="3"
              title="Stay focused"
              description="Complete tasks, track progress, and stay productive."
            />
          </div>
        </div>
      </section>

      {/* ================= SECURITY ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h3 className="text-3xl font-bold text-center">
          Built with security & privacy in mind
        </h3>

        <div className="mt-10 max-w-3xl mx-auto text-center text-gray-600">
          <p>
            Your data is fully isolated per user. All actions are secured
            server-side, ensuring no one can access or modify your tasks except
            you.
          </p>
          <p className="mt-4">
            We use industry-standard authentication, server-side validation,
            and modern security practices.
          </p>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold">
            Ready to take control of your day?
          </h3>
          <p className="mt-4 text-gray-300">
            Start organizing your work with clarity and focus.
          </p>

          <button
            onClick={() => signIn("google")}
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-white px-8 py-4 text-black font-medium hover:bg-gray-200 transition"
          >
            <GoogleIcon />
            Get started now
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} Work Tracker</span>
          <span className="text-sm">
            Built with Next.js, MongoDB & modern web tech
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Feature({ title, description }: any) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function Step({ step, title, description }: any) {
  return (
    <div>
      <div className="mx-auto h-12 w-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
        {step}
      </div>
      <h4 className="mt-4 text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.9 2.07 30.4 0 24 0 14.6 0 6.51 5.38 2.56 13.22l8.02 6.22C12.5 13.03 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.63-.15-3.2-.43-4.73H24v9.04h12.95c-.56 2.98-2.24 5.51-4.78 7.22l7.73 6.01C44.41 37.57 46.98 31.65 46.98 24.55z"/>
      <path fill="#FBBC05" d="M10.58 28.44c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-8.02-6.22C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.96l8.02-6.52z"/>
      <path fill="#34A853" d="M24 48c6.4 0 11.78-2.12 15.71-5.77l-7.73-6.01c-2.15 1.45-4.92 2.3-7.98 2.3-6.26 0-11.5-3.53-13.42-8.53l-8.02 6.52C6.51 42.62 14.6 48 24 48z"/>
    </svg>
  );
}

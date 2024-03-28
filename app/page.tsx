import Link from "next/link";

const demos = [
  { href: "demo-1", label: "Demo 1" },
  { href: "demo-2-hook", label: "Demo 2 - Hook" },
  { href: "demo-3-spinner", label: "Demo 3 - Spinner" },
  { href: "demo-4-bar", label: "Demo 4 - Loading bar" },
  { href: "demo-5-bar-existing", label: "Demo 5 - Loading bar with exit" },
  { href: "demo-6-global-progress-bar", label: "Demo 6 - Global progress bar" },
  { href: "demo-7-progress-link-count", label: "Demo 7 - Link count" },
  {
    href: "demo-8-progress-link-count-transition",
    label: "Demo 8 - Link count with Transition",
  },
  { href: "demo-9-progress-link-with-dots", label: "Demo 9 - Link with Dots" },
  { href: "demo-10-progress-link", label: "Demo 10 - Progress Link" },
  {
    href: "demo-11-progress-link-context",
    label: "Demo 11 - Progress Link with Context",
  },
  { href: "demo-12-messenger", label: "Demo 12 - Messenger" },
  { href: "demo-13-messenger-isolated", label: "Demo 13 - Messenger Isolated" },
  {
    href: "demo-14-messenger-with-progress",
    label: "Demo 13 - Messenger with Progress",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen py-2 flex justify-center items-center">
      <div className="flex flex-col gap-3">
        {demos.map((demo) => (
          <Link
            key={demo.href}
            className="hover:text-white text-gray-400 font-medium"
            href={demo.href}
          >
            {demo.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

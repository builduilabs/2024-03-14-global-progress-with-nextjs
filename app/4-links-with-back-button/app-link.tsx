"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, startTransition } from "react";
import { useProgressBar } from "./progress-bar";

export default function AppLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  let progress = useProgressBar();
  let router = useRouter();

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        progress.start();

        startTransition(() => {
          progress.done();
          router.push(href);
        });
      }}
      href={href}
    >
      {children}
    </Link>
  );
}

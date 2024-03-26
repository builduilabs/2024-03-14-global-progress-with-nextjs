"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, startTransition } from "react";
import { useProgressBar } from "./progress-bar";

export default function ProgressBarLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  let router = useRouter();
  let { start, done } = useProgressBar();

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        start();

        startTransition(() => {
          done();
          router.push(href);
        });
      }}
      href={href}
    >
      {children}
    </Link>
  );
}

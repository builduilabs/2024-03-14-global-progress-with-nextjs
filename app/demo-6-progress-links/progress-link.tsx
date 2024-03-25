"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, startTransition } from "react";

export default function ProgressLink({
  href,
  children,
  start,
  done,
}: {
  href: string;
  children: ReactNode;
  start: () => void;
  done: () => void;
}) {
  let router = useRouter();

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

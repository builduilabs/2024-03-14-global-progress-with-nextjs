"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { useProgressBar } from "./progress-bar-provider";

export default function AppLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  let [didClick, setDidClick] = useState(false);
  let [isPending, startTransition] = useTransition();
  let progress = useProgressBar();

  useEffect(() => {
    if (!isPending && didClick) {
      progress.finish();
      setDidClick(false);
    }
  }, [didClick, isPending, progress]);

  return (
    <Link
      onClick={() => {
        progress.start();

        startTransition(() => {
          setDidClick(true);
        });
      }}
      href={href}
    >
      {children}
    </Link>
  );
}

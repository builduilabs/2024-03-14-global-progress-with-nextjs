"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { useGlobalProgress } from "./global-progress";

export default function AppLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  let [didClick, setDidClick] = useState(false);
  let [isPending, startTransition] = useTransition();
  let progress = useGlobalProgress();
  let router = useRouter();

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
        setDidClick(true);

        startTransition(() => {
          router.push(href);
        });
      }}
      href={href}
    >
      {children}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, startTransition, useState } from "react";

export default function ProgressLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  let router = useRouter();
  let [isPending, setIsPending] = useState(false);

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        setIsPending(true);

        startTransition(() => {
          setIsPending(false);
          router.push(href);
        });
      }}
      href={href}
    >
      {children}
      {isPending ? "..." : ""}
    </Link>
  );
}

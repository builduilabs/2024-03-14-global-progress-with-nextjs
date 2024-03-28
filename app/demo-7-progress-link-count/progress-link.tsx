"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default function ProgressLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  let router = useRouter();
  let [count, setCount] = useState(0);

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();

        setCount((c) => c + 1);
        router.push(href);
      }}
      href={href}
    >
      {children} <span className="text-gray-500">({count})</span>
    </Link>
  );
}

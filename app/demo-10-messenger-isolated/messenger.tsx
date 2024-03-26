"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Messenger() {
  return (
    <Suspense>
      <div className="fixed bottom-0 right-3 w-60 rounded-t-xl shadow-md pb-2 shadow-black/75 bg-gray-700">
        <p className="font-semibold border-b border-gray-600 py-2 px-4 text-lg">
          Messages
        </p>
        <div className="mt-3">
          {[
            { name: "Sam", id: "sam" },
            { name: "Ryan", id: "ryan" },
          ].map((user) => (
            <MessengerLink user={user} key={user.id} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}

function MessengerLink({ user }: { user: { name: string; id: string } }) {
  let pathname = usePathname();
  let searchParams = useSearchParams();
  let currentHref = `${pathname}?${searchParams}`;
  let href = `${pathname}?user=${user.id}`;
  let isActive = href === currentHref;

  return (
    <Link href={href}>
      <span
        className={`${isActive ? "bg-sky-500" : "hover:bg-gray-600 transition"}
        text-white font-medium py-2 px-4 inline-block w-full`}
      >
        {user.name}
      </span>
    </Link>
  );
}

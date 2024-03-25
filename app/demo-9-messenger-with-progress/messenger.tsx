"use client";

import { usePathname, useSearchParams } from "next/navigation";
import ProgressBarLink from "./progress-bar-link";
import { ProgressBar } from "./progress-bar";

export default function Messenger() {
  return (
    <div className="overflow-hidden fixed bottom-0 right-3 w-60 rounded-t-xl shadow-md pb-2 shadow-black/75 bg-gray-700">
      <ProgressBar>
        <p className="font-semibold mt-2 px-4 text-gray-200 text-lg">
          Messages
        </p>

        <div className="mt-2">
          {[
            { name: "Sam", id: "sam" },
            { name: "Ryan", id: "ryan" },
          ].map((user) => (
            <MessengerLink user={user} key={user.id} />
          ))}
        </div>
      </ProgressBar>
    </div>
  );
}

function MessengerLink({ user }: { user: { name: string; id: string } }) {
  let pathname = usePathname();
  let searchParams = useSearchParams();
  let currentHref = `${pathname}?${searchParams}`;
  let href = `${pathname}?user=${user.id}`;
  let isActive = href === currentHref;

  return (
    <ProgressBarLink href={href}>
      <span
        className={`${isActive ? "bg-sky-500" : "hover:bg-gray-600 transition"}
        text-white font-medium py-2 px-4 inline-block w-full`}
      >
        {user.name}
      </span>
    </ProgressBarLink>
  );
}

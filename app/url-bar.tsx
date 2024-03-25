"use client";

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/16/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function URLBar() {
  let router = useRouter();
  let [isReloading, setIsReloading] = useState(false);

  return (
    <>
      <div /> {/* https://github.com/vercel/next.js/issues/28778 */}
      <div className="shadow p-2 bg-gray-700/90 backdrop-blur-xl flex gap-2 z-10 sticky top-0 items-center">
        <div className="flex gap-1">
          <button
            disabled={isReloading}
            className="p-2 rounded-full enabled:hover:bg-gray-600 enabled:transition disabled:opacity-50 text-gray-400"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <button
            disabled={isReloading}
            className="p-2 rounded-full enabled:hover:bg-gray-600 enabled:transition disabled:opacity-50 text-gray-400"
            onClick={() => {
              router.forward();
            }}
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-full enabled:hover:bg-gray-600 enabled:transition text-gray-400 disabled:opacity-50"
            disabled={isReloading}
            onClick={() => {
              setIsReloading(true);
              window.location.reload();
            }}
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        </div>
        <span className="bg-gray-800/50 rounded-full truncate grow px-3 mr-3 py-1.5 text-gray-400 font-medium text-sm">
          <FullURL />
        </span>
      </div>
    </>
  );
}

function FullURL() {
  let pathname = usePathname();
  let searchParams = useSearchParams();
  let url = new URL(pathname, "http://foo.com");
  url.search = searchParams.toString();

  return (
    <Suspense>
      {pathname}
      {url.search}
    </Suspense>
  );
}

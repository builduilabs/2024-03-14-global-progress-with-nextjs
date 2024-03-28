"use client";

import { ReactNode } from "react";
import URLBar from "../url-bar";
import ProgressLink from "./progress-link";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col">
      <URLBar />

      <nav className="p-4 border-b border-gray-700 flex gap-6">
        <ProgressLink href="/demo-8-progress-link-count-transition">
          Home
        </ProgressLink>
        <ProgressLink href="/demo-8-progress-link-count-transition/1">
          Page 1
        </ProgressLink>
        <ProgressLink href="/demo-8-progress-link-count-transition/2">
          Page 2
        </ProgressLink>
        <ProgressLink href="/demo-8-progress-link-count-transition/3">
          Page 3
        </ProgressLink>
      </nav>

      <div className="m-4">{children}</div>
    </div>
  );
}

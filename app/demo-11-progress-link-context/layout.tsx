import { ReactNode } from "react";
import URLBar from "../url-bar";
import { ProgressBar } from "./progress-bar";
import ProgressBarLink from "./progress-bar-link";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <URLBar />

      <div className="relative">
        <ProgressBar>
          <nav className="p-4 border-b border-gray-700 flex gap-6">
            <ProgressBarLink href="/demo-11-progress-link-context">
              Home
            </ProgressBarLink>
            <ProgressBarLink href="/demo-11-progress-link-context/1">
              Page 1
            </ProgressBarLink>
            <ProgressBarLink href="/demo-11-progress-link-context/2">
              Page 2
            </ProgressBarLink>
            <ProgressBarLink href="/demo-11-progress-link-context/3">
              Page 3
            </ProgressBarLink>
          </nav>
          <div className="m-4">{children}</div>
        </ProgressBar>
      </div>
    </div>
  );
}

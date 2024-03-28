import { ReactNode } from "react";
import URLBar from "../url-bar";
import { ProgressBar, ProgressBarLink } from "./progress-bar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <URLBar />

      <ProgressBar className="fixed h-1 shadow-lg shadow-sky-500/20 bg-sky-500 top-12">
        <header className="border-b border-gray-700">
          <nav className="m-4 flex gap-4">
            <ProgressBarLink href="/demo-1">Home</ProgressBarLink>
            <ProgressBarLink href="/demo-1/posts/1">Post 1</ProgressBarLink>
            <ProgressBarLink href="/demo-1/posts/2">Post 2</ProgressBarLink>
            <ProgressBarLink href="/demo-1/posts/3">Post 3</ProgressBarLink>
          </nav>
        </header>

        <div className="m-4">{children}</div>
      </ProgressBar>
    </div>
  );
}

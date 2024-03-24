import { ReactNode } from "react";
import URLBar from "../url-bar";
import AppLink from "./app-link";
import { ProgressBarRoot } from "./progress-bar";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div>
      <URLBar />

      <ProgressBarRoot>
        <header className="border-b border-gray-700">
          <nav className="m-4 flex gap-4">
            <AppLink href="/demo-1">Home</AppLink>
            <AppLink href="/demo-1/posts/1">Post 1</AppLink>
            <AppLink href="/demo-1/posts/2">Post 2</AppLink>
            <AppLink href="/demo-1/posts/3">Post 3</AppLink>
          </nav>
        </header>

        <div className="m-4">{children}</div>
      </ProgressBarRoot>
    </div>
  );
}

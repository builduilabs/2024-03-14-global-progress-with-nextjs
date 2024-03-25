import { ReactNode } from "react";
import URLBar from "../url-bar";
import { ProgressBar } from "./progress-bar";
import ProgressLink from "./progress-bar-link";
import Messenger from "./messenger";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <URLBar />

      <div className="relative">
        <ProgressBar>
          <nav className="p-4 border-b border-gray-700 flex gap-6">
            <ProgressLink href="/demo-9-messenger-with-progress">
              Home page
            </ProgressLink>
            <ProgressLink href="/demo-9-messenger-with-progress/1">
              Page 1
            </ProgressLink>
            <ProgressLink href="/demo-9-messenger-with-progress/2">
              Page 2
            </ProgressLink>
            <ProgressLink href="/demo-9-messenger-with-progress/3">
              Page 3
            </ProgressLink>
          </nav>

          <div className="m-4">{children}</div>

          <Messenger />
        </ProgressBar>
      </div>
    </div>
  );
}

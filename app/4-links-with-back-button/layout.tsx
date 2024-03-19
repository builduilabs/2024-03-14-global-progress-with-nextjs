import { ReactNode } from "react";
import AppLink from "./app-link";
import GlobalProgress from "./progress-bar-provider";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div>
      <GlobalProgress>
        <nav className="m-4 flex gap-4">
          <AppLink href="/4-links-with-back-button">Home</AppLink>
          <AppLink href="/4-links-with-back-button/1">Page 1</AppLink>
          <AppLink href="/4-links-with-back-button/2">Page 2</AppLink>
          <AppLink href="/4-links-with-back-button/3">Page 3</AppLink>
        </nav>

        <div className="m-4">{children}</div>
      </GlobalProgress>
    </div>
  );
}

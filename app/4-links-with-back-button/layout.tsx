import { ReactNode } from "react";
import GlobalProgress from "./global-progress";
import AppLink from "./app-link";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div>
      <GlobalProgress>
        <nav className="m-4 flex gap-4">
          <AppLink href="/3-trying-links">Home</AppLink>
          <AppLink href="/3-trying-links/1">Page 1</AppLink>
          <AppLink href="/3-trying-links/2">Page 2</AppLink>
          <AppLink href="/3-trying-links/3">Page 3</AppLink>
        </nav>

        <div className="m-4">{children}</div>
      </GlobalProgress>
    </div>
  );
}

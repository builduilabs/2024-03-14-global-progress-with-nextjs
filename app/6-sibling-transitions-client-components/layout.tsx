import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="m-4">
      <div className="mt-4">{children}</div>
    </div>
  );
}

import { ReactNode } from "react";
import Incrementer from "./incrementer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="m-4">
      <Incrementer />

      <div className="mt-4">{children}</div>
    </div>
  );
}

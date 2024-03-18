import { Suspense } from "react";
import ClientA from "./client-a";

export default function Page() {
  return (
    <div>
      <p>I'm the page</p>
      <Suspense fallback={<p>Loading</p>}>
        <ClientA />
      </Suspense>
    </div>
  );
}

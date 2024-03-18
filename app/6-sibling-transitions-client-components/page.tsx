import { Suspense } from "react";
import ClientA from "./client-a";
import ClientB from "./client-b";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <p>I'm the page</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Suspense fallback={<p>Loading A..</p>}>
          <ClientA />
        </Suspense>
        <Suspense fallback={<p>Loading B..</p>}>
          <ClientB />
        </Suspense>
      </div>
    </div>
  );
}

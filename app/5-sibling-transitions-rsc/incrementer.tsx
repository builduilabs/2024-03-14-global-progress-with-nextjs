"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Incrementer() {
  let router = useRouter();
  // let params = useParams();
  let [count, setCount] = useState(0);
  let newCount = +count + 1;
  let [isPending, startTransition] = useTransition();

  async function handleUpdate() {
    setTimeout(() => {
      startTransition(() => {
        setCount((count) => count + 1);
      });
    }, 500);

    router.push(`/5-sibling-transitions/${newCount}`);
  }

  return (
    <div className="border p-1">
      <p className="text-blue-400 text-sm font-medium">Client component</p>

      <div className="mt-2">
        <button onClick={handleUpdate}>Update</button>
      </div>

      <div className="mt-4">
        <p>Count: {count}</p>
        <p>Count isPending: {isPending ? "true" : "false"}</p>
      </div>
    </div>
  );
}

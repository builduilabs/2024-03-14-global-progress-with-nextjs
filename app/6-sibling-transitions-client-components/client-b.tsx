"use client";

import { use, useOptimistic, useState, useTransition } from "react";

const cache: Promise<Date>[] = [];

function getData(key: number) {
  if (!cache[key]) {
    cache[key] = new Promise((resolve) =>
      setTimeout(() => resolve(new Date()), 1000)
    );
  }

  return cache[key];
}

export default function ClientB() {
  if (typeof window === "undefined") {
    throw Error("Should only render on the client");
  }

  let [count, setCount] = useState(0);
  let date = use(getData(count));
  let [isPending, startTransition] = useTransition();
  let [optimisticDate, setOptimisticDate] = useOptimistic(date);

  function handleInc() {
    startTransition(() => {
      setCount((count) => count + 1);
      // setOptimisticDate(new Date());
    });
  }

  return (
    <div className="border p-2 animate-[flash_1s]" key={count}>
      <p>Client B</p>
      {/* <p>I'm pending: {isPending ? "true" : "false"}</p> */}
      <p>Count: {count}</p>
      <p>Date: {date.toLocaleString()}</p>
      {/* <p>Optimistic date: {optimisticDate.toLocaleString()}</p> */}
      <button className="bg-gray-600 px-3 py-1" onClick={handleInc}>
        Inc
      </button>
    </div>
  );
}

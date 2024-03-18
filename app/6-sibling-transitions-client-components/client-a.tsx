"use client";

import {
  startTransition,
  use,
  useOptimistic,
  useState,
  useTransition,
} from "react";

const cache: Promise<Date>[] = [];

function getData(key: number) {
  if (!cache[key]) {
    cache[key] = new Promise((resolve) =>
      setTimeout(() => resolve(new Date()), 1000)
    );
  }

  return cache[key];
}

export default function ClientA() {
  if (typeof window === "undefined") {
    // console.log("should not see this in browser");
    throw Error("Should only render on the client");
  }

  let [count, setCount] = useState(0);
  let [countA, setCountA] = useState(0);
  let date = use(getData(count));
  // let [isPending, startTransition] = useTransition();
  let [optimisticDate, setOptimisticDate] = useOptimistic(false);

  function handleInc() {
    // startTransition(() => {
    // setCount((count) => count + 1);
    setCountA((count) => count + 1);
    // setOptimisticDate(true);
    // });
  }
  // console.log({ isPending });

  return (
    // <div className="border p-2 animate-[flash_1s]" key={count}>
    <div className="border p-2">
      <p>Client A</p>
      {/* <p>I'm pending: {isPending ? "true" : "false"}</p> */}
      <p>Count: {count}</p>
      <p>Count A: {countA}</p>
      <p>Date: {date.toLocaleString()}</p>
      {/* <p>Optimistic date: {optimisticDate.toLocaleString()}</p> */}
      <p>Optimistic: {optimisticDate ? "true" : "false"}</p>
      <button className="bg-gray-600 px-3 py-1" onClick={handleInc}>
        Inc
      </button>
    </div>
  );
}

"use client";

import { use, useState } from "react";

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
    throw Error("ClientA should only render on the client");
  }

  let [count, setCount] = useState(0);
  let date = use(getData(count));

  return (
    <div className="border p-2">
      <p>Client A</p>
      <p>Count: {count}</p>
      <p>{date.toLocaleString()}</p>
      <button
        className="bg-gray-600 px-3 py-1"
        onClick={() => setCount(count + 1)}
      >
        Inc
      </button>
    </div>
  );
}

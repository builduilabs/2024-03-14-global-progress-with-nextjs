"use client";

import { useEffect, useRef, useState } from "react";

export default function Nav() {
  let [state, setState] = useState<
    "idle" | "progressing" | "completing" | "done"
  >("idle");
  let [progress, setProgress] = useState(0); // 0 to 100

  useInterval(
    () => {
      if (state === "progressing") {
        setProgress((progress) => (100 - progress) / 20 + progress);
      } else if (progress === 100) {
        setState("done");
        setProgress(0);
      } else if (state === "completing") {
        setProgress((p) => Math.min(p + 10, 100));
      }
    },
    state === "idle" || state === "done" ? null : 100
  );

  return (
    <div>
      {state !== "done" && (
        <div
          style={{ width: `${progress}%` }}
          className="transition-[width] duration-[.1s] ease-linear fixed h-4 bg-green-500 top-0"
        />
      )}

      <div className="mx-4 my-8 flex gap-4">
        <button
          className="bg-gray-300 px-3 py-2"
          onClick={() => setState("idle")}
        >
          Idle
        </button>
        <button
          className="bg-gray-300 px-3 py-2"
          onClick={() => {
            setState("progressing");
          }}
        >
          Progressing
        </button>
        <button
          className="bg-gray-300 px-3 py-2"
          onClick={() => setState("completing")}
        >
          Done
        </button>
      </div>

      <div className="mt-4 text-center">
        {/* <p>{state}</p> */}
        <p>{Math.floor(progress)}</p>
      </div>
    </div>
  );
}

function useInterval(callback, delay) {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      tick();
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

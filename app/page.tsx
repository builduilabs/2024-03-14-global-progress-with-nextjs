"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  let [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");
  let progress = useSpring(0, { bounce: 0, duration: 500 });
  let width = useMotionTemplate`${progress}%`;

  useInterval(
    () => {
      let remaining = 100 - progress.get();
      let newProgress = progress.get() + remaining / 4;

      console.log({ proggress: progress.get(), newProgress });
      progress.set(newProgress);
    },
    state === "in-progress" ? 1500 : null
  );

  useMotionValueEvent(progress, "change", (v) => {
    if (v === 100) {
      setState("complete");
    }
  });

  function restart() {
    progress.jump(0);
    setState("initial");
  }

  function start() {
    if (state === "complete") {
      progress.jump(0);
    }

    setState("in-progress");
  }

  function finish() {
    if (state === "complete") {
      progress.jump(0);
    }
    progress.set(100);
    setState("completing");
  }

  return (
    <div>
      <AnimatePresence onExitComplete={restart}>
        {state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed h-4 bg-green-500 top-0"
          />
        )}
      </AnimatePresence>

      <div className="mx-4 my-8 flex gap-4">
        <button
          disabled={state === "initial"}
          className="bg-gray-300 px-3 py-2 disabled:opacity-50"
          onClick={restart}
        >
          Restart
        </button>
        <button className="bg-gray-300 px-3 py-2" onClick={start}>
          Start
        </button>
        <button className="bg-gray-300 px-3 py-2" onClick={finish}>
          Finish
        </button>
      </div>

      <div className="p-4 bg-gray-100">
        <p className="font-medium uppercase text-sm text-gray-500">States</p>

        {[
          { state: "initial", label: "Initial" },
          { state: "in-progress", label: "In progress" },
          { state: "completing", label: "Completing" },
          { state: "complete", label: "Complete" },
        ].map((s) => (
          <p key={s.state} className="flex items-center gap-2">
            <span
              className={`${
                state === s.state ? "bg-green-500" : "bg-gray-200"
              } inline-block size-3 rounded-full`}
            />
            {s.label}
          </p>
        ))}
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

// Sigmoid-based decay function
function decay(value: number, max: number) {
  if (max === 0) {
    return 0;
  }

  let entry = value / max;
  let sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

  return sigmoid * max;
}

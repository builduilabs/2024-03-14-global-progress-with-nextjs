"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function NavFramerMotion() {
  let [state, setState] = useState<
    "initial" | "in-progress" | "finishing" | "complete"
  >("initial");
  let progress = useSpring(0, { bounce: 0, duration: 500 });

  useMotionValueEvent(progress, "change", (v) => {
    if (v === 100) {
      setState("complete");
    }
  });

  useInterval(
    () => {
      let remaining = 100 - progress.get();
      progress.set(progress.get() + remaining / 2);
    },
    state === "in-progress" ? 500 : null
  );

  useEffect(() => {
    if (state === "finishing") {
      progress.set(100);
    }
  }, [state, progress]);

  let width = useMotionTemplate`${progress}%`;

  function transitionToInitial() {
    progress.jump(0);
    setState("initial");
  }

  function transitionToInProgress() {
    if (state === "complete") {
      progress.jump(0);
    }

    // progress.set(75);
    setState("in-progress");
  }

  function transitionToFinishing() {
    if (state === "complete") {
      progress.jump(0);
    }
    setState("finishing");
  }

  return (
    <div>
      <AnimatePresence onExitComplete={transitionToInitial}>
        {state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className="fixed h-4 bg-green-500 top-0"
          />
        )}
      </AnimatePresence>

      <div className="mx-4 my-8 flex gap-4">
        <button className="bg-gray-300 px-3 py-2" onClick={transitionToInitial}>
          Initial
        </button>
        <button
          className="bg-gray-300 px-3 py-2"
          onClick={transitionToInProgress}
        >
          Start
        </button>
        <button
          className="bg-gray-300 px-3 py-2"
          onClick={transitionToFinishing}
        >
          Finish
        </button>
      </div>

      <div className="mt-4 text-center">
        <p>{state}</p>
        {/* <p>{Math.floor(progress)}</p> */}
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

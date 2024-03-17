"use client";

import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  let [isShowingInfo, setIsShowingInfo] = useState(false);
  let [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");
  let progress = useSpring(0, { bounce: 0, duration: 400 });
  let width = useMotionTemplate`${progress}%`;

  useInterval(
    () => {
      let remaining = 100 - progress.get();
      let newProgress = progress.get() + remaining / 4;

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

  let progressLog = useTransform(progress, (v) => Math.floor(v));
  // let pathLength = useTransform(progress, (v) => v / 100);

  return (
    <div className="h-screen relative flex flex-col">
      <AnimatePresence onExitComplete={restart}>
        {state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className="fixed h-1 bg-sky-500 top-0"
          />

          // <motion.div
          //   className="w-full flex justify-center items-center"
          //   key="foo"
          //   exit={{ opacity: 0 }}
          // >
          //   <svg viewBox="0 0 120 120" className="size-32 p-2 -rotate-90">
          //     <motion.circle
          //       style={{ pathLength }}
          //       cx="60"
          //       cy="60"
          //       r="50"
          //       stroke="currentColor"
          //       className={`text-sky-500 ${
          //         state === "initial" ? "opacity-0" : ""
          //       }`}
          //       strokeWidth={6}
          //       fill="none"
          //       strokeLinecap="round"
          //     />
          //   </svg>
          // </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-4 my-8 flex grow items-center justify-center gap-4">
        <button
          disabled={state === "initial"}
          className="transition bg-gray-600 text-sm font-semibold rounded px-3 py-1.5 enabled:hover:bg-gray-500 disabled:opacity-50"
          onClick={restart}
        >
          Restart
        </button>
        <button
          disabled={state === "in-progress"}
          className="transition bg-gray-600 disabled:opacity-50 text-sm font-semibold rounded px-3 py-1.5 enabled:hover:bg-gray-500"
          onClick={start}
        >
          Start
        </button>
        <button
          disabled={state === "completing"}
          className="transition disabled:opacity-50 bg-gray-600 text-sm font-semibold rounded px-3 py-1.5 enabled:hover:bg-gray-500"
          onClick={finish}
        >
          Finish
        </button>
      </div>

      <button
        onClick={() => setIsShowingInfo(true)}
        className="absolute bottom-4 left-4"
      >
        <InformationCircleIcon className="size-4 text-gray-600 hover:text-gray-200" />
      </button>

      <AnimatePresence>
        {isShowingInfo && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute inset-x-0 bottom-0"
          >
            <div className="m-3 relative flex gap-12 items-start rounded-lg p-4 bg-gray-700">
              <button onClick={() => setIsShowingInfo(false)}>
                <XMarkIcon className="size-4 text-gray-500 hover:text-gray-200" />
              </button>

              <div className="grow">
                <div className="border border-gray-500/50 grid grid-cols-4 divide-x divide-gray-500/50 rounded-full overflow-hidden">
                  {[
                    { state: "initial", label: "Initial" },
                    { state: "in-progress", label: "In progress" },
                    { state: "completing", label: "Completing" },
                    { state: "complete", label: "Complete" },
                  ].map((s) => (
                    <div
                      key={s.state}
                      className={`${
                        state === s.state
                          ? "text-white bg-gray-600"
                          : "text-gray-400 bg-gray-600"
                      } text-center py-1 font-medium text-xs`}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs text-gray-400 mt-2 font-medium">
                  State
                </p>
              </div>
              <div>
                <motion.p className="font-medium text-sm py-0.5 text-white text-center tabular-nums">
                  {progressLog}
                </motion.p>

                <p className="text-center text-xs text-gray-400 mt-2 font-medium">
                  Progress
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function useInterval(callback: () => void, delay: number | null) {
  const intervalRef = useRef<number>();
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

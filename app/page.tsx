"use client";

import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import useProgress from "./use-progress";

export default function Page() {
  let [isShowingInfo, setIsShowingInfo] = useState(false);
  let { state, progress, start, done, reset } = useProgress();

  return (
    <div className="h-screen relative flex flex-col">
      <GlobalProgress state={state} progress={progress} reset={reset} />

      <div className="mx-4 my-8 flex grow items-center justify-center gap-4">
        <button
          className="transition bg-gray-600 text-sm font-semibold rounded px-3 py-1.5 enabled:hover:bg-gray-500 disabled:opacity-50"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="transition bg-gray-600 disabled:opacity-50 text-sm font-semibold rounded px-3 py-1.5 enabled:hover:bg-gray-500"
          onClick={start}
        >
          Start
        </button>
        <button
          className="transition disabled:opacity-50 bg-gray-600 text-sm font-semibold rounded px-3 py-1.5 enabled:hover:bg-gray-500"
          onClick={done}
        >
          Done
        </button>
      </div>

      <button
        onClick={() => setIsShowingInfo(true)}
        className="absolute bottom-4 left-4"
      >
        <InformationCircleIcon className="size-4 text-gray-600 hover:text-gray-200" />
      </button>

      <InfoBar
        state={state}
        progress={progress}
        open={isShowingInfo}
        onDismiss={() => setIsShowingInfo(false)}
      />
    </div>
  );
}

function GlobalProgress({
  state,
  progress,
  reset,
}: Pick<ReturnType<typeof useProgress>, "state" | "progress" | "reset">) {
  let width = useMotionTemplate`${progress}%`;

  return (
    <AnimatePresence onExitComplete={reset}>
      {state !== "complete" && (
        <motion.div
          style={{ width }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "circIn" } }}
          className="fixed h-[3px] shadow-lg shadow-sky-500/20 bg-sky-500 top-0"
        />
      )}
    </AnimatePresence>
  );
}

function InfoBar({
  open,
  onDismiss,
  state,
  progress,
}: {
  open: boolean;
  onDismiss: () => void;
  state: string;
  progress: MotionValue;
}) {
  let progressLog = useTransform(progress, (v) => Math.floor(v));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="absolute inset-x-0 bottom-0"
        >
          <div className="m-3 relative flex gap-12 items-start rounded-lg p-4 bg-gray-700">
            <button onClick={onDismiss}>
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
  );
}

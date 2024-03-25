"use client";

import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionTemplate,
} from "framer-motion";
import useProgress from "../use-progress";

export default function Page() {
  let { progress, state, start, done, reset } = useProgress();

  return (
    <div className="h-screen relative flex flex-col">
      <div className="grow flex justify-center items-center">
        <AnimatePresence onExitComplete={reset}>
          {state !== "complete" && (
            <motion.div exit={{ opacity: 0 }} className="w-full">
              <ProgressBar progress={progress} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-1/3 flex items-center justify-center gap-4">
        <button
          className="transition bg-gray-600 text-sm font-semibold rounded px-3 py-1.5 hover:bg-gray-500"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="transition bg-gray-600 text-sm font-semibold rounded px-3 py-1.5 hover:bg-gray-500"
          onClick={start}
        >
          Start
        </button>
        <button
          className="transition bg-gray-600 text-sm font-semibold rounded px-3 py-1.5 hover:bg-gray-500"
          onClick={done}
        >
          Done
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: MotionValue }) {
  let width = useMotionTemplate`${progress}%`;

  return (
    <div className="mx-auto max-w-md relative w-full h-2 rounded overflow-hidden">
      {/* <div className="absolute top-0 bg-gray-700 inset-0"></div> */}
      <motion.div
        style={{ width }}
        className="absolute inset-y-0 shadow-lg shadow-sky-500/20 bg-sky-500"
      />
    </div>
  );
}

"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import useProgress from "../use-progress";

export default function Page() {
  let { state, progress, start, done, reset } = useProgress();

  let progressLog = useTransform(progress, (v) => Math.floor(v));

  return (
    <div className="h-screen relative flex flex-col">
      <div className="h-2/3 mx-4 my-8 flex grow items-center justify-center gap-4">
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

      <div className="h-1/3 border-t border-gray-600 bg-gray-700 flex gap-20 justify-center items-center px-20">
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
    </div>
  );
}

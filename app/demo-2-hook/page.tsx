"use client";

import { motion, useTransform } from "framer-motion";
import useProgress from "../use-progress";

export default function Page() {
  let { state, value, start, done, reset } = useProgress();

  return (
    <div className="h-screen relative flex flex-col">
      <div className="h-2/3 mx-4 flex items-center justify-center gap-4">
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

      <div className="absolute bottom-4 inset-x-4 border-t border-gray-600 bg-gray-700 flex gap-20 justify-center items-center px-20 shadow-lg py-6 rounded-lg">
        <div className="grow">
          <div className="divide-x divide-gray-700/75 h-8 bg-gray-800/75 shadow-inner grid grid-cols-4 rounded-full overflow-hidden">
            {[
              { state: "initial", label: "Initial" },
              { state: "in-progress", label: "In progress" },
              { state: "completing", label: "Completing" },
              { state: "complete", label: "Complete" },
            ].map((s) => (
              <div
                key={s.state}
                className={`${
                  state === s.state ? "text-white bg-sky-500" : "text-gray-600"
                } text-center transition font-semibold text-xs flex items-center justify-center`}
              >
                {s.label}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-3 font-medium">
            State
          </p>
        </div>

        <div>
          <motion.p className="font-semibold h-8 flex items-center justify-center text-sm text-white text-center tabular-nums">
            {useTransform(value, Math.floor)}
          </motion.p>

          <p className="text-center text-xs text-gray-400 mt-3 font-medium">
            Value
          </p>
        </div>
      </div>
    </div>
  );
}

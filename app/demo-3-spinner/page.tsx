"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import useProgress from "../use-progress";

export default function Page() {
  let { progress, start, done, reset } = useProgress();

  return (
    <div className="h-screen relative flex flex-col">
      <div className="grow flex justify-center items-center">
        <Spinner progress={progress} />
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

function Spinner({ progress }: { progress: MotionValue }) {
  let pathLength = useTransform(progress, (v) => v / 100);
  let opacity = useTransform(pathLength, [0, 0.01, 0.02, 1], [0, 0, 1, 1]);

  return (
    <div className="w-full flex justify-center relative items-center">
      <svg viewBox="0 0 120 120" className="size-40 p-2 -rotate-90">
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          stroke="currentColor"
          className="text-gray-700"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
        />
        <motion.circle
          style={{ pathLength, opacity }}
          cx="60"
          cy="60"
          r="50"
          stroke="currentColor"
          className="text-sky-500"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute tabular-nums text-white text-sm">
        <motion.span>
          {useTransform(progress, (v) => Math.floor(v))}
        </motion.span>
        %
      </span>
    </div>
  );
}

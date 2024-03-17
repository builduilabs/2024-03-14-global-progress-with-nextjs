"use client";

import { motion } from "framer-motion";
import useProgress from "../use-progress";

export default function Page() {
  let { state, progress, start, finish, restart } = useProgress();

  return (
    <div className="h-screen relative flex flex-col">
      <motion.div>{progress}</motion.div>

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
    </div>
  );
}

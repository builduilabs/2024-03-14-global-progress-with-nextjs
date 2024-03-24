"use client";

import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import useProgress from "../use-progress";

export default function Page() {
  let { state, progress, start, finish, restart } = useProgress();

  return (
    <div className="h-screen relative flex flex-col">
      <GlobalProgress state={state} progress={progress} restart={restart} />

      <div className="mx-4 my-8 flex grow items-center justify-center gap-4">
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
          Done
        </button>
      </div>
    </div>
  );
}

function GlobalProgress({
  state,
  progress,
  restart,
}: Pick<ReturnType<typeof useProgress>, "state" | "progress" | "restart">) {
  let width = useMotionTemplate`${progress}%`;

  return (
    <AnimatePresence onExitComplete={restart}>
      {state !== "complete" && (
        <motion.div
          style={{ width }}
          exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.2 } }}
          className="fixed h-1 shadow-lg shadow-sky-500/20 bg-sky-500 top-0"
        />
      )}
    </AnimatePresence>
  );
}

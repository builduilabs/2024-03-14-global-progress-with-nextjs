"use client";

import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import { ReactNode, createContext, useContext } from "react";
import useProgress from "../use-progress";

export const ProgressBarContext = createContext<ReturnType<
  typeof useProgress
> | null>(null);

export function useProgressBar() {
  let progress = useContext(ProgressBarContext);

  if (progress === null) {
    throw new Error("Can only be used within <ProgressBar>");
  }

  return progress;
}

export function ProgressBar({ children }: { children: ReactNode }) {
  let progress = useProgress();
  let width = useMotionTemplate`${progress.value}%`;

  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className="absolute top-0 h-1 shadow-lg shadow-sky-500/20 bg-sky-500"
          />
        )}
      </AnimatePresence>

      {children}
    </ProgressBarContext.Provider>
  );
}

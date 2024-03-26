"use client";

import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionTemplate,
} from "framer-motion";
import useProgress from "../use-progress";
import ProgressLink from "./progress-link";
import { ReactNode } from "react";
import URLBar from "../url-bar";

export default function Layout({ children }: { children: ReactNode }) {
  let { progress, state, start, done, reset } = useProgress();

  return (
    <div className="relative flex flex-col">
      <URLBar />

      <div className="relative">
        <AnimatePresence onExitComplete={reset}>
          {state !== "complete" && (
            <motion.div exit={{ opacity: 0 }} className="w-full">
              <ProgressBar progress={progress} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="p-4 border-b border-gray-700 flex gap-6">
        <ProgressLink start={start} done={done} href="/demo-7-progress-link">
          Home
        </ProgressLink>
        <ProgressLink start={start} done={done} href="/demo-7-progress-link/1">
          Page 1
        </ProgressLink>
        <ProgressLink start={start} done={done} href="/demo-7-progress-link/2">
          Page 2
        </ProgressLink>
        <ProgressLink start={start} done={done} href="/demo-7-progress-link/3">
          Page 3
        </ProgressLink>
      </nav>

      <div className="m-4">{children}</div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: MotionValue }) {
  let width = useMotionTemplate`${progress}%`;

  return (
    <motion.div
      style={{ width }}
      className="absolute top-0 h-1 shadow-lg shadow-sky-500/20 bg-sky-500"
    />
  );
}

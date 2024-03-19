"use client";

import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";
import useProgress from "../use-progress";

export const GlobalProgressContext = createContext<ReturnType<
  typeof useProgress
> | null>(null);

export function useGlobalProgress() {
  let progress = useContext(GlobalProgressContext);

  if (progress === null) {
    throw new Error("Need to be inside provider");
  }

  return progress;
}

export default function GlobalProgress({ children }: { children: ReactNode }) {
  let progress = useProgress();
  let width = useMotionTemplate`${progress.progress}%`;

  return (
    <GlobalProgressContext.Provider value={progress}>
      <GlobalProgressForBrowserNavigation />

      <AnimatePresence onExitComplete={progress.restart}>
        {progress.state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className="fixed h-1 shadow-lg shadow-sky-500/20 bg-sky-500 top-0"
          />
        )}
      </AnimatePresence>
      {children}
    </GlobalProgressContext.Provider>
  );
}

function GlobalProgressForBrowserNavigation() {
  let progress = useGlobalProgress();
  let pathname = usePathname();
  let [newPathname, setNewPathname] = useState<string>();
  let [didPopState, setDidPopState] = useState(false);
  let popStateIsPending = didPopState && newPathname !== pathname;

  useEffect(() => {
    startTransition(() => {
      if (didPopState) {
        if (newPathname !== pathname) {
          progress.start();
        } else {
          progress.finish();
          setDidPopState(false);
        }
      }
    });
  }, [didPopState, newPathname, pathname, popStateIsPending, progress]);

  useEffect(() => {
    function handlePopState() {
      startTransition(() => {
        setDidPopState(true);
        setNewPathname(window.location.pathname);
      });
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}

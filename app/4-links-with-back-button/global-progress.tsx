"use client";

import {
  ReactNode,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import useProgress from "../use-progress";
import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

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
  let [didUseBrowserNavigation, setDidUseBrowserNavigation] = useState(false);
  let [isPending, startTransition] = useTransition();
  let router = useRouter();

  // useEffect(() => {
  //   function handleBack(event: PopStateEvent) {
  //     // event.state
  //     // console.log(event.state);
  //     // console.log("start");
  //     // setDidUseBrowserNavigation(true);

  //     progress.start();

  //     startTransition(() => {
  //       router.push(window.location.pathname);
  //     });
  //   }
  //   //
  //   window.addEventListener("popstate", handleBack);

  //   return () => {
  //     console.log("cleanup");
  //     window.removeEventListener("popstate", handleBack);
  //   };
  // }, [progress, router]);

  // useEffect(() => {
  //   if (!isPending && didUseBrowserNavigation) {
  //     console.log("finish");
  //     progress.finish();
  //     setDidUseBrowserNavigation(false);
  //   }
  // }, [didUseBrowserNavigation, isPending, progress]);

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
    function handleBack() {
      startTransition(() => {
        setNewPathname(window.location.pathname);
        setDidPopState(true);
      });
    }

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return null;

  return (
    <div className="m-4">
      {/* <p>popStateIsPending: {popStateIsPending ? "yes" : "no"}</p> */}
      {/* <p>pathname: {pathname}</p> */}
      {/* <p>isPunding: {isPending ? "yes" : "no"}</p> */}
      {/* <p>didPopState: {didPopState ? "true" : "false"}</p> */}
      {/* <p>newPathname: {newPathname}</p> */}
    </div>
  );
}

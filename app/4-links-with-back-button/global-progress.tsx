"use client";

import {
  ReactNode,
  createContext,
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
  let [previousPopStateIsPending, setPreviousPopStateIsPending] =
    useState(popStateIsPending);

  // console.log({ didPopState, newPathname, pathname });
  // if (didPopState) {
  //   console.log({ pathname, newPathname });
  // }
  if (didPopState && newPathname === pathname) {
    setDidPopState(false);
  }

  // if (previousPopStateIsPending !== popStateIsPending) {
  //   console.log("here");
  //   progress.finish();
  // }
  // console.log("render");

  useEffect(() => {
    // console.log("effect");
    if (previousPopStateIsPending !== popStateIsPending) {
      // console.log("here");
      if (!popStateIsPending) {
        // progress.finish();
      }

      setPreviousPopStateIsPending(popStateIsPending);
    }
  }, [popStateIsPending, previousPopStateIsPending, progress]);

  // if (popStateIsPending) {
  //   console.log("pending");
  // }
  // console.log(popStateIsPending);

  // }, [didPopState, newPathname, pathname, progress]);
  // if (popStateIsPending) {
  //   progress.finish();
  //   console.log("pending");
  // }

  // useEffect(() => {
  //   if (!popStateIsPending) {
  //     console.log("here");
  //     progress.finish();
  //   }
  // }, [popStateIsPending, progress]);

  // console.log(popStateIsPending);

  // useEffect(() => {
  //   if (didPopState) {
  //     if (newPathname !== pathname) {
  //       //   progress.start();
  //       // } else {
  //       progress.finish();
  //       setDidPopState(false);
  //     }
  //   }
  // }, [didPopState, newPathname, pathname, progress]);

  useEffect(() => {
    function handleBack() {
      console.log(window.location.pathname);
      setNewPathname(window.location.pathname);
      setDidPopState(true);
      progress.start();
    }

    window.addEventListener("popstate", handleBack);

    return () => {
      console.log("cleanup");
      window.removeEventListener("popstate", handleBack);
    };
  }, [progress]);

  // return null;
  return (
    <div className="m-4">
      {/* <p>popStateIsPending: {popStateIsPending ? "yes" : "no"}</p>
      <p>pathname: {pathname}</p>
      <p>didPopState: {didPopState ? "true" : "false"}</p> */}
      <p>newPathname: {newPathname}</p>
    </div>
  );
}

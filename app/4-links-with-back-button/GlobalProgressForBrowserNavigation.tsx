"use client";
import { use, useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useGlobalProgress, getData } from "./global-progress";

export function GlobalProgressForBrowserNavigation() {
  let progress = useGlobalProgress();
  let pathname = usePathname();
  let [newPathname, setNewPathname] = useState<string>();
  let [didPopState, setDidPopState] = useState(false);
  let popStateIsPending = didPopState && newPathname !== pathname;
  let [isPending, startTransition] = useTransition();
  // let [isPending, setIsPending] = useOptimistic(false);
  let [count, setCount] = useState(0);

  use(getData(count));

  // useEffect(() => {
  //   startTransition(() => {
  //     if (didPopState) {
  //       if (newPathname !== pathname) {
  //         progress.start();
  //       } else {
  //         progress.finish();
  //         setDidPopState(false);
  //       }
  //     }
  //   });
  // }, [didPopState, newPathname, pathname, popStateIsPending, progress]);
  useEffect(() => {
    function handleBack() {
      startTransition(() => {
        // setNewPathname(window.location.pathname);
        // setDidPopState(true);
        // setIsPending(true);
        setCount((count) => count + 1);
      });
    }

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  return <p>Is pending: {isPending ? "true" : "false"}</p>;

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

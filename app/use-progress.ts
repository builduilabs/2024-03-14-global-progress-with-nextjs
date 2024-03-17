import { useMotionValueEvent, useSpring } from "framer-motion";
import { useState } from "react";
import useInterval from "./use-interval";

export default function useProgress() {
  let [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");
  let progress = useSpring(0, { bounce: 0, duration: 400 });

  useInterval(
    () => {
      let remaining = 100 - progress.get();
      let newProgress = progress.get() + remaining / 4;

      progress.set(newProgress);
    },
    state === "in-progress" ? 1500 : null
  );

  useMotionValueEvent(progress, "change", (v) => {
    if (v === 100) {
      setState("complete");
    }
  });

  function restart() {
    progress.jump(0);
    setState("initial");
  }

  function start() {
    if (state === "complete") {
      progress.jump(0);
    }

    setState("in-progress");
  }

  function finish() {
    if (state === "complete") {
      progress.jump(0);
    }
    progress.set(100);
    setState("completing");
  }

  return { state, progress, start, finish, restart };
}

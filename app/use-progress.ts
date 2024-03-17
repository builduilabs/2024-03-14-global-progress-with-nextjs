import { useMotionValueEvent, useSpring } from "framer-motion";
import { useState } from "react";
import useInterval from "./use-interval";

export default function useProgress() {
  let [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");
  let progress = useSpring(0, { bounce: 0, duration: 350 });

  useInterval(
    () => {
      let diff;

      if (progress.get() === 0) {
        diff = rand(15, 20);
      } else if (progress.get() < 50) {
        diff = rand(5, 10);
      } else {
        diff = rand(1, 5);
      }

      progress.set(Math.min(progress.get() + diff, 99));
    },
    state === "in-progress" ? 750 : null
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
    if (state === "in-progress") {
      return;
    } else if (state === "complete") {
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

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

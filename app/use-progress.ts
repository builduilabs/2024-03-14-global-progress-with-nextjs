import { useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import useInterval from "./use-interval";

export default function useProgress() {
  const [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");

  let progress = useSpring(0, { bounce: 0, duration: 350 });

  useInterval(
    () => {
      let diff;

      // If we start progress but the bar is currently complete, reset it first.
      if (progress.get() === 100) {
        progress.jump(0);
      }

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

  useEffect(() => {
    if (state === "initial") {
      progress.jump(0);
    } else if (state === "completing") {
      progress.set(100);
    }

    return progress.on("change", (value) => {
      if (value === 100) {
        setState("complete");
      }
    });
  }, [progress, state]);

  function reset() {
    setState("initial");
  }

  function start() {
    setState("in-progress");
  }

  function done() {
    setState((state) =>
      state === "initial" || state === "in-progress" ? "completing" : state
    );
  }

  return { state, progress, start, done, reset };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

import { useMotionValueEvent, useSpring } from "framer-motion";
import { useEffect, useReducer, useState } from "react";
import useInterval from "./use-interval";

function reducer(
  state: { previous: string; current: string },
  action:
    | { type: "START" }
    | { type: "FINISH" }
    | { type: "RESET" }
    | { type: "FINISHED" }
) {
  switch (action.type) {
    case "START": {
      return {
        previous: state.current,
        current: "in-progress",
      };
    }
    case "FINISH": {
      return {
        previous: state.current,
        current: "completing",
      };
    }
    case "FINISHED": {
      return {
        previous: state.current,
        current: "complete",
      };
    }
    case "RESET": {
      return {
        previous: state.current,
        current: "initial",
      };
    }
    default: {
      throw Error("Unhandled action");
    }
  }
}

export default function useProgress() {
  const [state, dispatch] = useReducer(reducer, {
    current: "initial",
    previous: "null",
  });

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
    state.current === "in-progress" ? 750 : null
  );

  useEffect(() => {
    if (state.current === "initial") {
      progress.jump(0);
    } else if (state.current === "completing") {
      progress.set(100);
    }

    return progress.on("change", (value) => {
      if (value === 100) {
        dispatch({ type: "FINISHED" });
      }
    });
  }, [progress, state]);

  function restart() {
    dispatch({ type: "RESET" });
  }

  function start() {
    dispatch({ type: "START" });
  }

  function finish() {
    dispatch({ type: "FINISH" });
  }

  return { state: state.current, progress, start, finish, restart };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

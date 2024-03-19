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
      return state.current === "complete"
        ? {
            previous: state.current,
            current: "resetting",
          }
        : {
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

  // let [state, setState] = useState<
  //   "initial" | "in-progress" | "completing" | "complete" | "resetting"
  // >("initial");
  // // let progress = useMo
  let progress = useSpring(0, { bounce: 0, duration: 350 });
  let [intervalShouldRun, setIntervalShouldRun] = useState(false);

  useInterval(
    () => {
      let diff;
      console.log({ progress: progress.get() });

      if (progress.get() === 0) {
        diff = rand(15, 20);
      } else if (progress.get() < 50) {
        diff = rand(5, 10);
      } else {
        diff = rand(1, 5);
      }

      console.log("animating progress");
      progress.set(Math.min(progress.get() + diff, 99));
    },
    // intervalShouldRun ? 750 : null
    state.current === "in-progress" ? 750 : null
  );

  useEffect(() => {
    if (state.current === "initial" && state.previous !== "initial") {
      progress.jump(0);
    } else if (state.current === "in-progress") {
      // setIntervalShouldRun(true);
      // startInterval()
      // progress.set(25);
    } else if (state.current === "resetting") {
      progress.jump(0);
    } else if (state.current === "completing") {
      progress.set(100);
    }
    // if (state === "resetting") {
    //   progress.jump(0);
    //   setState("in-progress");
    // } else if (state === "in-progress") {
    //   progress.set(25);
    // } else if (state === "completing") {
    //   progress.set(100);
    // }
  }, [progress, state]);

  // (prevState, action) => state
  // ({ previous: 'xxx', current: 'complete'}, 'start') => { current: 'in-progress', previous: 'complete' }
  // ({ previous: 'xxx', current: 'any-other'}, 'start') => { current: 'in-progress', previous: 'any-other' }

  // ({ before: 'xxx', current: 'complete'}, 'restart') => { current: 'in-progress' }

  useMotionValueEvent(progress, "change", (v) => {
    if (v === 100) {
      dispatch({ type: "FINISHED" });
    } else if (v === 0 && state.current === "resetting") {
      dispatch({ type: "START" });
    }
  });

  function restart() {
    //   progress.jump(0);
    //   setState("initial");
    dispatch({ type: "RESET" });
  }

  function start() {
    // if (state === "complete") {
    //   setState("resetting");
    // } else {
    //   setState("in-progress");
    // }
    // if (state === "complete") {
    //   progress.jump(0);
    // }
    dispatch({ type: "START" });
  }

  function finish() {
    dispatch({ type: "FINISH" });

    //   // if (state === "complete") {
    //   //   progress.jump(0);
    //   // }
    //   // progress.set(100);
    //   setState("completing");
  }

  return { state: state.current, progress, start, finish, restart };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

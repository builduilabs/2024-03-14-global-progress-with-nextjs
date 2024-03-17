"use client";

import { ReactNode, createContext, useContext } from "react";
import useProgress from "../use-progress";
import { AnimatePresence, motion, useMotionTemplate } from "framer-motion";

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

// import { useMotionTemplate } from "framer-motion";

// export default function GlobalProgress({
//   state,
//   progress,
//   restart,
// }: Pick<ReturnType<typeof useProgress>, "state" | "progress" | "restart">) {
//   let width = useMotionTemplate`${progress}%`;

//   return (
//     <AnimatePresence onExitComplete={restart}>
//       {state !== "complete" && (
//         <motion.div
//           style={{ width }}
//           exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.2 } }}
//           className="fixed h-2 shadow-lg shadow-sky-500/20 bg-sky-500 top-0"
//         />

//         // <motion.div
//         //   className="w-full flex justify-center items-center"
//         //   key="foo"
//         //   exit={{ opacity: 0 }}
//         // >
//         //   <svg viewBox="0 0 120 120" className="size-32 p-2 -rotate-90">
//         //     <motion.circle
//         //       style={{ pathLength }}
//         //       cx="60"
//         //       cy="60"
//         //       r="50"
//         //       stroke="currentColor"
//         //       className={`text-sky-500 ${
//         //         state === "initial" ? "opacity-0" : ""
//         //       }`}
//         //       strokeWidth={6}
//         //       fill="none"
//         //       strokeLinecap="round"
//         //     />
//         //   </svg>
//         // </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

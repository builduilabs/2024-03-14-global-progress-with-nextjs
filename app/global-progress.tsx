"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import {
  ElementRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

// export function GlobalProgress({ show, foo }: { show?: boolean, foo?: string }) {
//   // useEffect(() => {
//   //   setIsMounted(true);
//   // }, []);
//   // console.log({ isMounted: hasStartedNProgress });
//   // useEffect(() => {
//   //   let current = true;
//   //   nProgress.start();

//   //   return () => {
//   //     if (!current) {
//   //       nProgress.done();
//   //     }
//   //   };
//   // }, []);

//   // Attempt 3
//   useEffect(() => {
//     let isStarted = nProgress.isRendered();
//     if (!isStarted) {
//       nProgress.start();
//     }

//     return () => {
//       console.log("cleanup");
//       if (isStarted) {
//         console.log("done");
//         nProgress.done();
//       }
//     };
//   }, []);

//   // Version with state
//   // let [hasStartedNProgress, setHasStartedNProgress] = useState(false);
//   // useEffect(() => {
//   //   if (!hasStartedNProgress) {
//   //     nProgress.start();
//   //     setHasStartedNProgress(true);
//   //   }

//   //   return () => {
//   //     // the first time this cleanup runs its a no op
//   //     console.log("cleanup");
//   //     if (hasStartedNProgress) {
//   //       nProgress.done();
//   //     }
//   //   };
//   // }, [hasStartedNProgress]);

//   // Version with show prop
//   // useEffect(() => {
//   //   if (show && nProgress.isRendered() === false) {
//   //     nProgress.start();
//   //   } else if (!show) {
//   //     nProgress.done();
//   //   }
//   // }, [show]);

//   return null;
// }

// function GlobalProgress() {
//   let ref = useRef<ElementRef<"div">>(null);
//   nProgress.useEffect(() => {
//     let currentRef = ref.current;
//     if (currentRef) {
//       currentRef.classList.add("animate-[progress_1s]");
//     }

//     return () => {
//       setTimeout(() => {
//         if (currentRef) {
//           currentRef.classList.remove("animate-[progress_1s]");
//         }
//       }, 250);
//     };
//   }, []);

//   return <div ref={ref} className="fixed top-0 h-4 bg-green-500 left-0" />;
// }

export function ProgressLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  let [isPending, startTransition] = useTransition();
  let router = useRouter();

  return (
    <>
      <GlobalProgress />
      {/* {isPending && <GlobalProgress />} */}
      {/* <GlobalProgress show={isPending} /> */}
      <Link
        onClick={() => [
          startTransition(() => {
            router.push(href);
          }),
        ]}
        href={href}
      >
        {children}
      </Link>
    </>
  );
}

// export function NLink() {
//   let [isPending, startTransition] = useTransition();
//   let router = useRouter();

//   return <Link onClick={() => {
//     startTransition(() => {
//       router.push(this.href);
//     })
//   }}>
//     {children}
//   </Link>
// }

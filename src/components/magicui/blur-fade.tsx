// Adapted from Dillion Verma's Portfolio, MIT. See LICENSE.
import { useInView, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import type { ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  blur?: string;
}

export default function BlurFade({
  children,
  className,
  duration = 0.42,
  delay = 0,
  yOffset = 9,
  inView = false,
  blur = "2px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion || !inView || seen ? "visible" : "hidden"}
      variants={{
        hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
        visible: { y: 0, opacity: 1, filter: "blur(0px)" },
      }}
      transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : duration, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

import type { Transition } from "motion/react";

/**
 * FoodFighter Motion System — Centralized Transitions & Timings
 */

export const DURATION = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
} as const;

export const EASING = {
  standard: [0.2, 0, 0, 1] as const,
  enter: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
} as const;

export const SPRINGS = {
  soft: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } as const,
  snappy: {
    type: "spring",
    stiffness: 450,
    damping: 25,
  } as const,
} as const;

export const transitionFast: Transition = {
  duration: DURATION.fast,
  ease: EASING.standard,
};

export const transitionNormal: Transition = {
  duration: DURATION.normal,
  ease: EASING.standard,
};

export const transitionSlow: Transition = {
  duration: DURATION.slow,
  ease: EASING.standard,
};

export const transitionEnter: Transition = {
  duration: DURATION.normal,
  ease: EASING.enter,
};

export const transitionExit: Transition = {
  duration: DURATION.fast,
  ease: EASING.exit,
};

export const transitionSpringSoft: Transition = SPRINGS.soft;
export const transitionSpringSnappy: Transition = SPRINGS.snappy;

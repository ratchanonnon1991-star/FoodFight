import type { Variants } from "motion/react";
import { transitionEnter, transitionExit, transitionNormal, transitionSpringSoft } from "./transitions";

/**
 * FoodFighter Motion System — Reusable Variants
 */

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitionEnter },
  exit: { opacity: 0, transition: transitionExit },
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: transitionEnter },
  exit: { opacity: 0, y: -8, transition: transitionExit },
};

export const fadeDown: Variants = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0, transition: transitionEnter },
  exit: { opacity: 0, y: 8, transition: transitionExit },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: transitionSpringSoft },
  exit: { opacity: 0, scale: 0.95, transition: transitionExit },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: transitionNormal },
  exit: { opacity: 0, y: -6, transition: transitionExit },
};

"use client";

import React from "react";

// ✅ Props communs pour les animations (shim pour Framer Motion)
type MotionCommonProps = {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
  variants?: unknown;
  whileInView?: unknown;
  whileHover?: unknown;
  whileTap?: unknown;
  viewport?: unknown;
  layout?: unknown;
  layoutId?: unknown;
  onViewportEnter?: unknown;
  onViewportLeave?: unknown;
};

// ✅ Props pour tout élément HTML, incluant children
type PropsFor<T extends keyof React.JSX.IntrinsicElements> = Omit<
  React.JSX.IntrinsicElements[T],
  keyof MotionCommonProps
> &
  MotionCommonProps & {
    children?: React.ReactNode;
  };

// ✅ Supprime les props liées aux animations
function omitMotionProps(obj: Record<string, unknown>): Record<string, unknown> {
  const copy: Record<string, unknown> = { ...obj };
  const keys = [
    "initial",
    "animate",
    "exit",
    "transition",
    "variants",
    "whileInView",
    "whileHover",
    "whileTap",
    "viewport",
    "layout",
    "layoutId",
    "onViewportEnter",
    "onViewportLeave",
  ];
  for (const k of keys) delete copy[k];
  return copy;
}

// ✅ Wrapper React.forwardRef pour créer des éléments “motion”
function withElement<T extends keyof React.JSX.IntrinsicElements & keyof HTMLElementTagNameMap>(Tag: T) {
  const Comp = React.forwardRef<HTMLElementTagNameMap[T], PropsFor<T>>((props, ref) => {
    // Explicitly type the props destructuring to handle children properly
    const { children, ...rest } = props as PropsFor<T> & { children?: React.ReactNode };
    const safe = omitMotionProps(rest as unknown as Record<string, unknown>);
    return React.createElement(Tag, { ref, ...(safe as React.JSX.IntrinsicElements[T]) }, children);
  });

  Comp.displayName = `Motion(${String(Tag)})`;
  return Comp as unknown as (props: PropsFor<T>) => React.ReactElement | null;
}

// ✅ Export des éléments motion “shimmés”
export const motion = {
  div: withElement("div"),
  span: withElement("span"),
  a: withElement("a"),
  form: withElement("form"),
} as const;

// ✅ AnimatePresence shim
export const AnimatePresence: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

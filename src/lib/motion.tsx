"use client";
import React from 'react';

// Lightweight no-op shim to avoid build errors when 'framer-motion' isn't installed.

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

type PropsFor<T extends keyof React.JSX.IntrinsicElements> = Omit<
  React.ComponentPropsWithoutRef<T>,
  keyof MotionCommonProps
> &
  MotionCommonProps & {
    children?: React.ReactNode;
  };

function withElement<T extends keyof React.JSX.IntrinsicElements>(Tag: T) {
  const Comp = React.forwardRef<HTMLElement, PropsFor<T>>(
    (props: PropsFor<T>, ref) => {
      const { children, ...rest } = props;
      const safe = omitMotionProps(rest as Record<string, unknown>);
      return React.createElement(
        Tag,
        { ref, ...(safe as React.ComponentPropsWithoutRef<T>) },
        children
      );
    }
  );
  Comp.displayName = `Motion(${String(Tag)})`;
  return Comp as unknown as (props: PropsFor<T>) => React.JSX.Element;
}

export const motion = {
  div: withElement('div'),
  span: withElement('span'),
  a: withElement('a'),
  form: withElement('form'),
} as const;

export const AnimatePresence: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

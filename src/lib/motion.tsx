"use client";
import React from 'react';

// Lightweight no-op shim to avoid build errors when 'framer-motion' isn't installed.
// It preserves the JSX structure; animation props are ignored.

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

type PropsFor<T extends keyof JSX.IntrinsicElements> = Omit<
  React.ComponentPropsWithoutRef<T>,
  keyof MotionCommonProps
> &
  MotionCommonProps;

function omitMotionProps(obj: Record<string, unknown>): Record<string, unknown> {
  const copy: Record<string, unknown> = { ...obj };
  const keys = [
    'initial',
    'animate',
    'exit',
    'transition',
    'variants',
    'whileInView',
    'whileHover',
    'whileTap',
    'viewport',
    'layout',
    'layoutId',
    'onViewportEnter',
    'onViewportLeave',
  ];
  for (const k of keys) delete copy[k];
  return copy;
}

function withElement<T extends keyof JSX.IntrinsicElements>(Tag: T) {
  const Comp = React.forwardRef<HTMLElement, PropsFor<T>>((props, ref) => {
    const { children, ...rest } = props || ({} as PropsFor<T>);
    const safe = omitMotionProps(rest as unknown as Record<string, unknown>);
    return React.createElement(Tag, { ref, ...(safe as React.ComponentPropsWithoutRef<T>) }, children);
  });
  Comp.displayName = `Motion(${String(Tag)})`;
  return Comp as unknown as (props: PropsFor<T>) => JSX.Element;
}

export const motion = {
  div: withElement('div'),
  span: withElement('span'),
  a: withElement('a'),
  form: withElement('form'),
} as const;

export const AnimatePresence: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

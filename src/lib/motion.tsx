"use client";
import React from 'react';

// Lightweight no-op shim to avoid build errors when 'framer-motion' isn't installed.
// It preserves the JSX structure; animation props are ignored.

type AnyProps = any;

function withElement<T extends keyof JSX.IntrinsicElements>(Tag: T) {
  return React.forwardRef<HTMLElement, AnyProps>((props, ref) => {
    const {
      children,
      // motion/framer props we want to drop to avoid React DOM warnings
      initial,
      animate,
      exit,
      transition,
      variants,
      whileInView,
      whileHover,
      whileTap,
      viewport,
      layout,
      layoutId,
      onViewportEnter,
      onViewportLeave,
      // keep the rest (className, style, id, etc.)
      ...safe
    } = props || {};
    return React.createElement(Tag, { ref, ...safe }, children);
  }) as unknown as (props: AnyProps) => JSX.Element;
}

export const motion = {
  div: withElement('div'),
  span: withElement('span'),
  a: withElement('a'),
  form: withElement('form'),
} as const;

export const AnimatePresence: React.FC<{ children?: React.ReactNode } & AnyProps> = ({ children }) => (
  <>{children}</>
);

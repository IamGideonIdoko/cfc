'use client';

import { type ComponentProps, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const inputStyles = (className?: string) =>
  cva(
    twMerge(
      `block w-full rounded-md border p-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:shadow-none focus:outline-none focus:ring-1 focus:ring-inset focus-visible:border-[var(--pri-color)] focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--pri-color)] sm:text-sm sm:leading-6 ${
        className ?? ''
      }`,
    ),
    {
      variants: {},
    },
  );

export interface InputProps extends ComponentProps<'input'>, VariantProps<ReturnType<typeof inputStyles>> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={inputStyles(className)({})} {...props} />;
});

Input.displayName = 'Input';

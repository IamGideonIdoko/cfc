'use client';

import type { FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonOrLink, type ButtonOrLinkProps } from './ButtonOrLink';
import { twMerge } from 'tailwind-merge';

const buttonStyles = (className?: string) =>
  cva(
    twMerge(
      `flex items-center justify-center rounded-md p-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white disabled:pointer-events-none disabled:opacity-60 ${
        className ?? ''
      }`,
    ),
    {
      variants: {
        intent: {
          primary: 'bg-[var(--pri-color)] text-black hover:opacity-90',
          secondary: 'bg-[var(--sec-color)] text-white hover:opacity-90 focus:ring-gray-500',
          danger: 'bg-red-500 text-white focus:ring-red-500',
          none: '',
          outline: 'border',
        },
        fullWidth: {
          true: 'w-full',
        },
      },
      defaultVariants: {
        intent: 'primary',
      },
    },
  );

export interface ButtonProps extends ButtonOrLinkProps, VariantProps<ReturnType<typeof buttonStyles>> {}

export const Button: FC<ButtonProps> = ({ intent, fullWidth, className, ...props }) => {
  return <ButtonOrLink className={buttonStyles(className)({ intent, fullWidth })} {...props} />;
};

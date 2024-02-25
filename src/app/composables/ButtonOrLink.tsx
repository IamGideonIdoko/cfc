'use client';

import type { ComponentProps, FC } from 'react';
import Link from 'next/link';

export type ButtonOrLinkProps = ComponentProps<'button'> & ComponentProps<'a'>;

// ! This is a base component that will render either a button or a link,
// ! depending on the props that are passed to it. The link rendered will
// ! also correctly get wrapped in a next/link component to ensure ideal
// ! page-to-page transitions.
export const ButtonOrLink: FC<ButtonOrLinkProps> = ({ href, ref, ...props }) => {
  const isLink = typeof href !== 'undefined';

  if (isLink) {
    if (!href.startsWith('/')) return <a ref={ref} href={href} {...props} />;
    return <Link href={href} {...props} />;
  }

  return <button ref={ref} {...props} />;
};

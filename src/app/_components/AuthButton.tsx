'use client';

import { useMemo, type ReactNode, Fragment } from 'react';
import { Button } from '@/app/_composables';
import googleLogo from '@/app/_assets/google.png';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { MdDashboard } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { FaSignOutAlt } from 'react-icons/fa';
import defaultAvatar from '@/app/_assets/default_avatar.png';
import { FaChevronDown } from 'react-icons/fa6';

const AuthButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const navigation = useMemo<{ name: string; active: boolean; link: string; icon?: ReactNode }[]>(
    () => [
      {
        name: 'Dashboard',
        active: pathname === '/dashboard',
        link: '/dashboard',
        icon: <MdDashboard className="mr-1 inline-block h-4 w-4" />,
      },
      {
        name: 'Transactions',
        active: pathname === '/transactions',
        link: '/transactions',
        icon: <GrTransaction className="mr-1 inline-block h-4 w-4" />,
      },
    ],
    [pathname],
  );

  if (status === 'loading') return null;
  const callbackUrl = searchParams.get('callbackUrl');
  if (pathname === '/' || (!session && pathname !== '/'))
    return (
      <Button
        className="bg-black !text-white dark:bg-white dark:text-black"
        onClick={() =>
          session ? router.push('/dashboard') : void signIn('google', { callbackUrl: callbackUrl ?? undefined })
        }
      >
        {session ? (
          <>Go to dashboard</>
        ) : (
          <>
            Sign in with&nbsp;&nbsp;
            <Image src={googleLogo} width={50} height={50} alt="Google" className="h-6 w-6" />
          </>
        )}
      </Button>
    );
  if (!session) return null;
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-0 focus:ring-offset-[var(--secondary-color)]">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <span className={twMerge('mr-3 hidden text-base md:inline-block')}>
            {session.user?.name?.trim().split(' ')[0] ?? 'User'}
          </span>
          <Image
            className="h-8 w-8 rounded-full"
            src={session.user.image ?? defaultAvatar}
            alt=""
            width={22}
            height={22}
          />
          <FaChevronDown className="ml-3" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right overflow-hidden rounded-md bg-white py-0 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-black">
          {navigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item?.link ?? '/'}
                  className={twMerge(
                    'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white',
                    active && 'bg-gray-100 dark:bg-gray-800',
                    item?.active && 'bg-[var(--pri-color)] text-black dark:bg-[var(--pri-color)] dark:text-black',
                  )}
                >
                  {item?.icon}
                  {item?.name}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <Menu.Button
                className={twMerge(
                  active && 'bg-gray-100 dark:bg-gray-800',
                  'block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200',
                )}
                onClick={() => void signOut()}
              >
                <span>
                  <FaSignOutAlt className="inline-block h-4 w-4" /> Sign out
                </span>
              </Menu.Button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AuthButton;

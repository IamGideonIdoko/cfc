'use client';

import { Button } from '@/app/_composables';
import googleLogo from '@/app/_assets/google.png';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') return null;
  return (
    <Button
      className="bg-black dark:bg-white dark:text-black"
      onClick={() => (session ? router.push('/dashboard') : void signIn('google'))}
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
};

export default AuthButton;

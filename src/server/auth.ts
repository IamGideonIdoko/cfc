/* eslint-disable no-comments/disallowComments */
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import appConfig from '@/app/_config';
import { db } from './db';
import { getChimoneyHeaders } from './utils';
import type { CreateSubAccountResponse } from '@/app/_interfaces/chimoney';

async function createSubAccount({ id, name }: Record<'id' | 'name', string>) {
  'use server';

  try {
    const response = await fetch(`${appConfig.env.CHIMONEY_URL}/sub-account/create`, {
      method: 'POST',
      headers: {
        ...getChimoneyHeaders(),
      },
      body: JSON.stringify({
        name,
      }),
    });
    if (!response.ok) throw new Error('Failed to create account');
    const data = (await response.json()) as CreateSubAccountResponse;
    if (data.status === 'error') throw new Error(data.error);
    const subAccountId = data.data.id;
    await db.user.update({
      where: {
        id,
      },
      data: {
        subAccountId,
      },
    });
    return { status: 'success' };
  } catch (err) {
    return { status: 'error', error: (err as Error).message };
  }
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      id: 'google',
      clientId: appConfig.env.GOOGLE_CLIENT_ID,
      clientSecret: appConfig.env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: {
    maxAge: 2 * 24 * 60 * 60, // Expire session in 2 days
  },
  pages: {
    signIn: '/',
  },
  events: {
    signIn: async ({ user: { id, name }, isNewUser }) => {
      if (isNewUser && name) {
        const response = await createSubAccount({
          id,
          name,
        });
        console.log('Create sub account response: ', response);
      }
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

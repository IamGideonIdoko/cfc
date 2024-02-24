import NextAuth, { type AuthOptions } from 'next-auth';

const handler: unknown = NextAuth({} as AuthOptions);

export { handler as GET, handler as POST };

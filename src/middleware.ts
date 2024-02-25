import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      // ! verify token and return a boolean
      const sessionToken = req.cookies.get('next-auth.session-token');
      if (sessionToken) return true;
      return false;
    },
  },
});

export const config = { matcher: ['/dashboard', '/transactions'] };

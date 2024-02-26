/* eslint-disable no-comments/disallowComments */

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  headers: () => {
    return new Promise((resolve) =>
      resolve([
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: process.env.NEXTAUTH_URL ?? '',
            },
          ],
        },
      ]),
    );
  },
};

export default nextConfig;

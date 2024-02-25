import type { IAppConfig } from '@/app/_interfaces/config';
import { env } from '@/env.mjs';

const appConfig: IAppConfig = {
  env: {
    ...env,
    isProd: env.NODE_ENV === 'production',
    isDev: env.NODE_ENV === 'development',
    isTest: env.NODE_ENV === 'test',
    get isServer() {
      return typeof window === 'undefined' ? true : false;
    },
    get isClient() {
      return typeof window !== 'undefined' ? true : false;
    },
  },
  theme: {
    brandColor: '#001F4E',
  },
};

export default appConfig;

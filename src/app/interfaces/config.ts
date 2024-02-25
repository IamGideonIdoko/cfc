import { env } from '@/env.mjs';

type Env = typeof env;

type EnvConfig = Env & Record<'isServer' | 'isClient' | 'isProd' | 'isDev' | 'isTest', boolean>;

interface ThemeConfig {
  brandColor: string;
}

export interface IAppConfig {
  env: EnvConfig;
  theme: ThemeConfig;
}

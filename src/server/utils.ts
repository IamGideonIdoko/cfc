import appConfig from '@/app/_config';

export const getChimoneyHeaders = (): HeadersInit => ({
  'content-type': 'application/json;charset=UTF-8',
  'X-API-KEY': appConfig.env.CHIMONEY_KEY,
});

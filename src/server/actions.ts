'use server';

import { redirect } from 'next/navigation';
import { getServerAuthSession } from './auth';
import { getChimoneyHeaders, CacheTag } from './utils';
import type { GetSubAccountDetailsResponse } from '@/app/_interfaces/chimoney';
import appConfig from '@/app/_config';

export async function getAccountDetails() {
  const session = await getServerAuthSession();
  if (!session) redirect('/');
  // ! if (!session.user.subAccountId) return { status: 'error', error: 'No sub-account ID' };
  // TODO: Allow users to manually if paradventure an sub-account was not created on sign up
  if (!session.user.subAccountId) throw new Error('No sub-account ID');
  const subAccountId = session.user.subAccountId;
  const response = await fetch(`${appConfig.env.CHIMONEY_URL}/sub-account/get?id=${subAccountId}`, {
    headers: {
      ...getChimoneyHeaders(),
    },
    next: {
      tags: [`${CacheTag.ACCOUNT_DETAILS}:${subAccountId}`],
    },
  });
  if (!response.ok) throw new Error('Failed to fetch account details');
  const data = (await response.json()) as GetSubAccountDetailsResponse;
  if (data.status === 'error') throw new Error(data.error);
  console.log('Account details: ', data.data);
  return { status: 'success', data: data.data };
}

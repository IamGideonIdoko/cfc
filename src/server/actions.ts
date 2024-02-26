'use server';

import { redirect } from 'next/navigation';
import { getServerAuthSession } from './auth';
import { getChimoneyHeaders, CacheTag } from './utils';
import type { GetSubAccountDetailsResponse, ChimoneyResponse } from '@/app/_interfaces/chimoney';
import appConfig from '@/app/_config';
import { db } from './db';

export async function getAccountDetails() {
  const session = await getServerAuthSession();
  if (!session) redirect('/');
  // ! if (!session.user.subAccountId) return { status: 'error', error: 'No sub-account ID' };
  // TODO: Allow users to manually if paradventure an sub-account was not created on sign up
  const subAccountId = session.user.subAccountId;
  if (!subAccountId) throw new Error('No sub-account ID');
  const response = await fetch(`${appConfig.env.CHIMONEY_URL}/sub-account/get?id=${subAccountId}`, {
    headers: {
      ...getChimoneyHeaders(),
    },
    next: {
      tags: [CacheTag.ACCOUNT_DETAILS, `${CacheTag.ACCOUNT_DETAILS}:${subAccountId}`],
    },
  });
  if (!response.ok) throw new Error('Failed to fetch account details');
  const data = (await response.json()) as GetSubAccountDetailsResponse;
  if ('status' in data && data.status === 'success') return { status: 'success', data: data.data };
  throw new Error('error' in data ? data.error : data.message);
}

export async function initiatePaymentRequest({ email, amount }: { email: string; amount: number }) {
  try {
    const session = await getServerAuthSession();
    if (!session) redirect('/');
    const subAccountId = session.user.subAccountId;
    if (!subAccountId) throw new Error('No sub-account ID');
    const response = await fetch(`${appConfig.env.CHIMONEY_URL}/payment/initiate`, {
      method: 'POST',
      headers: {
        ...getChimoneyHeaders(),
      },
      body: JSON.stringify({
        valueInUSD: amount,
        payerEmail: email,
        subAccount: subAccountId,
        redirect_url: appConfig.env.NEXTAUTH_URL,
      }),
    });
    if (!response.ok) throw new Error('Failed to fetch account details');
    const data = (await response.json()) as ChimoneyResponse<{ paymentLink: string }>;
    console.log('Data: ', data);
    if ('status' in data && data.status === 'success') return { data: { paymentLink: data.data.paymentLink } };
    throw new Error('error' in data ? data.error : data.message);
  } catch (err) {
    return { error: (err as Error).message };
  }
}

export async function searchUsers(search?: string) {
  try {
    const session = await getServerAuthSession();
    if (!session) redirect('/');
    const subAccountId = session.user.subAccountId;
    if (!subAccountId) throw new Error('No sub-account ID');
    const users = db.user.findMany({
      where: {
        NOT: {
          subAccountId,
        },
        OR: search
          ? [
              {
                name: {
                  contains: search,
                },
              },
              {
                email: {
                  contains: search,
                },
              },
            ]
          : [],
      },
      take: 10,
    });
    return { data: { users } };
  } catch (err) {
    return { error: (err as Error).message };
  }
}

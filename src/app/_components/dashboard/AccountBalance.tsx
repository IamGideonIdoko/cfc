'use client';

import type { FC } from 'react';
import type { SubAccountDetails } from '@/app/_interfaces/chimoney';
import { formatNumber } from '@/app/_utils/global';
import { GrMoney } from 'react-icons/gr';
import { PiPiggyBank } from 'react-icons/pi';
import { GiBank } from 'react-icons/gi';

const AccountBalance: FC<{ accountDetails: SubAccountDetails }> = ({ accountDetails }) => {
  return (
    <div className="mt-8 grid grid-cols-3 items-center justify-center rounded-2xl border p-6 max-[1028px]:grid-cols-1 max-[1028px]:gap-16">
      {accountDetails.wallets.map((wallet, idx) => {
        return (
          <div key={wallet.id} className="w-fit max-[1028px]:mx-auto">
            <div className="flex items-center gap-2">
              <div className="rounded-lg border bg-[var(--sec-color)] p-2 dark:bg-gray-800">
                {idx === 0 ? (
                  <GrMoney className="text-[var(--pri-color)]" />
                ) : idx === 1 ? (
                  <PiPiggyBank className="text-[var(--pri-color)]" />
                ) : idx === 2 ? (
                  <GiBank className="text-[var(--pri-color)]" />
                ) : null}
              </div>
              <span className="text-lg capitalize text-gray-700 dark:text-gray-200">{wallet.type}</span>
            </div>
            <div className="mt-2 flex gap-1">
              <small className="text-3xl">$</small>
              <span className="min-w-0 text-pretty break-words text-5xl font-medium">
                {formatNumber(wallet.balance.toFixed(2))}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountBalance;

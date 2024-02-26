import type { Metadata } from 'next';
import { getAccountDetails } from '@/server/actions';
import AccountBalance from '@/app/_components/dashboard/AccountBalance';
import TodayDate from '@/app/_components/dashboard/TodayDate';
import SendPayment from '@/app/_components/dashboard/SendPayment';
import ReceivePayment from '@/app/_components/dashboard/ReceivePayment';

export const metadata: Metadata = {
  title: 'Dashboard .:: CFC-Pay',
  description: 'Simple payment app',
};

const Dashboard = async () => {
  const { data: accountDetails } = await getAccountDetails();
  return (
    <div className="pt-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-end gap-2">
          <h1 className="text-2xl font-semibold">Welcome board</h1>
          <TodayDate />
        </div>
        <div className="flex items-center gap-4">
          <SendPayment />
          <ReceivePayment />
        </div>
      </div>
      <AccountBalance accountDetails={accountDetails} />
    </div>
  );
};

export default Dashboard;

import type { Metadata } from 'next';
import { getAccountDetails } from '@/server/actions';
import AccountBalance from '@/app/_components/dashboard/AccountBalance';
import TodayDate from '@/app/_components/dashboard/TodayDate';

export const metadata: Metadata = {
  title: 'Dashboard .:: CFC-Pay',
  description: 'Simple payment app',
};

const Dashboard = async () => {
  const { data: accountDetails } = await getAccountDetails();
  return (
    <div className="pt-8">
      <div>
        <div className="flex items-end gap-2">
          <h1 className="text-2xl font-semibold">Welcome board</h1>
          <TodayDate />
        </div>
      </div>
      <AccountBalance accountDetails={accountDetails} />
    </div>
  );
};

export default Dashboard;

import type { FC, ReactNode } from 'react';
import Navbar from '@/app/_components/Navbar';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="mx-auto max-w-7xl px-4">
      <Navbar />
      {children}
    </main>
  );
};

export default MainLayout;

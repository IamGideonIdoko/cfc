import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './_styles/globals.css';
import { ThemeProvider, SessionProvider } from '@/app/_providers';
import { getServerAuthSession } from '@/server/auth';
import MainLayout from './_layouts/MainLayout';

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CFC-Pay',
  description: 'Simple payment app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body className={workSans.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

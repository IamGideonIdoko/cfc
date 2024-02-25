import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './styles/globals.css';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CPay',
  description: 'Simple payment app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}

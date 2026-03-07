import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { BottomNav } from '@/components/bottom-nav';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dompet Kita',
  description:
    'Catat pemasukan & pengeluaran bersama pasangan. Kelola dompet, kategori, dan keuangan keluarga dalam satu tempat.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-3xl bg-gray-50 min-h-screen shadow-md pb-16">
            {children}
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}

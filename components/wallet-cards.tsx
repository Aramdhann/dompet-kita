'use client';

import { Wallet, CreditCard, PiggyBank, WalletIcon } from 'lucide-react';
import { WalletCard } from '@/components/wallet-card';
import Link from 'next/link';

interface WalletCardsProps {
  visible: boolean;
}

const wallets = [
  {
    name: 'BCA',
    icon: CreditCard,
    amount: 5000000,
    color: 'text-blue-600 bg-blue-50',
    lastTransaction: '7 Mar',
    lastTransactionAmount: 12500000,
    lastTransactionType: 'income' as const,
  },
  {
    name: 'Mandiri',
    icon: PiggyBank,
    amount: 2000000,
    color: 'text-yellow-600 bg-yellow-50',
    lastTransaction: '5 Mar',
    lastTransactionAmount: 500000,
    lastTransactionType: 'expense' as const,
  },
  {
    name: 'GoPay',
    icon: Wallet,
    amount: 1000000,
    color: 'text-green-600 bg-green-50',
    lastTransaction: '3 Mar',
    lastTransactionAmount: 300000,
    lastTransactionType: 'income' as const,
  },
  {
    name: 'OVO',
    icon: WalletIcon,
    amount: 500000,
    color: 'text-purple-600 bg-purple-50',
    lastTransaction: '1 Mar',
    lastTransactionAmount: 100000,
    lastTransactionType: 'expense' as const,
  },
  {
    name: 'DANA',
    icon: Wallet,
    amount: 300000,
    color: 'text-blue-500 bg-blue-50',
    lastTransaction: '28 Feb',
    lastTransactionAmount: 100000,
    lastTransactionType: 'income' as const,
  },
];

export function WalletCards({ visible }: WalletCardsProps) {
  return (
    <div className="flex flex-col gap-5 m-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700">Dompet Saya</p>
        <div className="py-1 px-3 bg-blue-50 rounded-2xl border border-blue-700">
          <p className="text-sm text-blue-700">+ Tambah</p>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide scroll-smooth snap-x">
        {wallets.slice(0, 4).map((wallet) => (
          <div key={wallet.name} className="min-w-35 snap-start">
            <WalletCard
              name={wallet.name}
              icon={wallet.icon}
              amount={wallet.amount}
              color={wallet.color}
              visible={visible}
              lastTransaction={wallet.lastTransaction}
              lastTransactionAmount={wallet.lastTransactionAmount}
              lastTransactionType={wallet.lastTransactionType}
            />
          </div>
        ))}
        <Link href="/dompet" className="flex min-w-35 min-h-fit snap-start">
          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
            <WalletIcon className="w-6 h-6 text-blue-600" />
            <p className="text-xs font-medium text-blue-600 text-center leading-tight">
              Lihat semua dompet
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

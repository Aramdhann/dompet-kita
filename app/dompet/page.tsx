'use client';

import { useState } from 'react';
import {
  CreditCard,
  Eye,
  EyeOff,
  PiggyBank,
  Wallet,
  WalletIcon,
} from 'lucide-react';
import { WalletCard } from '@/components/wallet-card';

export default function DompetPage() {
  const [visible, setVisible] = useState(true);

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
      lastTransactionAmount: 750000,
      lastTransactionType: 'transfer' as const,
      lastTransactionDirection: 'outgoing' as const,
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
      lastTransactionAmount: 50000,
      lastTransactionType: 'transfer' as const,
      lastTransactionDirection: 'incoming' as const,
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
    {
      name: 'ShopeePay',
      icon: WalletIcon,
      amount: 150000,
      color: 'text-orange-600 bg-orange-50',
      lastTransaction: '25 Feb',
      lastTransactionAmount: 25000,
      lastTransactionType: 'expense' as const,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Semua Dompet</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setVisible(!visible)}
            className="text-sm p-2 rounded-lg bg-blue-50 text-blue-700 shadow-sm hover:shadow-md transition-colors border border-blue-700"
          >
            + Tambah
          </button>
          <button
            onClick={() => setVisible(!visible)}
            className="text-sm p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-colors border border-blue-700"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
        {wallets.map((wallet) => (
          <WalletCard
            key={wallet.name}
            name={wallet.name}
            icon={wallet.icon}
            amount={wallet.amount}
            color={wallet.color}
            visible={visible}
            lastTransaction={wallet.lastTransaction}
            lastTransactionAmount={wallet.lastTransactionAmount}
            lastTransactionType={wallet.lastTransactionType}
            lastTransactionDirection={wallet.lastTransactionDirection}
          />
        ))}
      </div>
    </div>
  );
}

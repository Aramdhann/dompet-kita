'use client';

import { WalletCard } from '@/components/cards/wallet-card';
import { wallets } from '@/models/wallets';
import { WalletIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface WalletCardsProps {
  visible: boolean;
}

export function WalletCards({ visible }: WalletCardsProps) {
  return (
    <div className="flex flex-col gap-5 m-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700">Dompet Saya</p>
        <Button variant="outline" className="text-sm text-blue-700">
          + Tambah
        </Button>
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
              lastTransactionDirection={wallet.lastTransactionDirection}
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

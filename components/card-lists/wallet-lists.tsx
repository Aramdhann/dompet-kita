'use client';

import { WalletCard } from '@/components/cards/wallet-card';
import { wallets } from '@/models/wallets';
import { Plus, WalletIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface WalletCardsProps {
  visible: boolean;
}

export function WalletCards({ visible }: WalletCardsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 m-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700">Dompet Saya</p>
        <Button
          onClick={() => router.push('/dompet')}
          variant="outline"
          className="text-sm text-blue-700"
        >
          Lihat Semua
        </Button>
      </div>
      <div className="flex gap-3 p-1 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x">
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
        <Link href="/dompet/tambah" className="flex min-h-fit snap-start">
          <div className="min-w-35 p-4 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
            <p className="text-sm font-medium text-blue-600 text-center leading-tight">
              <div className='flex items-center text-center'>
                <Plus size={18} /> Tambah Dompet
              </div>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

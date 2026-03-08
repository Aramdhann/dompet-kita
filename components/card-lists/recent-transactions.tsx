'use client';

import { TransactionCard } from '@/components/cards/transaction-card';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { transactions } from '@/models/transactions';

interface RecentTransactionsProps {
  visible: boolean;
}

export function RecentTransactions({ visible }: RecentTransactionsProps) {
  return (
    <div className="flex flex-col gap-5 m-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-700">
            Transaksi Terbaru
          </p>
          <p className="text-xs text-gray-500">Timeline aktivitas keuangan</p>
        </div>
        <Link href="/transaksi">
          <Button
            className={buttonVariants({
              variant: 'outline',
              className: 'text-sm text-blue-700',
            })}
          >
            Lihat Semua
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {transactions.slice(0, 5).map((transaction) => (
          <TransactionCard
            key={transaction.id}
            category={transaction.category}
            categoryIcon={transaction.categoryIcon}
            categoryColor={transaction.categoryColor}
            amount={transaction.amount}
            transactionDate={transaction.transactionDate}
            type={transaction.type}
            direction={transaction.direction}
            visible={visible}
            description={transaction.description}
          />
        ))}
      </div>
    </div>
  );
}

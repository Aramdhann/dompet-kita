'use client';

import { useState } from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';
import { TransactionCard } from '@/components/cards/transaction-card';
import { Button } from '@/components/ui/button';
import { transactions } from '@/models/transactions';
import { useRouter } from 'next/navigation';

export default function TransaksiPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Semua Transaksi</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/transaksi/tambah?type=income")}
            variant="outline"
            className="text-sm text-blue-700"
          >
            <Plus size={18} /> Tambah
          </Button>
          <Button
            onClick={() => setVisible(!visible)}
            variant="outline"
            className="text-sm"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {transactions.map((transaction) => (
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

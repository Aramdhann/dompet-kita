'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/dashboard';
import { WalletCards } from '@/components/card-lists/wallet-lists';
import { ExpenseCategories } from '@/components/card-lists/expense-categories';
import { RecentTransactions } from '@/components/card-lists/recent-transactions';

export default function Page() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Dashboard visible={visible} onToggle={() => setVisible(!visible)} />
      <WalletCards visible={visible} />
      <ExpenseCategories visible={visible} />
      <RecentTransactions visible={visible} />
    </>
  );
}

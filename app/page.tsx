'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/dashboard';
import { WalletCards } from '@/components/wallet-cards';

export default function Page() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Dashboard visible={visible} onToggle={() => setVisible(!visible)} />
      <WalletCards visible={visible} />
    </>
  );
}

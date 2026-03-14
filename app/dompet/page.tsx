"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Plus } from "lucide-react";
import { WalletCard } from "@/components/cards/wallet-card";
import { Button } from "@/components/ui/button";
import { wallets } from "@/models/wallets";

export default function DompetPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Semua Dompet</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/dompet/tambah")}
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

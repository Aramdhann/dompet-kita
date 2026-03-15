'use client';

import { use, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightLeft,
} from 'lucide-react';
import { WalletSelector } from '@/components/common/wallet-selector';
import { CategorySelector } from '@/components/common/category-selector';
import { DatePicker } from '@/components/common/date-picker';

// ── Reusable: Common Form Fields ─────────────────────────────
function CommonFields({
  amountId,
  amountPlaceholder,
  date,
  onDateChange,
}: {
  amountId: string;
  amountPlaceholder: string;
  date?: Date;
  onDateChange: (d?: Date) => void;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={amountId}>Nominal</Label>
        <Input
          id={amountId}
          type="number"
          placeholder={amountPlaceholder}
          className="text-sm h-12"
        />
      </div>
      <div className="space-y-2">
        <Label>Tanggal</Label>
        <DatePicker value={date} onChange={onDateChange} />
      </div>
      <div className="space-y-2">
        <Label>Deskripsi</Label>
        <Textarea
          placeholder="Tambahkan deskripsi (opsional)"
          className="text-sm min-h-24 resize-none"
        />
      </div>
    </>
  );
}

// ── Main Component ───────────────────────────────────────────
function TambahTransaksiContent({ typeParam }: { typeParam?: string }) {
  const validTabs = ['income', 'expense', 'transfer'];
  const [activeTab, setActiveTab] = useState(
    validTabs.includes(typeParam ?? '') ? typeParam! : 'income'
  );

  const [incomeWallet, setIncomeWallet] = useState('');
  const [incomeCategory, setIncomeCategory] = useState('');
  const [incomeDate, setIncomeDate] = useState<Date>();

  const [expenseWallet, setExpenseWallet] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState<Date>();

  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferDate, setTransferDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit', activeTab);
  };

  return (
    <div className="flex flex-col gap-4 p-5 pb-24">
      <div className="flex items-center gap-3">
        <Link href="/transaksi">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Tambah Transaksi</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-gray-100 p-1">
          <TabsTrigger
            value="income"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-1.5">
              <ArrowDownCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm">Masuk</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="expense"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-1.5">
              <ArrowUpCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm">Keluar</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="transfer"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Transfer</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Income */}
        <TabsContent value="income" className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CommonFields
              amountId="amount-income"
              amountPlaceholder="Nominal pemasukan"
              date={incomeDate}
              onDateChange={setIncomeDate}
            />
            <div className="space-y-2">
              <Label>Dompet</Label>
              <WalletSelector value={incomeWallet} onChange={setIncomeWallet} />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <CategorySelector
                value={incomeCategory}
                onChange={setIncomeCategory}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl text-sm font-semibold"
            >
              Simpan Pemasukan
            </Button>
          </form>
        </TabsContent>

        {/* Expense */}
        <TabsContent value="expense" className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CommonFields
              amountId="amount-expense"
              amountPlaceholder="Nominal pengeluaran"
              date={expenseDate}
              onDateChange={setExpenseDate}
            />
            <div className="space-y-2">
              <Label>Dompet</Label>
              <WalletSelector
                value={expenseWallet}
                onChange={setExpenseWallet}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <CategorySelector
                value={expenseCategory}
                onChange={setExpenseCategory}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 h-12 rounded-xl text-sm font-semibold"
            >
              Simpan Pengeluaran
            </Button>
          </form>
        </TabsContent>

        {/* Transfer */}
        <TabsContent value="transfer" className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CommonFields
              amountId="amount-transfer"
              amountPlaceholder="Nominal transfer"
              date={transferDate}
              onDateChange={setTransferDate}
            />
            <div className="space-y-2">
              <Label>Dompet Asal</Label>
              <WalletSelector
                value={transferFrom}
                onChange={setTransferFrom}
                exclude={transferTo}
                placeholder="Pilih dompet asal"
              />
            </div>
            <div className="space-y-2">
              <Label>Dompet Tujuan</Label>
              <WalletSelector
                value={transferTo}
                onChange={setTransferTo}
                exclude={transferFrom}
                placeholder="Pilih dompet tujuan"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-sm font-semibold"
            >
              Simpan Transfer
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function TambahTransaksiPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = use(searchParams);

  return <TambahTransaksiContent key={type} typeParam={type} />;
}

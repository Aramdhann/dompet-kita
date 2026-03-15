'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Wallet, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { wallets } from '@/models/wallets';
import { categories } from '@/models/categories';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightLeft } from 'lucide-react';

function TambahTransaksiContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get('type') || 'income';

  const [incomeWallet, setIncomeWallet] = useState('');
  const [incomeCategory, setIncomeCategory] = useState('');
  const [expenseWallet, setExpenseWallet] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');

  const validTabs = ['income', 'expense', 'transfer'];
  const [activeTab, setActiveTab] = useState(
    validTabs.includes(typeParam ?? '') ? typeParam! : 'income'
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/transaksi/tambah?type=${value}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      type: activeTab,
      income: {
        wallet: incomeWallet,
        category: incomeCategory,
      },
      expense: {
        wallet: expenseWallet,
        category: expenseCategory,
      },
      transfer: {
        from: transferFrom,
        to: transferTo,
      },
    };
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col gap-4 p-5 pb-24">
      <div className="flex items-center gap-3">
        <Link href="/transaksi">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Tambah Transaksi</h1>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3 bg-gray-100 p-1">
          <TabsTrigger
            value="income"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-1.5">
              <ArrowDownCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm">Income</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="expense"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-1.5">
              <ArrowUpCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm">Expense</span>
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

        <TabsContent value="income" className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount-income">Nominal</Label>
              <Input
                id="amount-income"
                type="number"
                placeholder="Masukkan nominal pemasukan"
                className="text-sm h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet-income">Dompet</Label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12"
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {wallets.find((w) => w.id === incomeWallet)
                          ? `${wallets.find((w) => w.id === incomeWallet)?.name} - Rp ${wallets.find((w) => w.id === incomeWallet)?.amount.toLocaleString('id-ID')}`
                          : 'Pilih dompet'}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-3/4 max-w-3xl mx-auto rounded-t-2xl p-4"
                >
                  <SheetHeader>
                    <SheetTitle>Pilih Dompet</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto scrollbar-hide scroll-smooth flex-1 flex flex-col gap-3">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => setIncomeWallet(wallet.id || '')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${incomeWallet === wallet.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${wallet.color}`}>
                            <wallet.icon className="w-5 h-5 text-gray-700" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-900">
                              {wallet.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              Rp {wallet.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        {incomeWallet === wallet.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-income">Kategori</Label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12"
                  >
                    <span className="text-sm">
                      {categories.find((c) => c.id === incomeCategory)?.name ||
                        'Pilih kategori'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-3/4 max-w-3xl mx-auto rounded-t-2xl p-4"
                >
                  <SheetHeader>
                    <SheetTitle>Pilih Kategori</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto scrollbar-hide scroll-smooth flex-1 flex flex-col gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setIncomeCategory(category.id || '')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${incomeCategory === category.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${category.color}`}>
                            <category.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-900">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              Rp {category.amount.toLocaleString('id-ID')} / Rp{' '}
                              {category.budget.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        {incomeCategory === category.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-income">Tanggal</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="date-income" type="date" className="pl-10 h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description-income">Deskripsi</Label>
              <Textarea
                id="description-income"
                placeholder="Tambahkan deskripsi (opsional)"
                className="text-sm min-h-32"
                rows={3}
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

        <TabsContent value="expense" className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount-expense">Nominal</Label>
              <Input
                id="amount-expense"
                type="number"
                placeholder="Masukkan nominal pengeluaran"
                className="text-sm h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet-expense">Dompet</Label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12"
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {wallets.find((w) => w.id === expenseWallet)
                          ? `${wallets.find((w) => w.id === expenseWallet)?.name} - Rp ${wallets.find((w) => w.id === expenseWallet)?.amount.toLocaleString('id-ID')}`
                          : 'Pilih dompet'}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-3/4 max-w-3xl mx-auto rounded-t-2xl p-4"
                >
                  <SheetHeader>
                    <SheetTitle>Pilih Dompet</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto scrollbar-hide scroll-smooth flex-1 flex flex-col gap-3">
                    {' '}
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => setExpenseWallet(wallet.id || '')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${expenseWallet === wallet.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${wallet.color}`}>
                            <wallet.icon className="w-5 h-5 text-gray-700" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-900">
                              {wallet.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              Rp {wallet.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        {expenseWallet === wallet.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-expense">Kategori</Label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12"
                  >
                    <span className="text-sm">
                      {categories.find((c) => c.id === expenseCategory)?.name ||
                        'Pilih kategori'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-3/4 max-w-3xl mx-auto rounded-t-2xl p-4"
                >
                  <SheetHeader>
                    <SheetTitle>Pilih Kategori</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto scrollbar-hide scroll-smooth flex-1 flex flex-col gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setExpenseCategory(category.id || '')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${expenseCategory === category.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${category.color}`}>
                            <category.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-900">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              Rp {category.amount.toLocaleString('id-ID')} / Rp{' '}
                              {category.budget.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        {expenseCategory === category.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-expense">Tanggal</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="date-expense" type="date" className="pl-10 h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description-expense">Deskripsi</Label>
              <Textarea
                id="description-expense"
                placeholder="Tambahkan deskripsi (opsional)"
                className="text-sm min-h-32"
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

        <TabsContent value="transfer" className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount-transfer">Nominal</Label>
              <Input
                id="amount-transfer"
                type="number"
                placeholder="Masukkan nominal transfer"
                className="text-sm h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet-from">Dompet Asal</Label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12"
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {wallets.find((w) => w.id === transferFrom)
                          ? `${wallets.find((w) => w.id === transferFrom)?.name} - Rp ${wallets.find((w) => w.id === transferFrom)?.amount.toLocaleString('id-ID')}`
                          : 'Pilih dompet asal'}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-3/4 max-w-3xl mx-auto rounded-t-2xl p-4"
                >
                  <SheetHeader>
                    <SheetTitle>Pilih Dompet</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto scrollbar-hide scroll-smooth flex-1 flex flex-col gap-3">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => setTransferFrom(wallet.id || '')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${transferFrom === wallet.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${wallet.color}`}>
                            <wallet.icon className="w-5 h-5 text-gray-700" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-900">
                              {wallet.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              Rp {wallet.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        {transferFrom === wallet.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet-to">Dompet Tujuan</Label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12"
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {wallets.find((w) => w.id === transferTo)
                          ? `${wallets.find((w) => w.id === transferTo)?.name} - Rp ${wallets.find((w) => w.id === transferTo)?.amount.toLocaleString('id-ID')}`
                          : 'Pilih dompet tujuan'}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-3/4 max-w-3xl mx-auto rounded-t-2xl p-4"
                >
                  <SheetHeader>
                    <SheetTitle>Pilih Dompet</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto scrollbar-hide scroll-smooth flex-1 flex flex-col gap-3">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => setTransferTo(wallet.id || '')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${transferTo === wallet.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${wallet.color}`}>
                            <wallet.icon className="w-5 h-5 text-gray-700" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-900">
                              {wallet.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              Rp {wallet.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        {transferTo === wallet.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-transfer">Tanggal</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="date-transfer" type="date" className="pl-10 h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description-transfer">Deskripsi</Label>
              <Textarea
                id="description-transfer"
                placeholder="Tambahkan deskripsi (opsional)"
                className="text-sm min-h-32"
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

export default function TambahTransaksiPage() {
  return (
    <Suspense fallback={<div className="p-5">Loading...</div>}>
      <TambahTransaksiContent />
    </Suspense>
  );
}

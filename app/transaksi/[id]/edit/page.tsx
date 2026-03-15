'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, X, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { WalletSelector } from '@/components/common/wallet-selector';
import { CategorySelector } from '@/components/common/category-selector';
import { DatePicker } from '@/components/common/date-picker';
import { transactions } from '@/models/transactions';
import { wallets } from '@/models/wallets';
import { generateTransferCategory } from '@/lib/transfer';

function CommonFields({
  amountId,
  amountPlaceholder,
  date,
  onDateChange,
  amountValue,
  onAmountChange,
  description,
  onDescriptionChange,
}: {
  amountId: string;
  amountPlaceholder: string;
  date?: Date;
  onDateChange: (d?: Date) => void;
  amountValue: string;
  onAmountChange: (value: string) => void;
  description?: string;
  onDescriptionChange: (value: string) => void;
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
          value={amountValue}
          onChange={(e) => onAmountChange(e.target.value)}
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
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
    </>
  );
}

export default function EditTransaksiPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string;

  const transaction = transactions.find((t) => t.id === transactionId);

  const [amount, setAmount] = useState(transaction?.amount.toString() || '');
  const [date, setDate] = useState<Date>(transaction?.createdAt || new Date());
  const [description, setDescription] = useState(
    transaction?.description || ''
  );

  const handleDateChange = (d?: Date) => {
    if (d) setDate(d);
  };

  const [selectedWallet, setSelectedWallet] = useState(
    transaction?.walletId || ''
  );
  const [selectedCategory, setSelectedCategory] = useState(
    transaction?.categoryId || ''
  );

  const [transferFrom, setTransferFrom] = useState(transaction?.walletId || '');
  const [transferTo, setTransferTo] = useState(transaction?.toWalletId || '');

  if (!transaction) {
    return (
      <div className="flex flex-col items-center justify-center p-5 min-h-screen">
        <p className="text-gray-500">Transaksi tidak ditemukan</p>
        <Button
          onClick={() => router.push('/transaksi')}
          variant="outline"
          className="mt-4"
        >
          Kembali
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating transaction:', {
      id: transaction.id,
      type: transaction.type,
      amount: parseFloat(amount),
      date,
      description,
      walletId: selectedWallet,
      categoryId: selectedCategory,
      transferFrom,
      transferTo,
    });

    if (transaction.type === 'transfer') {
      const fromWallet = wallets.find((w) => w.id === transferFrom);
      const toWallet = wallets.find((w) => w.id === transferTo);

      if (!fromWallet || !toWallet) {
        console.error('Dompet asal atau tujuan tidak ditemukan');
        return;
      }

      const transferCategoryFrom = generateTransferCategory(
        'outgoing',
        toWallet.name
      );
      const transferCategoryTo = generateTransferCategory(
        'incoming',
        fromWallet.name
      );

      console.log('Transfer transaction updated:');
      console.log('- From wallet:', fromWallet.name, transferCategoryFrom);
      console.log('- To wallet:', toWallet.name, transferCategoryTo);
    }

    router.push(`/transaksi/${transactionId}`);
  };

  const handleCancel = () => {
    router.push(`/transaksi/${transactionId}`);
  };

  const getTitle = () => {
    if (transaction.type === 'income') return 'Edit Pemasukan';
    if (transaction.type === 'expense') return 'Edit Pengeluaran';
    return 'Edit Transfer';
  };

  return (
    <div className="flex flex-col gap-4 p-5 pb-24">
      <div className="flex items-center gap-3">
        <button onClick={handleCancel}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{getTitle()}</h1>
      </div>

      <form
        id="edit-transaction-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {transaction.type === 'income' && (
          <>
            <CommonFields
              amountId="amount-income"
              amountPlaceholder="Nominal pemasukan"
              date={date}
              onDateChange={handleDateChange}
              amountValue={amount}
              onAmountChange={setAmount}
              description={description}
              onDescriptionChange={setDescription}
            />
            <div className="space-y-2">
              <Label>Dompet</Label>
              <WalletSelector
                value={selectedWallet}
                onChange={setSelectedWallet}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <CategorySelector
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </>
        )}

        {transaction.type === 'expense' && (
          <>
            <CommonFields
              amountId="amount-expense"
              amountPlaceholder="Nominal pengeluaran"
              date={date}
              onDateChange={handleDateChange}
              amountValue={amount}
              onAmountChange={setAmount}
              description={description}
              onDescriptionChange={setDescription}
            />
            <div className="space-y-2">
              <Label>Dompet</Label>
              <WalletSelector
                value={selectedWallet}
                onChange={setSelectedWallet}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <CategorySelector
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </>
        )}

        {transaction.type === 'transfer' && (
          <>
            <CommonFields
              amountId="amount-transfer"
              amountPlaceholder="Nominal transfer"
              date={date}
              onDateChange={handleDateChange}
              amountValue={amount}
              onAmountChange={setAmount}
              description={description}
              onDescriptionChange={setDescription}
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
          </>
        )}
      </form>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="flex-1 h-12 rounded-xl text-sm font-semibold"
        >
          <X className="w-4 h-4 mr-2" />
          Batal
        </Button>
        <Button
          type="submit"
          form="edit-transaction-form"
          className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-sm font-semibold"
        >
          <Save className="w-4 h-4 mr-2" />
          Simpan
        </Button>
      </div>
    </div>
  );
}

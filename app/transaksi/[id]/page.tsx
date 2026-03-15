'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  EyeOff,
  Eye,
  WalletIcon,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { transactions } from '@/models/transactions';
import { wallets } from '@/models/wallets';
import { formatAmount } from '@/lib/format';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SlideToConfirmModal } from '@/components/modals/slide-to-confirm-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string;

  const transaction = transactions.find((t) => t.id === transactionId);
  const [visible, setVisible] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleDelete = () => {
    router.push('/transaksi');
  };

  const getTransactionColor = () => {
    if (transaction.type === 'transfer') return 'text-blue-600';
    if (transaction.type === 'income') return 'text-emerald-600';
    return 'text-red-600';
  };

  const getTransactionTypeLabel = () => {
    if (transaction.type === 'transfer') {
      return transaction.direction === 'incoming'
        ? 'Transfer Masuk'
        : 'Transfer Keluar';
    }
    if (transaction.type === 'income') return 'Pemasukan';
    return 'Pengeluaran';
  };

  const getTransactionIcon = () => {
    return transaction.direction === 'incoming' ? (
      <ArrowLeft className="w-4 h-4" />
    ) : (
      <ArrowRight className="w-4 h-4" />
    );
  };

  const wallet = wallets.find((w) => w.id === transaction.walletId);
  const toWallet = transaction.toWalletId
    ? wallets.find((w) => w.id === transaction.toWalletId)
    : null;

  return (
    <div className="flex flex-col gap-4 p-5 min-h-screen bg-gray-50">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/transaksi')}
          className="h-9 w-9"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-gray-900">Detail Transaksi</h1>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl ${transaction.categoryColor} w-fit`}>
            <transaction.categoryIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {transaction.category}
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{transaction.transactionDate}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVisible(!visible)}
            className="text-gray-400 hover:text-gray-600"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-1">Jumlah</p>
          <p
            className={`text-2xl md:text-3xl font-bold ${getTransactionColor()}`}
          >
            {visible ? formatAmount(transaction.amount) : '••••••••'}
          </p>
        </div>

        {transaction.description && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              {transaction.description}
            </p>
          </div>
        )}

        {transaction.type === 'transfer' && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-500 mb-1">Detail Transfer</p>
            <div className="flex items-center gap-2 mt-2">
              <WalletIcon className="w-4 h-4 text-gray-500" />
              <div className="flex items-center text-sm w-full gap-2">
                {/* Kiri */}
                <p className="flex-1 text-gray-900 truncate">
                  {wallet?.name || 'Dompet Tidak Diketahui'}
                </p>

                {/* Arrow tengah */}
                {getTransactionIcon()}

                {/* Kanan */}
                {toWallet && (
                  <p className="flex-1 text-gray-900 truncate text-right">
                    {toWallet.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Informasi Transaksi
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tipe Transaksi</span>
            <span className={`font-medium ${getTransactionColor()}`}>
              {getTransactionTypeLabel()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Dompet</span>
            <span className="text-gray-900">{wallet?.name || '-'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Kategori</span>
            <span className="text-gray-900">{transaction.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tanggal Transaksi</span>
            <span className="text-gray-900">{transaction.transactionDate}</span>
          </div>
          {transaction.createdAt && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dibuat pada</span>
              <span className="text-gray-900">
                {transaction.createdAt.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}
        </div>
      </Card>

      <SlideToConfirmModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Hapus Transaksi"
        description={`Apakah Anda yakin ingin menghapus transaksi "${transaction.category}"?`}
        onConfirm={handleDelete}
        confirmText="Geser untuk menghapus"
        warningText="Tindakan ini tidak dapat dibatalkan"
        type="delete"
      />
    </div>
  );
}

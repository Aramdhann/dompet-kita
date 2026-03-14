'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MoreVertical,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Calendar,
  EyeOff,
  Eye,
} from 'lucide-react';
import { wallets } from '@/models/wallets';
import { formatAmount, formatCompactAmount } from '@/lib/format';
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

export default function WalletDetailPage() {
  const params = useParams();
  const router = useRouter();
  const walletId = params.id as string;

  const wallet = wallets.find((w) => w.id === walletId);
  const [visible, setVisible] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!wallet) {
    return (
      <div className="flex flex-col items-center justify-center p-5 min-h-screen">
        <p className="text-gray-500">Dompet tidak ditemukan</p>
        <Button
          onClick={() => router.push('/dompet')}
          variant="outline"
          className="mt-4"
        >
          Kembali
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    // In a real app, you would call an API to delete the wallet
    // For now, we'll just navigate back
    router.push('/dompet');
  };

  const isTransfer = wallet.lastTransactionType === 'transfer';
  const isIncome = wallet.lastTransactionType === 'income';
  const isIncoming = wallet.lastTransactionDirection === 'incoming';

  const getTransactionDisplay = () => {
    if (!wallet.lastTransactionAmount) return '-';

    if (isTransfer) {
      const label = isIncoming ? 'In' : 'Out';
      return `${label} ${formatCompactAmount(wallet.lastTransactionAmount, visible)}`;
    }
    const sign = isIncome ? '+' : '-';
    return `${sign}${formatCompactAmount(wallet.lastTransactionAmount, visible)}`;
  };

  const getTransactionColor = () => {
    if (isTransfer) return 'text-blue-600';
    if (isIncome) return 'text-emerald-600';
    return 'text-red-600';
  };

  const getTransactionIcon = () => {
    if (isTransfer) {
      return isIncoming ? (
        <ArrowLeftIcon className="w-4 h-4" />
      ) : (
        <ArrowRightIcon className="w-4 h-4" />
      );
    }
    return isIncome ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    );
  };

  return (
    <div className="flex flex-col gap-4 p-5 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/dompet')}
          className="h-9 w-9"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-gray-900">Detail Dompet</h1>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => router.push(`/dompet/${wallet.id}/edit`)}
              >
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

      {/* Wallet Card */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl ${wallet.color} w-fit`}>
            <wallet.icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {wallet.name}
            </h2>
            {wallet.lastTransaction && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>Transaksi terakhir: {wallet.lastTransaction}</span>
              </div>
            )}
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
          <p className="text-sm text-gray-500 mb-1">Saldo</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {visible ? formatAmount(wallet.amount) : '••••••••'}
          </p>
        </div>

        {wallet.lastTransactionAmount && wallet.lastTransactionType && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-500 mb-1">Transaksi Terakhir</p>
            <div className={`flex items-center gap-2 ${getTransactionColor()}`}>
              {getTransactionIcon()}
              <span className="text-lg font-semibold">
                {getTransactionDisplay()}
              </span>
            </div>
          </div>
        )}

        {wallet.isDefault && (
          <div className="border-t pt-4 mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Dompet Utama
            </span>
          </div>
        )}
      </Card>

      {/* Additional Info */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Informasi Dompet
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">ID Dompet</span>
            <span className="text-gray-900 font-mono text-xs">{wallet.id}</span>
          </div>
          {wallet.createdAt && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dibuat pada</span>
              <span className="text-gray-900">
                {wallet.createdAt.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Transactions Section */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Riwayat Transaksi
        </h3>
        <p className="text-sm text-gray-500 text-center py-8">
          Riwayat transaksi akan ditampilkan di sini
        </p>
      </Card>

      {/* Delete Confirmation Modal */}
      <SlideToConfirmModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Hapus Dompet"
        description={`Apakah Anda yakin ingin menghapus dompet "${wallet.name}"? Semua transaksi yang terkait dengan dompet ini juga akan dihapus.`}
        onConfirm={handleDelete}
        confirmText="Geser untuk menghapus"
        warningText="Tindakan ini tidak dapat dibatalkan"
        type="delete"
      />
    </div>
  );
}

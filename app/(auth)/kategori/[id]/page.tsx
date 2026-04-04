'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  EyeOff,
  Eye,
} from 'lucide-react';
import { categories } from '@/models/categories';
import { formatAmount, formatCompactAmount, formatPercentage } from '@/lib/format';
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
import { Progress } from '@/components/ui/progress';

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  const category = categories.find((c) => c.id === categoryId);
  const [visible, setVisible] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center p-5 min-h-screen">
        <p className="text-gray-500">Kategori tidak ditemukan</p>
        <Button
          onClick={() => router.push('/kategori')}
          variant="outline"
          className="mt-4"
        >
          Kembali
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    // In a real app, you would call an API to delete the category
    // For now, we'll just navigate back
    router.push('/kategori');
  };

  const remaining = category.budget - category.amount;
  const percentage = formatPercentage(category.amount, category.budget);
  const isOverBudget = category.amount > category.budget;
  const overBudgetAmount = Math.abs(remaining);

  return (
    <div className="flex flex-col gap-4 p-5 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/kategori')}
          className="h-9 w-9"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-gray-900">Detail Kategori</h1>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => router.push(`/kategori/${category.id}/edit`)}
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

      {/* Category Card */}
      <Card
        className={`p-6 ${isOverBudget ? 'bg-red-50 border-red-200' : ''}`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl ${category.color} w-fit`}>
            <category.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {category.name}
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>
                {category.createdAt
                  ? category.createdAt.toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '-'}
              </span>
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
          <p className="text-sm text-gray-500 mb-1">Sisa Budget</p>
          <p
            className={`text-2xl md:text-3xl font-bold ${
              isOverBudget ? 'text-red-700' : 'text-gray-900'
            }`}
          >
            {visible ? formatAmount(remaining) : '••••••••'}
          </p>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Penggunaan</p>
            <p
              className={`text-xs font-medium ${
                isOverBudget ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              {percentage}%
            </p>
          </div>
          <Progress
            value={Math.min(percentage, 100)}
            className="h-2"
            indicatorClassName={isOverBudget ? 'bg-red-500' : category.color}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>
              {visible
                ? formatCompactAmount(category.amount, visible)
                : '•••'}
            </span>
            <span>
              {visible
                ? formatCompactAmount(category.budget, visible)
                : '•••'}
            </span>
          </div>
        </div>

        {isOverBudget && (
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-red-600">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600">!</span>
              </div>
              <div>
                <p className="font-medium">Over Budget</p>
                <p className="text-xs text-red-500">
                  {formatCompactAmount(overBudgetAmount, visible)} melebihi budget
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Additional Info */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Informasi Kategori
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">ID Kategori</span>
            <span className="text-gray-900 font-mono text-xs">
              {category.id}
            </span>
          </div>
          {category.createdAt && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dibuat pada</span>
              <span className="text-gray-900">
                {category.createdAt.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}
          {category.isCustom && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tipe</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Kustom
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Transactions Section */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Transaksi dengan Kategori Ini
        </h3>
        <p className="text-sm text-gray-500 text-center py-8">
          Riwayat transaksi akan ditampilkan di sini
        </p>
      </Card>

      {/* Delete Confirmation Modal */}
      <SlideToConfirmModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Hapus Kategori"
        description={`Apakah Anda yakin ingin menghapus kategori "${category.name}"? Semua transaksi yang terkait dengan kategori ini juga akan dihapus.`}
        onConfirm={handleDelete}
        confirmText="Geser untuk menghapus"
        warningText="Tindakan ini tidak dapat dibatalkan"
        type="delete"
      />
    </div>
  );
}

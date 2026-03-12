'use client';

import { Plus } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { categories } from '@/models/categories';
import { ExpenseCategoryCard } from '@/components/cards/expense-category-card';
import Link from 'next/link';

interface ExpenseCategoriesProps {
  visible: boolean;
}

export function ExpenseCategories({ visible }: ExpenseCategoriesProps) {
  return (
    <div className="flex flex-col gap-5 m-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-700">
            Pengeluaran Bulanan
          </p>
          <p className="text-xs text-gray-500">Maret 2026</p>
        </div>
        <Link href="/kategori">
          <Button
            className={buttonVariants({
              variant: 'outline',
              className: 'text-sm text-blue-700',
            })}
          >
            Lihat Semua
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {categories.slice(0, 6).map((category) => (
          <ExpenseCategoryCard
            key={category.name}
            name={category.name}
            icon={category.icon}
            amount={category.amount}
            budget={category.budget}
            color={category.color}
            visible={visible}
          />
        ))}
        <Link href="/kategori/tambah" className="col-span-2">
          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors min-h-30">
            <Plus className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-600">Tambah Kategori</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

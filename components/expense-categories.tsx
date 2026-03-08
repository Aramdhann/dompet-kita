'use client';

import {
  ShoppingCart,
  Utensils,
  Gamepad2,
  Coffee,
  Plane,
  Receipt,
  HeartPulse,
  DollarSign,
  Fuel,
  HandHeart,
  Plus,
  LucideIcon,
  Car,
} from 'lucide-react';
import { ExpenseCategoryCard } from '@/components/expense-category-card';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';

interface ExpenseCategoriesProps {
  visible: boolean;
}

interface Category {
  name: string;
  icon: LucideIcon;
  amount: number;
  budget: number;
  color: string;
  isCustom?: boolean;
}

const categories: Category[] = [
  {
    name: 'Belanja Bulanan',
    icon: ShoppingCart,
    amount: 2500000,
    budget: 3000000,
    color: 'bg-blue-600',
  },
  {
    name: 'Bahan Masak',
    icon: Utensils,
    amount: 2100000,
    budget: 2000000,
    color: 'bg-orange-600',
  },
  {
    name: 'Hiburan',
    icon: Gamepad2,
    amount: 510000,
    budget: 800000,
    color: 'bg-purple-600',
  },
  {
    name: 'Tersier',
    icon: Coffee,
    amount: 300000,
    budget: 500000,
    color: 'bg-amber-600',
  },
  {
    name: 'Jalan-jalan',
    icon: Plane,
    amount: 2000000,
    budget: 2500000,
    color: 'bg-cyan-600',
  },
  {
    name: 'Tagihan',
    icon: Receipt,
    amount: 1800000,
    budget: 2000000,
    color: 'bg-red-600',
  },
  {
    name: 'Kesehatan',
    icon: HeartPulse,
    amount: 750000,
    budget: 1000000,
    color: 'bg-pink-600',
  },
  {
    name: 'Pinjaman',
    icon: DollarSign,
    amount: 1000000,
    budget: 1000000,
    color: 'bg-gray-600',
  },
  {
    name: 'Bensin',
    icon: Fuel,
    amount: 510000,
    budget: 600000,
    color: 'bg-green-600',
  },
  {
    name: 'Transportasi',
    icon: Car,
    amount: 0,
    budget: 500000,
    color: 'bg-indigo-600',
  },
  {
    name: 'Shodaqoh',
    icon: HandHeart,
    amount: 430000,
    budget: 500000,
    color: 'bg-teal-600',
  },
];

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
        <Link href="/kategori" className="col-span-2">
          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors min-h-30">
            <Plus className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-600">Tambah Kategori</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

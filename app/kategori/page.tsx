'use client';

import { useState } from 'react';
import { Eye, EyeOff, Plus, LucideIcon } from 'lucide-react';
import { ExpenseCategoryCard } from '@/components/cards/expense-category-card';
import { Button } from '@/components/ui/button';
import { categories } from '@/models/categories';

export default function KategoriPage() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Semua Kategori</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setVisible(!visible)}
            variant="outline"
            className="text-sm text-blue-700"
          >
            + Tambah
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
        {categories.map((category) => (
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
        <div className="p-4 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors min-h-35">
          <Plus className="w-5 h-5 text-blue-600" />
          <p className="text-sm font-medium text-blue-600 text-center">
            Tambah Kategori
          </p>
        </div>
      </div>
    </div>
  );
}

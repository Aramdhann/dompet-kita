'use client';

import { useState } from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';
import { ExpenseCategoryCard } from '@/components/cards/expense-category-card';
import { Button } from '@/components/ui/button';
import { categories } from '@/models/categories';
import { useRouter } from 'next/navigation';

export default function KategoriPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  const handleCategoryClick = (id: string) => {
    router.push(`/kategori/${id}`);
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Semua Kategori</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => router.push('/kategori/tambah')}
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
        {categories.map((category) => (
          <ExpenseCategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            icon={category.icon}
            amount={category.amount}
            budget={category.budget}
            color={category.color}
            visible={visible}
            onClick={() => handleCategoryClick(category.id!)}
          />
        ))}
      </div>
    </div>
  );
}

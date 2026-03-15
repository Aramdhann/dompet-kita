import { categories } from '@/models/categories';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from '../ui/sheet';

// ── Reusable: Category Selector ──────────────────────────────
export function CategorySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = categories.find((c) => c.id === value);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-12">
          <div className="flex items-center gap-2">
            {selected ? (
              <div className={`p-1.5 rounded-lg ${selected.color}`}>
                <selected.icon className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="w-4 h-4 rounded bg-gray-200" />
            )}
            <span className="text-sm text-gray-600">
              {selected?.name || 'Pilih kategori'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-w-3xl mx-auto rounded-t-2xl p-0"
      >
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-gray-100">
          <SheetTitle className="text-base">Pilih Kategori</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 p-4 max-h-[50vh] overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                onChange(category.id || '');
                setOpen(false);
              }}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                value === category.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${category.color}`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    Rp {category.amount.toLocaleString('id-ID')} / Rp{' '}
                    {category.budget.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
              {value === category.id && (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

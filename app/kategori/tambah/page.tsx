'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Tag } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  categoryIcons,
  categoryIconsMap,
  categoryColors,
} from '@/models/category-icons';

export default function TambahKategoriPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<
    (typeof categoryColors)[0] | null
  >(null);
  const [budget, setBudget] = useState('');
  const [iconSheetOpen, setIconSheetOpen] = useState(false);
  const [colorSheetOpen, setColorSheetOpen] = useState(false);

  const SelectedIconComponent = selectedIcon
    ? categoryIconsMap[selectedIcon]
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/kategori');
  };

  return (
    <div className="flex flex-col gap-4 p-5 pb-24">
      <div className="flex items-center gap-3">
        <Link href="/kategori">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Tambah Kategori</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Preview */}
        {(name || selectedIcon || selectedColor) && (
          <div
            className={`flex items-center gap-3 p-4 rounded-2xl border border-gray-100 ${
              selectedColor?.bg || 'bg-gray-50'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl ${
                selectedColor?.bg || 'bg-gray-100'
              } border border-white shadow-sm`}
            >
              {SelectedIconComponent ? (
                <SelectedIconComponent
                  className={`w-6 h-6 ${selectedColor?.text || 'text-gray-400'}`}
                />
              ) : (
                <Tag className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {name || 'Nama Kategori'}
              </p>
              <p className="text-xs text-gray-400">
                {budget
                  ? `Budget: Rp ${Number(budget).toLocaleString('id-ID')}`
                  : 'Budget bulanan'}
              </p>
            </div>
          </div>
        )}

        {/* Nama */}
        <div className="space-y-2">
          <Label htmlFor="name">Nama Kategori</Label>
          <Input
            id="name"
            type="text"
            placeholder="Example: Makan Siang"
            className="text-sm h-12"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Icon picker */}
        <div className="space-y-2">
          <Label>Icon</Label>
          <Sheet open={iconSheetOpen} onOpenChange={setIconSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-12">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      selectedColor?.bg || 'bg-gray-100'
                    }`}
                  >
                    {SelectedIconComponent ? (
                      <SelectedIconComponent
                        className={`w-4 h-4 ${selectedColor?.text || 'text-gray-500'}`}
                      />
                    ) : (
                      <Tag className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {selectedIcon
                      ? categoryIcons.find((i) => i.name === selectedIcon)
                          ?.label
                      : 'Pilih icon'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {categoryIcons.length} icon
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="max-w-3xl mx-auto rounded-t-2xl p-0"
            >
              <SheetHeader className="px-5 pt-5 pb-3 border-b border-gray-100">
                <SheetTitle className="text-base">Pilih Icon</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-5 gap-1 p-4 max-h-[50vh] overflow-y-auto">
                {categoryIcons.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedIcon === item.name;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        setSelectedIcon(item.name);
                        setIconSheetOpen(false);
                      }}
                      className={`relative flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all active:scale-95 ${
                        isSelected
                          ? `${selectedColor?.bg || 'bg-blue-50'} ring-2 ring-blue-500`
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check
                            className="w-2 h-2 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                      <div
                        className={`p-2 rounded-xl ${
                          selectedColor?.bg || 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isSelected
                              ? selectedColor?.text || 'text-blue-600'
                              : 'text-gray-500'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 text-center leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Color picker */}
        <div className="space-y-2">
          <Label>Warna</Label>
          <Sheet open={colorSheetOpen} onOpenChange={setColorSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-12">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-lg ${
                      selectedColor?.dot || 'bg-gray-200'
                    }`}
                  />
                  <span className="text-sm text-gray-600">
                    {selectedColor?.name || 'Pilih warna'}
                  </span>
                </div>
                <div className="flex gap-1">
                  {categoryColors.slice(0, 5).map((c) => (
                    <div
                      key={c.name}
                      className={`w-3 h-3 rounded-full ${c.dot}`}
                    />
                  ))}
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="max-w-3xl mx-auto rounded-t-2xl p-0"
            >
              <SheetHeader className="px-5 pt-5 pb-3 border-b border-gray-100">
                <SheetTitle className="text-base">Pilih Warna</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-5 gap-2 p-4">
                {categoryColors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color);
                        setColorSheetOpen(false);
                      }}
                      className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95 ${
                        isSelected
                          ? 'ring-2 ring-blue-500 bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check
                            className="w-2 h-2 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                      <div
                        className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center`}
                      >
                        <div className={`w-5 h-5 rounded-lg ${color.dot}`} />
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Bulanan</Label>
          <Input
            id="budget"
            type="number"
            placeholder="0"
            className="text-sm h-12"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-sm font-semibold"
        >
          Simpan Kategori
        </Button>
      </form>
    </div>
  );
}

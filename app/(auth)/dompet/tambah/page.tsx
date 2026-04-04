'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Wallet } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  walletIcons,
  walletIconsMap,
  walletColors,
} from '@/models/wallet-icons';

export default function TambahDompetPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<
    (typeof walletColors)[0] | null
  >(null);
  const [amount, setAmount] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [iconSheetOpen, setIconSheetOpen] = useState(false);
  const [colorSheetOpen, setColorSheetOpen] = useState(false);

  const SelectedIconComponent = selectedIcon
    ? walletIconsMap[selectedIcon]
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dompet');
  };

  return (
    <div className="flex flex-col gap-4 p-5 pb-24">
      <div className="flex items-center gap-3">
        <Link href="/dompet">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Tambah Dompet</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Preview card */}
        {(name || selectedIcon || selectedColor) && (
          <div
            className={`flex items-center gap-3 p-4 rounded-2xl border ${selectedColor?.bg || 'bg-gray-50'} border-gray-100`}
          >
            <div
              className={`p-2.5 rounded-xl ${selectedColor?.bg || 'bg-gray-100'} border border-white shadow-sm`}
            >
              {SelectedIconComponent ? (
                <SelectedIconComponent
                  className={`w-6 h-6 ${selectedColor?.class || 'text-gray-400'}`}
                />
              ) : (
                <Wallet className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {name || 'Nama Dompet'}
              </p>
              <p className="text-xs text-gray-400">
                {amount
                  ? `Rp ${Number(amount).toLocaleString('id-ID')}`
                  : 'Saldo awal'}
              </p>
            </div>
          </div>
        )}

        {/* Nama */}
        <div className="space-y-2">
          <Label htmlFor="name">Nama Dompet</Label>
          <Input
            id="name"
            type="text"
            placeholder="Dompet Gajian"
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
                    className={`p-1.5 rounded-lg ${selectedColor?.bg || 'bg-gray-100'}`}
                  >
                    {SelectedIconComponent ? (
                      <SelectedIconComponent
                        className={`w-4 h-4 ${selectedColor?.class || 'text-gray-500'}`}
                      />
                    ) : (
                      <Wallet className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {selectedIcon
                      ? walletIcons.find((i) => i.name === selectedIcon)?.label
                      : 'Pilih icon'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {walletIcons.length} icon
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
                {walletIcons.map((item) => {
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
                        className={`p-2 rounded-xl ${selectedColor?.bg || 'bg-gray-100'}`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isSelected ? selectedColor?.class || 'text-blue-600' : 'text-gray-500'}`}
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
                    className={`w-6 h-6 rounded-lg ${selectedColor?.dot || 'bg-gray-200'}`}
                  />
                  <span className="text-sm text-gray-600">
                    {selectedColor?.name || 'Pilih warna'}
                  </span>
                </div>
                <div className="flex gap-1">
                  {walletColors.slice(0, 5).map((c) => (
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
                {walletColors.map((color) => {
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

        {/* Saldo awal */}
        <div className="space-y-2">
          <Label htmlFor="amount">Saldo Awal</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0"
            className="text-sm h-12"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Default */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <Checkbox
            id="default"
            checked={isDefault}
            onCheckedChange={(checked) => setIsDefault(checked as boolean)}
          />
          <div>
            <Label
              htmlFor="default"
              className="text-sm font-medium cursor-pointer"
            >
              Jadikan dompet utama
            </Label>
            <p className="text-xs text-gray-400">
              Transaksi baru akan default ke dompet ini
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-sm font-semibold"
        >
          Simpan Dompet
        </Button>
      </form>
    </div>
  );
}

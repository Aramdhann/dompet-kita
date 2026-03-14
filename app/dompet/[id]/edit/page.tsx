'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, Save } from 'lucide-react';
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
  Wallet,
  CreditCard,
  PiggyBank,
  Banknote,
  Building2,
  Coins,
  DollarSign,
  ShoppingBag,
  Car,
  Home,
  Plane,
  GraduationCap,
  Heart,
  Gift,
  Coffee,
  Smartphone,
  Briefcase,
  TrendingUp,
  LucideIcon,
} from 'lucide-react';
import { wallets } from '@/models/wallets';

const walletIcons: { name: string; icon: LucideIcon; label: string }[] = [
  { name: 'Wallet', icon: Wallet, label: 'Dompet' },
  { name: 'CreditCard', icon: CreditCard, label: 'Kartu' },
  { name: 'PiggyBank', icon: PiggyBank, label: 'Tabungan' },
  { name: 'Banknote', icon: Banknote, label: 'Uang' },
  { name: 'Building2', icon: Building2, label: 'Bank' },
  { name: 'Coins', icon: Coins, label: 'Koin' },
  { name: 'DollarSign', icon: DollarSign, label: 'Dollar' },
  { name: 'TrendingUp', icon: TrendingUp, label: 'Investasi' },
  { name: 'ShoppingBag', icon: ShoppingBag, label: 'Belanja' },
  { name: 'Car', icon: Car, label: 'Kendaraan' },
  { name: 'Home', icon: Home, label: 'Rumah' },
  { name: 'Plane', icon: Plane, label: 'Liburan' },
  { name: 'GraduationCap', icon: GraduationCap, label: 'Pendidikan' },
  { name: 'Heart', icon: Heart, label: 'Kesehatan' },
  { name: 'Gift', icon: Gift, label: 'Hadiah' },
  { name: 'Coffee', icon: Coffee, label: 'Kafe' },
  { name: 'Smartphone', icon: Smartphone, label: 'Digital' },
  { name: 'Briefcase', icon: Briefcase, label: 'Kerja' },
];

const walletIconsMap = Object.fromEntries(
  walletIcons.map((i) => [i.name, i.icon])
) as Record<string, LucideIcon>;

const walletColors: { name: string; class: string; bg: string; dot: string }[] =
  [
    {
      name: 'Biru',
      class: 'text-blue-600',
      bg: 'bg-blue-50',
      dot: 'bg-blue-500',
    },
    {
      name: 'Hijau',
      class: 'text-green-600',
      bg: 'bg-green-50',
      dot: 'bg-green-500',
    },
    {
      name: 'Kuning',
      class: 'text-yellow-600',
      bg: 'bg-yellow-50',
      dot: 'bg-yellow-400',
    },
    {
      name: 'Ungu',
      class: 'text-purple-600',
      bg: 'bg-purple-50',
      dot: 'bg-purple-500',
    },
    {
      name: 'Oranye',
      class: 'text-orange-600',
      bg: 'bg-orange-50',
      dot: 'bg-orange-500',
    },
    {
      name: 'Merah',
      class: 'text-red-600',
      bg: 'bg-red-50',
      dot: 'bg-red-500',
    },
    {
      name: 'Cyan',
      class: 'text-cyan-600',
      bg: 'bg-cyan-50',
      dot: 'bg-cyan-500',
    },
    {
      name: 'Pink',
      class: 'text-pink-600',
      bg: 'bg-pink-50',
      dot: 'bg-pink-500',
    },
    {
      name: 'Abu',
      class: 'text-gray-600',
      bg: 'bg-gray-50',
      dot: 'bg-gray-400',
    },
  ];

export default function EditDompetPage() {
  const params = useParams();
  const router = useRouter();
  const walletId = params.id as string;

  const wallet = wallets.find((w) => w.id === walletId);

  // Find matching icon and color for initial state
  const matchedIcon = walletIcons.find((icon) => icon.icon === wallet?.icon);
  const colorClass = wallet?.color || '';
  const matchedColor = walletColors.find((c) => c.class === colorClass);

  const [name, setName] = useState(wallet?.name || '');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(
    matchedIcon?.name || null
  );
  const [selectedColor, setSelectedColor] = useState<
    (typeof walletColors)[0] | null
  >(matchedColor || null);
  const [amount, setAmount] = useState(wallet?.amount.toString() || '');
  const [isDefault, setIsDefault] = useState(wallet?.isDefault || false);
  const [iconSheetOpen, setIconSheetOpen] = useState(false);
  const [colorSheetOpen, setColorSheetOpen] = useState(false);

  const SelectedIconComponent = selectedIcon
    ? walletIconsMap[selectedIcon]
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API to update the wallet
    console.log('Updating wallet:', {
      id: wallet?.id,
      name,
      icon: selectedIcon,
      color: selectedColor,
      amount: parseFloat(amount),
      isDefault,
    });
    router.push(`/dompet/${walletId}`);
  };

  const handleCancel = () => {
    router.push(`/dompet/${walletId}`);
  };

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

  return (
    <div className="flex flex-col gap-4 p-5 pb-24">
      <div className="flex items-center gap-3">
        <button onClick={handleCancel}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Edit Dompet</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Preview card */}
        {(name || selectedIcon || selectedColor) && (
          <div
            className={`flex items-center gap-3 p-4 rounded-2xl border ${
              selectedColor?.bg || 'bg-gray-50'
            } border-gray-100`}
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
                          className={`w-5 h-5 ${
                            isSelected
                              ? selectedColor?.class || 'text-blue-600'
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

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex-1 h-12 rounded-xl text-sm font-semibold"
          >
            <X className="w-4 h-4 mr-2" />
            Batal
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-sm font-semibold"
          >
            <Save className="w-4 h-4 mr-2" />
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}

import { wallets } from '@/models/wallets';
import { ChevronRight, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from '@/components/ui/sheet';

// ── Reusable: Wallet Selector ────────────────────────────────
export function WalletSelector({
  value,
  onChange,
  exclude,
  placeholder = 'Pilih dompet',
}: {
  value: string;
  onChange: (id: string) => void;
  exclude?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = wallets.find((w) => w.id === value);
  const filtered = exclude ? wallets.filter((w) => w.id !== exclude) : wallets;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-12">
          <div className="flex items-center gap-2">
            {selected ? (
              <div className={`p-1.5 rounded-lg ${selected.color}`}>
                <selected.icon className="w-4 h-4 text-gray-700" />
              </div>
            ) : (
              <Wallet className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm text-gray-600">
              {selected
                ? `${selected.name} — Rp ${selected.amount.toLocaleString('id-ID')}`
                : placeholder}
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
          <SheetTitle className="text-base">Pilih Dompet</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 p-4 max-h-[50vh] overflow-y-auto">
          {filtered.map((wallet) => (
            <button
              key={wallet.id}
              type="button"
              onClick={() => {
                onChange(wallet.id || '');
                setOpen(false);
              }}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                value === wallet.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${wallet.color}`}>
                  <wallet.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {wallet.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    Rp {wallet.amount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
              {value === wallet.id && (
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

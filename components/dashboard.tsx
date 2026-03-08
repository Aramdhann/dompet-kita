'use client';

import { TrendingUp, TrendingDown, EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatAmountWithPrefix } from '@/lib/format';

interface DashboardProps {
  visible: boolean;
  onToggle: () => void;
}

export function Dashboard({ visible, onToggle }: DashboardProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-5 mx-3 sm:mx-5 my-3 sm:my-5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white bg-blue-600 shadow-md hover:shadow-lg border-2 border-blue-800">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-[10px] sm:text-xs font-medium opacity-75 tracking-wide uppercase">
            Total Semua Dompet
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 opacity-75 hover:opacity-100 hover:bg-white/10 text-white"
            onClick={onToggle}
          >
            {visible ? <EyeOff size={12} /> : <Eye size={12} />}
          </Button>
        </div>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight">
          Rp {visible ? formatAmountWithPrefix(8000000) : '•••••••'}
        </p>
      </div>

      <div className="h-px bg-blue-800" />

      <div className="flex justify-between">
        <div className="flex flex-col gap-1 w-[45%]">
          <div className="flex items-center gap-1 opacity-75">
            <TrendingUp size={11} className="shrink-0" />
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">
              Pemasukan
            </p>
          </div>
          <p className="text-sm sm:text-base font-semibold text-emerald-200">
            {visible ? `+ Rp ${formatAmountWithPrefix(10000000)}` : '•••••••'}
          </p>
        </div>
        <div className="w-px bg-blue-800 self-stretch" />
        <div className="flex flex-col gap-1 w-[45%] items-end">
          <div className="flex items-center gap-1 opacity-75">
            <TrendingDown size={11} className="shrink-0" />
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">
              Pengeluaran
            </p>
          </div>
          <p className="text-sm sm:text-base font-semibold text-rose-200">
            {visible ? `- Rp ${formatAmountWithPrefix(10000000)}` : '•••••••'}
          </p>
        </div>
      </div>

      <p className="text-[10px] sm:text-xs opacity-50 text-center">
        Bulan ini · Maret 2026
      </p>
    </div>
  );
}

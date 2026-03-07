import { LucideIcon, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface WalletCardProps {
  name: string;
  icon: LucideIcon;
  amount: number;
  color: string;
  visible: boolean;
  lastTransaction?: string;
  lastTransactionAmount?: number;
  lastTransactionType?: 'income' | 'expense';
}

export function WalletCard({
  name,
  icon: Icon,
  amount,
  color,
  visible,
  lastTransaction,
  lastTransactionAmount = 0,
  lastTransactionType,
}: WalletCardProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTransactionAmount = (value: number) => {
    if (!visible) return '••••••••';
    if (value >= 1000000) {
      const juta = value / 1000000;
      const formatted = juta % 1 === 0 ? juta.toFixed(0) : juta.toFixed(1);
      return `${formatted}jt`;
    }
    if (value >= 1000) {
      const ribu = value / 1000;
      const formatted = ribu % 1 === 0 ? ribu.toFixed(0) : ribu.toFixed(1);
      return `${formatted}K`;
    }
    return `${value}`;
  };

  const isIncome = lastTransactionType === 'income';
  const sign = isIncome ? '+' : '-';

  return (
    <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow relative gap-2">
      <div className="flex justify-between items-start w-full mb-2">
        <div className={`p-2.5 rounded-xl ${color} w-fit`}>
          <Icon className="w-5 h-5" />
        </div>
        {lastTransaction && (
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Calendar className="w-3 h-3" />
            <span className="text-[10px]">{lastTransaction}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm font-medium text-gray-900">{name}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-500">
          {visible ? formatAmount(amount) : '••••••••'}
        </p>
        {lastTransactionAmount !== 0 && lastTransactionType && (
          <div className={`flex items-center gap-1 text-xs ${isIncome ? 'text-emerald-600' : 'text-red-600'}`}>
            {isIncome ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs font-medium">
              {sign}{formatTransactionAmount(lastTransactionAmount)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

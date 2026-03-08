import {
  LucideIcon,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { formatAmount } from '@/lib/format';

interface TransactionCardProps {
  category: string;
  categoryIcon: LucideIcon;
  categoryColor: string;
  amount: number;
  transactionDate: string;
  type: 'income' | 'expense' | 'transfer';
  direction?: 'incoming' | 'outgoing';
  visible: boolean;
  description?: string;
}

export function TransactionCard({
  category,
  categoryIcon: CategoryIcon,
  categoryColor,
  amount,
  transactionDate,
  type,
  direction,
  visible,
  description,
}: TransactionCardProps) {
  const getTransactionDisplay = () => {
    if (type === 'transfer') {
      const label = direction === 'incoming' ? 'In' : 'Out';
      return `${label} ${visible ? formatAmount(amount) : '••••••••'}`;
    }
    const sign = type === 'income' ? '+' : '-';
    return `${sign}${visible ? formatAmount(amount) : '••••••••'}`;
  };

  const getTransactionColor = () => {
    if (type === 'transfer') return 'text-blue-600';
    if (type === 'income') return 'text-emerald-600';
    return 'text-red-600';
  };

  const getTransactionIcon = () => {
    if (type === 'transfer') {
      return direction === 'incoming' ? (
        <ArrowLeft className="w-4 h-4" />
      ) : (
        <ArrowRight className="w-4 h-4" />
      );
    }
    return type === 'income' ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    );
  };

  return (
    <div className="flex items-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow gap-3">
      {/* Kiri — icon + info, flex-1 supaya mengisi sisa ruang, min-w-0 supaya truncate bisa jalan */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`p-2.5 rounded-xl ${categoryColor} w-fit shrink-0`}>
          <CategoryIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {category}
          </p>
          <p className="text-[10px] text-gray-400">{transactionDate}</p>
          {description && (
            <p className="text-xs text-gray-500 italic truncate">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Kanan — nominal, shrink-0 supaya tidak pernah diperkecil */}
      <div className="flex flex-col items-end shrink-0">
        <div
          className={`flex items-center gap-1 text-sm font-medium ${getTransactionColor()}`}
        >
          {getTransactionIcon()}
          <span className="whitespace-nowrap">{getTransactionDisplay()}</span>
        </div>
      </div>
    </div>
  );
}

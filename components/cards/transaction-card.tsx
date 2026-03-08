import { LucideIcon, TrendingUp, TrendingDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { formatAmount } from '@/lib/format';

interface TransactionCardProps {
  category: string;
  categoryIcon: LucideIcon;
  categoryColor: string;
  amount: number;
  date: string;
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
  date,
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
      return direction === 'incoming' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />;
    }
    return type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${categoryColor} w-fit`}>
          <CategoryIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
           <p className="text-sm font-medium text-gray-900">{category}</p>
            <p className="text-[10px] text-gray-400">{date}</p>
             {description && (
              <p className="text-xs text-gray-500 italic truncate max-w-50 sm:max-w-75 md:max-w-112.5">{description}</p>
            )}
          </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className={`flex items-center gap-1 text-sm font-medium ${getTransactionColor()}`}>
          {getTransactionIcon()}
          <span>{getTransactionDisplay()}</span>
        </div>
      </div>
    </div>
  );
}

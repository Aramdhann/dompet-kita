import { LucideIcon, AlertTriangle } from 'lucide-react';
import { formatAmount, formatCompactAmount, formatPercentage } from '@/lib/format';

interface ExpenseCategoryCardProps {
  name: string;
  icon: LucideIcon;
  amount: number;
  budget: number;
  color: string;
  visible: boolean;
}

export function ExpenseCategoryCard({
  name,
  icon: Icon,
  amount,
  budget,
  color,
  visible,
}: ExpenseCategoryCardProps) {
  const remaining = budget - amount;
  const percentage = formatPercentage(amount, budget);
  const isOverBudget = amount > budget;
  const overBudgetAmount = Math.abs(remaining);

  return (
    <div
      className={`p-4 rounded-2xl shadow-sm border flex flex-col hover:shadow-md transition-shadow gap-3 ${isOverBudget ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className={`p-2.5 rounded-xl ${color} w-fit`}>
          <Icon className={`w-5 h-5 text-white`} />
        </div>
        <div className="flex items-center gap-1">
          {isOverBudget && <AlertTriangle className="w-3 h-3 text-red-500" />}
          <div
            className={`text-xs font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-500'}`}
          >
            {percentage}%
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p
          className={`text-base font-semibold ${isOverBudget ? 'text-red-700' : 'text-gray-700'}`}
        >
          {visible ? formatAmount(amount) : '••••••••'}
        </p>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${isOverBudget ? 'bg-red-500' : color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isOverBudget && (
        <div className="text-[10px] text-red-600 font-medium">
          Over budget {formatCompactAmount(overBudgetAmount, visible)}
        </div>
      )}
    </div>
  );
}

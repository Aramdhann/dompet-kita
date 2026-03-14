'use client';

import { LucideIcon, AlertTriangle } from 'lucide-react';
import {
  formatAmount,
  formatCompactAmount,
  formatPercentage,
} from '@/lib/format';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface ExpenseCategoryCardProps {
  id?: string;
  name: string;
  icon: LucideIcon;
  amount: number;
  budget: number;
  color: string;
  visible: boolean;
  onClick?: () => void;
}

export function ExpenseCategoryCard({
  id = '',
  name,
  icon: Icon,
  amount,
  budget,
  color,
  visible,
  onClick,
}: ExpenseCategoryCardProps) {
  const remaining = budget - amount;
  const percentage = formatPercentage(amount, budget);
  const isOverBudget = amount > budget;
  const overBudgetAmount = Math.abs(remaining);

  return (
    <Card
      className={`p-4 hover:shadow-md transition-shadow gap-3 cursor-pointer ${isOverBudget ? 'bg-red-50 border-red-200' : ''}`}
      onClick={onClick}
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
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p
          className={`text-base font-semibold ${isOverBudget ? 'text-red-700' : 'text-gray-700'}`}
        >
          {visible ? formatAmount(remaining) : '••••••••'}
        </p>
      </div>
      <Progress
        value={Math.min(percentage, 100)}
        className="h-1.5"
        indicatorClassName={isOverBudget ? 'bg-red-500' : color}
      />
      {isOverBudget && (
        <div className="text-[10px] text-red-600 font-medium">
          Over budget {formatCompactAmount(overBudgetAmount, visible)}
        </div>
      )}
    </Card>
  );
}

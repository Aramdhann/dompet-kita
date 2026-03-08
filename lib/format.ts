export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatCompactAmount = (value: number, visible = true): string => {
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

export const formatPercentage = (value: number, total: number): number => {
  return total > 0 ? Math.round((value / total) * 100) : 0;
};

export const formatAmountWithPrefix = (amount: number, visible = true): string => {
  if (!visible) return '••••••••';
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(amount);
};

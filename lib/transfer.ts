import { DollarSign, Wallet as WalletIcon, LucideIcon } from 'lucide-react';

export interface TransferCategory {
  category: string;
  categoryIcon: LucideIcon;
  categoryColor: string;
}

export function generateTransferCategory(
  direction: 'incoming' | 'outgoing',
  walletName: string
): TransferCategory {
  if (direction === 'incoming') {
    return {
      category: `Transfer dari ${walletName}`,
      categoryIcon: WalletIcon,
      categoryColor: 'bg-gray-600',
    };
  }

  return {
    category: `Transfer ke ${walletName}`,
    categoryIcon: DollarSign,
    categoryColor: 'bg-gray-600',
  };
}

import {
  Wallet as WalletIcon,
  CreditCard,
  PiggyBank,
  LucideIcon,
} from 'lucide-react';

/**
 * Wallet Model
 * 
 * Represents user's wallets (bank accounts, e-wallets, cash, etc.)
 * 
 * Database Tables:
 * - wallets (id, user_id, name, icon, color, amount, is_default, created_at, updated_at)
 * - wallet_transactions (id, wallet_id, amount, type, source_wallet_id, destination_wallet_id, description, created_at)
 * 
 * Fields:
 * - id: Primary key (auto-increment/UUID)
 * - user_id: Foreign key to users table
 * - name: Wallet name (e.g., "BCA", "GoPay")
 * - icon: Lucide icon name for UI
 * - color: Tailwind color class (e.g., "text-blue-600 bg-blue-50")
 * - amount: Current balance in IDR
 * - is_default: Whether this is a default wallet
 * - created_at: Timestamp when record was created
 * - updated_at: Timestamp when record was last updated
 */
export interface Wallet {
  name: string;
  icon: LucideIcon;
  amount: number;
  color: string;
  lastTransaction?: string;
  lastTransactionAmount?: number;
  lastTransactionType?: 'income' | 'expense' | 'transfer';
  lastTransactionDirection?: 'incoming' | 'outgoing';
}

/**
 * Sample wallet data
 * These wallets are available for demonstration
 */
export const wallets: Wallet[] = [
  {
    name: 'BCA',
    icon: CreditCard,
    amount: 5000000,
    color: 'text-blue-600 bg-blue-50',
    lastTransaction: '7 Mar',
    lastTransactionAmount: 12500000,
    lastTransactionType: 'income',
  },
  {
    name: 'Mandiri',
    icon: PiggyBank,
    amount: 1650000,
    color: 'text-yellow-600 bg-yellow-50',
    lastTransaction: '1 Mar',
    lastTransactionAmount: 350000,
    lastTransactionType: 'expense',
  },
  {
    name: 'GoPay',
    icon: WalletIcon,
    amount: 1000000,
    color: 'text-green-600 bg-green-50',
    lastTransaction: '3 Mar',
    lastTransactionAmount: 300000,
    lastTransactionType: 'income',
  },
  {
    name: 'OVO',
    icon: WalletIcon,
    amount: 500000,
    color: 'text-purple-600 bg-purple-50',
    lastTransaction: '1 Mar',
    lastTransactionAmount: 100000,
    lastTransactionType: 'transfer',
    lastTransactionDirection: 'incoming',
  },
  {
    name: 'DANA',
    icon: WalletIcon,
    amount: 300000,
    color: 'text-blue-500 bg-blue-50',
    lastTransaction: '28 Feb',
    lastTransactionAmount: 100000,
    lastTransactionType: 'income',
  },
  {
    name: 'ShopeePay',
    icon: WalletIcon,
    amount: 250000,
    color: 'text-orange-600 bg-orange-50',
    lastTransaction: '24 Feb',
    lastTransactionAmount: 100000,
    lastTransactionType: 'transfer',
    lastTransactionDirection: 'incoming',
  },
];

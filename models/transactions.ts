import {
  ShoppingCart,
  Utensils,
  Gamepad2,
  Coffee,
  Plane,
  Receipt,
  HeartPulse,
  DollarSign,
  Fuel,
  WalletIcon,
  LucideIcon,
} from 'lucide-react';

/**
 * Transaction Model
 *
 * Represents financial transactions (income, expense, transfers)
 *
 * Database Tables:
 * - transactions (id, user_id, wallet_id, category_id, amount, type, description, transaction_date, created_at, updated_at)
 * - transfer_transactions (id, from_wallet_id, to_wallet_id, amount, description, transaction_date, created_at)
 *
 * Fields:
 * - id: Primary key (auto-increment/UUID)
 * - user_id: Foreign key to users table
 * - wallet_id: Foreign key to wallets table (source wallet)
 * - category_id: Foreign key to categories table (for income/expense)
 * - amount: Transaction amount in IDR (always positive)
 * - type: Transaction type ('income' | 'expense' | 'transfer')
 * - description: Transaction description (optional)
 * - transaction_date: Date of transaction (for filtering/reporting)
 * - created_at: Timestamp when record was created
 * - updated_at: Timestamp when record was last updated
 *
 * Transfer Transaction Fields:
 * - to_wallet_id: Destination wallet for transfers
 * - to_user_id: Destination user for transfers (optional, for shared wallets)
 */
export interface Transaction {
  id?: string;
  category: string;
  categoryIcon: LucideIcon;
  categoryColor: string;
  amount: number;
  date: string;
  type: 'income' | 'expense' | 'transfer';
  direction?: 'incoming' | 'outgoing';
  walletId?: string;
  toWalletId?: string;
  expenseName?: string;
  description?: string;
  transactionDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Sample transaction data
 * These transactions demonstrate all transaction types
 * Sorted by date descending (newest first)
 */
export const transactions: Transaction[] = [
  {
    id: '1',
    category: 'Belanja Bulanan',
    categoryIcon: ShoppingCart,
    categoryColor: 'bg-blue-600',
    amount: 2500000,
    date: '7 Mar 2026',
    type: 'expense',
    walletId: 'wallet-1',
    description:
      'Ini adalah contoh deskripsi yang sangat panjang untuk mendemonstrasikan fitur truncation pada card transaction',
  },
  {
    id: '2',
    category: 'Transfer dari BCA',
    categoryIcon: DollarSign,
    categoryColor: 'bg-gray-600',
    amount: 500000,
    date: '6 Mar 2026',
    type: 'transfer',
    direction: 'incoming',
    walletId: 'wallet-1',
    toWalletId: 'wallet-2',
    description: 'Transfer dari rekening BCA',
    transactionDate: new Date('2026-03-06'),
  },
  {
    id: '3',
    category: 'Bahan Masak',
    categoryIcon: Utensils,
    categoryColor: 'bg-orange-600',
    amount: 150000,
    date: '5 Mar 2026',
    type: 'expense',
    walletId: 'wallet-2',
    description: 'Bahan masak mingguan',
  },
  {
    id: '4',
    category: 'Gaji Bulanan',
    categoryIcon: DollarSign,
    categoryColor: 'bg-green-600',
    amount: 8000000,
    date: '4 Mar 2026',
    type: 'income',
    walletId: 'wallet-1',
    description: 'Gaji bulanan Maret',
  },
  {
    id: '5',
    category: 'Transfer ke OVO',
    categoryIcon: DollarSign,
    categoryColor: 'bg-gray-600',
    amount: 200000,
    date: '3 Mar 2026',
    type: 'transfer',
    direction: 'outgoing',
    walletId: 'wallet-1',
    toWalletId: 'wallet-4',
    description: 'Transfer ke OVO',
    transactionDate: new Date('2026-03-03'),
  },
  {
    id: '6',
    category: 'Hiburan',
    categoryIcon: Gamepad2,
    categoryColor: 'bg-purple-600',
    amount: 50000,
    date: '2 Mar 2026',
    type: 'expense',
    walletId: 'wallet-3',
    description: 'Nonton film di bioskop',
  },
  {
    id: '7',
    category: 'Jalan-jalan',
    categoryIcon: Plane,
    categoryColor: 'bg-cyan-600',
    amount: 2000000,
    date: '1 Mar 2026',
    type: 'expense',
    walletId: 'wallet-1',
    description: 'Liburan ke Bali',
  },
  {
    id: '8',
    category: 'Tagihan',
    categoryIcon: Receipt,
    categoryColor: 'bg-red-600',
    amount: 1800000,
    date: '28 Feb 2026',
    type: 'expense',
    walletId: 'wallet-2',
    description: 'Pembayaran tagihan internet',
  },
  {
    id: '9',
    category: 'Kesehatan',
    categoryIcon: HeartPulse,
    categoryColor: 'bg-pink-600',
    amount: 750000,
    date: '27 Feb 2026',
    type: 'expense',
    walletId: 'wallet-1',
    description: 'Cek kesehatan rutin',
  },
  {
    id: '10',
    category: 'Pinjaman',
    categoryIcon: DollarSign,
    categoryColor: 'bg-gray-600',
    amount: 1000000,
    date: '26 Feb 2026',
    type: 'income',
    walletId: 'wallet-2',
    description: 'Penerimaan pinjaman',
  },
  {
    id: '11',
    category: 'Bensin',
    categoryIcon: Fuel,
    categoryColor: 'bg-green-600',
    amount: 400000,
    date: '25 Feb 2026',
    type: 'expense',
    walletId: 'wallet-3',
    description: 'Isi bensin mobil',
  },
  {
    id: '12',
    category: 'Transfer dari ShopeePay',
    categoryIcon: WalletIcon,
    categoryColor: 'bg-orange-600',
    amount: 100000,
    date: '24 Feb 2026',
    type: 'transfer',
    direction: 'incoming',
    walletId: 'wallet-4',
    toWalletId: 'wallet-3',
    description: 'Refund ShopeePay ke DANA',
    transactionDate: new Date('2026-02-24'),
  },
  {
    id: '13',
    category: 'Jalan-jalan',
    categoryIcon: Plane,
    categoryColor: 'bg-cyan-600',
    amount: 350000,
    date: '1 Mar 2026',
    type: 'expense',
    walletId: 'wallet-2',
    description: 'Bukber keluarga di people',
  },
  {
    id: '14',
    category: 'Belanja Bulanan',
    categoryIcon: ShoppingCart,
    categoryColor: 'bg-blue-600',
    amount: 500000,
    date: '1 Mar 2026',
    type: 'expense',
    walletId: 'wallet-1',
    description:
      'Ini adalah contoh deskripsi yang sangat panjang untuk mendemonstrasikan fitur truncation pada card transaction',
  },
];

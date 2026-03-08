import {
  ShoppingCart,
  Utensils,
  Gamepad2,
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
  userId?: string;
  walletId: string;
  toWalletId?: string;
  categoryId?: string;
  category: string;
  categoryIcon: LucideIcon;
  categoryColor: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  direction?: 'incoming' | 'outgoing';
  description?: string;
  transactionDate: string;
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
    userId: 'user-1',
    walletId: 'wallet-1',
    categoryId: 'cat-1',
    category: 'Belanja Bulanan',
    categoryIcon: ShoppingCart,
    categoryColor: 'bg-blue-600',
    amount: 2500000,
    type: 'expense',
    description:
      'Ini adalah contoh deskripsi yang sangat panjang untuk mendemonstrasikan fitur truncation pada card transaction',
    transactionDate: '7 Mar 2026',
    createdAt: new Date('2026-03-07'),
  },
  {
    id: '2',
    userId: 'user-1',
    walletId: 'wallet-1',
    toWalletId: 'wallet-2',
    category: 'Transfer dari BCA',
    categoryIcon: DollarSign,
    categoryColor: 'bg-gray-600',
    amount: 500000,
    type: 'transfer',
    direction: 'incoming',
    description: 'Transfer dari rekening BCA',
    transactionDate: '6 Mar 2026',
    createdAt: new Date('2026-03-06'),
  },
  {
    id: '3',
    userId: 'user-1',
    walletId: 'wallet-2',
    categoryId: 'cat-2',
    category: 'Bahan Masak',
    categoryIcon: Utensils,
    categoryColor: 'bg-orange-600',
    amount: 150000,
    type: 'expense',
    description: 'Bahan masak mingguan',
    transactionDate: '5 Mar 2026',
    createdAt: new Date('2026-03-05'),
  },
  {
    id: '4',
    userId: 'user-1',
    walletId: 'wallet-1',
    category: 'Gaji Bulanan',
    categoryIcon: DollarSign,
    categoryColor: 'bg-green-600',
    amount: 8000000,
    type: 'income',
    description: 'Gaji bulanan Maret',
    transactionDate: '4 Mar 2026',
    createdAt: new Date('2026-03-04'),
  },
  {
    id: '5',
    userId: 'user-1',
    walletId: 'wallet-1',
    toWalletId: 'wallet-4',
    category: 'Transfer ke OVO',
    categoryIcon: DollarSign,
    categoryColor: 'bg-gray-600',
    amount: 200000,
    type: 'transfer',
    direction: 'outgoing',
    description: 'Transfer ke OVO',
    transactionDate: '3 Mar 2026',
    createdAt: new Date('2026-03-03'),
  },
  {
    id: '6',
    userId: 'user-1',
    walletId: 'wallet-3',
    categoryId: 'cat-3',
    category: 'Hiburan',
    categoryIcon: Gamepad2,
    categoryColor: 'bg-purple-600',
    amount: 50000,
    type: 'expense',
    description: 'Nonton film di bioskop',
    transactionDate: '2 Mar 2026',
    createdAt: new Date('2026-03-02'),
  },
  {
    id: '7',
    userId: 'user-1',
    walletId: 'wallet-1',
    categoryId: 'cat-5',
    category: 'Jalan-jalan',
    categoryIcon: Plane,
    categoryColor: 'bg-cyan-600',
    amount: 2000000,
    type: 'expense',
    description: 'Liburan ke Bali',
    transactionDate: '1 Mar 2026',
    createdAt: new Date('2026-03-01'),
  },
  {
    id: '8',
    userId: 'user-1',
    walletId: 'wallet-2',
    categoryId: 'cat-6',
    category: 'Tagihan',
    categoryIcon: Receipt,
    categoryColor: 'bg-red-600',
    amount: 1800000,
    type: 'expense',
    description: 'Pembayaran tagihan internet',
    transactionDate: '28 Feb 2026',
    createdAt: new Date('2026-02-28'),
  },
  {
    id: '9',
    userId: 'user-1',
    walletId: 'wallet-1',
    categoryId: 'cat-7',
    category: 'Kesehatan',
    categoryIcon: HeartPulse,
    categoryColor: 'bg-pink-600',
    amount: 750000,
    type: 'expense',
    description: 'Cek kesehatan rutin',
    transactionDate: '27 Feb 2026',
    createdAt: new Date('2026-02-27'),
  },
  {
    id: '10',
    userId: 'user-1',
    walletId: 'wallet-2',
    category: 'Pinjaman',
    categoryIcon: DollarSign,
    categoryColor: 'bg-gray-600',
    amount: 1000000,
    type: 'income',
    description: 'Penerimaan pinjaman',
    transactionDate: '26 Feb 2026',
    createdAt: new Date('2026-02-26'),
  },
  {
    id: '11',
    userId: 'user-1',
    walletId: 'wallet-3',
    categoryId: 'cat-9',
    category: 'Bensin',
    categoryIcon: Fuel,
    categoryColor: 'bg-green-600',
    amount: 400000,
    type: 'expense',
    description: 'Isi bensin mobil',
    transactionDate: '25 Feb 2026',
    createdAt: new Date('2026-02-25'),
  },
  {
    id: '12',
    userId: 'user-1',
    walletId: 'wallet-4',
    toWalletId: 'wallet-3',
    category: 'Transfer dari ShopeePay',
    categoryIcon: WalletIcon,
    categoryColor: 'bg-orange-600',
    amount: 100000,
    type: 'transfer',
    direction: 'incoming',
    description: 'Refund ShopeePay ke DANA',
    transactionDate: '24 Feb 2026',
    createdAt: new Date('2026-02-24'),
  },
  {
    id: '13',
    userId: 'user-1',
    walletId: 'wallet-2',
    categoryId: 'cat-5',
    category: 'Jalan-jalan',
    categoryIcon: Plane,
    categoryColor: 'bg-cyan-600',
    amount: 350000,
    type: 'expense',
    description: 'Bukber keluarga di people',
    transactionDate: '1 Mar 2026',
    createdAt: new Date('2026-03-01'),
  },
  {
    id: '14',
    userId: 'user-1',
    walletId: 'wallet-1',
    categoryId: 'cat-1',
    category: 'Belanja Bulanan',
    categoryIcon: ShoppingCart,
    categoryColor: 'bg-blue-600',
    amount: 500000,
    type: 'expense',
    description:
      'Ini adalah contoh deskripsi yang sangat panjang untuk mendemonstrasikan fitur truncation pada card transaction',
    transactionDate: '1 Mar 2026',
    createdAt: new Date('2026-03-01'),
  },
];

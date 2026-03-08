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
  Car,
  HandHeart,
  LucideIcon,
} from 'lucide-react';

/**
 * Category Model
 * 
 * Represents expense categories with budget tracking
 * 
 * Database Tables:
 * - categories (id, name, icon, color, budget, is_custom, created_at, updated_at)
 * 
 * Fields:
 * - id: Primary key (auto-increment/UUID)
 * - name: Category name (e.g., "Belanja Bulanan")
 * - icon: Lucide icon name for UI
 * - color: Tailwind color class (e.g., "bg-blue-600")
 * - budget: Monthly budget amount in IDR
 * - is_custom: Whether category is custom or default
 * - created_at: Timestamp when record was created
 * - updated_at: Timestamp when record was last updated
 */
export interface Category {
  name: string;
  icon: LucideIcon;
  amount: number;
  budget: number;
  color: string;
  isCustom?: boolean;
}

/**
 * Default expense categories
 * These categories are available by default for all users
 */
export const categories: Category[] = [
  {
    name: 'Belanja Bulanan',
    icon: ShoppingCart,
    amount: 2500000,
    budget: 3000000,
    color: 'bg-blue-600',
    isCustom: false,
  },
  {
    name: 'Bahan Masak',
    icon: Utensils,
    amount: 2100000,
    budget: 2000000,
    color: 'bg-orange-600',
    isCustom: false,
  },
  {
    name: 'Hiburan',
    icon: Gamepad2,
    amount: 510000,
    budget: 800000,
    color: 'bg-purple-600',
    isCustom: false,
  },
  {
    name: 'Tersier',
    icon: Coffee,
    amount: 300000,
    budget: 500000,
    color: 'bg-amber-600',
    isCustom: false,
  },
  {
    name: 'Jalan-jalan',
    icon: Plane,
    amount: 2000000,
    budget: 2500000,
    color: 'bg-cyan-600',
    isCustom: false,
  },
  {
    name: 'Tagihan',
    icon: Receipt,
    amount: 1800000,
    budget: 2000000,
    color: 'bg-red-600',
    isCustom: false,
  },
  {
    name: 'Kesehatan',
    icon: HeartPulse,
    amount: 750000,
    budget: 1000000,
    color: 'bg-pink-600',
    isCustom: false,
  },
  {
    name: 'Pinjaman',
    icon: DollarSign,
    amount: 1000000,
    budget: 1000000,
    color: 'bg-gray-600',
    isCustom: false,
  },
  {
    name: 'Bensin',
    icon: Fuel,
    amount: 510000,
    budget: 600000,
    color: 'bg-green-600',
    isCustom: false,
  },
  {
    name: 'Transportasi',
    icon: Car,
    amount: 0,
    budget: 500000,
    color: 'bg-indigo-600',
    isCustom: false,
  },
  {
    name: 'Shodaqoh',
    icon: HandHeart,
    amount: 430000,
    budget: 500000,
    color: 'bg-teal-600',
    isCustom: false,
  },
];

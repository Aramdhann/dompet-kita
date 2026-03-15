import {
  Wallet,
  CreditCard,
  PiggyBank,
  Banknote,
  Building2,
  Coins,
  DollarSign,
  ShoppingBag,
  Car,
  Home,
  Plane,
  GraduationCap,
  Heart,
  Gift,
  Coffee,
  Smartphone,
  Briefcase,
  TrendingUp,
  LucideIcon,
} from 'lucide-react';

export const walletIcons: { name: string; icon: LucideIcon; label: string }[] =
  [
    { name: 'Wallet', icon: Wallet, label: 'Dompet' },
    { name: 'CreditCard', icon: CreditCard, label: 'Kartu' },
    { name: 'PiggyBank', icon: PiggyBank, label: 'Tabungan' },
    { name: 'Banknote', icon: Banknote, label: 'Uang' },
    { name: 'Building2', icon: Building2, label: 'Bank' },
    { name: 'Coins', icon: Coins, label: 'Koin' },
    { name: 'DollarSign', icon: DollarSign, label: 'Dollar' },
    { name: 'TrendingUp', icon: TrendingUp, label: 'Investasi' },
    { name: 'ShoppingBag', icon: ShoppingBag, label: 'Belanja' },
    { name: 'Car', icon: Car, label: 'Kendaraan' },
    { name: 'Home', icon: Home, label: 'Rumah' },
    { name: 'Plane', icon: Plane, label: 'Liburan' },
    { name: 'GraduationCap', icon: GraduationCap, label: 'Pendidikan' },
    { name: 'Heart', icon: Heart, label: 'Kesehatan' },
    { name: 'Gift', icon: Gift, label: 'Hadiah' },
    { name: 'Coffee', icon: Coffee, label: 'Kafe' },
    { name: 'Smartphone', icon: Smartphone, label: 'Digital' },
    { name: 'Briefcase', icon: Briefcase, label: 'Kerja' },
  ];

export const walletIconsMap = Object.fromEntries(
  walletIcons.map((i) => [i.name, i.icon])
) as Record<string, LucideIcon>;

export const walletColors: {
  name: string;
  class: string;
  bg: string;
  dot: string;
}[] = [
  {
    name: 'Biru',
    class: 'text-blue-600',
    bg: 'bg-blue-50',
    dot: 'bg-blue-500',
  },
  {
    name: 'Hijau',
    class: 'text-green-600',
    bg: 'bg-green-50',
    dot: 'bg-green-500',
  },
  {
    name: 'Kuning',
    class: 'text-yellow-600',
    bg: 'bg-yellow-50',
    dot: 'bg-yellow-400',
  },
  {
    name: 'Ungu',
    class: 'text-purple-600',
    bg: 'bg-purple-50',
    dot: 'bg-purple-500',
  },
  {
    name: 'Oranye',
    class: 'text-orange-600',
    bg: 'bg-orange-50',
    dot: 'bg-orange-500',
  },
  {
    name: 'Merah',
    class: 'text-red-600',
    bg: 'bg-red-50',
    dot: 'bg-red-500',
  },
  {
    name: 'Cyan',
    class: 'text-cyan-600',
    bg: 'bg-cyan-50',
    dot: 'bg-cyan-500',
  },
  {
    name: 'Pink',
    class: 'text-pink-600',
    bg: 'bg-pink-50',
    dot: 'bg-pink-500',
  },
  {
    name: 'Abu',
    class: 'text-gray-600',
    bg: 'bg-gray-50',
    dot: 'bg-gray-400',
  },
];

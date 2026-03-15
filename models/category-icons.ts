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
  Home,
  Shirt,
  BookOpen,
  Dumbbell,
  Baby,
  PawPrint,
  Tv,
  Music,
  Wrench,
  Smartphone,
  Zap,
  Wifi,
  Bus,
  Bike,
  LucideIcon,
} from 'lucide-react';

export const categoryIcons: { name: string; icon: LucideIcon; label: string }[] =
  [
    { name: 'ShoppingCart', icon: ShoppingCart, label: 'Belanja' },
    { name: 'Utensils', icon: Utensils, label: 'Makanan' },
    { name: 'Gamepad2', icon: Gamepad2, label: 'Hiburan' },
    { name: 'Coffee', icon: Coffee, label: 'Tersier' },
    { name: 'Plane', icon: Plane, label: 'Wisata' },
    { name: 'Receipt', icon: Receipt, label: 'Tagihan' },
    { name: 'HeartPulse', icon: HeartPulse, label: 'Kesehatan' },
    { name: 'DollarSign', icon: DollarSign, label: 'Pinjaman' },
    { name: 'Fuel', icon: Fuel, label: 'Bensin' },
    { name: 'Car', icon: Car, label: 'Transportasi' },
    { name: 'HandHeart', icon: HandHeart, label: 'Shodaqoh' },
    { name: 'Home', icon: Home, label: 'Rumah' },
    { name: 'Shirt', icon: Shirt, label: 'Pakaian' },
    { name: 'BookOpen', icon: BookOpen, label: 'Pendidikan' },
    { name: 'Dumbbell', icon: Dumbbell, label: 'Olahraga' },
    { name: 'Baby', icon: Baby, label: 'Anak' },
    { name: 'PawPrint', icon: PawPrint, label: 'Hewan' },
    { name: 'Tv', icon: Tv, label: 'Elektronik' },
    { name: 'Music', icon: Music, label: 'Musik' },
    { name: 'Wrench', icon: Wrench, label: 'Servis' },
    { name: 'Smartphone', icon: Smartphone, label: 'Digital' },
    { name: 'Zap', icon: Zap, label: 'Listrik' },
    { name: 'Wifi', icon: Wifi, label: 'Internet' },
    { name: 'Bus', icon: Bus, label: 'Bus' },
    { name: 'Bike', icon: Bike, label: 'Sepeda' },
  ];

export const categoryIconsMap = Object.fromEntries(
  categoryIcons.map((i) => [i.name, i.icon])
) as Record<string, LucideIcon>;

export const categoryColors: {
  name: string;
  text: string;
  bg: string;
  dot: string;
}[] = [
  { name: 'Biru', text: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  {
    name: 'Oranye',
    text: 'text-orange-600',
    bg: 'bg-orange-50',
    dot: 'bg-orange-500',
  },
  {
    name: 'Ungu',
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    dot: 'bg-purple-500',
  },
  {
    name: 'Kuning',
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    dot: 'bg-amber-400',
  },
  { name: 'Cyan', text: 'text-cyan-600', bg: 'bg-cyan-50', dot: 'bg-cyan-500' },
  { name: 'Merah', text: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' },
  { name: 'Pink', text: 'text-pink-600', bg: 'bg-pink-50', dot: 'bg-pink-500' },
  { name: 'Abu', text: 'text-gray-600', bg: 'bg-gray-50', dot: 'bg-gray-400' },
  {
    name: 'Hijau',
    text: 'text-green-600',
    bg: 'bg-green-50',
    dot: 'bg-green-500',
  },
  {
    name: 'Indigo',
    text: 'text-indigo-600',
    bg: 'bg-indigo-50',
    dot: 'bg-indigo-500',
  },
  {
    name: 'Teal',
    text: 'text-teal-600',
    bg: 'bg-teal-50',
    dot: 'bg-teal-500',
  },
];

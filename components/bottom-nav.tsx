'use client';

import { useState } from 'react';
import {
  HomeIcon,
  WalletIcon,
  FolderIcon,
  CreditCardIcon,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowRightLeft,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'beranda', icon: HomeIcon, href: '/' },
  { label: 'transaksi', icon: CreditCardIcon, href: '/transaksi' },
  { label: 'dompet', icon: WalletIcon, href: '/dompet' },
  { label: 'kategori', icon: FolderIcon, href: '/kategori' },
];

const menuItems = [
  {
    label: 'Tambah Pemasukan',
    icon: ArrowDownCircle,
    href: '/transaksi/tambah?type=pemasukan',
    color: 'text-emerald-600',
  },
  {
    label: 'Tambah Pengeluaran',
    icon: ArrowUpCircle,
    href: '/transaksi/tambah?type=pengeluaran',
    color: 'text-red-500',
  },
  {
    label: 'Transfer Dompet',
    icon: ArrowRightLeft,
    href: '/transaksi/tambah?type=transfer',
    color: 'text-blue-600',
  },
  {
    label: 'Tambah Dompet',
    icon: WalletIcon,
    href: '/dompet/tambah',
    color: 'text-blue-600',
  },
  {
    label: 'Tambah Kategori',
    icon: FolderIcon,
    href: '/kategori/tambah',
    color: 'text-purple-600',
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop — z-40, di bawah FAB (z-50) */}
      {isOpen && (
        <div className="fixed bg-black opacity-10 inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* FAB + Menu — dikeluarkan dari nav, jadi tidak ter-clip */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-3xl pr-3 z-50 flex flex-col items-end gap-4">
        {/* Menu items */}
        <div
          className={`flex flex-col items-end gap-2 transition-all duration-300 ${
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-150"
                style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
              >
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {item.label}
                </span>
                <Icon size={18} className={item.color} />
              </Link>
            );
          })}
        </div>

        {/* FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center active:scale-90 transition-all duration-200"
          style={{
            boxShadow: isOpen
              ? '0 0 0 6px rgba(37,99,235,0.15), 0 8px 24px rgba(37,99,235,0.4)'
              : '0 4px 20px rgba(37,99,235,0.45)',
          }}
        >
          <Plus
            size={26}
            className="text-white transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
          />
        </button>
      </div>

      {/* Bottom bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="w-full flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-400 hover:text-gray-700 active:scale-90'
                }`}
              >
                <div
                  className={`p-1 rounded-lg transition-all duration-150 ${isActive ? 'bg-blue-50' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium capitalize">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <style jsx global>{`
        body {
          padding-bottom: 4rem;
        }
      `}</style>
    </>
  );
}

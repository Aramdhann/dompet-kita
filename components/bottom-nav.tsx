"use client";

import { HomeIcon, WalletIcon, FolderIcon, CreditCardIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "beranda", icon: HomeIcon, href: "/" },
  { label: "transaksi", icon: CreditCardIcon, href: "/transaksi" },
  { label: "dompet", icon: WalletIcon, href: "/dompet" },
  { label: "kategori", icon: FolderIcon, href: "/kategori" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full bottom-0 justify-center z-50 bg-white border-t border-gray-200 shadow-lg max-w-3xl">
        <div className="w-full flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "fill-blue-50" : ""}`} />
                <span className="text-xs font-medium capitalize">{item.label}</span>
              </Link>
            );
          })}
        </div>
    </nav>
  );
}

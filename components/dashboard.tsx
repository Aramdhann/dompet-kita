'use client';

import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  EyeOff,
  Eye,
  User,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatAmountWithPrefix } from '@/lib/format';
import { signOut, useSession } from 'next-auth/react';

interface DashboardProps {
  visible: boolean;
  onToggle: () => void;
}

export function Dashboard({ visible, onToggle }: DashboardProps) {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  if (status === 'loading') {
    return (
      <>
        <div className="flex items-center justify-end px-3 sm:px-5 py-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <Skeleton className="h-9 w-9 rounded-full bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-5 mx-3 sm:mx-5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white bg-blue-600 shadow-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-8 w-40" />
          </div>
        </div>
      </>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-end px-3 sm:px-5 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer select-none outline-none">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {session.user.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  @{session.user.username || 'user'}
                </p>
              </div>
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-sm border-2 border-white ring-1 ring-blue-200 hover:ring-2 hover:ring-blue-300 transition-all">
                  <User className="w-5 h-5" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="gap-2 cursor-pointer">
                <UserCircle className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-3 sm:gap-5 mx-3 sm:mx-5  p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white bg-blue-600 shadow-md hover:shadow-lg border-2 border-blue-800">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-[10px] sm:text-xs font-medium opacity-75 tracking-wide uppercase">
              Total Semua Dompet
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 opacity-75 hover:opacity-100 hover:bg-white/10 text-white"
              onClick={onToggle}
            >
              {visible ? <EyeOff size={12} /> : <Eye size={12} />}
            </Button>
          </div>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight">
            Rp {visible ? formatAmountWithPrefix(8000000) : '•••••••'}
          </p>
        </div>

        <div className="h-px bg-blue-800" />

        <div className="flex justify-between">
          <div className="flex flex-col gap-1 w-[45%]">
            <div className="flex items-center gap-1 opacity-75">
              <TrendingUp size={11} className="shrink-0" />
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">
                Pemasukan
              </p>
            </div>
            <p className="text-sm sm:text-base font-semibold text-emerald-200">
              {visible ? `+ Rp ${formatAmountWithPrefix(10000000)}` : '•••••••'}
            </p>
          </div>
          <div className="w-px bg-blue-800 self-stretch" />
          <div className="flex flex-col gap-1 w-[45%] items-end">
            <div className="flex items-center gap-1 opacity-75">
              <TrendingDown size={11} className="shrink-0" />
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">
                Pengeluaran
              </p>
            </div>
            <p className="text-sm sm:text-base font-semibold text-rose-200">
              {visible ? `- Rp ${formatAmountWithPrefix(10000000)}` : '•••••••'}
            </p>
          </div>
        </div>

        <p className="text-[10px] sm:text-xs opacity-50 text-center">
          Bulan ini · Maret 2026
        </p>
      </div>
    </>
  );
}

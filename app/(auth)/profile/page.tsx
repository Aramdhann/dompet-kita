'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Trash2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SlideToConfirmModal } from '@/components/modals/slide-to-confirm-modal';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col min-h-screen px-4 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Profile</h1>
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full mt-2" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen px-4 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg border-4 border-white ring-1 ring-blue-200">
              {session.user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {session.user.name || 'User'}
          </h2>
          <p className="text-gray-500 mb-1">{session.user.email}</p>

          <div className="flex items-center gap-2 text-gray-600 bg-gray-200 px-4 py-2 rounded-full mt-2">
            <UserCircle className="w-4 h-4" />
            <span className="text-xs"> @{session.user.username || 'user'}</span>
          </div>
        </div>

        <div className="space-y-3 w-full max-w-md mx-auto">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash2 className="w-5 h-5" />
            <span>Hapus Akun</span>
          </Button>
        </div>
      </div>

      <SlideToConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Hapus Akun?"
        description="Apakah Anda yakin ingin menghapus akun Anda? Semua data dompet, transaksi, dan kategori akan dihapus permanen."
        onConfirm={handleDeleteAccount}
        confirmText="Geser untuk hapus"
        warningText="Tindakan ini tidak dapat dibatalkan"
        type="delete"
      />
    </>
  );
}

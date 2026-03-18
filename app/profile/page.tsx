'use client';

import { useState } from 'react';
import { User, Briefcase, LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideToConfirmModal } from '@/components/modals/slide-to-confirm-modal';
import { currentUser } from '@/models/user';

export default function ProfilePage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen px-4 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentUser.avatarColor} text-white flex items-center justify-center shadow-lg border-4 border-white ring-1 ring-blue-200`}
            >
              <User className="w-12 h-12" />
            </div>
            {currentUser.isOnline && (
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {currentUser.name}
          </h2>
          <p className="text-gray-500 mb-1">{currentUser.email}</p>

          <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-full mt-2">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">{currentUser.profession}</span>
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

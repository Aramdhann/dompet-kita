'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Lock,
  User,
  Briefcase,
  ArrowRight,
  UserCheck,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldLabel, FieldContent } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const PROFESI_OPTIONS = [
  'Karyawan Swasta',
  'PNS',
  'Wiraswasta',
  'Freelancer',
  'Mahasiswa/Pelajar',
  'Ibu Rumah Tangga',
  'Engineer',
  'Developer',
  'Lainnya',
];

export default function DaftarPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profesi, setProfesi] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDaftarClick = () => {
    if (nama && email && password && profesi) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmDaftar = () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/login';
    }, 1000);
  };

  const handleBatal = () => {
    setNama('');
    setEmail('');
    setPassword('');
    setProfesi('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-linear-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4">
            <img
              src="/logo-dompet-kita.png"
              alt="Dompet Kita Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Dompet Kita</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola keuangan bersama pasangan
          </p>
        </div>

        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-xl text-center">Daftar</CardTitle>
            <CardDescription className="text-center">
              Isi data diri Anda untuk membuat akun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Field orientation="vertical">
                <FieldLabel htmlFor="nama">Nama Lengkap</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="nama"
                      type="text"
                      placeholder="John Doe"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </FieldContent>
              </Field>

              <Field orientation="vertical">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </FieldContent>
              </Field>

              <Field orientation="vertical">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </FieldContent>
              </Field>

              <Field orientation="vertical">
                <FieldLabel htmlFor="profesi">Profesi</FieldLabel>
                <FieldContent>
                  <Select value={profesi} onValueChange={setProfesi} required>
                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder="Pilih profesi" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFESI_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBatal}
                  className="flex-1 h-11 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <X className="w-4 h-4" />
                    <span>Batal</span>
                  </span>
                </Button>

                <Button
                  type="button"
                  onClick={handleDaftarClick}
                  disabled={
                    isLoading || !nama || !email || !password || !profesi
                  }
                  className="flex-1 h-11 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all duration-300 active:scale-[0.98] active:from-blue-700 active:to-blue-800 shadow-md hover:shadow-lg hover:shadow-blue-200 active:shadow-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="animate-pulse">Memproses...</span>
                      </>
                    ) : (
                      <>
                        <span>Daftar</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>

      <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex items-center justify-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span>Konfirmasi Pendaftaran</span>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-3 pt-2">
              <div className="text-left bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Nama:</span>{' '}
                  <span className="text-gray-600">{nama}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>{' '}
                  <span className="text-gray-600">{email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Profesi:</span>{' '}
                  <span className="text-gray-600">{profesi}</span>
                </div>
              </div>
              <div className="text-gray-700 font-medium">
                Apakah yakin data yang Anda masukkan sudah benar?
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDaftar}>
              Ya, Saya Yakin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

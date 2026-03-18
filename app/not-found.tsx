import Link from 'next/link';
import { HomeIcon, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">

      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center">
          <MapPin className="w-14 h-14 text-blue-300" />
        </div>
        <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-lg font-black text-red-400">?</span>
        </div>
      </div>

      {/* Text */}
      <p className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-2">
        Error 404
      </p>
      <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-sm text-gray-400 text-center mb-8 max-w-xs leading-relaxed">
        Sepertinya kamu tersesat. Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all font-medium text-sm shadow-sm shadow-blue-200"
      >
        <HomeIcon className="w-4 h-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
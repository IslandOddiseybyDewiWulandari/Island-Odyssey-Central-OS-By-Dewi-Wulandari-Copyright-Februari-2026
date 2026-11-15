import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { COPYRIGHT_TEXT } from '../data/mockEcosystem';

export const CopyrightBanner: React.FC = () => {
  return (
    <div
      role="banner"
      aria-label="Peringatan Hak Cipta Resmi"
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-red-900 via-amber-700 to-red-900 border-b border-amber-400/50 px-3 py-1.5 shadow-md"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-2 text-center">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-200 shrink-0 hidden sm:block" />
        <p className="text-[10px] sm:text-[11px] leading-snug font-bold text-amber-50 tracking-wide">
          {COPYRIGHT_TEXT}
        </p>
      </div>
    </div>
  );
};

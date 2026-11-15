import React, { useMemo, useState } from 'react';
import { ArrowLeft, KeyRound, Search, ShieldCheck, UserCheck } from 'lucide-react';
import { ROLES_19 } from '../data/mockEcosystem';
import { RoleId } from '../types/os';

interface RoleLoginModalProps {
  activeRoleId: RoleId;
  onSelectRole: (roleId: RoleId) => void;
  onBackToLanding: () => void;
}

export const RoleLoginModal: React.FC<RoleLoginModalProps> = ({
  activeRoleId,
  onSelectRole,
  onBackToLanding,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string>('Semua');

  const clusters = useMemo(() => {
    const uniq = Array.from(new Set(ROLES_19.map((r) => r.cluster)));
    return ['Semua', ...uniq];
  }, []);

  const filteredRoles = useMemo(() => {
    return ROLES_19.filter((r) => {
      const matchCluster = selectedCluster === 'Semua' || r.cluster === selectedCluster;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q);
      return matchCluster && matchSearch;
    });
  }, [search, selectedCluster]);

  return (
    <div className="min-h-screen bg-[#061322] text-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <button
              type="button"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Halaman Utama
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Portal Autentikasi & Quick-Role Switcher Demo (19 Role RBAC)
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Pilih salah satu dari 19 peran pengguna resmi Island Odyssey Central OS untuk masuk ke
              lingkungan kerja, modul analitik, dan kontrol akses berbasis RBAC secara instan.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <p className="text-slate-400">Protokol Keamanan</p>
              <p className="font-semibold text-white">Zero-Trust SHA-256 · Biometric RBAC</p>
            </div>
          </div>
        </div>

        {/* Search & Cluster Filter */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari role (contoh: Founder, Armada Laut, QC, Shadow, Warga)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {clusters.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCluster(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCluster === c
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 19 Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredRoles.map((role) => {
            const isCurrent = role.id === activeRoleId;
            return (
              <div
                key={role.id}
                className={`flex flex-col justify-between rounded-xl border p-5 transition-colors ${
                  isCurrent
                    ? 'bg-slate-900 border-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="font-mono text-cyan-400 font-semibold">{role.code}</span>
                    <span>{role.cluster}</span>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-white leading-snug">{role.name}</h2>
                    <p className="text-xs text-emerald-400 font-medium mt-1">
                      Akses: {role.layerAccess}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{role.summary}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-slate-400 truncate">
                    {role.geofenceLocation}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectRole(role.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" /> Masuk Dashboard
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-3.5 h-3.5" /> Login sebagai Role Ini
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

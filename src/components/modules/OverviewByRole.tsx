import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  Anchor,
  ArrowUpRight,
  Award,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  FileCheck2,
  Globe2,
  Lock,
  Plane,
  Radio,
  ShieldAlert,
  Ship,
  Sliders,
  Truck,
  Umbrella,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import {
  CORE_ENGINES_8,
  LEDGER_TRANSACTIONS,
  MATERIAL_BATCHES,
  REGIONAL_NODES,
  ROLES_19,
  SEOUL_BRIDGE_PRODUCTS,
} from '../../data/mockEcosystem';
import { CoreEngine, DashboardTab, RoleDefinition } from '../../types/os';

interface OverviewByRoleProps {
  role: RoleDefinition;
  onNavigateTab: (tab: DashboardTab) => void;
  onOpenSos: () => void;
}

export const OverviewByRole: React.FC<OverviewByRoleProps> = ({
  role,
  onNavigateTab,
  onOpenSos,
}) => {
  const [selectedEngine, setSelectedEngine] = useState<CoreEngine | null>(null);
  const [simParamVal, setSimParamVal] = useState<number>(0);
  const [budgetApproved, setBudgetApproved] = useState<Record<string, boolean>>({
    'BUD-NTT-01': false,
    'BUD-PAP-02': false,
  });

  const openEngine = (eng: CoreEngine) => {
    setSelectedEngine(eng);
    setSimParamVal(eng.simParams.value);
  };

  // Render role-specific command panel tailored to each of the 19 roles
  const renderRolePrimaryWidgets = () => {
    switch (role.id) {
      case 'founder':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Capital Deployed', value: 'Rp 850M', note: '100% Terpantau Escrow' },
                { label: 'Social Return (SROI)', value: '3.2x', note: '+12.4% Investor ROI' },
                { label: 'Total Lapangan Kerja', value: '54.320', note: '3.842 Penempatan Aktif' },
                { label: 'Indeks Diplomasi Global', value: '94 / 100', note: 'Konsorsium 6 Negara + AUS' },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                  <p className="text-xs text-slate-400">{kpi.label}</p>
                  <p className="text-2xl font-extrabold font-mono text-white tabular-nums mt-1">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-emerald-400 mt-1">{kpi.note}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Geospatial 3T Node Summary */}
              <div className="lg:col-span-7 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Peta Geospasial Node 3T &amp; Non-3T Nasional
                    </h3>
                    <p className="text-xs text-slate-400">
                      8 Wilayah Strategis · 142 Node SHA-256 Aktif
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('wilayah_hunian')}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Buka Peta Wilayah <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {REGIONAL_NODES.map((n) => (
                    <div
                      key={n.id}
                      className="rounded-lg bg-slate-950 border border-slate-800 p-3 space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-cyan-400">{n.zoneType}</span>
                        <span
                          className={`font-semibold ${
                            n.status === 'On Track'
                              ? 'text-emerald-400'
                              : n.status === 'Critical'
                              ? 'text-red-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {n.progressPercent}%
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white truncate">{n.kabKota}</p>
                      <p className="text-[11px] text-slate-400 truncate">{n.status}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Budget Approval Panel */}
              <div className="lg:col-span-5 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
                <h3 className="text-sm font-bold text-white">
                  Panel Persetujuan Anggaran Strategis
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      id: 'BUD-NTT-01',
                      title: 'Ekspansi Microgrid Surya & Hunian Sumba Timur',
                      amount: 'Rp 145.000.000',
                      category: '70/20/10 · 248 Kategori Verified',
                    },
                    {
                      id: 'BUD-PAP-02',
                      title: 'Armada Udara UAV Cold-Chain Wamena (3T)',
                      amount: 'Rp 160.000.000',
                      category: 'Cargo of Care · LoRa Mode',
                    },
                  ].map((item) => {
                    const isApp = budgetApproved[item.id];
                    return (
                      <div
                        key={item.id}
                        className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{item.title}</p>
                          <p className="text-[11px] font-mono text-cyan-400 mt-0.5">
                            {item.amount}
                          </p>
                          <p className="text-[11px] text-slate-400">{item.category}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setBudgetApproved((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer ${
                            isApp
                              ? 'bg-emerald-600 text-white'
                              : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                          }`}
                        >
                          {isApp ? 'Disetujui' : 'Setujui'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'admin_pusat':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <Cpu className="w-4 h-4" /> Kesehatan Node &amp; Jaringan SHA-256
              </div>
              <p className="text-3xl font-extrabold font-mono text-white tabular-nums">142 / 142</p>
              <p className="text-xs text-emerald-400">
                Sinkronisasi LoRa/Satelit 99.9% · Zero-Trust Active
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('operasional_tsr')}
                className="text-xs font-semibold text-cyan-400 hover:underline cursor-pointer"
              >
                Kelola Terminal Sinkronisasi →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Users className="w-4 h-4" /> Manajemen 19 Role RBAC &amp; 248 Kategori
              </div>
              <p className="text-3xl font-extrabold font-mono text-white tabular-nums">
                {ROLES_19.length} Roles · 248 Kat
              </p>
              <p className="text-xs text-slate-300">205 Penerima Manfaat + 43 Mitra Strategis</p>
              <button
                type="button"
                onClick={() => onNavigateTab('kategori_248')}
                className="text-xs font-semibold text-cyan-400 hover:underline cursor-pointer"
              >
                Buka Direktori 248 Kategori →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Lock className="w-4 h-4" /> Log Keamanan &amp; Audit Immutable
              </div>
              <p className="text-xs font-mono text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800 break-all">
                LAST HASH: {LEDGER_TRANSACTIONS[0].sha256.slice(0, 34)}...
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('monitoring_6_layer')}
                className="text-xs font-semibold text-cyan-400 hover:underline cursor-pointer"
              >
                Periksa 6-Layer Security Log →
              </button>
            </div>
          </div>
        );

      case 'konsorsium_global':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-400" /> Katalog Ekspor Seoul Bridge
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateTab('tie_ekonomi')}
                  className="text-xs text-cyan-400 font-semibold cursor-pointer"
                >
                  Lihat Katalog Penuh →
                </button>
              </div>
              <div className="space-y-2">
                {SEOUL_BRIDGE_PRODUCTS.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{p.name}</p>
                      <p className="text-slate-400">
                        {p.origin} → {p.destination}
                      </p>
                    </div>
                    <span className="font-mono text-emerald-400 font-semibold">{p.volume}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  Indeks Diplomasi &amp; Voting 6 Negara + Australia
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateTab('konsorsium_errs')}
                  className="text-xs text-cyan-400 font-semibold cursor-pointer"
                >
                  Buka Panel Veto →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Diplomacy Index (Engine 04)</p>
                  <p className="text-2xl font-extrabold font-mono text-amber-400 mt-1">94 / 100</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Volume Ekspor Terpadu</p>
                  <p className="text-2xl font-extrabold font-mono text-cyan-400 mt-1">1.200 Ton</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Hak Veto 6 Negara Mitra aktif untuk persetujuan koridor ekspor &amp; hibah darurat.
              </p>
            </div>
          </div>
        );

      case 'hr_pusat':
      case 'hr_lapangan':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400">Database SDM UARS</p>
              <p className="text-2xl font-extrabold font-mono text-white tabular-nums">54.320</p>
              <p className="text-xs text-emerald-400">3.842 Terverifikasi · Tahap Karir 1–6</p>
              <button
                type="button"
                onClick={() => onNavigateTab('uars')}
                className="text-xs font-semibold text-cyan-400 pt-1 cursor-pointer"
              >
                Buka Matriks UARS →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400">Absensi Biometrik &amp; Geofencing</p>
              <p className="text-2xl font-extrabold font-mono text-cyan-400 tabular-nums">97.4%</p>
              <p className="text-xs text-slate-300">Radius Posko 3T Valid · 3 Izin Menunggu</p>
              <button
                type="button"
                onClick={() => onNavigateTab('operasional_tsr')}
                className="text-xs font-semibold text-cyan-400 pt-1 cursor-pointer"
              >
                Kelola Absensi &amp; Izin →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400">Penugasan &amp; Rolling Shift</p>
              <p className="text-2xl font-extrabold font-mono text-amber-400 tabular-nums">
                78 Posko
              </p>
              <p className="text-xs text-slate-300">Zero Vacancy Rolling System Aktif</p>
              <button
                type="button"
                onClick={() => onNavigateTab('operasional_tsr')}
                className="text-xs font-semibold text-cyan-400 pt-1 cursor-pointer"
              >
                Delegasi &amp; Rolling Tugas →
              </button>
            </div>
          </div>
        );

      case 'staff_pusat':
      case 'staff_ops_lapangan':
      case 'tim_eksekutor_harian':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-cyan-400" /> Pelaporan Harian TSR (Step 1–4)
              </h3>
              <p className="text-xs text-slate-300">
                Wajib kirim laporan Layer 1 maksimal 1x24 jam lengkap dengan foto ber-GPS dan Preview
                Card.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('operasional_tsr')}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
              >
                Isi Form Wizard TSR Sekarang
              </button>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" /> Sinkronisasi Offline LoRa/HT
              </h3>
              <p className="text-xs text-slate-300">
                Mode input lapangan tetap berjalan penuh tanpa internet dan otomatis sync saat
                sinyal terhubung.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('konsorsium_errs')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                Buka Terminal LoRa/HT
              </button>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Koordinasi Verifikasi Layer 2
              </h3>
              <p className="text-xs text-slate-300">
                Status SLA harian: 94% tepat waktu · 2 milestone wilayah menunggu verifikasi GPS.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('monitoring_6_layer')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                Lihat Status Layer 1 &amp; 2
              </button>
            </div>
          </div>
        );

      case 'tim_verifikasi_internal':
      case 'tim_audit_kap_freelance':
      case 'shadow_team':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-cyan-400 font-bold">Sampling Acak &amp; Cross-Check</p>
              <p className="text-2xl font-extrabold font-mono text-white">15% Sampel Acak</p>
              <p className="text-xs text-slate-300">
                Pencocokan otomatis Biometrik + GPS + Video CCTV/Drone di 6-Layer Monitoring.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('monitoring_6_layer')}
                className="mt-2 inline-block text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
              >
                Buka Panel Audit &amp; Sampling →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-red-400 font-bold">Anomali &amp; Sanksi Layer 6</p>
              <p className="text-2xl font-extrabold font-mono text-red-400">3 Kasus Aktif</p>
              <p className="text-xs text-slate-300">
                1 E-Wallet dibekukan (Batch Pipa Palu), 2 Verifikasi Video Sanggah.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('monitoring_6_layer')}
                className="mt-2 inline-block text-xs font-bold text-red-400 hover:underline cursor-pointer"
              >
                Eksekusi Sanksi &amp; Sanggah →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-emerald-400 font-bold">Opini Audit KAP (Layer 3)</p>
              <p className="text-2xl font-extrabold font-mono text-emerald-400">WTP (Q4 2026)</p>
              <p className="text-xs text-slate-300">
                Ekspor resmi CSV/PDF tersedia sekali klik dengan watermark SHA-256.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('keuangan_ledger')}
                className="mt-2 inline-block text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                Telusuri Ledger A-to-Z →
              </button>
            </div>
          </div>
        );

      case 'tim_qc':
        return (
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Ringkasan Pengujian Mutu Material &amp; Karantina Vendor
                </h3>
                <p className="text-xs text-slate-400">
                  Integrasi langsung QC Lapangan dengan Layer 6 Auto-Lock Escrow
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('logistik_cargo')}
                className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
              >
                Buka Lab Uji &amp; Scanner QR Batch
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {MATERIAL_BATCHES.map((b) => (
                <div
                  key={b.batchId}
                  className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-cyan-400">{b.batchId}</span>
                    <span
                      className={`font-bold ${
                        b.status === 'Passed'
                          ? 'text-emerald-400'
                          : b.status === 'Rejected'
                          ? 'text-red-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {b.status === 'Passed'
                        ? 'Lolos (SNI)'
                        : b.status === 'Rejected'
                        ? 'Ditolak · Escrow Locked'
                        : 'Proses Uji'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white">{b.materialName}</p>
                  <p className="text-[11px] text-slate-400">{b.testMetric}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tim_keuangan_escrow':
      case 'risk_errs_manager':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-emerald-400" /> Skema 70 / 20 / 10 + 25% Inflasi
              </p>
              <p className="text-2xl font-extrabold font-mono text-white">Rp 850M</p>
              <p className="text-xs text-emerald-400">70% Warga (0% Potongan) · SLA &lt;30 Menit</p>
              <button
                type="button"
                onClick={() => onNavigateTab('keuangan_ledger')}
                className="text-xs font-semibold text-cyan-400 cursor-pointer"
              >
                Buka Kalkulator &amp; Pencairan →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Umbrella className="w-4 h-4 text-rose-400" /> Buffer Darurat ERRS (Engine 06)
              </p>
              <p className="text-2xl font-extrabold font-mono text-rose-400">Rp 120M</p>
              <p className="text-xs text-slate-300">100% Klaim Asuransi Mikro Terbayar</p>
              <button
                type="button"
                onClick={() => onNavigateTab('konsorsium_errs')}
                className="text-xs font-semibold text-cyan-400 cursor-pointer"
              >
                Kelola Klaim &amp; ERRS →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-amber-400" /> Escrow Terbekukan (Layer 6)
              </p>
              <p className="text-2xl font-extrabold font-mono text-amber-400">Rp 64.000.000</p>
              <p className="text-xs text-slate-300">1 Vendor dalam karantina mutu material</p>
              <button
                type="button"
                onClick={() => onNavigateTab('keuangan_ledger')}
                className="text-xs font-semibold text-cyan-400 cursor-pointer"
              >
                Lihat Ledger A-to-Z →
              </button>
            </div>
          </div>
        );

      case 'armada_laut':
      case 'armada_darat':
      case 'armada_udara':
        return (
          <div className="rounded-xl bg-slate-900 border border-cyan-800/50 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                {role.id === 'armada_laut' && <Anchor className="w-4 h-4" />}
                {role.id === 'armada_darat' && <Truck className="w-4 h-4" />}
                {role.id === 'armada_udara' && <Plane className="w-4 h-4" />}
                <span>FLEET COMMAND MASTER · CARGO OF CARE + KURIR MENTOR UARS</span>
              </div>
              <h3 className="text-lg font-bold text-white">{role.name}</h3>
              <p className="text-xs text-slate-300 max-w-2xl">{role.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('logistik_cargo')}
              className="px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Buka Fleet Command &amp; Manifest QR
            </button>
          </div>
        );

      case 'mitra_strategis':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400">Imbal Hasil &amp; SROI Mitra</p>
              <p className="text-2xl font-extrabold font-mono text-emerald-400">12.4% ROI · 3.2x</p>
              <p className="text-xs text-slate-300">Modal terkelola melalui Escrow 70/20/10</p>
              <button
                type="button"
                onClick={() => onNavigateTab('tie_ekonomi')}
                className="text-xs font-semibold text-cyan-400 cursor-pointer"
              >
                Buka Matriks Gradual Release &amp; RAB →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400">Target 248 Kategori Ekosistem</p>
              <p className="text-2xl font-extrabold font-mono text-white">205 + 43</p>
              <p className="text-xs text-slate-300">Filter penerima manfaat &amp; mitra strategis</p>
              <button
                type="button"
                onClick={() => onNavigateTab('kategori_248')}
                className="text-xs font-semibold text-cyan-400 cursor-pointer"
              >
                Pilih Sasaran Kategori →
              </button>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-2">
              <p className="text-xs text-slate-400">Simulator RAB Kota Mandiri 3T</p>
              <p className="text-lg font-extrabold font-mono text-cyan-400">
                Rp 345M · 650M · 850M
              </p>
              <p className="text-xs text-slate-300">100% Kesehatan/Edukasi · 80% Ekonomi Lokal</p>
              <button
                type="button"
                onClick={() => onNavigateTab('wilayah_hunian')}
                className="text-xs font-semibold text-cyan-400 cursor-pointer"
              >
                Jalankan Simulator RAB →
              </button>
            </div>
          </div>
        );

      case 'warga_beneficiary':
      default:
        return (
          <div className="space-y-4">
            {/* Banner Pendaftaran TIE */}
            <div className="rounded-xl bg-gradient-to-r from-[#0B3C5D] to-emerald-900 border border-cyan-600/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-cyan-300">
                  Portal Warga Terpadu · Desa Mandiri Waingapu (3T)
                </p>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  Program Twin Impact Enterprise (TIE) &amp; Hunian Subsidi
                </h3>
                <p className="text-xs text-cyan-100 mt-1">
                  Akses modal 0% potongan, pendampingan Kurir Mentor UARS, status rumah, &amp;
                  pelaporan komunitas Layer 5.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigateTab('tie_ekonomi')}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Daftar / Ajukan TIE
                </button>
                <button
                  type="button"
                  onClick={onOpenSos}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                >
                  Panic Button Rumah
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => onNavigateTab('keuangan_ledger')}
                className="text-left rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 p-4 space-y-1.5 cursor-pointer"
              >
                <p className="text-xs text-slate-400">E-Wallet Warga (Gradual Release)</p>
                <p className="text-2xl font-extrabold font-mono text-emerald-400 tabular-nums">
                  Rp 3.450.000
                </p>
                <p className="text-xs text-cyan-400">Lihat History &amp; Lacak Bantuan A-to-Z →</p>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('uars')}
                className="text-left rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/60 p-4 space-y-1.5 cursor-pointer"
              >
                <p className="text-xs text-slate-400">UARS Bursa Kerja &amp; Pelatihan</p>
                <p className="text-lg font-bold text-white">Welder Huntap — PT Bangun Palu</p>
                <p className="text-xs text-cyan-400">3 Lowongan Cocok &amp; Pelatihan K3 →</p>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('wilayah_hunian')}
                className="text-left rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/60 p-4 space-y-1.5 cursor-pointer"
              >
                <p className="text-xs text-slate-400">Status Hunian Kota Mandiri 3T</p>
                <p className="text-lg font-bold text-white">Pondasi 100% · Struktur 50%</p>
                <p className="text-xs text-cyan-400">Ajukan / Lapor Kerusakan Rumah →</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-7">
      {/* Role Header Strip */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-mono font-bold text-cyan-400">{role.code}</span>
            <span aria-hidden="true">·</span>
            <span>{role.cluster}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">{role.layerAccess}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">{role.name}</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">{role.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs">
            <p className="text-slate-400">Saldo E-Wallet Aktif</p>
            <p className="font-mono font-bold text-emerald-400 tabular-nums">
              Rp {role.walletBalance.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs">
            <p className="text-slate-400">Jam Kerja Hari Ini</p>
            <p className="font-mono font-bold text-white tabular-nums">
              {role.workingHoursToday} Jam · Biometrik Valid
            </p>
          </div>
        </div>
      </div>

      {/* Role-Specific Command Widgets */}
      {renderRolePrimaryWidgets()}

      {/* 8 Core Engine Interactive System Control Cards inside Central OS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white">
              8 Core Engine — System Control Cards (KHI Architecture)
            </h3>
            <p className="text-xs text-slate-400">
              Klik kartu engine untuk simulasi parameter atau membuka modul operasional terkait.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {CORE_ENGINES_8.map((engine) => (
            <button
              key={engine.id}
              type="button"
              onClick={() => openEngine(engine)}
              className="text-left rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.14)] p-4 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{engine.number}</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    {engine.status} · {engine.healthPercent}%
                  </span>
                </div>
                <p className="text-xs font-bold text-white leading-snug">{engine.officialName}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block truncate">{engine.metric1Label}</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {engine.metric1Value}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block truncate">{engine.metric2Label}</span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {engine.metric2Value}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Engine Detail Modal */}
      {selectedEngine && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-slate-900 border border-cyan-500/50 rounded-xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-cyan-400 font-bold">
                  {selectedEngine.number} · {selectedEngine.healthPercent}% HEALTH
                </p>
                <h4 className="text-sm font-bold text-white">{selectedEngine.officialName}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEngine(null)}
                className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedEngine.description}
              </p>
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> {selectedEngine.simParams.name}
                  </span>
                  <span className="font-mono font-bold text-white">
                    {simParamVal} {selectedEngine.simParams.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedEngine.simParams.min}
                  max={selectedEngine.simParams.max}
                  step={selectedEngine.simParams.max <= 10 ? 0.1 : 1}
                  value={simParamVal}
                  onChange={(e) => setSimParamVal(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <p className="text-xs text-emerald-400 font-mono">
                  Output Simulasi: Kapasitas layanan naik{' '}
                  {Math.round((simParamVal / selectedEngine.simParams.value) * 14.5)}% tanpa
                  kebocoran anggaran.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEngine(null)}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = selectedEngine.targetTab;
                    setSelectedEngine(null);
                    onNavigateTab(target);
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" /> Buka Dashboard Modul Khusus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

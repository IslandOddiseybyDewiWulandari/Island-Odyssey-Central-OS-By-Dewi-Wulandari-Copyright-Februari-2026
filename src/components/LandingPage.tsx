import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  Download,
  Globe2,
  HeartHandshake,
  Lock,
  Radio,
  ShieldCheck,
  Ship,
  Siren,
  Sliders,
  Smartphone,
  Store,
  Tv,
  Umbrella,
  Wallet,
  X,
} from 'lucide-react';
import { CORE_ENGINES_8 } from '../data/mockEcosystem';
import { CoreEngine, DashboardTab, RoleId } from '../types/os';

interface LandingPageProps {
  onEnterLogin: () => void;
  onQuickEnterDashboard: (roleId: RoleId, tab?: DashboardTab) => void;
  onOpenEmergencyModal: () => void;
}

const APP_FEATURES_8 = [
  {
    id: 'market',
    title: 'Market / UMKM',
    subtitle: 'Seoul Bridge & Pasar Desa 3T',
    desc: 'Akses jual-beli produk lokal dan ekspor lintas negara tanpa perantara merugikan.',
    icon: <Store className="w-5 h-5" />,
    tab: 'tie_ekonomi' as DashboardTab,
  },
  {
    id: 'wallet',
    title: 'Wallet / Keuangan',
    subtitle: 'Escrow & Gradual Release 10%',
    desc: 'Pencairan dana langsung ke E-Wallet warga 0% potongan dengan jejak audit SHA-256.',
    icon: <Wallet className="w-5 h-5" />,
    tab: 'keuangan_ledger' as DashboardTab,
  },
  {
    id: 'uars',
    title: 'UARS / Tenaga Kerja',
    subtitle: 'Job Guarantee & Pelatihan Vokasi',
    desc: 'Pemetaan keahlian 54.320 tenaga kerja dan penempatan proyek padat karya posko.',
    icon: <Briefcase className="w-5 h-5" />,
    tab: 'uars' as DashboardTab,
  },
  {
    id: 'monitoring',
    title: 'Monitoring System',
    subtitle: 'Tata Kelola 6-Layer Anti-Fraud',
    desc: 'Pengawasan berlapis dari Eksekutor Harian, Biometrik L2, KAP, hingga Shadow Team.',
    icon: <ShieldCheck className="w-5 h-5" />,
    tab: 'monitoring_6_layer' as DashboardTab,
  },
  {
    id: 'asuransi',
    title: 'Asuransi Mikro',
    subtitle: 'Engine 06 & Buffer ERRS',
    desc: 'Perlindungan otomatis bagi pekerja 3T, nelayan, dan korban bencana atau krisis ekonomi.',
    icon: <Umbrella className="w-5 h-5" />,
    tab: 'konsorsium_errs' as DashboardTab,
  },
  {
    id: 'logistik',
    title: 'Logistik Cargo of Care',
    subtitle: 'Armada Laut, Darat & Udara',
    desc: 'Distribusi material hunian, energi surya, medis, dan jemput panen via manifest QR.',
    icon: <Ship className="w-5 h-5" />,
    tab: 'logistik_cargo' as DashboardTab,
  },
  {
    id: 'pendidikan',
    title: 'Pendidikan & Kurir Mentor',
    subtitle: 'Edukasi Lapangan & Diaspora',
    desc: 'Kurir mentor armada mendampingi pelatihan K3, literasi keuangan, dan koperasi desa.',
    icon: <BookOpen className="w-5 h-5" />,
    tab: 'tie_ekonomi' as DashboardTab,
  },
  {
    id: 'bansos',
    title: 'Bantuan Sosial & Hunian',
    subtitle: 'Pelacakan A-to-Z & Rumah Subsidi',
    desc: 'Transparansi penyaluran bansos ala timeline pengiriman paket hingga ke tangan warga.',
    icon: <HeartHandshake className="w-5 h-5" />,
    tab: 'wilayah_hunian' as DashboardTab,
  },
];

function getEngineIcon(engineId: string) {
  switch (engineId) {
    case 'engine-01':
      return <Building2 className="w-5 h-5 text-cyan-400" />;
    case 'engine-02':
      return <HeartHandshake className="w-5 h-5 text-emerald-400" />;
    case 'engine-03':
      return <Globe2 className="w-5 h-5 text-sky-400" />;
    case 'engine-04':
      return <Tv className="w-5 h-5 text-amber-400" />;
    case 'engine-05':
      return <Lock className="w-5 h-5 text-indigo-400" />;
    case 'engine-06':
      return <Umbrella className="w-5 h-5 text-rose-400" />;
    case 'engine-07':
      return <Ship className="w-5 h-5 text-teal-400" />;
    default:
      return <Briefcase className="w-5 h-5 text-blue-400" />;
  }
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterLogin,
  onQuickEnterDashboard,
  onOpenEmergencyModal,
}) => {
  const [selectedEngine, setSelectedEngine] = useState<CoreEngine | null>(null);
  const [simValue, setSimValue] = useState<number>(0);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const openEngineModal = (engine: CoreEngine) => {
    setSelectedEngine(engine);
    setSimValue(engine.simParams.value);
  };

  const handleDownloadClick = (platform: string) => {
    setDownloadNotice(
      `Paket instalasi Island Odyssey Mobile (${platform}) v2026.2 siap. Anda juga dapat langsung mencoba simulasi interaktif di HP Mockup atau masuk ke Dashboard Warga.`
    );
  };

  return (
    <div className="min-h-screen bg-[#061829] text-slate-100">
      {/* Clean 3-Zone Top Navigation Bar */}
      <header className="border-b border-cyan-900/50 bg-[#0B3C5D]/90 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#hero"
            className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            ISLAND ODYSSEY
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-cyan-100/90">
            <a href="#fitur" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              8 Fitur Utama
            </a>
            <a href="#engines" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              8 Core Engine
            </a>
            <a href="#dampak" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Dampak Nasional
            </a>
            <a href="#download" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Aplikasi Mobile
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onEnterLogin}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              Masuk 19 Role OS
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-[#0B3C5D] via-[#072942] to-[#051828] border-b border-cyan-900/40"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs sm:text-sm font-semibold text-cyan-300 tracking-wide">
              ISLAND ODYSSEY · Integrated Digital Social Enterprise Ecosystem
            </p>

            <h1
              className="text-3xl sm:text-5xl font-extrabold text-white leading-[1.12] tracking-tight max-w-2xl"
              style={{ textWrap: 'balance' }}
            >
              Kedaulatan Wilayah 3T &amp; Non-3T dalam Satu Ekosistem Zero-Leakage
            </h1>

            <p className="text-base sm:text-lg text-emerald-300 font-semibold max-w-2xl">
              Integrated Disaster Management &amp; Zero-Leakage Crisis Relief Platform
            </p>

            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl">
              Menghubungkan 19 peran tata kelola dari Pusat Komando Eksekutif, Konsorsium 6 Negara,
              Armada Laut-Darat-Udara Cargo of Care, hingga E-Wallet Warga melalui 8 Core Engine dan
              pengawasan 6-Layer Monitoring berbasis Offline-First LoRa &amp; SHA-256.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleDownloadClick('Android & iOS')}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download Aplikasi</span>
              </button>

              <button
                type="button"
                onClick={onEnterLogin}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/50 text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Jelajahi Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenEmergencyModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Siren className="w-4 h-4" />
                <span>Emergency Mode / Posko Darurat</span>
              </button>
            </div>

            {/* Store Icons Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-cyan-100/90">
              <button
                type="button"
                onClick={() => handleDownloadClick('Google Play Store')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/70 border border-cyan-800/70 hover:border-cyan-500 transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Google Play Store</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadClick('Apple App Store')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/70 border border-cyan-800/70 hover:border-cyan-500 transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>App Store iOS</span>
              </button>
              <span className="text-slate-300">Offline-First LoRa / HT / SMS Ready</span>
            </div>

            {downloadNotice && (
              <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-lg p-3 text-xs text-emerald-200 flex items-center justify-between gap-3 max-w-xl">
                <span>{downloadNotice}</span>
                <button
                  type="button"
                  onClick={() => setDownloadNotice(null)}
                  className="text-emerald-300 hover:text-white shrink-0 cursor-pointer"
                  aria-label="Tutup pemberitahuan"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Interactive Mobile App Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[330px] rounded-[2rem] bg-slate-950 border-[6px] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden">
              {/* Phone Notch */}
              <div className="bg-slate-900 px-5 pt-3 pb-2.5 flex items-center justify-between border-b border-slate-800">
                <span className="text-[11px] font-mono text-slate-300 tabular-nums">09:44 WITA</span>
                <div className="w-16 h-3.5 bg-slate-950 rounded-full border border-slate-800" />
                <span className="text-[11px] font-mono text-emerald-400">LoRa + 4G</span>
              </div>

              {/* Phone Screen Content */}
              <div className="p-4 space-y-3.5 bg-gradient-to-b from-[#0B3C5D]/60 to-slate-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-cyan-300">Akun Warga Terverifikasi</p>
                    <p className="text-sm font-bold text-white">Desa Waingapu · NTT (3T)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onQuickEnterDashboard('warga_beneficiary')}
                    className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 text-[11px] font-bold cursor-pointer"
                  >
                    Buka App
                  </button>
                </div>

                {/* E-Wallet Card */}
                <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-cyan-700 p-3.5 text-white shadow">
                  <div className="flex items-center justify-between text-[11px] text-emerald-100">
                    <span>Saldo E-Wallet 0% Potongan</span>
                    <span className="font-mono">Gradual 6/10</span>
                  </div>
                  <p className="text-xl font-extrabold font-mono tabular-nums mt-1">
                    Rp 3.450.000
                  </p>
                  <div className="mt-2.5 h-1.5 w-full bg-black/25 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-white rounded-full" />
                  </div>
                </div>

                {/* Live Cargo Tracking */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-cyan-300">Cargo of Care · KM Sabuk 09</span>
                    <span className="font-mono text-emerald-400">ETA 4j 10m</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    Bantuan Solar Microgrid &amp; Material Hunian Subsidi Tahap III
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Pusat → Hub Kupang → Posko</span>
                    <span>98.4%</span>
                  </div>
                </div>

                {/* Quick Mobile Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onQuickEnterDashboard('warga_beneficiary', 'uars')}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 text-left cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-white">Bursa UARS</p>
                    <p className="text-[10px] text-slate-400">3 Lowongan Cocok</p>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenEmergencyModal}
                    className="p-2.5 rounded-lg bg-red-600/20 border border-red-500/50 hover:bg-red-600/30 text-left cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-red-300">Panic SOS</p>
                    <p className="text-[10px] text-red-200/80">Keamanan &amp; Bencana</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section id="dampak" className="bg-[#082238] border-b border-cyan-900/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Penerima Manfaat Terverifikasi', value: '12.348', unit: 'Warga 3T & Non-3T' },
            { label: 'Desa & Posko Terhubung', value: '248', unit: 'Desa Mandiri' },
            { label: 'Program Aktif Terpantau', value: '5.120', unit: 'Audit A-to-Z' },
            { label: 'Wilayah Kedaulatan', value: '8', unit: 'Wilayah Strategis' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-slate-900/70 border border-cyan-900/50 p-5"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums">
                {stat.value}
              </p>
              <p className="text-sm font-bold text-white mt-1.5">{stat.label}</p>
              <p className="text-xs text-cyan-300/80 mt-0.5">{stat.unit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Interactive App Features Grid */}
      <section id="fitur" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-cyan-400">Ekosistem Layanan Terpadu</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              8 Pilar Fitur Utama Island Odyssey
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-xl">
            Klik kartu fitur di bawah untuk langsung membuka modul terkait di dalam Central OS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {APP_FEATURES_8.map((feat) => (
            <button
              key={feat.id}
              type="button"
              onClick={() => onQuickEnterDashboard('founder', feat.tab)}
              className="group text-left rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/70 p-5 transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#0B3C5D] text-cyan-300 flex items-center justify-center mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs font-medium text-emerald-400 mt-0.5">{feat.subtitle}</p>
                <p className="text-xs text-slate-300 leading-relaxed mt-2.5">{feat.desc}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                Buka Modul <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 8 CORE ENGINE - INTERACTIVE SYSTEM CONTROL CARDS (NAMA ASLI) */}
      <section
        id="engines"
        className="bg-slate-950/70 border-y border-slate-800/80 py-14"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-emerald-400">
                Arsitektur Inti KHI · Real-Time Telemetry
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                8 Core Engine System Control Cards
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-xl">
              Klik salah satu kartu Engine untuk melihat rincian arsitektur, melakukan simulasi
              parameter, atau membuka dashboard modul khusus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {CORE_ENGINES_8.map((engine) => (
              <button
                key={engine.id}
                type="button"
                onClick={() => openEngineModal(engine)}
                className="text-left rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/80 hover:shadow-[0_0_24px_rgba(6,182,212,0.18)] p-5 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top row: Icon + Live Telemetry Health Indicator */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                      {getEngineIcon(engine.id)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                      <span>
                        {engine.status} · {engine.healthPercent}% HEALTH
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-cyan-400 font-semibold">{engine.number}</p>
                    <h3 className="text-sm font-bold text-white leading-snug mt-0.5">
                      {engine.officialName}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {engine.description}
                  </p>
                </div>

                {/* Key Real-Time Metrics */}
                <div className="mt-4 pt-3.5 border-t border-slate-800 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] text-slate-400">{engine.metric1Label}</p>
                    <p className="text-xs font-bold font-mono text-white tabular-nums mt-0.5">
                      {engine.metric1Value}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">{engine.metric2Label}</p>
                    <p className="text-xs font-bold font-mono text-emerald-400 tabular-nums mt-0.5">
                      {engine.metric2Value}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Download App CTA Banner */}
      <section id="download" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14">
        <div className="rounded-2xl bg-gradient-to-r from-[#0B3C5D] via-[#0B4F6C] to-emerald-900 border border-cyan-700/50 p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-bold text-cyan-300">
              Akses Lapangan, Armada &amp; Warga 3T
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Siap Terhubung ke Ekosistem Island Odyssey di Mana Saja
            </h2>
            <p className="text-sm text-cyan-100/90">
              Mendukung sinkronisasi otomatis via jaringan internet, LoRa 915MHz, HT, dan SMS untuk
              seluruh 19 peran pengguna.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleDownloadClick('Google Play')}
              className="px-5 py-3 rounded-lg bg-slate-950 hover:bg-slate-900 text-white border border-slate-700 font-bold text-xs sm:text-sm cursor-pointer whitespace-nowrap"
            >
              Get it on Google Play
            </button>
            <button
              type="button"
              onClick={() => handleDownloadClick('App Store')}
              className="px-5 py-3 rounded-lg bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer whitespace-nowrap"
            >
              Download on the App Store
            </button>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="font-semibold text-slate-200">
            ISLAND ODYSSEY CENTRAL OS · KHI Architecture
          </p>
          <p>205 Kategori Penerima + 43 Mitra Strategis · 19 Role RBAC · 6-Layer Monitoring</p>
        </div>
      </footer>

      {/* Engine Detail & Parameter Simulator Modal */}
      {selectedEngine && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl bg-slate-900 border border-cyan-500/50 rounded-xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                  {getEngineIcon(selectedEngine.id)}
                </div>
                <div>
                  <p className="text-xs font-mono text-cyan-400 font-bold">
                    {selectedEngine.number} · {selectedEngine.healthPercent}% HEALTH
                  </p>
                  <h3 className="text-sm font-bold text-white">{selectedEngine.officialName}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEngine(null)}
                className="p-2 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Tutup modal engine"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <p className="text-sm text-slate-300 leading-relaxed">{selectedEngine.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
                  <p className="text-xs text-slate-400">{selectedEngine.metric1Label}</p>
                  <p className="text-base font-bold font-mono text-white tabular-nums mt-0.5">
                    {selectedEngine.metric1Value}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
                  <p className="text-xs text-slate-400">{selectedEngine.metric2Label}</p>
                  <p className="text-base font-bold font-mono text-emerald-400 tabular-nums mt-0.5">
                    {selectedEngine.metric2Value}
                  </p>
                </div>
              </div>

              {/* Interactive Simulation Parameter */}
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> Simulasikan Parameter Engine
                  </span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {simValue} {selectedEngine.simParams.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedEngine.simParams.min}
                  max={selectedEngine.simParams.max}
                  step={selectedEngine.simParams.max <= 10 ? 0.1 : 1}
                  value={simValue}
                  onChange={(e) => setSimValue(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <p className="text-xs text-emerald-400 font-mono">
                  Proyeksi Dampak Simulasi: +
                  {Math.round((simValue / selectedEngine.simParams.value) * 18.4)}% Efisiensi
                  Penyaluran 3T &amp; Zero-Leakage SLA 99.8%
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEngine(null)}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const targetTab = selectedEngine.targetTab;
                    setSelectedEngine(null);
                    onQuickEnterDashboard('founder', targetTab);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  Buka Dashboard Modul Khusus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

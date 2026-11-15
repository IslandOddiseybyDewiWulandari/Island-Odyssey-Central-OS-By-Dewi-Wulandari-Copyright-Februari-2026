import React, { useState } from 'react';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Eye,
  Lock,
  ShieldAlert,
  Sliders,
  Wallet,
  X,
} from 'lucide-react';
import { LEDGER_TRANSACTIONS } from '../../data/mockEcosystem';
import { LedgerTransaction, RoleDefinition } from '../../types/os';

interface FinanceLedgerModuleProps {
  role: RoleDefinition;
  isAccountFrozen: boolean;
  onQueueOfflineAction: (module: string, summary: string) => void;
}

export const FinanceLedgerModule: React.FC<FinanceLedgerModuleProps> = ({
  role,
  isAccountFrozen,
  onQueueOfflineAction,
}) => {
  // E-Wallet State
  const [balance, setBalance] = useState(role.walletBalance);
  const [withdrawMsg, setWithdrawMsg] = useState<string | null>(null);

  // Kalkulator Skema 70/20/10 & Mark-up 25%
  const [danaMasuk, setDanaMasuk] = useState<number>(100000000);

  // Simulator Gradual Release Model (10% per hari selama 10 hari)
  const [totalGradualFund, setTotalGradualFund] = useState<number>(1000000);
  const [gradualDay, setGradualDay] = useState<number>(6);

  // A-to-Z Ledger & Visual Cross-Verification Modal
  const [selectedTxId, setSelectedTxId] = useState<string>(LEDGER_TRANSACTIONS[0].id);
  const [publicAnonymized, setPublicAnonymized] = useState<boolean>(
    role.id === 'warga_beneficiary' || role.id === 'tim_audit_kap_freelance'
  );
  const [visualModalStep, setVisualModalStep] = useState<
    LedgerTransaction['steps'][number] | null
  >(null);

  const selectedTx =
    LEDGER_TRANSACTIONS.find((t) => t.id === selectedTxId) || LEDGER_TRANSACTIONS[0];

  // 70/20/10 + 25% inflation calculation
  const alokasi70 = Math.round(danaMasuk * 0.7);
  const operasional20 = Math.round(danaMasuk * 0.2);
  const founderCadangan10 = Math.round(danaMasuk * 0.1);
  const cadanganInflasi25 = Math.round(founderCadangan10 * 0.25);

  // Gradual Release calculation
  const releasedToday = Math.round((totalGradualFund * (gradualDay * 10)) / 100);
  const remainingGradual = totalGradualFund - releasedToday;

  const handleWithdraw = () => {
    if (isAccountFrozen) {
      setWithdrawMsg('DITOLAK (Layer 6 Freeze): Saldo sedang dibekukan. Ajukan Sanggah Video terlebih dahulu.');
      return;
    }
    const amt = Math.min(500000, balance);
    if (amt <= 0) return;
    setBalance((b) => b - amt);
    setWithdrawMsg(
      `Pencairan Rp ${amt.toLocaleString('id-ID')} berstatus: Verifikasi AI → In-Transit → Berhasil Dicairkan (0% Potongan).`
    );
    onQueueOfflineAction('E-Wallet Pencairan', `Tarik dana Rp ${amt.toLocaleString('id-ID')}`);
  };

  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-semibold text-cyan-400">
          Engine 01 &amp; Payment System · Zero-Leakage Escrow
        </p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
          Keuangan, E-Wallet, Skema 70/20/10 &amp; Ledger A-to-Z
        </h2>
      </div>

      {/* 1. E-Wallet Pribadi & Pencairan */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Personal Income &amp; E-Wallet Tracker ({role.shortName})</span>
            {isAccountFrozen && (
              <span className="inline-flex items-center gap-1 text-red-400 font-bold">
                <Lock className="w-3.5 h-3.5" /> DIBEKUKAN LAYER 6
              </span>
            )}
          </div>
          <p className="text-3xl font-extrabold font-mono text-white tabular-nums">
            Rp {balance.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-emerald-400">
            Insentif Harian: Rp {role.dailyIncentive.toLocaleString('id-ID')} · Absensi Biometrik
            Tervalidasi 100%
          </p>
          {withdrawMsg && (
            <p
              className={`text-xs mt-2 p-2.5 rounded-lg border ${
                isAccountFrozen
                  ? 'bg-red-950/60 border-red-500/40 text-red-200'
                  : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
              }`}
            >
              {withdrawMsg}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs">
            <p className="text-slate-400">SLA Pencairan</p>
            <p className="font-mono font-bold text-cyan-400">24 Menit (Real-Time)</p>
          </div>
          <button
            type="button"
            onClick={handleWithdraw}
            className={`px-5 py-3 rounded-lg text-xs font-bold cursor-pointer ${
              isAccountFrozen
                ? 'bg-red-900/50 border border-red-500 text-red-200'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            Tarik / Cairkan Dana Rp 500rb
          </button>
        </div>
      </div>

      {/* 2. Kalkulator 70/20/10 & Simulator Gradual Release 10%/hari */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kalkulator Skema Keuangan 70/20/10 & Mark-up 25% */}
        <div className="lg:col-span-6 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">
              Kalkulator Skema Keuangan 70/20/10 &amp; Mark-up Inflasi 25%
            </h3>
            <p className="text-xs text-slate-400">
              Simulasi pembagian dana masuk transparan sesuai konstitusi ekosistem Island Odyssey.
            </p>
          </div>

          <div>
            <label
              htmlFor="dana-masuk-input"
              className="block text-xs font-semibold text-slate-300 mb-1.5"
            >
              Input Total Dana Masuk (Rp)
            </label>
            <input
              id="dana-masuk-input"
              type="number"
              min={1000000}
              step={5000000}
              value={danaMasuk}
              onChange={(e) => setDanaMasuk(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3.5 py-2 font-mono text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
            {/* Pie Chart SVG */}
            <svg viewBox="0 0 120 120" className="w-32 h-32 shrink-0" aria-label="Pie 70 20 10">
              <circle cx="60" cy="60" r="44" fill="none" stroke="#1e293b" strokeWidth="22" />
              {/* 70% */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#10b981"
                strokeWidth="22"
                strokeDasharray="193.5 276.5"
                transform="rotate(-90 60 60)"
              />
              {/* 20% */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="22"
                strokeDasharray="55.3 276.5"
                strokeDashoffset="-193.5"
                transform="rotate(-90 60 60)"
              />
              {/* 10% */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="22"
                strokeDasharray="27.7 276.5"
                strokeDashoffset="-248.8"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="63" textAnchor="middle" className="fill-white text-[10px] font-bold font-mono">
                70/20/10
              </text>
            </svg>

            <div className="space-y-2 text-xs flex-1 w-full">
              <div className="rounded-lg bg-slate-950 border border-emerald-500/30 p-2.5 flex justify-between">
                <span className="text-emerald-300 font-semibold">70% Penerima (0% Potongan)</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  Rp {alokasi70.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="rounded-lg bg-slate-950 border border-cyan-500/30 p-2.5 flex justify-between">
                <span className="text-cyan-300 font-semibold">20% Operasional Maksimal</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  Rp {operasional20.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="rounded-lg bg-slate-950 border border-amber-500/30 p-2.5 space-y-1">
                <div className="flex justify-between">
                  <span className="text-amber-300 font-semibold">10% Founder + Cadangan</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    Rp {founderCadangan10.toLocaleString('id-ID')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Termasuk Buffer Inflasi 25%: Rp {cadanganInflasi25.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulator Gradual Release Model (10% per hari) */}
        <div className="lg:col-span-6 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white">
                Simulator Gradual Release Model (10% / Hari)
              </h3>
              <p className="text-xs text-slate-400">
                Pencairan bertahap 10% per hari selama 10 hari untuk menjaga ketahanan ekonomi warga.
              </p>
            </div>
            <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Total Alokasi Warga (Rp)</label>
              <input
                type="number"
                step={100000}
                min={100000}
                value={totalGradualFund}
                onChange={(e) => setTotalGradualFund(Math.max(100000, Number(e.target.value)))}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 font-mono text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Hari Pencairan ke-{gradualDay} / 10 ({gradualDay * 10}%)
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={gradualDay}
                onChange={(e) => setGradualDay(Number(e.target.value))}
                className="w-full accent-emerald-500 mt-2 cursor-pointer"
              />
            </div>
          </div>

          {/* 10-Day Bar Visualization */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all"
                style={{ width: `${gradualDay * 10}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
                <p className="text-slate-400">Dana Sudah Cair ({gradualDay * 10}%)</p>
                <p className="text-base font-extrabold font-mono text-emerald-400 tabular-nums mt-0.5">
                  Rp {releasedToday.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
                <p className="text-slate-400">Sisa Saldo Escrow Terjadwal</p>
                <p className="text-base font-extrabold font-mono text-amber-300 tabular-nums mt-0.5">
                  Rp {remainingGradual.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LEDGER HISTORIS TRANSAKSI DIGITAL A-TO-Z (SHOPEE-STYLE TIMELINE + CCTV/DRONE) */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Ledger Historis Transaksi Digital End-to-End A-to-Z (Shopee-Style Audit Trail)
            </h3>
            <p className="text-xs text-slate-400">
              Pusat/Escrow → Mitra/Diplomat → Hub Armada → Posko Regional → Staff → Warga (248
              Kategori)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPublicAnonymized((v) => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer whitespace-nowrap ${
              publicAnonymized
                ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            {publicAnonymized ? 'Mode Layer 5: Identitas Warga Anonim' : 'Mode Audit Internal Penuh'}
          </button>
        </div>

        {/* Transaction Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {LEDGER_TRANSACTIONS.map((tx) => (
            <button
              key={tx.id}
              type="button"
              onClick={() => setSelectedTxId(tx.id)}
              className={`text-left rounded-lg border p-3.5 transition-colors cursor-pointer ${
                tx.id === selectedTx.id
                  ? 'bg-slate-950 border-cyan-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold text-cyan-400">{tx.id}</span>
                <span
                  className={`font-semibold ${
                    tx.slaStatus === 'Frozen'
                      ? 'text-red-400'
                      : tx.slaStatus === 'Warning SLA'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {tx.slaStatus}
                </span>
              </div>
              <p className="text-xs font-bold text-white mt-1 line-clamp-1">{tx.programName}</p>
              <p className="text-xs font-mono text-emerald-400 mt-1">{tx.amount}</p>
            </button>
          ))}
        </div>

        {/* Selected Transaction Immutable Metadata */}
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block">Hash SHA-256 Immutable</span>
            <span className="font-mono text-[11px] text-cyan-300 break-all">{selectedTx.sha256}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Timestamp &amp; Koordinat GPS Terkunci</span>
            <span className="font-mono text-white">
              {selectedTx.timestamp} {selectedTx.timezone} · {selectedTx.coordinates}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Kategori &amp; SLA</span>
            <span className="font-semibold text-emerald-400">
              {selectedTx.category} · {selectedTx.slaStatus}
            </span>
          </div>
        </div>

        {/* Vertical Shopee-Style Timeline */}
        <div className="space-y-4 pl-2">
          {selectedTx.steps.map((step, idx) => (
            <div key={step.stage} className="relative flex gap-4">
              {/* Vertical connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                    step.status === 'completed'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : step.status === 'flagged'
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-amber-500/20 border-amber-500 text-amber-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                {idx < selectedTx.steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-slate-800 my-1" />
                )}
              </div>

              <div className="flex-1 rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-white">{step.stage}</p>
                    <p className="text-xs text-cyan-300">
                      {publicAnonymized && idx === selectedTx.steps.length - 1
                        ? 'Penerima Manfaat Terverifikasi (Identitas Dianonimkan Layer 5)'
                        : step.actor}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="text-slate-400">{step.timestamp}</span>
                    <span className="text-emerald-400 font-bold">{step.progress}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300">{step.manualNote}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <span className="font-mono text-slate-400">
                    GPS: {step.gps} · SLA: {step.sla}
                  </span>
                  <button
                    type="button"
                    onClick={() => setVisualModalStep(step)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-600/20 hover:bg-cyan-600/35 border border-cyan-500/50 text-cyan-300 font-semibold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> Bandingkan Bukti Visual (CCTV &amp; Drone)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Verification Modal: Manual vs CCTV Hub vs Drone Footage */}
      {visualModalStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/50 rounded-xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-cyan-400">CROSS-VERIFICATION VISUAL AUDIT</p>
                <h4 className="text-sm font-bold text-white">{visualModalStep.stage}</h4>
              </div>
              <button
                type="button"
                onClick={() => setVisualModalStep(null)}
                className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Tutup modal bukti visual"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 space-y-2">
                <p className="font-bold text-white">1. Input Manual Petugas</p>
                <p className="text-slate-300 leading-relaxed">{visualModalStep.manualNote}</p>
                <p className="font-mono text-[11px] text-slate-400">{visualModalStep.gps}</p>
              </div>
              <div className="rounded-lg bg-slate-950 border border-cyan-800/50 p-3.5 space-y-2">
                <p className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> 2. Rekaman CCTV Hub
                </p>
                <div className="h-20 rounded bg-gradient-to-br from-slate-800 to-cyan-950 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-cyan-200 p-2 text-center">
                  [FRAME CCTV TERVERIFIKASI · {visualModalStep.timestamp}]
                </div>
                <p className="text-slate-300 leading-relaxed">{visualModalStep.cctvStatus}</p>
              </div>
              <div className="rounded-lg bg-slate-950 border border-emerald-800/50 p-3.5 space-y-2">
                <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> 3. Kamera Drone Lapangan
                </p>
                <div className="h-20 rounded bg-gradient-to-br from-slate-800 to-emerald-950 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-emerald-200 p-2 text-center">
                  [UAV AERIAL FOOTAGE · MATCH 99.4%]
                </div>
                <p className="text-slate-300 leading-relaxed">{visualModalStep.droneStatus}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

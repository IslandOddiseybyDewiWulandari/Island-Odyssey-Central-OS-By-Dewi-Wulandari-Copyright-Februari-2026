import React, { useRef, useState } from 'react';
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Download,
  FileText,
  Gavel,
  Lock,
  Printer,
  ShieldAlert,
  Shuffle,
  Video,
  X,
} from 'lucide-react';
import { COPYRIGHT_TEXT } from '../../data/mockEcosystem';
import { RoleDefinition } from '../../types/os';

interface MonitoringSixLayerModuleProps {
  role: RoleDefinition;
  isAccountFrozen: boolean;
  onToggleFreeze: () => void;
  onQueueOfflineAction: (module: string, summary: string) => void;
}

const SIX_LAYERS = [
  {
    layer: 'Layer 1: Operational Control',
    actor: 'Tim Eksekutor Harian & Staff Ops',
    freq: 'Harian (<24 Jam)',
    status: 'Baik',
    progress: 96,
    timestamp: '2026-11-14 09:30 WITA',
    detail: 'Daily task tracker, absensi hourly/daily, foto & video ber-GPS.',
  },
  {
    layer: 'Layer 2: Internal Verification',
    actor: 'Tim Verifikasi Internal',
    freq: 'Mingguan',
    status: 'Baik',
    progress: 91,
    timestamp: '2026-11-14 09:10 WITA',
    detail: 'Biometric + GPS Geofencing, cek duplikasi & sampling acak 10–20%.',
  },
  {
    layer: 'Layer 3: External Audit (KAP)',
    actor: 'Kantor Akuntan Publik Independen',
    freq: 'Triwulan / Tahunan',
    status: 'Baik (Opini WTP)',
    progress: 100,
    timestamp: '2026-11-10 17:00 WIB',
    detail: 'Audit keuangan & operasional, immutable audit trail, ekspor PDF/CSV.',
  },
  {
    layer: 'Layer 4: Independent Freelance Auditors',
    actor: 'Auditor Independen (Surprise Audit)',
    freq: 'Insidental',
    status: 'Peringatan',
    progress: 78,
    timestamp: '2026-11-14 08:45 WITA',
    detail: 'Random assignment audit mendadak pada area berisiko tinggi (Krayan & Palu).',
  },
  {
    layer: 'Layer 5: Public Transparency Dashboard',
    actor: 'Publik & Komunitas Warga',
    freq: 'Real-Time',
    status: 'Baik',
    progress: 98,
    timestamp: '2026-11-14 09:42 WITA',
    detail: 'Shopee-style Timeline A-to-Z anonim & Whistleblowing warga sekitar.',
  },
  {
    layer: 'Layer 6: Sanction Mechanism',
    actor: 'Dewan Pengawas & Shadow Team',
    freq: 'Aktif Saat Pelanggaran',
    status: 'Aktif (3 Kasus)',
    progress: 100,
    timestamp: '2026-11-14 07:18 WITA',
    detail: 'System Freeze, SP1/SP2/SP3 otomatis, denda, blacklist & Video Direct Sanggah.',
  },
];

const INITIAL_ANOMALIES = [
  {
    id: 'FRD-101',
    title: 'Data Ganda NIK Penerima — Klaster NTT-04',
    severity: 'Tinggi',
    detail: 'Terdeteksi 2 pengajuan menggunakan hash biometrik identik pada rentang 12 menit.',
    status: 'Investigasi Layer 2',
  },
  {
    id: 'FRD-102',
    title: 'Transaksi Tidak Wajar Vendor Pipa — Palu',
    severity: 'Kritis',
    detail: 'Batch #077 gagal uji tekan QC (defect 14.8%). E-Wallet vendor otomatis dibekukan.',
    status: 'E-Wallet Frozen (L6)',
  },
  {
    id: 'FRD-103',
    title: 'Pengajuan Fiktif UMKM — Krayan',
    severity: 'Sedang',
    detail: 'Koordinat foto gudang berbeda 4.2 km dari geofence posko.',
    status: 'Audit Mendadak L4',
  },
];

export const MonitoringSixLayerModule: React.FC<MonitoringSixLayerModuleProps> = ({
  role,
  isAccountFrozen,
  onToggleFreeze,
  onQueueOfflineAction,
}) => {
  const [anomalies, setAnomalies] = useState(INITIAL_ANOMALIES);
  const [spLog, setSpLog] = useState<string[]>([
    'SP2-AUTO-2026-077 diterbitkan ke CV Baja Air Sejahtera (Escrow Terkunci Rp 64.000.000)',
  ]);
  const [sanggahModalOpen, setSanggahModalOpen] = useState(false);
  const [kronologi, setKronologi] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedReady, setRecordedReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [randomVerifier, setRandomVerifier] = useState<string | null>(null);
  const [sanggahDecision, setSanggahDecision] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleExportCsv = () => {
    const header = 'Layer,Actor,Frekuensi,Status,Progress,Timestamp,Watermark\n';
    const rows = SIX_LAYERS.map(
      (l) =>
        `"${l.layer}","${l.actor}","${l.freq}","${l.status}",${l.progress}%,"${l.timestamp}","${COPYRIGHT_TEXT.slice(
          0,
          75
        )}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KAP-Audit-6Layer-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onQueueOfflineAction('Audit KAP Layer 3', 'Ekspor laporan resmi KAP (.CSV) berhasil');
  };

  const handleIssueSp = (spLevel: 'SP1' | 'SP2' | 'SP3' | 'Blacklist') => {
    const msg = `${spLevel}-AUTO-${Math.floor(100 + Math.random() * 900)} diterbitkan oleh ${
      role.shortName
    } pada ${new Date().toLocaleTimeString('id-ID')} WITA`;
    setSpLog((prev) => [msg, ...prev]);
    onQueueOfflineAction('Layer 6 Sanksi', msg);
  };

  const startDirectVideoCamera = async () => {
    setCameraError(null);
    setRecordedReady(false);
    setIsRecording(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } else {
        setCameraError('Kamera browser tidak tersedia; menggunakan mode simulasi Direct Video.');
      }
    } catch {
      setCameraError(
        'Akses kamera dibatasi izin browser; menggunakan rekaman video terenkripsi simulasi.'
      );
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordedReady(true);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  const submitSanggah = (e: React.FormEvent) => {
    e.preventDefault();
    const verifiers = [
      'Tim Verifikasi Acak #V-09 (Jakarta) + Auditor Independen #F-14',
      'Panel Verifikasi Acak #V-03 (Surabaya) + Shadow Reviewer #S-02',
    ];
    const picked = verifiers[Math.floor(Math.random() * verifiers.length)];
    setRandomVerifier(picked);
    setSanggahDecision(
      'Berkas Sanggah + Video Direct Record + Log CCTV/Drone diterima untuk tinjauan terbuka.'
    );
    onQueueOfflineAction('Sanggah Layer 6', `Pengajuan sanggah dikirim ke ${picked}`);
  };

  return (
    <div className="space-y-6">
      {/* Header + Export KAP */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-cyan-400">
            Zero-Leakage Governance · Flow Upward &amp; Action Loop
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            Monitoring System 6-Layer &amp; Sanction Vault
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
          >
            <Download className="w-4 h-4" /> Ekspor Laporan KAP (CSV)
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Cetak PDF Resmi
          </button>
          <button
            type="button"
            onClick={() => setSanggahModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
          >
            <Video className="w-4 h-4" /> Ajukan Sanggah (Direct Video)
          </button>
        </div>
      </div>

      {/* Ringkasan Kasus & Tindakan (4 KPI Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Kasus Bulan Ini', val: '14', tone: 'text-white' },
          { label: 'Kasus Selesai & Terpublikasi', val: '11', tone: 'text-emerald-400' },
          { label: 'Dalam Proses Verifikasi', val: '3', tone: 'text-amber-400' },
          { label: 'Akun Diblacklist Aktif', val: '2', tone: 'text-red-400' },
        ].map((c) => (
          <div key={c.label} className="rounded-xl bg-slate-900 border border-slate-800 p-4">
            <p className="text-xs text-slate-400">{c.label}</p>
            <p className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums mt-1 ${c.tone}`}>
              {c.val}
            </p>
          </div>
        ))}
      </div>

      {/* Tabel Status 6 Layer Monitoring */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <h3 className="text-sm font-bold text-white">Tabel Status 6-Layer Monitoring Governance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 pr-4">Layer &amp; Pelaksana</th>
                <th className="py-2.5 pr-4">Frekuensi</th>
                <th className="py-2.5 pr-4">Status</th>
                <th className="py-2.5 pr-4 w-44">Progress</th>
                <th className="py-2.5">Timestamp Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {SIX_LAYERS.map((l) => (
                <tr key={l.layer} className="hover:bg-slate-800/30">
                  <td className="py-3 pr-4">
                    <p className="font-bold text-white">{l.layer}</p>
                    <p className="text-[11px] text-slate-400">{l.actor}</p>
                  </td>
                  <td className="py-3 pr-4 text-slate-300 whitespace-nowrap">{l.freq}</td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        l.status.includes('Peringatan') || l.status.includes('Aktif')
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            l.progress >= 90 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${l.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-white tabular-nums">{l.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {l.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Middle Row: Donut Chart Verifikasi Data + KAP Widget + Fraud Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Donut Progress Verifikasi Data */}
        <div className="lg:col-span-4 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Progress Verifikasi Data</h3>
          <div className="flex items-center gap-5">
            <svg viewBox="0 0 120 120" className="w-32 h-32 shrink-0" aria-label="Donut Verifikasi">
              <circle cx="60" cy="60" r="44" fill="none" stroke="#1e293b" strokeWidth="16" />
              {/* 82% Terverifikasi */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#10b981"
                strokeWidth="16"
                strokeDasharray="226.7 276.5"
                strokeDashoffset="0"
                transform="rotate(-90 60 60)"
              />
              {/* 13% Dalam Proses */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="16"
                strokeDasharray="35.9 276.5"
                strokeDashoffset="-226.7"
                transform="rotate(-90 60 60)"
              />
              {/* 5% Belum Terverifikasi */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#ef4444"
                strokeWidth="16"
                strokeDasharray="13.8 276.5"
                strokeDashoffset="-262.6"
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="63" textAnchor="middle" className="fill-white text-[13px] font-bold font-mono">
                82%
              </text>
            </svg>
            <div className="space-y-2 text-xs flex-1">
              <div className="flex justify-between">
                <span className="text-emerald-400">Terverifikasi</span>
                <span className="font-mono font-bold text-white">82%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-400">Dalam Proses</span>
                <span className="font-mono font-bold text-white">13%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Belum Verifikasi</span>
                <span className="font-mono font-bold text-white">5%</span>
              </div>
            </div>
          </div>

          {/* Widget Laporan Audit Terbaru (KAP) */}
          <div className="rounded-lg bg-slate-950 border border-emerald-500/30 p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Laporan Audit KAP Terbaru
              </span>
              <span className="font-mono text-slate-400">10 Nov 2026</span>
            </div>
            <p className="text-sm font-extrabold text-white">
              Opini Audit: Wajar Tanpa Pengecualian (WTP)
            </p>
            <p className="text-[11px] text-slate-400">
              KAP Independen · Sampling 20% acak 3T &amp; Non-3T tervalidasi.
            </p>
          </div>
        </div>

        {/* Panel Notifikasi Fraud / Anomali Realtime */}
        <div className="lg:col-span-4 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" /> Panel Notifikasi Fraud &amp; Anomali
          </h3>
          <div className="space-y-2.5">
            {anomalies.map((a) => (
              <div
                key={a.id}
                className="rounded-lg bg-slate-950 border border-red-500/30 p-3 space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-red-400">
                    {a.id} · {a.severity}
                  </span>
                  <span className="text-amber-300 font-semibold">{a.status}</span>
                </div>
                <p className="text-xs font-bold text-white">{a.title}</p>
                <p className="text-[11px] text-slate-400">{a.detail}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const nextId = `FRD-${Math.floor(200 + Math.random() * 800)}`;
              setAnomalies((prev) => [
                {
                  id: nextId,
                  title: 'Deteksi Ketidaksesuaian CCTV Hub vs Input Manual',
                  severity: 'Tinggi',
                  detail: 'Selisih berat muatan 180 kg pada Posko Maluku terdeteksi otomatis.',
                  status: 'Auto-Flagged L6',
                },
                ...prev.slice(0, 2),
              ]);
            }}
            className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 cursor-pointer"
          >
            Simulasikan Deteksi Anomali Baru
          </button>
        </div>

        {/* Layer 6 Sanction Execution & System Freeze */}
        <div className="lg:col-span-4 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3.5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Gavel className="w-4 h-4 text-amber-400" /> Panel Sanksi Otomatis (Layer 6)
          </h3>
          <p className="text-xs text-slate-400">
            Eksekusi pembekuan akun sementara (System Freeze) dan penerbitan SP1/SP2/SP3 otomatis.
          </p>

          <div className="flex flex-wrap gap-2">
            {(['SP1', 'SP2', 'SP3', 'Blacklist'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => handleIssueSp(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  lvl === 'Blacklist'
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300'
                }`}
              >
                Terbitkan {lvl}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggleFreeze}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
              isAccountFrozen
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-red-600/20 hover:bg-red-600/30 border border-red-500/60 text-red-300'
            }`}
          >
            <Lock className="w-4 h-4" />
            {isAccountFrozen
              ? 'Buka Beku (Unfreeze) E-Wallet Demo'
              : 'Aktifkan System Freeze E-Wallet Demo'}
          </button>

          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1.5 max-h-36 overflow-y-auto">
            <p className="text-[11px] font-semibold text-slate-400">Log Surat Peringatan Otomatis:</p>
            {spLog.map((s, idx) => (
              <p key={idx} className="text-[11px] font-mono text-amber-200">
                • {s}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Video Record Sanggah Modal */}
      {sanggahModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl bg-slate-900 border border-amber-500/50 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Mekanisme Sanggah Sengketa &amp; Direct Video Record
                </h3>
                <p className="text-[11px] text-amber-300">
                  Rekam penjelasan langsung melalui kamera (bukan upload galeri) · Verifikator Acak
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopRecording();
                  setSanggahModalOpen(false);
                }}
                className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Tutup modal sanggah"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitSanggah} className="p-5 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Kronologi Sanggahan
                </label>
                <textarea
                  rows={3}
                  required
                  value={kronologi}
                  onChange={(e) => setKronologi(e.target.value)}
                  placeholder="Jelaskan kronologi kejadian, nomor batch/transaksi, dan alasan sanggahan terhadap temuan/freeze..."
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Direct Camera Recording Box */}
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <Camera className="w-4 h-4" /> Kamera Direct Video Record
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {isRecording
                      ? 'MEREKAM LANGSUNG...'
                      : recordedReady
                      ? 'VIDEO TERENKRIPSI SIAP'
                      : 'Siap Rekam'}
                  </span>
                </div>

                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className="w-full h-36 rounded bg-slate-900 object-cover border border-slate-800"
                />

                {cameraError && <p className="text-[11px] text-amber-300">{cameraError}</p>}

                <div className="flex items-center gap-2">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startDirectVideoCamera}
                      className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Mulai Rekam Video Langsung
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Selesai Rekam &amp; Kunci Hash
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer flex items-center justify-center gap-2"
              >
                <Shuffle className="w-4 h-4" /> Kirim ke Tim Verifikator Acak (Random Assignment)
              </button>

              {randomVerifier && sanggahDecision && (
                <div className="rounded-lg bg-emerald-950/60 border border-emerald-500/40 p-3.5 space-y-1 text-xs">
                  <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Assigned: {randomVerifier}
                  </p>
                  <p className="text-slate-200">{sanggahDecision}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

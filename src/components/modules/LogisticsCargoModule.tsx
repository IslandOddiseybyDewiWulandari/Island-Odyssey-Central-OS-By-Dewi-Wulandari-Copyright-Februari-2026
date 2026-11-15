import React, { useState } from 'react';
import {
  Anchor,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Lock,
  Plane,
  Plus,
  QrCode,
  Radio,
  RefreshCw,
  ShieldAlert,
  Sprout,
  Truck,
  Wallet,
} from 'lucide-react';
import { FLEET_UNITS, MATERIAL_BATCHES } from '../../data/mockEcosystem';
import { FleetUnit, MaterialBatch, RoleDefinition } from '../../types/os';

interface LogisticsCargoModuleProps {
  role: RoleDefinition;
  onQueueOfflineAction: (module: string, summary: string) => void;
}

export const LogisticsCargoModule: React.FC<LogisticsCargoModuleProps> = ({
  role,
  onQueueOfflineAction,
}) => {
  const defaultMode: 'Laut' | 'Darat' | 'Udara' =
    role.id === 'armada_darat'
      ? 'Darat'
      : role.id === 'armada_udara'
      ? 'Udara'
      : 'Laut';

  const [fleetMode, setFleetMode] = useState<'Laut' | 'Darat' | 'Udara'>(defaultMode);
  const [fleets, setFleets] = useState<FleetUnit[]>(FLEET_UNITS);
  const [qrScanned, setQrScanned] = useState<string | null>(null);
  const [mentorDone, setMentorDone] = useState<Record<string, boolean>>({});
  const [pickupAccepted, setPickupAccepted] = useState<Record<string, boolean>>({});

  // QC Material Batches state
  const [batches, setBatches] = useState<MaterialBatch[]>(MATERIAL_BATCHES);
  const [qcBatchInput, setQcBatchInput] = useState('BATCH-SOL-2026-114');
  const [qcConcreteMpa, setQcConcreteMpa] = useState('30.5');
  const [qcSolarVolt, setQcSolarVolt] = useState('49.2');
  const [qcLeakPass, setQcLeakPass] = useState<'Passed' | 'Rejected'>('Passed');

  const modeFleets = fleets.filter((f) => f.mode === fleetMode);
  const activeUnit = modeFleets[0] || fleets[0];

  const handleAddFleetUnit = () => {
    const num = fleets.length + 1;
    const newUnit: FleetUnit = {
      id: `FLT-${fleetMode.toUpperCase().slice(0, 3)}-0${num}`,
      mode: fleetMode,
      callsign:
        fleetMode === 'Laut'
          ? `KM Perintis Care 0${num}`
          : fleetMode === 'Darat'
          ? `Truk Logistik 4x4-${num}`
          : `UAV Cargo Express-0${num}`,
      tieRegId: `TIE-${fleetMode.slice(0, 3).toUpperCase()}-2026-0${num}`,
      loraStatus: 'Connected (98 dB)',
      route: 'Hub Surabaya → Posko 3T Kupang',
      eta: '6 Jam 15 Menit',
      cargoMission: 'Cargo of Care: Obat Esensial, Solar Inverter, & Alat Sekolah',
      payloadKg: fleetMode === 'Udara' ? 240 : 6500,
      qrManifestId: `QR-${fleetMode.slice(0, 3).toUpperCase()}-2026-${num}10`,
      mentorTopic: 'Pelatihan Koperasi & Digitalisasi Pembukuan Warga',
      pickupRequest: 'Penjemputan 1.5 Ton Hasil Panen UMKM Desa Mitra',
      driverOrPilot: 'Petugas Cadangan UARS',
      status: 'Loading Hub',
      coordinates: '-9.6500, 120.2640',
    };
    setFleets((prev) => [newUnit, ...prev]);
    onQueueOfflineAction('Fleet TIE', `Unit baru ${newUnit.callsign} didaftarkan ke Armada ${fleetMode}`);
  };

  const handleWeatherReroute = (id: string) => {
    setFleets((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: 'En Route',
              route: `${u.route} (Rute Alternatif Aman Cuaca)`,
              driverOrPilot: `${u.driverOrPilot} + Pilot/Driver Rolling`,
            }
          : u
      )
    );
    onQueueOfflineAction('Cargo of Care', `Pengalihan rute darurat & rolling awak unit ${id}`);
  };

  const handleSubmitQcTest = (e: React.FormEvent) => {
    e.preventDefault();
    setBatches((prev) =>
      prev.map((b) =>
        b.batchId === qcBatchInput
          ? {
              ...b,
              status: qcLeakPass,
              escrowLocked: qcLeakPass === 'Rejected',
              defectRate: qcLeakPass === 'Rejected' ? 12.5 : 0.6,
              testMetric: `Beton ${qcConcreteMpa} MPa · Solar ${qcSolarVolt}V · Uji Air: ${qcLeakPass}`,
            }
          : b
      )
    );
    onQueueOfflineAction(
      'QC Material Layer 6',
      `Batch ${qcBatchInput} berstatus ${qcLeakPass}${
        qcLeakPass === 'Rejected' ? ' (Escrow Vendor Dikunci Otomatis!)' : ''
      }`
    );
  };

  return (
    <div className="space-y-7">
      {/* Header + Mode Switcher (Armada Laut / Darat / Udara) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-cyan-400">
            Engine 07 Logistics &amp; Engine 02 TIE · Cargo of Care
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            Fleet Command Master ({fleetMode}) &amp; QC Material Lab
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['Laut', 'Darat', 'Udara'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setFleetMode(m)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                fleetMode === m
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              {m === 'Laut' && <Anchor className="w-3.5 h-3.5" />}
              {m === 'Darat' && <Truck className="w-3.5 h-3.5" />}
              {m === 'Udara' && <Plane className="w-3.5 h-3.5" />}
              <span>Armada {m}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={handleAddFleetUnit}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Daftar / Tambah Unit Armada {fleetMode} TIE
          </button>
        </div>
      </div>

      {/* Fleet Header Status Bar */}
      <div className="rounded-xl bg-slate-900 border border-cyan-800/50 p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-slate-400 block">Status Aktif Armada {fleetMode} UARS</span>
          <span className="font-bold text-emerald-400">{activeUnit.status} · Siap Misi 3T</span>
        </div>
        <div>
          <span className="text-slate-400 block">ID Registrasi TIE</span>
          <span className="font-mono font-bold text-white">{activeUnit.tieRegId}</span>
        </div>
        <div>
          <span className="text-slate-400 block">
            ID {fleetMode === 'Laut' ? 'Kapal' : fleetMode === 'Darat' ? 'Truk' : 'Drone/Pesawat'}
          </span>
          <span className="font-mono font-bold text-cyan-300">{activeUnit.callsign}</span>
        </div>
        <div>
          <span className="text-slate-400 block">Status Koneksi LoRa</span>
          <span className="font-mono font-bold text-amber-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" /> {activeUnit.loraStatus}
          </span>
        </div>
      </div>

      {/* Section 1: Interactive Fleet Map & Route Tracking + Unit List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white">
            1. Interactive Fleet Map &amp; Route Tracking ({fleetMode})
          </h3>
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-4">
            <svg viewBox="0 0 500 180" className="w-full h-40" aria-label="Peta Rute Armada 3T">
              <rect width="500" height="180" rx="8" fill="#061423" />
              {/* Route Curve */}
              <path
                d="M 55 120 Q 190 40 310 95 T 445 65"
                fill="none"
                stroke={fleetMode === 'Laut' ? '#06b6d4' : fleetMode === 'Darat' ? '#10b981' : '#f59e0b'}
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              {[
                { x: 55, y: 120, name: 'Hub Utama' },
                { x: 245, y: 74, name: 'Titik Cargo of Care' },
                { x: 445, y: 65, name: 'Posko 3T / Jemput Panen' },
              ].map((pt) => (
                <g key={pt.name}>
                  <circle cx={pt.x} cy={pt.y} r="6" fill="#10b981" />
                  <circle cx={pt.x} cy={pt.y} r="12" fill="#10b981" fillOpacity="0.2" />
                  <text x={pt.x} y={pt.y + 18} textAnchor="middle" className="fill-slate-200 text-[9px] font-semibold">
                    {pt.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="text-xs text-slate-300">
            Rute Aktif: <span className="font-semibold text-white">{activeUnit.route}</span> ·
            Koordinat <span className="font-mono text-cyan-400">{activeUnit.coordinates}</span>
          </p>
        </div>

        {/* Section 2: Misi Cargo of Care & Modal */}
        <div className="lg:col-span-6 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white">
            2. Misi Cargo of Care &amp; Modal ({fleetMode})
          </h3>
          <div className="space-y-3">
            {modeFleets.map((unit) => (
              <div
                key={unit.id}
                className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white">
                    {unit.callsign} ({unit.driverOrPilot})
                  </span>
                  <span className="font-mono text-amber-300">ETA: {unit.eta}</span>
                </div>
                <p className="text-slate-300">{unit.cargoMission}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="font-mono text-cyan-400">
                    Muatan: {unit.payloadKg.toLocaleString('id-ID')} kg · {unit.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleWeatherReroute(unit.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Alihkan Rute / Rolling Awak
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sections 3, 4, 5, 6 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Section 3: Kurir Mentor & Task Pendampingan */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" /> 3. Kurir Mentor &amp; Task
            Pendampingan UARS
          </h3>
          {modeFleets.map((u) => {
            const done = mentorDone[u.id];
            return (
              <div
                key={u.id}
                className="rounded-lg bg-slate-950 border border-slate-800 p-3 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-bold text-white">{u.mentorTopic}</p>
                  <p className="text-slate-400">PIC Kurir: {u.driverOrPilot}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMentorDone((p) => ({ ...p, [u.id]: true }));
                    onQueueOfflineAction('Kurir Mentor UARS', `Checklist selesai: ${u.mentorTopic}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                    done
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                >
                  {done ? 'Selesai' : 'Tandai Selesai'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Section 4: Pasar & Penjemputan Tani/UMKM */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sprout className="w-4 h-4 text-amber-400" /> 4. Pasar &amp; Penjemputan Tani / UMKM
          </h3>
          {modeFleets.map((u) => {
            const acc = pickupAccepted[u.id];
            return (
              <div
                key={u.id}
                className="rounded-lg bg-slate-950 border border-slate-800 p-3 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-bold text-white">{u.pickupRequest}</p>
                  <p className="text-slate-400">Tujuan: Seoul Bridge &amp; Pasar Lokal</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPickupAccepted((p) => ({ ...p, [u.id]: true }));
                    onQueueOfflineAction('Jemput UMKM', `Konfirmasi jemput: ${u.pickupRequest}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap cursor-pointer ${
                    acc
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {acc ? 'Dijadwalkan' : 'Jemput Muatan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Section 5: Digital QR Scanner & Manifest */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-cyan-400" /> 5. Digital QR Scanner &amp; Manifest
            (Online / LoRa)
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {modeFleets.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => {
                  setQrScanned(
                    `Manifest ${u.qrManifestId} tervalidasi! (${u.payloadKg} kg · Hash SHA-256 Terkunci via ${u.loraStatus})`
                  );
                  onQueueOfflineAction('QR Manifest', `Scan sukses ${u.qrManifestId}`);
                }}
                className="px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-cyan-500/50 text-xs font-mono font-bold text-cyan-300 cursor-pointer"
              >
                Scan {u.qrManifestId}
              </button>
            ))}
          </div>
          {qrScanned && (
            <p className="text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg p-3">
              {qrScanned}
            </p>
          )}
        </div>

        {/* Section 6: Pendapatan, Bagi Hasil & Insentif UARS */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-400" /> 6. Pendapatan, Bagi Hasil &amp;
            Insentif UARS
          </h3>
          <div className="grid grid-cols-3 gap-2.5 text-xs">
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
              <span className="text-slate-400 block">Gaji Pokok UARS</span>
              <span className="font-mono font-bold text-white">Rp 4.500.000</span>
            </div>
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
              <span className="text-slate-400 block">Insentif Cargo</span>
              <span className="font-mono font-bold text-emerald-400">Rp 2.850.000</span>
            </div>
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
              <span className="text-slate-400 block">Bagi Hasil UMKM</span>
              <span className="font-mono font-bold text-cyan-400">Rp 1.600.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-MODUL QC KUALITAS BAHAN INFRASTRUKTUR */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-cyan-400" /> Sub-Modul Monitoring QC Kualitas
              Bahan &amp; Karantina Vendor (Layer 1, 2 &amp; 6)
            </h3>
            <p className="text-xs text-slate-400">
              Jika hasil uji ditolak (Rejected), sistem otomatis mengunci escrow vendor dan
              memicu penggantian stok.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Form Uji Kelayakan On-Site */}
          <form
            onSubmit={handleSubmitQcTest}
            className="lg:col-span-5 rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-3 text-xs"
          >
            <p className="font-bold text-cyan-300">Form Input Hasil Uji Kelayakan On-Site</p>
            <div>
              <label className="block text-slate-400 mb-1">Pilih Batch Material (Scan QR)</label>
              <select
                value={qcBatchInput}
                onChange={(e) => setQcBatchInput(e.target.value)}
                className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2 text-white"
              >
                {batches.map((b) => (
                  <option key={b.batchId} value={b.batchId}>
                    {b.batchId} — {b.vendor}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-400 mb-1">Kuat Tekan Beton (MPa)</label>
                <input
                  type="text"
                  value={qcConcreteMpa}
                  onChange={(e) => setQcConcreteMpa(e.target.value)}
                  className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2 font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Output Solar Panel (V)</label>
                <input
                  type="text"
                  value={qcSolarVolt}
                  onChange={(e) => setQcSolarVolt(e.target.value)}
                  className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-2 font-mono text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Keputusan Uji Kelayakan &amp; Air</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Passed', 'Rejected'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setQcLeakPass(st)}
                    className={`py-2 rounded font-bold border cursor-pointer ${
                      qcLeakPass === st
                        ? st === 'Passed'
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                          : 'bg-red-600/20 border-red-500 text-red-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    {st === 'Passed' ? 'Lolos (Approved)' : 'Tolak & Kunci Vendor'}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer"
            >
              Simpan Hasil Uji QC &amp; Sinkronkan
            </button>
          </form>

          {/* Material Log & Vendor Defect Rate Table */}
          <div className="lg:col-span-7 space-y-3">
            {batches.map((b) => (
              <div
                key={b.batchId}
                className="rounded-lg bg-slate-950 border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400">{b.batchId}</span>
                    <span className="text-slate-400">· {b.certCode}</span>
                    <span className="font-mono text-amber-300">Defect Rate: {b.defectRate}%</span>
                  </div>
                  <p className="font-bold text-white">{b.materialName}</p>
                  <p className="text-slate-400">
                    Vendor: {b.vendor} · {b.testMetric}
                  </p>
                </div>

                <div className="shrink-0 text-right space-y-1">
                  <span
                    className={`inline-flex items-center gap-1 font-bold ${
                      b.status === 'Passed'
                        ? 'text-emerald-400'
                        : b.status === 'Rejected'
                        ? 'text-red-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {b.status === 'Passed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {b.status === 'Rejected' && <ShieldAlert className="w-3.5 h-3.5" />}
                    {b.status === 'Passed'
                      ? 'Lolos QC'
                      : b.status === 'Rejected'
                      ? 'Ditolak / Karantina'
                      : 'Proses Uji'}
                  </span>
                  {b.escrowLocked && (
                    <p className="text-[11px] font-mono text-red-300 flex items-center justify-end gap-1">
                      <Lock className="w-3 h-3" /> Escrow Terkunci (L6)
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

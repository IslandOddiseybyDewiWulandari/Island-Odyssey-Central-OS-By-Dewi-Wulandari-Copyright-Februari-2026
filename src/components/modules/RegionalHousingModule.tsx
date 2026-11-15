import React, { useState } from 'react';
import {
  AlertTriangle,
  Building2,
  Download,
  Home,
  MapPin,
  Siren,
  Wrench,
} from 'lucide-react';
import { REGIONAL_NODES } from '../../data/mockEcosystem';
import { RoleDefinition } from '../../types/os';

interface RegionalHousingModuleProps {
  role: RoleDefinition;
  onOpenSos: () => void;
  onQueueOfflineAction: (module: string, summary: string) => void;
}

const SUBSIDI_RECIPIENTS = [
  { id: 'HUN-01', name: 'Yusuf Rihi', region: 'Sumba Timur (3T)', progress: 'Pondasi 100%, Struktur 50%, Atap 0%', status: 'Terverifikasi Biometrik' },
  { id: 'HUN-02', name: 'Amina Latuconsina', region: 'Maluku Tengah (3T)', progress: 'Pondasi 100%, Struktur 100%, Atap 80%', status: 'Terverifikasi Biometrik' },
  { id: 'HUN-03', name: 'Hendrik Wenda', region: 'Wamena, Papua (3T)', progress: 'Pondasi 100%, Struktur 40%, Atap 0%', status: 'Mode LoRa Valid' },
  { id: 'HUN-04', name: 'Siti Aminah', region: 'Palu Selatan (Non-3T)', progress: 'Selesai 100% (Huntap Layak)', status: 'Serah Terima QR' },
];

export const RegionalHousingModule: React.FC<RegionalHousingModuleProps> = ({
  role,
  onOpenSos,
  onQueueOfflineAction,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(REGIONAL_NODES[0].id);
  const [monitorSubTab, setMonitorSubTab] = useState<'infrastruktur' | 'non_infrastruktur'>(
    'infrastruktur'
  );

  // Simulator RAB Kota Mandiri 3T (Low 345M, Mid 650M, High 850M)
  const [rabTier, setRabTier] = useState<'Low' | 'Mid' | 'High'>('Mid');

  // Warga Subsidi Housing Form & Damage Report
  const [wargaName, setWargaName] = useState('');
  const [wargaNik, setWargaNik] = useState('');
  const [wargaZone, setWargaZone] = useState<'3T' | 'Non-3T'>('3T');
  const [wargaIncome, setWargaIncome] = useState('Rp 1.800.000 / bulan');
  const [housingSubmitted, setHousingSubmitted] = useState<string | null>(null);
  const [damageInput, setDamageInput] = useState('');
  const [damageSubmitted, setDamageSubmitted] = useState<string | null>(null);

  const activeNode = REGIONAL_NODES.find((n) => n.id === selectedNodeId) || REGIONAL_NODES[0];

  const rabSpecs = {
    Low: {
      budget: 'Rp 345M',
      units: '18 Unit Rumah Tahan Gempa + 1 Microgrid 20kWp',
      healthEdu: '100% Akses Posyandu & Modul Sekolah Darurat',
      economy: '80% Revitalisasi Ekonomi Lokal Koperasi',
    },
    Mid: {
      budget: 'Rp 650M',
      units: '35 Unit Rumah Mandiri + 1 Klinik Surya + Filtrasi Air RO',
      healthEdu: '100% Akses Kesehatan & Pendidikan Terpadu',
      economy: '80% Revitalisasi Ekonomi + Cold Storage UMKM',
    },
    High: {
      budget: 'Rp 850M',
      units: '50 Unit Kawasan Kota Mandiri 3T + Menara LoRa + Dermaga/Hub',
      healthEdu: '100% Akses Kesehatan, Vokasi UARS & Pendidikan Terpadu',
      economy: '80%+ Terhubung Ekspor Seoul Bridge & 24/7 Energi Terbarukan',
    },
  }[rabTier];

  const handleExportRegional = () => {
    const csv = [
      'Posko,Pulau,KabKota,Zona,Status,Progress,BudgetM,DeployedM,Beneficiaries248',
      ...REGIONAL_NODES.map(
        (n) =>
          `"${n.poskoCode}","${n.island}","${n.kabKota}","${n.zoneType}","${n.status}",${n.progressPercent}%,${n.budgetAllocatedM},${n.capitalDeployedM},${n.beneficiaries248Covered}`
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Regional-Progress-3T-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onQueueOfflineAction('Laporan Wilayah', 'Ekspor CSV perkembangan wilayah berhasil');
  };

  const handleHousingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHousingSubmitted(
      `Pengajuan Hunian Subsidi atas nama ${wargaName} (NIK ${wargaNik}, Wilayah ${wargaZone}) masuk antrean verifikasi Layer 2.`
    );
    onQueueOfflineAction('Rumah Subsidi', `Pengajuan baru oleh ${wargaName} (${wargaZone})`);
    setWargaName('');
    setWargaNik('');
  };

  const handleDamageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!damageInput.trim()) return;
    setDamageSubmitted(
      `Laporan kerusakan "${damageInput}" terkirim ke Tim Eksekutor Harian & QC Material.`
    );
    onQueueOfflineAction('Pemeliharaan Hunian', damageInput);
    setDamageInput('');
  };

  return (
    <div className="space-y-7">
      {/* Header + Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-cyan-400">
            Regional Program Tracker · Kota Mandiri 3T &amp; Non-3T
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            Dasbor Monitoring Wilayah &amp; Modul Rumah Subsidi
          </h2>
        </div>
        <button
          type="button"
          onClick={handleExportRegional}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold self-start cursor-pointer"
        >
          <Download className="w-4 h-4" /> Ekspor Laporan Wilayah (CSV)
        </button>
      </div>

      {/* Regional Hierarchy Grid + Drill-Down */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Map & 8 Regional Selector Cards */}
        <div className="lg:col-span-7 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-bold text-white">
              Pilih Wilayah / Kab-Kota untuk Drill-Down Posko 3T
            </h3>
            <span className="text-xs text-slate-400">Klik kartu wilayah</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REGIONAL_NODES.map((node) => {
              const selected = node.id === activeNode.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left rounded-lg border p-3.5 transition-colors cursor-pointer ${
                    selected
                      ? 'bg-slate-950 border-cyan-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-cyan-400">
                      {node.poskoCode} · {node.zoneType}
                    </span>
                    <span
                      className={`font-semibold ${
                        node.status === 'On Track'
                          ? 'text-emerald-400'
                          : node.status === 'Critical'
                          ? 'text-red-400'
                          : node.status === 'Offline LoRa'
                          ? 'text-slate-300'
                          : 'text-amber-400'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white mt-1">
                    {node.kabKota} ({node.island})
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${node.progressPercent}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-white tabular-nums">
                      {node.progressPercent}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Drill-down Detail Posko + Separation of Infrastructure & Non-Infrastructure */}
        <div className="lg:col-span-5 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <p className="text-xs font-mono text-cyan-400">
              {activeNode.poskoCode} · {activeNode.kecamatan}, {activeNode.kabKota}
            </p>
            <h3 className="text-base font-bold text-white mt-0.5">
              PIC UARS: {activeNode.picUars}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Anggaran: Rp {activeNode.budgetAllocatedM}M · Terserap: Rp{' '}
              {activeNode.capitalDeployedM}M · Cakupan {activeNode.beneficiaries248Covered} Warga
            </p>
          </div>

          {activeNode.earlyWarning && (
            <div className="rounded-lg bg-red-950/60 border border-red-500/50 p-3 text-xs text-red-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-300">Early Warning System</p>
                <p>{activeNode.earlyWarning}</p>
              </div>
            </div>
          )}

          {/* Sub-Tab Separation: Infrastruktur vs Non-Infrastruktur */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setMonitorSubTab('infrastruktur')}
              className={`flex-1 py-2 rounded-md text-xs font-bold cursor-pointer ${
                monitorSubTab === 'infrastruktur'
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Infrastruktur (Fisik)
            </button>
            <button
              type="button"
              onClick={() => setMonitorSubTab('non_infrastruktur')}
              className={`flex-1 py-2 rounded-md text-xs font-bold cursor-pointer ${
                monitorSubTab === 'non_infrastruktur'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Non-Infrastruktur (Sosial)
            </button>
          </div>

          {monitorSubTab === 'infrastruktur' ? (
            <div className="space-y-3 text-xs">
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 space-y-1.5">
                <p className="font-bold text-cyan-300">Progres Fisik &amp; Konstruksi</p>
                <p className="text-slate-200">{activeNode.infraSummary}</p>
                <p className="text-slate-400">Logistik: {activeNode.cargoStatus}</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5">
                  <span className="text-slate-400 block">MVI Solar</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {activeNode.mviHealth.solar}
                  </span>
                </div>
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5">
                  <span className="text-slate-400 block">MVI Air Bersih</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {activeNode.mviHealth.water}
                  </span>
                </div>
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5">
                  <span className="text-slate-400 block">Sanitasi</span>
                  <span className="font-mono font-bold text-white">
                    {activeNode.mviHealth.sanitation}
                  </span>
                </div>
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5">
                  <span className="text-slate-400 block">Sinyal LoRa</span>
                  <span className="font-mono font-bold text-amber-300">
                    {activeNode.mviHealth.loraSignal}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 space-y-1.5">
                <p className="font-bold text-emerald-300">
                  Pemberdayaan Sosial, SDM UARS &amp; UMKM
                </p>
                <p className="text-slate-200">{activeNode.nonInfraSummary}</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5">
                  <span className="text-slate-400 block">Cakupan 248 Kategori</span>
                  <span className="font-mono font-bold text-white">
                    {activeNode.beneficiaries248Covered} Jiwa Terverifikasi
                  </span>
                </div>
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5">
                  <span className="text-slate-400 block">Indeks Resiliensi</span>
                  <span className="font-mono font-bold text-emerald-400">89.4 / 100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODUL RUMAH SUBSIDI (HUNIAN WARGA 3T & NON-3T) + SIMULATOR RAB */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Warga Housing Status + Ajukan + Lapor Kerusakan */}
        <div className="lg:col-span-6 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-400" /> Status Hunian Subsidi Warga (3T &amp;
              Non-3T)
            </h3>
            <button
              type="button"
              onClick={onOpenSos}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
            >
              <Siren className="w-3.5 h-3.5" /> Panic Button Keamanan Rumah
            </button>
          </div>

          {/* Progress Fisik Rumah Warga */}
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-2.5 text-xs">
            <p className="font-bold text-white">
              Unit Hunian Anda: Blok B-14 Desa Waingapu (3T)
            </p>
            {[
              { part: 'Pondasi Tahan Gempa', pct: 100 },
              { part: 'Struktur Baja Ringan & Dinding', pct: 50 },
              { part: 'Atap & Panel Surya MVI', pct: 0 },
            ].map((p) => (
              <div key={p.part} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300">{p.part}</span>
                  <span className="font-mono font-bold text-emerald-400">{p.pct}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Form Ajukan Hunian Subsidi */}
          <form onSubmit={handleHousingSubmit} className="space-y-2.5 text-xs border-t border-slate-800 pt-3">
            <p className="font-bold text-cyan-300">Ajukan Hunian Subsidi Baru</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={wargaName}
                onChange={(e) => setWargaName(e.target.value)}
                placeholder="Nama Lengkap Sesuai KTP"
                className="rounded bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              />
              <input
                type="text"
                required
                value={wargaNik}
                onChange={(e) => setWargaNik(e.target.value)}
                placeholder="NIK (16 Digit)"
                className="rounded bg-slate-950 border border-slate-700 px-3 py-2 font-mono text-white"
              />
              <select
                value={wargaZone}
                onChange={(e) => setWargaZone(e.target.value as '3T' | 'Non-3T')}
                className="rounded bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              >
                <option value="3T">Wilayah 3T (Terdepan, Terluar, Tertinggal)</option>
                <option value="Non-3T">Wilayah Non-3T (Pascabencana / Rentan)</option>
              </select>
              <input
                type="text"
                value={wargaIncome}
                onChange={(e) => setWargaIncome(e.target.value)}
                placeholder="Penghasilan Bulanan"
                className="rounded bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
            >
              Ajukan Hunian Subsidi
            </button>
            {housingSubmitted && <p className="text-emerald-300">{housingSubmitted}</p>}
          </form>

          {/* Lapor Kerusakan */}
          <form onSubmit={handleDamageSubmit} className="space-y-2 text-xs border-t border-slate-800 pt-3">
            <p className="font-bold text-amber-300 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" /> Lapor Kerusakan / Pemeliharaan Rumah
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={damageInput}
                onChange={(e) => setDamageInput(e.target.value)}
                placeholder="Contoh: Atap bocor sisi utara atau retak plester..."
                className="flex-1 rounded bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer"
              >
                Lapor Kerusakan
              </button>
            </div>
            {damageSubmitted && <p className="text-amber-300">{damageSubmitted}</p>}
          </form>
        </div>

        {/* Admin/Mitra: Simulator RAB Kota Mandiri 3T + Daftar Penerima Rumah Subsidi */}
        <div className="lg:col-span-6 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-5">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" /> Simulator RAB Hunian &amp; Kota Mandiri
              3T (Non-Bencana)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(['Low', 'Mid', 'High'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setRabTier(tier)}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-bold cursor-pointer ${
                    rabTier === tier
                      ? 'bg-cyan-600 border-cyan-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {tier} ({tier === 'Low' ? 'Rp 345M' : tier === 'Mid' ? 'Rp 650M' : 'Rp 850M'})
                </button>
              ))}
            </div>
            <div className="rounded-lg bg-slate-950 border border-cyan-800/50 p-4 space-y-1.5 text-xs">
              <p className="text-lg font-extrabold font-mono text-emerald-400">{rabSpecs.budget}</p>
              <p className="font-semibold text-white">{rabSpecs.units}</p>
              <p className="text-slate-300">• {rabSpecs.healthEdu}</p>
              <p className="text-slate-300">• {rabSpecs.economy}</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-300">
              Tabel Penerima Rumah Subsidi (3T &amp; Non-3T)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 pr-3">Nama</th>
                    <th className="py-2 pr-3">Wilayah</th>
                    <th className="py-2 pr-3">Progress</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {SUBSIDI_RECIPIENTS.map((r) => (
                    <tr key={r.id}>
                      <td className="py-2 pr-3 font-semibold text-white">{r.name}</td>
                      <td className="py-2 pr-3 text-slate-300">{r.region}</td>
                      <td className="py-2 pr-3 text-cyan-300">{r.progress}</td>
                      <td className="py-2 text-emerald-400 font-semibold">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

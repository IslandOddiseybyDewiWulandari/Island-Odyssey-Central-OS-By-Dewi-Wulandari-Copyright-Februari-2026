import React, { useState } from 'react';
import {
  Award,
  Briefcase,
  CheckCircle2,
  Database,
  GraduationCap,
  MapPin,
  UserCheck,
  Users,
} from 'lucide-react';
import { RoleDefinition } from '../../types/os';

interface UarsModuleProps {
  role: RoleDefinition;
  onQueueOfflineAction: (module: string, summary: string) => void;
}

const CITIZEN_JOBS = [
  {
    id: 'JOB-01',
    title: 'Teknisi Instalasi Solar Microgrid (Desa Kambera)',
    employer: 'Koperasi Energi Mandiri NTT',
    match: 96,
    wage: 'Rp 225.000 / hari',
    location: 'Sumba Timur (3T)',
  },
  {
    id: 'JOB-02',
    title: 'Operator Konstruksi Baja Ringan Hunian Subsidi',
    employer: 'PT Bangun Palu Nusantara',
    match: 91,
    wage: 'Rp 210.000 / hari',
    location: 'Palu & Sigi',
  },
  {
    id: 'JOB-03',
    title: 'Asisten Logistik & Sortir QR Cargo of Care',
    employer: 'Hub Armada UARS Maluku',
    match: 87,
    wage: 'Rp 185.000 / hari',
    location: 'Banda Neira (3T)',
  },
];

const CITIZEN_TRAININGS = [
  {
    id: 'TRN-01',
    title: 'Sertifikasi Las Tahan Gempa & Konstruksi SNI',
    mentor: 'Kurir Mentor UARS · Balai Vokasi Palu',
    duration: '14 Hari · Subsidi Penuh',
  },
  {
    id: 'TRN-02',
    title: 'Keselamatan Kerja (K3) Konstruksi & Kelistrikan Surya',
    mentor: 'Tim QC & Teknisi MVI Pusat',
    duration: '7 Hari · Sertifikat LSP',
  },
];

const RECOMMENDED_WORKERS = [
  {
    id: 'UARS-W01',
    name: 'Andi Mappanyukki',
    skill: 'Welder Struktur Baja Tahan Gempa',
    region: 'NTT (Sumba Timur)',
    careerStep: 'Tahap 5 · Tersertifikasi',
    assigned: false,
  },
  {
    id: 'UARS-W02',
    name: 'Maria Fransiska Lado',
    skill: 'Teknisi Solar Panel & Baterai MVI',
    region: 'Maluku (Banda)',
    careerStep: 'Tahap 4 · Siap Penempatan',
    assigned: false,
  },
  {
    id: 'UARS-W03',
    name: 'Deden Kurniawan',
    skill: 'Operator Logistik & Scan QR Manifest',
    region: 'Jawa Barat (Sukabumi)',
    careerStep: 'Tahap 6 · Mentor Lokal',
    assigned: true,
  },
  {
    id: 'UARS-W04',
    name: 'Yohanis Pigome',
    skill: 'Teknisi Filtrasi Air Bersih & Sanitasi',
    region: 'Papua (Wamena)',
    careerStep: 'Tahap 4 · Siap Penempatan',
    assigned: false,
  },
];

export const UarsModule: React.FC<UarsModuleProps> = ({ role, onQueueOfflineAction }) => {
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [joinedTrainings, setJoinedTrainings] = useState<string[]>([]);
  const [assignedIds, setAssignedIds] = useState<string[]>(['UARS-W03']);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('Semua');

  const isWarga = role.id === 'warga_beneficiary';

  const handleApplyJob = (id: string, title: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs((prev) => [...prev, id]);
      onQueueOfflineAction('UARS Bursa Kerja', `Lamaran pekerjaan dikirim: ${title}`);
    }
  };

  const handleJoinTraining = (id: string, title: string) => {
    if (!joinedTrainings.includes(id)) {
      setJoinedTrainings((prev) => [...prev, id]);
      onQueueOfflineAction('UARS Pelatihan', `Terdaftar pada pelatihan: ${title}`);
    }
  };

  const handleAssignWorker = (id: string, name: string) => {
    if (!assignedIds.includes(id)) {
      setAssignedIds((prev) => [...prev, id]);
      onQueueOfflineAction('UARS Penempatan', `${name} ditugaskan ke Posko 3T`);
    }
  };

  // WARGA / BENEFICIARY MOBILE-FIRST VIEW
  if (isWarga) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div>
          <p className="text-xs font-semibold text-cyan-400">Engine 08 · Job Guarantee System</p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            UARS — Bursa Kerja &amp; Pelatihan Warga
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Status pekerjaan aktif, rekomendasi lowongan pascabencana terdekat, dan pelatihan
            vokasi bersertifikat.
          </p>
        </div>

        {/* Card 1: Status Pekerjaan Aktif */}
        <div className="rounded-xl bg-slate-900 border border-emerald-500/40 p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> Pekerjaan Aktif Warga
            </span>
            <span className="text-xs font-mono text-slate-300">Tahap Karir 4 / 6</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Welder Hunian Tetap — PT Bangun Palu
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs">
              <p className="text-slate-400">Kehadiran Biometrik</p>
              <p className="font-mono font-bold text-emerald-400 mt-0.5">24 / 24 Hari (100%)</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs">
              <p className="text-slate-400">Evaluasi Mandor &amp; QC</p>
              <p className="font-mono font-bold text-white mt-0.5">Sangat Baik (4.9 / 5.0)</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs">
              <p className="text-slate-400">Upah Harian E-Wallet</p>
              <p className="font-mono font-bold text-cyan-400 mt-0.5">Rp 175.000 (0% Potongan)</p>
            </div>
          </div>
        </div>

        {/* Card 2: Lowongan Cocok */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">
            Lowongan Pascabencana &amp; 3T yang Cocok untuk Anda
          </h3>
          <div className="space-y-3">
            {CITIZEN_JOBS.map((job) => {
              const applied = appliedJobs.includes(job.id);
              return (
                <div
                  key={job.id}
                  className="rounded-lg bg-slate-950 border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-emerald-400">
                        {job.match}% Cocok
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">{job.location}</span>
                    </div>
                    <p className="text-sm font-bold text-white">{job.title}</p>
                    <p className="text-xs text-slate-400">
                      {job.employer} ·{' '}
                      <span className="font-mono text-cyan-300">{job.wage}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyJob(job.id, job.title)}
                    disabled={applied}
                    className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer ${
                      applied
                        ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                    }`}
                  >
                    {applied ? 'Lamaran Terkirim' : 'Lamar Pekerjaan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 3: Program Pelatihan */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" /> Program Pelatihan Vokasi Warga
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CITIZEN_TRAININGS.map((t) => {
              const joined = joinedTrainings.includes(t.id);
              return (
                <div
                  key={t.id}
                  className="rounded-lg bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{t.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{t.mentor}</p>
                    <p className="text-xs font-mono text-amber-300 mt-1">{t.duration}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJoinTraining(t.id, t.title)}
                    disabled={joined}
                    className={`w-full py-2 rounded-lg text-xs font-bold cursor-pointer ${
                      joined
                        ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {joined ? 'Terdaftar di Kelas' : 'Ikuti Pelatihan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ADMIN / HR / AUDITOR / MANAGEMENT VIEW (DESKTOP)
  const filteredWorkers =
    selectedRegionFilter === 'Semua'
      ? RECOMMENDED_WORKERS
      : RECOMMENDED_WORKERS.filter((w) => w.region.includes(selectedRegionFilter));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-cyan-400">Engine 08 · UARS National Workforce</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
          Dashboard UARS Analytics (Management View)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Pemetaan 54.320 tenaga kerja nasional, sertifikasi keahlian 6 tahap karir warga, dan
          penugasan langsung ke Posko 3T.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tenaga Kerja Terdaftar', value: '54.320', icon: <Users className="w-4 h-4 text-cyan-400" /> },
          { label: 'Terverifikasi Biometrik', value: '3.842', icon: <UserCheck className="w-4 h-4 text-emerald-400" /> },
          { label: 'Dalam Pelatihan Vokasi', value: '4.850', icon: <GraduationCap className="w-4 h-4 text-amber-400" /> },
          { label: 'Penempatan Posko Aktif', value: '78', icon: <MapPin className="w-4 h-4 text-sky-400" /> },
        ].map((m) => (
          <div key={m.label} className="rounded-xl bg-slate-900 border border-slate-800 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{m.label}</span>
              {m.icon}
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums mt-2">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Donut Chart + Map Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Donut Chart: Distribusi Pekerja per Sektor */}
        <div className="lg:col-span-5 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Distribusi Pekerja per Sektor</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <svg viewBox="0 0 120 120" className="w-36 h-36 shrink-0" aria-label="Donut Sektor UARS">
              <circle cx="60" cy="60" r="44" fill="none" stroke="#1e293b" strokeWidth="16" />
              {/* 40% Konstruksi & Hunian */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="16"
                strokeDasharray="110.6 276.5"
                strokeDashoffset="0"
                transform="rotate(-90 60 60)"
              />
              {/* 30% Logistik & Maritim */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#10b981"
                strokeWidth="16"
                strokeDasharray="82.9 276.5"
                strokeDashoffset="-110.6"
                transform="rotate(-90 60 60)"
              />
              {/* 20% Energi & Pertanian */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="16"
                strokeDasharray="55.3 276.5"
                strokeDashoffset="-193.5"
                transform="rotate(-90 60 60)"
              />
              {/* 10% Kesehatan & Edukasi */}
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="16"
                strokeDasharray="27.7 276.5"
                strokeDashoffset="-248.8"
                transform="rotate(-90 60 60)"
              />
              <text
                x="60"
                y="58"
                textAnchor="middle"
                className="fill-white text-[11px] font-bold font-mono"
              >
                54.3K
              </text>
              <text x="60" y="70" textAnchor="middle" className="fill-slate-400 text-[7px]">
                Terdaftar
              </text>
            </svg>

            <div className="space-y-2 text-xs flex-1 w-full">
              {[
                { name: 'Konstruksi & Hunian', pct: '40%', color: 'bg-cyan-500' },
                { name: 'Logistik Cargo of Care', pct: '30%', color: 'bg-emerald-500' },
                { name: 'Energi Surya & Agrikultur', pct: '20%', color: 'bg-amber-500' },
                { name: 'Medis, K3 & Kurir Mentor', pct: '10%', color: 'bg-sky-400' },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className={`w-2.5 h-2.5 rounded-sm ${s.color}`} />
                    {s.name}
                  </span>
                  <span className="font-mono font-bold text-white tabular-nums">{s.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Visual: Penempatan per Wilayah */}
        <div className="lg:col-span-7 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-white">
              Peta Sebaran &amp; Penempatan per Wilayah
            </h3>
            <div className="flex items-center gap-1.5">
              {['Semua', 'NTT', 'Maluku', 'Jawa Barat'].map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegionFilter(reg)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                    selectedRegionFilter === reg
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="relative rounded-lg bg-slate-950 border border-slate-800 p-4">
            <svg viewBox="0 0 600 180" className="w-full h-36" aria-label="Peta Sebaran Wilayah Indonesia">
              {/* Stylized archipelago nodes */}
              <path
                d="M40,70 Q95,95 140,125 L235,140 L330,138 L420,145 M210,75 L265,65 L290,98 M315,75 L360,60 L375,110 M415,88 L455,96 M485,80 L565,98"
                fill="none"
                stroke="#1e3a5f"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {[
                { label: 'Jawa Barat (1.120 SDM)', x: 175, y: 132, color: '#06b6d4' },
                { label: 'NTT (1.480 SDM)', x: 345, y: 148, color: '#10b981' },
                { label: 'Maluku (762 SDM)', x: 435, y: 95, color: '#f59e0b' },
                { label: 'Papua (480 SDM)', x: 530, y: 92, color: '#38bdf8' },
              ].map((pt) => (
                <g key={pt.label}>
                  <circle cx={pt.x} cy={pt.y} r="7" fill={pt.color} />
                  <circle cx={pt.x} cy={pt.y} r="13" fill={pt.color} fillOpacity="0.2" />
                  <text x={pt.x} y={pt.y - 14} textAnchor="middle" className="fill-slate-200 text-[9px] font-semibold">
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Tabel Daftar Rekomendasi Tenaga Kerja */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <h3 className="text-sm font-bold text-white">Daftar Rekomendasi Tenaga Kerja UARS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 pr-4">ID / Nama Pekerja</th>
                <th className="py-2.5 pr-4">Keahlian Tersertifikasi</th>
                <th className="py-2.5 pr-4">Wilayah</th>
                <th className="py-2.5 pr-4">Tahapan Karir (1–6)</th>
                <th className="py-2.5 text-right">Aksi Penugasan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredWorkers.map((w) => {
                const isAssigned = assignedIds.includes(w.id);
                return (
                  <tr key={w.id} className="hover:bg-slate-800/40">
                    <td className="py-3 pr-4">
                      <p className="font-bold text-white">{w.name}</p>
                      <p className="font-mono text-[11px] text-cyan-400">{w.id}</p>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{w.skill}</td>
                    <td className="py-3 pr-4 text-slate-300">{w.region}</td>
                    <td className="py-3 pr-4">
                      <span className="font-mono text-emerald-400 font-semibold">
                        {w.careerStep}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleAssignWorker(w.id, w.name)}
                        disabled={isAssigned}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          isAssigned
                            ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                        }`}
                      >
                        {isAssigned ? 'Sudah Bertugas' : 'Tugaskan ke Posko'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diagram Alur UARS Central Database */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" /> Diagram Alur UARS Central Database
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-1.5">
            <p className="text-xs font-bold text-cyan-400">1. Sumber Data Lapangan</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Biometrik KTP/Wajah warga, hasil pelatihan Kurir Mentor UARS, dan request SDM posko
              3T via LoRa/Online.
            </p>
          </div>
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-1.5">
            <p className="text-xs font-bold text-emerald-400">2. Data Terintegrasi Pusat</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Matching otomatis Engine 08 (54.320 profil), validasi duplikasi Layer 2, &amp;
              pemetaan 248 kategori stakeholder.
            </p>
          </div>
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-4 space-y-1.5">
            <p className="text-xs font-bold text-amber-400">3. Output &amp; Manfaat</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Penempatan padat karya cepat, gaji harian masuk E-Wallet 0% potongan, dan naik kelas
              karir Tahap 1–6.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

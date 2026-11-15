import React, { useState } from 'react';
import {
  AlertTriangle,
  Ambulance,
  CheckCircle2,
  Flame,
  Lock,
  MapPin,
  Radio,
  ShieldAlert,
  Siren,
  X,
} from 'lucide-react';
import { SosAlert } from '../types/os';

interface FloatingSosModalProps {
  activeRoleName: string;
  defaultCoordinates: string;
  defaultLocation: string;
  externalOpen?: boolean;
  onCloseExternal?: () => void;
  sosAlerts: SosAlert[];
  onTriggerSos: (alert: SosAlert) => void;
  onAdvanceSosStage: (id: string) => void;
}

const CATEGORIES: {
  id: SosAlert['category'];
  label: string;
  subs: string[];
  icon: React.ReactNode;
}[] = [
  {
    id: 'Keamanan Rumah',
    label: 'Keamanan Rumah',
    subs: ['Maling / Penyusup', 'Perampokan', 'Kebakaran Rumah', 'Kerusuhan Sekitar'],
    icon: <Flame className="w-4 h-4" />,
  },
  {
    id: 'Bencana Alam',
    label: 'Bencana Alam',
    subs: ['Gempa Bumi', 'Banjir Bandang', 'Tanah Longsor', 'Peringatan Tsunami'],
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    id: 'Medis/Evakuasi',
    label: 'Medis / Evakuasi',
    subs: ['Butuh Ambulans Segera', 'Butuh Evakuasi Darurat 3T'],
    icon: <Ambulance className="w-4 h-4" />,
  },
];

export const FloatingSosModal: React.FC<FloatingSosModalProps> = ({
  activeRoleName,
  defaultCoordinates,
  defaultLocation,
  externalOpen,
  onCloseExternal,
  sosAlerts,
  onTriggerSos,
  onAdvanceSosStage,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [category, setCategory] = useState<SosAlert['category']>('Keamanan Rumah');
  const [subType, setSubType] = useState<string>('Maling / Penyusup');
  const [description, setDescription] = useState<string>('');
  const [dispatchTarget, setDispatchTarget] = useState<string>('Posko RT/RW & Tim SAR Terdekat');

  const isOpen = externalOpen || internalOpen;

  const closeModal = () => {
    setInternalOpen(false);
    if (onCloseExternal) onCloseExternal();
  };

  const handleCategoryChange = (cat: SosAlert['category']) => {
    setCategory(cat);
    const found = CATEGORIES.find((c) => c.id === cat);
    if (found && found.subs.length > 0) {
      setSubType(found.subs[0]);
    }
    if (cat === 'Keamanan Rumah') setDispatchTarget('Posko RT/RW & Kepolisian Sektor');
    if (cat === 'Bencana Alam') setDispatchTarget('Posko Darurat 3T & Tim SAR Nasional');
    if (cat === 'Medis/Evakuasi') setDispatchTarget('Unit Ambulans / Armada Udara Medevac');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const newAlert: SosAlert = {
      id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      subType,
      gps: `${defaultCoordinates} (${defaultLocation})`,
      description: description.trim() || `${subType} dilaporkan di sekitar ${defaultLocation}`,
      reporterRole: activeRoleName,
      timestamp: `Hari ini, ${formattedTime} WITA`,
      stage: 'Sinyal Diterima',
    };
    onTriggerSos(newAlert);
    setDescription('');
  };

  const latestAlert = sosAlerts[0];

  return (
    <>
      {/* Floating SOS Panic Button (Bottom Left across all 19 Dashboards & Landing) */}
      <button
        type="button"
        onClick={() => setInternalOpen(true)}
        aria-label="Tombol Darurat SOS Keamanan & Bencana"
        className="no-print fixed bottom-5 left-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold shadow-[0_0_25px_rgba(220,38,38,0.65)] border border-red-300/60 transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Siren className="w-5 h-5 shrink-0" />
        <span className="text-xs sm:text-sm tracking-wide whitespace-nowrap">SOS DARURAT</span>
      </button>

      {/* Emergency Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Pusat Sinyal Darurat SOS"
        >
          <div className="w-full max-w-2xl bg-slate-900 border border-red-500/50 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-red-900 via-red-800 to-slate-900 px-5 py-4 flex items-center justify-between border-b border-red-500/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Emergency Mode & Panic Button (SOS)
                  </h3>
                  <p className="text-xs text-red-200">
                    Kirim sinyal darurat real-time ke Posko RT/RW, Tim SAR, Polisi, atau Pemadam Kebakaran
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg text-red-200 hover:text-white hover:bg-red-800/60 transition-colors"
                aria-label="Tutup modal darurat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5">
              {/* Category Selection */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    1. Pilih Kategori Darurat
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {CATEGORIES.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleCategoryChange(item.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors text-left ${
                          category === item.id
                            ? 'bg-red-600/20 border-red-500 text-white'
                            : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-red-400 shrink-0">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    2. Spesifikasi Insiden
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.find((c) => c.id === category)?.subs.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setSubType(sub)}
                        className={`px-3 py-2 rounded-lg border text-xs font-medium text-left transition-colors ${
                          subType === sub
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Locked GPS Field */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                        <MapPin className="w-3.5 h-3.5" /> Lokasi GPS Otomatis
                      </span>
                      <span className="flex items-center gap-1 text-amber-300">
                        <Lock className="w-3 h-3" /> Terkunci
                      </span>
                    </div>
                    <p className="font-mono text-xs text-slate-100 tabular-nums">
                      {defaultCoordinates}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{defaultLocation}</p>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-400 mb-1">
                      <Radio className="w-3.5 h-3.5" /> Penerima Sinyal Prioritas
                    </div>
                    <p className="text-xs font-semibold text-slate-100">{dispatchTarget}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Pelapor aktif: {activeRoleName}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sos-desc"
                    className="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    3. Deskripsi Singkat Kejadian
                  </label>
                  <textarea
                    id="sos-desc"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Contoh: Ada maling di depan rumah blok B, mohon bantuan patroli Posko RT segera..."
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Siren className="w-4 h-4" />
                  Kirim Sinyal Darurat Sekarang
                </button>
              </form>

              {/* Live Real-Time Status Progression */}
              {latestAlert && (
                <div className="border-t border-slate-800 pt-4 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-xs font-bold text-white">
                        Status Sinyal Aktif: {latestAlert.id} · {latestAlert.subType}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {latestAlert.timestamp} · {latestAlert.gps}
                      </p>
                    </div>
                    {latestAlert.stage !== 'Kondisi Aman' && (
                      <button
                        type="button"
                        onClick={() => onAdvanceSosStage(latestAlert.id)}
                        className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Simulasikan Update Respon Tim
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-800/60 rounded-lg p-2.5 border border-slate-700">
                    “{latestAlert.description}”
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {(['Sinyal Diterima', 'Tim Menuju Lokasi', 'Kondisi Aman'] as const).map(
                      (step, i) => {
                        const stages = ['Sinyal Diterima', 'Tim Menuju Lokasi', 'Kondisi Aman'];
                        const activeIdx = stages.indexOf(latestAlert.stage);
                        const reached = i <= activeIdx;
                        return (
                          <div
                            key={step}
                            className={`rounded-lg border p-2.5 text-center ${
                              reached
                                ? step === 'Kondisi Aman'
                                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                                  : 'bg-amber-500/15 border-amber-500/50 text-amber-200'
                                : 'bg-slate-800/40 border-slate-800 text-slate-500'
                            }`}
                          >
                            <div className="flex items-center justify-center mb-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <p className="text-[11px] font-semibold leading-tight">{step}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useMemo, useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Globe2,
  Layers,
  Lock,
  Radio,
  Search,
  Send,
  ShieldAlert,
  TrendingUp,
  Umbrella,
  Users,
} from 'lucide-react';
import {
  CATEGORIES_248,
  CONSORTIUM_COUNTRIES,
  SEOUL_BRIDGE_PRODUCTS,
} from '../../data/mockEcosystem';
import { CategoryGroup, ConnectivityMode, CountryMember, RoleDefinition } from '../../types/os';

interface SpecialEcosystemModuleProps {
  mode: 'tie_ekonomi' | 'konsorsium_errs' | 'kategori_248';
  role: RoleDefinition;
  connectivityMode: ConnectivityMode;
  onQueueOfflineAction: (module: string, summary: string) => void;
}

const PADAT_KARYA_OFFERS = [
  {
    id: 'PK-01',
    title: 'Perakitan Panel Surya Microgrid Posko Sumba',
    pay: 'Rp 210.000 / hari',
    location: 'Posko NTT-01 (1.2 km)',
  },
  {
    id: 'PK-02',
    title: 'Bongkar Muat & Scan QR Cargo of Care Pelabuhan Banda',
    pay: 'Rp 195.000 / hari',
    location: 'Dermaga Banda Neira',
  },
  {
    id: 'PK-03',
    title: 'Sortasi & Pengemasan Kopi Ekspor Seoul Bridge',
    pay: 'Rp 185.000 / hari',
    location: 'Koperasi Wamena (3T)',
  },
];

export const SpecialEcosystemModule: React.FC<SpecialEcosystemModuleProps> = ({
  mode,
  role,
  connectivityMode,
  onQueueOfflineAction,
}) => {
  // 248 Ecosystem Categories state
  const [catFilter, setCatFilter] = useState<'Semua' | CategoryGroup>('Semua');
  const [catSearch, setCatSearch] = useState('');

  // TIE Gradual Phase & Job Marketplace
  const [tiePhase, setTiePhase] = useState<1 | 2 | 3 | 4>(2);
  const [takenOffers, setTakenOffers] = useState<string[]>([]);
  const [seoulOrderMsg, setSeoulOrderMsg] = useState<string | null>(null);

  // Consortium 6 Countries + Australia Matrix
  const [countries, setCountries] = useState<CountryMember[]>(CONSORTIUM_COUNTRIES);
  const [policyProposal, setPolicyProposal] = useState(
    'Pembebasan Tarif Bea Masuk Ekspor UMKM 3T Koridor Seoul Bridge 2026'
  );
  const [consortiumReaction, setConsortiumReaction] = useState<string>(
    'Status Kuorum: 6 Setuju, 1 Abstain, 0 Veto — Kebijakan Siap Diterapkan.'
  );

  // Microinsurance & ERRS
  const [claimReason, setClaimReason] = useState('Kecelakaan Kerja Konstruksi 3T');
  const [claimAmount, setClaimAmount] = useState('Rp 3.500.000');
  const [claimStatus, setClaimStatus] = useState<string | null>(null);
  const [bufferDeployed, setBufferDeployed] = useState<number>(28);

  // Offline LoRa/HT Terminal
  const [loraChannel, setLoraChannel] = useState('CH-03 · 915.2 MHz (Sumba-Papua Mesh)');
  const [loraInput, setLoraInput] = useState('');
  const [loraLogs, setLoraLogs] = useState<string[]>([
    '[09:14 WIT] POSKO-PAP-02: UAV Cargo Wing-07 dropping vaksin & solar inverter selesai.',
    '[09:28 WITA] POSKO-NTT-01: Sync 42 biometrik warga & 12 batch beton SNI sukses.',
  ]);

  // Anonymous Whistleblowing
  const [whistleTarget, setWhistleTarget] = useState('');
  const [whistleDesc, setWhistleDesc] = useState('');
  const [whistleReceipt, setWhistleReceipt] = useState<string | null>(null);

  const filtered248 = useMemo(() => {
    return CATEGORIES_248.filter((c) => {
      const matchGroup = catFilter === 'Semua' || c.group === catFilter;
      const q = catSearch.toLowerCase().trim();
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.regionFocus.toLowerCase().includes(q);
      return matchGroup && matchQ;
    });
  }, [catFilter, catSearch]);

  const handleCountryAction = (countryCode: string, action: 'Setuju' | 'Veto') => {
    const updated = countries.map((c) =>
      c.code === countryCode
        ? {
            ...c,
            voteChoice: action,
            vetoActive: action === 'Veto',
          }
        : c
    );
    setCountries(updated);
    const vetoCount = updated.filter((u) => u.vetoActive).length;
    if (vetoCount > 0) {
      const vetoers = updated
        .filter((u) => u.vetoActive)
        .map((u) => u.country)
        .join(', ');
      setConsortiumReaction(
        `HAK VETO DIAKTIFKAN oleh ${vetoers}: Kebijakan "${policyProposal}" ditangguhkan untuk negosiasi ulang.`
      );
    } else {
      setConsortiumReaction(
        `VOTING MULTI-NEGARA SAH: ${updated.filter((u) => u.voteChoice === 'Setuju').length}/7 Negara Setuju · 0 Veto.`
      );
    }
    onQueueOfflineAction('Konsorsium 6+1', `${countryCode} memilih ${action}`);
  };

  // RENDER 248 KATEGORI EKOSISTEM DIRECTORY
  if (mode === 'kategori_248') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-cyan-400">
              Master Data Konstitusi KHI · 205 Penerima + 43 Mitra
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              Direktori Interaktif 248 Kategori Ekosistem
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="font-mono font-bold text-white">
              Total: 248 Kategori (205 Penerima + 43 Mitra)
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={catSearch}
              onChange={(e) => setCatSearch(e.target.value)}
              placeholder="Cari dari 248 kategori (Nelayan, KAP, Seoul Bridge, Papua, Disabilitas)..."
              className="w-full rounded-lg bg-slate-900 border border-slate-700 pl-10 pr-4 py-2.5 text-xs text-white"
            />
          </div>
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value as 'Semua' | CategoryGroup)}
            className="rounded-lg bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white font-semibold"
          >
            <option value="Semua">Semua Klaster (248 Kategori)</option>
            <option value="Core Beneficiaries">Core Beneficiaries (115)</option>
            <option value="Conditional Beneficiaries">Conditional Beneficiaries (60)</option>
            <option value="Active Contributors">Active Contributors (50)</option>
            <option value="Strategic Entities">Strategic Entities (23)</option>
          </select>
        </div>

        <p className="text-xs text-slate-400">
          Menampilkan <span className="font-mono font-bold text-cyan-400">{filtered248.length}</span>{' '}
          kategori terverifikasi biometrik &amp; SLA.
        </p>

        {/* Grid of 248 Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[620px] overflow-y-auto pr-1">
          {filtered248.map((cat) => (
            <div
              key={cat.id}
              className="rounded-lg bg-slate-900 border border-slate-800 p-3.5 space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold text-cyan-400">{cat.code}</span>
                <span
                  className={`font-semibold ${
                    cat.type === 'Mitra' ? 'text-amber-300' : 'text-emerald-400'
                  }`}
                >
                  {cat.type}
                </span>
              </div>
              <p className="font-bold text-white leading-snug">{cat.name}</p>
              <p className="text-[11px] text-slate-400">{cat.group}</p>
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-300 font-mono">
                <span>{cat.regionFocus}</span>
                <span className="text-emerald-400">{cat.verifiedCount} Jiwa</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // RENDER TIE, SEOUL BRIDGE EXPORT MARKETPLACE & JOB MARKETPLACE INNER
  if (mode === 'tie_ekonomi') {
    const phaseDescriptions: Record<1 | 2 | 3 | 4, string> = {
      1: 'Phase 1 (Injected): Bantuan modal penuh, Cargo of Care, dan hunian dasar 3T.',
      2: 'Phase 2 (Shared): Pendampingan intensif bersama Kurir Mentor UARS & sesi diaspora.',
      3: 'Phase 3 (Mentored): Kemandirian terpandu, koperasi aktif, dan transaksi pasar komersial.',
      4: 'Phase 4 (Autonomous): Fully Independent Kota Mandiri 3T & ekspor global berkelanjutan.',
    };

    return (
      <div className="space-y-7">
        <div>
          <p className="text-xs font-semibold text-cyan-400">
            Engine 02 TIE &amp; Engine 03 Seoul Bridge · Ekonomi Multi-Aktor
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            Twin Impact Enterprise (TIE), Gradual Release &amp; Seoul Bridge Ekspor
          </h2>
        </div>

        {/* Gradual Release Model Phase 1-4 */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Gradual Release Model (Transisi Phase
              1 → Phase 4)
            </h3>
            <span className="text-xs font-mono text-cyan-300">
              Mitra (SROI 3.2x) · Armada (Insentif) · Warga (Pendapatan)
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {([1, 2, 3, 4] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setTiePhase(p)}
                className={`p-3.5 rounded-lg border text-left text-xs cursor-pointer transition-colors ${
                  tiePhase === p
                    ? 'bg-emerald-600/20 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                <p className="font-mono font-bold text-emerald-400">PHASE {p}</p>
                <p className="font-bold text-white mt-0.5">
                  {p === 1
                    ? 'Injected'
                    : p === 2
                    ? 'Shared'
                    : p === 3
                    ? 'Mentored'
                    : 'Autonomous'}
                </p>
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-200 bg-slate-950 border border-slate-800 rounded-lg p-3.5">
            {phaseDescriptions[tiePhase]}
          </p>
        </div>

        {/* Marketplace & Seoul Bridge (Ekspor UMKM 3T & Non-3T) */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-cyan-400" /> Marketplace &amp; Seoul Bridge (Ekspor
                UMKM 3T &amp; Non-3T)
              </h3>
              <p className="text-xs text-slate-400">
                Produk unggulan Papua, NTT, Maluku, dan Jawa Barat dengan status pabean real-time.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onQueueOfflineAction(
                  'Pesan Armada Jemput',
                  `Permintaan jemput hasil UMKM oleh ${role.shortName} dikirim ke Armada terdekat`
                )
              }
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer self-start"
            >
              Pesan Armada Jemput Panen
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {SEOUL_BRIDGE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Bespoke product visual */}
                  <div
                    className={`h-32 bg-gradient-to-br ${prod.palette} p-4 flex flex-col justify-between border-b border-slate-800`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan-200 font-bold">{prod.badge}</span>
                      <span className="text-amber-300">{prod.regionType}</span>
                    </div>
                    <p className="text-xs font-bold text-white">{prod.origin}</p>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <h4 className="font-bold text-white leading-snug">{prod.name}</h4>
                    <div className="space-y-1 text-slate-400">
                      <p>
                        Volume: <span className="font-mono text-white">{prod.volume}</span>
                      </p>
                      <p>
                        Tujuan: <span className="text-cyan-300">{prod.destination}</span>
                      </p>
                      <p>
                        Pabean:{' '}
                        <span className="text-emerald-400 font-semibold">{prod.customsStatus}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSeoulOrderMsg(
                        `Booking slot ekspor ${prod.name} menuju ${prod.destination} tercatat di Ledger Seoul Bridge.`
                      );
                      onQueueOfflineAction('Seoul Bridge', `Ekspor ${prod.name}`);
                    }}
                    className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
                  >
                    Ajukan Pengiriman Ekspor
                  </button>
                </div>
              </div>
            ))}
          </div>

          {seoulOrderMsg && (
            <p className="text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg p-3">
              {seoulOrderMsg}
            </p>
          )}
        </div>

        {/* Penawaran Kerja / Tugas Tambahan (Job Marketplace Inner) */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400" /> Penawaran Kerja / Tugas Tambahan
            (Padat Karya Posko 3T)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PADAT_KARYA_OFFERS.map((offer) => {
              const taken = takenOffers.includes(offer.id);
              return (
                <div
                  key={offer.id}
                  className="rounded-lg bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-bold text-white">{offer.title}</p>
                    <p className="text-slate-400 mt-1">{offer.location}</p>
                    <p className="font-mono font-bold text-emerald-400 mt-1">{offer.pay}</p>
                  </div>
                  <button
                    type="button"
                    disabled={taken}
                    onClick={() => {
                      setTakenOffers((prev) => [...prev, offer.id]);
                      onQueueOfflineAction('Job Marketplace Inner', `Ambil tugas: ${offer.title}`);
                    }}
                    className={`w-full py-2 rounded-lg font-bold cursor-pointer ${
                      taken
                        ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-amber-600 hover:bg-amber-500 text-white'
                    }`}
                  >
                    {taken ? 'Tugas Diambil' : 'Ambil Penawaran Kerja'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // RENDER KONSORSIUM 6+1 COUNTRIES, ERRS/ASURANSI MIKRO, LORA TERMINAL & WHISTLEBLOWING
  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-semibold text-cyan-400">
          Engine 04, 05, 06 · Multilateral Policy, ERRS, LoRa/HT &amp; Shadow Vault
        </p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
          Konsorsium 6 Negara + Australia, ERRS Asuransi Mikro &amp; Terminal LoRa
        </h2>
      </div>

      {/* 1. Kartu Matriks Peran 6 Negara + Australia & Check & Balance Veto */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Kartu Matriks Peran 6 Negara Mitra + Australia (Check &amp; Balance)
            </h3>
            <p className="text-xs text-slate-400">
              Agenda Voting Aktif: <span className="text-cyan-300">{policyProposal}</span>
            </p>
          </div>
          <input
            type="text"
            value={policyProposal}
            onChange={(e) => setPolicyProposal(e.target.value)}
            className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white w-full lg:w-96"
          />
        </div>

        <div className="rounded-lg bg-slate-950 border border-cyan-500/40 p-3 text-xs font-semibold text-cyan-200">
          {consortiumReaction}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {countries.map((c) => (
            <div
              key={c.code}
              className={`rounded-lg border p-4 space-y-2.5 text-xs ${
                c.vetoActive
                  ? 'bg-red-950/30 border-red-500/60'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">
                  {c.country} ({c.code})
                </span>
                <span
                  className={`font-mono font-bold ${
                    c.vetoActive
                      ? 'text-red-400'
                      : c.voteChoice === 'Setuju'
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {c.voteChoice}
                </span>
              </div>
              <p className="text-slate-300 leading-snug">{c.roleTitle}</p>
              <p className="text-[11px] font-mono text-cyan-400">{c.focusEngine}</p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCountryAction(c.code, 'Setuju')}
                  className="flex-1 py-1.5 rounded bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 font-bold cursor-pointer"
                >
                  Voting Setuju
                </button>
                <button
                  type="button"
                  onClick={() => handleCountryAction(c.code, 'Veto')}
                  className="flex-1 py-1.5 rounded bg-red-600/20 hover:bg-red-600/40 border border-red-500/40 text-red-300 font-bold cursor-pointer"
                >
                  Hak Veto
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Microinsurance & ERRS Macro-Economic Crisis Containment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Umbrella className="w-4 h-4 text-rose-400" /> Portal Klaim Asuransi Mikro Otomatis
            (Engine 06)
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setClaimStatus(
                `Klaim ${claimReason} sebesar ${claimAmount} terverifikasi otomatis -> cair ke E-Wallet (100% Claims Paid).`
              );
              onQueueOfflineAction('Asuransi Mikro', `Klaim ${claimReason} (${claimAmount})`);
            }}
            className="space-y-3 text-xs"
          >
            <div>
              <label className="block text-slate-400 mb-1">Jenis Risiko / Klaim</label>
              <select
                value={claimReason}
                onChange={(e) => setClaimReason(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              >
                <option>Kecelakaan Kerja Konstruksi 3T</option>
                <option>Bencana Alam / Kerusakan Hunian</option>
                <option>Gagal Panen / Krisis Cuaca Ekstrem</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Nominal Santunan Otomatis</label>
              <input
                type="text"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 font-mono text-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
            >
              Ajukan Klaim Otomatis
            </button>
          </form>
          {claimStatus && (
            <p className="text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg p-3">
              {claimStatus}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" /> ERRS (Economic Risk Resilience
            System) Dashboard
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
              <span className="text-slate-400 block">Inflasi Pangan Regional 3T</span>
              <span className="font-mono text-lg font-extrabold text-amber-400">+4.8% (Waspada)</span>
            </div>
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
              <span className="text-slate-400 block">Risk Buffer Tersedia</span>
              <span className="font-mono text-lg font-extrabold text-emerald-400">
                Rp {120 - bufferDeployed}M / 120M
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setBufferDeployed((b) => Math.min(120, b + 5));
              onQueueOfflineAction('ERRS Buffer', 'Penyaluran darurat Rp 5M ke zona inflasi tinggi');
            }}
            className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
          >
            Salurkan Buffer Dana Darurat Rp 5M ke Posko Terdampak
          </button>
        </div>
      </div>

      {/* 3. Offline LoRa/HT Terminal & Anonymous Whistleblowing Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Offline LoRa/HT Communication Terminal */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" /> Terminal Radio LoRa / HT Offline (3T)
            </h3>
            <span className="font-mono text-[11px] text-amber-300">Mode: {connectivityMode}</span>
          </div>

          <select
            value={loraChannel}
            onChange={(e) => setLoraChannel(e.target.value)}
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs font-mono text-cyan-300"
          >
            <option>CH-03 · 915.2 MHz (Sumba-Papua Mesh)</option>
            <option>CH-07 · 433.0 MHz (HT Posko Krayan-Maluku)</option>
            <option>CH-11 · Satelit Emergency Beacon</option>
          </select>

          <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 h-36 overflow-y-auto space-y-1.5 font-mono text-[11px] text-emerald-300">
            {loraLogs.map((log, i) => (
              <p key={i}>{log}</p>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!loraInput.trim()) return;
              const line = `[${new Date().toLocaleTimeString('id-ID')} · ${loraChannel.slice(
                0,
                5
              )}] ${role.shortName}: ${loraInput}`;
              setLoraLogs((prev) => [...prev, line]);
              onQueueOfflineAction('Radio LoRa/HT', loraInput);
              setLoraInput('');
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={loraInput}
              onChange={(e) => setLoraInput(e.target.value)}
              placeholder="Ketik pesan pendek radio LoRa/HT (tanpa internet)..."
              className="flex-1 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Transmit
            </button>
          </form>
        </div>

        {/* Anonymous Whistleblowing Channel (Shadow Team Integration) */}
        <div className="rounded-xl bg-slate-900 border border-red-900/50 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-400" /> Saluran Whistleblowing Anonim Terenkripsi
            (Shadow Team L6)
          </h3>
          <p className="text-xs text-slate-400">
            Identitas pelapor warga, tetangga sekitar, maupun staf internal dienkripsi penuh dan
            tidak dilacak sistem.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const ticket = `WBL-${Math.floor(10000 + Math.random() * 89999)}`;
              setWhistleReceipt(
                `Laporan Terenkripsi ${ticket} diterima Shadow Team Layer 6. Identitas Anda anonim 100%.`
              );
              setWhistleTarget('');
              setWhistleDesc('');
            }}
            className="space-y-2.5 text-xs"
          >
            <input
              type="text"
              required
              value={whistleTarget}
              onChange={(e) => setWhistleTarget(e.target.value)}
              placeholder="Posko / Oknum / Indikasi Pelanggaran..."
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-white"
            />
            <textarea
              rows={3}
              required
              value={whistleDesc}
              onChange={(e) => setWhistleDesc(e.target.value)}
              placeholder="Jelaskan dugaan fraud, pungli, atau penyimpangan penyaluran..."
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-white"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" /> Kirim Laporan Rahasia Terenkripsi
            </button>
          </form>
          {whistleReceipt && (
            <p className="text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{whistleReceipt}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

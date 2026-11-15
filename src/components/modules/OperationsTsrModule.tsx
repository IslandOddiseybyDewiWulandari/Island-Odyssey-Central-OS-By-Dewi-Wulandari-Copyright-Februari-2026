import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardList,
  Fingerprint,
  MapPin,
  RefreshCw,
  ScanFace,
  Send,
  ShieldCheck,
  UploadCloud,
  UserPlus,
} from 'lucide-react';
import { INITIAL_TSR_REPORTS } from '../../data/mockEcosystem';
import { ConnectivityMode, DailyTsrReport, OfflineSyncItem, RoleDefinition } from '../../types/os';

interface OperationsTsrModuleProps {
  role: RoleDefinition;
  connectivityMode: ConnectivityMode;
  syncQueue: OfflineSyncItem[];
  onSyncAll: () => void;
  onQueueOfflineAction: (module: string, summary: string) => void;
}

export const OperationsTsrModule: React.FC<OperationsTsrModuleProps> = ({
  role,
  connectivityMode,
  syncQueue,
  onSyncAll,
  onQueueOfflineAction,
}) => {
  // 1. Live Biometric & Geofencing Attendance
  const [checkedIn, setCheckedIn] = useState<boolean>(role.biometricVerified);
  const [biometricMethod, setBiometricMethod] = useState<'Face Recognition' | 'Fingerprint WebAuthn'>(
    'Face Recognition'
  );
  const [geofenceValid, setGeofenceValid] = useState<boolean>(true);
  const [attendanceLog, setAttendanceLog] = useState<string>(
    `Check-in valid pada 07:32 WITA · ${role.geofenceLocation} (${role.coordinates})`
  );

  // 2. Multi-Step Form Wizard (Step 1-4 PAMA TSR Style)
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);
  const [reports, setReports] = useState<DailyTsrReport[]>(INITIAL_TSR_REPORTS);
  const [taskCategory, setTaskCategory] = useState<'Lapangan' | 'Administrasi (Office)'>('Lapangan');
  const [reporterName, setReporterName] = useState(role.shortName);
  const [shift, setShift] = useState<DailyTsrReport['shift']>('Pagi (07:00-15:00)');
  const [workHours, setWorkHours] = useState<number>(8);
  const [taskTitle, setTaskTitle] = useState(
    'Pemasangan & Verifikasi Solar Microgrid + Progres Hunian Posko 3T'
  );
  const [unitCode, setUnitCode] = useState('POSKO-NTT-01 / UNIT-04');
  const [dynamicFieldVal, setDynamicFieldVal] = useState('42 Kepala Keluarga Terlayani');
  const [materialUsed, setMaterialUsed] = useState('Semen SNI 24 Sak + Panel Surya 550Wp (2 Unit)');
  const [evidenceFile, setEvidenceFile] = useState('foto_gps_lapangan_20261114.jpg');
  const [notes, setNotes] = useState(
    'Pekerjaan berjalan sesuai SLA; koordinat GPS & foto multi-sudut terlampir.'
  );
  const [tsrSubmittedMsg, setTsrSubmittedMsg] = useState<string | null>(null);

  // 3. Pengajuan Izin & Libur Berjenjang
  const [leaveReason, setLeaveReason] = useState<'Sakit' | 'Duka' | 'Tugas Luar' | 'Libur Terjadwal'>(
    'Tugas Luar'
  );
  const [leaveNote, setLeaveNote] = useState('');
  const [leaveList, setLeaveList] = useState([
    {
      id: 'IZN-402',
      applicant: role.shortName,
      reason: 'Tugas Luar',
      note: 'Koordinasi serah terima Cargo of Care di Dermaga Kupang',
      status: 'Disetujui HR Lapangan → Menunggu HR Pusat',
    },
  ]);

  // 4. Delegasi & Rolling Tugas Darurat
  const [delegateTo, setDelegateTo] = useState('Tim Cadangan Posko #02 (Raka Mahendra)');
  const [delegateReason, setDelegateReason] = useState('Kendala Cuaca / Rolling Shift Otomatis');
  const [delegationLog, setDelegationLog] = useState<string[]>([
    'Shift Malam KM Nusantara 04 di-rolling ke Capt. Cadangan Melkianus Rihi (Zero Vacancy)',
  ]);

  const handleBiometricAction = (action: 'Check-In' | 'Check-Out') => {
    const now = new Date().toLocaleTimeString('id-ID');
    if (!geofenceValid) {
      setAttendanceLog(
        `DITOLAK (Layer 6 Geofencing): Lokasi terdeteksi di luar radius Posko ${role.geofenceLocation}!`
      );
      return;
    }
    setCheckedIn(action === 'Check-In');
    const msg = `${action} Biometrik (${biometricMethod}) SAH pada ${now} WITA · GPS ${role.coordinates}`;
    setAttendanceLog(msg);
    onQueueOfflineAction('Absensi Biometrik', msg);
  };

  const handleFinalSubmitTsr = () => {
    const newReport: DailyTsrReport = {
      id: `TSR-2026-${Math.floor(882 + Math.random() * 110)}`,
      reporterName,
      roleName: role.name,
      shift,
      workHours,
      taskTitle: `[${taskCategory}] ${taskTitle}`,
      unitCode: `${unitCode} (${dynamicFieldVal})`,
      gpsLocation: `${role.coordinates} (${role.geofenceLocation})`,
      materialUsed,
      evidenceFile,
      notes,
      timestamp: `${new Date().toLocaleTimeString('id-ID')} WITA`,
      syncStatus: connectivityMode === 'Online' ? 'Synced' : 'Queued Offline',
    };
    setReports((prev) => [newReport, ...prev]);
    setTsrSubmittedMsg(
      `Laporan ${newReport.id} berhasil disimpan (${newReport.syncStatus} via mode ${connectivityMode}) & di-auto-backup ke Ledger A-to-Z.`
    );
    onQueueOfflineAction('Laporan TSR Wizard', `${newReport.id}: ${taskTitle}`);
    setWizardStep(1);
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      id: `IZN-${Math.floor(410 + Math.random() * 500)}`,
      applicant: role.shortName,
      reason: leaveReason,
      note: leaveNote || `Pengajuan ${leaveReason}`,
      status: 'Menunggu Persetujuan HR Lapangan → HR Pusat',
    };
    setLeaveList((prev) => [next, ...prev]);
    setLeaveNote('');
    onQueueOfflineAction('Perizinan Berjenjang', `Pengajuan ${leaveReason} (${next.id})`);
  };

  const handleDelegateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = `Tugas dilimpahkan dari ${role.shortName} ke ${delegateTo} (${delegateReason}) · Auto-Rolling Aktif`;
    setDelegationLog((prev) => [entry, ...prev]);
    onQueueOfflineAction('Delegasi & Rolling', entry);
  };

  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-semibold text-cyan-400">
          Layer 1 &amp; 2 · Biometric Geofencing, PAMA TSR Wizard &amp; Offline-First Sync
        </p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
          Operasional Harian, Absensi Biometrik, TSR Wizard &amp; Delegasi
        </h2>
      </div>

      {/* 1. Absensi Biometric & Geofencing Real-Time */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Absensi Biometrik &amp;
              Geolocation Geofencing (WebAuthn + GPS)
            </h3>
            <p className="text-xs text-slate-400">
              Lokasi Posko: <span className="text-white font-semibold">{role.geofenceLocation}</span>{' '}
              · GPS <span className="font-mono text-cyan-400">{role.coordinates}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setGeofenceValid((v) => !v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                geofenceValid
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-500/15 border-red-500/50 text-red-300'
              }`}
            >
              {geofenceValid ? 'GPS Dalam Radius Geofence' : 'Simulasi: Di Luar Radius GPS'}
            </button>
            <button
              type="button"
              onClick={() =>
                setBiometricMethod((m) =>
                  m === 'Face Recognition' ? 'Fingerprint WebAuthn' : 'Face Recognition'
                )
              }
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 cursor-pointer"
            >
              Metode: {biometricMethod}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              {biometricMethod === 'Face Recognition' ? (
                <ScanFace className="w-5 h-5" />
              ) : (
                <Fingerprint className="w-5 h-5" />
              )}
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">
                Status: {checkedIn ? 'Sedang Bertugas (Checked-In)' : 'Checked-Out'}
              </p>
              <p className="text-slate-300 font-mono mt-0.5">{attendanceLog}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleBiometricAction('Check-In')}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
            >
              Check-In Biometrik
            </button>
            <button
              type="button"
              onClick={() => handleBiometricAction('Check-Out')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold cursor-pointer"
            >
              Check-Out
            </button>
          </div>
        </div>
      </div>

      {/* 2. MULTI-STEP FORM WIZARD & SUBMISSION PREVIEW (PAMA TSR STYLE) */}
      <div className="rounded-xl bg-slate-900 border border-cyan-800/50 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-cyan-400" /> Multi-Step Form Wizard Pelaporan
              Harian (PAMA TSR Style)
            </h3>
            <p className="text-xs text-slate-400">
              Lengkapi Step 1 hingga Step 4 Card Preview sebelum mengirim laporan operasional.
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            {(['Lapangan', 'Administrasi (Office)'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTaskCategory(cat)}
                className={`px-3 py-1.5 rounded font-semibold cursor-pointer ${
                  taskCategory === cat ? 'bg-cyan-600 text-white' : 'text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Stepper Indicator (Steps 1-4) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { num: 1, title: 'Step 1: Identitas & Shift' },
            { num: 2, title: 'Step 2: Task, GPS & Unit' },
            { num: 3, title: 'Step 3: Bukti & Material' },
            { num: 4, title: 'Step 4: Preview Ringkasan' },
          ].map((s) => {
            const active = wizardStep === s.num;
            const passed = wizardStep > s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setWizardStep(s.num as 1 | 2 | 3 | 4)}
                className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                  active
                    ? 'bg-cyan-600/20 border-cyan-500 text-white'
                    : passed
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <p className="font-mono font-bold">0{s.num}</p>
                <p className="font-semibold mt-0.5 truncate">{s.title}</p>
              </button>
            );
          })}
        </div>

        {/* Wizard Step Content */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4 text-xs">
          {wizardStep === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Nama Petugas / PIC</label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Shift Kerja</label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value as DailyTsrReport['shift'])}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                >
                  <option value="Pagi (07:00-15:00)">Pagi (07:00-15:00)</option>
                  <option value="Siang (15:00-23:00)">Siang (15:00-23:00)</option>
                  <option value="Malam (23:00-07:00)">Malam (23:00-07:00)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Durasi Jam Kerja (Jam)</label>
                <input
                  type="number"
                  min={1}
                  max={16}
                  step={0.5}
                  value={workHours}
                  onChange={(e) => setWorkHours(Number(e.target.value))}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 font-mono text-white"
                />
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">
                  Rincian Task ({taskCategory})
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Kode Unit / Posko / Berkas</label>
                <input
                  type="text"
                  value={unitCode}
                  onChange={(e) => setUnitCode(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">
                  {taskCategory === 'Lapangan'
                    ? 'Dynamic Field: Output Fisik / Warga Terlayani'
                    : 'Dynamic Field: Nomor Dokumen / Anggaran Diverifikasi'}
                </label>
                <input
                  type="text"
                  value={dynamicFieldVal}
                  onChange={(e) => setDynamicFieldVal(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2 text-emerald-400 font-mono">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>
                  GPS Terkunci Otomatis: {role.coordinates} ({role.geofenceLocation})
                </span>
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">
                    Bukti Foto / Video Ber-GPS
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={evidenceFile}
                      onChange={(e) => setEvidenceFile(e.target.value)}
                      className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 font-mono text-white"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-semibold cursor-pointer">
                      <Camera className="w-4 h-4" /> Pilih
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) setEvidenceFile(f.name);
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Material / Part / Lampiran</label>
                  <input
                    type="text"
                    value={materialUsed}
                    onChange={(e) => setMaterialUsed(e.target.value)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Catatan Kendala &amp; Progres</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white"
                />
              </div>
            </div>
          )}

          {wizardStep === 4 && (
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-900 border border-emerald-500/40 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-400 text-sm">
                    Card Preview — Ringkasan Sebelum Pengiriman
                  </span>
                  <span className="font-mono text-cyan-300">Mode: {connectivityMode}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Petugas &amp; Role</span>
                    <span className="font-bold text-white">
                      {reporterName} ({role.shortName})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Shift &amp; Durasi</span>
                    <span className="font-mono text-white">
                      {shift} · {workHours} Jam
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Task &amp; Unit</span>
                    <span className="font-semibold text-white">
                      [{taskCategory}] {taskTitle} ({unitCode})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Lokasi GPS &amp; Output</span>
                    <span className="font-mono text-cyan-300">
                      {role.coordinates} · {dynamicFieldVal}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Material / Part</span>
                    <span className="text-slate-200">{materialUsed}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Bukti Foto/Video Ber-GPS</span>
                    <span className="font-mono text-emerald-300">{evidenceFile}</span>
                  </div>
                </div>
                <p className="text-slate-300 bg-slate-950 rounded p-2.5 border border-slate-800">
                  Catatan: {notes}
                </p>
              </div>
            </div>
          )}

          {/* Wizard Navigation Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              type="button"
              disabled={wizardStep === 1}
              onClick={() => setWizardStep((s) => Math.max(1, s - 1) as 1 | 2 | 3 | 4)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Sebelumnya
            </button>

            {wizardStep < 4 ? (
              <button
                type="button"
                onClick={() => setWizardStep((s) => Math.min(4, s + 1) as 1 | 2 | 3 | 4)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer"
              >
                Lanjut ke Step {wizardStep + 1} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmitTsr}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Kirim Laporan
              </button>
            )}
          </div>

          {tsrSubmittedMsg && (
            <p className="text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg p-3">
              {tsrSubmittedMsg}
            </p>
          )}
        </div>

        {/* Recent Submitted TSR Logs + Offline 1-Click Sync */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <p className="text-xs font-bold text-slate-300">
            Riwayat Laporan Harian Terkini ({reports.length}) · Antrean Offline: {syncQueue.filter((q) => !q.synced).length}
          </p>
          <button
            type="button"
            onClick={onSyncAll}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" /> 1-Click Sync &amp; Auto-Backup
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {reports.slice(0, 4).map((r) => (
            <div
              key={r.id}
              className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-400">{r.id}</span>
                <span
                  className={`font-mono font-semibold ${
                    r.syncStatus === 'Synced' ? 'text-emerald-400' : 'text-amber-300'
                  }`}
                >
                  {r.syncStatus} · {r.timestamp}
                </span>
              </div>
              <p className="font-bold text-white">{r.taskTitle}</p>
              <p className="text-slate-400">
                {r.reporterName} · {r.shift} ({r.workHours}j) · {r.gpsLocation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Pengajuan Izin Berjenjang & 4. Delegasi / Rolling Tugas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Form Pengajuan Izin & Libur */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-amber-400" /> Pengajuan Izin &amp; Libur
            Berjenjang (HR Lapangan → HR Pusat)
          </h3>
          <form onSubmit={handleLeaveSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <select
                value={leaveReason}
                onChange={(e) =>
                  setLeaveReason(
                    e.target.value as 'Sakit' | 'Duka' | 'Tugas Luar' | 'Libur Terjadwal'
                  )
                }
                className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              >
                <option value="Sakit">Sakit</option>
                <option value="Duka">Duka / Keadaan Keluarga</option>
                <option value="Tugas Luar">Tugas Luar Lapangan</option>
                <option value="Libur Terjadwal">Libur Terjadwal</option>
              </select>
              <input
                type="text"
                value={leaveNote}
                onChange={(e) => setLeaveNote(e.target.value)}
                placeholder="Keterangan singkat & tanggal..."
                className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer"
            >
              Ajukan Izin Berjenjang
            </button>
          </form>

          <div className="space-y-2">
            {leaveList.map((l) => (
              <div
                key={l.id}
                className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs space-y-0.5"
              >
                <div className="flex justify-between">
                  <span className="font-mono font-bold text-cyan-400">
                    {l.id} · {l.reason}
                  </span>
                  <span className="text-emerald-400 font-semibold">{l.status}</span>
                </div>
                <p className="text-slate-300">{l.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delegasi & Rolling Tugas Darurat */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-emerald-400" /> Delegasi &amp; Rolling Tugas Darurat
            (Zero Vacancy)
          </h3>
          <form onSubmit={handleDelegateSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <select
                value={delegateTo}
                onChange={(e) => setDelegateTo(e.target.value)}
                className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              >
                <option>Tim Cadangan Posko #02 (Raka Mahendra)</option>
                <option>Capt. Cadangan Melkianus Rihi (Armada)</option>
                <option>Inspektor QC Regional (Siti Rahmawati)</option>
              </select>
              <select
                value={delegateReason}
                onChange={(e) => setDelegateReason(e.target.value)}
                className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-white"
              >
                <option>Kendala Cuaca / Rolling Shift Otomatis</option>
                <option>Halangan Sakit / Kondisi Darurat</option>
                <option>Rintangan Geografis 3T</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Delegasikan &amp; Aktifkan Rolling Shift
            </button>
          </form>

          <div className="space-y-2">
            {delegationLog.map((d, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs text-slate-200 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Briefcase,
  ClipboardList,
  Database,
  Globe2,
  Home,
  LayoutDashboard,
  Lock,
  LogOut,
  MapPin,
  Menu,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Siren,
  Store,
  UploadCloud,
  Wallet,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import { ROLES_19 } from '../data/mockEcosystem';
import {
  ConnectivityMode,
  DashboardTab,
  OfflineSyncItem,
  RoleDefinition,
  RoleId,
} from '../types/os';
import { FinanceLedgerModule } from './modules/FinanceLedgerModule';
import { LogisticsCargoModule } from './modules/LogisticsCargoModule';
import { MonitoringSixLayerModule } from './modules/MonitoringSixLayerModule';
import { OperationsTsrModule } from './modules/OperationsTsrModule';
import { OverviewByRole } from './modules/OverviewByRole';
import { RegionalHousingModule } from './modules/RegionalHousingModule';
import { SpecialEcosystemModule } from './modules/SpecialEcosystemModule';
import { UarsModule } from './modules/UarsModule';

interface DashboardLayoutProps {
  activeRole: RoleDefinition;
  activeTab: DashboardTab;
  connectivityMode: ConnectivityMode;
  syncQueue: OfflineSyncItem[];
  isAccountFrozen: boolean;
  onChangeTab: (tab: DashboardTab) => void;
  onSwitchRole: (roleId: RoleId) => void;
  onChangeConnectivity: (mode: ConnectivityMode) => void;
  onSyncAll: () => void;
  onQueueOfflineAction: (module: string, summary: string) => void;
  onToggleFreeze: () => void;
  onOpenSos: () => void;
  onOpenRolePortal: () => void;
  onBackToLanding: () => void;
}

const SIDEBAR_ITEMS: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'uars', label: 'UARS (Tenaga Kerja)', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'tie_ekonomi', label: 'Ekonomi, TIE & Seoul Bridge', icon: <Store className="w-4 h-4" /> },
  { id: 'monitoring_6_layer', label: 'Monitoring 6-Layer', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'keuangan_ledger', label: 'Keuangan & Ledger A-to-Z', icon: <Wallet className="w-4 h-4" /> },
  { id: 'logistik_cargo', label: 'Logistik, Armada & QC', icon: <Ship className="w-4 h-4" /> },
  { id: 'wilayah_hunian', label: 'Wilayah & Hunian 3T', icon: <MapPin className="w-4 h-4" /> },
  { id: 'operasional_tsr', label: 'Absensi, TSR & Delegasi', icon: <ClipboardList className="w-4 h-4" /> },
  { id: 'konsorsium_errs', label: 'Konsorsium, ERRS & LoRa', icon: <Globe2 className="w-4 h-4" /> },
  { id: 'kategori_248', label: '248 Kategori Ekosistem', icon: <Database className="w-4 h-4" /> },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeRole,
  activeTab,
  connectivityMode,
  syncQueue,
  isAccountFrozen,
  onChangeTab,
  onSwitchRole,
  onChangeConnectivity,
  onSyncAll,
  onQueueOfflineAction,
  onToggleFreeze,
  onOpenSos,
  onOpenRolePortal,
  onBackToLanding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isOfflineMode = connectivityMode !== 'Online';
  const pendingCount = syncQueue.filter((q) => !q.synced).length;

  const renderMainContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewByRole
            role={activeRole}
            onNavigateTab={onChangeTab}
            onOpenSos={onOpenSos}
          />
        );
      case 'uars':
        return (
          <UarsModule role={activeRole} onQueueOfflineAction={onQueueOfflineAction} />
        );
      case 'monitoring_6_layer':
        return (
          <MonitoringSixLayerModule
            role={activeRole}
            isAccountFrozen={isAccountFrozen}
            onToggleFreeze={onToggleFreeze}
            onQueueOfflineAction={onQueueOfflineAction}
          />
        );
      case 'keuangan_ledger':
        return (
          <FinanceLedgerModule
            role={activeRole}
            isAccountFrozen={isAccountFrozen}
            onQueueOfflineAction={onQueueOfflineAction}
          />
        );
      case 'logistik_cargo':
        return (
          <LogisticsCargoModule
            role={activeRole}
            onQueueOfflineAction={onQueueOfflineAction}
          />
        );
      case 'wilayah_hunian':
        return (
          <RegionalHousingModule
            role={activeRole}
            onOpenSos={onOpenSos}
            onQueueOfflineAction={onQueueOfflineAction}
          />
        );
      case 'operasional_tsr':
        return (
          <OperationsTsrModule
            role={activeRole}
            connectivityMode={connectivityMode}
            syncQueue={syncQueue}
            onSyncAll={onSyncAll}
            onQueueOfflineAction={onQueueOfflineAction}
          />
        );
      case 'tie_ekonomi':
      case 'konsorsium_errs':
      case 'kategori_248':
        return (
          <SpecialEcosystemModule
            mode={activeTab}
            role={activeRole}
            connectivityMode={connectivityMode}
            onQueueOfflineAction={onQueueOfflineAction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#07111E] text-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="no-print hidden lg:flex lg:flex-col lg:w-72 bg-slate-950 border-r border-slate-800 shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToLanding}
            className="text-left cursor-pointer group"
          >
            <p className="text-sm font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              ISLAND ODYSSEY OS
            </p>
            <p className="text-[11px] font-mono text-cyan-400">Central OS · 19 Role RBAC</p>
          </button>
          <button
            type="button"
            onClick={onBackToLanding}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            title="Halaman Utama"
            aria-label="Kembali ke Halaman Utama"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Menu Modul Central OS">
          {SIDEBAR_ITEMS.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-left ${
                  active
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Emergency & Anonymous Whistleblowing */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            type="button"
            onClick={() => onChangeTab('konsorsium_errs')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-red-300 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Whistleblowing Anonim (L6)</span>
          </button>
          <button
            type="button"
            onClick={onOpenSos}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/35 border border-red-500/50 text-xs font-bold text-red-200 cursor-pointer"
          >
            <Siren className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Emergency Mode / Posko</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/80"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative z-10 w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 flex flex-col h-full">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">ISLAND ODYSSEY OS</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onChangeTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-left ${
                    activeTab === item.id
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top OS Header: Role Indicator, Connectivity Switcher, Quick-Role Switcher, Logout */}
        <header className="no-print bg-slate-900/95 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-200 cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                <span>ROLE AKTIF: {activeRole.code}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{activeRole.shortName}</span>
              </div>
              <p className="text-xs text-slate-400 truncate hidden sm:block">
                {activeRole.layerAccess}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Offline-First Connectivity Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5">
              {isOfflineMode ? (
                <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              ) : (
                <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
              <label htmlFor="conn-mode" className="sr-only">
                Mode Konektivitas
              </label>
              <select
                id="conn-mode"
                value={connectivityMode}
                onChange={(e) => onChangeConnectivity(e.target.value as ConnectivityMode)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="Online" className="bg-slate-900">
                  Online (Fiber/4G)
                </option>
                <option value="LoRa" className="bg-slate-900">
                  LoRa (915 MHz)
                </option>
                <option value="HT" className="bg-slate-900">
                  HT (Radio VHF)
                </option>
                <option value="SMS" className="bg-slate-900">
                  SMS Gateway
                </option>
              </select>
            </div>

            {/* Quick-Role Switcher (Instant switch across 19 Roles) */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-cyan-700/60 rounded-lg px-2.5 py-1.5">
              <label htmlFor="quick-role" className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
                19-Role:
              </label>
              <select
                id="quick-role"
                value={activeRole.id}
                onChange={(e) => onSwitchRole(e.target.value as RoleId)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none max-w-[175px] sm:max-w-[220px] cursor-pointer"
              >
                {ROLES_19.map((r) => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                    {r.code} — {r.shortName}
                  </option>
                ))}
              </select>
            </div>

            {/* Switch Role / Logout Button */}
            <button
              type="button"
              onClick={onOpenRolePortal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 whitespace-nowrap cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch Role / Logout</span>
            </button>
          </div>
        </header>

        {/* Offline-First Warning Banner when LoRa / HT / SMS selected */}
        {isOfflineMode && (
          <div className="no-print bg-amber-500/15 border-b border-amber-500/50 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-200 font-semibold">
              <Radio className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Mode Offline Aktif ({connectivityMode}). Data akan disinkronkan saat terhubung
                kembali. ({pendingCount} data lokal tertunda)
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onChangeConnectivity('Online');
                onSyncAll();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" /> Hubungkan &amp; Sync Sekarang
            </button>
          </div>
        )}

        {/* Frozen Account Warning (Layer 6) */}
        {isAccountFrozen && (
          <div className="no-print bg-red-600/20 border-b border-red-500/50 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-red-200">
            <span className="font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              PERINGATAN LAYER 6: E-Wallet demo sedang dalam status SYSTEM FREEZE.
            </span>
            <button
              type="button"
              onClick={() => onChangeTab('monitoring_6_layer')}
              className="underline font-bold text-white cursor-pointer"
            >
              Ajukan Video Direct Sanggah →
            </button>
          </div>
        )}

        {/* Active Module Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto pb-24">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

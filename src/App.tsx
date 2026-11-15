import React, { useState } from 'react';
import { CopyrightBanner } from './components/CopyrightBanner';
import { DashboardLayout } from './components/DashboardLayout';
import { FloatingSosModal } from './components/FloatingSosModal';
import { LandingPage } from './components/LandingPage';
import { RoleLoginModal } from './components/RoleLoginModal';
import { ROLES_19 } from './data/mockEcosystem';
import {
  ConnectivityMode,
  DashboardTab,
  OfflineSyncItem,
  RoleId,
  SosAlert,
} from './types/os';

type ViewMode = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeRoleId, setActiveRoleId] = useState<RoleId>('founder');
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [connectivityMode, setConnectivityMode] = useState<ConnectivityMode>('Online');
  const [isAccountFrozen, setIsAccountFrozen] = useState<boolean>(false);

  const [sosModalOpen, setSosModalOpen] = useState<boolean>(false);
  const [sosAlerts, setSosAlerts] = useState<SosAlert[]>([
    {
      id: 'SOS-4901',
      category: 'Bencana Alam',
      subType: 'Tanah Longsor',
      gps: '3.8970, 115.6910 (Posko Krayan 3T)',
      description: 'Akses jalan logistik tertutup longsor; membutuhkan UAV dropping pangan.',
      reporterRole: 'Staff Operasional Lapangan',
      timestamp: 'Hari ini, 08:12 WITA',
      stage: 'Tim Menuju Lokasi',
    },
  ]);

  const [syncQueue, setSyncQueue] = useState<OfflineSyncItem[]>([
    {
      id: 'SYN-101',
      module: 'UARS Lapangan',
      summary: 'Validasi 12 pekerja konstruksi Huntap Kambera',
      mode: 'LoRa',
      createdAt: '08:50 WITA',
      synced: true,
    },
  ]);

  const activeRole = ROLES_19.find((r) => r.id === activeRoleId) || ROLES_19[0];

  const handleSelectRoleFromPortal = (roleId: RoleId) => {
    const target = ROLES_19.find((r) => r.id === roleId) || ROLES_19[0];
    setActiveRoleId(roleId);
    setActiveTab(target.defaultTab);
    setViewMode('dashboard');
  };

  const handleQuickEnterDashboard = (roleId: RoleId, tab?: DashboardTab) => {
    const target = ROLES_19.find((r) => r.id === roleId) || ROLES_19[0];
    setActiveRoleId(roleId);
    setActiveTab(tab || target.defaultTab);
    setViewMode('dashboard');
  };

  const handleSwitchRoleInHeader = (roleId: RoleId) => {
    const target = ROLES_19.find((r) => r.id === roleId) || ROLES_19[0];
    setActiveRoleId(roleId);
    setActiveTab(target.defaultTab);
  };

  const handleQueueOfflineAction = (module: string, summary: string) => {
    const item: OfflineSyncItem = {
      id: `SYN-${Math.floor(200 + Math.random() * 799)}`,
      module,
      summary,
      mode: connectivityMode,
      createdAt: `${new Date().toLocaleTimeString('id-ID')} WITA`,
      synced: connectivityMode === 'Online',
    };
    setSyncQueue((prev) => [item, ...prev]);
  };

  const handleSyncAll = () => {
    setSyncQueue((prev) => prev.map((q) => ({ ...q, synced: true })));
  };

  const handleTriggerSos = (alert: SosAlert) => {
    setSosAlerts((prev) => [alert, ...prev]);
    handleQueueOfflineAction('SOS Darurat', `${alert.subType} @ ${alert.gps}`);
  };

  const handleAdvanceSosStage = (id: string) => {
    setSosAlerts((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const nextStage =
          a.stage === 'Sinyal Diterima'
            ? 'Tim Menuju Lokasi'
            : a.stage === 'Tim Menuju Lokasi'
            ? 'Kondisi Aman'
            : 'Kondisi Aman';
        return { ...a, stage: nextStage };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07111E] text-slate-100">
      {/* Permanent Sticky Red-Gold Copyright Banner at top of EVERY page & all 19 Role Dashboards */}
      <CopyrightBanner />

      <div className="flex-1">
        {viewMode === 'landing' && (
          <LandingPage
            onEnterLogin={() => setViewMode('login')}
            onQuickEnterDashboard={handleQuickEnterDashboard}
            onOpenEmergencyModal={() => setSosModalOpen(true)}
          />
        )}

        {viewMode === 'login' && (
          <RoleLoginModal
            activeRoleId={activeRoleId}
            onSelectRole={handleSelectRoleFromPortal}
            onBackToLanding={() => setViewMode('landing')}
          />
        )}

        {viewMode === 'dashboard' && (
          <DashboardLayout
            activeRole={activeRole}
            activeTab={activeTab}
            connectivityMode={connectivityMode}
            syncQueue={syncQueue}
            isAccountFrozen={isAccountFrozen}
            onChangeTab={setActiveTab}
            onSwitchRole={handleSwitchRoleInHeader}
            onChangeConnectivity={setConnectivityMode}
            onSyncAll={handleSyncAll}
            onQueueOfflineAction={handleQueueOfflineAction}
            onToggleFreeze={() => setIsAccountFrozen((v) => !v)}
            onOpenSos={() => setSosModalOpen(true)}
            onOpenRolePortal={() => setViewMode('login')}
            onBackToLanding={() => setViewMode('landing')}
          />
        )}
      </div>

      {/* Persistent Floating SOS Button & Emergency Modal across ALL pages & 19 Dashboards */}
      <FloatingSosModal
        activeRoleName={viewMode === 'landing' ? 'Publik / Warga' : activeRole.shortName}
        defaultCoordinates={activeRole.coordinates}
        defaultLocation={activeRole.geofenceLocation}
        externalOpen={sosModalOpen}
        onCloseExternal={() => setSosModalOpen(false)}
        sosAlerts={sosAlerts}
        onTriggerSos={handleTriggerSos}
        onAdvanceSosStage={handleAdvanceSosStage}
      />
    </div>
  );
}

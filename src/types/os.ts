export type RoleId =
  | 'founder'
  | 'admin_pusat'
  | 'konsorsium_global'
  | 'hr_pusat'
  | 'hr_lapangan'
  | 'staff_pusat'
  | 'staff_ops_lapangan'
  | 'tim_eksekutor_harian'
  | 'tim_verifikasi_internal'
  | 'tim_qc'
  | 'tim_audit_kap_freelance'
  | 'shadow_team'
  | 'tim_keuangan_escrow'
  | 'risk_errs_manager'
  | 'armada_laut'
  | 'armada_darat'
  | 'armada_udara'
  | 'mitra_strategis'
  | 'warga_beneficiary';

export type DashboardTab =
  | 'overview'
  | 'uars'
  | 'tie_ekonomi'
  | 'monitoring_6_layer'
  | 'keuangan_ledger'
  | 'logistik_cargo'
  | 'wilayah_hunian'
  | 'operasional_tsr'
  | 'konsorsium_errs'
  | 'kategori_248';

export type ConnectivityMode = 'Online' | 'LoRa' | 'HT' | 'SMS';

export interface RoleDefinition {
  id: RoleId;
  code: string;
  name: string;
  shortName: string;
  cluster:
    | 'Eksekutif & Tata Kelola'
    | 'SDM & Operasional Lapangan'
    | 'Audit, QC & Pengawasan'
    | 'Keuangan & Manajemen Risiko'
    | 'Armada Cargo of Care'
    | 'Mitra & Komunitas Warga';
  layerAccess: string;
  summary: string;
  defaultTab: DashboardTab;
  walletBalance: number;
  dailyIncentive: number;
  workingHoursToday: number;
  biometricVerified: boolean;
  geofenceLocation: string;
  coordinates: string;
  isFrozen?: boolean;
}

export interface CoreEngine {
  id: string;
  number: string;
  officialName: string;
  shortTitle: string;
  healthPercent: number;
  status: 'ONLINE' | 'ACTIVE';
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
  description: string;
  targetTab: DashboardTab;
  accentColor: 'cyan' | 'emerald' | 'amber' | 'sky' | 'indigo' | 'rose' | 'teal' | 'blue';
  simParams: {
    name: string;
    unit: string;
    min: number;
    max: number;
    value: number;
  };
}

export type CategoryGroup =
  | 'Core Beneficiaries'
  | 'Active Contributors'
  | 'Strategic Entities'
  | 'Conditional Beneficiaries';

export interface EcosystemCategory {
  id: number;
  code: string;
  name: string;
  group: CategoryGroup;
  type: 'Penerima' | 'Mitra';
  verifiedCount: number;
  regionFocus: string;
}

export interface LedgerTransaction {
  id: string;
  programName: string;
  category: 'Dana Program' | 'Gradual Release' | 'Klaim Asuransi' | 'Penalti/Denda' | 'E-Wallet Freeze' | 'Logistik Cargo';
  amount: string;
  sha256: string;
  timestamp: string;
  timezone: 'WIB' | 'WITA' | 'WIT';
  coordinates: string;
  slaStatus: 'On SLA' | 'Warning SLA' | 'Breach' | 'Frozen';
  isPublicAnonymized?: boolean;
  steps: {
    stage: string;
    actor: string;
    timestamp: string;
    gps: string;
    progress: number;
    sla: string;
    status: 'completed' | 'active' | 'pending' | 'flagged';
    manualNote: string;
    cctvStatus: string;
    droneStatus: string;
  }[];
}

export interface RegionalNode {
  id: string;
  island: string;
  kabKota: string;
  kecamatan: string;
  poskoCode: string;
  picUars: string;
  zoneType: '3T' | 'Non-3T';
  status: 'On Track' | 'Attention Needed' | 'Critical' | 'Offline LoRa';
  progressPercent: number;
  budgetAllocatedM: number;
  capitalDeployedM: number;
  beneficiaries248Covered: number;
  mviHealth: {
    solar: string;
    water: string;
    sanitation: string;
    loraSignal: string;
  };
  cargoStatus: string;
  infraSummary: string;
  nonInfraSummary: string;
  earlyWarning: string | null;
}

export interface FleetUnit {
  id: string;
  mode: 'Laut' | 'Darat' | 'Udara';
  callsign: string;
  tieRegId: string;
  loraStatus: 'Connected (98 dB)' | 'Relay Mesh Active' | 'Low Signal (-112 dBm)';
  route: string;
  eta: string;
  cargoMission: string;
  payloadKg: number;
  qrManifestId: string;
  mentorTopic: string;
  pickupRequest: string;
  driverOrPilot: string;
  status: 'En Route' | 'Loading Hub' | 'Delivered' | 'Weather Hold';
  coordinates: string;
}

export interface MaterialBatch {
  batchId: string;
  materialName: string;
  vendor: string;
  defectRate: number;
  certCode: string;
  testMetric: string;
  status: 'Passed' | 'Pending' | 'Rejected';
  gpsPosko: string;
  timestamp: string;
  escrowLocked: boolean;
}

export interface ExportProduct {
  id: string;
  name: string;
  origin: string;
  regionType: '3T' | 'Non-3T';
  volume: string;
  destination: string;
  customsStatus: 'Cleared' | 'In Inspection' | 'Ready to Ship';
  badge: 'Seoul Bridge' | 'Cross-Border Trade';
  unitValueUsd: number;
  palette: string;
}

export interface CountryMember {
  country: string;
  code: string;
  roleTitle: string;
  focusEngine: string;
  voteChoice: 'Setuju' | 'Abstain' | 'Veto';
  vetoActive: boolean;
}

export interface SosAlert {
  id: string;
  category: 'Keamanan Rumah' | 'Bencana Alam' | 'Medis/Evakuasi';
  subType: string;
  gps: string;
  description: string;
  reporterRole: string;
  timestamp: string;
  stage: 'Sinyal Diterima' | 'Tim Menuju Lokasi' | 'Kondisi Aman';
}

export interface OfflineSyncItem {
  id: string;
  module: string;
  summary: string;
  mode: ConnectivityMode;
  createdAt: string;
  synced: boolean;
}

export interface DailyTsrReport {
  id: string;
  reporterName: string;
  roleName: string;
  shift: 'Pagi (07:00-15:00)' | 'Siang (15:00-23:00)' | 'Malam (23:00-07:00)';
  workHours: number;
  taskTitle: string;
  unitCode: string;
  gpsLocation: string;
  materialUsed: string;
  evidenceFile: string;
  notes: string;
  timestamp: string;
  syncStatus: 'Synced' | 'Queued Offline';
}

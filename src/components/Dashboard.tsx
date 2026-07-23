import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  HardHat,
  Wrench,
  Truck,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Search,
  Printer,
  Building2,
  Users,
  Filter,
  Sparkles,
  AlertOctagon,
  Layers,
  Zap,
  Check,
  X,
  Award
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Language, SafetyProject, IncidentTrendData, EquipmentChecklistItem } from '../types';

interface DashboardProps {
  language: Language;
}

// Initial Mock Projects Data
const INITIAL_PROJECTS: SafetyProject[] = [
  {
    id: 'proj-1',
    name: 'Lahore Ring Road Package-3 (SL-3)',
    code: 'LRR-SL3-2026',
    city: 'Lahore',
    province: 'Punjab',
    siteManager: 'Engr. Muhammad Hamza',
    activeWorkers: 185,
    ltiFreeDays: 240,
    safetyScore: 96,
    status: 'Active',
    incidentsThisMonth: 1,
    openHazards: 2,
    tbtCountThisMonth: 28,
  },
  {
    id: 'proj-2',
    name: 'Karachi Commercial Port Terminal Expansion',
    code: 'KPT-EXP-2026',
    city: 'Karachi',
    province: 'Sindh',
    siteManager: 'Engr. Syed Ali Raza',
    activeWorkers: 310,
    ltiFreeDays: 112,
    safetyScore: 89,
    status: 'Under Inspection',
    incidentsThisMonth: 4,
    openHazards: 5,
    tbtCountThisMonth: 22,
  },
  {
    id: 'proj-3',
    name: 'Islamabad High-Rise Corporate Tower',
    code: 'ICT-TWR-2026',
    city: 'Islamabad',
    province: 'ICT',
    siteManager: 'Engr. Tariq Mehmood',
    activeWorkers: 140,
    ltiFreeDays: 315,
    safetyScore: 98,
    status: 'Active',
    incidentsThisMonth: 0,
    openHazards: 1,
    tbtCountThisMonth: 30,
  },
  {
    id: 'proj-4',
    name: 'Peshawar Bypass Flyover Segment',
    code: 'PBF-SEG-2026',
    city: 'Peshawar',
    province: 'KPK',
    siteManager: 'Engr. Khan Shah',
    activeWorkers: 95,
    ltiFreeDays: 45,
    safetyScore: 78,
    status: 'High Risk Warning',
    incidentsThisMonth: 6,
    openHazards: 8,
    tbtCountThisMonth: 15,
  }
];

// 6-Month Incident Trends
const INCIDENT_TREND_DATA: IncidentTrendData[] = [
  { month: 'Feb', nearMisses: 12, firstAid: 4, minorInjuries: 2, majorViolations: 1, safetyScore: 88 },
  { month: 'Mar', nearMisses: 15, firstAid: 3, minorInjuries: 1, majorViolations: 0, safetyScore: 91 },
  { month: 'Apr', nearMisses: 9,  firstAid: 5, minorInjuries: 3, majorViolations: 2, safetyScore: 82 },
  { month: 'May', nearMisses: 18, firstAid: 2, minorInjuries: 1, majorViolations: 0, safetyScore: 94 },
  { month: 'Jun', nearMisses: 11, firstAid: 1, minorInjuries: 0, majorViolations: 0, safetyScore: 97 },
  { month: 'Jul', nearMisses: 14, firstAid: 3, minorInjuries: 1, majorViolations: 1, safetyScore: 93 },
];

// Hazard Category Breakdown Data for Pie Chart
const HAZARD_CATEGORY_DATA = [
  { name: 'Working at Height', value: 35, color: '#5A5A40' },
  { name: 'Electrical & Cable Hazards', value: 25, color: '#A67C52' },
  { name: 'Machinery & Crane Blindspots', value: 20, color: '#C8A27A' },
  { name: 'PPE Non-Compliance', value: 12, color: '#8C8C6B' },
  { name: 'Trenching & Excavation', value: 8, color: '#D4C3A3' },
];

// Preloaded Comprehensive Work Equipment, Machineries, Tools & PPE Checklist Items
const INITIAL_EQUIPMENT_CHECKLIST: EquipmentChecklistItem[] = [
  // --- PPE ---
  {
    id: 'eq-1',
    category: 'PPE',
    name: 'Industrial Hard Hats (EN397 / ANSI Z89.1)',
    nameUrdu: 'سیفٹی ہیلمٹ (ہارڈ ہیٹ)',
    code: 'PPE-01',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-22',
    inspector: 'Safety Officer Usman',
    remarks: 'Suspension straps intact, color-coded per PEC guidelines.'
  },
  {
    id: 'eq-2',
    category: 'PPE',
    name: 'Full Body Safety Harness & Shock-Absorbing Lanyard',
    nameUrdu: 'فل باڈی سیفٹی ہارنس',
    code: 'PPE-02',
    frequency: 'Pre-Shift',
    status: 'Pass',
    lastInspected: '2026-07-23',
    inspector: 'Safety Officer Usman',
    remarks: 'Webbing inspect verified, double karabiner latches operational.'
  },
  {
    id: 'eq-3',
    category: 'PPE',
    name: 'High-Visibility Reflective Safety Vests',
    nameUrdu: 'ہائی وسلیبلٹی ریفلیکٹو جیکٹ',
    code: 'PPE-03',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-22',
    inspector: 'Safety Officer Usman',
    remarks: 'Reflective tape bright, required for night/dusk shifts.'
  },
  {
    id: 'eq-4',
    category: 'PPE',
    name: 'Steel Toe Cap Safety Boots (ISO 20345)',
    nameUrdu: 'اسٹیل ٹو سیفٹی جوتے',
    code: 'PPE-04',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-21',
    inspector: 'Supervisor Bilal',
    remarks: 'Soles anti-slip intact, no exposed steel caps.'
  },
  {
    id: 'eq-5',
    category: 'PPE',
    name: 'Heavy-Duty Electrician & Rigging Leather Gloves',
    nameUrdu: 'حفاظتی دستانے',
    code: 'PPE-05',
    frequency: 'Daily',
    status: 'Needs Maintenance',
    lastInspected: '2026-07-20',
    inspector: 'Safety Officer Usman',
    remarks: 'Replacement requested for 12 worn welding gloves.'
  },
  {
    id: 'eq-6',
    category: 'PPE',
    name: 'Eye Face Shields & Arc Welding Visors',
    nameUrdu: 'آنکھوں اور چہرے کا شیلڈ',
    code: 'PPE-06',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-22',
    inspector: 'Supervisor Bilal',
    remarks: 'Welding screens and impact goggles fully supplied.'
  },

  // --- HEAVY MACHINERIES ---
  {
    id: 'eq-7',
    category: 'Heavy Machineries',
    name: '50-Ton Tower Crane (Luffing/Top Slewing)',
    nameUrdu: 'ٹاور کرین (۵۰ ٹن)',
    code: 'MAC-01',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-23',
    inspector: 'Third Party Inspector Zafar',
    remarks: 'Anemometer operational, safe load indicator (SLI) calibrated.'
  },
  {
    id: 'eq-8',
    category: 'Heavy Machineries',
    name: 'Hydraulic Crawler Excavator (22-Ton)',
    nameUrdu: 'ہائیڈرولک ایکسیویٹر',
    code: 'MAC-02',
    frequency: 'Daily',
    status: 'Needs Maintenance',
    lastInspected: '2026-07-22',
    inspector: 'Plant Engr. Imran',
    remarks: 'Minor hydraulic hose weep on stick cylinder; scheduled tonight.'
  },
  {
    id: 'eq-9',
    category: 'Heavy Machineries',
    name: 'Mobile Hydraulic Boom Crane (25-Ton)',
    nameUrdu: 'موبائل کرین',
    code: 'MAC-03',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-21',
    inspector: 'Plant Engr. Imran',
    remarks: 'Outrigger pads checked, hook safety latch functional.'
  },
  {
    id: 'eq-10',
    category: 'Heavy Machineries',
    name: 'Transit Concrete Mixer & Boom Pump Truck',
    nameUrdu: 'کنکریٹ مکسر اور پمپ ٹرک',
    code: 'MAC-04',
    frequency: 'Weekly',
    status: 'Pass',
    lastInspected: '2026-07-19',
    inspector: 'Plant Engr. Imran',
    remarks: 'Pipe clamp whip-checks secured, emergency stop tested.'
  },
  {
    id: 'eq-11',
    category: 'Heavy Machineries',
    name: 'Modular Frame Scaffolding Rig (Green Tagged)',
    nameUrdu: 'اسکافولڈنگ اسٹیج ڈیک',
    code: 'MAC-05',
    frequency: 'Pre-Shift',
    status: 'Pass',
    lastInspected: '2026-07-23',
    inspector: 'Scaffold Competent Person Akram',
    remarks: 'Green tag issued; toe-boards, guardrails & sole plates verified.'
  },

  // --- POWER & ELECTRICAL TOOLS ---
  {
    id: 'eq-12',
    category: 'Power & Electrical Tools',
    name: 'Heavy-Duty 9-Inch Angle Grinder with Guard',
    nameUrdu: 'اینگل گرائنڈر مشین',
    code: 'TL-01',
    frequency: 'Pre-Shift',
    status: 'Fail',
    lastInspected: '2026-07-23',
    inspector: 'Electrician Sajid',
    remarks: 'REJECTED & TAGGED OUT: Safety wheel guard removed by worker. Do not use.'
  },
  {
    id: 'eq-13',
    category: 'Power & Electrical Tools',
    name: 'Portable Diesel Generator Set (100 kVA)',
    nameUrdu: 'پورٹیبل جنریٹر سیٹ',
    code: 'TL-02',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-22',
    inspector: 'Electrician Sajid',
    remarks: 'Neutral earthing spike grounded <2 ohms, drip tray installed.'
  },
  {
    id: 'eq-14',
    category: 'Power & Electrical Tools',
    name: 'Main Distribution Box (DB) with 30mA ELCB/RCCB',
    nameUrdu: 'مین ڈسٹری بیوشن الیکٹرک باکس',
    code: 'TL-03',
    frequency: 'Weekly',
    status: 'Pass',
    lastInspected: '2026-07-20',
    inspector: 'Electrician Sajid',
    remarks: 'RCCB trip test button functioning correctly, weatherproof enclosure locked.'
  },
  {
    id: 'eq-15',
    category: 'Power & Electrical Tools',
    name: 'Electric Concrete Poker Vibrator Unit',
    nameUrdu: 'کنکریٹ وائبریٹر مشین',
    code: 'TL-04',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-21',
    inspector: 'Supervisor Bilal',
    remarks: 'Double-insulated cord checked, no outer sleeve damage.'
  },

  // --- HAND TOOLS & RIGGING ---
  {
    id: 'eq-16',
    category: 'Hand Tools & Rigging',
    name: 'Steel Wire Rope Slings & Bow Shackles (Tagged)',
    nameUrdu: 'وائر روپ سلنگ اور شیکلز',
    code: 'TL-05',
    frequency: 'Pre-Shift',
    status: 'Pass',
    lastInspected: '2026-07-23',
    inspector: 'Rigger Head Kashif',
    remarks: 'SWL tags legible, zero broken wires or kinking observed.'
  },
  {
    id: 'eq-17',
    category: 'Hand Tools & Rigging',
    name: 'Chain Pulley Block (3-Ton Lifting Capacity)',
    nameUrdu: 'چین پلئی بلاک',
    code: 'TL-06',
    frequency: 'Weekly',
    status: 'Pass',
    lastInspected: '2026-07-18',
    inspector: 'Rigger Head Kashif',
    remarks: 'Brake pawl ratchets smoothly, load chain lubricated.'
  },
  {
    id: 'eq-18',
    category: 'Hand Tools & Rigging',
    name: 'Heavy Duty A-Frame Aluminum Extension Ladder',
    nameUrdu: 'ایلومینیم کی سیڑھی (لیڈر)',
    code: 'TL-07',
    frequency: 'Daily',
    status: 'Pass',
    lastInspected: '2026-07-22',
    inspector: 'Safety Officer Usman',
    remarks: 'Rubber feet intact, rungs clean of grease and wet mud.'
  }
];

export const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const [projects, setProjects] = useState<SafetyProject[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-1');
  
  // Checklist State
  const [equipmentList, setEquipmentList] = useState<EquipmentChecklistItem[]>(INITIAL_EQUIPMENT_CHECKLIST);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Add Equipment Modal State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newEquipName, setNewEquipName] = useState<string>('');
  const [newEquipUrdu, setNewEquipUrdu] = useState<string>('');
  const [newEquipCategory, setNewEquipCategory] = useState<EquipmentChecklistItem['category']>('PPE');
  const [newEquipFreq, setNewEquipFreq] = useState<EquipmentChecklistItem['frequency']>('Daily');
  const [newEquipCode, setNewEquipCode] = useState<string>('');

  // Add Project Modal State
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [newProjName, setNewProjName] = useState<string>('');
  const [newProjCity, setNewProjCity] = useState<string>('');
  const [newProjManager, setNewProjManager] = useState<string>('');
  const [newProjWorkers, setNewProjWorkers] = useState<number>(100);

  // Active Project Calculation
  const currentProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  // Site-wide Summary Stats
  const totalActiveWorkers = useMemo(() => {
    return projects.reduce((acc, curr) => acc + curr.activeWorkers, 0);
  }, [projects]);

  const avgComplianceScore = useMemo(() => {
    const total = projects.reduce((acc, curr) => acc + curr.safetyScore, 0);
    return Math.round(total / projects.length);
  }, [projects]);

  const totalOpenHazards = useMemo(() => {
    return projects.reduce((acc, curr) => acc + curr.openHazards, 0);
  }, [projects]);

  // Filtered Checklist
  const filteredChecklist = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchesCategory = activeCategoryTab === 'All' || item.category === activeCategoryTab;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nameUrdu.includes(searchTerm) ||
        item.remarks.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [equipmentList, activeCategoryTab, statusFilter, searchTerm]);

  // Checklist Statistics
  const checklistStats = useMemo(() => {
    const passed = equipmentList.filter((i) => i.status === 'Pass').length;
    const failed = equipmentList.filter((i) => i.status === 'Fail').length;
    const maintenance = equipmentList.filter((i) => i.status === 'Needs Maintenance').length;
    const pending = equipmentList.filter((i) => i.status === 'Pending').length;
    const total = equipmentList.length;
    const readinessScore = total > 0 ? Math.round((passed / total) * 100) : 100;
    return { passed, failed, maintenance, pending, total, readinessScore };
  }, [equipmentList]);

  // Handler to change Equipment Status
  const handleStatusChange = (id: string, newStatus: EquipmentChecklistItem['status']) => {
    const today = new Date().toISOString().split('T')[0];
    setEquipmentList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              lastInspected: today,
              remarks: newStatus === 'Pass' ? 'Verified in good working order.' : item.remarks,
            }
          : item
      )
    );
  };

  // Handler to Add New Equipment
  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEquipName.trim()) return;

    const newItem: EquipmentChecklistItem = {
      id: `eq-custom-${Date.now()}`,
      category: newEquipCategory,
      name: newEquipName.trim(),
      nameUrdu: newEquipUrdu.trim() || newEquipName.trim(),
      code: newEquipCode.trim() || `CUST-${Math.floor(100 + Math.random() * 900)}`,
      frequency: newEquipFreq,
      status: 'Pending',
      lastInspected: new Date().toISOString().split('T')[0],
      inspector: currentProject.siteManager,
      remarks: 'Newly added to site inspection roster. Pending first check.',
    };

    setEquipmentList((prev) => [newItem, ...prev]);
    setNewEquipName('');
    setNewEquipUrdu('');
    setNewEquipCode('');
    setShowAddModal(false);
  };

  // Handler to Add New Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const newProj: SafetyProject = {
      id: `proj-${Date.now()}`,
      name: newProjName.trim(),
      code: `PAK-${Math.floor(1000 + Math.random() * 9000)}`,
      city: newProjCity.trim() || 'Pakistan',
      province: 'Pakistan',
      siteManager: newProjManager.trim() || 'Site Supervisor',
      activeWorkers: newProjWorkers || 50,
      ltiFreeDays: 1,
      safetyScore: 100,
      status: 'Active',
      incidentsThisMonth: 0,
      openHazards: 0,
      tbtCountThisMonth: 1,
    };

    setProjects((prev) => [newProj, ...prev]);
    setSelectedProjectId(newProj.id);
    setNewProjName('');
    setNewProjCity('');
    setNewProjManager('');
    setShowProjectModal(false);
  };

  // Print Inspection Checklist
  const handlePrintChecklist = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FDFCF8] text-[#2D2D2D]">
      {/* Top Banner & Project Selector */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] shadow-md space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F0]/20 text-[#E8E4D9] text-xs font-semibold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-[#A67C52]" />
              <span>Project Safety Intelligence & Inspection Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-white">
              {language === 'ur'
                ? 'تعمیراتی پروجیکٹس سیفٹی ڈیش بورڈ اور مشینی چیک لسٹ'
                : 'Site Safety Dashboard & Machinery/Tools Checklist'}
            </h1>
            <p className="text-[#E8E4D9] text-xs sm:text-sm leading-relaxed">
              Real-time monitoring of project-specific safety status, lost-time injury (LTI) records, site-wide incident trends, and comprehensive daily checklists for work equipment, heavy machinery, power tools, and PPE.
            </p>
          </div>

          {/* Project Switcher Selector */}
          <div className="w-full lg:w-auto bg-[#F5F5F0]/10 border border-[#E8E4D9]/20 p-4 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="space-y-1 flex-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#E8E4D9] block">
                Select Active Project:
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full bg-[#2D2D2D] text-white border border-[#E8E4D9]/30 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#A67C52]"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.city})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowProjectModal(true)}
              className="mt-auto py-2.5 px-4 rounded-xl bg-[#A67C52] hover:bg-[#8F6740] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Site-wide Overview Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="bg-[#F5F5F0]/10 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#A67C52]/30 flex items-center justify-center text-[#E8E4D9] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#E8E4D9] uppercase font-mono block">Active Sites</span>
              <span className="text-lg font-bold text-white">{projects.length} Projects</span>
            </div>
          </div>

          <div className="bg-[#F5F5F0]/10 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#A67C52]/30 flex items-center justify-center text-[#E8E4D9] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#E8E4D9] uppercase font-mono block">Site Workforce</span>
              <span className="text-lg font-bold text-white">{totalActiveWorkers} Workers</span>
            </div>
          </div>

          <div className="bg-[#F5F5F0]/10 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#A67C52]/30 flex items-center justify-center text-[#E8E4D9] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#E8E4D9] uppercase font-mono block">Avg Safety Compliance</span>
              <span className="text-lg font-bold text-white">{avgComplianceScore}% Score</span>
            </div>
          </div>

          <div className="bg-[#F5F5F0]/10 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#A67C52]/30 flex items-center justify-center text-[#E8E4D9] shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] text-[#E8E4D9] uppercase font-mono block">Open Site Hazards</span>
              <span className="text-lg font-bold text-white">{totalOpenHazards} Reported</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Selected Project Safety Detail Cards */}
      <div className="bg-white border border-[#E8E4D9] rounded-[28px] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E8E4D9] pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold bg-[#5A5A40]/15 text-[#5A5A40] border border-[#5A5A40]/30 px-3 py-0.5 rounded-full uppercase tracking-wider">
                {currentProject.code}
              </span>
              <span className="text-xs text-[#7C7C6A] font-medium">
                {currentProject.city}, {currentProject.province}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#2D2D2D] mt-1">
              {currentProject.name}
            </h2>
            <p className="text-xs text-[#7C7C6A]">
              Resident Engineer / Site Manager: <strong className="text-[#2D2D2D]">{currentProject.siteManager}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                currentProject.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : currentProject.status === 'Under Inspection'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              {currentProject.status}
            </span>
          </div>
        </div>

        {/* Selected Project Detailed Key Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LTI Free Days Counter */}
          <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">LTI Free Days</span>
              <ShieldCheck className="w-5 h-5 text-[#5A5A40]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#2D2D2D] font-mono">{currentProject.ltiFreeDays}</span>
              <span className="text-xs text-[#7C7C6A]">Consecutive Days</span>
            </div>
            <p className="text-[11px] text-[#7C7C6A]">Zero lost-time injuries since last milestone.</p>
          </div>

          {/* Safety Compliance Rating */}
          <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">PEC Audit Rating</span>
              <Award className="w-5 h-5 text-[#A67C52]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#2D2D2D] font-mono">{currentProject.safetyScore}%</span>
              <span className="text-xs text-emerald-700 font-bold">Grade A</span>
            </div>
            <div className="w-full bg-[#E8E4D9] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#5A5A40] h-full rounded-full transition-all duration-500"
                style={{ width: `${currentProject.safetyScore}%` }}
              ></div>
            </div>
          </div>

          {/* Active Site Workforce */}
          <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">On-Site Workers</span>
              <Users className="w-5 h-5 text-[#5A5A40]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#2D2D2D] font-mono">{currentProject.activeWorkers}</span>
              <span className="text-xs text-[#7C7C6A]">Active Personnel</span>
            </div>
            <p className="text-[11px] text-[#7C7C6A]">Mandatory 1 Safety Officer per 50 workers deployed.</p>
          </div>

          {/* Conducted TBTs */}
          <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">Toolbox Briefings</span>
              <HardHat className="w-5 h-5 text-[#A67C52]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#2D2D2D] font-mono">{currentProject.tbtCountThisMonth}</span>
              <span className="text-xs text-[#7C7C6A]">Briefings / Month</span>
            </div>
            <p className="text-[11px] text-[#7C7C6A]">Daily pre-shift 5-min briefings logged.</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Site-wide Incident & Hazard Trends (Data Visualization) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Trends Over Time Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E8E4D9] rounded-[28px] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
            <div>
              <h3 className="font-serif font-medium text-lg text-[#2D2D2D] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#5A5A40]" />
                <span>Site-Wide Incident & Safety Score Trends</span>
              </h3>
              <p className="text-xs text-[#7C7C6A]">
                6-Month tracking of Near Misses, First Aid cases, Minor Injuries, and Safety Scores across sites.
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F5F5F0] text-[#5A5A40] border border-[#E8E4D9] px-2.5 py-1 rounded-full">
              6-Month Overview
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCIDENT_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#7C7C6A', fontSize: 11 }} />
                <YAxis tick={{ fill: '#7C7C6A', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2D2D2D', borderColor: '#5A5A40', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="nearMisses" name="Near Misses" fill="#5A5A40" radius={[4, 4, 0, 0]} />
                <Bar dataKey="firstAid" name="First Aid Cases" fill="#A67C52" radius={[4, 4, 0, 0]} />
                <Bar dataKey="minorInjuries" name="Minor Injuries" fill="#C8A27A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="majorViolations" name="Major Violations" fill="#D9534F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hazard Breakdown Pie Chart */}
        <div className="bg-white border border-[#E8E4D9] rounded-[28px] p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="border-b border-[#E8E4D9] pb-3">
            <h3 className="font-serif font-medium text-lg text-[#2D2D2D] flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-[#A67C52]" />
              <span>Hazard Type Breakdown</span>
            </h3>
            <p className="text-xs text-[#7C7C6A]">
              Distribution of reported site hazards in Pakistani construction context.
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HAZARD_CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {HAZARD_CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#2D2D2D', color: '#fff', borderRadius: '12px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs border-t border-[#E8E4D9] pt-3">
            {HAZARD_CATEGORY_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-[#2D2D2D] font-medium">{item.name}</span>
                </div>
                <span className="font-mono text-[#7C7C6A] font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: Equipment, Machineries, Tools & PPE Inspection Checklist */}
      <div className="bg-white border border-[#E8E4D9] rounded-[28px] p-6 sm:p-8 space-y-6 shadow-sm print:shadow-none print:border-none print:p-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-[#E8E4D9] pb-4 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A5A40]/15 text-[#5A5A40] text-xs font-semibold uppercase tracking-wider mb-1">
              <Wrench className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Statutory Daily & Weekly Inspection Roster</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#2D2D2D]">
              Work Equipment, Machineries, Tools & PPE Checklist
            </h2>
            <p className="text-xs text-[#7C7C6A]">
              Interactive compliance checklist for hard hats, harnesses, tower cranes, excavators, grinders, scaffolding rigs, and power DB boxes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4 text-[#A67C52]" />
              <span>Add Custom Equipment</span>
            </button>

            <button
              onClick={handlePrintChecklist}
              className="px-4 py-2.5 rounded-full bg-[#F5F5F0] hover:bg-[#e8e8df] text-[#2D2D2D] text-xs font-bold border border-[#E8E4D9] transition flex items-center gap-1.5 print:hidden"
            >
              <Printer className="w-4 h-4 text-[#5A5A40]" />
              <span>Print Audit Sheet</span>
            </button>
          </div>
        </div>

        {/* Readiness Summary Bar */}
        <div className="bg-[#F5F5F0] p-4 rounded-2xl border border-[#E8E4D9] grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] text-[#7C7C6A] uppercase font-bold block">Overall Readiness</span>
            <span className="text-xl font-extrabold text-[#5A5A40] font-mono">{checklistStats.readinessScore}%</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-[#7C7C6A] uppercase font-bold block">Passed (Good)</span>
            <span className="text-lg font-bold text-emerald-700 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {checklistStats.passed} / {checklistStats.total}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-[#7C7C6A] uppercase font-bold block">Failed (Tag Out)</span>
            <span className="text-lg font-bold text-red-600 font-mono flex items-center gap-1">
              <XCircle className="w-4 h-4" /> {checklistStats.failed}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-[#7C7C6A] uppercase font-bold block">Needs Maintenance</span>
            <span className="text-lg font-bold text-amber-700 font-mono flex items-center gap-1">
              <Clock className="w-4 h-4" /> {checklistStats.maintenance}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-[#7C7C6A] uppercase font-bold block">Pending Check</span>
            <span className="text-lg font-bold text-[#7C7C6A] font-mono">{checklistStats.pending}</span>
          </div>
        </div>

        {/* Filters & Category Navigation */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[#E8E4D9] pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {['All', 'PPE', 'Heavy Machineries', 'Power & Electrical Tools', 'Hand Tools & Rigging'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryTab(cat)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  activeCategoryTab === cat
                    ? 'bg-[#5A5A40] text-white shadow-sm'
                    : 'bg-[#F5F5F0] text-[#7C7C6A] hover:text-[#2D2D2D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Status Filters */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#7C7C6A]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tools or machinery..."
                className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-2xl pl-9 pr-3 py-2 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F5F5F0] border border-[#E8E4D9] rounded-2xl px-3 py-2 text-xs font-semibold text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
            >
              <option value="All">All Statuses</option>
              <option value="Pass">Pass Only</option>
              <option value="Fail">Fail (Tag Out)</option>
              <option value="Needs Maintenance">Needs Maintenance</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Checklist Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F5F5F0] text-[#5A5A40] font-bold border-b border-[#E8E4D9] uppercase tracking-wider text-[10px]">
                <th className="p-3.5 rounded-tl-xl">Code</th>
                <th className="p-3.5">Equipment / Tool Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Frequency</th>
                <th className="p-3.5">Current Status</th>
                <th className="p-3.5">Last Inspected</th>
                <th className="p-3.5">Inspection Remarks</th>
                <th className="p-3.5 text-right rounded-tr-xl print:hidden">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E4D9]">
              {filteredChecklist.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#7C7C6A]">
                    No equipment or machinery items matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredChecklist.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F5F5F0]/50 transition">
                    <td className="p-3.5 font-mono font-bold text-[#5A5A40]">{item.code}</td>
                    <td className="p-3.5 font-semibold text-[#2D2D2D]">
                      <div>{item.name}</div>
                      <div className="text-[11px] text-[#A67C52] font-serif dir-rtl">{item.nameUrdu}</div>
                    </td>
                    <td className="p-3.5 text-[#7C7C6A]">
                      <span className="bg-[#F5F5F0] px-2.5 py-0.5 rounded-full border border-[#E8E4D9] text-[10px] font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#7C7C6A] font-mono">{item.frequency}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'Pass'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : item.status === 'Fail'
                            ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                            : item.status === 'Needs Maintenance'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-800 border border-slate-300'
                        }`}
                      >
                        {item.status === 'Pass' && <CheckCircle2 className="w-3 h-3" />}
                        {item.status === 'Fail' && <XCircle className="w-3 h-3" />}
                        {item.status === 'Needs Maintenance' && <Clock className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#7C7C6A] font-mono">
                      <div>{item.lastInspected}</div>
                      <div className="text-[10px] text-[#2D2D2D]">{item.inspector}</div>
                    </td>
                    <td className="p-3.5 text-[#7C7C6A] max-w-xs leading-relaxed">
                      {item.remarks}
                    </td>
                    <td className="p-3.5 text-right print:hidden">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleStatusChange(item.id, 'Pass')}
                          title="Mark Pass"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Needs Maintenance')}
                          title="Needs Maintenance"
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition"
                        >
                          <Wrench className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Fail')}
                          title="Fail & Tag Out"
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Add Custom Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E4D9] rounded-[28px] max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
              <h3 className="font-serif font-medium text-lg text-[#2D2D2D] flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#5A5A40]" />
                <span>Add Equipment or Tool to Roster</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#7C7C6A] hover:text-[#2D2D2D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEquipment} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">Equipment / Tool Name (English)*</label>
                <input
                  type="text"
                  required
                  value={newEquipName}
                  onChange={(e) => setNewEquipName(e.target.value)}
                  placeholder="e.g. Demolition Breaker 30kg..."
                  className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">Name in Urdu (Optional)</label>
                <input
                  type="text"
                  value={newEquipUrdu}
                  onChange={(e) => setNewEquipUrdu(e.target.value)}
                  placeholder="اردو نام..."
                  className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40] dir-rtl font-serif"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2D2D2D] font-bold mb-1">Category</label>
                  <select
                    value={newEquipCategory}
                    onChange={(e) => setNewEquipCategory(e.target.value as any)}
                    className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                  >
                    <option value="PPE">PPE</option>
                    <option value="Heavy Machineries">Heavy Machineries</option>
                    <option value="Power & Electrical Tools">Power & Electrical Tools</option>
                    <option value="Hand Tools & Rigging">Hand Tools & Rigging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#2D2D2D] font-bold mb-1">Frequency</label>
                  <select
                    value={newEquipFreq}
                    onChange={(e) => setNewEquipFreq(e.target.value as any)}
                    className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                  >
                    <option value="Pre-Shift">Pre-Shift</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">Equipment Code (Optional)</label>
                <input
                  type="text"
                  value={newEquipCode}
                  onChange={(e) => setNewEquipCode(e.target.value)}
                  placeholder="e.g. TL-08..."
                  className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full bg-[#F5F5F0] text-[#7C7C6A] hover:text-[#2D2D2D] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold"
                >
                  Add Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add New Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E4D9] rounded-[28px] max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
              <h3 className="font-serif font-medium text-lg text-[#2D2D2D] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#5A5A40]" />
                <span>Add New Construction Site</span>
              </h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="text-[#7C7C6A] hover:text-[#2D2D2D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">Project / Site Name*</label>
                <input
                  type="text"
                  required
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  placeholder="e.g. Rawalpindi Ring Road Package-1..."
                  className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2D2D2D] font-bold mb-1">City / Region</label>
                  <input
                    type="text"
                    value={newProjCity}
                    onChange={(e) => setNewProjCity(e.target.value)}
                    placeholder="e.g. Rawalpindi"
                    className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>

                <div>
                  <label className="block text-[#2D2D2D] font-bold mb-1">Site Workers Count</label>
                  <input
                    type="number"
                    value={newProjWorkers}
                    onChange={(e) => setNewProjWorkers(Number(e.target.value))}
                    className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">Resident Safety Engineer / Manager</label>
                <input
                  type="text"
                  value={newProjManager}
                  onChange={(e) => setNewProjManager(e.target.value)}
                  placeholder="e.g. Engr. Bilal Ahmed"
                  className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-full bg-[#F5F5F0] text-[#7C7C6A] hover:text-[#2D2D2D] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

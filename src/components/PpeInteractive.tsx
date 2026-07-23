import React, { useState } from 'react';
import { HardHat, ShieldCheck, Tag, Info, AlertTriangle, Eye, Volume2, Footprints, Flame } from 'lucide-react';
import { Language } from '../types';

interface PpeInteractiveProps {
  language: Language;
}

export const PpeInteractive: React.FC<PpeInteractiveProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'hardhats' | 'scaffold' | 'ppe'>('hardhats');

  const hardHatCodes = [
    {
      color: 'Yellow',
      hex: '#EAB308',
      role: 'General Construction Laborers, Masons & Carpenters',
      roleUrdu: 'عام تعمیراتی مزدور، راج مستری اور ترکھان',
      description: 'Protects against falling concrete debris, bricks, rebar impact, and overhead struck-by hazards.',
    },
    {
      color: 'White',
      hex: '#F8FAFC',
      role: 'Site Engineers, Project Managers, Architects & Consultants',
      roleUrdu: 'سائٹ انجینئر، پروجیکٹ مینیجر، آرکیٹیکٹ',
      description: 'Designates supervisory and technical site authority personnel.',
    },
    {
      color: 'Blue',
      hex: '#3B82F6',
      role: 'Electricians, MEP Technicians & Plumbers',
      roleUrdu: 'الیکٹریشن اور مکینیکل ٹیکنیشنز',
      description: 'Helps site teams quickly locate electrical and mechanical specialists for urgent isolation.',
    },
    {
      color: 'Red',
      hex: '#EF4444',
      role: 'HSE Safety Officers, Fire Wardens & Riggers',
      roleUrdu: 'ایچ ایس ای سیفٹی آفیسرز اور فائر وارڈن',
      description: 'Identifies safety marshals responsible for emergency evacuations and stop-work orders.',
    },
    {
      color: 'Green',
      hex: '#22C55E',
      role: 'First Aid Medical Responders & Quality Inspectors',
      roleUrdu: 'فرسٹ ایڈ میڈیکل رسپانڈرز',
      description: 'Marks personnel trained in emergency medical trauma care on active construction sites.',
    },
  ];

  const scaffoldTags = [
    {
      status: 'GREEN TAG (SAFE)',
      statusUrdu: 'گرین ٹیگ - استعمال کے لیے محفوظ',
      bgClass: 'bg-emerald-950/80 border-emerald-500 text-emerald-200',
      tagColorClass: 'bg-emerald-600 text-white',
      meaning: 'Scaffold has been fully erected, inspected, and signed off by a certified Scaffold Inspector. Safe for worker access.',
      checklist: [
        'All ledger standards plumb and resting on sole boards + base plates',
        'Double guardrails (top-rail 42" & mid-rail 21") and 6" toe-boards installed',
        'Working platform fully planked with no gaps > 25mm',
        'Structure tied off to building columns every 4 meters',
      ],
    },
    {
      status: 'YELLOW TAG (CAUTION)',
      statusUrdu: 'پیلا ٹیگ - احتیاط، جاری کام',
      bgClass: 'bg-amber-950/80 border-amber-500 text-amber-200',
      tagColorClass: 'bg-amber-500 text-slate-950 font-bold',
      meaning: 'Scaffold is under erection, dismantling, or alteration. Access permitted ONLY for qualified scaffolders wearing full body harnesses anchored to independent lifelines.',
      checklist: [
        '100% tie-off mandatory for scaffolders working on frame',
        'Warning tape erected around ground perimeter',
        'No general labor permitted on platform',
      ],
    },
    {
      status: 'RED TAG (DO NOT USE)',
      statusUrdu: 'ریڈ ٹیگ - استعمال کرنا منع ہے',
      bgClass: 'bg-red-950/80 border-red-500 text-red-200',
      tagColorClass: 'bg-red-600 text-white font-bold',
      meaning: 'STRICTLY PROHIBITED. Scaffold has failed inspection, has missing ties/planks, or is structurally unstable. Access will result in immediate suspension.',
      checklist: [
        'Physical ladder access removed or locked',
        'Immediate notification sent to Site Safety Officer',
        'Do not climb under any circumstances',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FDFCF8]">
      {/* Banner */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F0]/20 text-[#E8E4D9] text-xs font-semibold uppercase tracking-wider">
              <HardHat className="w-4 h-4 text-[#A67C52]" />
              <span>Interactive Safety Equipment & Tagging Standards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium font-serif tracking-tight text-white">
              Site PPE & Scaffold Inspection Tag Visualizer
            </h1>
            <p className="text-[#E8E4D9] text-sm max-w-3xl">
              Standardized color-coding rules for hard hats, scaffold inspection tags, and personal protective equipment across Pakistani construction sites.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E4D9] pb-3">
        <button
          onClick={() => setActiveTab('hardhats')}
          className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
            activeTab === 'hardhats'
              ? 'bg-[#5A5A40] text-white shadow-sm'
              : 'bg-[#F5F5F0] text-[#7C7C6A] hover:text-[#2D2D2D]'
          }`}
        >
          <HardHat className="w-4 h-4" />
          <span>Hard Hat Color Codes</span>
        </button>

        <button
          onClick={() => setActiveTab('scaffold')}
          className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
            activeTab === 'scaffold'
              ? 'bg-[#5A5A40] text-white shadow-sm'
              : 'bg-[#F5F5F0] text-[#7C7C6A] hover:text-[#2D2D2D]'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Scaffold Tag System (Green/Yellow/Red)</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'hardhats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardHatCodes.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F5F5F0] border border-[#E8E4D9] hover:border-[#5A5A40] p-6 rounded-[28px] text-[#2D2D2D] space-y-4 transition shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center border border-[#E8E4D9] shadow-sm"
                    style={{ backgroundColor: item.hex }}
                  >
                    <HardHat className={`w-6 h-6 ${item.color === 'White' ? 'text-[#2D2D2D]' : 'text-slate-950'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#2D2D2D]">{item.color} Hard Hat</h3>
                    <span className="text-[10px] text-[#7C7C6A] font-mono">PEC Standard Color Code</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-[#5A5A40] block">Designated Personnel:</span>
                <p className="text-[#2D2D2D] font-medium">{item.role}</p>
                <p className="text-[#A67C52] font-serif dir-rtl text-sm">{item.roleUrdu}</p>
              </div>

              <p className="text-xs text-[#7C7C6A] leading-relaxed pt-2 border-t border-[#E8E4D9]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'scaffold' && (
        <div className="space-y-6">
          {scaffoldTags.map((tag, idx) => (
            <div key={idx} className="p-6 rounded-[28px] border border-[#E8E4D9] bg-[#F5F5F0] text-[#2D2D2D] space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E4D9] pb-3 gap-2">
                <div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${tag.tagColorClass}`}>
                    {tag.status}
                  </span>
                  <p className="text-sm font-serif dir-rtl mt-2 text-[#5A5A40]">{tag.statusUrdu}</p>
                </div>
              </div>

              <p className="text-xs text-[#2D2D2D] leading-relaxed font-medium">{tag.meaning}</p>

              <div className="space-y-2 text-xs pt-2 border-t border-[#E8E4D9]">
                <span className="font-bold text-[#5A5A40] block uppercase tracking-wider text-[11px]">Inspection Requirements:</span>
                <ul className="list-disc list-inside space-y-1 text-[#7C7C6A]">
                  {tag.checklist.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

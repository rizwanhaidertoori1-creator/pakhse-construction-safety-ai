import React, { useState } from 'react';
import { BookOpen, Scale, FileText, CheckCircle2, AlertOctagon, Landmark, Download, Search } from 'lucide-react';
import { PAKISTAN_REGULATIONS } from '../data/pakistanHseData';
import { Language } from '../types';

interface RegulationsGuideProps {
  language: Language;
}

export const RegulationsGuide: React.FC<RegulationsGuideProps> = ({ language }) => {
  const [selectedLawId, setSelectedLawId] = useState(PAKISTAN_REGULATIONS[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedLaw = PAKISTAN_REGULATIONS.find((law) => law.id === selectedLawId) || PAKISTAN_REGULATIONS[0];

  const filteredLaws = PAKISTAN_REGULATIONS.filter(
    (law) =>
      law.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      law.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      law.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FDFCF8]">
      {/* Header */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F0]/20 text-[#E8E4D9] text-xs font-semibold uppercase tracking-wider">
              <Landmark className="w-4 h-4 text-[#A67C52]" />
              <span>Pakistani Statutory Codes & Environmental Law</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium font-serif tracking-tight text-white">
              Pakistan Construction Health, Safety & Environmental Laws Directory
            </h1>
            <p className="text-[#E8E4D9] text-sm max-w-3xl">
              Authoritative reference guide to Provincial OSH Acts (POSHA Punjab, Sindh OSH), PEC Building Codes, PEPA Environmental Standards, and legacy statutory frameworks.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7C7C6A]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search laws or regions (e.g., Punjab, Sindh, PEC)..."
              className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
            />
          </div>

          <div className="space-y-2">
            {filteredLaws.map((law) => (
              <button
                key={law.id}
                onClick={() => setSelectedLawId(law.id)}
                className={`w-full text-left p-4 rounded-2xl border text-xs transition ${
                  selectedLawId === law.id
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                    : 'bg-[#F5F5F0] hover:bg-[#E8E4D9]/40 border-[#E8E4D9] text-[#2D2D2D]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-sm ${selectedLawId === law.id ? 'text-[#E8E4D9]' : 'text-[#5A5A40]'}`}>{law.shortName}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${selectedLawId === law.id ? 'bg-[#4a4a34] border-[#4a4a34] text-white' : 'bg-white border-[#E8E4D9] text-[#7C7C6A]'}`}>
                    {law.region}
                  </span>
                </div>
                <p className={`text-[11px] line-clamp-2 mt-1.5 ${selectedLawId === law.id ? 'text-white/80' : 'text-[#7C7C6A]'}`}>{law.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Law Detailed View */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-[#E8E4D9] rounded-[28px] p-6 sm:p-8 text-[#2D2D2D] space-y-6 shadow-sm">
            {/* Header info */}
            <div className="border-b border-[#E8E4D9] pb-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-[#5A5A40]/15 text-[#5A5A40] border border-[#5A5A40]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedLaw.region}
                </span>
                <span className="text-xs text-[#7C7C6A] font-mono">{selectedLaw.officialDocRef}</span>
              </div>
              <h2 className="text-2xl font-medium font-serif text-[#2D2D2D] mt-2">{selectedLaw.name}</h2>
              <p className="text-[#7C7C6A] text-sm leading-relaxed">{selectedLaw.description}</p>
            </div>

            {/* Key Statutory Mandates */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs text-[#5A5A40] flex items-center gap-2 uppercase tracking-wider border-b border-[#E8E4D9] pb-2">
                <CheckCircle2 className="w-4 h-4 text-[#A67C52]" />
                <span>Mandatory Employer & Site Contractor Requirements</span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5 text-xs">
                {selectedLaw.keyMandates.map((mandate, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#5A5A40] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-[#2D2D2D] leading-relaxed">{mandate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Penalties & Fines */}
            <div className="p-5 rounded-2xl bg-[#A67C52]/10 border border-[#A67C52]/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#A67C52] font-bold uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4" />
                <span>Non-Compliance Penalties & Prosecution</span>
              </div>
              <p className="text-[#2D2D2D] text-sm font-medium">{selectedLaw.penaltiesSummary}</p>
            </div>

            {/* Application Matrix in Construction */}
            <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-3 text-xs">
              <span className="font-bold text-[#2D2D2D] uppercase tracking-wider block border-b border-[#E8E4D9] pb-2">
                Pakistani Construction Site Applicability Matrix
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#7C7C6A]">
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E4D9]">
                  <span className="text-[#2D2D2D] font-bold block mb-1">Safety Officer Ratio</span>
                  <span>1 Qualified HSE Officer per 50 workers on active sites.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E4D9]">
                  <span className="text-[#2D2D2D] font-bold block mb-1">Mandatory Free PPE</span>
                  <span>Employers MUST provide certified hard hats, harnesses & boots at zero cost to workers.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E4D9]">
                  <span className="text-[#2D2D2D] font-bold block mb-1">Incident Reporting</span>
                  <span>24-Hour compulsory written notification to Labour Department for lost-time injury (&gt;48h).</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, FileText, AlertCircle, Download, Printer, CheckCircle2, ShieldAlert, RefreshCw, Layers, MapPin, Thermometer } from 'lucide-react';
import { JsaReport, Language } from '../types';

interface JsaGeneratorProps {
  language: Language;
}

export const JsaGenerator: React.FC<JsaGeneratorProps> = ({ language }) => {
  const [projectType, setProjectType] = useState('High-Rise Building (Commercial/Residential)');
  const [locationCity, setLocationCity] = useState('Lahore, Punjab');
  const [specificActivity, setSpecificActivity] = useState('Reinforced concrete casting for 12th floor slab with concrete pump boom');
  const [workingHeightOrDepth, setWorkingHeightOrDepth] = useState('Height > 35 meters');
  const [weatherCondition, setWeatherCondition] = useState('Extreme Summer Heat (42°C) with High UV');
  const [crewSize, setCrewSize] = useState('20 Workers + 2 Supervisors');
  const [equipmentUsed, setEquipmentUsed] = useState<string[]>([
    'Mobile Concrete Pump Boom',
    'Tubular Steel Scaffolding',
    'Tower Crane',
    'Electric Concrete Vibrators',
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<JsaReport | null>(null);

  const equipmentOptions = [
    'Tubular Steel Scaffolding',
    'Bamboo Scaffolding',
    'Tower Crane',
    'Mobile Concrete Pump Boom',
    'Excavator / Backhoe',
    'Electric Concrete Vibrators',
    'Angle Grinders & Cutters',
    'Diesel Power Generators',
    'Welding Transformer Machine',
  ];

  const handleEquipmentToggle = (item: string) => {
    if (equipmentUsed.includes(item)) {
      setEquipmentUsed(equipmentUsed.filter((i) => i !== item));
    } else {
      setEquipmentUsed([...equipmentUsed, item]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!specificActivity.trim()) {
      setError('Please specify the construction site activity.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-jsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          locationCity,
          specificActivity,
          workingHeightOrDepth,
          weatherCondition,
          crewSize,
          equipmentUsed,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate Job Safety Analysis.');
      }

      const data: JsaReport = await response.json();
      setReport(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while generating the JSA report.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH':
        return 'bg-[#A67C52]/20 text-[#A67C52] border-[#A67C52]/30';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-[#5A5A40]/15 text-[#5A5A40] border-[#5A5A40]/30';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FDFCF8]">
      {/* Header Banner */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F0]/20 text-[#E8E4D9] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#A67C52]" />
              <span>AI-Powered Job Safety Analysis (JSA) Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium font-serif tracking-tight text-white">
              Construction Site Risk Matrix & JSA Generator
            </h1>
            <p className="text-[#E8E4D9] text-sm">
              Generate structured, step-by-step Job Safety Analyses tailored to Pakistani site conditions, PEC Building Codes, POSHA 2019, and Sindh OSH Act 2017.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-[#E8E4D9]/80 block uppercase tracking-wider">Standards Compliance</span>
              <span className="text-xs font-bold text-[#FDFCF8] block">PEC • POSHA • Sindh OSH • PEPA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs Column */}
        <div className="lg:col-span-5 bg-[#F5F5F0] border border-[#E8E4D9] p-6 rounded-[28px] space-y-5 text-[#2D2D2D]">
          <h2 className="text-lg font-medium font-serif flex items-center gap-2 border-b border-[#E8E4D9] pb-3 text-[#5A5A40]">
            <Layers className="w-5 h-5 text-[#A67C52]" />
            <span>Site Activity Parameters</span>
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#2D2D2D] font-bold mb-1">Project Type</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-white border border-[#E8E4D9] rounded-2xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
              >
                <option value="High-Rise Building (Commercial/Residential)">High-Rise Building (Commercial/Residential)</option>
                <option value="Infrastructure & CPEC Highway / Bridge">Infrastructure & CPEC Highway / Bridge</option>
                <option value="Deep Basement Excavation & Foundation">Deep Basement Excavation & Foundation</option>
                <option value="Housing Society / Suburban Development">Housing Society / Suburban Development</option>
                <option value="Industrial Plant / Warehouse Erecting">Industrial Plant / Warehouse Erecting</option>
                <option value="Demolition & Renovation Site">Demolition & Renovation Site</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">City / Region</label>
                <select
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value)}
                  className="w-full bg-white border border-[#E8E4D9] rounded-2xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                >
                  <option value="Lahore, Punjab">Lahore, Punjab</option>
                  <option value="Karachi, Sindh">Karachi, Sindh</option>
                  <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                  <option value="Peshawar, KPK">Peshawar, KPK</option>
                  <option value="Quetta, Balochistan">Quetta, Balochistan</option>
                  <option value="Multan, Punjab">Multan, Punjab</option>
                  <option value="Faisalabad, Punjab">Faisalabad, Punjab</option>
                  <option value="Sukkur, Sindh">Sukkur, Sindh</option>
                  <option value="Gwadar Port, Balochistan">Gwadar Port, Balochistan</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">Weather / Season</label>
                <select
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                  className="w-full bg-white border border-[#E8E4D9] rounded-2xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                >
                  <option value="Extreme Summer Heat (42°C) with High UV">Extreme Summer Heat (42°C)</option>
                  <option value="Monsoon Heavy Rain & Waterlogging">Monsoon Rains & Flooding</option>
                  <option value="Winter Dense Smog & Low Visibility">Winter Smog (PM2.5)</option>
                  <option value="Coastal High Wind Speeds (Karachi/Gwadar)">Coastal High Winds</option>
                  <option value="Moderate Clear Weather">Moderate Clear Day</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#2D2D2D] font-bold mb-1">Specific Activity Description</label>
              <textarea
                rows={3}
                value={specificActivity}
                onChange={(e) => setSpecificActivity(e.target.value)}
                placeholder="e.g. Scaffolding erection on 10th floor, Deep basement digging, Steel rebar cutting..."
                className="w-full bg-white border border-[#E8E4D9] rounded-2xl p-2.5 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">Height / Trench Depth</label>
                <input
                  type="text"
                  value={workingHeightOrDepth}
                  onChange={(e) => setWorkingHeightOrDepth(e.target.value)}
                  className="w-full bg-white border border-[#E8E4D9] rounded-2xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div>
                <label className="block text-[#2D2D2D] font-bold mb-1">Crew Size</label>
                <input
                  type="text"
                  value={crewSize}
                  onChange={(e) => setCrewSize(e.target.value)}
                  className="w-full bg-white border border-[#E8E4D9] rounded-2xl px-3 py-2 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#2D2D2D] font-bold mb-1">Equipment / Machinery On Site</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {equipmentOptions.map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer text-[11px] transition ${
                      equipmentUsed.includes(item)
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                        : 'bg-white border-[#E8E4D9] text-[#7C7C6A]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={equipmentUsed.includes(item)}
                      onChange={() => handleEquipmentToggle(item)}
                      className="rounded border-[#E8E4D9] text-[#5A5A40] focus:ring-[#5A5A40]"
                    />
                    <span className="truncate">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-red-100 border border-red-300 text-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold text-xs uppercase tracking-widest shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Site Risks with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate JSA & Risk Matrix</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Report View Column */}
        <div className="lg:col-span-7 space-y-6">
          {!report && !loading && (
            <div className="h-full min-h-[400px] rounded-[28px] bg-[#F5F5F0] border border-dashed border-[#E8E4D9] flex flex-col items-center justify-center p-8 text-center text-[#7C7C6A] space-y-3">
              <FileText className="w-12 h-12 text-[#A67C52]" />
              <h3 className="font-medium font-serif text-[#2D2D2D] text-lg">No JSA Generated Yet</h3>
              <p className="text-xs max-w-md">
                Select your site parameters on the left and click "Generate JSA & Risk Matrix" to get an immediate, bilingual hazard control plan.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[400px] rounded-[28px] bg-[#F5F5F0] border border-[#E8E4D9] flex flex-col items-center justify-center p-8 text-center text-[#2D2D2D] space-y-4">
              <RefreshCw className="w-10 h-10 text-[#5A5A40] animate-spin" />
              <div>
                <h3 className="font-medium font-serif text-[#2D2D2D] text-lg">Analyzing Job Safety Hazards...</h3>
                <p className="text-xs text-[#7C7C6A] mt-1">Cross-referencing PEC Safety Codes & Provincial OSH Regulations</p>
              </div>
            </div>
          )}

          {report && !loading && (
            <div className="bg-white border border-[#E8E4D9] rounded-[28px] p-6 text-[#2D2D2D] space-y-6 shadow-sm print:p-0 print:border-none">
              {/* Report Title Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E4D9] pb-4 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold border ${getRiskBadgeColor(report.overallRiskLevel)}`}>
                      OVERALL RISK: {report.overallRiskLevel}
                    </span>
                    <span className="text-xs text-[#7C7C6A] font-mono">{report.dateGenerated}</span>
                  </div>
                  <h2 className="text-2xl font-medium font-serif mt-2 text-[#2D2D2D]">{report.title}</h2>
                  <p className="text-xs text-[#7C7C6A] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" /> {report.location} • {report.projectType}
                  </p>
                </div>

                <div className="flex items-center gap-2 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="p-2.5 rounded-full bg-[#F5F5F0] hover:bg-[#e8e8df] text-[#2D2D2D] flex items-center gap-1.5 text-xs font-bold border border-[#E8E4D9]"
                  >
                    <Printer className="w-4 h-4 text-[#5A5A40]" />
                    <span>Print / PDF</span>
                  </button>
                </div>
              </div>

              {/* Urdu & English Summaries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-1">
                  <span className="font-bold text-[#A67C52] block uppercase tracking-wider text-[10px]">Executive Summary (English)</span>
                  <p className="text-[#2D2D2D] leading-relaxed">{report.summaryEnglish}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-1 text-right">
                  <span className="font-bold text-[#5A5A40] block uppercase tracking-wider text-[10px]">خلاصہ برائے سائٹ سپروائزر (Urdu)</span>
                  <p className="text-[#5A5A40] leading-relaxed text-sm font-serif dir-rtl">{report.summaryUrdu}</p>
                </div>
              </div>

              {/* Hazard Sequence Table */}
              <div className="space-y-3">
                <h3 className="font-medium font-serif text-lg text-[#5A5A40] flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#A67C52]" />
                  <span>Sequence of Job Steps & Hazard Controls</span>
                </h3>

                <div className="space-y-4">
                  {report.hazardSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#E8E4D9] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-[#E8E4D9] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#5A5A40] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-sm text-[#2D2D2D]">{step.stepDescription}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className={`px-2 py-0.5 rounded-full font-bold border ${getRiskBadgeColor(step.initialRisk)}`}>
                            Initial: {step.initialRisk}
                          </span>
                          <span>&rarr;</span>
                          <span className="px-2 py-0.5 rounded-full font-bold bg-[#5A5A40] text-white border border-[#5A5A40]">
                            Residual: {step.residualRisk}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {/* Potential Hazards */}
                        <div className="space-y-1">
                          <span className="font-bold text-[#A67C52] block text-[11px] uppercase tracking-wider">Potential Hazards</span>
                          <ul className="list-disc list-inside text-[#7C7C6A] space-y-0.5">
                            {step.potentialHazards.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Controls */}
                        <div className="space-y-1">
                          <span className="font-bold text-[#5A5A40] block text-[11px] uppercase tracking-wider">Mitigation & Control SOP</span>
                          <ul className="list-disc list-inside text-[#7C7C6A] space-y-0.5">
                            {step.mitigationControls.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E8E4D9] flex flex-wrap items-center justify-between text-[11px] gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#7C7C6A] font-semibold">Required PPE:</span>
                          <div className="flex flex-wrap gap-1">
                            {step.requiredPpe.map((ppe, i) => (
                              <span key={i} className="bg-[#F5F5F0] text-[#2D2D2D] border border-[#E8E4D9] px-2 py-0.5 rounded-full font-medium">
                                {ppe}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-[#5A5A40] font-mono text-[10px] bg-[#F5F5F0] px-2.5 py-0.5 rounded-full border border-[#E8E4D9]">
                          {step.pakistanStandardRef}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency & Supervisor Sign-off */}
              <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#A67C52] uppercase tracking-widest">Site Emergency Protocol</span>
                  <span className="text-[#A67C52] font-bold">Emergency Rescue: 1122</span>
                </div>
                <p className="text-[#2D2D2D]">{report.emergencyProtocol}</p>

                <div className="pt-3 border-t border-[#E8E4D9]">
                  <span className="font-bold text-[#2D2D2D] block mb-2">Pre-Job Supervisor Checklist</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {report.siteSupervisorChecklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-[#7C7C6A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Printable Signature Row */}
                <div className="pt-6 border-t border-[#E8E4D9] grid grid-cols-2 gap-6 text-[11px]">
                  <div>
                    <p className="text-[#7C7C6A]">HSE Officer Name & Sign:</p>
                    <div className="h-8 border-b border-[#E8E4D9] mt-1"></div>
                  </div>
                  <div>
                    <p className="text-[#7C7C6A]">Site Engineer Authorization:</p>
                    <div className="h-8 border-b border-[#E8E4D9] mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

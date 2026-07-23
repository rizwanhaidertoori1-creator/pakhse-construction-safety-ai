import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Upload, Image as ImageIcon, CheckCircle2, RefreshCw, X, FileText, Scale } from 'lucide-react';
import { IncidentAnalysis, Language } from '../types';

interface IncidentScannerProps {
  language: Language;
}

export const IncidentScanner: React.FC<IncidentScannerProps> = ({ language }) => {
  const [description, setDescription] = useState(
    'Worker observed walking along 8th floor outer concrete ledge without safety harness or lifeline during formwork removal in Karachi high-rise site.'
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<IncidentAnalysis | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        // Extract base64 part
        const base64Data = result.split(',')[1];
        setImageBase64(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !imageBase64) {
      setError('Please provide a description or upload an image of the site hazard.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          imageBase64,
          mimeType: 'image/jpeg',
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to analyze hazard report.');
      }

      const data: IncidentAnalysis = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during hazard analysis.');
    } finally {
      setLoading(false);
    }
  };

  const sampleHazards = [
    'Uncovered elevator shaft void on 5th floor with no barricade or warning sign.',
    'Bare wire joint dipped in rain puddle powering electric concrete vibrator in Lahore.',
    'Unshored deep excavation wall showing cracks near heavy truck roadway in Multan.',
    'Workers operating brick cutter creating dense silica dust without N95 masks or water spray.',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FDFCF8]">
      {/* Top Banner */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F0]/20 text-[#E8E4D9] text-xs font-semibold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-[#A67C52]" />
              <span>AI Hazard Inspection & Near-Miss Scanner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium font-serif tracking-tight text-white">
              Instant Site Violation & Stop-Work Analysis
            </h1>
            <p className="text-[#E8E4D9] text-sm max-w-3xl">
              Describe or snap a photo of hazardous conditions on site. AI evaluates emergency severity, generates immediate bilingual corrective action cards, and cites relevant Pakistani laws.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-[#F5F5F0] border border-[#E8E4D9] p-6 rounded-[28px] text-[#2D2D2D] space-y-5">
          <h2 className="text-lg font-medium font-serif flex items-center gap-2 border-b border-[#E8E4D9] pb-3 text-[#5A5A40]">
            <ShieldAlert className="w-5 h-5 text-[#A67C52]" />
            <span>Hazard Report Entry</span>
          </h2>

          <form onSubmit={handleAnalyze} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#2D2D2D] font-bold mb-1">
                Describe the Observed Hazard or Near-Miss
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe unsafe act or condition on site..."
                className="w-full bg-white border border-[#E8E4D9] rounded-2xl p-3 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
              />
            </div>

            {/* Quick Sample Selector */}
            <div>
              <span className="text-[#7C7C6A] font-bold block mb-1">Quick Sample Hazards:</span>
              <div className="space-y-1">
                {sampleHazards.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setDescription(sample)}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#E8E4D9]/40 border border-[#E8E4D9] text-[#2D2D2D] transition truncate text-[11px]"
                  >
                    • {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="block text-[#2D2D2D] font-bold mb-1">
                Attach Site Photo (Optional)
              </label>
              {!imagePreview ? (
                <label className="border-2 border-dashed border-[#E8E4D9] hover:border-[#5A5A40] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white transition">
                  <Upload className="w-6 h-6 text-[#A67C52] mb-1" />
                  <span className="text-[#2D2D2D] font-bold">Click to upload photo</span>
                  <span className="text-[#7C7C6A] text-[10px]">JPG, PNG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-[#E8E4D9]">
                  <img src={imagePreview} alt="Site hazard preview" className="w-full h-40 object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-[#2D2D2D]/80 text-white hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-red-100 border border-red-300 text-red-800">
                {error}
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
                  <span>Evaluating Hazard with Gemini AI...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-[#A67C52]" />
                  <span>Analyze Hazard & Corrective Actions</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {!analysis && !loading && (
            <div className="h-full min-h-[380px] rounded-[28px] bg-[#F5F5F0] border border-dashed border-[#E8E4D9] flex flex-col items-center justify-center p-8 text-center text-[#7C7C6A] space-y-3">
              <ShieldAlert className="w-12 h-12 text-[#A67C52]" />
              <h3 className="font-medium font-serif text-[#2D2D2D] text-lg">No Hazard Analysis Performed Yet</h3>
              <p className="text-xs max-w-md">
                Enter site observations or upload a photo to generate an immediate Stop-Work evaluation and bilingual corrective action card.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[380px] rounded-[28px] bg-[#F5F5F0] border border-[#E8E4D9] flex flex-col items-center justify-center p-8 text-center text-[#2D2D2D] space-y-4">
              <RefreshCw className="w-10 h-10 text-[#5A5A40] animate-spin" />
              <div>
                <h3 className="font-medium font-serif text-[#2D2D2D] text-lg">Inspecting Hazard Report...</h3>
                <p className="text-xs text-[#7C7C6A] mt-1">Cross-checking POSHA 2019, Sindh OSH & PEC Safety Codes</p>
              </div>
            </div>
          )}

          {analysis && !loading && (
            <div className="bg-white border border-[#E8E4D9] rounded-[28px] p-6 text-[#2D2D2D] space-y-6 shadow-sm">
              {/* Stop Work Alert Card */}
              {analysis.immediateStopWorkRequired ? (
                <div className="p-5 rounded-2xl bg-red-100 border-2 border-red-300 text-red-900 space-y-2 animate-pulse">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-red-900 uppercase tracking-widest flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      CRITICAL WORK STOPPAGE REQUIRED (کام فوراً روک دیں)
                    </span>
                    <span className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      STOP WORK
                    </span>
                  </div>
                  <p className="text-xs text-red-800">
                    This condition poses an immediate threat to human life or severe bodily harm under Pakistani statutory OSH laws. Clear the area immediately.
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] text-[#2D2D2D] space-y-1">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#5A5A40]" />
                    Corrective Measures Required Prior to Activity Resumption
                  </span>
                  <p className="text-xs text-[#7C7C6A]">
                    Hazard level identified as {analysis.severity}. Enforce corrective action checklist below.
                  </p>
                </div>
              )}

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E4D9] pb-4 gap-2">
                <div>
                  <span className="text-xs text-[#7C7C6A] uppercase tracking-wider font-mono">Incident Classification</span>
                  <h3 className="text-xl font-medium font-serif text-[#2D2D2D] mt-0.5">{analysis.incidentType}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#7C7C6A] uppercase tracking-wider font-mono block">Severity Index</span>
                  <span className="text-xs font-bold text-[#A67C52] bg-[#A67C52]/15 px-3 py-1 rounded-full border border-[#A67C52]/30 inline-block mt-1">
                    {analysis.severity}
                  </span>
                </div>
              </div>

              {/* Detected Hazards & Root Causes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-2">
                  <span className="font-bold text-[#A67C52] block uppercase tracking-wider text-[10px]">Detected Hazards</span>
                  <ul className="list-disc list-inside text-[#2D2D2D] space-y-1">
                    {analysis.detectedHazards.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-2">
                  <span className="font-bold text-[#5A5A40] block uppercase tracking-wider text-[10px]">Root Causes</span>
                  <ul className="list-disc list-inside text-[#2D2D2D] space-y-1">
                    {analysis.rootCauses.map((rc, i) => (
                      <li key={i}>{rc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bilingual Corrective Action Checklist */}
              <div className="space-y-3">
                <h4 className="font-medium font-serif text-lg text-[#5A5A40] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#5A5A40]" />
                  <span>Mandatory Corrective Action Checklist</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* English Actions */}
                  <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E8E4D9] space-y-2">
                    <span className="font-bold text-[#2D2D2D] block uppercase tracking-wider text-[10px]">English Protocol</span>
                    <ul className="space-y-2">
                      {analysis.correctiveActionsEnglish.map((act, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#2D2D2D]">
                          <span className="text-[#5A5A40] font-bold shrink-0">{i + 1}.</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Urdu Actions */}
                  <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E8E4D9] space-y-2 text-right">
                    <span className="font-bold text-[#5A5A40] block uppercase tracking-wider text-[10px]">اصلاحی ہدایات (Urdu)</span>
                    <ul className="space-y-2 dir-rtl font-serif">
                      {analysis.correctiveActionsUrdu.map((act, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#5A5A40]">
                          <span className="text-[#A67C52] font-bold shrink-0">{i + 1}.</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Statutory Law Reference */}
              <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] flex items-start gap-3 text-xs">
                <Scale className="w-5 h-5 text-[#A67C52] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2D2D2D] block">Statutory Legal Framework:</span>
                  <span className="text-[#A67C52] font-mono text-[11px] font-bold block mt-0.5">{analysis.relevantPakLaw}</span>
                  <p className="text-[#7C7C6A] mt-1 leading-relaxed">{analysis.preventativeSop}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

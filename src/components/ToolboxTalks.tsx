import React, { useState } from 'react';
import { HardHat, Sparkles, Printer, CheckCircle2, Clock, MessageCircle, FileText, RefreshCw, Languages } from 'lucide-react';
import { PRELOADED_TOOLBOX_TALKS } from '../data/pakistanHseData';
import { ToolboxTalk, Language } from '../types';

interface ToolboxTalksProps {
  language: Language;
}

export const ToolboxTalks: React.FC<ToolboxTalksProps> = ({ language }) => {
  const [selectedTalk, setSelectedTalk] = useState<ToolboxTalk>(PRELOADED_TOOLBOX_TALKS[0]);
  const [customTopic, setCustomTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCustomTalk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-toolbox-talk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: customTopic,
          siteActivity: customTopic,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate custom Toolbox Talk.');
      }

      const data: ToolboxTalk = await response.json();
      setSelectedTalk(data);
      setCustomTopic('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error generating custom briefing.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FDFCF8]">
      {/* Banner */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F0]/20 text-[#E8E4D9] text-xs font-semibold uppercase tracking-wider">
              <HardHat className="w-4 h-4 text-[#A67C52]" />
              <span>Daily Pre-Shift Safety Briefings (روزانہ سیفٹی بریفنگ)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium font-serif tracking-tight text-white">
              Bilingual Toolbox Talks (TBT) Library & Generator
            </h1>
            <p className="text-[#E8E4D9] text-sm max-w-3xl">
              Conduct 5-minute pre-shift safety briefings with site workers in English and Urdu. Print or export attendance cards for site audits.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Selector & Custom Generator */}
        <div className="lg:col-span-4 space-y-6">
          {/* Preloaded Topics */}
          <div className="bg-[#F5F5F0] border border-[#E8E4D9] p-5 rounded-[28px] text-[#2D2D2D] space-y-3">
            <h2 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider border-b border-[#E8E4D9] pb-2">
              Pre-loaded Safety Briefings
            </h2>
            <div className="space-y-2">
              {PRELOADED_TOOLBOX_TALKS.map((tbt) => (
                <button
                  key={tbt.id}
                  onClick={() => setSelectedTalk(tbt)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs transition ${
                    selectedTalk.id === tbt.id
                      ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                      : 'bg-white hover:bg-[#E8E4D9]/40 border-[#E8E4D9] text-[#2D2D2D]'
                  }`}
                >
                  <div className="font-bold">{tbt.topic}</div>
                  <div className={`text-[11px] font-serif dir-rtl mt-0.5 ${selectedTalk.id === tbt.id ? 'text-[#E8E4D9]' : 'text-[#5A5A40]'}`}>{tbt.topicUrdu}</div>
                  <div className="flex items-center gap-2 text-[10px] mt-2 opacity-80">
                    <span className={`px-2 py-0.5 rounded-full border ${selectedTalk.id === tbt.id ? 'bg-[#4a4a34] border-[#4a4a34] text-white' : 'bg-[#F5F5F0] border-[#E8E4D9] text-[#7C7C6A]'}`}>{tbt.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tbt.estimatedMinutes} Mins</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Custom Talk Generator */}
          <div className="bg-[#F5F5F0] border border-[#E8E4D9] p-5 rounded-[28px] text-[#2D2D2D] space-y-3">
            <h2 className="text-xs font-bold text-[#A67C52] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#E8E4D9] pb-2">
              <Sparkles className="w-4 h-4 text-[#A67C52]" />
              <span>Generate AI Custom TBT</span>
            </h2>
            <p className="text-xs text-[#7C7C6A]">
              Enter any specific site activity (e.g., Tower Crane Rigging, Deep Trench Digging, Welding in Confined Space).
            </p>

            <form onSubmit={handleGenerateCustomTalk} className="space-y-3 text-xs">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="Topic: e.g. Concrete Vibrator Safety..."
                className="w-full bg-white border border-[#E8E4D9] rounded-2xl p-2.5 text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
              />

              {error && <div className="text-red-600 text-[11px]">{error}</div>}

              <button
                type="submit"
                disabled={loading || !customTopic.trim()}
                className="w-full py-3 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating Bilingual TBT...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#A67C52]" />
                    <span>Generate TBT Card</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Display Card */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-[#E8E4D9] rounded-[28px] p-6 text-[#2D2D2D] space-y-6 shadow-sm print:p-0 print:border-none">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E4D9] pb-4 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#5A5A40]/15 text-[#5A5A40] border border-[#5A5A40]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedTalk.category}
                  </span>
                  <span className="text-xs text-[#7C7C6A] flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#A67C52]" /> {selectedTalk.estimatedMinutes} Minutes Duration
                  </span>
                </div>
                <h2 className="text-2xl font-medium font-serif text-[#2D2D2D] mt-2">{selectedTalk.topic}</h2>
                <p className="text-[#5A5A40] font-serif text-lg dir-rtl mt-0.5">{selectedTalk.topicUrdu}</p>
              </div>

              <button
                onClick={handlePrint}
                className="self-start sm:self-center p-2.5 rounded-full bg-[#F5F5F0] hover:bg-[#e8e8df] text-[#2D2D2D] flex items-center gap-1.5 text-xs font-bold border border-[#E8E4D9] print:hidden"
              >
                <Printer className="w-4 h-4 text-[#5A5A40]" />
                <span>Print TBT Sheet</span>
              </button>
            </div>

            {/* Side-by-Side Talking Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* English Talking Points */}
              <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-2">
                <span className="font-bold text-[#A67C52] uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5" /> English Key Briefing Points
                </span>
                <ul className="space-y-2">
                  {selectedTalk.keyTalkingPointsEnglish.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#2D2D2D]">
                      <span className="text-[#5A5A40] font-bold shrink-0">{i + 1}.</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Urdu Talking Points */}
              <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-2 text-right">
                <span className="font-bold text-[#5A5A40] uppercase tracking-wider text-[10px] block">
                  اہم سکیورٹی نکات (Urdu)
                </span>
                <ul className="space-y-2 dir-rtl font-serif">
                  {selectedTalk.keyTalkingPointsUrdu.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#5A5A40]">
                      <span className="text-[#A67C52] font-bold shrink-0">{i + 1}.</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Check Questions */}
            <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E8E4D9] space-y-2 text-xs">
              <span className="font-bold text-[#A67C52] uppercase tracking-wider text-[10px] flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" /> Interactive Worker Check Questions
              </span>
              <ul className="space-y-1 text-[#2D2D2D]">
                {selectedTalk.interactiveQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attendance & Supervisor Sign-Off Sheet */}
            <div className="p-5 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] text-xs space-y-3">
              <span className="font-bold text-[#2D2D2D] uppercase tracking-wider block border-b border-[#E8E4D9] pb-2">
                Shift Attendance Log & Certification
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-[#7C7C6A]">
                <div>Project Site: <span className="text-[#2D2D2D] font-semibold block">_________________</span></div>
                <div>Date: <span className="text-[#2D2D2D] font-semibold block">{new Date().toLocaleDateString()}</span></div>
                <div>Attended Workers: <span className="text-[#2D2D2D] font-semibold block">______ Workers</span></div>
                <div>Supervisor Sign: <span className="text-[#2D2D2D] font-semibold block">_________________</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

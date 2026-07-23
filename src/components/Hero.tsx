import React from 'react';
import { Shield, Sparkles, HardHat, AlertTriangle, FileText, Activity, Sun, Wind, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, language }) => {
  return (
    <div className="relative overflow-hidden bg-[#FDFCF8] text-[#2D2D2D]">
      {/* Background Graphic & Image Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="/src/assets/images/pakistan_construction_site_1784803403698.jpg"
          alt="Pakistan Construction Site"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/80 to-transparent"></div>
      </div>

      {/* Hero Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Headline Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F0] border border-[#E8E4D9] text-[#A67C52] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#A67C52]" />
              <span>Next-Gen HSE AI Platform for Pakistan Infrastructure</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium tracking-tight text-[#2D2D2D] leading-[1.1] font-serif">
              Safeguarding Pakistan's <span className="italic font-light text-[#5A5A40]">Skyline</span> with AI.
            </h1>

            <div className="p-5 rounded-[24px] bg-[#F5F5F0] border border-[#E8E4D9] space-y-3">
              <p className="text-[#5A5A40] font-serif text-lg leading-relaxed text-right dir-rtl">
                پاکستان کے تعمیری شعبے کے لیے آرٹیفیشل انٹیلی جنس سے آراستہ مکمل سیفٹی تعلیمی و رہنمائی پورٹل
              </p>
              <p className="text-[#7C7C6A] text-sm leading-relaxed">
                Empowering site engineers, contractors, safety officers, and labor across Punjab, Sindh, KPK, Balochistan, and Federal territories with real-time AI Risk Matrices, Job Safety Analyses (JSA), bilingual Toolbox Talks, and statutory regulatory guidance.
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('jsa')}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#5A5A40]/20 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Risk Matrix (JSA)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setActiveTab('incident')}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#F5F5F0] hover:bg-[#e8e8df] text-[#A67C52] border border-[#E8E4D9] font-bold text-xs uppercase tracking-wider transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-[#A67C52]" />
                <span>Scan Hazard Report</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#F5F5F0] hover:bg-[#e8e8df] text-[#2D2D2D] border border-[#E8E4D9] font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Shield className="w-4 h-4 text-[#5A5A40]" />
                <span>Consult AI Expert</span>
              </button>
            </div>

            {/* Badge Compliance Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                <span className="text-[#2D2D2D] font-semibold text-[11px]">PEC Building Code</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                <span className="text-[#2D2D2D] font-semibold text-[11px]">POSHA 2019 (Punjab)</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                <span className="text-[#2D2D2D] font-semibold text-[11px]">Sindh OSH Act 2017</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                <span className="text-[#2D2D2D] font-semibold text-[11px]">Rescue 1122 Linked</span>
              </div>
            </div>
          </div>

          {/* Interactive Feature Preview Card Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative p-6 rounded-[32px] bg-white border border-[#E8E4D9] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-[#F5F5F0] text-[#5A5A40]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-[#A67C52] font-sans">Active Site Monitor</h3>
                    <p className="text-xs text-[#7C7C6A]">Lahore District & High-Rise Sites</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold bg-[#F5F5F0] text-[#5A5A40] px-2.5 py-1 rounded-full border border-[#E8E4D9]">
                  AI ACTIVE
                </span>
              </div>

              {/* Sample Hazard Cards Teaser */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FDFCF8] border border-[#E8E4D9] flex items-start justify-between">
                  <div>
                    <span className="font-bold text-[#2D2D2D] flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#A67C52]"></div> Scaffolding Unbraced Height (High-Rise)
                    </span>
                    <p className="text-[#7C7C6A] text-[11px] mt-1">Bamboo/pipe frame &gt;10m without Green Tag & double lanyard harness.</p>
                  </div>
                  <span className="bg-[#A67C52]/10 text-[#A67C52] border border-[#A67C52]/20 px-2 py-0.5 rounded-full font-bold text-[10px]">POSHA Viol.</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FDFCF8] border border-[#E8E4D9] flex items-start justify-between">
                  <div>
                    <span className="font-bold text-[#2D2D2D] flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#5A5A40]"></div> Monsoon & 42°C Extreme Heat Risk
                    </span>
                    <p className="text-[#7C7C6A] text-[11px] mt-1">Direct midday concrete casting without shaded rest shelter & ORS taps.</p>
                  </div>
                  <span className="bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/20 px-2 py-0.5 rounded-full font-bold text-[10px]">Sindh OSH</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FDFCF8] border border-[#E8E4D9] flex items-start justify-between">
                  <div>
                    <span className="font-bold text-[#2D2D2D] flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#2D2D2D]"></div> PM2.5 Silica Dust & Smog Emissions
                    </span>
                    <p className="text-[#7C7C6A] text-[11px] mt-1">Dry concrete grinding without water misting or N95 masks.</p>
                  </div>
                  <span className="bg-[#2D2D2D]/10 text-[#2D2D2D] border border-[#2D2D2D]/20 px-2 py-0.5 rounded-full font-bold text-[10px]">PEPA 1997</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E8E4D9] flex items-center justify-between text-xs">
                <span className="text-[#7C7C6A]">Need instant customized JSA?</span>
                <button
                  onClick={() => setActiveTab('jsa')}
                  className="text-[#5A5A40] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Launch AI Generator</span> &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* The 3 Pillars Section: Health, Safety, Environment */}
      <div className="bg-[#F5F5F0] py-16 border-t border-b border-[#E8E4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="inline-block px-3 py-1 bg-[#FDFCF8] border border-[#E8E4D9] rounded-full text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#A67C52]">
              CORE CURRICULUM
            </span>
            <h2 className="text-3xl font-medium text-[#2D2D2D] tracking-tight font-serif">
              The Three Pillars of Construction Protection in Pakistan
            </h2>
            <p className="text-[#7C7C6A] text-sm">
              Comprehensive educational framework addressing site health hazards, structural fall risks, and environmental emissions across Pakistani cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Health Pillar */}
            <div className="p-8 rounded-[28px] bg-white border border-[#E8E4D9] hover:border-[#5A5A40] transition-all space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#5A5A40] text-white flex items-center justify-center font-bold text-xl shadow-md">
                <Sun className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">Pillar 01 • Health (صحت)</span>
                <h3 className="text-xl font-medium text-[#2D2D2D] font-serif">Occupational Health & Hygiene</h3>
              </div>
              <ul className="text-xs text-[#7C7C6A] space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#5A5A40] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Extreme Heatwave Protection:</strong> Hydration schedules, ORS distribution, and shade breaks during 40°C+ summer peaks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5A5A40] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Silica & Dust Prevention:</strong> N95/FFP2 respirators for brick cutting and dry aggregate batching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5A5A40] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Noise Control:</strong> Ear protectors (&gt;85 dB) around generators, pile drivers, and compactors.</span>
                </li>
              </ul>
            </div>

            {/* Safety Pillar */}
            <div className="p-8 rounded-[28px] bg-white border border-[#E8E4D9] hover:border-[#A67C52] transition-all space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#A67C52] text-white flex items-center justify-center font-bold text-xl shadow-md">
                <HardHat className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">Pillar 02 • Safety (حفاظت)</span>
                <h3 className="text-xl font-medium text-[#2D2D2D] font-serif">Structural & Operational Safety</h3>
              </div>
              <ul className="text-xs text-[#7C7C6A] space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#A67C52] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Scaffolding Tagging:</strong> Green (Safe) and Red (Unsafe) tags for tubular steel frame erections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A67C52] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Deep Excavation Shoring:</strong> Steel/timber box trench support for basements &gt;1.5m deep in alluvial soil.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A67C52] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Monsoon Electrocution:</strong> ELCB/GFCI 30mA earth leakage breakers and elevated power lines.</span>
                </li>
              </ul>
            </div>

            {/* Environment Pillar */}
            <div className="p-8 rounded-[28px] bg-white border border-[#E8E4D9] hover:border-[#2D2D2D] transition-all space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#2D2D2D] text-white flex items-center justify-center font-bold text-xl shadow-md">
                <Wind className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">Pillar 03 • Environment (ماحولیات)</span>
                <h3 className="text-xl font-medium text-[#2D2D2D] font-serif">Environmental Stewardship (PEPA)</h3>
              </div>
              <ul className="text-xs text-[#7C7C6A] space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#2D2D2D] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Dust Suppression Misting:</strong> Water spraying trucks on haul roads to suppress PM2.5/PM10.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2D2D2D] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Slurry & Chemical Washout:</strong> Sealed plastic lined washout pits for concrete transit mixers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2D2D2D] font-bold">•</span>
                  <span><strong className="text-[#2D2D2D]">Waste Disposal SOPs:</strong> Segregated recycling of timber, steel scrap, and inert demolition debris.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

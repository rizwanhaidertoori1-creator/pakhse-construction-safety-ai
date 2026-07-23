import React from 'react';
import { Shield, HardHat, PhoneCall, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#2D2D2D] text-[#FDFCF8] text-xs pt-12 pb-8 border-t border-[#444]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5A5A40] flex items-center justify-center text-white font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#FDFCF8] font-serif">PakHSE<span className="font-light text-[#A67C52]">AI</span></span>
            </div>
            <p className="text-[#A0A090] leading-relaxed text-[11px]">
              AI-powered Health, Safety & Environmental (HSE) educational and risk management portal for Pakistani construction sites, infrastructure projects, and engineering teams.
            </p>
            <p className="text-[#A67C52] font-serif text-xs dir-rtl">
              پاکستان کی تعمیری سائٹس کے لیے محفوظ ترین اے آئی ہیلتھ اینڈ سیفٹی تعلیمی پورٹل
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2">
            <span className="font-bold text-[#A67C52] uppercase text-[10px] tracking-widest block border-b border-[#444] pb-2">
              Platform Features
            </span>
            <ul className="space-y-1.5 text-[#A0A090]">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-[#FDFCF8] transition">
                  Site Safety Dashboard & Checklist
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('jsa')} className="hover:text-[#FDFCF8] transition">
                  AI Job Safety Analysis (JSA)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('incident')} className="hover:text-[#FDFCF8] transition">
                  AI Hazard & Near-Miss Scanner
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('chat')} className="hover:text-[#FDFCF8] transition">
                  PakHSE AI Safety Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tbt')} className="hover:text-[#FDFCF8] transition">
                  Bilingual Toolbox Talks (TBTs)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('laws')} className="hover:text-[#FDFCF8] transition">
                  Pakistan Laws (POSHA / PEC)
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory Standards */}
          <div className="space-y-2">
            <span className="font-bold text-[#A67C52] uppercase text-[10px] tracking-widest block border-b border-[#444] pb-2">
              Pakistani Standards
            </span>
            <ul className="space-y-1.5 text-[#A0A090] text-[11px]">
              <li>• Punjab OSH Act 2019 (POSHA)</li>
              <li>• Sindh OSH Act 2017</li>
              <li>• PEC Building Code Safety Provisions</li>
              <li>• PEPA 1997 Environmental NEQS</li>
              <li>• West Pak Factories Rules 1962</li>
            </ul>
          </div>

          {/* Emergency Box */}
          <div className="p-5 rounded-2xl bg-[#3D3D35] border border-[#5A5A40] space-y-2">
            <span className="font-bold text-[#A67C52] uppercase text-[10px] tracking-widest flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#A67C52]" /> Emergency Hotlines
            </span>
            <div className="space-y-1 text-[#E8E4D9] font-mono text-[11px]">
              <div className="flex justify-between">
                <span>Rescue 1122:</span>
                <strong className="text-white">1122</strong>
              </div>
              <div className="flex justify-between">
                <span>Edhi Ambulance:</span>
                <strong className="text-white">115</strong>
              </div>
              <div className="flex justify-between">
                <span>Chhipa Service:</span>
                <strong className="text-white">1020</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-[#444] flex flex-col sm:flex-row items-center justify-between text-[#888878] text-[11px] gap-4">
          <p>
            © {new Date().getFullYear()} PakHSE AI. Aligned with Pakistan Engineering Council (PEC) guidelines. Educational portal designed to complement certified HSE engineering oversight.
          </p>
          <div className="flex items-center gap-1 text-[#A67C52]">
            <span>Built for Safer Construction in Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

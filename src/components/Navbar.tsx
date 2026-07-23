import React from 'react';
import { Shield, HardHat, Sparkles, BookOpen, AlertTriangle, MessageSquareCode, Award, PhoneCall, Globe, LayoutDashboard } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
}) => {
  const navItems = [
    { id: 'home', label: 'Overview', labelUrdu: 'مرکزی صفحہ', icon: Shield },
    { id: 'dashboard', label: 'Safety Dashboard', labelUrdu: 'ڈیش بورڈ', icon: LayoutDashboard },
    { id: 'jsa', label: 'AI Risk Matrix (JSA)', labelUrdu: 'رزک میٹرکس', icon: Sparkles },
    { id: 'incident', label: 'AI Hazard Report', labelUrdu: 'خطرات کا تجزیہ', icon: AlertTriangle },
    { id: 'chat', label: 'AI HSE Advisor', labelUrdu: 'مشیر سیفٹی', icon: MessageSquareCode },
    { id: 'tbt', label: 'Toolbox Talks', labelUrdu: 'روزانہ بریفنگ', icon: HardHat },
    { id: 'laws', label: 'Pakistan Laws', labelUrdu: 'قوانین و ضوابط', icon: BookOpen },
    { id: 'quiz', label: 'Safety Quiz', labelUrdu: 'سیفٹی ٹیسٹ', icon: Award },
    { id: 'emergency', label: '1122 Helpline', labelUrdu: 'ایمرجنسی 1122', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#E8E4D9] text-[#2D2D2D] shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-[#5A5A40] text-[#FDFCF8] text-xs px-4 py-1 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#A67C52] animate-pulse"></span>
          <span>Aligned with Pakistan Engineering Council (PEC) & Provincial OSH Acts (POSHA 2019 / Sindh 2017)</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <span className="text-[#E8E4D9]">National Emergency: <strong className="text-white bg-[#A67C52] px-2 py-0.5 rounded-full font-bold">1122</strong></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#5A5A40] flex items-center justify-center text-white font-bold shadow-md shadow-[#5A5A40]/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-[#5A5A40] font-serif">
                  PakHSE<span className="font-light text-[#A67C52]">AI</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F5F5F0] text-[#A67C52] border border-[#E8E4D9] px-2 py-0.5 rounded-full">
                  PAKISTAN
                </span>
              </div>
              <p className="text-[10px] text-[#7C7C6A] -mt-0.5 font-sans tracking-wide">
                Construction Health, Safety & Environment
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#5A5A40] text-white shadow-md shadow-[#5A5A40]/20'
                      : 'text-[#7C7C6A] hover:text-[#2D2D2D] hover:bg-[#F5F5F0]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-90" />
                  <span>{language === 'ur' ? item.labelUrdu : item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#F5F5F0] border border-[#E8E4D9] rounded-full p-1 text-xs">
              <div className="px-2 text-[#7C7C6A] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#5A5A40]" />
              </div>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                  language === 'en'
                    ? 'bg-[#5A5A40] text-white shadow-sm'
                    : 'text-[#7C7C6A] hover:text-[#2D2D2D]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                  language === 'ur'
                    ? 'bg-[#5A5A40] text-white shadow-sm'
                    : 'text-[#7C7C6A] hover:text-[#2D2D2D]'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => setLanguage('roman_ur')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                  language === 'roman_ur'
                    ? 'bg-[#5A5A40] text-white shadow-sm'
                    : 'text-[#7C7C6A] hover:text-[#2D2D2D]'
                }`}
              >
                Roman
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Scrollable Sub-menu */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2.5 border-t border-[#E8E4D9] no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition ${
                  isActive
                    ? 'bg-[#5A5A40] text-white shadow-sm'
                    : 'bg-[#F5F5F0] text-[#7C7C6A] border border-[#E8E4D9]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? item.labelUrdu : item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

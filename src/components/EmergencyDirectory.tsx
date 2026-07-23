import React from 'react';
import { PhoneCall, AlertTriangle, ShieldCheck, MapPin, Building2, ExternalLink } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/pakistanHseData';
import { Language } from '../types';

interface EmergencyDirectoryProps {
  language: Language;
}

export const EmergencyDirectory: React.FC<EmergencyDirectoryProps> = ({ language }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FDFCF8]">
      {/* Banner */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F0]/20 text-[#E8E4D9] text-xs font-semibold uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-[#A67C52]" />
              <span>National Emergency Response Protocol</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium font-serif tracking-tight text-white">
              Pakistan Construction Emergency & Helpline Directory
            </h1>
            <p className="text-[#E8E4D9] text-sm max-w-3xl">
              Instant access to Rescue 1122, Edhi, Chhipa, Pakistan Engineering Council, and EPA environmental emergency contacts across all provinces.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Phone Call Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EMERGENCY_CONTACTS.map((contact, idx) => (
          <div
            key={idx}
            className="bg-[#F5F5F0] border border-[#E8E4D9] hover:border-[#5A5A40] p-6 rounded-[28px] text-[#2D2D2D] space-y-4 transition flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#5A5A40] font-mono tracking-wider bg-white px-3.5 py-1 rounded-2xl border border-[#E8E4D9] shadow-xs">
                  {contact.number}
                </span>
                <span className="text-[10px] bg-white text-[#7C7C6A] px-2.5 py-1 rounded-full font-bold border border-[#E8E4D9] uppercase tracking-wider">
                  {contact.coverage}
                </span>
              </div>

              <h3 className="font-bold text-base text-[#2D2D2D] pt-1">{contact.serviceName}</h3>
              <p className="text-[#5A5A40] font-serif dir-rtl text-sm">{contact.serviceNameUrdu}</p>
              <p className="text-xs text-[#7C7C6A] leading-relaxed pt-1">{contact.description}</p>
            </div>

            <a
              href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
              className="w-full py-3 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold text-xs uppercase tracking-widest shadow transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#A67C52]" />
              <span>Call Emergency {contact.number}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Step-by-Step Incident Response Protocol */}
      <div className="bg-white border border-[#E8E4D9] rounded-[28px] p-6 sm:p-8 text-[#2D2D2D] space-y-4 shadow-sm">
        <h2 className="text-lg font-medium font-serif text-[#2D2D2D] flex items-center gap-2 border-b border-[#E8E4D9] pb-3">
          <AlertTriangle className="w-5 h-5 text-[#A67C52]" />
          <span>Mandatory Site Emergency Response SOP (Pakistani Sites)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs pt-2">
          <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-1">
            <span className="text-[#A67C52] font-black text-base font-serif">01</span>
            <span className="font-bold text-[#2D2D2D] block">Call Rescue 1122</span>
            <p className="text-[#7C7C6A]">Dial 1122 immediately and state exact location, landmark & casualty count.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-1">
            <span className="text-[#A67C52] font-black text-base font-serif">02</span>
            <span className="font-bold text-[#2D2D2D] block">Power Isolation</span>
            <p className="text-[#7C7C6A]">In electrocution or fire, hit the emergency master trip switch on DB.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-1">
            <span className="text-[#5A5A40] font-black text-base font-serif">03</span>
            <span className="font-bold text-[#2D2D2D] block">Cordon Off Site</span>
            <p className="text-[#7C7C6A]">Erect red warning tape around collapse or hazard zone at 20m radius.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-1">
            <span className="text-[#5A5A40] font-black text-base font-serif">04</span>
            <span className="font-bold text-[#2D2D2D] block">Gate Guide Escort</span>
            <p className="text-[#7C7C6A]">Position a flag-man at site main gate to guide incoming 1122 ambulance.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F5F0] border border-[#E8E4D9] space-y-1">
            <span className="text-[#5A5A40] font-black text-base font-serif">05</span>
            <span className="font-bold text-[#2D2D2D] block">Incident Log</span>
            <p className="text-[#7C7C6A]">Log written report to Labour Department within 24 hours per POSHA 2019.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

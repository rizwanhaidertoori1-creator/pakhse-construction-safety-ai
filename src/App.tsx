import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { JsaGenerator } from './components/JsaGenerator';
import { IncidentScanner } from './components/IncidentScanner';
import { HseChatbot } from './components/HseChatbot';
import { ToolboxTalks } from './components/ToolboxTalks';
import { RegulationsGuide } from './components/RegulationsGuide';
import { PpeInteractive } from './components/PpeInteractive';
import { SafetyQuiz } from './components/SafetyQuiz';
import { EmergencyDirectory } from './components/EmergencyDirectory';
import { Footer } from './components/Footer';
import { Language } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2D2D] flex flex-col font-sans selection:bg-[#5A5A40] selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <Hero setActiveTab={setActiveTab} language={language} />
            <div className="border-t border-slate-800/80 pt-4">
              <PpeInteractive language={language} />
            </div>
            <div className="border-t border-slate-800/80 pt-4">
              <RegulationsGuide language={language} />
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && <Dashboard language={language} />}

        {activeTab === 'jsa' && <JsaGenerator language={language} />}

        {activeTab === 'incident' && <IncidentScanner language={language} />}

        {activeTab === 'chat' && <HseChatbot language={language} />}

        {activeTab === 'tbt' && <ToolboxTalks language={language} />}

        {activeTab === 'laws' && <RegulationsGuide language={language} />}

        {activeTab === 'quiz' && <SafetyQuiz language={language} />}

        {activeTab === 'emergency' && <EmergencyDirectory language={language} />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

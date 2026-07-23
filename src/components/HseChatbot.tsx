import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, Send, Sparkles, User, Shield, RefreshCw, Copy, Check, Globe } from 'lucide-react';
import { Language } from '../types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

interface HseChatbotProps {
  language: Language;
}

export const HseChatbot: React.FC<HseChatbotProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Assalam-o-Alaikum! I am your PakHSE AI Safety Advisor. Ask me anything regarding construction Health, Safety & Environmental regulations in Pakistan, Job Safety Analysis (JSA), POSHA 2019, Sindh OSH Act, PEC Building Codes, monsoon/heatwave SOPs, or Rescue 1122 emergency procedures.\n\nآپ مجھ سے پاکستان کے تعمیری قوانین اور سائٹ پر سلامتی کے اقدامات کے بارے میں اردو یا انگریزی میں سوال پوچھ سکتے ہیں۔',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'What are POSHA 2019 penalties for missing safety harnesses?',
    'How to prevent heat stroke on a Multan 45°C construction site?',
    'What are PEC rules for scaffolding Green Tags and double lanyards?',
    'How to secure site electrical distribution boards during monsoon rains?',
    'What are NEQS dust limits under PEPA 1997 for urban high-rise projects?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Prepare history
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/hse-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          language,
          history,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to communicate with AI Safety Advisor.');
      }

      const data = await response.json();

      const assistantMsg: Message = {
        role: 'assistant',
        text: data.text || 'No response received from AI advisor.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error(error);
      const errorMsg: Message = {
        role: 'assistant',
        text: `Error: ${error.message || 'Unable to fetch response. Please check network connection.'}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#FDFCF8]">
      {/* Header */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#A67C52] flex items-center justify-center text-white shadow">
            <MessageSquareCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-medium font-serif text-white">PakHSE AI Safety Consultant</h1>
              <span className="text-[10px] bg-[#F5F5F0]/20 text-[#E8E4D9] border border-[#E8E4D9]/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                ONLINE
              </span>
            </div>
            <p className="text-[#E8E4D9] text-xs mt-0.5">
              Interactive Pakistani OSH & Environmental Compliance Advisor (English, Urdu, Roman Urdu)
            </p>
          </div>
        </div>

        <div className="text-xs text-[#E8E4D9] flex items-center gap-2 bg-[#F5F5F0]/10 px-3 py-1.5 rounded-full">
          <Globe className="w-4 h-4 text-[#A67C52]" />
          <span>Responding in: <strong className="text-white uppercase">{language}</strong></span>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-[#F5F5F0] border border-[#E8E4D9] rounded-[32px] overflow-hidden flex flex-col h-[580px] shadow-sm">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-xs shadow-sm ${
                    isUser
                      ? 'bg-[#2D2D2D] text-white'
                      : 'bg-[#5A5A40] text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs space-y-1 ${
                    isUser
                      ? 'bg-[#5A5A40] text-white rounded-tr-none'
                      : 'bg-white text-[#2D2D2D] border border-[#E8E4D9] rounded-tl-none shadow-xs'
                  }`}
                >
                  <div className={`flex items-center justify-between text-[10px] border-b pb-1 mb-1 ${
                    isUser ? 'text-[#E8E4D9] border-white/20' : 'text-[#7C7C6A] border-[#E8E4D9]'
                  }`}>
                    <span className="font-bold">
                      {isUser ? 'You (Site Engineer)' : 'PakHSE AI Advisor'}
                    </span>
                    <span>{msg.time}</span>
                  </div>

                  <div className="whitespace-pre-wrap leading-relaxed font-sans text-xs">
                    {msg.text}
                  </div>

                  {!isUser && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => copyToClipboard(msg.text, index)}
                        className="text-[10px] text-[#7C7C6A] hover:text-[#2D2D2D] flex items-center gap-1 transition font-medium"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-3 h-3 text-[#5A5A40]" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-[#A67C52]" /> Copy Text
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#5A5A40] flex items-center justify-center text-white font-bold shrink-0 text-xs">
                <Shield className="w-4 h-4" />
              </div>
              <div className="bg-white text-[#2D2D2D] border border-[#E8E4D9] rounded-2xl p-4 text-xs flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#5A5A40] animate-spin" />
                <span>Consulting Pakistani OSH Codes & PEPA standards...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions Row */}
        <div className="p-3 bg-[#E8E4D9]/40 border-t border-[#E8E4D9] overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[10px] text-[#7C7C6A] uppercase font-mono font-bold shrink-0 px-2">
            Suggested Queries:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs bg-white hover:bg-[#5A5A40] text-[#2D2D2D] hover:text-white px-3 py-1.5 rounded-full border border-[#E8E4D9] shrink-0 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-[#E8E4D9] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'اپنا سوال یہاں لکھیں...'
                : 'Ask AI HSE Advisor regarding site safety, laws, or hazards...'
            }
            className="flex-1 bg-[#F5F5F0] border border-[#E8E4D9] rounded-2xl px-4 py-3 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#5A5A40]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

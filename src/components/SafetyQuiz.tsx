import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RefreshCw, Printer, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { SAMPLE_QUIZ_QUESTIONS } from '../data/pakistanHseData';
import { Language, QuizResult } from '../types';

interface SafetyQuizProps {
  language: Language;
}

export const SafetyQuiz: React.FC<SafetyQuizProps> = ({ language }) => {
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = SAMPLE_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIdx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < SAMPLE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      SAMPLE_QUIZ_QUESTIONS.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });

      const percentage = Math.round((correctCount / SAMPLE_QUIZ_QUESTIONS.length) * 100);
      const passed = percentage >= 75;

      const certId = `PAK-HSE-${Math.floor(100000 + Math.random() * 900000)}`;
      const res: QuizResult = {
        score: correctCount,
        totalQuestions: SAMPLE_QUIZ_QUESTIONS.length,
        passed,
        percentage,
        certificateId: certId,
        completionDate: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }),
      };

      setResult(res);
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setResult(null);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#FDFCF8]">
      {/* Banner */}
      <div className="bg-[#5A5A40] p-6 sm:p-8 rounded-[32px] text-[#FDFCF8] shadow-md text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F5F0]/20 text-[#E8E4D9] text-xs font-semibold uppercase tracking-wider">
          <Award className="w-4 h-4 text-[#A67C52]" />
          <span>PakHSE Certified Safety Specialist Exam</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium font-serif tracking-tight text-white">
          Construction OSH Knowledge Test & Certification
        </h1>
        <p className="text-[#E8E4D9] text-xs max-w-xl mx-auto">
          Evaluate your understanding of Pakistani site hazard controls, POSHA 2019, Sindh OSH Act, and PEC Building Codes to earn a PakHSE Digital Safety Badge.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-[#F5F5F0] border border-[#E8E4D9] rounded-[28px] p-6 sm:p-8 text-[#2D2D2D] space-y-6 shadow-sm">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-4 text-xs text-[#7C7C6A]">
            <span>Question {currentQuestionIndex + 1} of {SAMPLE_QUIZ_QUESTIONS.length}</span>
            <span className="font-mono text-[#5A5A40] font-bold">{currentQuestion.pakCodeRef}</span>
          </div>

          {/* User Name Input if First Question */}
          {currentQuestionIndex === 0 && (
            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] space-y-2 text-xs">
              <label className="block text-[#2D2D2D] font-bold">
                Enter Candidate Full Name (for Certification):
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Engr. Muhammad Rizwan"
                className="w-full bg-[#F5F5F0] border border-[#E8E4D9] rounded-xl px-3.5 py-2.5 text-[#2D2D2D] text-xs focus:outline-none focus:border-[#5A5A40]"
              />
            </div>
          )}

          {/* Scenario Question */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-medium font-serif text-[#2D2D2D] leading-relaxed">
              {currentQuestion.scenario}
            </h2>

            {/* Options */}
            <div className="space-y-3 text-xs">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                        : 'bg-white hover:bg-[#E8E4D9]/40 border-[#E8E4D9] text-[#2D2D2D]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#A67C52] text-white' : 'bg-[#F5F5F0] text-[#7C7C6A]'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="pt-4 border-t border-[#E8E4D9] flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6 py-3 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold text-xs uppercase tracking-widest shadow transition disabled:opacity-50"
            >
              {currentQuestionIndex < SAMPLE_QUIZ_QUESTIONS.length - 1 ? 'Next Question →' : 'Submit Exam'}
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-[#F5F5F0] border border-[#E8E4D9] rounded-[28px] p-6 sm:p-8 text-[#2D2D2D] space-y-6 shadow-sm">
          <div className="text-center space-y-2">
            {result?.passed ? (
              <div className="inline-flex p-3 rounded-full bg-[#5A5A40]/15 text-[#5A5A40] mb-2">
                <Award className="w-10 h-10" />
              </div>
            ) : (
              <div className="inline-flex p-3 rounded-full bg-red-500/15 text-red-600 mb-2">
                <XCircle className="w-10 h-10" />
              </div>
            )}

            <h2 className="text-2xl font-medium font-serif text-[#2D2D2D]">
              {result?.passed ? 'Congratulations! Exam Passed' : 'Exam Score Below Passing Threshold'}
            </h2>
            <p className="text-sm text-[#7C7C6A]">
              Score: <strong className="text-[#2D2D2D]">{result?.score} / {result?.totalQuestions}</strong> ({result?.percentage}%)
            </p>
          </div>

          {/* Certificate Display if Passed */}
          {result?.passed && (
            <div className="p-8 rounded-[28px] bg-white border-2 border-[#5A5A40] text-center space-y-6 shadow-sm relative overflow-hidden print:border-slate-300">
              <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#5A5A40]" />
                  <span className="font-serif text-lg text-[#5A5A40]">PakHSE National Safety Council</span>
                </div>
                <span className="text-xs font-mono text-[#A67C52] font-bold">ID: {result.certificateId}</span>
              </div>

              <div className="space-y-2 py-4">
                <span className="text-xs text-[#7C7C6A] uppercase tracking-widest block">This Digital Safety Certificate is awarded to</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2D2D2D] underline decoration-[#A67C52]">
                  {userName.trim() || 'Engr. Candidate'}
                </h3>
                <p className="text-xs text-[#5A5A40] pt-2 max-w-lg mx-auto">
                  For successfully demonstrating competency in Pakistani Construction Health, Safety & Environmental Laws (POSHA 2019, Sindh OSH, PEC Codes & PEPA 1997).
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#E8E4D9] pt-4 text-[11px] text-[#7C7C6A]">
                <div>Issue Date: <strong className="text-[#2D2D2D] block">{result.completionDate}</strong></div>
                <div>Authorized By: <strong className="text-[#5A5A40] block">PakHSE AI Exam Engine</strong></div>
              </div>

              <div className="pt-2 print:hidden">
                <button
                  onClick={handlePrintCertificate}
                  className="px-6 py-3 rounded-full bg-[#5A5A40] hover:bg-[#4a4a34] text-white font-bold text-xs uppercase tracking-widest shadow inline-flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#A67C52]" />
                  <span>Print Certificate Badge</span>
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#E8E4D9]/40 text-[#2D2D2D] font-bold text-xs border border-[#E8E4D9] inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-[#5A5A40]" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

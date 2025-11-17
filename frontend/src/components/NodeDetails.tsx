import { useState } from 'react';
import type { TopicNode } from '../types';
import { FileText, CreditCard, ClipboardList, Headphones, ChevronLeft, ChevronRight, ArrowRight, Download } from 'lucide-react';

interface NodeDetailsProps {
  node: TopicNode;
  onTakeFinalExam: () => void;
}

export const NodeDetails = ({ node, onTakeFinalExam }: NodeDetailsProps) => {
  const [activeTab, setActiveTab] = useState<'cheatsheet' | 'flashcards' | 'practice' | 'audio'>('cheatsheet');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showFlashcardBack, setShowFlashcardBack] = useState(false);

  const tabs = [
    { id: 'cheatsheet' as const, label: 'Cheat Sheet', icon: FileText },
    { id: 'flashcards' as const, label: 'Flashcards', icon: CreditCard },
    { id: 'practice' as const, label: 'Practice', icon: ClipboardList },
    { id: 'audio' as const, label: 'Audio', icon: Headphones },
  ];

  const nextFlashcard = () => {
    setShowFlashcardBack(false);
    setCurrentFlashcardIndex((prev) => (prev + 1) % node.resources.flashcards.length);
  };

  const prevFlashcard = () => {
    setShowFlashcardBack(false);
    setCurrentFlashcardIndex((prev) =>
      prev === 0 ? node.resources.flashcards.length - 1 : prev - 1
    );
  };

  return (
    <div className="glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">{node.title}</h2>
        <p className="text-slate-300 text-sm">{node.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-2 bg-slate-900/30 border-b border-white/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Cheat Sheet Tab */}
        {activeTab === 'cheatsheet' && (
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold text-white mb-4">{node.resources.cheatSheet.title}</h3>
            <div className="space-y-2">
              {node.resources.cheatSheet.formulas.map((item, idx) => (
                <div
                  key={idx}
                  className="glass rounded-lg p-4 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-200 card-hover"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <code className="text-primary-300 font-mono text-sm block mb-1">
                        {item.formula}
                      </code>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flashcards Tab */}
        {activeTab === 'flashcards' && (
          <div className="animate-fade-in">
            <div
              onClick={() => setShowFlashcardBack(!showFlashcardBack)}
              className="min-h-[300px] glass rounded-2xl p-8 border-2 border-primary-500/30 cursor-pointer transition-all duration-300 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/20 flex items-center justify-center"
            >
              <div className="text-center">
                <p className="text-lg text-white font-medium">
                  {showFlashcardBack
                    ? node.resources.flashcards[currentFlashcardIndex].back
                    : node.resources.flashcards[currentFlashcardIndex].front}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={prevFlashcard}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-slate-400">
                  Card {currentFlashcardIndex + 1} of {node.resources.flashcards.length}
                </p>
                <p className="text-xs text-slate-500 mt-1">Click card to flip</p>
              </div>

              <button
                onClick={nextFlashcard}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white transition-all duration-200 hover:scale-105"
              >
                <span className="text-sm">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Practice Exams Tab */}
        {activeTab === 'practice' && (
          <div className="animate-fade-in space-y-4">
            {node.resources.practiceExams.map((exam) => (
              <div
                key={exam.id}
                className="glass rounded-xl p-6 border border-accent-500/20 hover:border-accent-500/40 transition-all duration-200 card-hover"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{exam.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{exam.questions.length} questions</p>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-200 hover:scale-105">
                    <span className="text-sm font-medium">Start Practice</span>
                  </button>
                  {exam.downloadUrl && (
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition-all duration-200 hover:scale-105">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download PDF</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Audio Summary Tab */}
        {activeTab === 'audio' && (
          <div className="animate-fade-in">
            <div className="glass rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-white mb-2">{node.resources.audioSummary.title}</h3>
              <p className="text-slate-400 text-sm mb-4">Duration: {node.resources.audioSummary.duration}</p>
              <audio controls className="w-full">
                <source src={node.resources.audioSummary.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-xs text-slate-500 mt-3">
                Note: Audio files are placeholder URLs. Add actual audio files to make them functional.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Final Exam CTA */}
      <div className="p-6 bg-gradient-to-r from-primary-900/20 to-accent-900/20 border-t border-white/10">
        <button
          onClick={onTakeFinalExam}
          className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50"
        >
          <span>Take Final Exam</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center text-xs text-slate-400 mt-3">
          Score &gt;50% to unlock the next topic
        </p>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { MindMap } from './components/MindMap';
import { NodeDetails } from './components/NodeDetails';
import { FinalExam } from './components/FinalExam';
import { topicNodes } from './data/topicNodes';
import type { UserProgress } from './types';
import { RotateCcw, TrendingUp, Award, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('userProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        completedNodes: new Set(parsed.completedNodes),
        examScores: parsed.examScores,
        currentNode: parsed.currentNode,
      };
    }
    return {
      completedNodes: new Set<string>(),
      examScores: {},
      currentNode: null,
    };
  });

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showExam, setShowExam] = useState(false);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'userProgress',
      JSON.stringify({
        completedNodes: Array.from(userProgress.completedNodes),
        examScores: userProgress.examScores,
        currentNode: userProgress.currentNode,
      })
    );
  }, [userProgress]);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setUserProgress({ ...userProgress, currentNode: nodeId });
    setShowExam(false);
  };

  const handleTakeFinalExam = () => {
    setShowExam(true);
  };

  const handleExamComplete = (score: number, passed: boolean) => {
    if (!selectedNodeId) return;

    const newProgress = {
      ...userProgress,
      examScores: {
        ...userProgress.examScores,
        [selectedNodeId]: score,
      },
    };

    if (passed) {
      newProgress.completedNodes = new Set([...userProgress.completedNodes, selectedNodeId]);
    }

    setUserProgress(newProgress);
  };

  const handleExamCancel = () => {
    setShowExam(false);
  };

  const selectedNode = selectedNodeId ? topicNodes.find((n) => n.id === selectedNodeId) : null;

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setUserProgress({
        completedNodes: new Set<string>(),
        examScores: {},
        currentNode: null,
      });
      setSelectedNodeId(null);
      setShowExam(false);
      localStorage.removeItem('userProgress');
    }
  };

  const progressPercentage = Math.round((userProgress.completedNodes.size / topicNodes.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-6 py-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-8 animate-slide-down">
          <div className="glass-dark rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/50">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text mb-1">
                    Adaptive Learning Platform
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Statistics Mastery • Phase 1 Prototype
                  </p>
                </div>
              </div>
              <button
                onClick={resetProgress}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all duration-200 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Reset</span>
              </button>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass rounded-xl p-4 border border-primary-500/30 card-hover">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary-500/20">
                    <TrendingUp className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Overall Progress</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-white">{progressPercentage}%</span>
                      <span className="text-sm text-slate-400">
                        {userProgress.completedNodes.size}/{topicNodes.length}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-accent-500/30 card-hover">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent-500/20">
                    <Award className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Topics Completed</p>
                    <p className="text-2xl font-bold text-white">{userProgress.completedNodes.size}</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-emerald-500/30 card-hover">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Average Score</p>
                    <p className="text-2xl font-bold text-white">
                      {Object.keys(userProgress.examScores).length > 0
                        ? Math.round(
                            Object.values(userProgress.examScores).reduce((a, b) => a + b, 0) /
                              Object.keys(userProgress.examScores).length
                          )
                        : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Left Column: Mind Map */}
          <div className="space-y-4">
            <div className="glass-dark rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Learning Path</h2>
              <p className="text-sm text-slate-400 mb-6">
                Click unlocked topics to explore resources and exams
              </p>
              <MindMap
                topicNodes={topicNodes}
                userProgress={userProgress}
                onNodeClick={handleNodeClick}
              />
            </div>

            {/* Legend */}
            <div className="glass-dark rounded-xl p-4 border border-white/10">
              <h3 className="text-sm font-semibold text-white mb-3">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500"></div>
                  <span className="text-slate-300">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-amber-500/20 border border-amber-500"></div>
                  <span className="text-slate-300">Unlocked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-slate-500/20 border border-slate-500"></div>
                  <span className="text-slate-300">Locked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded border-2 border-primary-500"></div>
                  <span className="text-slate-300">Currently Viewing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:sticky lg:top-8 h-fit">
            {selectedNode ? (
              <div className="animate-scale-in">
                {showExam ? (
                  <FinalExam
                    node={selectedNode}
                    onExamComplete={handleExamComplete}
                    onCancel={handleExamCancel}
                  />
                ) : (
                  <NodeDetails node={selectedNode} onTakeFinalExam={handleTakeFinalExam} />
                )}
              </div>
            ) : (
              <div className="glass-dark rounded-2xl p-12 border border-white/10 text-center shadow-2xl">
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 mb-6">
                  <Sparkles className="w-12 h-12 text-primary-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Welcome to Your Learning Journey</h2>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">
                  Select a topic from the learning path to access curated resources, flashcards, and exams
                </p>
                <div className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30">
                  <p className="text-sm text-primary-300 font-medium">
                    Start with <span className="font-bold">Descriptive Statistics</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm animate-fade-in">
          <div className="glass-dark rounded-xl p-4 border border-white/5 inline-block">
            <p>Phase 1 Prototype • Built with React, TypeScript & Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

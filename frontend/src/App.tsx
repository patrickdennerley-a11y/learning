import { useState, useEffect } from 'react';
import { MindMap } from './components/MindMap';
import { NodeDetails } from './components/NodeDetails';
import { FinalExam } from './components/FinalExam';
import { topicNodes } from './data/topicNodes';
import type { UserProgress } from './types';
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

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>
          Personalized Adaptive Learning Platform
        </h1>
        <p style={{ color: '#666', fontSize: '16px', margin: '0 0 15px 0' }}>
          Statistics Learning Path - Phase 1 Prototype
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Progress: {userProgress.completedNodes.size} / {topicNodes.length} topics completed
          </div>
          <button
            onClick={resetProgress}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Reset Progress
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Column: Mind Map */}
        <div>
          <h2 style={{ marginTop: 0 }}>Statistics Learning Map</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            Click on unlocked topics (yellow/green) to view resources and take exams.
            Locked topics (gray) require prerequisites.
          </p>
          <MindMap
            topicNodes={topicNodes}
            userProgress={userProgress}
            onNodeClick={handleNodeClick}
          />
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Legend:</h4>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <div style={{ marginBottom: '5px' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#d4edda', border: '1px solid #28a745', marginRight: '10px', verticalAlign: 'middle' }}></span>
                ✓ Completed (exam passed)
              </div>
              <div style={{ marginBottom: '5px' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', marginRight: '10px', verticalAlign: 'middle' }}></span>
                Unlocked (ready to learn)
              </div>
              <div style={{ marginBottom: '5px' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#e2e3e5', border: '1px solid #6c757d', marginRight: '10px', verticalAlign: 'middle' }}></span>
                Locked (complete prerequisites first)
              </div>
              <div>
                <span style={{ display: 'inline-block', width: '20px', height: '20px', border: '3px solid #007bff', marginRight: '10px', verticalAlign: 'middle' }}></span>
                ▶ Currently viewing
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Resources or Exam */}
        <div>
          {selectedNode ? (
            <>
              {showExam ? (
                <FinalExam
                  node={selectedNode}
                  onExamComplete={handleExamComplete}
                  onCancel={handleExamCancel}
                />
              ) : (
                <NodeDetails
                  node={selectedNode}
                  onTakeFinalExam={handleTakeFinalExam}
                />
              )}
            </>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', border: '2px dashed #ddd', borderRadius: '8px', color: '#999' }}>
              <h2>Welcome!</h2>
              <p>Select a topic from the mind map to get started.</p>
              <p style={{ fontSize: '14px', marginTop: '20px' }}>
                Start with <strong>Descriptive Statistics</strong> - it's unlocked and ready to go!
              </p>
            </div>
          )}
        </div>
      </div>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd', textAlign: 'center', color: '#666', fontSize: '14px' }}>
        <p>
          Phase 1 Prototype - Basic mind map with node unlocking and final exams
        </p>
        <p style={{ fontSize: '12px' }}>
          This is a working prototype. Progress is saved to your browser's local storage.
        </p>
      </footer>
    </div>
  );
}

export default App;

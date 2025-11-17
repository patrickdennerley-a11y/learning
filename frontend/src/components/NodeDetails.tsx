import { useState } from 'react';
import type { TopicNode } from '../types';

interface NodeDetailsProps {
  node: TopicNode;
  onTakeFinalExam: () => void;
}

export const NodeDetails = ({ node, onTakeFinalExam }: NodeDetailsProps) => {
  const [activeTab, setActiveTab] = useState<'cheatsheet' | 'flashcards' | 'practice' | 'audio'>('cheatsheet');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showFlashcardBack, setShowFlashcardBack] = useState(false);

  const tabs = [
    { id: 'cheatsheet' as const, label: 'Cheat Sheet' },
    { id: 'flashcards' as const, label: 'Flashcards' },
    { id: 'practice' as const, label: 'Practice Exams' },
    { id: 'audio' as const, label: 'Audio Summary' },
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
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ marginTop: 0 }}>{node.title}</h2>
      <p style={{ color: '#666' }}>{node.description}</p>

      {/* Tabs */}
      <div style={{ borderBottom: '2px solid #ddd', marginBottom: '20px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: activeTab === tab.id ? '#007bff' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              borderRadius: '4px 4px 0 0',
              marginRight: '5px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cheat Sheet Tab */}
      {activeTab === 'cheatsheet' && (
        <div>
          <h3>{node.resources.cheatSheet.title}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Formula</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {node.resources.cheatSheet.formulas.map((item, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f2f2f2' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace', border: '1px solid #ddd' }}>
                    {item.formula}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Flashcards Tab */}
      {activeTab === 'flashcards' && (
        <div style={{ textAlign: 'center' }}>
          <div
            onClick={() => setShowFlashcardBack(!showFlashcardBack)}
            style={{
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              border: '2px solid #007bff',
              borderRadius: '8px',
              padding: '30px',
              cursor: 'pointer',
              fontSize: '18px',
              marginBottom: '20px',
            }}
          >
            {showFlashcardBack
              ? node.resources.flashcards[currentFlashcardIndex].back
              : node.resources.flashcards[currentFlashcardIndex].front}
          </div>
          <div style={{ marginBottom: '10px', color: '#666' }}>
            Card {currentFlashcardIndex + 1} of {node.resources.flashcards.length}
            {' | '}
            Click card to flip
          </div>
          <button onClick={prevFlashcard} style={{ margin: '0 10px', padding: '8px 16px' }}>
            ← Previous
          </button>
          <button onClick={nextFlashcard} style={{ margin: '0 10px', padding: '8px 16px' }}>
            Next →
          </button>
        </div>
      )}

      {/* Practice Exams Tab */}
      {activeTab === 'practice' && (
        <div>
          {node.resources.practiceExams.map((exam) => (
            <div key={exam.id} style={{ marginBottom: '20px' }}>
              <h3>{exam.title}</h3>
              <p style={{ color: '#666' }}>{exam.questions.length} questions</p>
              <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Start Practice Exam
              </button>
              {exam.downloadUrl && (
                <button style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Download PDF
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Audio Summary Tab */}
      {activeTab === 'audio' && (
        <div>
          <h3>{node.resources.audioSummary.title}</h3>
          <p style={{ color: '#666' }}>Duration: {node.resources.audioSummary.duration}</p>
          <audio controls style={{ width: '100%' }}>
            <source src={node.resources.audioSummary.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
            Note: Audio files are placeholder URLs. Add actual audio files to make them functional.
          </p>
        </div>
      )}

      {/* Final Exam Button */}
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #ddd' }}>
        <button
          onClick={onTakeFinalExam}
          style={{
            padding: '15px 30px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Take Final Exam →
        </button>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          You need to score &gt;50% to unlock the next topic
        </p>
      </div>
    </div>
  );
};

import { useState } from 'react';
import type { TopicNode } from '../types';

interface FinalExamProps {
  node: TopicNode;
  onExamComplete: (score: number, passed: boolean) => void;
  onCancel: () => void;
}

export const FinalExam = ({ node, onExamComplete, onCancel }: FinalExamProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const exam = node.finalExam;
  const currentQuestion = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0;
    exam.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercentage = (correctCount / totalQuestions) * 100;
    const passed = scorePercentage > exam.passingScore;

    setScore(scorePercentage);
    setShowResults(true);

    // Notify parent component
    onExamComplete(scorePercentage, passed);
  };

  const allQuestionsAnswered = exam.questions.every(q => selectedAnswers[q.id] !== undefined);

  if (showResults) {
    const passed = score > exam.passingScore;
    return (
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2>Exam Results</h2>
        <div
          style={{
            padding: '30px',
            backgroundColor: passed ? '#d4edda' : '#f8d7da',
            border: `2px solid ${passed ? '#28a745' : '#dc3545'}`,
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <h1 style={{ margin: '0 0 10px 0', color: passed ? '#155724' : '#721c24' }}>
            {passed ? '✓ Passed!' : '✗ Failed'}
          </h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>
            Score: {score.toFixed(1)}%
          </p>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Passing Score: &gt;{exam.passingScore}%
          </p>
          <p style={{ fontSize: '14px', marginTop: '15px' }}>
            Correct Answers: {Math.round((score / 100) * totalQuestions)} / {totalQuestions}
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Question Review:</h3>
          {exam.questions.map((question, idx) => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <div
                key={question.id}
                style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  border: `2px solid ${isCorrect ? '#28a745' : '#dc3545'}`,
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
              >
                <p style={{ fontWeight: 'bold' }}>
                  Question {idx + 1}: {question.question}
                </p>
                <p style={{ color: isCorrect ? '#28a745' : '#dc3545' }}>
                  Your answer: {question.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                </p>
                {!isCorrect && (
                  <p style={{ color: '#28a745' }}>
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {passed ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', color: '#28a745', marginBottom: '15px' }}>
              Congratulations! You've unlocked the next topic.
            </p>
            <button
              onClick={onCancel}
              style={{
                padding: '15px 30px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Continue Learning
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', color: '#721c24', marginBottom: '15px' }}>
              Review the material and try again to unlock the next topic.
            </p>
            <button
              onClick={onCancel}
              style={{
                padding: '15px 30px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Back to Resources
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Final Exam: {node.title}</h2>
        <button
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Question {currentQuestionIndex + 1} of {totalQuestions} | Score &gt;50% to pass
        </p>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>{currentQuestion.question}</h3>
        <div>
          {currentQuestion.options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleAnswerSelect(idx)}
              style={{
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: selectedAnswers[currentQuestion.id] === idx ? '#007bff' : '#f8f9fa',
                color: selectedAnswers[currentQuestion.id] === idx ? 'white' : '#333',
                border: '2px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: selectedAnswers[currentQuestion.id] === idx ? 'bold' : 'normal',
              }}
            >
              {String.fromCharCode(65 + idx)}. {option}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: currentQuestionIndex === 0 ? '#e2e3e5' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Previous
        </button>

        <div style={{ fontSize: '14px', color: '#666' }}>
          Answered: {Object.keys(selectedAnswers).length} / {totalQuestions}
        </div>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            style={{
              padding: '10px 20px',
              backgroundColor: allQuestionsAnswered ? '#28a745' : '#e2e3e5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: allQuestionsAnswered ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
            }}
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
};

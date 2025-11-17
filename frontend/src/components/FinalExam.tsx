import { useState } from 'react';
import type { TopicNode } from '../types';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, X, Trophy, TrendingDown } from 'lucide-react';

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
  const passed = score > exam.passingScore;

  if (showResults) {
    return (
      <div className="glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in">
        {/* Results Header */}
        <div className={`p-8 bg-gradient-to-r ${passed ? 'from-emerald-500/20 to-emerald-600/20' : 'from-red-500/20 to-red-600/20'} border-b border-white/10`}>
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 mb-4">
              {passed ? (
                <Trophy className="w-16 h-16 text-emerald-400" />
              ) : (
                <TrendingDown className="w-16 h-16 text-red-400" />
              )}
            </div>
            <h2 className={`text-4xl font-bold mb-2 ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
              {passed ? 'Congratulations!' : 'Keep Practicing'}
            </h2>
            <p className="text-white text-xl font-semibold mb-2">
              {score.toFixed(1)}%
            </p>
            <p className="text-slate-300 text-sm">
              You answered {Math.round((score / 100) * totalQuestions)} out of {totalQuestions} questions correctly
            </p>
          </div>
        </div>

        {/* Question Review */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Review Your Answers</h3>
          <div className="space-y-3">
            {exam.questions.map((question, idx) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <div
                  key={question.id}
                  className={`glass rounded-xl p-4 border-2 ${
                    isCorrect ? 'border-emerald-500/30' : 'border-red-500/30'
                  } transition-all duration-200`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-2">
                        Question {idx + 1}: {question.question}
                      </p>
                      <p className={`text-sm mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-emerald-400">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 bg-gradient-to-r from-primary-900/20 to-accent-900/20 border-t border-white/10">
          {passed ? (
            <div className="space-y-3">
              <div className="glass rounded-lg p-4 border border-emerald-500/30 text-center">
                <p className="text-emerald-400 font-medium mb-1">Next topic unlocked!</p>
                <p className="text-slate-400 text-sm">You can now continue your learning journey</p>
              </div>
              <button
                onClick={onCancel}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
              >
                Continue Learning
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="glass rounded-lg p-4 border border-red-500/30 text-center">
                <p className="text-red-400 font-medium mb-1">Review and try again</p>
                <p className="text-slate-400 text-sm">Study the materials and retake the exam to unlock the next topic</p>
              </div>
              <button
                onClick={onCancel}
                className="w-full px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02]"
              >
                Back to Resources
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in">
      {/* Exam Header */}
      <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Final Exam</h2>
            <p className="text-slate-300 text-sm">{node.title}</p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-6">
        <div className="glass rounded-lg p-4 border border-primary-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-slate-400">
              Answered: {Object.keys(selectedAnswers).length}/{totalQuestions}
            </span>
          </div>
          <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <div className="glass rounded-xl p-6 border border-white/5 mb-6">
          <h3 className="text-lg font-semibold text-white mb-6">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion.id] === idx
                    ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 border-primary-500 shadow-lg shadow-primary-500/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion.id] === idx
                        ? 'border-primary-400 bg-primary-500'
                        : 'border-slate-500'
                    }`}
                  >
                    {selectedAnswers[currentQuestion.id] === idx && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${
                    selectedAnswers[currentQuestion.id] === idx ? 'text-white' : 'text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}. {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Previous</span>
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white transition-all duration-200 hover:scale-105 shadow-lg shadow-primary-500/20"
            >
              <span className="text-sm">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-emerald-500/20"
            >
              <span className="text-sm">Submit Exam</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

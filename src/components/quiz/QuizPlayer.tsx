'use client';

import React, { useState, useEffect } from 'react';
import { Quiz, Question, QuizAttempt } from '@/types';
import { dataStore } from '@/lib/store';
import { Clock, CheckCircle2, XCircle, Award, RotateCcw, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

interface QuizPlayerProps {
  quiz: Quiz;
  onFinish?: (attempt: QuizAttempt) => void;
}

export default function QuizPlayer({ quiz, onFinish }: QuizPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.time_limit_minutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; attempt: QuizAttempt } | null>(null);

  // Timer Countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQuestion = quiz.questions[currentIdx];

  const selectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optIdx
    }));
  };

  const handleSubmitQuiz = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    const evaluation = dataStore.submitQuizAttempt(quiz.id, selectedAnswers);
    setResult(evaluation);
    if (evaluation.passed) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
    if (onFinish) {
      onFinish(evaluation.attempt);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setResult(null);
    setCurrentIdx(0);
    setTimeLeft(quiz.time_limit_minutes * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-[#0E1524] border border-white/10 rounded-2xl p-6 shadow-2xl max-w-3xl mx-auto space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 block mb-1">اختبار الدورة التقييمي</span>
          <h2 className="text-lg font-bold text-white">{quiz.title}</h2>
          <p className="text-xs text-gray-400 mt-1">{quiz.description}</p>
        </div>

        <div className="flex items-center gap-3">
          {!isSubmitted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
          <span className="text-xs px-3 py-1.5 rounded-xl bg-white/5 text-gray-300 font-semibold">
            درجة النجاح: {quiz.pass_score}%
          </span>
        </div>
      </div>

      {/* When Submitted: Result Overview Banner */}
      {isSubmitted && result && (
        <div
          className={`p-6 rounded-2xl border text-center space-y-3 ${
            result.passed
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 shadow-glowGreen'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-white/10 text-3xl">
            {result.passed ? '🏆' : '⚠️'}
          </div>
          <h3 className="text-xl font-bold text-white">
            {result.passed ? 'مبارك! لقد اجتزت الاختبار بنجاح' : 'لم تجتز درجة النجاح المطلوبة'}
          </h3>
          <p className="text-sm font-semibold">
            نتيجتك: <span className="font-mono text-lg font-bold">{result.score}%</span> (الحد الأدنى: {quiz.pass_score}%)
          </p>

          {result.passed ? (
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs text-emerald-300 block">
                تم إصدار شهادة إتمام رسمية لك! يمكنك استعراضها وتحميلها من صفحة الشهادات.
              </span>
              <Link
                href="/verify"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                التحقق من الشهادات
              </Link>
            </div>
          ) : (
            <div className="pt-2">
              <button
                onClick={handleRetake}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                إعادة المحاولة
              </button>
            </div>
          )}
        </div>
      )}

      {/* Progress Dots */}
      <div className="flex items-center justify-between gap-1">
        {quiz.questions.map((q, i) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isCurrent = i === currentIdx;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(i)}
              className={`flex-1 h-2 rounded-full transition-all ${
                isCurrent
                  ? 'bg-cyan-400 shadow-glow'
                  : isAnswered
                  ? 'bg-cyan-600/60'
                  : 'bg-white/10'
              }`}
            />
          );
        })}
      </div>

      {/* Active Question Box */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>السؤال {currentIdx + 1} من {quiz.questions.length}</span>
          <span>{currentQuestion.question_type === 'true_false' ? 'صح أو خطأ' : 'اختيار من متعدد'}</span>
        </div>

        <h3 className="text-base font-bold text-white leading-relaxed">
          {currentQuestion.question_text}
        </h3>

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
            const isCorrect = isSubmitted && optIdx === currentQuestion.correct_answer_index;
            const isWrongSelected = isSubmitted && isSelected && !isCorrect;

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => selectOption(optIdx)}
                disabled={isSubmitted}
                className={`w-full p-4 rounded-xl text-right transition-all flex items-center justify-between border ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : isWrongSelected
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-glow'
                    : 'bg-[#070B12] border-white/10 text-gray-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500 text-black font-bold'
                        : 'border-gray-600 text-gray-400'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="text-sm font-medium">{option}</span>
                </div>

                {isSubmitted && (
                  <div>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {isWrongSelected && <XCircle className="w-5 h-5 text-rose-400" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation when submitted */}
        {isSubmitted && (
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-cyan-300">
              <HelpCircle className="w-4 h-4" />
              تفسير الإجابة:
            </span>
            <p className="leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation & Submit Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          السابق
        </button>

        {!isSubmitted ? (
          currentIdx < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(prev => Math.min(quiz.questions.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold shadow-glow transition-all flex items-center gap-2"
            >
              التالي
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shadow-glowGreen transition-all flex items-center gap-2"
            >
              إنهاء وتسليم الاختبار
            </button>
          )
        ) : (
          <button
            onClick={() => setCurrentIdx(prev => Math.min(quiz.questions.length - 1, prev + 1))}
            disabled={currentIdx === quiz.questions.length - 1}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-2"
          >
            السؤال التالي
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

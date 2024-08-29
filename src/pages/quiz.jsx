import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import quizData from '@/data/quizQuestions.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const questions = quizData.questions;

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  const handleAnswer = (selectedLabel) => {
    setSelectedAnswer(selectedLabel);
    if (questions[currentQuestion].correct_answer.includes(selectedLabel)) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-indigo-700">Ruby知識クイズ</CardTitle>
          <CardDescription className="text-lg text-gray-600">テストであなたのRuby知識を確認しましょう！</CardDescription>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <>
              <Progress value={(currentQuestion / questions.length) * 100} className="mb-6" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">{questions[currentQuestion].content}</h2>
                  {questions[currentQuestion].code && (
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4 mb-4">
                      <pre className="bg-gray-800 text-white p-4 rounded-md">
                        <code>{questions[currentQuestion].code}</code>
                      </pre>
                    </ScrollArea>
                  )}
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option) => (
                      <Button
                        key={option.label}
                        onClick={() => handleAnswer(option.label)}
                        className={`
                          w-full text-left justify-start text-base
                          transition-all duration-200 ease-in-out
                          hover:scale-[1.02] hover:shadow-md
                          ${
                            selectedAnswer === option.label
                              ? questions[currentQuestion].correct_answer.includes(option.label)
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-red-500 hover:bg-red-600 text-white'
                              : 'bg-white hover:bg-indigo-50 text-gray-800 hover:text-indigo-700'
                          }
                        `}
                        variant="outline"
                        disabled={selectedAnswer !== null}
                      >
                        <div className="flex items-start">
                          <span className="font-semibold mr-2 mt-0.5">{option.label}.</span>
                          <span className="whitespace-normal">{option.content}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 flex justify-between items-center">
                <Badge variant="outline" className="text-sm">
                  質問 {currentQuestion + 1} / {questions.length}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  スコア: {score}
                </Badge>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-4 text-indigo-700">クイズ終了！</h2>
              <p className="text-2xl mb-4 text-gray-700">あなたのスコア: <span className="font-bold text-indigo-600">{score} / {questions.length}</span></p>
              <Separator className="my-6" />
              <Button 
                onClick={restartQuiz} 
                size="lg" 
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 ease-in-out hover:scale-105"
              >
                もう一度挑戦する
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;

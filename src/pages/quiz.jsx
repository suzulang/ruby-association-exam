import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import quizData from '@/data/quizQuestions.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const questions = quizData.questions;

  const handleAnswer = (selectedLabel) => {
    if (questions[currentQuestion].correct_answer.includes(selectedLabel)) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Ruby知識クイズ</CardTitle>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <>
              <Progress value={(currentQuestion / questions.length) * 100} className="mb-4" />
              <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].content}</h2>
              {questions[currentQuestion].code && (
                <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
                  <code>{questions[currentQuestion].code}</code>
                </pre>
              )}
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option.label}
                    onClick={() => handleAnswer(option.label)}
                    className="w-full text-left justify-start"
                    variant="outline"
                  >
                    {option.label}. {option.content}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">测验结束！</h2>
              <p className="text-xl mb-4">你的得分是: {score} / {questions.length}</p>
              <Button onClick={restartQuiz}>重新开始</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;

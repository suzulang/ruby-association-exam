import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import quizQuestions from '@/data/quizQuestions.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedIndex) => {
    if (quizQuestions[currentQuestion].correctAnswer === selectedIndex) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">知识问答挑战</CardTitle>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <>
              <Progress value={(currentQuestion / quizQuestions.length) * 100} className="mb-4" />
              <h2 className="text-xl font-semibold mb-4">{quizQuestions[currentQuestion].question}</h2>
              <div className="space-y-2">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left justify-start"
                    variant="outline"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">测验结束！</h2>
              <p className="text-xl mb-4">你的得分是: {score} / {quizQuestions.length}</p>
              <Button onClick={restartQuiz}>重新开始</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;

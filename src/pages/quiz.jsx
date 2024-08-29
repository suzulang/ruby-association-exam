import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useNavigate } from 'react-router-dom';
import silverQuizData from '@/data/ruby_silver.json';
import goldQuizData from '@/data/ruby_gold.json';
import '@/styles/FlowerEffect.css';
import NavigationBreadcrumb from '@/components/NavigationBreadcrumb';

const Quiz = () => {
  const { quizType } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);

  const quizData = quizType === 'gold' ? goldQuizData : silverQuizData;
  const questions = quizData.questions;

  useEffect(() => {
    if (quizType !== 'gold' && quizType !== 'silver') {
      navigate('/quiz-selection');
    }
  }, [quizType, navigate]);

  useEffect(() => {
    setSelectedAnswers([]);
    setIsMultipleChoice(questions[currentQuestion].correct_answer.includes(','));
  }, [currentQuestion, questions]);

  const handleAnswerSelection = (selectedLabel) => {
    setSelectedAnswers(prev => {
      if (isMultipleChoice) {
        if (prev.includes(selectedLabel)) {
          return prev.filter(label => label !== selectedLabel);
        } else {
          return [...prev, selectedLabel];
        }
      } else {
        return [selectedLabel];
      }
    });
  };

  const triggerFlowerEffect = () => {
    setShowFlowers(true);
    setTimeout(() => setShowFlowers(false), 3000);
  };

  const submitAnswer = () => {
    setIsAnswerSubmitted(true);
    const currentQuestionAnswers = questions[currentQuestion].correct_answer.split(', ');
    const isCorrect = currentQuestionAnswers.length === selectedAnswers.length &&
      currentQuestionAnswers.every(answer => selectedAnswers.includes(answer));

    if (isCorrect) {
      setScore(score + 1);
      triggerFlowerEffect();
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswers([]);
        setIsAnswerSubmitted(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswers([]);
    setIsAnswerSubmitted(false);
  };

  const goToQuizSelection = () => {
    navigate('/quiz-selection');
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-100">
      <NavigationBreadcrumb
        items={[
          { label: 'ホーム', link: '/' },
          { label: 'クイズ選択', link: '/quiz-selection' },
          { label: `Ruby ${quizType === 'gold' ? 'Gold' : 'Silver'} クイズ` },
        ]}
      />
      <div className="flex-grow flex items-center justify-center">
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
                          onClick={() => handleAnswerSelection(option.label)}
                          className={`
                            w-full text-left justify-start text-base
                            transition-all duration-200 ease-in-out
                            hover:scale-[1.02] hover:shadow-md
                            ${
                              isAnswerSubmitted
                                ? questions[currentQuestion].correct_answer.includes(option.label)
                                  ? 'bg-green-500 hover:bg-green-600 text-white'
                                  : selectedAnswers.includes(option.label)
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-white hover:bg-indigo-50 text-gray-800 hover:text-indigo-700'
                                : selectedAnswers.includes(option.label)
                                  ? 'bg-indigo-200 hover:bg-indigo-300 text-indigo-800'
                                  : 'bg-white hover:bg-indigo-50 text-gray-800 hover:text-indigo-700'
                            }
                          `}
                          variant="outline"
                          disabled={isAnswerSubmitted}
                        >
                          <div className="flex items-start">
                            <span className="font-semibold mr-2 mt-0.5">{option.label}.</span>
                            <span className="whitespace-normal">{option.content}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button 
                        onClick={submitAnswer} 
                        className={`
                          ${selectedAnswers.length === 0 || isAnswerSubmitted
                            ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
                            : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
                          }
                          text-white
                        `}
                        disabled={selectedAnswers.length === 0 || isAnswerSubmitted}
                      >
                        回答を送信
                      </Button>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <Badge variant="outline" className="text-sm">
                        質問 {currentQuestion + 1} / {questions.length}
                      </Badge>
                      <Badge variant="secondary" className="text-sm">
                        スコア: {score}
                      </Badge>
                    </div>
                  </motion.div>
                </AnimatePresence>
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
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={restartQuiz} 
                    size="lg" 
                    className="mt-4 text-white transition-all duration-200 ease-in-out hover:scale-105 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                  >
                    もう一度挑戦する
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
      {showFlowers && <FlowerEffect />}
    </div>
  );
};

const FlowerEffect = () => {
  useEffect(() => {
    const createFlower = () => {
      const flower = document.createElement('div');
      flower.classList.add('flower');
      flower.style.left = Math.random() * window.innerWidth + 'px';
      flower.style.animationDuration = Math.random() * 2 + 3 + 's';
      flower.style.opacity = Math.random();
      flower.innerText = '🌸';
      document.body.appendChild(flower);

      setTimeout(() => {
        document.body.removeChild(flower);
      }, 5000);
    };

    const flowerInterval = setInterval(createFlower, 100);
    return () => clearInterval(flowerInterval);
  }, []);

  return null;
};

export default Quiz;

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const fetchQuizData = async () => {
  // 这里应该是从microCMS获取数据的实际API调用
  // 为了演示，我们使用一个模拟的数据
  return [
    { id: 1, question: "什么是React的主要优势？", options: ["虚拟DOM", "双向数据绑定", "服务器端渲染", "以上都是"], correctAnswer: 0 },
    { id: 2, question: "Next.js的主要特性是什么？", options: ["服务器端渲染", "静态站点生成", "文件系统路由", "以上都是"], correctAnswer: 3 },
    { id: 3, question: "Tailwind CSS是什么类型的CSS框架？", options: ["预处理器", "后处理器", "实用优先", "组件库"], correctAnswer: 2 },
  ];
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const { data: quizData, isLoading, error } = useQuery({
    queryKey: ['quizData'],
    queryFn: fetchQuizData,
  });

  const handleAnswer = (selectedIndex) => {
    if (quizData[currentQuestion].correctAnswer === selectedIndex) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
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

  if (isLoading) return <div className="flex justify-center items-center h-screen">加载中...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">发生错误: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">知识问答挑战</CardTitle>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <>
              <Progress value={(currentQuestion / quizData.length) * 100} className="mb-4" />
              <h2 className="text-xl font-semibold mb-4">{quizData[currentQuestion].question}</h2>
              <div className="space-y-2">
                {quizData[currentQuestion].options.map((option, index) => (
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
              <p className="text-xl mb-4">你的得分是: {score} / {quizData.length}</p>
              <Button onClick={restartQuiz}>重新开始</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
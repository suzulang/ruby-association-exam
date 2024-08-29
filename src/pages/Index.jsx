import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-indigo-700">Ruby Association Exam</CardTitle>
          <CardDescription className="text-xl text-gray-600 mt-2">
            Ruby知識の冒険へようこそ！
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-lg text-gray-700 mb-6">
            あなたのRuby知識をテストする準備はできていますか？
          </p>
          <Link to="/quiz-selection">
            <Button className="text-lg px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200">
              クイズを始める
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;

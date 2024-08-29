import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const QuizSelection = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-indigo-700">Ruby知識クイズ選択</CardTitle>
          <CardDescription className="text-lg text-gray-600">挑戦したいクイズを選んでください！</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link to="/quiz/silver" className="w-full">
            <Button className="w-full text-lg py-6 bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 transition-all duration-200">
              Ruby Silver
            </Button>
          </Link>
          <Link to="/quiz/gold" className="w-full">
            <Button className="w-full text-lg py-6 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 transition-all duration-200">
              Ruby Gold
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSelection;
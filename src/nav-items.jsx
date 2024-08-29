import { HomeIcon, BrainCircuitIcon, ListIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Quiz from "./pages/quiz.jsx";
import QuizSelection from "./pages/QuizSelection.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Quiz Selection",
    to: "/quiz-selection",
    icon: <ListIcon className="h-4 w-4" />,
    page: <QuizSelection />,
  },
  {
    title: "Quiz",
    to: "/quiz/:quizType",
    icon: <BrainCircuitIcon className="h-4 w-4" />,
    page: <Quiz />,
  },
];

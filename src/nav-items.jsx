import { HomeIcon, BrainCircuitIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Quiz from "./pages/quiz.jsx";

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
    title: "Quiz",
    to: "/quiz",
    icon: <BrainCircuitIcon className="h-4 w-4" />,
    page: <Quiz />,
  },
];

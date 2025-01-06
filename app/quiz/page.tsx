"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizLayout } from "@/components/quiz/quiz-layout";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import type { QuizQuestion as QuizQuestionType, UserSelections } from "@/lib/types/quiz";
import { setCookie, getCookie } from "@/lib/utils/cookies";

const questions: QuizQuestionType[] = [
  {
    id: "Goal",
    title: "What's most important for you right now?",
    description: "Choose your main goal. We'll provide you with recommendations.",
    options: [
      "Increase productivity",
      "Reduce stress",
      "Sleep better",
      "Build self-esteem",
      "Increase happiness",
    ],
  },
  {
    id: "Skill",
    title: "What skill would you like to develop?",
    description: "We will tailor your plan accordingly.",
    options: [
      "Ability to focus",
      "Quick problem-solving",
      "Creativity and intuition",
    ],
  },
  {
    id: "Area",
    title: "What area needs special attention?",
    description: "Different tools are suitable for different circumstances.",
    options: [
      "Work",
      "School",
      "Sport",
      "Relationships",
      "Other",
    ],
  },
  {
    id: "WeeklySkill",
    title: "Which skill would help you next week?",
    description: "We'll start here!",
    options: [
      "Prioritizing",
      "Reducing distraction",
      "Procrastinating less",
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userSelections, setUserSelections] = useState<Partial<UserSelections>>({});

  useEffect(() => {
    const savedSelections = getCookie('userQuizSelections');
    if (savedSelections) {
      setUserSelections(savedSelections);
      const answeredQuestions = Object.keys(savedSelections).length;
      if (answeredQuestions < questions.length) {
        setCurrentQuestion(answeredQuestions);
      }
    }
  }, []);

  const handleSelect = (answer: string) => {
    const question = questions[currentQuestion];
    const newSelections = {
      ...userSelections,
      [question.id]: answer
    };
    
    setUserSelections(newSelections);
    setCookie('userQuizSelections', newSelections);

    if (currentQuestion === questions.length - 1) {
      router.push("/quiz/results");
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      router.push("/");
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <QuizLayout>
      <QuizQuestion
        title={currentQuestionData.title}
        description={currentQuestionData.description}
        options={currentQuestionData.options}
        onSelect={handleSelect}
        onBack={handleBack}
        currentStep={currentQuestion + 1}
        totalSteps={questions.length}
        selectedOption={userSelections[currentQuestionData.id]}
      />
    </QuizLayout>
  );
}
export interface UserSelections {
  Goal: string;
  Skill: string;
  Area: string;
  WeeklySkill: string;
}

export interface QuizQuestion {
  id: keyof UserSelections;
  title: string;
  description: string;
  options: string[];
}
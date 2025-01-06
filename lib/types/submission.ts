export interface AppSubmission {
  id: string;
  created_at: string;
  goal: string;
  challenges: string;
  tone: string;
  user_id: string;
  audio_url?: string;
}
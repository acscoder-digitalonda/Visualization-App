import { supabase } from '../supabase/client';
import type { Visualization } from '../types/visualization';

export async function getUserVisualizations(userId: string): Promise<Visualization[]> {
  const { data, error } = await supabase
    .from('AppSubmissions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function createVisualization(visualization: {
  user_id: string;
  goal: string;
  challenges: string;
  tone: string;
}) {
  const { data, error } = await supabase
    .from('AppSubmissions')
    .insert([{
      user_id: visualization.user_id,
      client_goal: visualization.goal,
      client_challenges: visualization.challenges,
      tone: visualization.tone
    }])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
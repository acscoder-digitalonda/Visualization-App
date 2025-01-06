/*
  # Create AppSubmission table

  1. New Tables
    - `AppSubmission`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `user_id` (uuid, references auth.users)
      - `goal` (text)
      - `challenges` (text)
      - `tone` (text)
      - `audio_url` (text, nullable)

  2. Security
    - Enable RLS
    - Add policies for users to:
      - Read their own submissions
*/

CREATE TABLE IF NOT EXISTS AppSubmissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL,
  goal text NOT NULL,
  challenges text NOT NULL,
  tone text NOT NULL,
  audio_url text,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id)
);

-- Enable Row Level Security
ALTER TABLE AppSubmission ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own submissions
CREATE POLICY "Users can read own submissions"
  ON AppSubmissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own submissions
CREATE POLICY "Users can insert own submissions"
  ON AppSubmissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
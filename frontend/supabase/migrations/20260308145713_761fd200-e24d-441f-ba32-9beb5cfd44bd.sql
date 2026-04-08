
CREATE TABLE public.problems (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  topic TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  examples JSONB NOT NULL DEFAULT '[]',
  constraints TEXT[] NOT NULL DEFAULT '{}',
  acceptance_rate NUMERIC(5,1) NOT NULL DEFAULT 50.0,
  starter_code JSONB NOT NULL DEFAULT '{}',
  neetcode_link TEXT,
  problem_set TEXT NOT NULL DEFAULT 'neetcode_all',
  leetcode_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Public read access (no auth needed for browsing problems)
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Problems are viewable by everyone"
ON public.problems
FOR SELECT
USING (true);

-- Create user_problem_progress table to track solved status
CREATE TABLE public.user_problem_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  problem_id INTEGER REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
  solved BOOLEAN NOT NULL DEFAULT false,
  solved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

ALTER TABLE public.user_problem_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress"
ON public.user_problem_progress
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.user_problem_progress
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_problem_progress
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Index for fast topic filtering
CREATE INDEX idx_problems_topic ON public.problems(topic);
CREATE INDEX idx_problems_difficulty ON public.problems(difficulty);
CREATE INDEX idx_problems_problem_set ON public.problems(problem_set);
CREATE INDEX idx_user_progress_user ON public.user_problem_progress(user_id);

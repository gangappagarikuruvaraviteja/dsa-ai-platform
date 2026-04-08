
-- Table to track which problem is the daily challenge each day
CREATE TABLE public.daily_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_date date NOT NULL UNIQUE DEFAULT CURRENT_DATE,
  problem_id integer NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Table to track which users solved the daily challenge
CREATE TABLE public.daily_challenge_solvers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_date date NOT NULL,
  user_id uuid NOT NULL,
  solved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(challenge_date, user_id)
);

-- RLS for daily_challenges: everyone can read
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily challenges viewable by everyone" ON public.daily_challenges FOR SELECT USING (true);

-- RLS for daily_challenge_solvers: everyone can read, users can insert their own
ALTER TABLE public.daily_challenge_solvers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily challenge solvers viewable by everyone" ON public.daily_challenge_solvers FOR SELECT USING (true);
CREATE POLICY "Users can insert own daily solve" ON public.daily_challenge_solvers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to get or create today's daily challenge (picks random problem)
CREATE OR REPLACE FUNCTION public.get_daily_challenge()
RETURNS TABLE(problem_id integer, challenge_date date)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  today date := CURRENT_DATE;
  picked_id integer;
BEGIN
  -- Check if today's challenge exists
  SELECT dc.problem_id, dc.challenge_date INTO picked_id, today
  FROM public.daily_challenges dc
  WHERE dc.challenge_date = today;

  IF picked_id IS NOT NULL THEN
    RETURN QUERY SELECT picked_id, today;
    RETURN;
  END IF;

  -- Pick a random problem
  SELECT p.id INTO picked_id
  FROM public.problems p
  ORDER BY random()
  LIMIT 1;

  IF picked_id IS NULL THEN
    RETURN;
  END IF;

  -- Insert today's challenge
  INSERT INTO public.daily_challenges (challenge_date, problem_id)
  VALUES (today, picked_id)
  ON CONFLICT (challenge_date) DO NOTHING;

  RETURN QUERY SELECT picked_id, today;
END;
$$;

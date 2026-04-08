
CREATE OR REPLACE FUNCTION public.get_daily_challenge()
RETURNS TABLE(problem_id integer, challenge_date date)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_today date := CURRENT_DATE;
  v_picked_id integer;
BEGIN
  -- Check if today's challenge exists
  SELECT dc.problem_id INTO v_picked_id
  FROM public.daily_challenges dc
  WHERE dc.challenge_date = v_today;

  IF v_picked_id IS NOT NULL THEN
    RETURN QUERY SELECT v_picked_id, v_today;
    RETURN;
  END IF;

  -- Pick a random problem
  SELECT p.id INTO v_picked_id
  FROM public.problems p
  ORDER BY random()
  LIMIT 1;

  IF v_picked_id IS NULL THEN
    RETURN;
  END IF;

  -- Insert today's challenge
  INSERT INTO public.daily_challenges (challenge_date, problem_id)
  VALUES (v_today, v_picked_id)
  ON CONFLICT (challenge_date) DO NOTHING;

  RETURN QUERY SELECT v_picked_id, v_today;
END;
$$;


DROP FUNCTION IF EXISTS public.get_daily_challenge();

CREATE OR REPLACE FUNCTION public.get_daily_challenge()
RETURNS TABLE(out_problem_id integer, out_challenge_date date)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_today date := CURRENT_DATE;
  v_picked_id integer;
BEGIN
  SELECT dc.problem_id INTO v_picked_id
  FROM public.daily_challenges dc
  WHERE dc.challenge_date = v_today;

  IF v_picked_id IS NOT NULL THEN
    out_problem_id := v_picked_id;
    out_challenge_date := v_today;
    RETURN NEXT;
    RETURN;
  END IF;

  SELECT p.id INTO v_picked_id
  FROM public.problems p
  ORDER BY random()
  LIMIT 1;

  IF v_picked_id IS NULL THEN
    RETURN;
  END IF;

  INSERT INTO public.daily_challenges (challenge_date, problem_id)
  VALUES (v_today, v_picked_id)
  ON CONFLICT (challenge_date) DO NOTHING;

  out_problem_id := v_picked_id;
  out_challenge_date := v_today;
  RETURN NEXT;
END;
$$;


CREATE TYPE public.exercise_category AS ENUM ('fuerza', 'movilidad', 'resistencia', 'pliometria', 'flexibilidad');
ALTER TABLE public.exercises ADD COLUMN category public.exercise_category NULL;

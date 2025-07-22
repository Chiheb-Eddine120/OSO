-- 1. Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  postal_code TEXT,
  city TEXT,
  user_type TEXT CHECK (user_type IN ('student', 'professional')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table des étudiants
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table des professionnels
CREATE TABLE IF NOT EXISTS professionals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_description TEXT NOT NULL,
  academic_background TEXT NOT NULL,
  motivation_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table des métiers
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  distance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Table des stages
CREATE TABLE IF NOT EXISTS stages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  duration INTEGER NOT NULL CHECK (duration > 0 AND duration <= 5),
  period TEXT NOT NULL,
  location TEXT NOT NULL,
  max_distance INTEGER NOT NULL CHECK (max_distance > 0 AND max_distance <= 50),
  selected_jobs TEXT[] NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Table des disponibilités
CREATE TABLE IF NOT EXISTS availabilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Table des évaluations
CREATE TABLE IF NOT EXISTS evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stage_id UUID REFERENCES stages(id) ON DELETE CASCADE NOT NULL,
  student_rating INTEGER CHECK (student_rating >= 1 AND student_rating <= 5),
  student_feedback TEXT,
  professional_rating INTEGER CHECK (professional_rating >= 1 AND professional_rating <= 5),
  professional_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_stages_student_id ON stages(student_id);
CREATE INDEX IF NOT EXISTS idx_stages_status ON stages(status);
CREATE INDEX IF NOT EXISTS idx_jobs_professional_id ON jobs(professional_id);
CREATE INDEX IF NOT EXISTS idx_availabilities_professional_id ON availabilities(professional_id);
CREATE INDEX IF NOT EXISTS idx_availabilities_date ON availabilities(date);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stages_updated_at BEFORE UPDATE ON stages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

-- Politiques pour users
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING ((select auth.uid()) = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK ((select auth.uid()) = id);

-- Politiques pour students
CREATE POLICY "Students can view their own data" ON students
  FOR SELECT USING ((select auth.uid()) = user_id);

CREATE POLICY "Students can update their own data" ON students
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY "Students can insert their own data" ON students
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- Politiques pour professionals
CREATE POLICY "Professionals can view their own data" ON professionals
  FOR SELECT USING ((select auth.uid()) = user_id);

CREATE POLICY "Professionals can update their own data" ON professionals
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY "Professionals can insert their own data" ON professionals
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

-- Politiques pour jobs (lecture publique, écriture par le professionnel)
CREATE POLICY "Anyone can view jobs" ON jobs
  FOR SELECT USING (true);

CREATE POLICY "Professionals can manage their own jobs" ON jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM professionals 
      WHERE professionals.id = jobs.professional_id 
      AND professionals.user_id = (select auth.uid())
    )
  );

-- Politiques pour stages
CREATE POLICY "Students can view their own stages" ON stages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students 
      WHERE students.id = stages.student_id 
      AND students.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Students can insert their own stages" ON stages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM students 
      WHERE students.id = stages.student_id 
      AND students.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Students can update their own stages" ON stages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM students 
      WHERE students.id = stages.student_id 
      AND students.user_id = (select auth.uid())
    )
  );

-- Politiques pour availabilities
CREATE POLICY "Professionals can manage their own availabilities" ON availabilities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM professionals 
      WHERE professionals.id = availabilities.professional_id 
      AND professionals.user_id = (select auth.uid())
    )
  );

-- Politiques pour evaluations
CREATE POLICY "Users can view evaluations for their stages" ON evaluations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stages s
      JOIN students st ON s.student_id = st.id
      WHERE s.id = evaluations.stage_id 
      AND st.user_id = (select auth.uid())
    )
  );

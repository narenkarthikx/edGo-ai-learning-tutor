-- AI Learn Buddy - Supabase Database Schema
-- Run these queries in your Supabase SQL editor to set up the database

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- Student Profiles Table
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  grade INTEGER NOT NULL CHECK (grade >= 1 AND grade <= 12),
  language TEXT NOT NULL DEFAULT 'en',
  learning_style TEXT DEFAULT 'visual',
  difficulty_level TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Profiles Table
CREATE TABLE teacher_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  school TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Teacher-Student Class Mapping
CREATE TABLE teacher_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  class_name TEXT NOT NULL,
  grade INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(teacher_id, class_name)
);

-- Student-Class Enrollment
CREATE TABLE class_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES teacher_classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(class_id, student_id)
);

-- Assessments Table
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('literacy', 'numeracy')),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  questions_answered INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  topic TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Learning Gaps Table
CREATE TABLE learning_gaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  gap_area TEXT NOT NULL,
  gap_type TEXT NOT NULL CHECK (gap_type IN ('literacy', 'numeracy')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP WITH TIME ZONE,
  recommended_lessons TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Lessons Table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  grade INTEGER NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('literacy', 'numeracy')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  language TEXT NOT NULL DEFAULT 'en',
  duration_minutes INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Progress Tracking Table
CREATE TABLE progress_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER CHECK (score IS NULL OR (score >= 0 AND score <= 100)),
  time_spent_minutes INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_student_grade ON student_profiles(grade);
CREATE INDEX idx_student_language ON student_profiles(language);
CREATE INDEX idx_assessments_student ON assessments(student_id);
CREATE INDEX idx_assessments_type ON assessments(assessment_type);
CREATE INDEX idx_learning_gaps_student ON learning_gaps(student_id);
CREATE INDEX idx_learning_gaps_severity ON learning_gaps(severity);
CREATE INDEX idx_progress_student ON progress_tracking(student_id);
CREATE INDEX idx_progress_lesson ON progress_tracking(lesson_id);
CREATE INDEX idx_lessons_subject ON lessons(subject);
CREATE INDEX idx_lessons_grade ON lessons(grade);
CREATE INDEX idx_class_enrollments_class ON class_enrollments(class_id);
CREATE INDEX idx_class_enrollments_student ON class_enrollments(student_id);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;

-- Student Profiles RLS Policies
CREATE POLICY "Students can view their own profile"
  ON student_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Students can update their own profile"
  ON student_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Teachers can view student profiles in their classes"
  ON student_profiles
  FOR SELECT
  USING (
    id IN (
      SELECT ce.student_id FROM class_enrollments ce
      INNER JOIN teacher_classes tc ON ce.class_id = tc.id
      WHERE tc.teacher_id = auth.uid()
    )
  );

-- Teacher Profiles RLS Policies
CREATE POLICY "Teachers can view their own profile"
  ON teacher_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Teachers can update their own profile"
  ON teacher_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Assessments RLS Policies
CREATE POLICY "Students can view their own assessments"
  ON assessments
  FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own assessments"
  ON assessments
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view student assessments"
  ON assessments
  FOR SELECT
  USING (
    student_id IN (
      SELECT ce.student_id FROM class_enrollments ce
      INNER JOIN teacher_classes tc ON ce.class_id = tc.id
      WHERE tc.teacher_id = auth.uid()
    )
  );

-- Learning Gaps RLS Policies
CREATE POLICY "Students can view their own learning gaps"
  ON learning_gaps
  FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own learning gaps"
  ON learning_gaps
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view student learning gaps"
  ON learning_gaps
  FOR SELECT
  USING (
    student_id IN (
      SELECT ce.student_id FROM class_enrollments ce
      INNER JOIN teacher_classes tc ON ce.class_id = tc.id
      WHERE tc.teacher_id = auth.uid()
    )
  );

-- Progress Tracking RLS Policies
CREATE POLICY "Students can view their own progress"
  ON progress_tracking
  FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own progress"
  ON progress_tracking
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own progress"
  ON progress_tracking
  FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view student progress"
  ON progress_tracking
  FOR SELECT
  USING (
    student_id IN (
      SELECT ce.student_id FROM class_enrollments ce
      INNER JOIN teacher_classes tc ON ce.class_id = tc.id
      WHERE tc.teacher_id = auth.uid()
    )
  );

-- Lessons RLS Policies (public read access)
CREATE POLICY "Everyone can view lessons"
  ON lessons
  FOR SELECT
  USING (TRUE);

-- ============================================
-- 4. SAMPLE DATA (OPTIONAL)
-- ============================================

-- Insert sample lessons
INSERT INTO lessons (title, content, grade, subject, difficulty, language, duration_minutes) VALUES
('Basic Alphabet - Aa', 'Learn the letter A and words starting with A', 1, 'literacy', 'easy', 'en', 5),
('Basic Alphabet - Bb', 'Learn the letter B and words starting with B', 1, 'literacy', 'easy', 'en', 5),
('Numbers 1-10', 'Learn to count from 1 to 10', 1, 'numeracy', 'easy', 'en', 10),
('Addition Basics', 'Learn basic addition with single digits', 2, 'numeracy', 'easy', 'en', 10),
('Reading Comprehension', 'Read simple stories and answer questions', 3, 'literacy', 'medium', 'en', 15),
('Multiplication Tables', 'Learn times tables from 2 to 10', 4, 'numeracy', 'medium', 'en', 20);

-- ============================================
-- 5. CREATE VIEWS FOR ANALYTICS
-- ============================================

-- Student Dashboard View
CREATE VIEW student_dashboard AS
SELECT 
  s.id,
  s.name,
  s.grade,
  s.language,
  COUNT(DISTINCT a.id) as total_assessments,
  AVG(a.score) as average_score,
  COUNT(DISTINCT lg.id) as active_gaps,
  MAX(a.created_at) as last_assessment_date
FROM student_profiles s
LEFT JOIN assessments a ON s.id = a.student_id
LEFT JOIN learning_gaps lg ON s.id = lg.student_id AND lg.resolved_at IS NULL
GROUP BY s.id, s.name, s.grade, s.language;

-- Teacher Dashboard View
CREATE VIEW teacher_class_analytics AS
SELECT 
  tc.id as class_id,
  tc.teacher_id,
  tc.class_name,
  tc.grade,
  COUNT(DISTINCT ce.student_id) as total_students,
  AVG(a.score) as class_average_score,
  COUNT(DISTINCT CASE WHEN a.score < 50 THEN a.student_id END) as at_risk_students,
  COUNT(DISTINCT lg.id) as total_gaps
FROM teacher_classes tc
LEFT JOIN class_enrollments ce ON tc.id = ce.class_id
LEFT JOIN assessments a ON ce.student_id = a.student_id
LEFT JOIN learning_gaps lg ON ce.student_id = lg.student_id AND lg.resolved_at IS NULL
GROUP BY tc.id, tc.teacher_id, tc.class_name, tc.grade;

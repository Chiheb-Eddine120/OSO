import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour les tables Supabase
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string
  address: string
  postal_code: string
  city: string
  user_type: 'student' | 'professional'
  created_at: string
}

export interface Student {
  id: string
  user_id: string
  gender: 'male' | 'female' | 'other'
  created_at: string
}

export interface Professional {
  id: string
  user_id: string
  job_title: string
  company_name: string
  job_description: string
  academic_background: string
  motivation_text: string
  created_at: string
}

export interface Stage {
  id: string
  student_id: string
  duration: number
  period: string
  location: string
  max_distance: number
  selected_jobs: string[]
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed'
  created_at: string
}

export interface Job {
  id: string
  professional_id: string
  title: string
  description: string
  category: string
  created_at: string
}

export interface Availability {
  id: string
  professional_id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
  created_at: string
} 
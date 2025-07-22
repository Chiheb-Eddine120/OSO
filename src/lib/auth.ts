import { supabase } from './supabase'

export interface AuthUser {
  id: string
  email: string
  user_type: 'student' | 'professional'
  first_name: string
  last_name: string
}

export interface SignUpData {
  email: string
  password: string
  first_name: string
  last_name: string
  phone: string
  address: string
  postal_code: string
  city: string
  user_type: 'student' | 'professional'
  gender?: 'male' | 'female' | 'other'
  job_title?: string
  company_name?: string
  job_description?: string
  academic_background?: string
  motivation_text?: string
}

// Service d'authentification
export const authService = {
  // Inscription
  async signUp(data: SignUpData) {
    try {
      // 1. Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            user_type: data.user_type
          }
        }
      })

      if (authError) throw authError

      // 2. Créer le profil utilisateur dans la table users
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user?.id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          address: data.address,
          postal_code: data.postal_code,
          city: data.city,
          user_type: data.user_type
        })

      if (userError) throw userError

      // 3. Créer le profil spécifique (student ou professional)
      if (data.user_type === 'student') {
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            user_id: authData.user?.id,
            gender: data.gender
          })
        if (studentError) throw studentError
      } else {
        const { error: professionalError } = await supabase
          .from('professionals')
          .insert({
            user_id: authData.user?.id,
            job_title: data.job_title,
            company_name: data.company_name,
            job_description: data.job_description,
            academic_background: data.academic_background,
            motivation_text: data.motivation_text
          })
        if (professionalError) throw professionalError
      }

      return { success: true, user: authData.user }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      throw error
    }
  },

  // Connexion
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      throw error
    }
  },

  // Déconnexion
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      throw error
    }
  },

  // Récupérer l'utilisateur actuel
  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      // Récupérer les données complètes de l'utilisateur
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      return {
        ...user,
        ...userData
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error)
      return null
    }
  },

  // Écouter les changements d'authentification
  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }
} 
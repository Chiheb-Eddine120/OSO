import { supabase } from './supabase'

export interface StageBookingData {
  duration: number
  period: string
  location: string
  max_distance: number
  selected_jobs: string[]
  student_id: string
}

export interface JobData {
  id: string
  title: string
  description: string
  category: string
  professional_id: string
  location: string
  distance: number
}

// Service de gestion des stages
export const stageService = {
  // Créer une réservation de stage
  async createStageBooking(data: StageBookingData) {
    try {
      const { data: stageData, error } = await supabase
        .from('stages')
        .insert({
          student_id: data.student_id,
          duration: data.duration,
          period: data.period,
          location: data.location,
          max_distance: data.max_distance,
          selected_jobs: data.selected_jobs,
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single()

      if (error) throw error
      return stageData
    } catch (error) {
      console.error('Erreur lors de la création du stage:', error)
      throw error
    }
  },

  // Récupérer les métiers disponibles selon les critères
  async getAvailableJobs(duration: number, location: string, maxDistance: number) {
    try {
      // Récupérer tous les professionnels avec leurs métiers
      const { data: professionals, error } = await supabase
        .from('professionals')
        .select(`
          *,
          users!inner(*),
          jobs(*)
        `)
        .eq('users.city', location)
        .gte('jobs.distance', 0)
        .lte('jobs.distance', maxDistance)

      if (error) throw error

      // Transformer les données en format JobData
      const jobs: JobData[] = []
      professionals?.forEach(professional => {
        professional.jobs?.forEach((job: any) => {
          jobs.push({
            id: job.id,
            title: job.title,
            description: job.description,
            category: job.category,
            professional_id: professional.id,
            location: professional.users.city,
            distance: job.distance || 0
          })
        })
      })

      return jobs
    } catch (error) {
      console.error('Erreur lors de la récupération des métiers:', error)
      throw error
    }
  },

  // Récupérer les stages d'un jeune
  async getStudentStages(studentId: string) {
    try {
      const { data, error } = await supabase
        .from('stages')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des stages:', error)
      throw error
    }
  },

  // Mettre à jour le statut de paiement
  async updatePaymentStatus(stageId: string, status: 'paid' | 'failed') {
    try {
      const { error } = await supabase
        .from('stages')
        .update({ payment_status: status })
        .eq('id', stageId)

      if (error) throw error
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de paiement:', error)
      throw error
    }
  },

  // Annuler un stage
  async cancelStage(stageId: string) {
    try {
      const { error } = await supabase
        .from('stages')
        .update({ status: 'cancelled' })
        .eq('id', stageId)

      if (error) throw error
    } catch (error) {
      console.error('Erreur lors de l\'annulation du stage:', error)
      throw error
    }
  }
} 
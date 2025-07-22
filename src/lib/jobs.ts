import { supabase } from './supabase';
import { Job } from './supabase';

export const jobsService = {
  // Créer un métier
  async createJob(data: Omit<Job, 'id' | 'created_at'>) {
    const { data: job, error } = await supabase
      .from('jobs')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return job as Job;
  },

  // Récupérer tous les métiers d'un professionnel
  async getJobsByProfessional(professional_id: string) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('professional_id', professional_id);
    if (error) throw error;
    return data as Job[];
  },

  // Mettre à jour un métier
  async updateJob(id: string, updates: Partial<Job>) {
    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Job;
  },

  // Supprimer un métier
  async deleteJob(id: string) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
}; 
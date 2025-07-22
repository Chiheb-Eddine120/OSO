import { supabase } from './supabase';
import { Availability } from './supabase';

export const availabilitiesService = {
  // Créer une disponibilité
  async createAvailability(data: Omit<Availability, 'id' | 'created_at'>) {
    const { data: availability, error } = await supabase
      .from('availabilities')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return availability as Availability;
  },

  // Récupérer toutes les disponibilités d'un professionnel
  async getAvailabilitiesByProfessional(professional_id: string) {
    const { data, error } = await supabase
      .from('availabilities')
      .select('*')
      .eq('professional_id', professional_id);
    if (error) throw error;
    return data as Availability[];
  },

  // Mettre à jour une disponibilité
  async updateAvailability(id: string, updates: Partial<Availability>) {
    const { data, error } = await supabase
      .from('availabilities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Availability;
  },

  // Supprimer une disponibilité
  async deleteAvailability(id: string) {
    const { error } = await supabase
      .from('availabilities')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
}; 
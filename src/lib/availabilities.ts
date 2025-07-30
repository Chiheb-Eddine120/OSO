import { supabase } from './supabase';

export interface Availability {
  id: string;
  professional_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

export interface CreateAvailabilityData {
  professional_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface UpdateAvailabilityData {
  date?: string;
  start_time?: string;
  end_time?: string;
  is_available?: boolean;
}

export const availabilityService = {
  // Créer une nouvelle disponibilité
  async createAvailability(data: CreateAvailabilityData): Promise<Availability> {
    const { data: availability, error } = await supabase
      .from('availabilities')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return availability;
  },

  // Récupérer toutes les disponibilités d'un professionnel
  async getProfessionalAvailabilities(professionalId: string): Promise<Availability[]> {
    const { data: availabilities, error } = await supabase
      .from('availabilities')
      .select('*')
      .eq('professional_id', professionalId)
      .order('date', { ascending: true });

    if (error) throw error;
    return availabilities || [];
  },

  // Récupérer les disponibilités d'un professionnel pour une période donnée
  async getProfessionalAvailabilitiesByDateRange(
    professionalId: string, 
    startDate: string, 
    endDate: string
  ): Promise<Availability[]> {
    const { data: availabilities, error } = await supabase
      .from('availabilities')
      .select('*')
      .eq('professional_id', professionalId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) throw error;
    return availabilities || [];
  },

  // Mettre à jour une disponibilité
  async updateAvailability(id: string, data: UpdateAvailabilityData): Promise<Availability> {
    const { data: availability, error } = await supabase
      .from('availabilities')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return availability;
  },

  // Supprimer une disponibilité
  async deleteAvailability(id: string): Promise<void> {
    const { error } = await supabase
      .from('availabilities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Créer plusieurs disponibilités en lot
  async createMultipleAvailabilities(availabilities: CreateAvailabilityData[]): Promise<Availability[]> {
    const { data: createdAvailabilities, error } = await supabase
      .from('availabilities')
      .insert(availabilities)
      .select();

    if (error) throw error;
    return createdAvailabilities || [];
  },

  // Supprimer toutes les disponibilités d'un professionnel pour une période donnée
  async deleteAvailabilitiesByDateRange(
    professionalId: string, 
    startDate: string, 
    endDate: string
  ): Promise<void> {
    const { error } = await supabase
      .from('availabilities')
      .delete()
      .eq('professional_id', professionalId)
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) throw error;
  }
}; 
import { supabase } from './supabase';
import { Evaluation } from './supabase';

export const evaluationsService = {
  // Créer une évaluation
  async createEvaluation(data: Omit<Evaluation, 'id' | 'created_at'>) {
    const { data: evaluation, error } = await supabase
      .from('evaluations')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return evaluation as Evaluation;
  },

  // Récupérer les évaluations d'un stage
  async getEvaluationsByStage(stage_id: string) {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .eq('stage_id', stage_id);
    if (error) throw error;
    return data as Evaluation[];
  },

  // Mettre à jour une évaluation
  async updateEvaluation(id: string, updates: Partial<Evaluation>) {
    const { data, error } = await supabase
      .from('evaluations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Evaluation;
  },

  // Supprimer une évaluation
  async deleteEvaluation(id: string) {
    const { error } = await supabase
      .from('evaluations')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
}; 
import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import { format, parseISO, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, Plus, Trash2, Save, X } from 'lucide-react';
import { Availability, availabilityService } from '../lib/availabilities';
import 'react-calendar/dist/Calendar.css';

interface AvailabilityCalendarProps {
  professionalId: string;
}

interface TimeSlot {
  start_time: string;
  end_time: string;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ professionalId }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { start_time: '09:00', end_time: '12:00' },
    { start_time: '14:00', end_time: '17:00' }
  ]);

  const loadAvailabilities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await availabilityService.getProfessionalAvailabilities(professionalId);
      setAvailabilities(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des disponibilités');
    } finally {
      setLoading(false);
    }
  }, [professionalId]);

  // Charger les disponibilités
  useEffect(() => {
    loadAvailabilities();
  }, [loadAvailabilities]);

  // Vérifier si une date a des disponibilités
  const hasAvailability = (date: Date) => {
    return availabilities.some(availability => 
      isSameDay(parseISO(availability.date), date) && availability.is_available
    );
  };

  // Obtenir les disponibilités pour une date donnée
  const getAvailabilitiesForDate = (date: Date) => {
    return availabilities.filter(availability => 
      isSameDay(parseISO(availability.date), date)
    );
  };

  // Ajouter un créneau horaire
  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start_time: '09:00', end_time: '10:00' }]);
  };

  // Supprimer un créneau horaire
  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  // Mettre à jour un créneau horaire
  const updateTimeSlot = (index: number, field: 'start_time' | 'end_time', value: string) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  // Sauvegarder les disponibilités pour la date sélectionnée
  const saveAvailabilities = async () => {
    if (timeSlots.length === 0) {
      setError('Veuillez ajouter au moins un créneau horaire');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Supprimer les anciennes disponibilités pour cette date
      const existingAvailabilities = getAvailabilitiesForDate(selectedDate);
      for (const availability of existingAvailabilities) {
        await availabilityService.deleteAvailability(availability.id);
      }

      // Créer les nouvelles disponibilités
      const newAvailabilities = timeSlots.map(slot => ({
        professional_id: professionalId,
        date: format(selectedDate, 'yyyy-MM-dd'),
        start_time: slot.start_time,
        end_time: slot.end_time,
        is_available: true
      }));

      await availabilityService.createMultipleAvailabilities(newAvailabilities);
      
      // Recharger les disponibilités
      await loadAvailabilities();
      setShowTimeSlots(false);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  // Supprimer toutes les disponibilités pour une date
  const deleteAvailabilitiesForDate = async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      await availabilityService.deleteAvailabilitiesByDateRange(professionalId, dateStr, dateStr);
      await loadAvailabilities();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  // Gérer le clic sur une date
  const handleDateClick = (value: any) => {
    if (!value || !(value instanceof Date)) return;
    
    setSelectedDate(value);
    const existingAvailabilities = getAvailabilitiesForDate(value);
    
    if (existingAvailabilities.length > 0) {
      // Charger les créneaux existants
      const slots = existingAvailabilities.map(av => ({
        start_time: av.start_time,
        end_time: av.end_time
      }));
      setTimeSlots(slots);
    } else {
      // Créneaux par défaut
      setTimeSlots([
        { start_time: '09:00', end_time: '12:00' },
        { start_time: '14:00', end_time: '17:00' }
      ]);
    }
    setShowTimeSlots(true);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendrier */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Calendrier des disponibilités</h3>
          <Calendar
            onChange={handleDateClick}
            value={selectedDate}
            locale="fr-FR"
            tileClassName={({ date }: { date: Date }) => {
              if (hasAvailability(date)) {
                return 'bg-oso-pink text-white rounded';
              }
              return '';
            }}
            className="w-full border-0"
          />
        </div>

        {/* Gestion des créneaux horaires */}
        {showTimeSlots && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Créneaux pour le {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
              </h3>
              <button
                onClick={() => setShowTimeSlots(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <input
                    type="time"
                    value={slot.start_time}
                    onChange={(e) => updateTimeSlot(index, 'start_time', e.target.value)}
                    className="form-input w-24"
                  />
                  <span className="text-gray-500">à</span>
                  <input
                    type="time"
                    value={slot.end_time}
                    onChange={(e) => updateTimeSlot(index, 'end_time', e.target.value)}
                    className="form-input w-24"
                  />
                  {timeSlots.length > 1 && (
                    <button
                      onClick={() => removeTimeSlot(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addTimeSlot}
                className="flex items-center text-oso-pink hover:text-oso-pink-dark"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter un créneau
              </button>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={saveAvailabilities}
                  disabled={loading}
                  className="btn-primary flex items-center"
                >
                  <Save className="w-4 h-4 mr-1" />
                  {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
                <button
                  onClick={() => deleteAvailabilitiesForDate(selectedDate)}
                  disabled={loading}
                  className="btn-secondary text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liste des disponibilités existantes */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Disponibilités enregistrées</h3>
        {loading ? (
          <div className="text-gray-500">Chargement...</div>
        ) : availabilities.length === 0 ? (
          <div className="text-gray-500">Aucune disponibilité enregistrée</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Créneaux</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {availabilities
                  .filter(av => av.is_available)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((availability) => (
                    <tr key={availability.id} className="border-b">
                      <td className="py-2">
                        {format(parseISO(availability.date), 'EEEE d MMMM yyyy', { locale: fr })}
                      </td>
                      <td className="py-2">
                        {availability.start_time} - {availability.end_time}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => handleDateClick(parseISO(availability.date))}
                          className="text-oso-pink hover:text-oso-pink-dark text-sm"
                        >
                          Modifier
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCalendar; 
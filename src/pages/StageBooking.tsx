import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import CityAutocomplete from '../components/CityAutocomplete';
import { CitySearchResult } from '../types/cities';
import { useAuth } from '../contexts/AuthContext';
import { stageService } from '../lib/stages';

interface StageBookingData {
  duration: number;
  period: string;
  location: string;
  maxDistance: number;
  selectedJobs: string[];
}

const StageBooking: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [bookingData, setBookingData] = useState<StageBookingData>({
    duration: 0,
    period: '',
    location: '',
    maxDistance: 0,
    selectedJobs: []
  });
  const [selectedCity, setSelectedCity] = useState<CitySearchResult | null>(null);
  const [cityValue, setCityValue] = useState('');
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const periods = [
    { id: 'autumn', label: 'Congés d\'automne', dates: 'Octobre/Novembre' },
    { id: 'winter', label: 'Vacances d\'hiver', dates: 'Février' },
    { id: 'spring_break', label: 'Congé de détente', dates: 'Mars' },
    { id: 'spring', label: 'Vacances de printemps', dates: 'Avril' },
    { id: 'summer_july', label: 'Vacances d\'été juillet', dates: 'Juillet' },
    { id: 'summer_august', label: 'Vacances d\'été août', dates: 'Août' }
  ];

  const distances = [5, 10, 15, 20, 25, 30, 35, 40];

  // Métiers simulés basés sur la durée et la localisation
  const getAvailableJobs = (duration: number, location: string) => {
    const allJobs = [
      { id: '1', title: 'Médecin', category: 'Santé', location: 'Bruxelles' },
      { id: '2', title: 'Avocat', category: 'Droit', location: 'Bruxelles' },
      { id: '3', title: 'Ingénieur', category: 'Technique', location: 'Liège' },
      { id: '4', title: 'Architecte', category: 'Construction', location: 'Anvers' },
      { id: '5', title: 'Chef cuisinier', category: 'Restauration', location: 'Bruxelles' },
      { id: '6', title: 'Journaliste', category: 'Médias', location: 'Bruxelles' },
      { id: '7', title: 'Vétérinaire', category: 'Santé', location: 'Gand' },
      { id: '8', title: 'Dentiste', category: 'Santé', location: 'Liège' }
    ];

    // Simulation de filtrage basé sur la durée et la localisation
    return allJobs.filter(job => {
      // Logique de filtrage simulée
      return job.location.toLowerCase().includes(location.toLowerCase()) || 
             Math.random() > 0.3; // 70% des métiers disponibles
    });
  };

  const handleNext = () => {
    // Validation par étape
    if (currentStep === 1 && bookingData.duration === 0) return;
    if (currentStep === 2 && !bookingData.period) return;
    if (currentStep === 3 && !bookingData.location) return;
    if (currentStep === 4 && !bookingData.maxDistance) return;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJobToggle = (jobId: string) => {
    setBookingData(prev => ({
      ...prev,
      selectedJobs: prev.selectedJobs.includes(jobId)
        ? prev.selectedJobs.filter(id => id !== jobId)
        : [...prev.selectedJobs, jobId]
    }));
  };

  const handleConfirm = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const stage = await stageService.createStageBooking({
        student_id: user.id,
        duration: bookingData.duration,
        period: bookingData.period,
        location: bookingData.location,
        max_distance: bookingData.maxDistance,
        selected_jobs: bookingData.selectedJobs
      });
      navigate('/payment', { state: { bookingData: { ...bookingData, stageId: stage.id } } });
    } catch (e: any) {
      setError("Erreur lors de l'enregistrement de la réservation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city: CitySearchResult) => {
    setSelectedCity(city);
    setBookingData(prev => ({ ...prev, location: city.city_name }));
  };

  const availableJobs = getAvailableJobs(bookingData.duration, bookingData.location);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 6 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-pink-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-600">
              Étape {currentStep} sur 6
            </div>
          </div>

          {/* Step Content */}
          <div className="card">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Durée du stage
                </h2>
                <p className="text-gray-600 mb-6">
                  Choisis la durée de ton stage d'orientation.
                </p>
                <div className="form-group max-w-xs mx-auto">
                  <label className="form-label">Durée</label>
                  <select
                    className="form-input w-full"
                    value={bookingData.duration || ''}
                    onChange={e => setBookingData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                  >
                    <option value="">Sélectionne une durée</option>
                    <option value={3}>3 jours</option>
                    <option value={5}>5 jours</option>
                    <option value={10}>10 jours</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Période du stage
                </h2>
                <p className="text-gray-600 mb-6">
                  Choisissez la période qui vous convient le mieux pour votre stage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {periods.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setBookingData(prev => ({ ...prev, period: period.id }))}
                      className={`p-4 border-2 rounded-lg transition-colors text-left ${
                        bookingData.period === period.id
                          ? 'border-pink-600 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-600 hover:bg-pink-50'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{period.label}</div>
                      <div className="text-sm text-gray-600">{period.dates}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Localité
                </h2>
                <p className="text-gray-600 mb-6">
                  Indiquez votre ville pour trouver les stages disponibles à proximité.
                </p>
                <div className="form-group">
                  <label className="form-label">Votre ville</label>
                  <CityAutocomplete
                    value={cityValue}
                    onChange={setCityValue}
                    onCitySelect={handleCitySelect}
                    placeholder="Rechercher votre ville..."
                  />
                </div>
                {selectedCity && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800">
                        Ville sélectionnée : {selectedCity.city_name} ({selectedCity.post_code})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Rayon de recherche
                </h2>
                <p className="text-gray-600 mb-6">
                  Combien de kilomètres êtes-vous prêt à parcourir pour votre stage ?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {distances.map((distance) => (
                    <button
                      key={distance}
                      onClick={() => setBookingData(prev => ({ ...prev, maxDistance: distance }))}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        bookingData.maxDistance === distance
                          ? 'border-pink-600 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-600 hover:bg-pink-50'
                      }`}
                    >
                      <div className="text-xl font-bold text-gray-900">{distance}</div>
                      <div className="text-sm text-gray-600">km</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-2" />
                  Choisissez vos métiers
                </h2>
                <p className="text-gray-600 mb-6">
                  Sélectionnez les métiers que vous souhaitez découvrir pendant votre stage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableJobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => handleJobToggle(job.id)}
                      className={`p-4 border-2 rounded-lg transition-colors text-left ${
                        bookingData.selectedJobs.includes(job.id)
                          ? 'border-pink-600 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-600 hover:bg-pink-50'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-600">{job.category}</div>
                      <div className="text-xs text-gray-500">{job.location}</div>
                    </button>
                  ))}
                </div>
                {bookingData.selectedJobs.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-blue-800 font-semibold">
                        {bookingData.selectedJobs.length} métier{bookingData.selectedJobs.length > 1 ? 's' : ''} sélectionné{bookingData.selectedJobs.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 6 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Résumé de ta demande
                </h2>
                <div className="mb-4">
                  <div className="mb-2"><span className="font-semibold">Durée :</span> {bookingData.duration} jour{bookingData.duration > 1 ? 's' : ''}</div>
                  <div className="mb-2"><span className="font-semibold">Période :</span> {periods.find(p => p.id === bookingData.period)?.label || '-'}</div>
                  <div className="mb-2"><span className="font-semibold">Ville :</span> {bookingData.location}</div>
                  <div className="mb-2"><span className="font-semibold">Rayon :</span> {bookingData.maxDistance} km</div>
                  <div className="mb-2"><span className="font-semibold">Métiers choisis :</span> {availableJobs.filter(j => bookingData.selectedJobs.includes(j.id)).map(j => j.title).join(', ')}</div>
                </div>
                <div className="card bg-yellow-50 border border-yellow-200 mb-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 mb-2">
                        Ta demande est non modifiable : sois sûr.e de ton choix !
                      </h3>
                      <p className="text-yellow-700 text-sm">
                        Attention : l'ordre des métiers affiché ne correspond pas à l'ordre réel pendant le stage. 
                        Celui-ci te sera communiqué au plus tard deux semaines avant le départ.
                      </p>
                      <p className="text-yellow-700 text-sm mt-2">
                        En cas d'indisponibilité ou d'un autre imprévu concernant l'un des métiers, 
                        une notification te sera envoyée afin que tu puisses en choisir un autre.
                      </p>
                    </div>
                  </div>
                </div>
                {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
                <button
                  onClick={handleConfirm}
                  disabled={bookingData.selectedJobs.length === 0 || loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enregistrement...' : 'Confirmer ma sélection'}
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="btn-secondary"
              >
                Retour
              </button>
            )}
            {currentStep < totalSteps && (
              <button
                onClick={handleNext}
                className={`btn-primary ml-auto ${
                  (currentStep === 1 && bookingData.duration === 0) ||
                  (currentStep === 2 && !bookingData.period) ||
                  (currentStep === 3 && !bookingData.location) ||
                  (currentStep === 4 && !bookingData.maxDistance) ||
                  (currentStep === 5 && bookingData.selectedJobs.length === 0)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={
                  (currentStep === 1 && bookingData.duration === 0) ||
                  (currentStep === 2 && !bookingData.period) ||
                  (currentStep === 3 && !bookingData.location) ||
                  (currentStep === 4 && !bookingData.maxDistance) ||
                  (currentStep === 5 && bookingData.selectedJobs.length === 0)
                }
              >
                Suivant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageBooking; 
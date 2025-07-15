import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Heart, Calendar } from 'lucide-react';
import CityAutocomplete from '../components/CityAutocomplete';
import { CitySearchResult } from '../types/cities';

interface ProfessionalFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  academicBackground: string;
  motivationText: string;
}

const ProfessionalRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<CitySearchResult | null>(null);
  const [cityValue, setCityValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfessionalFormData>();

  const onSubmit = async (data: ProfessionalFormData) => {
    try {
      // Ici, vous intégreriez l'appel à Supabase pour créer le profil professionnel
      console.log('Données du formulaire:', data);
      console.log('Ville sélectionnée:', selectedCity);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirection vers la page de gestion des disponibilités
      navigate('/my-oso');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  const handleCitySelect = (city: CitySearchResult) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Inscription Professionnel</h1>
            <p className="text-gray-600">
              Rejoignez notre réseau de professionnels et partagez votre expertise avec les jeunes
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Informations personnelles */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Prénom *</label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'Le prénom est requis' })}
                      className={`form-input ${errors.firstName ? 'error' : ''}`}
                    />
                    {errors.firstName && (
                      <p className="error-message">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nom *</label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Le nom est requis' })}
                      className={`form-input ${errors.lastName ? 'error' : ''}`}
                    />
                    {errors.lastName && (
                      <p className="error-message">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Adresse e-mail *</label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'L\'email est requis',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Adresse email invalide'
                        }
                      })}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && (
                      <p className="error-message">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Numéro de téléphone *</label>
                    <input
                      type="tel"
                      {...register('phone', {
                        required: 'Le numéro de téléphone est requis',
                        pattern: {
                          value: /^[\+]?[0-9\s\-\(\)]{9,}$/,
                          message: 'Numéro de téléphone invalide'
                        }
                      })}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && (
                      <p className="error-message">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Adresse */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Adresse
                </h2>
                <div className="form-group">
                  <label className="form-label">Adresse postale *</label>
                  <input
                    type="text"
                    {...register('address', { required: 'L\'adresse est requise' })}
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    placeholder="Rue, numéro, boîte"
                  />
                  {errors.address && (
                    <p className="error-message">{errors.address.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Ville *</label>
                  <CityAutocomplete
                    value={cityValue}
                    onChange={setCityValue}
                    onCitySelect={handleCitySelect}
                    placeholder="Rechercher une ville..."
                  />
                  {!selectedCity && cityValue && (
                    <p className="error-message">Veuillez sélectionner une ville dans la liste</p>
                  )}
                </div>
              </div>

              {/* Informations professionnelles */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Informations professionnelles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Titre du poste *</label>
                    <input
                      type="text"
                      {...register('jobTitle', { required: 'Le titre du poste est requis' })}
                      className={`form-input ${errors.jobTitle ? 'error' : ''}`}
                      placeholder="ex: Médecin, Avocat, Ingénieur..."
                    />
                    {errors.jobTitle && (
                      <p className="error-message">{errors.jobTitle.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nom de l'entreprise *</label>
                    <input
                      type="text"
                      {...register('companyName', { required: 'Le nom de l\'entreprise est requis' })}
                      className={`form-input ${errors.companyName ? 'error' : ''}`}
                      placeholder="Nom de votre entreprise"
                    />
                    {errors.companyName && (
                      <p className="error-message">{errors.companyName.message}</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description du métier *</label>
                  <textarea
                    {...register('jobDescription', { 
                      required: 'La description du métier est requise',
                      minLength: {
                        value: 50,
                        message: 'La description doit contenir au moins 50 caractères'
                      }
                    })}
                    className={`form-input h-32 resize-none ${errors.jobDescription ? 'error' : ''}`}
                    placeholder="Décrivez votre métier, vos missions principales, les compétences requises..."
                  />
                  {errors.jobDescription && (
                    <p className="error-message">{errors.jobDescription.message}</p>
                  )}
                </div>
              </div>

              {/* Parcours académique */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Parcours académique et professionnel
                </h2>
                <div className="form-group">
                  <label className="form-label">Formation et expérience *</label>
                  <textarea
                    {...register('academicBackground', { 
                      required: 'Le parcours académique est requis',
                      minLength: {
                        value: 30,
                        message: 'Le parcours doit contenir au moins 30 caractères'
                      }
                    })}
                    className={`form-input h-24 resize-none ${errors.academicBackground ? 'error' : ''}`}
                    placeholder="Décrivez votre formation, votre parcours professionnel, vos diplômes..."
                  />
                  {errors.academicBackground && (
                    <p className="error-message">{errors.academicBackground.message}</p>
                  )}
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Pourquoi partager votre métier ?
                </h2>
                <div className="form-group">
                  <label className="form-label">Votre motivation *</label>
                  <textarea
                    {...register('motivationText', { 
                      required: 'Votre motivation est requise',
                      minLength: {
                        value: 50,
                        message: 'La motivation doit contenir au moins 50 caractères'
                      }
                    })}
                    className={`form-input h-24 resize-none ${errors.motivationText ? 'error' : ''}`}
                    placeholder="Pourquoi souhaitez-vous partager votre métier avec les jeunes ? Qu'est-ce qui vous motive ?"
                  />
                  {errors.motivationText && (
                    <p className="error-message">{errors.motivationText.message}</p>
                  )}
                </div>
              </div>

              {/* Disponibilités */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Disponibilités
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    Après votre inscription, vous pourrez configurer vos disponibilités 
                    dans votre espace personnel. Vous pourrez indiquer les jours et 
                    horaires où vous êtes disponible pour accueillir des stagiaires.
                  </p>
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedCity}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Création du profil...' : 'Créer mon profil professionnel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalRegistration; 
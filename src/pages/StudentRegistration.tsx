import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, User, Mail, MapPin, Lock } from 'lucide-react';
import CityAutocomplete from '../components/CityAutocomplete';
import { CitySearchResult } from '../types/cities';

interface StudentFormData {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  postalCode: string;
  city: string;
}

const StudentRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CitySearchResult | null>(null);
  const [cityValue, setCityValue] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<StudentFormData>();

  const password = watch('password');

  const onSubmit = async (data: StudentFormData) => {
    try {
      // Ici, vous intégreriez l'appel à Supabase pour créer l'utilisateur
      console.log('Données du formulaire:', data);
      console.log('Ville sélectionnée:', selectedCity);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirection vers la page de réservation de stage
      navigate('/book-stage');
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Inscription jeune</h1>
            <p className="text-gray-600">
              Créez votre profil pour commencer à explorer les métiers qui vous intéressent
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                <div className="form-group">
                  <label className="form-label">Sexe *</label>
                  <select
                    {...register('gender', { required: 'Le sexe est requis' })}
                    className={`form-input ${errors.gender ? 'error' : ''}`}
                  >
                    <option value="">Sélectionnez votre sexe</option>
                    <option value="male">Masculin</option>
                    <option value="female">Féminin</option>
                    <option value="other">Autre</option>
                  </select>
                  {errors.gender && (
                    <p className="error-message">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              {/* Informations de contact */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Informations de contact
                </h2>
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
                        value: /^[+]?[-0-9\s()]{9,}$/,
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

              {/* Sécurité */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Sécurité
                </h2>
                <div className="form-group">
                  <label className="form-label">Mot de passe *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Le mot de passe est requis',
                        minLength: {
                          value: 8,
                          message: 'Le mot de passe doit contenir au moins 8 caractères'
                        }
                      })}
                      className={`form-input pr-10 ${errors.password ? 'error' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Confirmation du mot de passe *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword', {
                        required: 'La confirmation du mot de passe est requise',
                        validate: value => value === password || 'Les mots de passe ne correspondent pas'
                      })}
                      className={`form-input pr-10 ${errors.confirmPassword ? 'error' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword.message}</p>
                  )}
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

              {/* Bouton de soumission */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedCity}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Création du compte...' : 'Créer mon compte'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration; 
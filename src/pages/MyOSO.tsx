import React, { useState } from 'react';
import { User, Calendar, Settings, LogOut, Edit, Eye, EyeOff } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  userType: 'student' | 'professional';
}

const MyOSO: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Données simulées de l'utilisateur
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+32 470 123 456',
    address: 'Rue de la Paix 123',
    city: 'Bruxelles (1000)',
    userType: 'student'
  });

  const [bookings] = useState([
    {
      id: '1',
      date: '2024-02-15',
      duration: 3,
      period: 'Vacances d\'hiver',
      location: 'Bruxelles',
      status: 'confirmed',
      jobs: ['Médecin', 'Avocat', 'Ingénieur']
    }
  ]);

  const handleSaveProfile = () => {
    // Ici, vous intégreriez l'appel à Supabase pour sauvegarder les modifications
    console.log('Profil sauvegardé:', userProfile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Ici, vous intégreriez la logique de déconnexion
    console.log('Déconnexion');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mon espace OSO</h1>
            <p className="text-gray-600">
              Gérez votre profil et vos réservations
            </p>
          </div>

          {/* Navigation par onglets */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-pink-600 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profil
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'bookings'
                  ? 'border-pink-600 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Mes réservations
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-pink-600 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Paramètres
            </button>
          </div>

          {/* Contenu des onglets */}
          {activeTab === 'profile' && (
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Informations personnelles</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-secondary text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {isEditing ? 'Annuler' : 'Modifier'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Prénom</label>
                  <input
                    type="text"
                    value={userProfile.firstName}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    value={userProfile.lastName}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label className="form-label">Adresse</label>
                  <input
                    type="text"
                    value={userProfile.address}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, address: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label className="form-label">Ville</label>
                  <input
                    type="text"
                    value={userProfile.city}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, city: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="btn-primary"
                  >
                    Sauvegarder
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Stage du {new Date(booking.date).toLocaleDateString('fr-FR')}
                      </h3>
                      <p className="text-gray-600">
                        {booking.duration} jour{booking.duration > 1 ? 's' : ''} - {booking.period}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Localisation:</span>
                      <p className="text-gray-900">{booking.location}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Métiers:</span>
                      <p className="text-gray-900">{booking.jobs.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="btn-secondary text-sm">
                      Voir les détails
                    </button>
                    <button className="btn-secondary text-sm">
                      Contacter le support
                    </button>
                  </div>
                </div>
              ))}

              {bookings.length === 0 && (
                <div className="card text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune réservation</h3>
                  <p className="text-gray-600 mb-4">
                    Vous n'avez pas encore de réservation de stage.
                  </p>
                  <button className="btn-primary">
                    Réserver un stage
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Paramètres du compte</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Changer le mot de passe</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Nouveau mot de passe</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-input pr-10"
                          placeholder="Nouveau mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Confirmer le mot de passe</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Confirmer le mot de passe"
                      />
                    </div>
                  </div>
                  <button className="btn-primary mt-4">
                    Changer le mot de passe
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span>Notifications par email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span>Notifications SMS</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span>Newsletter OSO</span>
                    </label>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4 text-red-600">Zone dangereuse</h3>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOSO; 
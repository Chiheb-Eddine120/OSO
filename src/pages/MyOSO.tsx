import React, { useState } from 'react';
import { User, Calendar, Settings, LogOut, Edit, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const MyOSO: React.FC = () => {
  const { user, signOut, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<any>(user);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    try {
      const updates = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        postal_code: profile.postal_code,
        city: profile.city,
      };
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user?.id);
      if (error) throw error;
      updateUser(updates);
      setIsEditing(false);
    } catch (e: any) {
      setError(e.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  const handleReserveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setModalOpen(true);
    } else {
      navigate('/book-stage');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold mb-2 gradient-text">Mon espace OSO</h1>
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
                  ? 'border-oso-pink text-oso-pink'
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
                  ? 'border-oso-pink text-oso-pink'
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
                  ? 'border-oso-pink text-oso-pink'
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
              {error && <div className="error-message mb-4">{error}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Prénom</label>
                  <input
                    type="text"
                    value={profile?.first_name || ''}
                    onChange={(e) => setProfile((prev: any) => ({ ...prev, first_name: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    value={profile?.last_name || ''}
                    onChange={(e) => setProfile((prev: any) => ({ ...prev, last_name: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={profile?.email || ''}
                    onChange={(e) => setProfile((prev: any) => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    value={profile?.phone || ''}
                    onChange={(e) => setProfile((prev: any) => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="form-label">Adresse</label>
                  <input
                    type="text"
                    value={profile?.address || ''}
                    onChange={(e) => setProfile((prev: any) => ({ ...prev, address: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="form-label">Code postal</label>
                  <input
                    type="text"
                    value={profile?.postal_code || ''}
                    onChange={(e) => setProfile((prev: any) => ({ ...prev, postal_code: e.target.value }))}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="form-label">Ville</label>
                  <input
                    type="text"
                    value={profile?.city || ''}
                    onChange={(e) => setProfile((prev: any) => ({ ...prev, city: e.target.value }))}
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
                    disabled={saving}
                  >
                    {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Les autres onglets restent inchangés pour l'instant */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="card text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune réservation</h3>
                <p className="text-gray-600 mb-4">
                  Vous n'avez pas encore de réservation de stage.
                </p>
                <button className="btn-primary" onClick={handleReserveClick}>
                  Réserver un stage
                </button>
                <Modal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Connecte-toi ou crée un compte"
                  actions={
                    <>
                      <button
                        className="btn-primary"
                        onClick={() => { setModalOpen(false); navigate('/login'); }}
                      >
                        Se connecter
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => { setModalOpen(false); navigate('/register/student'); }}
                      >
                        Créer un compte
                      </button>
                    </>
                  }
                >
                  <p className="text-gray-700 text-center">
                    Pour réserver un stage, tu dois être connecté.<br />
                    Merci de te connecter ou de créer un compte pour poursuivre.
                  </p>
                </Modal>
              </div>
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
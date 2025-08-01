import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';
import { User, Briefcase } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'student' | 'professional' | null>(null);
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.password || form.password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      await authService.signUp({ ...form, user_type: userType });
      if (userType === 'professional') {
        navigate('/availabilities');
      } else {
        navigate('/my-oso');
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-oso-light-orange via-white to-oso-orange">
        <div className="bg-white/90 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-oso-orange">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-oso-light-orange p-3 rounded-full mb-2">
              <User className="w-7 h-7 text-oso-orange" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Inscription</h1>
            <p className="text-gray-500 text-sm">Choisissez votre type de compte</p>
          </div>
          <button
            className="w-full bg-oso-orange text-white py-2 rounded-lg font-semibold mb-4 hover:bg-oso-red-orange transition"
            onClick={() => setUserType('student')}
          >Je suis un futur stagiaire</button>
          <button
            className="w-full bg-oso-pink text-white py-2 rounded-lg font-semibold hover:bg-oso-red-orange transition"
            onClick={() => setUserType('professional')}
          >Je suis professionnel</button>
          <div className="mt-4 text-center">
            <button type="button" className="text-oso-orange underline font-semibold" onClick={() => navigate('/login')}>Déjà un compte ? Se connecter</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-oso-light-orange via-white to-oso-orange">
      <form onSubmit={handleSubmit} className="bg-white/90 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-oso-orange">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-oso-light-orange p-3 rounded-full mb-2">
            {userType === 'student' ? (
              <User className="w-7 h-7 text-oso-orange" />
            ) : (
              <Briefcase className="w-7 h-7 text-oso-orange" />
            )}
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
            Inscription {userType === 'student' ? 'jeune' : 'professionnel'}
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            {userType === 'student'
              ? 'Accédez à la réservation de stages.'
              : 'Proposez vos stages et partagez votre métier.'}
          </p>
        </div>
        {error && <div className="mb-4 text-red-600 text-center font-semibold bg-red-50 border border-red-200 rounded py-2 px-3">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Prénom</label>
          <input name="first_name" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Nom</label>
          <input name="last_name" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
        </div>
        {userType === 'student' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Sexe</label>
            <select name="gender" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange}>
              <option value="">Sélectionner</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Ne pas préciser</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Adresse e-mail</label>
          <input type="email" name="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Numéro de téléphone</label>
          <input name="phone" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Mot de passe</label>
          <input type="password" name="password" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Confirmation du mot de passe</label>
          <input type="password" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Adresse postale</label>
          <input name="address" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Code postal</label>
          <input name="postal_code" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Ville</label>
          <input name="city" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" onChange={handleChange} />
        </div>
        {userType === 'professional' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Poste</label>
              <input name="job_title" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Entreprise</label>
              <input name="company_name" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Description du métier</label>
              <input name="job_description" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Parcours académique et professionnel</label>
              <input name="academic_background" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-medium text-gray-700">Pourquoi souhaitez-vous partager votre métier ?</label>
              <textarea name="motivation_text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-oso-orange" required onChange={handleChange} />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full bg-oso-orange text-white py-2.5 rounded-lg font-bold text-lg shadow hover:bg-oso-red-orange transition"
          disabled={loading}
        >
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
        <div className="mt-4 text-center">
          <button type="button" className="text-oso-orange underline font-semibold" onClick={() => setUserType(null)}>Changer de type de compte</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage; 

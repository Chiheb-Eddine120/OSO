import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';

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
        navigate('/availabilities'); // À créer : page de gestion des dispos
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">Inscription</h1>
          <p className="mb-6">Choisissez votre type de compte :</p>
          <button
            className="w-full bg-pink-600 text-white py-2 rounded font-semibold mb-4 hover:bg-pink-700 transition"
            onClick={() => setUserType('student')}
          >Je suis étudiant</button>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            onClick={() => setUserType('professional')}
          >Je suis professionnel</button>
          <div className="mt-4 text-center">
            <button type="button" className="text-pink-600 underline" onClick={() => navigate('/login')}>Déjà un compte ? Se connecter</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription {userType === 'student' ? 'étudiant' : 'professionnel'}</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Prénom</label>
          <input name="first_name" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nom</label>
          <input name="last_name" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
        </div>
        {userType === 'student' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Sexe</label>
            <select name="gender" className="w-full border rounded px-3 py-2" required onChange={handleChange}>
              <option value="">Sélectionner</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Adresse e-mail</label>
          <input type="email" name="email" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Numéro de téléphone</label>
          <input name="phone" className="w-full border rounded px-3 py-2" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input type="password" name="password" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirmation du mot de passe</label>
          <input type="password" className="w-full border rounded px-3 py-2" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Adresse postale</label>
          <input name="address" className="w-full border rounded px-3 py-2" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Code postal</label>
          <input name="postal_code" className="w-full border rounded px-3 py-2" onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Ville</label>
          <input name="city" className="w-full border rounded px-3 py-2" onChange={handleChange} />
        </div>
        {userType === 'professional' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Poste</label>
              <input name="job_title" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Entreprise</label>
              <input name="company_name" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Description du métier</label>
              <input name="job_description" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Parcours académique et professionnel</label>
              <input name="academic_background" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-medium">Pourquoi souhaitez-vous partager votre métier ?</label>
              <textarea name="motivation_text" className="w-full border rounded px-3 py-2" required onChange={handleChange} />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 transition"
          disabled={loading}
        >
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
        <div className="mt-4 text-center">
          <button type="button" className="text-pink-600 underline" onClick={() => setUserType(null)}>Changer de type de compte</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage; 
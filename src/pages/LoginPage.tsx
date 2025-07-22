import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';
import { Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authService.signIn(email, password);
      navigate('/my-oso');
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100">
      <div className="absolute top-6 left-6 cursor-pointer" onClick={() => navigate('/')}> 
        <span className="text-2xl font-bold text-pink-600">OSO</span>
      </div>
      <form onSubmit={handleSubmit} className="relative z-10 bg-white/90 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-pink-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-pink-100 p-3 rounded-full mb-2">
            <Lock className="w-7 h-7 text-pink-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Connexion</h1>
          <p className="text-gray-500 text-sm">Accédez à votre espace personnel</p>
        </div>
        {error && <div className="mb-4 text-red-600 text-center font-semibold bg-red-50 border border-red-200 rounded py-2 px-3">{error}</div>}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-8">
          <label className="block mb-1 font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-bold text-lg shadow hover:bg-pink-700 transition"
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
        <div className="mt-6 text-center text-gray-600">
          <span>Pas de compte ? </span>
          <button type="button" className="text-pink-600 underline font-semibold" onClick={() => navigate('/register')}>S'inscrire</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; 
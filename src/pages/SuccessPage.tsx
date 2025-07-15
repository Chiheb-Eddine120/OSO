import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Home, Calendar, Users, Lightbulb, Heart } from 'lucide-react';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Message de succès */}
          <div className="card mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-green-800">
              Félicitations ! Tu as réservé ton stage !
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Nous t'enverrons une confirmation et ta feuille de route (fiches pros, adresses, horaires) 
              dans max 5 jours ouvrables !
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">
                En attendant, commence à te préparer pour ton stage !
              </p>
            </div>
          </div>

          {/* Conseils de préparation */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Conseils pour bien te préparer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-pink-600" />
                  Présente-toi
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Sois ponctuel et professionnel</li>
                  <li>• Habille-toi de manière appropriée</li>
                  <li>• Prépare une courte présentation</li>
                  <li>• Apporte un carnet pour prendre des notes</li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-pink-600" />
                  Questions à poser
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Quel est le parcours pour ce métier ?</li>
                  <li>• Quelles sont les qualités requises ?</li>
                  <li>• Quels sont les avantages et inconvénients ?</li>
                  <li>• Quelles sont les évolutions possibles ?</li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  Attitude professionnelle
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Sois curieux et intéressé</li>
                  <li>• Pose des questions pertinentes</li>
                  <li>• Respecte les règles de l'entreprise</li>
                  <li>• Remercie pour l'opportunité</li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-pink-600" />
                  Expérience valorisante
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Documente ton expérience</li>
                  <li>• Prends des photos (si autorisé)</li>
                  <li>• Rédige un compte-rendu</li>
                  <li>• Ajoute cette expérience à ton CV</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                À l'écoute de soi
              </h3>
              <p className="text-yellow-700 text-sm">
                Pendant ton stage, sois attentif à tes ressentis : est-ce que ce métier te plaît ? 
                Te vois-tu exercer cette profession ? Ces réflexions t'aideront à clarifier ton projet professionnel.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-primary inline-flex items-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </button>
            
            <button
              onClick={() => navigate('/my-oso')}
              className="btn-secondary inline-flex items-center"
            >
              <Users className="w-4 h-4 mr-2" />
              Mon espace OSO
            </button>
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              Tu as des questions ? Contacte-nous à{' '}
              <a href="mailto:contact@oso.be" className="text-pink-600 hover:text-pink-700">
                contact@oso.be
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 
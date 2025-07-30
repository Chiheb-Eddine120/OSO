import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Calendar, Users, Lightbulb, Heart } from 'lucide-react';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

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
              Nous t’enverrons une confirmation et ta feuille de route (fiches pros, adresses, horaires) dans max XX jours ouvrables !
            </p>

          </div>

          {/* Conseils de préparation */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Conseils pour bien te préparer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-pink-600" />
                  Présente-toi (envoyé au pro)
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Prépare une courte présentation de toi</li>
                  <li>• Explique pourquoi tu fais ce stage</li>
                  <li>• Sois poli et souriant</li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-pink-600" />
                  Questions à poser
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Quel est le parcours pour ce métier ?</li>
                  <li>• Qu’est-ce qui te plaît le plus dans ce métier ?</li>
                  <li>• Quelles sont les difficultés ?</li>
                  <li>• Quels conseils donnerais-tu à un jeune ?</li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  Attitude pro
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Sois ponctuel et respectueux</li>
                  <li>• Observe et écoute attentivement</li>
                  <li>• Remercie à la fin de chaque journée</li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-pink-600" />
                  Expérience valorisante
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Note ce que tu as appris</li>
                  <li>• Garde des souvenirs (photos, carnet, etc.)</li>
                  <li>• Pense à valoriser ce stage dans ton CV</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                À l’écoute de soi
              </h3>
              <p className="text-yellow-700 text-sm">
                Pendant ton stage, sois attentif à tes ressentis : est-ce que ce métier te plaît ? Te vois-tu exercer cette profession ? Ces réflexions t’aideront à clarifier ton projet professionnel.
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
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, Star, Award, MessageCircle } from 'lucide-react';

const ProHomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              OSO, notre mission.
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              OSO, c'est la solution qui manquait pour explorer l'avenir professionnel des jeunes.
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              Aujourd'hui, en Belgique, trop de jeunes sortent des secondaires sans idée claire de leur futur, 
              faute d'opportunités concrètes pour découvrir les métiers sur le terrain, les empêchant de faire 
              des choix éclairés.
            </p>
            <p className="text-xl mb-12 leading-relaxed">
              OSO leur propose des stages d'orientation courts, flexibles et concrets, pour explorer facilement 
              plusieurs univers professionnels, sans contraintes administratives lourdes.
            </p>
            <Link to="/register/professional" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              Je rejoins le réseau de professionnels chez OSO
              <Heart className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Notre mission chez OSO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <Heart className="w-12 h-12 text-pink-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Votre impact en tant que partenaire</h3>
                <p className="text-gray-600">
                  En partageant votre expertise, vous contribuez directement à l'orientation des jeunes 
                  et à la construction de leur avenir professionnel.
                </p>
              </div>
              <div className="card">
                <Users className="w-12 h-12 text-pink-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Mise en relation de qualité</h3>
                <p className="text-gray-600">
                  Nous vous mettons en relation avec des jeunes motivés et curieux, 
                  prêts à découvrir votre métier et votre parcours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Win-Win Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Une relation gagnant-gagnant</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rejoindre OSO, c'est s'engager dans une démarche qui profite à tous
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Star className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pour vous</h3>
              <ul className="text-gray-600 text-left">
                <li>• Partagez votre passion</li>
                <li>• Développez votre réseau</li>
                <li>• Contribuez à la société</li>
                <li>• Reconnu comme mentor</li>
              </ul>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pour les jeunes</h3>
              <ul className="text-gray-600 text-left">
                <li>• Découvrent des métiers</li>
                <li>• Rencontrent des experts</li>
                <li>• Clarifient leur avenir</li>
                <li>• Développent leur réseau</li>
              </ul>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pour la société</h3>
              <ul className="text-gray-600 text-left">
                <li>• Orientation améliorée</li>
                <li>• Réduction du décrochage</li>
                <li>• Meilleure adéquation</li>
                <li>• Cohésion sociale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Inscription</h3>
              <p className="text-gray-600">Créez votre profil professionnel</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Disponibilités</h3>
              <p className="text-gray-600">Indiquez vos créneaux disponibles</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Matching</h3>
              <p className="text-gray-600">Nous vous mettons en relation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Stage</h3>
              <p className="text-gray-600">Accueillez et guidez les jeunes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Après le stage : évaluation du jeune</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Retour d'expérience</h3>
                <p className="text-gray-600 mb-4">
                  Les jeunes évaluent leur expérience et partagent leurs impressions sur le métier découvert.
                </p>
                <ul className="text-gray-600 text-left">
                  <li>• Intérêt pour le métier</li>
                  <li>• Qualité de l'accueil</li>
                  <li>• Apprentissages réalisés</li>
                  <li>• Recommandations</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Impact sur l'orientation</h3>
                <p className="text-gray-600 mb-4">
                  Nous mesurons l'impact de votre stage sur les choix d'orientation des jeunes.
                </p>
                <ul className="text-gray-600 text-left">
                  <li>• Clarification des choix</li>
                  <li>• Découverte de nouvelles pistes</li>
                  <li>• Confirmation d'aspirations</li>
                  <li>• Évolution des projets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à rejoindre l'aventure OSO ?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez notre réseau de professionnels et contribuez à l'avenir des jeunes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/professional" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
                <Heart className="mr-2 w-5 h-5" />
                Je m'inscris comme professionnel
              </Link>
              <Link to="/contact" className="btn-secondary text-lg px-8 py-4 inline-flex items-center">
                <MessageCircle className="mr-2 w-5 h-5" />
                J'ai des questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProHomePage; 
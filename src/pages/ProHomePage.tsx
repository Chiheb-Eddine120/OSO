import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Star, Award, Target, Sparkles } from 'lucide-react';
import logoCouleur from '../assets/logos/LogoCouleur700x140.png';

const ProHomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}

      <section className="section-hero">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-8">
            <img src={logoCouleur} alt="Logo OSO" className="h-20" />
          </div>
            <h1 className="gradient-text mb-lg">
            OSO, la solution pour l’orientation des  jeunes en Belgique
            </h1>
            <p className="text-xl mb-xl leading-relaxed max-w-3xl mx-auto">
            OSO, c’est la solution qui manquait aux jeunes pour explorer leur avenir professionnel ! 
            </p>
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              <span>Je rejoins le réseau de professionnels chez OSO</span>
              
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi OSO Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Notre mission, ensemble </h2>
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <div className="space-y-lg text-lg leading-relaxed">
                <p>
                Aujourd’hui, en Belgique, trop de jeunes sortent des secondaires sans idée claire de leur futur, faute d’opportunités concrètes pour découvrir les métiers sur le terrain, les empêchant de faire des choix éclairés.
                </p>
                <p>
                Grâce à vous, partenaires professionnels, OSO leur propose des stages d’observation sur-mesure pour explorer facilement plusieurs univers professionnels, sans contraintes administratives lourdes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Ensemble, faisons la différence </h2>
          <div className="cards-container">
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Votre impact en tant que professionnel</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Mise en relation de qualité</div>
            </div>
          </div>
        </div>
      </section>

      {/* Win-Win Section */}
      <section className="section bg-light-gray">
        <div className="container">
          <h2 className="text-center mb-2xl">Une relation gagnant-gagnant</h2>
          <div className="cards-container">
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Pour vous</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Pour les jeunes</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Pour la société</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Comment ça marche ?</h2>
          <div className="cards-container">
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-md">1</div>
              <div className="font-semibold">Inscription</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-md">2</div>
              <div className="font-semibold">Disponibilités</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-md">3</div>
              <div className="font-semibold">Matching</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-md">4</div>
              <div className="font-semibold">Stage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Section */}
      <section className="section bg-light-gray">
        <div className="container">
          <h2 className="text-center mb-2xl">Après le stage : évaluation du jeune</h2>
          <div className="cards-container">
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Retour d'expérience</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Impact sur l'orientation</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-subtle">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-lg">Prêt à rejoindre l'aventure OSO ?</h2>
            <Link to="/register" className="btn-primary text-lg px-8 py-4">              
              <span>Je m'inscris comme professionnel</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProHomePage; 
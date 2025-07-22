import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, MessageCircle, Target, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="gradient-text mb-lg">
              OSO, la solution qui manquait pour explorer ton avenir
            </h1>
            <p className="text-xl mb-xl leading-relaxed max-w-3xl mx-auto">
              Stages d'orientation sur-mesure, sans contraintes, pour explorer facilement plusieurs univers professionnels.
            </p>
            <Link to="/register/student" className="btn-primary text-lg px-8 py-4">
              <span>Je réserve mon stage !</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi OSO Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Pourquoi OSO ?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <h3 className="gradient-text text-2xl font-bold mb-lg text-center">
                OSO, la solution qui manquait pour explorer ton avenir.
              </h3>
              <div className="space-y-lg text-lg leading-relaxed">
                <p>
                  Aujourd'hui, en Belgique, il existe des initiatives de stages d'observation ou de découverte de métiers… 
                  mais ces services sont peu visibles, mal structurés, souvent limités à des conditions strictes et peu 
                  accessibles pour les jeunes.
                </p>
                <p>
                  Résultat, beaucoup de jeunes sortent des secondaires sans idée claire de leur avenir et des choix qui 
                  s'offrent à eux, faute d'avoir pu se confronter simplement à la réalité des métiers.
                </p>
                <p>
                  OSO, c'est la solution qui manquait : un stage d'orientation sur-mesure, sans contraintes, flexible, 
                  concret et conçu spécialement pour les jeunes, pour explorer facilement plusieurs univers professionnels, 
                  au contact de professionnels expérimentés, afin de lever les doutes et de mieux choisir leur futur !
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Une ligne */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">OSO en quelques chiffres</h2>
          <div className="cards-container">
            <div className="card card-stats">
              <div className="text-4xl font-bold gradient-text mb-md">+ de 150</div>
              <div className="text-gray-600">métiers à découvrir</div>
            </div>
            <div className="card card-stats">
              <div className="text-4xl font-bold gradient-text mb-md">+ de 500</div>
              <div className="text-gray-600">stages organisés</div>
            </div>
            <div className="card card-stats">
              <div className="text-4xl font-bold gradient-text mb-md">85%</div>
              <div className="text-gray-600">des jeunes trouvent leur voie</div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section - Une ligne */}
      <section className="section bg-light-gray">
        <div className="container">
          <h2 className="text-center mb-2xl">Réseau de professionnels</h2>
          <div className="cards-container">
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Expertise</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Reconnaissance</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Impact</div>
            </div>
            <div className="card card-feature">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Échange</div>
            </div>
          </div>
          <div className="text-center mt-xl">
            <Link to="/pro" className="btn-secondary">
              <span>Rejoindre le réseau</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section - Une ligne */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Ils nous font confiance</h2>
          <div className="cards-container">
            <div className="card card-logo">
              <div className="text-gray-400 font-semibold">Logo 1</div>
            </div>
            <div className="card card-logo">
              <div className="text-gray-400 font-semibold">Logo 2</div>
            </div>
            <div className="card card-logo">
              <div className="text-gray-400 font-semibold">Logo 3</div>
            </div>
            <div className="card card-logo">
              <div className="text-gray-400 font-semibold">Logo 4</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Une ligne */}
      <section className="section bg-gradient-subtle">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-lg">Une question ?</h2>
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5" />
              <span>Contacte nous dès maintenant !</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
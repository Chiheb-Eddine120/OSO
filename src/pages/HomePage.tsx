import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, TrendingUp, MessageCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              OSO, la solution qui manquait pour explorer ton avenir.
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Aujourd'hui, en Belgique, il existe des initiatives de stages d'observation ou de découverte de métiers… 
              mais ces services sont peu visibles, mal structurés, souvent limités à des conditions strictes et peu 
              accessibles pour les jeunes.
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              Résultat, beaucoup de jeunes sortent des secondaires sans idée claire de leur avenir et des choix qui 
              s'offrent à eux, faute d'avoir pu se confronter simplement à la réalité des métiers.
            </p>
            <p className="text-xl mb-12 leading-relaxed">
              OSO, c'est la solution qui manquait : un stage d'orientation sur-mesure, sans contraintes, flexible, 
              concret et conçu spécialement pour les jeunes, pour explorer facilement plusieurs univers professionnels, 
              au contact de professionnels expérimentés, afin de lever les doutes et de mieux choisir leur futur !
            </p>
            <Link to="/register/student" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              Je réserve mon stage !
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">OSO en quelques chiffres</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">+ de 150</div>
              <div className="text-gray-600">métiers à découvrir</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">+ de 500</div>
              <div className="text-gray-600">stages organisés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">85%</div>
              <div className="text-gray-600">des jeunes trouvent leur voie</div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Réseau de professionnels</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rejoignez notre réseau de professionnels passionnés et partagez votre expertise avec les jeunes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expertise</h3>
              <p className="text-gray-600">Partagez votre savoir-faire</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reconnaissance</h3>
              <p className="text-gray-600">Soyez reconnu comme mentor</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p className="text-gray-600">Influencez l'avenir des jeunes</p>
            </div>
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Échange</h3>
              <p className="text-gray-600">Créez des liens durables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Placeholder logos */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-gray-400 text-lg font-semibold">Logo 1</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-gray-400 text-lg font-semibold">Logo 2</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-gray-400 text-lg font-semibold">Logo 3</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-gray-400 text-lg font-semibold">Logo 4</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Une question ?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Notre équipe est là pour vous accompagner dans votre démarche
            </p>
            <Link to="/contact" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              <MessageCircle className="mr-2 w-5 h-5" />
              Contacte nous dès maintenant !
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
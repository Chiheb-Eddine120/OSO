import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Award, MessageCircle, Target, Heart, Stethoscope, Code, GraduationCap, Factory, Scale } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleReserveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setModalOpen(true);
    } else {
      navigate('/book-stage');
    }
  };

  return (
    <div className="min-h-screen bg-oso-light-gray">
      {/* Hero Section */}
      <div className="flex justify-center mb-8">
        <img src="../assets/logos/LogoCouleur700x140.png" alt="Logo OSO" className="h-20" />
      </div>
      <section className="section-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="gradient-text mb-lg text-4xl md:text-5xl font-extrabold leading-tight">
              OSO, la solution qui manquait pour explorer ton avenir
            </h1>
            <p className="text-xl mb-xl leading-relaxed max-w-3xl mx-auto text-gray-700">
              Stages d'orientation sur-mesure, sans contraintes, pour explorer facilement plusieurs univers professionnels.
            </p>
            <button
              onClick={handleReserveClick}
              className="btn-primary text-lg px-8 py-4 shadow-lg"
            >
              <span>Je réserve mon stage !</span>
              <ArrowRight className="w-5 h-5" />
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
                    onClick={() => { setModalOpen(false); navigate('/register'); }}
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
      </section>
      {/* Pourquoi OSO Section */}
      <section className="section py-12 md:py-20">
        <div className="container">
          <h2 className="text-center mb-2xl text-3xl font-bold gradient-text">Pourquoi OSO ?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12">
              <h3 className="gradient-text text-2xl font-bold mb-lg text-center">
                OSO, la solution qui manquait pour explorer ton avenir.
              </h3>
              <div className="space-y-lg text-lg leading-relaxed text-gray-700">
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
      {/* Stats Section */}
      <section className="section py-12 md:py-20">
        <div className="container">
          <h2 className="text-center mb-2xl text-3xl font-bold gradient-text">OSO en quelques chiffres</h2>
          <div className="cards-container flex flex-wrap gap-6 justify-center">
            <div className="card card-stats p-8">
              <div className="text-4xl font-bold gradient-text mb-md">+ de 150</div>
              <div className="text-gray-600">métiers à découvrir</div>
            </div>
            <div className="card card-stats p-8">
              <div className="text-4xl font-bold gradient-text mb-md">+ de 500</div>
              <div className="text-gray-600">stages organisés</div>
            </div>
            <div className="card card-stats p-8">
              <div className="text-4xl font-bold gradient-text mb-md">85%</div>
              <div className="text-gray-600">des jeunes trouvent leur voie</div>
            </div>
          </div>
        </div>
      </section>
      {/* Network Section */}
      <section className="section bg-oso-light-gray py-12 md:py-20">
        <div className="container">
          <h2 className="text-center mb-2xl text-3xl font-bold gradient-text">Réseau de professionnels</h2>
          <div className="cards-container flex flex-wrap gap-6 justify-center">
            <div className="card card-feature p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-oso-pink to-oso-orange rounded-full flex items-center justify-center mx-auto mb-md">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Santé</div>
            </div>
            <div className="card card-feature p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-oso-pink to-oso-orange rounded-full flex items-center justify-center mx-auto mb-md">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Technologie</div>
            </div>
            <div className="card card-feature p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-oso-pink to-oso-orange rounded-full flex items-center justify-center mx-auto mb-md">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Éducation</div>
            </div>
            <div className="card card-feature p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-oso-pink to-oso-orange rounded-full flex items-center justify-center mx-auto mb-md">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Industrie</div>
            </div>
            <div className="card card-feature p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-oso-pink to-oso-orange rounded-full flex items-center justify-center mx-auto mb-md">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">Juridique</div>
            </div>

            <p className="text-center mt-xl">et bien d'autres...</p>
          </div>
          <div className="text-center mt-xl">
            <Link to="/pro" className="btn-secondary">
              <span>Rejoindre le réseau</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* Trust Section */}
      <section className="section py-12 md:py-20">
        <div className="container">
          <h2 className="text-center mb-2xl text-3xl font-bold gradient-text">Ils nous font confiance</h2>
          <div className="cards-container flex flex-wrap gap-6 justify-center">
            <div className="card card-logo p-8">
              <div className="text-gray-400 font-semibold">Logo 1</div>
            </div>
            <div className="card card-logo p-8">
              <div className="text-gray-400 font-semibold">Logo 2</div>
            </div>
            <div className="card card-logo p-8">
              <div className="text-gray-400 font-semibold">Logo 3</div>
            </div>
            <div className="card card-logo p-8">
              <div className="text-gray-400 font-semibold">Logo 4</div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="section bg-gradient-subtle py-12 md:py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-lg text-2xl font-bold gradient-text">Une question ?</h2>
            <Link to="/contact" className="btn-primary text-lg px-8 py-4 shadow-lg">
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
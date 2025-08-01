import React, { useState } from 'react';
import logoBlanc from '../assets/logos/LogoBlanc350x70.png';
import logoCouleur from '../assets/logos/LogoCouleur700x140.png';

const LogoTest: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-oso-black">
        Test du Logo OSO
      </h1>
      
      <div className="space-y-8">
        {/* Test du logo blanc */}
        <section className="p-6 bg-gradient-to-r from-oso-pink to-oso-orange rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Logo Blanc (Header normal)</h2>
          <div className="flex items-center gap-4">
            <img 
              src={logoBlanc} 
              alt="OSO Logo Blanc" 
              className="h-10 w-auto drop-shadow" 
            />
            <span className="text-white font-semibold">Logo blanc sur fond coloré</span>
          </div>
        </section>

        {/* Test du logo couleur */}
        <section className="p-6 bg-white border-2 border-oso-gray rounded-lg">
          <h2 className="text-xl font-bold text-oso-black mb-4">Logo Couleur (Header scrolled)</h2>
          <div className="flex items-center gap-4">
            <img 
              src={logoCouleur} 
              alt="OSO Logo Couleur" 
              className="h-10 w-auto drop-shadow" 
            />
            <span className="text-oso-black font-semibold">Logo couleur sur fond blanc</span>
          </div>
        </section>

        {/* Test de transition */}
        <section className="p-6 bg-oso-light-gray rounded-lg">
          <h2 className="text-xl font-bold text-oso-black mb-4">Test de Transition</h2>
          <button 
            onClick={() => setIsScrolled(!isScrolled)}
            className="btn-primary mb-4"
          >
            {isScrolled ? 'Simuler Header Normal' : 'Simuler Header Scrolled'}
          </button>
          
          <div className={`p-4 rounded-lg transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-gradient-to-r from-oso-pink to-oso-orange'}`}>
            <div className="flex items-center gap-4">
              <img 
                src={isScrolled ? logoCouleur : logoBlanc} 
                alt="OSO Logo" 
                className="h-10 w-auto drop-shadow transition-all duration-300" 
              />
              <span className={`font-semibold ${isScrolled ? 'text-oso-black' : 'text-white'}`}>
                {isScrolled ? 'Header Scrolled (Logo Couleur)' : 'Header Normal (Logo Blanc)'}
              </span>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Instructions de Test</h2>
          <ul className="text-blue-700 space-y-2">
            <li>• Le logo blanc s'affiche quand le header est sur le dégradé coloré</li>
            <li>• Le logo couleur s'affiche quand le header est scrolled (fond blanc)</li>
            <li>• La transition est automatique lors du scroll</li>
            <li>• Testez en visitant la page d'accueil et en scrollant</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LogoTest; 
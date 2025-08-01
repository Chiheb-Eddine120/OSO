import React, { useState } from 'react';

const LogoFallbackTest: React.FC = () => {
  const [simulateError, setSimulateError] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);
  const [logoError, setLogoError] = useState(false);

  const handleImageError = () => {
    setLogoError(true);
    setLogoLoaded(false);
  };

  const handleImageLoad = () => {
    setLogoLoaded(true);
    setLogoError(false);
  };

  const resetLogo = () => {
    setLogoError(false);
    setLogoLoaded(true);
    setSimulateError(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-oso-black">
        Test du Fallback du Logo OSO
      </h1>
      
      <div className="space-y-8">
        {/* Contrôles de test */}
        <section className="p-6 bg-oso-light-orange rounded-lg">
          <h2 className="text-xl font-bold text-oso-black mb-4">Contrôles de Test</h2>
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={() => setSimulateError(!simulateError)}
              className="btn-primary"
            >
              {simulateError ? 'Désactiver' : 'Activer'} Simulation d'Erreur
            </button>
            <button 
              onClick={resetLogo}
              className="btn-secondary"
            >
              Réinitialiser Logo
            </button>
          </div>
          <div className="mt-4 text-sm text-oso-gray">
            <p><strong>État actuel :</strong></p>
            <p>• Logo chargé : {logoLoaded ? '✅ Oui' : '❌ Non'}</p>
            <p>• Erreur de logo : {logoError ? '❌ Oui' : '✅ Non'}</p>
            <p>• Simulation d'erreur : {simulateError ? '❌ Active' : '✅ Inactive'}</p>
          </div>
        </section>

        {/* Test du logo avec fallback */}
        <section className="p-6 bg-white border-2 border-oso-orange rounded-lg">
          <h2 className="text-xl font-bold text-oso-black mb-4">Test du Logo avec Fallback</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="header-logo flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              {!logoError ? (
                <img 
                  src={simulateError ? "invalid-path.png" : "/src/assets/logos/LogoBlanc350x70.png"}
                  alt="OSO Logo" 
                  className="h-10 w-auto drop-shadow transition-all duration-300 hover:scale-105" 
                  style={{ maxHeight: '40px' }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <span className="gradient-text text-2xl font-extrabold tracking-tight">OSO</span>
              )}
            </div>
          </div>

          <div className="text-sm text-oso-gray">
            <p><strong>Comportement attendu :</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Si le logo se charge correctement → Affichage du logo</li>
              <li>Si le logo ne se charge pas → Affichage du texte "OSO" à la place</li>
              <li>Le texte "OSO" ne doit pas apparaître à côté du logo</li>
              <li>Le fallback doit être automatique et transparent</li>
            </ul>
          </div>
        </section>

        {/* Instructions */}
        <section className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Instructions de Test</h2>
          <ul className="text-blue-700 space-y-2">
            <li>• <strong>Test normal :</strong> Le logo doit s'afficher normalement</li>
            <li>• <strong>Test d'erreur :</strong> Cliquez sur "Activer Simulation d'Erreur" pour voir le fallback</li>
            <li>• <strong>Test de récupération :</strong> Cliquez sur "Réinitialiser Logo" pour revenir à l'état normal</li>
            <li>• <strong>Vérification :</strong> Le texte "OSO" ne doit jamais apparaître à côté du logo</li>
          </ul>
        </section>

        {/* Comparaison avant/après */}
        <section className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-bold text-green-800 mb-4">Amélioration Apportée</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-700 mb-2">❌ Avant</h3>
              <div className="flex items-center gap-2 text-2xl font-extrabold">
                <img src="/invalid-path.png" alt="Logo" className="h-10 w-auto" />
                <span className="gradient-text">OSO</span> {/* Texte à côté */}
              </div>
              <p className="text-sm text-green-600 mt-2">Le texte "OSO" apparaissait à côté du logo</p>
            </div>
            <div>
              <h3 className="font-bold text-green-700 mb-2">✅ Après</h3>
              <div className="flex items-center gap-2 text-2xl font-extrabold">
                <span className="gradient-text">OSO</span> {/* Texte à la place */}
              </div>
              <p className="text-sm text-green-600 mt-2">Le texte "OSO" apparaît à la place du logo</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LogoFallbackTest; 
import React from 'react';
import { Stethoscope, Code, GraduationCap, Factory, Scale } from 'lucide-react';

const IconTest: React.FC = () => {
  const sectors = [
    { name: 'Santé', icon: Stethoscope, description: 'Médecine, soins, paramédical' },
    { name: 'Technologie', icon: Code, description: 'Informatique, développement, innovation' },
    { name: 'Éducation', icon: GraduationCap, description: 'Enseignement, formation, pédagogie' },
    { name: 'Industrie', icon: Factory, description: 'Production, fabrication, logistique' },
    { name: 'Juridique', icon: Scale, description: 'Droit, justice, conseil juridique' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-oso-black">
        Test des Associations Icône/Secteur
      </h1>
      
      <div className="space-y-8">
        {/* Section de test */}
        <section className="p-6 bg-oso-light-orange rounded-lg">
          <h2 className="text-xl font-bold text-oso-black mb-4">Associations Icône/Secteur</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <div key={index} className="card card-feature p-6 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-gradient-to-br from-oso-pink to-oso-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <sector.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg text-oso-black mb-2">{sector.name}</h3>
                  <p className="text-sm text-oso-gray">{sector.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparaison avant/après */}
        <section className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Amélioration des Associations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-700 mb-3">❌ Avant (Associations incorrectes)</h3>
              <ul className="text-blue-600 space-y-2 text-sm">
                <li>• <strong>Santé</strong> → Icône Users (groupe de personnes)</li>
                <li>• <strong>Technologie</strong> → Icône Award (récompense)</li>
                <li>• <strong>Éducation</strong> → Icône Target (cible)</li>
                <li>• <strong>Industrie</strong> → Icône Heart (cœur)</li>
                <li>• <strong>Juridique</strong> → Icône Heart (cœur)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 mb-3">✅ Après (Associations logiques)</h3>
              <ul className="text-blue-600 space-y-2 text-sm">
                <li>• <strong>Santé</strong> → Icône Stethoscope (médecine)</li>
                <li>• <strong>Technologie</strong> → Icône Code (programmation)</li>
                <li>• <strong>Éducation</strong> → Icône GraduationCap (diplôme)</li>
                <li>• <strong>Industrie</strong> → Icône Factory (usine)</li>
                <li>• <strong>Juridique</strong> → Icône Scale (balance de justice)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-bold text-green-800 mb-4">Validation des Associations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-700 mb-3">✅ Associations Logiques</h3>
              <ul className="text-green-600 space-y-2 text-sm">
                <li>• <strong>Stethoscope</strong> : Symbole universel de la médecine</li>
                <li>• <strong>Code</strong> : Représente la programmation et la tech</li>
                <li>• <strong>GraduationCap</strong> : Symbole de l'éducation et des diplômes</li>
                <li>• <strong>Factory</strong> : Représente l'industrie et la production</li>
                <li>• <strong>Scale</strong> : Symbole de la justice et du droit</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-700 mb-3">🎯 Avantages</h3>
              <ul className="text-green-600 space-y-2 text-sm">
                <li>• <strong>Compréhension immédiate</strong> : Les icônes sont intuitives</li>
                <li>• <strong>Cohérence visuelle</strong> : Chaque secteur a son identité</li>
                <li>• <strong>Accessibilité</strong> : Reconnaissance universelle</li>
                <li>• <strong>Professionnalisme</strong> : Associations pertinentes</li>
                <li>• <strong>UX améliorée</strong> : Navigation plus intuitive</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Test interactif */}
        <section className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h2 className="text-xl font-bold text-purple-800 mb-4">Test Interactif</h2>
          <p className="text-purple-700 mb-4">
            Vérifiez que chaque icône correspond bien au secteur qu'elle représente :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {sectors.map((sector, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-oso-pink to-oso-orange rounded-full flex items-center justify-center mx-auto mb-2">
                  <sector.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-sm">{sector.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default IconTest; 
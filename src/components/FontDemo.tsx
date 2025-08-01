import React from 'react';

const FontDemo: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-oso-black">
        Démonstration des Polices Montserrat Arabic
      </h1>
      
      <div className="space-y-8">
        {/* Section Inter (police par défaut) */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-oso-gray">
            Police Inter (par défaut)
          </h2>
          <div className="space-y-2">
            <p className="text-lg font-light">Inter Light (300) - Texte léger et élégant</p>
            <p className="text-lg font-normal">Inter Regular (400) - Texte normal et lisible</p>
            <p className="text-lg font-medium">Inter Medium (500) - Texte moyen et équilibré</p>
            <p className="text-lg font-semibold">Inter SemiBold (600) - Texte semi-gras et affirmé</p>
            <p className="text-lg font-bold">Inter Bold (700) - Texte gras et impactant</p>
            <p className="text-lg font-extrabold">Inter ExtraBold (800) - Texte très gras et puissant</p>
          </div>
        </section>

        {/* Section Montserrat Arabic */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-oso-gray font-montserrat-arabic">
            Police Montserrat Arabic
          </h2>
          <div className="space-y-2 font-montserrat-arabic">
            <p className="text-lg font-montserrat-arabic-thin">
              Montserrat Arabic Thin (250) - Texte très fin et délicat
            </p>
            <p className="text-lg font-montserrat-arabic-extralight">
              Montserrat Arabic ExtraLight (275) - Texte extra-léger et aéré
            </p>
            <p className="text-lg font-montserrat-arabic-light">
              Montserrat Arabic Light (300) - Texte léger et moderne
            </p>
            <p className="text-lg font-montserrat-arabic-regular">
              Montserrat Arabic Regular (400) - Texte normal et équilibré
            </p>
            <p className="text-lg font-montserrat-arabic-medium">
              Montserrat Arabic Medium (500) - Texte moyen et professionnel
            </p>
            <p className="text-lg font-montserrat-arabic-semibold">
              Montserrat Arabic SemiBold (600) - Texte semi-gras et affirmé
            </p>
            <p className="text-lg font-montserrat-arabic-bold">
              Montserrat Arabic Bold (700) - Texte gras et impactant
            </p>
            <p className="text-lg font-montserrat-arabic-extrabold">
              Montserrat Arabic ExtraBold (800) - Texte très gras et puissant
            </p>
            <p className="text-lg font-montserrat-arabic-black">
              Montserrat Arabic Black (900) - Texte noir et très impactant
            </p>
          </div>
        </section>

        {/* Section avec Tailwind CSS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-oso-gray font-montserrat-arabic">
            Utilisation avec Tailwind CSS
          </h2>
          <div className="space-y-2">
            <p className="text-lg font-montserrat-arabic font-light">
              Classe: font-montserrat-arabic font-light
            </p>
            <p className="text-lg font-montserrat-arabic font-normal">
              Classe: font-montserrat-arabic font-normal
            </p>
            <p className="text-lg font-montserrat-arabic font-medium">
              Classe: font-montserrat-arabic font-medium
            </p>
            <p className="text-lg font-montserrat-arabic font-semibold">
              Classe: font-montserrat-arabic font-semibold
            </p>
            <p className="text-lg font-montserrat-arabic font-bold">
              Classe: font-montserrat-arabic font-bold
            </p>
            <p className="text-lg font-montserrat-arabic font-extrabold">
              Classe: font-montserrat-arabic font-extrabold
            </p>
          </div>
        </section>

        {/* Section d'exemple d'utilisation */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-oso-gray font-montserrat-arabic">
            Exemples d'Utilisation
          </h2>
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-r from-oso-pink to-oso-orange rounded-lg">
              <h3 className="text-xl font-montserrat-arabic font-bold text-white mb-2">
                Titre en Montserrat Arabic Bold
              </h3>
              <p className="font-montserrat-arabic font-medium text-white/90">
                Sous-titre en Montserrat Arabic Medium
              </p>
            </div>
            
            <div className="p-6 bg-oso-light-gray rounded-lg">
              <h3 className="text-xl font-montserrat-arabic font-semibold text-oso-black mb-2">
                Section de Contenu
              </h3>
              <p className="font-montserrat-arabic font-normal text-oso-gray">
                Ceci est un exemple de texte en Montserrat Arabic Regular pour le contenu principal.
                Cette police est parfaite pour les textes en arabe et offre une excellente lisibilité.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FontDemo; 
const fs = require('fs');
const path = require('path');

// Chemins source et destination
const sourceDir = path.join(__dirname, '..', 'Montserrat_Arabic_Font_Family_(Fontmirror)');
const destDir = path.join(__dirname, '..', 'src', 'assets', 'fonts', 'montserrat-arabic');

// Fonction pour copier les fichiers
function copyFonts() {
  try {
    // Vérifier si le dossier source existe
    if (!fs.existsSync(sourceDir)) {
      console.log('❌ Dossier source non trouvé:', sourceDir);
      console.log('📁 Veuillez placer le dossier "Montserrat_Arabic_Font_Family_(Fontmirror)" à la racine du projet');
      return;
    }

    // Créer le dossier de destination s'il n'existe pas
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log('✅ Dossier de destination créé:', destDir);
    }

    // Lire tous les fichiers .otf du dossier source
    const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.otf'));
    
    if (files.length === 0) {
      console.log('❌ Aucun fichier .otf trouvé dans le dossier source');
      return;
    }

    console.log(`📁 Copie de ${files.length} fichiers de police...`);

    // Copier chaque fichier
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copié: ${file}`);
    });

    console.log('🎉 Toutes les polices ont été copiées avec succès !');
    console.log('📂 Emplacement:', destDir);
    
  } catch (error) {
    console.error('❌ Erreur lors de la copie des polices:', error.message);
  }
}

// Exécuter le script
copyFonts(); 
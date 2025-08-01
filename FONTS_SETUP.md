# Configuration des Polices Montserrat Arabic

## 🎯 Objectif
Intégrer la famille de polices Montserrat Arabic dans votre projet OSO de manière organisée et professionnelle.

## 📁 Structure Organisée

Votre dossier de polices est maintenant organisé comme suit :

```
src/assets/fonts/
├── montserrat-arabic/          # Famille de polices Montserrat Arabic
│   ├── fonts.css              # Définitions CSS des polices
│   ├── Montserrat-Arabic-Thin-250.otf
│   ├── Montserrat-Arabic-ExtraLight-275.otf
│   ├── Montserrat-Arabic-Light-300.otf
│   ├── Montserrat-Arabic-Regular-400.otf
│   ├── Montserrat-Arabic-Medium-500.otf
│   ├── Montserrat-Arabic-SemiBold-600.otf
│   ├── Montserrat-Arabic-Bold-700.otf
│   ├── Montserrat-Arabic-ExtraBold-800.otf
│   └── Montserrat-Arabic-Black-900.otf
└── README.md                   # Documentation des polices
```

## 🚀 Étapes pour Finaliser l'Installation

### 1. Copier les Fichiers de Police

**Option A : Script automatique (recommandé)**
```bash
# Placez le dossier "Montserrat_Arabic_Font_Family_(Fontmirror)" à la racine du projet
# Puis exécutez :
npm run copy-fonts
```

**Option B : Copie manuelle**
Copiez manuellement tous les fichiers `.otf` du dossier `Montserrat_Arabic_Font_Family_(Fontmirror)` vers `src/assets/fonts/montserrat-arabic/`

### 2. Vérifier l'Intégration

Les polices sont déjà configurées dans :
- ✅ `src/styles/globals.css` - Import des polices
- ✅ `tailwind.config.js` - Configuration Tailwind
- ✅ `src/assets/fonts/montserrat-arabic/fonts.css` - Définitions des polices

### 3. Tester les Polices

Pour voir une démonstration des polices, vous pouvez temporairement ajouter le composant `FontDemo` à votre application :

```tsx
// Dans App.tsx ou une page de test
import FontDemo from './components/FontDemo';

// Puis utiliser :
<FontDemo />
```

## 🎨 Utilisation des Polices

### En CSS
```css
.my-text {
  font-family: 'Montserrat Arabic', sans-serif;
  font-weight: 400; /* Regular */
}
```

### En Tailwind CSS
```html
<div class="font-montserrat-arabic font-medium">
  Texte en Montserrat Arabic Medium
</div>
```

### Classes utilitaires disponibles
- `.font-montserrat-arabic` - Police de base
- `.font-montserrat-arabic-thin` - Poids 250
- `.font-montserrat-arabic-extralight` - Poids 275
- `.font-montserrat-arabic-light` - Poids 300
- `.font-montserrat-arabic-regular` - Poids 400
- `.font-montserrat-arabic-medium` - Poids 500
- `.font-montserrat-arabic-semibold` - Poids 600
- `.font-montserrat-arabic-bold` - Poids 700
- `.font-montserrat-arabic-extrabold` - Poids 800
- `.font-montserrat-arabic-black` - Poids 900

## 📋 Poids Disponibles

| Poids | Nom | Utilisation Recommandée |
|-------|-----|------------------------|
| 250 | Thin | Éléments très fins, accents |
| 275 | ExtraLight | Textes très légers |
| 300 | Light | Textes secondaires |
| 400 | Regular | Texte principal |
| 500 | Medium | Sous-titres, navigation |
| 600 | SemiBold | Titres de section |
| 700 | Bold | Titres principaux |
| 800 | ExtraBold | Titres très importants |
| 900 | Black | Éléments très impactants |

## 🔧 Configuration Avancée

### Variables CSS
```css
:root {
  --font-arabic: 'Montserrat Arabic', sans-serif;
}
```

### Utilisation avec les variables
```css
.arabic-text {
  font-family: var(--font-arabic);
  font-weight: 500;
}
```

## 📝 Notes Importantes

1. **Performance** : Les polices utilisent `font-display: swap` pour un chargement optimisé
2. **Licence** : Vérifiez la licence des polices avant utilisation commerciale
3. **Support** : Cette police est optimisée pour les textes en arabe
4. **Fallback** : `sans-serif` est utilisé comme police de secours

## 🎯 Prochaines Étapes

1. Copiez les fichiers de police
2. Testez l'intégration
3. Utilisez les polices dans vos composants
4. Supprimez le composant `FontDemo` après les tests

## ❓ Support

Si vous rencontrez des problèmes :
1. Vérifiez que les fichiers `.otf` sont bien copiés
2. Redémarrez votre serveur de développement
3. Videz le cache du navigateur
4. Vérifiez la console pour les erreurs de chargement de police 
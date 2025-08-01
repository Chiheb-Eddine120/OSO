# Configuration du Logo OSO

## 🎯 Objectif
Intégrer le logo OSO dans le header avec une transition automatique selon l'état de scroll.

## 📁 Fichiers de Logo

```
src/assets/logos/
├── LogoBlanc350x70.png      # Logo blanc pour header normal
├── LogoCouleur700x140.png   # Logo couleur pour header scrolled
├── logo4K.png              # Logo haute résolution
└── logo.png                # Ancien logo (vide)
```

## 🎨 Comportement du Logo

### Header Normal (Non scrolled)
- **Fond** : Dégradé coloré OSO
- **Logo** : `LogoBlanc350x70.png` (blanc)
- **Position** : En haut de la page

### Header Scrolled
- **Fond** : Blanc avec ombre
- **Logo** : `LogoCouleur700x140.png` (couleur)
- **Position** : Après scroll de 20px

## 🔧 Configuration Technique

### Composant Header
```tsx
// Import des logos
import logoBlanc from '../assets/logos/LogoBlanc350x70.png';
import logoCouleur from '../assets/logos/LogoCouleur700x140.png';

// Utilisation conditionnelle
<img 
  src={isScrolled ? logoCouleur : logoBlanc} 
  alt="OSO Logo" 
  className="h-10 w-auto drop-shadow transition-all duration-300 hover:scale-105" 
  style={{ maxHeight: '40px' }}
/>
```

### CSS Styles
```css
.header-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--oso-white);
  text-decoration: none;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.header-logo.scrolled {
  color: var(--oso-black);
}
```

## 🚀 Test du Logo

### Routes de Test
- **Test des polices** : `/test-fonts`
- **Test du logo** : `/test-logo`

### Comment Tester
1. Visitez la page d'accueil (`/`)
2. Observez le logo blanc sur le dégradé
3. Scrollez vers le bas
4. Le logo devient coloré sur fond blanc
5. Remontez pour voir la transition inverse

## 📱 Responsive

### Desktop
- Logo : 40px de hauteur
- Texte "OSO" : Visible à côté du logo

### Mobile
- Logo : 40px de hauteur
- Texte "OSO" : Masqué (`hidden sm:inline`)

## 🎨 Personnalisation

### Taille du Logo
```tsx
// Modifier la hauteur
className="h-12 w-auto" // 48px au lieu de 40px
```

### Animation au Hover
```tsx
// Désactiver l'animation
className="h-10 w-auto drop-shadow" // Sans hover:scale-105
```

### Transition
```tsx
// Modifier la durée
className="h-10 w-auto drop-shadow transition-all duration-500" // Plus lent
```

## 📋 Spécifications Techniques

### Logo Blanc
- **Format** : PNG
- **Dimensions** : 350x70px
- **Usage** : Header normal (fond coloré)
- **Couleur** : Blanc pur (#FFFFFF)

### Logo Couleur
- **Format** : PNG
- **Dimensions** : 700x140px
- **Usage** : Header scrolled (fond blanc)
- **Couleur** : Couleurs OSO (dégradé)

## 🔄 Transitions

### Automatique
- **Déclencheur** : Scroll > 20px
- **Durée** : 300ms
- **Easing** : ease

### Manuel
- **Hover** : Scale 1.05
- **Durée** : 300ms
- **Easing** : ease

## 🎯 Prochaines Étapes

1. ✅ Logo intégré dans le header
2. ✅ Transition automatique configurée
3. ✅ Responsive design implémenté
4. ✅ Tests créés
5. 🔄 Tester sur différents navigateurs
6. 🔄 Optimiser les images si nécessaire

## ❓ Support

Si vous rencontrez des problèmes :
1. Vérifiez que les fichiers de logo existent
2. Testez la route `/test-logo`
3. Vérifiez la console pour les erreurs
4. Redémarrez le serveur de développement 
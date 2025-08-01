# Polices du Projet OSO

Ce dossier contient toutes les polices utilisées dans le projet OSO.

## Structure

```
fonts/
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
└── README.md                   # Ce fichier
```

## Montserrat Arabic

**Source :** [FontMirror - Montserrat Arabic](https://www.fontmirror.com/montserrat-arabic)

### Poids disponibles

- **250** - Thin
- **275** - ExtraLight  
- **300** - Light
- **400** - Regular
- **500** - Medium
- **600** - SemiBold
- **700** - Bold
- **800** - ExtraBold
- **900** - Black

### Utilisation

#### En CSS
```css
/* Import dans votre fichier CSS */
@import url('../assets/fonts/montserrat-arabic/fonts.css');

/* Utilisation */
.my-text {
  font-family: 'Montserrat Arabic', sans-serif;
  font-weight: 400; /* Regular */
}
```

#### Classes utilitaires disponibles
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

#### En Tailwind CSS
```html
<div class="font-montserrat-arabic font-medium">
  Texte en Montserrat Arabic Medium
</div>
```

## Ajout de nouvelles polices

1. Créez un nouveau dossier pour la famille de polices
2. Placez les fichiers de police dans ce dossier
3. Créez un fichier `fonts.css` avec les définitions `@font-face`
4. Mettez à jour ce README
5. Importez le fichier CSS dans votre projet

## Licence

Vérifiez toujours la licence des polices avant de les utiliser dans votre projet. 
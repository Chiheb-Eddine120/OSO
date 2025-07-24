# OSO - Organisation de Stages d'Orientation

## Description

OSO est une plateforme web moderne développée en React TypeScript qui facilite la mise en relation entre les jeunes et les professionnels pour des stages d'orientation. La plateforme permet aux jeunes de découvrir différents métiers et aux professionnels de partager leur expertise.

## Fonctionnalités principales

### Pour les jeunes
- **Inscription** : Création de profil avec autocomplétion des villes belges
- **Réservation de stage** : Processus en 4 étapes :
  1. Durée du stage (1-5 jours)
  2. Période (vacances scolaires)
  3. Localisation avec autocomplétion
  4. Rayon de recherche (5-40 km)
- **Sélection de métiers** : Choix parmi les métiers disponibles selon les critères
- **Paiement sécurisé** : Intégration de paiement (simulation pour les tests)
- **Suivi** : Espace personnel pour gérer les réservations

### Pour les professionnels
- **Inscription** : Création de profil professionnel détaillé
- **Gestion des disponibilités** : Calendrier pour indiquer les créneaux disponibles
- **Mise en relation** : Matching automatique avec les jeunes
- **Évaluation** : Retour d'expérience des jeunes stagiaires

## Technologies utilisées

- **Frontend** : React 18 + TypeScript
- **Styling** : CSS personnalisé avec variables CSS
- **Routing** : React Router DOM
- **Formulaires** : React Hook Form
- **Icônes** : Lucide React
- **Base de données** : Supabase (configuration prête)
- **Polices** : Montserrat + Noto Sans Arabic

## Charte graphique

### Couleurs
- **Pink** : #FF466E
- **Red-Orange** : #FF6450
- **Orange** : #FF963C
- **Light Orange** : #FFC864
- **Gradient** : Linear gradient des 4 couleurs

### Typographie
- **Primaire** : Montserrat
- **Secondaire** : Noto Sans Arabic

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # Navigation principale
│   └── CityAutocomplete.tsx  # Autocomplétion des villes
├── pages/              # Pages de l'application
│   ├── HomePage.tsx    # Page d'accueil jeunes
│   ├── ProHomePage.tsx # Page d'accueil professionnels
│   ├── StudentRegistration.tsx # Inscription jeunes
│   ├── ProfessionalRegistration.tsx # Inscription professionnels
│   ├── StageBooking.tsx # Réservation de stage
│   ├── PaymentPage.tsx # Page de paiement
│   ├── SuccessPage.tsx # Page de succès
│   ├── MyOSO.tsx       # Espace personnel
│   └── ContactPage.tsx # Page de contact
├── lib/                # Configuration et types
│   └── supabase.ts     # Configuration Supabase
├── types/              # Types TypeScript
│   └── cities.ts       # Types pour les villes
├── data/               # Données statiques
│   ├── assets/         # Images et logos
│   └── restructured_cities1.json # Base de données des villes belges
└── styles/             # Styles globaux
    └── globals.css     # CSS avec la charte graphique
```

## Installation et démarrage

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]

# Installer les dépendances
npm install

# Créer le fichier .env.local avec les variables Supabase
REACT_APP_SUPABASE_URL=votre_url_supabase
REACT_APP_SUPABASE_ANON_KEY=votre_clé_anon_supabase

# Démarrer le serveur de développement
npm start
```

### Variables d'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
REACT_APP_SUPABASE_URL=votre_url_supabase
REACT_APP_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

## Configuration Supabase

### Tables nécessaires

1. **users** : Profils utilisateurs
2. **students** : Informations spécifiques aux jeunes
3. **professionals** : Informations spécifiques aux professionnels
4. **stages** : Réservations de stages
5. **jobs** : Métiers proposés par les professionnels
6. **availabilities** : Disponibilités des professionnels

### Politiques de sécurité
- Authentification par email/mot de passe
- RLS (Row Level Security) activé
- Politiques personnalisées selon le type d'utilisateur

## Fonctionnalités avancées

### Autocomplétion des villes
- Base de données complète des villes belges
- Recherche par nom, code postal, région
- Normalisation des accents et caractères spéciaux
- Interface utilisateur intuitive

### Processus de réservation
- Interface étape par étape
- Validation en temps réel
- Sauvegarde automatique des données
- Messages d'avertissement clairs

### Système de paiement
- Intégration prête pour Stripe/PayPal
- Validation côté client et serveur
- Gestion des erreurs de paiement
- Confirmation automatique

## Déploiement

### Build de production
```bash
npm run build
```

### Variables d'environnement de production
```env
REACT_APP_SUPABASE_URL=votre_url_production
REACT_APP_SUPABASE_ANON_KEY=votre_clé_production
```

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Support

Pour toute question ou problème :
- Email : contact@oso.be
- Documentation : [lien-vers-docs]
- Issues : [lien-vers-issues]

## Roadmap

### Phase 1 (Actuelle)
- ✅ Interface utilisateur complète
- ✅ Système d'inscription
- ✅ Processus de réservation
- ✅ Intégration Supabase

### Phase 2
- 🔄 Système de paiement réel
- 🔄 Notifications email/SMS
- 🔄 Calendrier des disponibilités
- 🔄 Système d'évaluation

### Phase 3
- 📋 Application mobile
- 📋 API publique
- 📋 Intégrations tierces
- 📋 Analytics avancées

# Configuration Supabase pour OSO

## 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL et votre clé anon

## 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Configurer la base de données

1. Allez dans l'éditeur SQL de votre projet Supabase
2. Copiez et exécutez le contenu du fichier `supabase-setup.sql`
3. Vérifiez que toutes les tables ont été créées

## 4. Configurer l'authentification

1. Dans le dashboard Supabase, allez dans **Authentication > Settings**
2. Activez **Email confirmations** si nécessaire
3. Configurez les **Site URL** et **Redirect URLs** :
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

## 5. Tester la configuration

1. Démarrez votre application : `npm start`
2. Testez l'inscription d'un utilisateur
3. Vérifiez que les données sont bien créées dans Supabase

## 6. Structure des tables

### users
- `id` : UUID (référence auth.users)
- `email` : TEXT
- `first_name` : TEXT
- `last_name` : TEXT
- `phone` : TEXT
- `address` : TEXT
- `postal_code` : TEXT
- `city` : TEXT
- `user_type` : TEXT ('student' ou 'professional')

### students
- `id` : UUID
- `user_id` : UUID (référence users)
- `gender` : TEXT

### professionals
- `id` : UUID
- `user_id` : UUID (référence users)
- `job_title` : TEXT
- `company_name` : TEXT
- `job_description` : TEXT
- `academic_background` : TEXT
- `motivation_text` : TEXT

### stages
- `id` : UUID
- `student_id` : UUID (référence students)
- `duration` : INTEGER
- `period` : TEXT
- `location` : TEXT
- `max_distance` : INTEGER
- `selected_jobs` : TEXT[]
- `status` : TEXT
- `payment_status` : TEXT

## 7. Politiques de sécurité (RLS)

Toutes les tables ont des politiques RLS activées :
- Les utilisateurs ne peuvent voir/modifier que leurs propres données
- Les métiers sont publics en lecture
- Les stages sont privés par utilisateur

## 8. Fonctionnalités implémentées

### Authentification
- ✅ Inscription avec création automatique du profil
- ✅ Connexion/déconnexion
- ✅ Gestion de l'état utilisateur global
- ✅ Protection des routes

### Gestion des données
- ✅ Création de profils jeunes/professionnels
- ✅ Réservation de stages
- ✅ Récupération des métiers disponibles
- ✅ Gestion des disponibilités

### Interface utilisateur
- ✅ Header dynamique selon l'état de connexion
- ✅ Navigation conditionnelle
- ✅ Messages d'erreur et de succès

## 9. Prochaines étapes

1. **Tester l'inscription** d'un jeune et d'un professionnel
2. **Tester la réservation** d'un stage
3. **Implémenter le système de paiement** réel
4. **Ajouter les notifications** email/SMS
5. **Créer le calendrier** des disponibilités

## 10. Dépannage

### Erreur de connexion
- Vérifiez vos clés Supabase dans `.env.local`
- Redémarrez l'application après modification

### Erreur de base de données
- Vérifiez que le script SQL a été exécuté complètement
- Vérifiez les politiques RLS dans Supabase

### Erreur d'authentification
- Vérifiez la configuration des URLs dans Supabase
- Vérifiez que l'email est confirmé si nécessaire 
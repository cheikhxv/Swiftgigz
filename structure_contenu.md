# Structure et contenu du site web multilingue Swiftgigz

## Arborescence du site

```
swiftgigz.com/
├── [langue]/                      # /fr/, /nl/, /en/
│   ├── index.html                 # Page d'accueil
│   ├── travailleurs/              # Section pour les travailleurs
│   │   └── index.html
│   ├── employeurs/                # Section pour les employeurs
│   │   └── index.html
│   ├── fonctionnement/            # Comment ça marche
│   │   └── index.html
│   ├── tarifs/                    # Tarification
│   │   └── index.html
│   ├── preinscription/            # Formulaire de préinscription
│   │   └── index.html
│   ├── blog/                      # Blog et actualités
│   │   ├── index.html             # Liste des articles
│   │   └── [article-slug]/        # Articles individuels
│   │       └── index.html
│   ├── faq/                       # Questions fréquentes
│   │   └── index.html
│   ├── a-propos/                  # À propos de nous
│   │   └── index.html
│   ├── contact/                   # Page de contact
│   │   └── index.html
│   ├── mentions-legales/          # Mentions légales
│   │   └── index.html
│   ├── politique-confidentialite/ # Politique de confidentialité
│   │   └── index.html
│   └── conditions-utilisation/    # CGU
│       └── index.html
└── api/                           # Endpoints pour formulaires et fonctionnalités dynamiques
    ├── preinscription/
    └── contact/
```

## Contenu détaillé par page

### Page d'accueil (index.html)

**Objectif** : Présenter clairement le concept et inciter à l'action

**Sections** :
1. **Hero section**
   - Titre accrocheur : "Trouvez un job ou un travailleur en quelques minutes"
   - Sous-titre explicatif : "Swiftgigz connecte travailleurs et employeurs pour des missions ponctuelles en Belgique"
   - Boutons d'appel à l'action : "Je cherche un job" et "Je cherche un travailleur"
   - Visuel principal : Illustration/animation montrant le concept

2. **Comment ça marche**
   - Processus en 3 étapes pour les travailleurs
   - Processus en 3 étapes pour les employeurs
   - Illustration simplifiée du matching en temps réel
   - Lien vers la page détaillée "Fonctionnement"

3. **Avantages clés**
   - Pour les travailleurs : Flexibilité, revenus complémentaires, paiement rapide
   - Pour les employeurs : Réactivité, simplicité, qualité des profils
   - Témoignages (à ajouter après lancement)

4. **Secteurs d'activité**
   - Focus sur l'HORECA avec illustrations
   - Autres secteurs à venir (événementiel, commerce, etc.)

5. **Préinscription**
   - Mini-formulaire simplifié ou bouton vers la page de préinscription
   - Compteur de préinscrits (à implémenter)

6. **Actualités**
   - 2-3 derniers articles du blog
   - Lien vers la section blog complète

7. **Footer**
   - Liens vers pages légales
   - Sélecteur de langue
   - Réseaux sociaux
   - Copyright

### Section Travailleurs

**Objectif** : Convaincre les travailleurs potentiels de s'inscrire

**Sections** :
1. **Hero section**
   - Titre : "Trouvez des missions qui s'adaptent à votre vie"
   - Sous-titre : "Travaillez quand vous voulez, où vous voulez"
   - Visuel : Personne utilisant l'application sur smartphone

2. **Avantages détaillés**
   - Flexibilité horaire
   - Choix des missions
   - Paiement rapide et sécurisé
   - Évaluations et réputation
   - Développement professionnel

3. **Comment ça marche pour les travailleurs**
   - Inscription et vérification
   - Configuration du profil et disponibilités
   - Recherche et acceptation de missions
   - Réalisation et validation
   - Paiement

4. **Témoignages** (à ajouter après lancement)
   - Histoires de réussite
   - Citations de travailleurs satisfaits

5. **FAQ spécifique**
   - Questions fréquentes des travailleurs
   - Lien vers FAQ complète

6. **Appel à l'action**
   - Formulaire de préinscription simplifié
   - Ou bouton vers page de préinscription complète

### Section Employeurs

**Objectif** : Convaincre les employeurs de la valeur ajoutée du service

**Sections** :
1. **Hero section**
   - Titre : "Personnel qualifié à la demande"
   - Sous-titre : "Trouvez le bon profil en quelques minutes"
   - Visuel : Interface employeur de l'application

2. **Problèmes résolus**
   - Absences imprévues
   - Pics d'activité
   - Recrutement chronophage
   - Paperasse administrative

3. **Avantages détaillés**
   - Réactivité et rapidité
   - Profils vérifiés et évalués
   - Simplicité administrative
   - Flexibilité sans engagement
   - Coût transparent

4. **Comment ça marche pour les employeurs**
   - Inscription entreprise
   - Publication d'une mission
   - Sélection du candidat
   - Suivi de la mission
   - Évaluation et paiement

5. **Tarification**
   - Aperçu simplifié des tarifs
   - Lien vers page tarifs détaillée

6. **Témoignages** (à ajouter après lancement)
   - Citations d'employeurs satisfaits
   - Études de cas par secteur

7. **Appel à l'action**
   - Formulaire de contact business
   - Ou bouton vers page de préinscription

### Page Fonctionnement

**Objectif** : Expliquer en détail le processus d'utilisation

**Sections** :
1. **Introduction**
   - Présentation générale du concept
   - Vidéo explicative

2. **Pour les travailleurs**
   - Étape 1 : Inscription et vérification
   - Étape 2 : Configuration du profil
   - Étape 3 : Recherche de missions
   - Étape 4 : Réalisation et validation
   - Étape 5 : Paiement et évaluation

3. **Pour les employeurs**
   - Étape 1 : Inscription entreprise
   - Étape 2 : Publication d'une mission
   - Étape 3 : Sélection du candidat
   - Étape 4 : Suivi de la mission
   - Étape 5 : Validation et paiement

4. **Algorithme de matching**
   - Explication simplifiée du fonctionnement
   - Critères pris en compte
   - Avantages du système

5. **Système de paiement**
   - Sécurité et transparence
   - Processus de validation
   - Délais de paiement

6. **Système d'évaluation**
   - Évaluation bidirectionnelle
   - Impact sur la visibilité
   - Garantie de qualité

7. **FAQ liée au fonctionnement**
   - Questions techniques fréquentes
   - Lien vers FAQ complète

### Page Tarifs

**Objectif** : Présenter clairement la structure tarifaire

**Sections** :
1. **Introduction**
   - Philosophie de tarification
   - Transparence et simplicité

2. **Tarifs pour les employeurs**
   - Commission standard (%)
   - Options premium
   - Exemples concrets avec calculs

3. **Tarifs pour les travailleurs**
   - Commission standard (%)
   - Options premium
   - Exemples de revenus nets

4. **Comparaison des formules**
   - Tableau comparatif des différentes options
   - Avantages de chaque formule

5. **FAQ liée aux tarifs**
   - Questions fréquentes sur la tarification
   - Clarifications sur les commissions

6. **Appel à l'action**
   - Contact pour informations supplémentaires
   - Préinscription

### Page Préinscription

**Objectif** : Collecter les informations des utilisateurs intéressés

**Sections** :
1. **Introduction**
   - Explication de l'intérêt de se préinscrire
   - Avantages des premiers inscrits

2. **Choix du profil**
   - Sélection : Travailleur ou Employeur

3. **Formulaire Travailleur**
   - Informations personnelles (nom, prénom, email, téléphone)
   - Secteurs d'activité d'intérêt
   - Disponibilités générales
   - Zone géographique

4. **Formulaire Employeur**
   - Informations entreprise (nom, secteur, taille)
   - Informations contact (nom, fonction, email, téléphone)
   - Types de besoins en personnel
   - Fréquence estimée d'utilisation

5. **Confirmation et prochaines étapes**
   - Message de confirmation
   - Explication des prochaines étapes
   - Invitation à suivre sur les réseaux sociaux

### Page FAQ

**Objectif** : Répondre aux questions fréquentes des utilisateurs

**Sections** :
1. **Questions générales**
   - Qu'est-ce que Swiftgigz ?
   - Comment fonctionne le service ?
   - Quand sera lancée l'application ?
   - Dans quelles régions le service est-il disponible ?

2. **Questions des travailleurs**
   - Comment s'inscrire ?
   - Quels types de missions sont proposés ?
   - Comment sont calculés les paiements ?
   - Quelles sont les obligations fiscales ?
   - Comment fonctionne le système d'évaluation ?

3. **Questions des employeurs**
   - Comment publier une mission ?
   - Comment sont sélectionnés les travailleurs ?
   - Quelles garanties de qualité ?
   - Quels sont les délais moyens pour trouver quelqu'un ?
   - Aspects juridiques et administratifs

4. **Questions techniques**
   - Compatibilité des appareils
   - Sécurité des données
   - Support technique

5. **Formulaire pour questions supplémentaires**
   - Possibilité de poser une question non listée

### Page À propos

**Objectif** : Présenter l'équipe et la vision du projet

**Sections** :
1. **Notre histoire**
   - Genèse du projet
   - Problème identifié
   - Solution développée

2. **Notre vision**
   - Mission et valeurs
   - Objectifs à long terme
   - Impact social visé

3. **L'équipe**
   - Présentation des fondateurs
   - Parcours et expertise
   - Photo et courte bio

4. **Nos partenaires** (à développer)
   - Investisseurs
   - Partenaires technologiques
   - Partenaires sectoriels

5. **Couverture médiatique** (à développer)
   - Articles de presse
   - Interviews
   - Distinctions

### Page Contact

**Objectif** : Permettre aux utilisateurs de contacter l'équipe

**Sections** :
1. **Formulaire de contact**
   - Nom, email, sujet, message
   - Sélection du département (support, commercial, presse, etc.)

2. **Informations de contact**
   - Email général
   - Numéro de téléphone (si disponible)
   - Adresse (si applicable)

3. **Réseaux sociaux**
   - Liens vers les différentes plateformes
   - Invitation à suivre

4. **FAQ rapide**
   - Lien vers les questions les plus fréquentes
   - Suggestion de consulter la FAQ avant de contacter

### Pages légales

**Objectif** : Fournir les informations légales obligatoires

**Pages** :
1. **Mentions légales**
   - Informations sur la société
   - Hébergement du site
   - Directeur de publication

2. **Politique de confidentialité**
   - Collecte et utilisation des données
   - Cookies et traceurs
   - Droits des utilisateurs
   - Conformité RGPD

3. **Conditions générales d'utilisation**
   - Conditions d'accès au service
   - Responsabilités
   - Propriété intellectuelle
   - Loi applicable et juridiction

## Stratégie de contenu multilingue

### Approche de traduction

1. **Contenu de base identique**
   - Structure et messages clés identiques dans toutes les langues
   - Adaptation culturelle minimale pour maintenir la cohérence

2. **Adaptations spécifiques**
   - Exemples et cas d'usage adaptés au contexte linguistique
   - Témoignages spécifiques à chaque région linguistique (quand disponibles)
   - Références culturelles adaptées

3. **SEO multilingue**
   - Mots-clés recherchés spécifiques à chaque langue
   - Méta-descriptions optimisées par langue
   - Contenu SEO adapté aux habitudes de recherche par région

### Organisation des fichiers de traduction

1. **Structure par langue**
   - Fichiers JSON séparés pour chaque langue
   - Organisation par sections et pages
   - Système de clés cohérent

2. **Exemple de structure**
```
/translations
├── fr.json
├── nl.json
└── en.json
```

3. **Exemple de contenu**
```json
{
  "home": {
    "hero": {
      "title": "Trouvez un job ou un travailleur en quelques minutes",
      "subtitle": "Swiftgigz connecte travailleurs et employeurs pour des missions ponctuelles en Belgique",
      "cta_worker": "Je cherche un job",
      "cta_employer": "Je cherche un travailleur"
    },
    // autres sections
  },
  // autres pages
}
```

### Processus de traduction et maintenance

1. **Création initiale**
   - Rédaction du contenu en français (langue principale)
   - Traduction professionnelle vers le néerlandais et l'anglais
   - Révision par des locuteurs natifs

2. **Mise à jour**
   - Système de marquage des contenus modifiés
   - Processus de traduction des nouveaux contenus
   - Vérification régulière de la cohérence

3. **Contrôle qualité**
   - Vérification technique (balises, variables)
   - Vérification linguistique
   - Test utilisateur dans chaque langue

## Plan de contenu initial

### Phase 1 : Lancement du site (contenu minimal viable)

**Pages prioritaires** :
- Page d'accueil
- Pages Travailleurs et Employeurs
- Page Fonctionnement
- Page Préinscription
- Pages légales obligatoires

**Contenu** :
- Textes essentiels expliquant le concept
- Illustrations simples du processus
- Formulaires de préinscription
- FAQ de base

### Phase 2 : Enrichissement (1-2 mois après lancement)

**Ajouts** :
- Blog avec 5-10 articles initiaux
- Témoignages (si disponibles)
- FAQ étendue
- Contenu plus détaillé sur le fonctionnement

### Phase 3 : Expansion (3-6 mois après lancement)

**Ajouts** :
- Études de cas
- Vidéos explicatives
- Témoignages vidéo
- Contenu spécifique par secteur d'activité

## Recommandations pour la mise en œuvre

1. **Approche "Content-first"**
   - Développer d'abord le contenu en français
   - Valider la structure et les messages clés
   - Puis traduire vers les autres langues

2. **Système de gestion de contenu**
   - Utiliser un système permettant la gestion facile des traductions
   - Prévoir des alertes pour les contenus non traduits
   - Faciliter la mise à jour simultanée dans toutes les langues

3. **Collaboration avec traducteurs**
   - Briefing détaillé sur le ton et le style
   - Glossaire des termes techniques
   - Processus de validation et feedback

4. **Tests utilisateurs multilingues**
   - Tester le site avec des utilisateurs de chaque groupe linguistique
   - Vérifier la compréhension et la pertinence culturelle
   - Ajuster en fonction des retours

Cette structure et ce plan de contenu serviront de base pour la création des maquettes et le développement du site. Ils pourront être ajustés en fonction des retours et des évolutions du projet.

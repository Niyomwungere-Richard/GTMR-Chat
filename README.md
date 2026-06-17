# GTMR Chat

Une application de chat social moderne avec messagerie en temps réel, fil d'actualité, suggestions de contenu par IA, et authentification utilisateur.

---

## Aperçu

GTMR Chat est une plateforme sociale complète qui combine :
- **Messagerie instantanée** entre utilisateurs en temps réel
- **Fil d'actualité** avec création et consultation de posts
- **Suggestions de contenu** générées par intelligence artificielle (Gemini 2.0 Flash)
- **Profils utilisateurs** avec gestion de compte
- **Système de notifications** pour les interactions sociales

---

## Stack technique

| Couche | Technologie |
|--------|------------|
| Framework | Next.js 15.3 (App Router) |
| Langage | TypeScript 5 |
| UI | Tailwind CSS + shadcn/ui + Radix UI |
| Base de données | Firebase Firestore |
| Authentification | Firebase Auth |
| IA | Genkit + Google Gemini 2.0 Flash |
| Formulaires | React Hook Form + Zod |
| Icônes | Lucide React |

---

## Prérequis

- [Node.js](https://nodejs.org) v18 ou supérieur
- [npm](https://www.npmjs.com) v9 ou supérieur
- Un projet [Firebase](https://console.firebase.google.com) avec Firestore et Authentication activés
- Une clé API [Google AI Studio](https://aistudio.google.com/app/apikey) pour les fonctionnalités IA

---

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd GTMR-Chat
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Crée un fichier `.env.local` à la racine du projet :

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=ta_cle_api
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ton_projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ton_projet_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ton_projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=ton_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=ton_app_id

# Google AI (Genkit)
GOOGLE_GENAI_API_KEY=ta_cle_google_ai
```

> Les clés Firebase se trouvent dans **Firebase Console > Paramètres du projet > Vos applications > Config Web**.

### 4. Lancer en développement

```bash
npm run dev
```

L'application est disponible sur **http://localhost:9002**

---

## Scripts disponibles

```bash
npm run dev          # Démarre le serveur de développement (port 9002)
npm run build        # Compile l'application pour la production
npm run start        # Lance la version de production
npm run lint         # Vérifie la qualité du code
npm run typecheck    # Vérifie les types TypeScript
npm run genkit:dev   # Lance l'interface Genkit AI pour les flows IA
```

---

## Structure du projet

```
src/
├── app/                    # Pages (Next.js App Router)
│   ├── page.tsx            # Fil d'actualité
│   ├── chat/               # Messagerie
│   ├── profile/            # Profil utilisateur
│   ├── notifications/      # Notifications
│   ├── login/              # Connexion
│   └── signup/             # Inscription
│
├── components/             # Composants React réutilisables
│   ├── Header.tsx          # Navigation principale
│   ├── PostCard.tsx        # Affichage d'un post
│   ├── CreatePostForm.tsx  # Création de post
│   ├── chat/               # Composants messagerie
│   └── ui/                 # Composants shadcn/ui
│
├── lib/
│   ├── firebase.ts         # Configuration Firebase
│   ├── firestoreService.ts # Opérations base de données
│   ├── authService.ts      # Authentification
│   └── types.ts            # Types TypeScript
│
├── context/
│   └── AuthContext.tsx     # Contexte d'authentification global
│
├── hooks/                  # Hooks React personnalisés
│
└── ai/
    ├── genkit.ts           # Configuration Genkit
    └── flows/              # Flows d'intelligence artificielle
```

---

## Fonctionnalités

### Authentification
- Inscription et connexion par email/mot de passe via Firebase Auth
- Routes protégées avec redirection automatique
- Contexte global d'utilisateur connecté

### Fil d'actualité
- Création de posts texte
- Affichage chronologique inversé
- Recherche de posts et d'utilisateurs

### Messagerie
- Conversations one-to-one en temps réel via Firestore
- Affichage des messages avec horodatage
- Interface responsive (liste / chat selon la taille d'écran)

### Profils utilisateurs
- Page de profil avec avatar, nom et biographie
- Onglets : Posts, À propos, Amis, Photos

### Intelligence artificielle
- Suggestions de contenu personnalisées via Genkit et Gemini 2.0 Flash
- Intégration via Server Actions Next.js

---

## Contribuer

Ce projet est ouvert aux contributions. Consulte le fichier [CONTRIBUTING.md](CONTRIBUTING.md) pour :
- Les étapes d'installation pour les contributeurs
- Le workflow Git (branches, commits, pull requests)
- Les conventions de code
- La liste des fonctionnalités prioritaires à implémenter

---

## Roadmap

- [ ] Likes et commentaires sur les posts
- [ ] Upload d'images (Firebase Storage)
- [ ] Connexion via Google OAuth
- [ ] Système de notifications temps réel
- [ ] Système Follow / Amis
- [ ] Édition du profil utilisateur
- [ ] Indicateur de statut "En ligne"
- [ ] Tests unitaires et d'intégration

---

## Licence

Ce projet est sous licence **MIT**.

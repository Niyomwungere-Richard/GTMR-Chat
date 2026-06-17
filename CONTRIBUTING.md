# Guide du Contributeur — GTMR Chat

Bienvenue ! Ce document explique pas à pas comment contribuer au projet **GTMR Chat**, une application de chat social construite avec Next.js, Firebase et Genkit AI.

---

## Table des matières

1. [Prérequis](#1-prérequis)
2. [Installation locale](#2-installation-locale)
3. [Configuration de l'environnement](#3-configuration-de-lenvironnement)
4. [Structure du projet](#4-structure-du-projet)
5. [Workflow de contribution](#5-workflow-de-contribution)
6. [Conventions de code](#6-conventions-de-code)
7. [Fonctionnalités prioritaires à contribuer](#7-fonctionnalités-prioritaires-à-contribuer)
8. [Commandes utiles](#8-commandes-utiles)
9. [Ressources](#9-ressources)

---

## 1. Prérequis

Avant de commencer, assure-toi d'avoir installé :

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| **Node.js** | v18+ | `node --version` |
| **npm** | v9+ | `npm --version` |
| **Git** | v2.30+ | `git --version` |

Un compte **Firebase** est nécessaire pour la base de données et l'authentification.  
Un compte **Google AI Studio** est nécessaire pour les fonctionnalités IA (Gemini).

---

## 2. Installation locale

### Étape 1 — Cloner le dépôt

```bash
git clone <url-du-repo>
cd GTMR-Chat
```

### Étape 2 — Installer les dépendances

```bash
npm install
```

### Étape 3 — Lancer l'application en développement

```bash
npm run dev
```

L'application tourne sur **http://localhost:9002**

---

## 3. Configuration de l'environnement

### Étape 1 — Créer le fichier `.env.local`

Crée un fichier `.env.local` à la racine du projet (ne jamais le committer) :

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

### Étape 2 — Obtenir les clés Firebase

1. Va sur [Firebase Console](https://console.firebase.google.com)
2. Crée ou ouvre ton projet
3. **Paramètres du projet** > **Vos applications** > **Config Web**
4. Copie les valeurs dans `.env.local`

### Étape 3 — Activer les services Firebase

Dans la console Firebase, active :
- **Authentication** > Email/Mot de passe
- **Firestore Database** > Créer en mode test

### Étape 4 — Clé Google AI (pour Genkit)

1. Va sur [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Génère une clé API
3. Ajoute-la dans `.env.local` sous `GOOGLE_GENAI_API_KEY`

---

## 4. Structure du projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx            # Fil d'actualité (Feed)
│   ├── chat/page.tsx       # Messagerie
│   ├── profile/page.tsx    # Profil utilisateur
│   ├── notifications/      # Notifications
│   ├── login/              # Connexion
│   └── signup/             # Inscription
│
├── components/             # Composants React réutilisables
│   ├── Header.tsx          # Navigation principale
│   ├── PostCard.tsx        # Carte d'un post
│   ├── CreatePostForm.tsx  # Formulaire de création de post
│   ├── chat/               # Composants de la messagerie
│   └── ui/                 # Composants shadcn/ui (ne pas modifier)
│
├── lib/
│   ├── firebase.ts         # Configuration Firebase
│   ├── firestoreService.ts # Toutes les opérations base de données
│   ├── authService.ts      # Authentification
│   ├── types.ts            # Types TypeScript
│   └── data.ts             # Données mock (temporaires)
│
├── context/
│   └── AuthContext.tsx     # Contexte global d'authentification
│
├── hooks/                  # Hooks React personnalisés
│
└── ai/
    ├── genkit.ts           # Configuration Genkit AI
    └── flows/              # Flows d'intelligence artificielle
```

---

## 5. Workflow de contribution

### Étape 1 — Choisir une tâche

Consulte la section [Fonctionnalités prioritaires](#7-fonctionnalités-prioritaires-à-contribuer) ci-dessous et choisis une tâche adaptée à ton niveau.

### Étape 2 — Créer une branche

Utilise la convention de nommage suivante :

```bash
# Pour une nouvelle fonctionnalité
git checkout -b feature/nom-de-la-fonctionnalite

# Pour un correctif
git checkout -b fix/description-du-bug

# Pour de la qualité/refactoring
git checkout -b chore/description
```

**Exemples :**
```bash
git checkout -b feature/like-posts
git checkout -b fix/conversation-search
git checkout -b chore/add-tests-auth
```

### Étape 3 — Développer

- Écris ton code en respectant les [conventions](#6-conventions-de-code)
- Teste manuellement dans le navigateur sur `http://localhost:9002`
- Vérifie les types TypeScript : `npm run typecheck`
- Vérifie le lint : `npm run lint`

### Étape 4 — Committer

```bash
git add src/components/PostCard.tsx src/lib/firestoreService.ts
git commit -m "feat: add like/unlike functionality on posts"
```

**Format des messages de commit :**

| Préfixe | Usage |
|---------|-------|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `chore:` | Maintenance, config, dépendances |
| `refactor:` | Refactoring sans changement de comportement |
| `test:` | Ajout ou modification de tests |
| `docs:` | Documentation uniquement |

### Étape 5 — Pousser et ouvrir une Pull Request

```bash
git push origin feature/nom-de-la-fonctionnalite
```

Dans la PR, décris :
- **Quoi** : ce que tu as implémenté
- **Pourquoi** : la valeur ajoutée
- **Comment tester** : les étapes pour vérifier le changement

---

## 6. Conventions de code

### TypeScript

- Toujours typer les props des composants avec une `interface`
- Éviter `any` — utiliser les types de `src/lib/types.ts`
- Ne pas ignorer les erreurs TypeScript

```typescript
// Bien
interface PostCardProps {
  post: Post;
  currentUser: User;
}

// À éviter
const PostCard = (props: any) => { ... }
```

### Composants React

- Un composant = un fichier
- Noms en **PascalCase** pour les composants (`PostCard.tsx`)
- Noms en **camelCase** pour les hooks (`useConversations.ts`)
- Préférer les composants fonctionnels avec hooks

### Firestore

- Toutes les opérations base de données passent par `src/lib/firestoreService.ts`
- Ne jamais appeler Firebase directement depuis un composant

```typescript
// Bien — via le service
import { likePost } from '@/lib/firestoreService';

// À éviter — appel direct
import { doc, updateDoc } from 'firebase/firestore';
```

### Styles

- Utiliser **Tailwind CSS** uniquement (pas de CSS inline)
- Utiliser les composants `src/components/ui/` pour les éléments de base (boutons, inputs, etc.)
- Respecter la palette de couleurs existante définie dans `tailwind.config.ts`

---

## 7. Fonctionnalités prioritaires à contribuer

### Niveau Débutant

- [ ] **Recherche dans les conversations** — câbler l'input de recherche dans `src/components/chat/ConversationList.tsx`
- [ ] **Lien "Mot de passe oublié"** — implémenter Firebase `sendPasswordResetEmail` dans `src/app/login/page.tsx`
- [ ] **Indicateur de chargement** — ajouter des skeletons/spinners sur les pages qui chargent des données

### Niveau Intermédiaire

- [ ] **Likes sur les posts** — ajouter handlers + collection Firestore dans `src/components/PostCard.tsx`
- [ ] **Édition du profil** — connecter le formulaire "Save Changes" dans `src/app/profile/page.tsx`
- [ ] **Connexion Google** — activer et implémenter `GoogleAuthProvider` dans `src/lib/authService.ts`
- [ ] **Statut "En ligne"** — remplacer le statut codé en dur dans `src/components/chat/ChatWindow.tsx`

### Niveau Avancé

- [ ] **Upload d'images** — intégrer Firebase Storage dans `src/components/CreatePostForm.tsx`
- [ ] **Système de notifications réel** — créer une collection Firestore + listeners temps réel
- [ ] **Système Follow/Amis** — créer la logique de relations entre utilisateurs
- [ ] **Commentaires sur les posts** — implémenter la sous-collection `comments` dans Firestore
- [ ] **Tests unitaires** — configurer Vitest et écrire des tests pour les services et composants

### Qualité & Infrastructure

- [ ] **Sécurité** — déplacer les clés Firebase vers `.env.local` (actuellement dans `src/lib/firebase.ts`)
- [ ] **TypeScript strict** — supprimer `ignoreBuildErrors: true` dans `next.config.ts` et corriger les erreurs
- [ ] **Accessibilité** — ajouter des labels ARIA sur les éléments interactifs
- [ ] **Pagination** — implémenter le chargement progressif du fil d'actualité

---

## 8. Commandes utiles

```bash
# Lancer l'app en développement (port 9002)
npm run dev

# Vérifier les types TypeScript
npm run typecheck

# Lancer le linter
npm run lint

# Builder pour la production
npm run build

# Lancer l'interface Genkit AI (pour développer les flows IA)
npm run genkit:dev
```

---

## 9. Ressources

| Ressource | Lien |
|-----------|------|
| Next.js 15 — App Router | https://nextjs.org/docs/app |
| Firebase Firestore | https://firebase.google.com/docs/firestore |
| Firebase Auth | https://firebase.google.com/docs/auth |
| Firebase Storage | https://firebase.google.com/docs/storage |
| Tailwind CSS | https://tailwindcss.com/docs |
| shadcn/ui | https://ui.shadcn.com/docs |
| Genkit AI | https://firebase.google.com/docs/genkit |
| Zod (validation) | https://zod.dev |
| React Hook Form | https://react-hook-form.com/docs |

---

> Pour toute question, ouvre une **Issue** sur le dépôt en décrivant ton problème ou ta proposition d'amélioration.

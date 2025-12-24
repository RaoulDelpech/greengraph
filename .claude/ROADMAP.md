# GreenGraph - Roadmap de Développement

**Version:** 1.0
**Date:** 2025-12-24
**Auteur:** Lalou

---

## Phase 1 : Fondations (Priorité critique)

### 1.1 Initialisation projet
- [ ] Créer projet Vite + React + TypeScript
- [ ] Configurer TailwindCSS
- [ ] Configurer ESLint + Prettier
- [ ] Structure des dossiers selon spécifications
- [ ] Créer README.md

### 1.2 Système de données
- [ ] Créer les types TypeScript (Definition, Source, Relation)
- [ ] Créer le fichier index.json des catégories
- [ ] Créer 3 fichiers JSON de catégories (squelette)
- [ ] Hook useDefinitions pour charger les données
- [ ] Tests manuels du chargement

### 1.3 Layout de base
- [ ] Composant MainLayout (header + sidebar + main)
- [ ] Header avec titre et barre de recherche
- [ ] Sidebar pour les catégories
- [ ] Zone principale pour le graphe
- [ ] Style nature/écologie (palette verte/bleue)

---

## Phase 2 : Visualisation graphe

### 2.1 Installation React Flow
- [ ] npm install reactflow
- [ ] Composant GraphView basique
- [ ] Affichage des noeuds (définitions)
- [ ] Affichage des arêtes (relations)

### 2.2 Noeuds personnalisés
- [ ] Composant DefinitionNode
- [ ] Couleur selon catégorie
- [ ] Affichage terme + preview définition
- [ ] Hover state avec highlight relations

### 2.3 Arêtes personnalisées
- [ ] Composant RelationEdge
- [ ] 5 styles différents selon type de relation
- [ ] Épaisseur/opacité selon score de proximité
- [ ] Labels optionnels sur les arêtes

### 2.4 Interactions graphe
- [ ] Clic sur noeud → sélection
- [ ] Double-clic → ouvre DefinitionPanel
- [ ] Zoom / Pan
- [ ] Filtrage par catégorie
- [ ] Centrage automatique sur noeud sélectionné

---

## Phase 3 : Panneau de définition

### 3.1 Composant DefinitionPanel
- [ ] Layout slide-in depuis la droite
- [ ] En-tête avec terme + badge catégorie
- [ ] Section définition (texte principal)
- [ ] Bouton fermer

### 3.2 Section sources
- [ ] Liste des sources avec type (article, livre, etc.)
- [ ] Liens cliquables si URL disponible
- [ ] Formatage bibliographique

### 3.3 Section relations
- [ ] Groupement par type de relation
- [ ] Liens cliquables vers autres définitions
- [ ] Indication visuelle du score de proximité

### 3.4 Sections optionnelles
- [ ] Exemples (liste à puces)
- [ ] Synonymes (tags)

---

## Phase 4 : Recherche hybride

### 4.1 Recherche full-text
- [ ] npm install fuse.js
- [ ] Index Fuse.js sur terme + definition + tags + synonymes
- [ ] Composant SearchBar
- [ ] Affichage résultats avec highlights
- [ ] Debounce 200ms

### 4.2 Intégration Mistral embeddings
- [ ] Client API Mistral (src/utils/mistralClient.ts)
- [ ] Gestion clé API (localStorage + settings)
- [ ] Fonction getEmbedding(text)
- [ ] Pré-calcul embeddings des définitions
- [ ] Cache localStorage des embeddings

### 4.3 Recherche sémantique
- [ ] Fonction searchSemantic(query)
- [ ] Calcul cosine similarity
- [ ] Ranking des résultats
- [ ] Enrichissement auto si < 5 résultats full-text

### 4.4 UX recherche
- [ ] Autocomplétion
- [ ] Indication du type de match (exact/fulltext/semantic)
- [ ] Navigation clavier dans les résultats
- [ ] Clic résultat → sélection dans graphe

---

## Phase 5 : Chat intelligent

### 5.1 Interface chat
- [ ] Composant ChatPanel
- [ ] Zone messages (scroll)
- [ ] Input avec bouton envoi
- [ ] Indicateur "en train d'écrire"

### 5.2 Intégration Mistral chat
- [ ] Fonction sendChatMessage(message, context)
- [ ] Prompt système (réponses basées sur définitions)
- [ ] Streaming de la réponse
- [ ] Gestion erreurs API

### 5.3 Contexte intelligent
- [ ] Recherche sémantique des définitions pertinentes
- [ ] Injection top 5-10 définitions dans le prompt
- [ ] Formatage du contexte

### 5.4 Citations cliquables
- [ ] Parsing des [termes] dans la réponse
- [ ] Transformation en liens cliquables
- [ ] Navigation vers la définition au clic

---

## Phase 6 : Contenu (50-70 définitions)

### 6.1 Catégories à créer
- [ ] Économie circulaire (~12 définitions)
- [ ] Gestion des déchets (~10 définitions)
- [ ] Biodiversité (~10 définitions)
- [ ] Énergie & climat (~10 définitions)
- [ ] Ressources en eau (~8 définitions)
- [ ] Développement durable (~10 définitions)

### 6.2 Pour chaque définition
- [ ] Rédiger définition claire et sourcée
- [ ] Minimum 1 source de qualité
- [ ] Identifier les relations avec autres termes
- [ ] Ajouter tags pertinents
- [ ] Exemples si pertinent

### 6.3 Validation
- [ ] Vérifier cohérence des relations
- [ ] Vérifier validité des sources (URLs)
- [ ] Tester l'affichage dans le graphe

---

## Phase 7 : Polish & déploiement

### 7.1 Responsive design
- [ ] Adaptation mobile (graphe simplifié)
- [ ] Adaptation tablette
- [ ] Menu hamburger mobile

### 7.2 Optimisations
- [ ] Lazy loading des catégories
- [ ] Code splitting (React.lazy)
- [ ] Compression des assets
- [ ] Lighthouse audit > 90

### 7.3 Déploiement GitHub Pages
- [ ] Créer repo GitHub
- [ ] Configurer vite.config.ts pour GitHub Pages
- [ ] GitHub Action pour build & deploy
- [ ] Tester URL publique

### 7.4 Documentation
- [ ] README.md complet
- [ ] Guide d'ajout de définitions
- [ ] Guide configuration clé Mistral

---

## Ordre d'exécution recommandé

```
Phase 1 (Fondations)
    ↓
Phase 2.1-2.2 (Graphe basique)
    ↓
Phase 3.1-3.2 (Panel définition basique)
    ↓
Phase 6 (Créer 20 définitions pour tester)
    ↓
Phase 2.3-2.4 (Graphe avancé)
    ↓
Phase 3.3-3.4 (Panel complet)
    ↓
Phase 4 (Recherche)
    ↓
Phase 5 (Chat)
    ↓
Phase 6 (Compléter à 50-70 définitions)
    ↓
Phase 7 (Polish & déploiement)
```

---

## Estimations de complexité

| Phase | Complexité | Composants clés |
|-------|------------|-----------------|
| 1 | Facile | Setup classique React/Vite |
| 2 | Moyenne | React Flow customisation |
| 3 | Facile | Composants UI standard |
| 4 | Moyenne | Fuse.js simple, Mistral API |
| 5 | Moyenne | Prompt engineering, streaming |
| 6 | Longue | Recherche sources, rédaction |
| 7 | Facile | Config GitHub Pages standard |

---

## Risques identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Clé API Mistral exposée | Moyen | Storage localStorage + avertissement |
| Performance graphe > 100 noeuds | Faible | React Flow gère bien, virtualisation native |
| Qualité des sources | Moyen | Privilégier sources institutionnelles |
| Coût API Mistral | Faible | Mistral embed est peu cher, limiter appels |

---

**Signature:** Lalou
**Prochaine étape:** Démarrer Phase 1

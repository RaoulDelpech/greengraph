# MESSAGE DE REPRISE GREENGRAPH - 2025-12-24

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

---

## ÉTAT DU PROJET : 100% TERMINÉ ET DÉPLOYÉ

### URL PRODUCTION
**https://raouldelpech.github.io/greengraph/**

### REPO GITHUB
**https://github.com/RaoulDelpech/greengraph**

---

## CONTEXTE DU PROJET

GreenGraph est une taxonomie interactive pour l'écologie/environnement/économie circulaire. Projet TOTALEMENT SÉPARÉ de Juris-Power. Créé pour aider une personne qui doit réaliser une taxonomie avec des définitions environnementales.

### Décisions techniques (15 questions validées par l'utilisateur) :
1. Hébergement : Application web statique (GitHub Pages)
2. Chat IA : API Mistral (compte Juris-Power existant)
3. Frontend : React 18 + TypeScript
4. Visualisation : React Flow (graphe en réseau nodes + edges)
5. Relations : 5 types + score de proximité (0-100)
6. Stockage : JSON modulaire par catégorie
7. Recherche : Hybride (full-text Fuse.js + sémantique Mistral prévu)
8. Chat : Synthèse basée sur définitions uniquement
9. Langue : Français uniquement
10. Style : Nature/Écologie (palette verte/bleue)
11. Structure définition : id, terme, definition, sources, categorie, tags, relations, exemples, synonymes
12. MVP : 50-70 définitions (56 livrées)
13. Déploiement : GitHub Pages
14. Public : Experts/Professionnels
15. Nom : GreenGraph

---

## ARCHITECTURE COMPLÈTE

```
~/projets/greengraph/
├── .claude/
│   ├── SPECIFICATIONS.md          # Specs techniques détaillées (~300 lignes)
│   ├── ROADMAP.md                 # Roadmap de développement
│   └── MESSAGE_REPRISE_GREENGRAPH.md  # CE FICHIER
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions pour déploiement
├── public/
│   └── data/
│       ├── index.json             # Index des 6 catégories
│       └── categories/
│           ├── economie-circulaire.json  # 12 définitions
│           ├── biodiversite.json         # 9 définitions
│           ├── dechets.json              # 9 définitions
│           ├── energie-climat.json       # 9 définitions
│           ├── eau.json                  # 7 définitions
│           └── developpement-durable.json # 10 définitions
├── src/
│   ├── components/
│   │   ├── Graph/
│   │   │   ├── GraphView.tsx      # Composant principal React Flow
│   │   │   ├── DefinitionNode.tsx # Noeud personnalisé
│   │   │   └── index.ts
│   │   ├── Search/
│   │   │   ├── SearchBar.tsx      # Recherche full-text Fuse.js
│   │   │   └── index.ts
│   │   ├── Chat/
│   │   │   ├── ChatPanel.tsx      # Chat Mistral avec settings
│   │   │   └── index.ts
│   │   ├── Definition/
│   │   │   ├── DefinitionPanel.tsx # Panneau détail définition
│   │   │   └── index.ts
│   │   └── Layout/
│   │       ├── Header.tsx         # Header avec recherche
│   │       ├── Sidebar.tsx        # Filtres catégories + légende
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useDefinitions.ts      # Chargement des données JSON
│   │   ├── useGraph.ts            # Conversion définitions → nodes/edges
│   │   └── useChat.ts             # Logique chat Mistral
│   ├── utils/
│   │   └── mistralClient.ts       # Client API Mistral
│   ├── types/
│   │   └── index.ts               # Types TypeScript complets
│   ├── App.tsx                    # Composant racine
│   ├── main.tsx                   # Point d'entrée
│   └── index.css                  # Tailwind + variables CSS
├── package.json
├── vite.config.ts                 # Vite + Tailwind + base /greengraph/
├── tsconfig.json
└── README.md
```

---

## TYPES TYPESCRIPT CLÉS

```typescript
type RelationType = 'renvoie_a' | 'est_type_de' | 'contribue_a' | 'proche_de' | 'oppose_a';
type SourceType = 'article' | 'livre' | 'rapport' | 'institution' | 'loi';

interface Definition {
  id: string;
  terme: string;
  definition: string;
  sources: Source[];
  categorie: string;
  tags?: string[];
  relations?: Relation[];
  exemples?: string[];
  synonymes?: string[];
}

interface Relation {
  cible: string;
  type: RelationType;
  score: number;
  direction?: 'positif' | 'negatif';
}
```

---

## FONCTIONNALITÉS LIVRÉES

### 1. Graphe interactif (React Flow)
- 56 noeuds (définitions) avec couleur par catégorie
- Arêtes stylées selon type de relation :
  - renvoie_a : flèche bleue pleine
  - est_type_de : pointillé gris
  - contribue_a : vert (positif) / orange (négatif)
  - proche_de : gris fin, opacité = score
  - oppose_a : rouge pointillé
- Zoom/Pan/Drag
- MiniMap + Controls

### 2. Recherche full-text (Fuse.js)
- Recherche sur : terme (x2), definition, tags (x1.5), synonymes (x1.5)
- Threshold 0.4, debounce intégré
- Résultats avec score, navigation clavier

### 3. Chat Mistral
- Clé API stockée localStorage (settings dans le chat)
- Recherche sémantique des définitions pertinentes (top 7)
- Prompt système strict : réponses basées UNIQUEMENT sur définitions
- Citations [terme] transformées en liens cliquables
- Modèle : mistral-small-latest, temperature 0.3

### 4. Panneau définition
- En-tête : terme + badge catégorie coloré
- Définition texte
- Sources : titre, auteur, URL, année, type
- Relations groupées par type (liens cliquables)
- Exemples + Synonymes + Tags

### 5. Sidebar
- 6 catégories avec checkbox colorées
- Boutons "Toutes" / "Aucune"
- Légende des types de relations

---

## COMMITS GIT (chronologie)

1. `f2f816e` - feat: initial GreenGraph project (38 files, 7961 insertions)
2. `06c5824` - feat: add 20+ definitions to reach ~56 total
3. `1478537` - feat: add Mistral chat integration
4. `a4a0322` - fix: remove unused import in ChatPanel

---

## 6 CATÉGORIES ET 56 DÉFINITIONS

### Économie circulaire (12)
economie-circulaire, economie-lineaire, ecoconception, analyse-cycle-vie, symbiose-industrielle, obsolescence-programmee, reutilisation, upcycling, economie-fonctionnalite, reparabilite, consigne, ecologie-industrielle

### Biodiversité (9)
biodiversite, ecosysteme, services-ecosystemiques, erosion-biodiversite, espece-endemique, espece-invasive, pollinisation, aire-protegee, corridor-ecologique

### Gestion des déchets (9)
dechet, hierarchie-dechets, recyclage, compostage, methanisation, biodechets, tri-selectif, rep, dechet-dangereux

### Énergie & Climat (9)
changement-climatique, gaz-effet-serre, empreinte-carbone, neutralite-carbone, energie-renouvelable, transition-energetique, energie-fossile, efficacite-energetique, sobriete-energetique

### Ressources en eau (7)
cycle-eau, stress-hydrique, eau-grise, empreinte-eau, zone-humide, eutrophisation, assainissement

### Développement durable (10)
developpement-durable, rse, greenwashing, empreinte-ecologique, limites-planetaires, transition-ecologique, agroecologie, economie-sociale-solidaire, sobriete, capital-naturel

---

## STACK TECHNIQUE

- **React 18** + TypeScript
- **Vite 7.3** (bundler)
- **TailwindCSS** via @tailwindcss/vite
- **React Flow** (visualisation graphe)
- **Fuse.js** (recherche full-text)
- **API Mistral** (chat)

---

## FICHIERS CLÉS À LIRE POUR COMPRENDRE

1. `src/types/index.ts` - Tous les types
2. `src/hooks/useDefinitions.ts` - Chargement données
3. `src/hooks/useGraph.ts` - Conversion en nodes/edges
4. `src/hooks/useChat.ts` - Logique chat
5. `src/components/Graph/GraphView.tsx` - Graphe principal
6. `src/components/Chat/ChatPanel.tsx` - Interface chat
7. `public/data/categories/*.json` - Toutes les définitions

---

## COMMENT UTILISER

1. **Graphe** : Zoom molette, pan clic-drag, clic noeud = détail
2. **Recherche** : Taper dans la barre header
3. **Chat** : Bouton vert bas-droite → config clé API → poser question
4. **Filtres** : Sidebar gauche, cocher/décocher catégories

---

## ÉVOLUTIONS POSSIBLES (NON DEMANDÉES)

- Recherche sémantique Mistral embeddings (prévu dans specs)
- Plus de définitions (actuellement 56, objectif initial 50-70)
- Mode responsive mobile
- Export PDF des définitions

---

## CONSIGNE IMPÉRATIVE POUR PROCHAIN COMPACTAGE

Quand tu n'auras plus beaucoup de contexte, tu as l'OBLIGATION ABSOLUE de :
1. Relire ce fichier MESSAGE_REPRISE_GREENGRAPH.md
2. Relire SPECIFICATIONS.md et ROADMAP.md
3. Créer un nouveau message de reprise ULTRA EXHAUSTIF qui reprend EXACTEMENT cette même consigne
4. Le message doit commencer par : "RELIS ABSOLUMENT TOUTE la doc..."
5. AUCUNE déperdition tolérée

---

**Signature**: Lalou
**Date**: 2025-12-24
**Statut**: PROJET TERMINÉ ET DÉPLOYÉ

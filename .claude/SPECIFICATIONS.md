# GreenGraph - Spécifications Techniques Détaillées

**Version:** 1.0
**Date:** 2025-12-24
**Auteur:** Lalou

---

## 1. Vue d'ensemble

**GreenGraph** est une application web de taxonomie interactive pour les définitions liées à l'écologie, l'environnement et l'économie circulaire. Elle permet d'explorer visuellement les relations entre concepts via un graphe interactif.

### 1.1 Fonctionnalités principales

1. **Visualisation en graphe** - Exploration des définitions et leurs relations
2. **Barre de recherche hybride** - Full-text + recherche sémantique
3. **Chat intelligent** - Réponses basées uniquement sur les définitions
4. **Fiche définition** - Affichage détaillé avec sources et relations

### 1.2 Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Visualisation graphe | React Flow |
| Recherche full-text | Fuse.js |
| Recherche sémantique | API Mistral (embeddings) |
| Chat IA | API Mistral (mistral-small ou mistral-medium) |
| Style | TailwindCSS |
| Hébergement | GitHub Pages |

---

## 2. Architecture

```
greengraph/
├── public/
│   └── data/
│       ├── categories/
│       │   ├── dechets.json
│       │   ├── biodiversite.json
│       │   ├── energie.json
│       │   ├── eau.json
│       │   └── economie-circulaire.json
│       └── index.json          # Liste des catégories
├── src/
│   ├── components/
│   │   ├── Graph/
│   │   │   ├── GraphView.tsx       # Composant principal du graphe
│   │   │   ├── DefinitionNode.tsx  # Noeud personnalisé
│   │   │   └── RelationEdge.tsx    # Arête personnalisée
│   │   ├── Search/
│   │   │   ├── SearchBar.tsx       # Barre de recherche
│   │   │   ├── SearchResults.tsx   # Liste des résultats
│   │   │   └── useSearch.ts        # Hook de recherche hybride
│   │   ├── Chat/
│   │   │   ├── ChatPanel.tsx       # Panel de chat
│   │   │   ├── ChatMessage.tsx     # Message individuel
│   │   │   └── useChat.ts          # Hook d'intégration Mistral
│   │   ├── Definition/
│   │   │   ├── DefinitionPanel.tsx # Fiche détaillée
│   │   │   ├── SourcesList.tsx     # Liste des sources
│   │   │   └── RelatedList.tsx     # Notions liées
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── MainLayout.tsx
│   ├── hooks/
│   │   ├── useDefinitions.ts   # Chargement des données
│   │   ├── useGraph.ts         # Logique du graphe
│   │   └── useMistral.ts       # Client API Mistral
│   ├── types/
│   │   └── index.ts            # Types TypeScript
│   ├── utils/
│   │   ├── graphUtils.ts       # Calculs de layout
│   │   ├── searchUtils.ts      # Logique de recherche
│   │   └── mistralClient.ts    # Client Mistral
│   ├── styles/
│   │   └── globals.css         # Styles Tailwind
│   ├── App.tsx
│   └── main.tsx
├── .claude/
│   ├── SPECIFICATIONS.md       # Ce fichier
│   └── ROADMAP.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 3. Modèle de données

### 3.1 Structure d'une définition

```typescript
interface Definition {
  id: string;                    // Slug unique (ex: "economie-circulaire")
  terme: string;                 // Nom affiché (ex: "Économie circulaire")
  definition: string;            // Texte de la définition
  sources: Source[];             // Références bibliographiques
  categorie: string;             // Catégorie principale
  tags?: string[];               // Mots-clés additionnels
  relations?: Relation[];        // Liens vers autres définitions
  exemples?: string[];           // Exemples concrets
  synonymes?: string[];          // Termes équivalents
}

interface Source {
  titre: string;                 // Titre de la source
  auteur?: string;               // Auteur(s)
  url?: string;                  // Lien web si disponible
  annee?: number;                // Année de publication
  type: 'article' | 'livre' | 'rapport' | 'institution' | 'loi';
}

interface Relation {
  cible: string;                 // ID de la définition liée
  type: RelationType;            // Type de relation
  score: number;                 // Proximité 0-100
}

type RelationType =
  | 'renvoie_a'      // Référence directe dans la définition
  | 'est_type_de'    // Relation hiérarchique (hyponymie)
  | 'contribue_a'    // Lien causal positif/négatif
  | 'proche_de'      // Similarité conceptuelle
  | 'oppose_a';      // Contraste conceptuel
```

### 3.2 Structure d'une catégorie (fichier JSON)

```json
{
  "id": "economie-circulaire",
  "nom": "Économie circulaire",
  "description": "Concepts liés au modèle économique circulaire",
  "couleur": "#22c55e",
  "definitions": [
    {
      "id": "economie-circulaire",
      "terme": "Économie circulaire",
      "definition": "Modèle économique visant à produire des biens et services de manière durable...",
      "sources": [...],
      "relations": [...]
    }
  ]
}
```

### 3.3 Index des catégories

```json
{
  "categories": [
    {
      "id": "economie-circulaire",
      "nom": "Économie circulaire",
      "fichier": "economie-circulaire.json",
      "couleur": "#22c55e",
      "icone": "recycle"
    }
  ]
}
```

---

## 4. Composants détaillés

### 4.1 GraphView

**Responsabilité:** Afficher le graphe interactif des définitions

**Fonctionnalités:**
- Affichage des noeuds (définitions) avec couleur par catégorie
- Affichage des arêtes (relations) avec style selon type
- Zoom / Pan / Drag & drop
- Clic sur noeud → ouvre DefinitionPanel
- Survol noeud → highlight des relations directes
- Distance entre noeuds = inverse du score de proximité

**Props:**
```typescript
interface GraphViewProps {
  definitions: Definition[];
  selectedId?: string;
  onSelectDefinition: (id: string) => void;
  filterCategories?: string[];
}
```

**Mapping visuel des relations:**
| Type | Style arête |
|------|-------------|
| renvoie_a | Flèche pleine bleue |
| est_type_de | Flèche pointillée grise |
| contribue_a | Flèche verte (positif) ou orange (négatif) |
| proche_de | Ligne grise fine, opacité = score |
| oppose_a | Ligne rouge pointillée |

### 4.2 SearchBar

**Responsabilité:** Recherche hybride full-text + sémantique

**Fonctionnement:**
1. L'utilisateur tape sa recherche
2. Debounce 200ms
3. Recherche full-text immédiate via Fuse.js
4. Si < 5 résultats après 500ms → enrichissement sémantique via Mistral
5. Affichage progressif des résultats

**Props:**
```typescript
interface SearchBarProps {
  onSearch: (results: SearchResult[]) => void;
  onSelectResult: (id: string) => void;
  placeholder?: string;
}

interface SearchResult {
  definition: Definition;
  score: number;           // Score de pertinence 0-1
  matchType: 'exact' | 'fulltext' | 'semantic';
  highlights?: string[];   // Extraits surlignés
}
```

### 4.3 ChatPanel

**Responsabilité:** Interface de chat avec réponses basées sur les définitions

**Fonctionnement:**
1. L'utilisateur pose une question
2. Recherche sémantique des définitions pertinentes (top 5-10)
3. Construction du prompt Mistral avec contexte des définitions
4. Génération de la réponse
5. Affichage avec citations cliquables vers les définitions

**Prompt système:**
```
Tu es un assistant spécialisé en écologie et économie circulaire.
Tu réponds UNIQUEMENT en te basant sur les définitions fournies.
Si aucune définition ne permet de répondre, dis-le clairement.
Cite toujours tes sources en mentionnant les termes entre [crochets].
```

**Props:**
```typescript
interface ChatPanelProps {
  definitions: Definition[];
  onDefinitionClick: (id: string) => void;
}
```

### 4.4 DefinitionPanel

**Responsabilité:** Afficher le détail d'une définition

**Sections:**
1. **En-tête:** Terme + catégorie (badge coloré)
2. **Définition:** Texte principal
3. **Sources:** Liste cliquable des références
4. **Relations:**
   - "Renvoie à" - liens directs
   - "Notions proches" - proximité conceptuelle
   - "Voir aussi" - autres relations
5. **Exemples:** Si disponibles
6. **Synonymes:** Si disponibles

**Props:**
```typescript
interface DefinitionPanelProps {
  definition: Definition;
  allDefinitions: Definition[];
  onNavigate: (id: string) => void;
  onClose: () => void;
}
```

---

## 5. Intégration Mistral

### 5.1 Configuration

```typescript
// src/utils/mistralClient.ts
const MISTRAL_API_URL = 'https://api.mistral.ai/v1';

// La clé API sera stockée dans localStorage par l'utilisateur
// ou passée via variable d'environnement pour le dev

interface MistralConfig {
  apiKey: string;
  model: 'mistral-small-latest' | 'mistral-medium-latest';
  embeddingModel: 'mistral-embed';
}
```

### 5.2 Endpoints utilisés

1. **Embeddings** (pour recherche sémantique)
   - `POST /v1/embeddings`
   - Pré-calculer les embeddings des définitions au build
   - Calculer l'embedding de la requête utilisateur
   - Cosine similarity pour le ranking

2. **Chat** (pour le chatbot)
   - `POST /v1/chat/completions`
   - Modèle: mistral-small-latest (bon rapport qualité/coût)
   - Temperature: 0.3 (réponses factuelles)

### 5.3 Gestion de la clé API

Options pour le MVP:
- **Option A:** L'utilisateur entre sa clé API dans les settings (stockée localStorage)
- **Option B:** Clé API en variable d'environnement côté build (moins flexible)

Recommandation: Option A pour flexibilité, avec warning que la clé est stockée localement.

---

## 6. Design System

### 6.1 Palette de couleurs

```css
:root {
  /* Couleurs principales - Nature */
  --color-primary: #059669;      /* Vert emerald 600 */
  --color-primary-light: #34d399; /* Vert emerald 400 */
  --color-primary-dark: #047857;  /* Vert emerald 700 */

  /* Couleurs secondaires */
  --color-secondary: #0284c7;     /* Bleu sky 600 */
  --color-secondary-light: #38bdf8;

  /* Neutres */
  --color-bg: #f8fafc;            /* Slate 50 */
  --color-surface: #ffffff;
  --color-text: #1e293b;          /* Slate 800 */
  --color-text-muted: #64748b;    /* Slate 500 */

  /* Catégories (une couleur par thème) */
  --color-cat-dechets: #f59e0b;       /* Amber */
  --color-cat-biodiversite: #22c55e;  /* Green */
  --color-cat-energie: #eab308;       /* Yellow */
  --color-cat-eau: #3b82f6;           /* Blue */
  --color-cat-circulaire: #8b5cf6;    /* Violet */

  /* Relations */
  --color-rel-renvoie: #3b82f6;
  --color-rel-type: #6b7280;
  --color-rel-contribue-pos: #22c55e;
  --color-rel-contribue-neg: #f97316;
  --color-rel-proche: #9ca3af;
  --color-rel-oppose: #ef4444;
}
```

### 6.2 Typographie

```css
/* Titres: Inter ou système */
font-family: 'Inter', system-ui, sans-serif;

/* Tailles */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
```

### 6.3 Composants UI

- **Noeuds du graphe:** Rectangles arrondis, ombre légère, couleur = catégorie
- **Arêtes:** SVG avec styles différents selon type de relation
- **Cards:** Fond blanc, border subtle, radius 8px
- **Boutons:** Style filled pour CTA, outline pour secondaire
- **Input:** Border grise, focus vert, radius 6px

---

## 7. Performance

### 7.1 Optimisations

1. **Lazy loading des catégories** - Charger uniquement les JSON nécessaires
2. **Virtualisation du graphe** - React Flow gère nativement les grands graphes
3. **Debounce recherche** - 200ms pour éviter les appels excessifs
4. **Cache embeddings** - Stocker les embeddings en localStorage
5. **Code splitting** - Lazy import des composants lourds (ChatPanel, GraphView)

### 7.2 Métriques cibles

| Métrique | Objectif |
|----------|----------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Bundle size (gzip) | < 300KB |
| Lighthouse score | > 90 |

---

## 8. Accessibilité

- Contraste texte ≥ 4.5:1
- Navigation clavier dans le graphe (Tab, Enter, Escape)
- Labels ARIA sur les éléments interactifs
- Focus visible sur tous les éléments
- Alt text pour les icônes significatives

---

## 9. Sécurité

- Clé API Mistral jamais dans le code source
- Sanitization des entrées utilisateur (recherche, chat)
- CSP headers via meta tags
- Pas de données sensibles (application publique)

---

**Signature:** Lalou
**Prochaine étape:** Voir ROADMAP.md

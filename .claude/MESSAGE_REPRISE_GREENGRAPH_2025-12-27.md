# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 02h10

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprends le travail là où tu étais sans la MOINDRE déperdition.

**IMPORTANT** : Quand tu n'auras plus beaucoup de contexte, tu as l'obligation absolue de rédiger un nouveau message ultra-exhaustif qui reprend exactement cette consigne pour gérer le prochain compactage.

---

## ÉTAT DU PROJET AU 2025-12-27 02h00

### URL Production
**https://raouldelpech.github.io/greengraph/**

### Répertoire Local
`/Users/raouldelpech/projets/greengraph/`

### Repo GitHub
https://github.com/RaoulDelpech/greengraph

---

## HISTORIQUE DES COMMITS (chronologique)

```
14802ad feat(chat): enrich context with scientific depth and show sources  <-- DERNIER COMMIT
d54e881 feat(onboarding): add 3-step guided tour for new users
5c8469c feat(search): group results by category with enriched preview
4bf5312 feat(a11y): add keyboard navigation and accessibility improvements
741fca8 fix(types): use type-only import for TouchEvent
bf62504 feat(mobile): add ListView component for mobile devices
6aa3657 feat(data): enrich all 56 definitions with scientific depth
2bf04c7 feat: add scientific definitions for biodiversite, climat, dev-durable
ff12bc7 fix: add cache-busting for JSON data fetch
f5a7f27 feat: add scientific definitions with 3 depth levels
```

---

## CE QUI A ÉTÉ FAIT (session 27 déc)

### 1. VUE LISTE MOBILE (Phase 2)
- **Composant** : `src/components/List/ListView.tsx`
- Outline collapsible par catégorie
- Tap pour expand/collapse
- Swipe gauche pour détails
- Touch targets 48px minimum
- Switch auto < 768px dans App.tsx

### 2. ACCESSIBILITÉ (Phase 3)
- **Hook** : `src/hooks/useKeyboardNavigation.ts`
- Navigation clavier : `/` focus recherche, `Escape` ferme panneaux
- ARIA labels sur SearchBar (role="combobox", aria-expanded, etc.)
- Focus visible : 3px solid teal (#0891b2)
- Support `prefers-reduced-motion` et `prefers-contrast: high`
- Classes `.sr-only` et `.skip-link` dans index.css

### 3. RECHERCHE AMÉLIORÉE (Phase 2)
- Groupement des résultats par catégorie
- En-têtes avec pastille couleur
- Preview enrichi (résumé ou début de définition)
- Footer avec hints clavier (↑↓ naviguer, ↵ sélectionner)
- Compteur de résultats

### 4. ONBOARDING (Phase 2)
- **Composant** : `src/components/Onboarding/OnboardingTour.tsx`
- 3 étapes : Bienvenue, Niveaux de détail, Concepts liés
- Persistance localStorage (`greengraph-onboarding-completed`)
- Modal accessible avec ARIA
- Boutons Passer / Suivant / Commencer

### 5. CHAT IA AMÉLIORÉ
- **Hook** : `src/hooks/useChat.ts` - Contexte enrichi
- Contexte inclut : definitionEtendue (mécanismes, enjeux), indicateurs quantitatifs, sources
- Sources de haute qualité (niveauPreuve=élevé) stockées dans les messages
- **Composant** : `src/components/Chat/ChatPanel.tsx` - Affichage sources
- Sources collapsibles sous chaque réponse avec liens vers URLs

---

## ARCHITECTURE DU PROJET (mise à jour)

```
/Users/raouldelpech/projets/greengraph/
├── .claude/
│   ├── MESSAGE_REPRISE_GREENGRAPH_2025-12-27.md  # CE FICHIER
│   ├── SPECIFICATIONS.md
│   ├── SPECIFICATIONS_UX_V2.md
│   └── ROADMAP.md
├── .github/workflows/
│   └── deploy.yml
├── public/data/
│   ├── categories.json
│   └── categories/ (6 fichiers JSON, 56 définitions enrichies)
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css                              # + styles accessibilité
│   ├── components/
│   │   ├── Definition/
│   │   │   ├── DefinitionPanel.tsx
│   │   │   └── DefinitionDepthToggle.tsx
│   │   ├── Graph/
│   │   │   └── GraphView.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx                     # + forwardRef pour SearchBar
│   │   │   └── Sidebar.tsx
│   │   ├── Search/
│   │   │   └── SearchBar.tsx                  # + groupement par catégorie
│   │   ├── Chat/
│   │   │   └── ChatPanel.tsx
│   │   ├── List/                              # NOUVEAU
│   │   │   ├── ListView.tsx                   # Vue liste mobile
│   │   │   └── index.ts
│   │   └── Onboarding/                        # NOUVEAU
│   │       ├── OnboardingTour.tsx             # Tour guidé 3 étapes
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useDefinitions.ts
│   │   ├── useGraph.ts
│   │   ├── useChat.ts
│   │   └── useKeyboardNavigation.ts           # NOUVEAU
│   └── types/
│       └── index.ts
├── dist/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## PHASE 2 UX - TERMINÉE

| Fonctionnalité | Statut | Commit |
|----------------|--------|--------|
| Vue liste mobile | FAIT | bf62504 |
| Recherche groupée par catégorie | FAIT | 5c8469c |
| Onboarding 3 étapes | FAIT | d54e881 |

## PHASE 3 ACCESSIBILITÉ - TERMINÉE (base)

| Fonctionnalité | Statut | Commit |
|----------------|--------|--------|
| Navigation clavier (/, Escape) | FAIT | 4bf5312 |
| ARIA labels SearchBar | FAIT | 4bf5312 |
| Focus visible 3px | FAIT | 4bf5312 |
| prefers-reduced-motion | FAIT | 4bf5312 |
| prefers-contrast: high | FAIT | 4bf5312 |

---

## CE QUI RESTE À FAIRE

### Accessibilité avancée (optionnel)
- ARIA labels sur autres composants (ListView, GraphView, etc.)
- Navigation clavier dans le graphe (Arrow keys)
- Skip link au début de la page
- Tests avec screen reader

### Améliorations futures
- Recherche sémantique
- Vue tableau alternative au graphe
- Export PDF des définitions

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build

# Dev
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite dev

# TypeScript check
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx tsc -b

# Git
git status && git log --oneline -5

# Déploiement
gh run list --limit 3
```

---

## TECHNOLOGIES

- React 19 + TypeScript + Vite 7
- ReactFlow 11 (graphe)
- Fuse.js (recherche)
- Tailwind CSS 4
- Mistral API (chat IA)
- GitHub Pages + GitHub Actions

---

## CONSIGNE DE COMPACTAGE

Quand tu n'auras plus beaucoup de contexte, AVANT de compacter, tu DOIS :

1. Lire ce fichier : `/Users/raouldelpech/projets/greengraph/.claude/MESSAGE_REPRISE_GREENGRAPH_2025-12-27.md`
2. Mettre à jour ce fichier avec les dernières opérations
3. Créer un nouveau message avec la même structure
4. Le message doit commencer par : "RELIS ABSOLUMENT TOUTE la doc..."

---

**Signature** : Lalou
**Date** : 2025-12-27 02h10
**Dernière opération** : Chat IA amélioré avec sources déployé

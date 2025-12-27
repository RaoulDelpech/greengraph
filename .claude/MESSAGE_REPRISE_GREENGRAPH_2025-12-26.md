# MESSAGE DE REPRISE GREENGRAPH - 2025-12-26 22h30

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprends le travail là où tu étais sans la MOINDRE déperdition.

**IMPORTANT** : Quand tu n'auras plus beaucoup de contexte, tu as l'obligation absolue de rédiger un nouveau message ultra-exhaustif qui reprend exactement cette consigne pour gérer le prochain compactage.

---

## ÉTAT DU PROJET AU 2025-12-26 22h30

### URL Production
**https://raouldelpech.github.io/greengraph/**

### Répertoire Local
`/Users/raouldelpech/projets/greengraph/`

---

## HISTORIQUE DES COMMITS (chronologique)

```
6aa3657 feat(data): enrich all 56 definitions with scientific depth  <-- DERNIER COMMIT (26 déc 22:19)
2bf04c7 feat: add scientific definitions for biodiversite, climat, dev-durable
ff12bc7 fix: add cache-busting for JSON data fetch
f5a7f27 feat: add scientific definitions with 3 depth levels
715ff00 ci: add VITE_MISTRAL_API_KEY secret to build
01f3e21 feat: major UX overhaul - focus mode, responsive, improved navigation
8c90efc feat: MVP GreenGraph - graphe interactif definitions ecologie
a0c3ce5 chore: initial commit avec structure React + Vite
```

---

## CE QUI VIENT D'ÊTRE FAIT (session actuelle)

### 1. ENRICHISSEMENT COMPLET DES 56 DÉFINITIONS

Toutes les définitions ont été enrichies avec la structure scientifique complète :

| Catégorie | Fichier | Définitions | Statut |
|-----------|---------|-------------|--------|
| biodiversite | `public/data/categories/biodiversite.json` | 9 | ENRICHIES |
| economie-circulaire | `public/data/categories/economie-circulaire.json` | 12 | ENRICHIES |
| energie-climat | `public/data/categories/energie-climat.json` | 9 | ENRICHIES |
| developpement-durable | `public/data/categories/developpement-durable.json` | 10 | ENRICHIES |
| dechets | `public/data/categories/dechets.json` | 9 | ENRICHIES |
| eau | `public/data/categories/eau.json` | 7 | ENRICHIES |

**TOTAL : 56 définitions enrichies**

### 2. STRUCTURE DE CHAQUE DÉFINITION ENRICHIE

Chaque définition contient maintenant :

```typescript
{
  id: string,
  terme: string,
  resume: string,                    // 1-2 phrases (NIVEAU 1 : Aperçu)
  definition: string,                // 2-3 paragraphes (NIVEAU 2 : Standard)
  definitionEtendue: {               // NIVEAU 3 : Expert
    introduction: string,            // Contexte historique
    mecanismes: string,              // Fonctionnement
    contexteScientifique: string,    // Recherche, débats
    enjeuxActuels: string,           // Défis actuels
    perspectives: string             // Évolutions futures
  },
  sources: [{
    titre: string,
    auteur?: string,
    url?: string,
    doi?: string,
    annee?: number,
    type: 'article_peer_reviewed' | 'rapport_institution' | 'loi' | ...,
    niveauPreuve: 'elevé' | 'moyen' | 'faible'
  }],
  niveauValidation: 'vérifié',
  derniereMiseAJour: '2025-12-26',
  motsClésScientifiques: string[],
  indicateursQuantitatifs: [{
    valeur: string,
    source: string,
    annee: number
  }],
  // + tags, relations, exemples, synonymes (existants)
}
```

### 3. BUILD VÉRIFIÉ

```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build
# Résultat : ✓ built in 1.48s
# dist/assets/index-wT5JFtPs.js   393.96 kB
```

### 4. COMMIT ET PUSH EFFECTUÉS

```bash
git add public/data/categories/*.json
git commit -m "feat(data): enrich all 56 definitions with scientific depth"
git push origin main
# Résultat : 2bf04c7..6aa3657  main -> main
```

---

## ARCHITECTURE DU PROJET

### Structure des Dossiers

```
/Users/raouldelpech/projets/greengraph/
├── .claude/
│   ├── MESSAGE_REPRISE_GREENGRAPH.md       # Message de reprise précédent
│   ├── MESSAGE_REPRISE_GREENGRAPH_2025-12-26.md  # CE FICHIER
│   ├── SPECIFICATIONS.md                    # Specs initiales
│   ├── SPECIFICATIONS_UX_V2.md              # Specs UX V2 (améliorations)
│   └── ROADMAP.md                           # Roadmap
├── .github/workflows/
│   └── deploy.yml                           # GitHub Actions pour déploiement
├── public/
│   └── data/
│       ├── categories.json                  # Index des catégories
│       └── categories/
│           ├── biodiversite.json            # 9 définitions enrichies
│           ├── economie-circulaire.json     # 12 définitions enrichies
│           ├── energie-climat.json          # 9 définitions enrichies
│           ├── developpement-durable.json   # 10 définitions enrichies
│           ├── dechets.json                 # 9 définitions enrichies
│           └── eau.json                     # 7 définitions enrichies
├── src/
│   ├── App.tsx                              # Composant principal
│   ├── main.tsx                             # Point d'entrée
│   ├── index.css                            # Styles globaux
│   ├── components/
│   │   ├── Definition/
│   │   │   ├── DefinitionPanel.tsx          # Panneau définition (3 niveaux)
│   │   │   └── DefinitionDepthToggle.tsx    # Toggle Aperçu/Standard/Expert
│   │   ├── Graph/
│   │   │   ├── GraphView.tsx                # Vue graphe ReactFlow
│   │   │   ├── CategoryNode.tsx             # Noeud catégorie
│   │   │   └── DefinitionNode.tsx           # Noeud définition
│   │   ├── Layout/
│   │   │   ├── Header.tsx                   # En-tête
│   │   │   └── Sidebar.tsx                  # Barre latérale
│   │   ├── Search/
│   │   │   └── SearchBar.tsx                # Recherche Fuse.js
│   │   └── Chat/
│   │       └── ChatPanel.tsx                # Chat IA (Mistral)
│   ├── hooks/
│   │   └── (hooks personnalisés)
│   ├── types/
│   │   └── index.ts                         # Types TypeScript complets
│   └── utils/
│       └── (utilitaires)
├── dist/                                    # Build production
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

### Fichiers Clés à Lire

1. **Types** : `src/types/index.ts` - Définit `Definition`, `DefinitionEtendue`, `Source`, etc.
2. **Panel** : `src/components/Definition/DefinitionPanel.tsx` - Affiche les 3 niveaux
3. **Toggle** : `src/components/Definition/DefinitionDepthToggle.tsx` - Bascule entre niveaux
4. **Specs UX** : `.claude/SPECIFICATIONS_UX_V2.md` - Améliorations planifiées

---

## CE QUI RESTE À FAIRE (SPECS UX V2)

### Phase 2 : Mobile & UX (Priorité P1-P2) - NON COMMENCÉ

1. **Vue liste mobile** (< 768px)
   - Composant ListView (outline collapsible)
   - Détection et switch auto
   - Touch : tap = expand, swipe gauche = détails

2. **Amélioration recherche**
   - Grouper résultats par catégorie
   - Afficher preview de définition

3. **Onboarding**
   - Tour guidé 3 étapes
   - localStorage pour ne pas répéter

### Phase 3 : Accessibilité (Priorité P1) - NON COMMENCÉ

1. **Navigation clavier**
   - Tab, Enter, Arrow keys sur graphe
   - / pour focus recherche
   - Escape pour fermer

2. **ARIA labels**
   - Sur tous les boutons et éléments interactifs
   - Annonces dynamiques pour screen readers

3. **Focus visible**
   - Ring 3px solid emerald
   - Contraste WCAG 7:1+

### Vérification Déploiement - EN COURS

Le workflow GitHub Actions `deploy.yml` existe. Le dernier push devrait déclencher le déploiement sur GitHub Pages.

---

## COMMANDES UTILES

### Build Local
```bash
cd /Users/raouldelpech/projets/greengraph
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build
```

### Dev Local
```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite dev
```

### Git Status
```bash
git status && git log --oneline -5
```

### Vérifier Déploiement GitHub
```bash
gh run list --limit 3
gh run view <run-id>
```

---

## LISTE DES 56 DÉFINITIONS PAR CATÉGORIE

### biodiversite.json (9)
1. biodiversite
2. ecosysteme
3. espece-endemique
4. espece-invasive
5. services-ecosystemiques
6. corridor-ecologique
7. extinction
8. pollinisation
9. erosion-biodiversite

### economie-circulaire.json (12)
1. economie-circulaire
2. analyse-cycle-vie
3. ecoconception
4. ecologie-industrielle
5. economie-fonctionnalite
6. reutilisation
7. remanufacturing
8. upcycling
9. downcycling
10. obsolescence-programmee
11. symbiose-industrielle
12. cradle-to-cradle

### energie-climat.json (9)
1. changement-climatique
2. gaz-effet-serre
3. empreinte-carbone
4. neutralite-carbone
5. energie-renouvelable
6. transition-energetique
7. energie-fossile
8. efficacite-energetique
9. sobriete-energetique

### developpement-durable.json (10)
1. developpement-durable
2. rse
3. greenwashing
4. empreinte-ecologique
5. limites-planetaires
6. transition-ecologique
7. agroecologie
8. economie-sociale-solidaire
9. sobriete
10. capital-naturel

### dechets.json (9)
1. dechet
2. hierarchie-dechets
3. recyclage
4. compostage
5. methanisation
6. biodechets
7. tri-selectif
8. rep
9. dechet-dangereux

### eau.json (7)
1. cycle-eau
2. stress-hydrique
3. eau-grise
4. empreinte-eau
5. zone-humide
6. eutrophisation
7. assainissement

---

## TECHNOLOGIES UTILISÉES

- **Frontend** : React 19 + TypeScript + Vite 7
- **Graphe** : ReactFlow 11
- **Recherche** : Fuse.js
- **Styles** : Tailwind CSS 4
- **Chat IA** : Mistral API (clé dans .env)
- **Déploiement** : GitHub Pages via GitHub Actions

---

## CONFIGURATION

### package.json (dépendances clés)
```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "reactflow": "^11.11.4",
    "fuse.js": "^7.1.0",
    "tailwindcss": "^4.1.18"
  }
}
```

### .env
```
VITE_MISTRAL_API_KEY=xxx
```

---

## ÉTAT GITHUB

- **Repo** : https://github.com/RaoulDelpech/greengraph
- **Branche** : main
- **Dernier commit** : 6aa3657 (26 déc 22:19)
- **GitHub Pages** : https://raouldelpech.github.io/greengraph/

---

## PROCHAIN TRAVAIL À FAIRE

1. **Vérifier que le déploiement GitHub Pages fonctionne** après le dernier push
2. **Tester en production** que les 56 définitions enrichies s'affichent avec les 3 niveaux
3. **Implémenter Phase 2 UX** : Vue liste mobile, recherche améliorée, onboarding
4. **Implémenter Phase 3 Accessibilité** : Navigation clavier, ARIA labels

---

## CONSIGNE DE COMPACTAGE POUR LA PROCHAINE SESSION

Quand tu n'auras plus beaucoup de contexte, AVANT de compacter, tu DOIS :

1. Lire ce fichier : `/Users/raouldelpech/projets/greengraph/.claude/MESSAGE_REPRISE_GREENGRAPH_2025-12-26.md`
2. Mettre à jour ce fichier avec les dernières opérations effectuées
3. Créer un nouveau message de reprise avec la même structure et le même niveau d'exhaustivité
4. Le message doit commencer par : "RELIS ABSOLUMENT TOUTE la doc..."

---

**Signature** : Lalou
**Date** : 2025-12-26 22h30
**Dernière opération** : Commit et push des 56 définitions enrichies

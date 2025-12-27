# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 03h00

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprends le travail là où tu étais sans la MOINDRE déperdition.

**IMPORTANT** : Quand tu n'auras plus beaucoup de contexte, tu as l'obligation absolue de rédiger un nouveau message ultra-exhaustif qui reprend exactement cette consigne pour gérer le prochain compactage.

---

## ÉTAT DU PROJET AU 2025-12-27 03h00

### URL Production
**https://raouldelpech.github.io/greengraph/**

### Répertoire Local
`/Users/raouldelpech/projets/greengraph/`

### Repo GitHub
https://github.com/RaoulDelpech/greengraph

---

## TRAVAIL EN COURS - DÉMULTIPLICATION DES DÉFINITIONS

### Objectif demandé par l'utilisateur
L'utilisateur a demandé : "je veux démultiplier le nombre et la qualité des définitions"
- Option choisie : C+D (nouvelles catégories + densification + amélioration qualité)
- **Objectif : passer de 56 à ~100-120 définitions**

### État d'avancement

| Tâche | Statut | Détails |
|-------|--------|---------|
| Créer catégorie Agriculture & Alimentation | FAIT | 10 définitions |
| Créer catégorie Urbanisme durable | FAIT | 8 définitions |
| Créer catégorie Pollution & Santé | FAIT | 8 définitions |
| Densifier Biodiversité (+5 déf) | EN ATTENTE | |
| Densifier Énergie-climat (+5 déf) | EN ATTENTE | |
| Densifier Eau (+4 déf) | EN ATTENTE | |
| Améliorer qualité existantes | EN ATTENTE | |
| Build et déploiement final | EN ATTENTE | |

### Compteur de définitions
- **Avant session** : 56 définitions (6 catégories)
- **Après nouvelles catégories** : 82 définitions (9 catégories)
- **Objectif final** : ~100-120 définitions

---

## NOUVELLES CATÉGORIES CRÉÉES (cette session)

### 1. agriculture-alimentation.json (10 définitions)
Fichier : `/Users/raouldelpech/projets/greengraph/public/data/categories/agriculture-alimentation.json`
Couleur : #84cc16 (lime)

Définitions :
1. agroecologie
2. permaculture
3. agriculture-biologique
4. agroforesterie
5. souverainete-alimentaire
6. circuits-courts
7. agriculture-regenerative
8. gaspillage-alimentaire
9. semences-paysannes
10. elevage-extensif

### 2. urbanisme-durable.json (8 définitions)
Fichier : `/Users/raouldelpech/projets/greengraph/public/data/categories/urbanisme-durable.json`
Couleur : #06b6d4 (cyan)

Définitions :
1. ville-durable
2. mobilite-douce
3. ilot-chaleur-urbain
4. artificialisation-sols
5. nature-en-ville
6. ecoquartier
7. zone-faibles-emissions
8. transport-commun

### 3. pollution.json (8 définitions)
Fichier : `/Users/raouldelpech/projets/greengraph/public/data/categories/pollution.json`
Couleur : #ef4444 (red)

Définitions :
1. qualite-air
2. microplastiques
3. perturbateurs-endocriniens
4. pollution-sols
5. pollution-lumineuse
6. pollution-sonore
7. depollution
8. sante-environnementale

---

## FICHIER INDEX MODIFIÉ

Fichier : `/Users/raouldelpech/projets/greengraph/public/data/index.json`

9 catégories maintenant :
1. economie-circulaire (12 déf)
2. biodiversite (9 déf)
3. energie-climat (9 déf)
4. dechets (9 déf)
5. eau (7 déf)
6. developpement-durable (10 déf)
7. agriculture-alimentation (10 déf) **NOUVEAU**
8. urbanisme-durable (8 déf) **NOUVEAU**
9. pollution (8 déf) **NOUVEAU**

---

## HISTORIQUE COMMITS SESSION 27 DÉC

```
14802ad feat(chat): enrich context with scientific depth and show sources
d54e881 feat(onboarding): add 3-step guided tour for new users
5c8469c feat(search): group results by category with enriched preview
4bf5312 feat(a11y): add keyboard navigation and accessibility improvements
741fca8 fix(types): use type-only import for TouchEvent
bf62504 feat(mobile): add ListView component for mobile devices
```

**Prochain commit prévu :** Les 3 nouvelles catégories (après build vérifié OK)

---

## STRUCTURE FICHIERS JSON

Chaque définition suit cette structure enrichie :
```typescript
{
  id: string,
  terme: string,
  categorie: string,
  resume: string,                    // NIVEAU 1 : Aperçu (1-2 phrases)
  definition: string,                // NIVEAU 2 : Standard
  definitionEtendue: {               // NIVEAU 3 : Expert
    introduction: string,
    mecanismes: string,
    contexteScientifique: string,
    enjeuxActuels: string,
    perspectives: string
  },
  sources: [{
    titre: string,
    auteur?: string,
    url?: string,
    doi?: string,
    annee?: number,
    type: 'article_peer_reviewed' | 'rapport_institution' | 'loi' | ...,
    institution?: string,
    niveauPreuve: 'elevé' | 'moyen' | 'faible'
  }],
  niveauValidation: 'vérifié',
  derniereMiseAJour: '2025-12-27',
  motsClésScientifiques: string[],
  indicateursQuantitatifs: [{ valeur, source, annee }],
  relations: [{ cible, type, score, direction? }],
  exemples?: string[],
  synonymes?: string[]
}
```

---

## CE QUI RESTE À FAIRE POUR ATTEINDRE ~100-120 DÉFINITIONS

### Densification catégories existantes (14 définitions à ajouter)

**Biodiversité (+5) :**
- trame-verte-bleue
- rewilding
- espece-parapluie
- hotspot-biodiversite
- sixieme-extinction

**Énergie-climat (+5) :**
- giec
- adaptation-climatique
- attenuation-climatique
- boucle-retroaction
- point-basculement

**Eau (+4) :**
- aquifere
- nappe-phreatique
- gestion-integree-eau
- eau-virtuelle

**Total après densification : 82 + 14 = 96 définitions**

### Amélioration qualité (option D)
- Vérifier DOI et liens URL de toutes les sources
- Compléter indicateurs quantitatifs manquants
- Harmoniser le style de rédaction

---

## ARCHITECTURE DU PROJET

```
/Users/raouldelpech/projets/greengraph/
├── .claude/
│   ├── MESSAGE_REPRISE_GREENGRAPH_2025-12-27_V2.md  # CE FICHIER
│   ├── SPECIFICATIONS.md
│   └── SPECIFICATIONS_UX_V2.md
├── public/data/
│   ├── index.json                    # 9 catégories (modifié)
│   └── categories/
│       ├── biodiversite.json         # 9 déf
│       ├── economie-circulaire.json  # 12 déf
│       ├── energie-climat.json       # 9 déf
│       ├── developpement-durable.json # 10 déf
│       ├── dechets.json              # 9 déf
│       ├── eau.json                  # 7 déf
│       ├── agriculture-alimentation.json  # 10 déf NOUVEAU
│       ├── urbanisme-durable.json    # 8 déf NOUVEAU
│       └── pollution.json            # 8 déf NOUVEAU
├── src/
│   ├── App.tsx
│   ├── index.css                     # + styles accessibilité
│   ├── components/
│   │   ├── Definition/               # DefinitionPanel, DepthToggle
│   │   ├── Graph/                    # GraphView
│   │   ├── Layout/                   # Header (forwardRef), Sidebar
│   │   ├── Search/                   # SearchBar (groupement catégories)
│   │   ├── Chat/                     # ChatPanel (sources affichées)
│   │   ├── List/                     # ListView (mobile)
│   │   └── Onboarding/               # OnboardingTour (3 étapes)
│   ├── hooks/
│   │   ├── useDefinitions.ts
│   │   ├── useGraph.ts
│   │   ├── useChat.ts                # Contexte enrichi
│   │   └── useKeyboardNavigation.ts
│   └── types/index.ts
└── dist/                             # Build vérifié OK
```

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build

# Dev
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite dev

# Git
git status && git log --oneline -5

# Déploiement
gh run list --limit 3
```

---

## PROCHAINES ACTIONS IMMÉDIATES

1. **Commit et push des 3 nouvelles catégories** (index.json + 3 fichiers JSON)
2. **Densifier biodiversite.json** (+5 définitions)
3. **Densifier energie-climat.json** (+5 définitions)
4. **Densifier eau.json** (+4 définitions)
5. **Commit et push final**
6. **Vérifier déploiement GitHub Pages**

---

## CONSIGNE DE COMPACTAGE

Quand tu n'auras plus beaucoup de contexte, AVANT de compacter, tu DOIS :

1. Lire ce fichier : `/Users/raouldelpech/projets/greengraph/.claude/MESSAGE_REPRISE_GREENGRAPH_2025-12-27_V2.md`
2. Mettre à jour ce fichier avec les dernières opérations
3. Créer un nouveau message avec la même structure
4. Le message doit commencer par : "RELIS ABSOLUMENT TOUTE la doc..."
5. Inclure TOUT le détail des tâches en cours et restantes

---

**Signature** : Lalou
**Date** : 2025-12-27 03h00
**État** : En cours de démultiplication des définitions (82/~100 fait)

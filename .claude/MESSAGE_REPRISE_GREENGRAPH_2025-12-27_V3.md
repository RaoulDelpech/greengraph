# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 10h25

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprends le travail là où tu étais sans la MOINDRE déperdition.

**IMPORTANT** : Quand tu n'auras plus beaucoup de contexte, tu as l'obligation absolue de rédiger un nouveau message ultra-exhaustif qui reprend exactement cette consigne pour gérer le prochain compactage.

---

## ÉTAT DU PROJET AU 2025-12-27 10h25

### URL Production
**https://raouldelpech.github.io/greengraph/**

### Répertoire Local
`/Users/raouldelpech/projets/greengraph/`

### Repo GitHub
https://github.com/RaoulDelpech/greengraph

---

## TRAVAIL TERMINÉ - DÉMULTIPLICATION DES DÉFINITIONS

### Objectif initial
L'utilisateur a demandé : "je veux démultiplier le nombre et la qualité des définitions"
- Option choisie : C+D (nouvelles catégories + densification + amélioration qualité)
- **Objectif atteint : passé de 56 à 96 définitions**

### Récapitulatif des commits de cette session

| Commit | Description | Détails |
|--------|-------------|---------|
| 0ada522 | 3 nouvelles catégories | +26 définitions (agriculture, urbanisme, pollution) |
| 3103521 | Densifier biodiversite | +5 définitions |
| b4d4367 | Densifier energie-climat | +5 définitions (giec, adaptation, atténuation, boucle, point-basculement) |
| 164eafd | Densifier eau | +4 définitions (aquifere, nappe-phreatique, gestion-integree-eau, eau-virtuelle) |

### Compteur final de définitions

| Catégorie | Définitions | Statut |
|-----------|-------------|--------|
| economie-circulaire | 12 | Original |
| biodiversite | 14 | +5 densifié |
| energie-climat | 14 | +5 densifié |
| developpement-durable | 10 | Original |
| dechets | 9 | Original |
| eau | 11 | +4 densifié |
| agriculture-alimentation | 10 | NOUVEAU |
| urbanisme-durable | 8 | NOUVEAU |
| pollution | 8 | NOUVEAU |
| **TOTAL** | **96** | +40 depuis session |

---

## TOUTES LES DÉFINITIONS PAR CATÉGORIE

### agriculture-alimentation.json (10 définitions)
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

### urbanisme-durable.json (8 définitions)
1. ville-durable
2. mobilite-douce
3. ilot-chaleur-urbain
4. artificialisation-sols
5. nature-en-ville
6. ecoquartier
7. zone-faibles-emissions
8. transport-commun

### pollution.json (8 définitions)
1. qualite-air
2. microplastiques
3. perturbateurs-endocriniens
4. pollution-sols
5. pollution-lumineuse
6. pollution-sonore
7. depollution
8. sante-environnementale

### biodiversite.json (14 définitions)
1. biodiversite
2. erosion-biodiversite
3. services-ecosystemiques
4. corridors-ecologiques
5. aire-protegee
6. espece-envahissante
7. capital-naturel
8. compensation-ecologique
9. pollution-plastique
10. trame-verte-bleue (NOUVEAU)
11. rewilding (NOUVEAU)
12. espece-parapluie (NOUVEAU)
13. hotspot-biodiversite (NOUVEAU)
14. sixieme-extinction (NOUVEAU)

### energie-climat.json (14 définitions)
1. changement-climatique
2. gaz-effet-serre
3. empreinte-carbone
4. neutralite-carbone
5. energie-renouvelable
6. transition-energetique
7. energie-fossile
8. efficacite-energetique
9. sobriete-energetique
10. giec (NOUVEAU)
11. adaptation-climatique (NOUVEAU)
12. attenuation-climatique (NOUVEAU)
13. boucle-retroaction (NOUVEAU)
14. point-basculement (NOUVEAU)

### eau.json (11 définitions)
1. cycle-eau
2. stress-hydrique
3. eau-grise
4. empreinte-eau
5. zone-humide
6. eutrophisation
7. assainissement
8. aquifere (NOUVEAU)
9. nappe-phreatique (NOUVEAU)
10. gestion-integree-eau (NOUVEAU)
11. eau-virtuelle (NOUVEAU)

### economie-circulaire.json (12 définitions)
1. economie-circulaire
2. economie-lineaire
3. analyse-cycle-vie
4. obsolescence-programmee
5. ecoconception
6. symbiose-industrielle
7. reemploi
8. upcycling
9. reparabilite
10. responsabilite-elargie-producteur
11. economie-fonctionnalite
12. consigne

### developpement-durable.json (10 définitions)
1. developpement-durable
2. odd
3. empreinte-ecologique
4. jour-depassement
5. limites-planetaires
6. greenwashing
7. rse
8. investissement-responsable
9. taxonomie-verte
10. sobriete

### dechets.json (9 définitions)
1. zero-dechet
2. valorisation-matiere
3. valorisation-energetique
4. tri-selectif
5. compostage
6. methanisation
7. enfouissement
8. incineration
9. prevention-dechets

---

## AMÉLIORATION CHAT IA - FAIT (fc5092e)

**Problème résolu** : Si une question n'est pas assez proche d'une définition, le chat oriente maintenant la discussion.

**Modifications apportées** :
1. Détection qualité des matches (good/partial/weak) via scores Fuse.js
2. Détection des catégories pertinentes par mots-clés
3. Prompt système enrichi pour orienter vers thématiques proches
4. Ajout des relations entre termes dans le contexte
5. Ne dit plus jamais "je n'ai pas de définition" - propose toujours des alternatives
6. Threshold Fuse.js passé de 0.4 à 0.5 (plus permissif)
7. Ajout de motsClésScientifiques dans les clés de recherche

**Fichier modifié** : `/Users/raouldelpech/projets/greengraph/src/hooks/useChat.ts`

---

## ROADMAP - AMÉLIORATIONS POTENTIELLES

### Qualité des données
- Vérifier DOI et liens URL de toutes les sources
- Compléter indicateurs quantitatifs manquants
- Harmoniser le style de rédaction

### Fonctionnalités
- Mode hors-ligne avec cache des définitions
- Export PDF des définitions
- Historique de navigation

---

## ARCHITECTURE DU PROJET

```
/Users/raouldelpech/projets/greengraph/
├── .claude/
│   ├── MESSAGE_REPRISE_GREENGRAPH_2025-12-27_V3.md  # CE FICHIER
│   ├── SPECIFICATIONS.md
│   └── SPECIFICATIONS_UX_V2.md
├── public/data/
│   ├── index.json                    # 9 catégories
│   └── categories/
│       ├── biodiversite.json         # 14 déf
│       ├── economie-circulaire.json  # 12 déf
│       ├── energie-climat.json       # 14 déf
│       ├── developpement-durable.json # 10 déf
│       ├── dechets.json              # 9 déf
│       ├── eau.json                  # 11 déf
│       ├── agriculture-alimentation.json  # 10 déf
│       ├── urbanisme-durable.json    # 8 déf
│       └── pollution.json            # 8 déf
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
│   │   ├── useChat.ts                # Contexte enrichi - À AMÉLIORER
│   │   └── useKeyboardNavigation.ts
│   └── types/index.ts
└── dist/                             # Build vérifié OK
```

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

## HISTORIQUE COMMITS SESSION 27 DÉC (complet)

```
fc5092e feat(chat): improve conversation orientation for weak matches
164eafd feat(data): add 4 definitions to eau (96 total)
b4d4367 feat(data): add 5 definitions to energie-climat (92 total)
3103521 feat(data): add 5 definitions to biodiversite (87 total)
0ada522 feat(data): add 3 new categories with 26 definitions
14802ad feat(chat): enrich context with scientific depth and show sources
d54e881 feat(onboarding): add 3-step guided tour for new users
5c8469c feat(search): group results by category with enriched preview
4bf5312 feat(a11y): add keyboard navigation and accessibility improvements
741fca8 fix(types): use type-only import for TouchEvent
bf62504 feat(mobile): add ListView component for mobile devices
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

## CONSIGNE DE COMPACTAGE

Quand tu n'auras plus beaucoup de contexte, AVANT de compacter, tu DOIS :

1. Lire ce fichier : `/Users/raouldelpech/projets/greengraph/.claude/MESSAGE_REPRISE_GREENGRAPH_2025-12-27_V3.md`
2. Mettre à jour ce fichier avec les dernières opérations
3. Créer un nouveau message avec la même structure
4. Le message doit commencer par : "RELIS ABSOLUMENT TOUTE la doc..."
5. Inclure TOUT le détail des tâches en cours et restantes

---

**Signature** : Lalou
**Date** : 2025-12-27 10h25
**État** : Démultiplication terminée (96 définitions). Roadmap chat à implémenter.

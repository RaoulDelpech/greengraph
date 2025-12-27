# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 - ULTRA EXHAUSTIF

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

**OBLIGATION ABSOLUE** : Quand tu n'auras plus beaucoup de contexte, tu DOIS rédiger un nouveau message ultra-exhaustif qui reprend EXACTEMENT cette consigne pour gérer le prochain compactage.

---

## ÉTAT DU PROJET AU 2025-12-27 ~12h00

### URLs et Chemins
- **URL Production** : https://raouldelpech.github.io/greengraph/
- **Repo GitHub** : https://github.com/RaoulDelpech/greengraph
- **Répertoire local** : `/Users/raouldelpech/projets/greengraph/`

### Commits récents (ordre chronologique)
```
36ead01 fix(quality): improve sources URLs, add indicators, use formal French
fc5092e feat(chat): improve conversation orientation for weak matches
f16ef02 feat(data): add 2 new categories - forets-oceans (25 def) + finance-verte (20 def)
42141b8 feat(data): add droit-environnement category with 15 legal definitions
4703b29 feat(data): add technologies-vertes category with 20 definitions
656d483 feat(images): add image support with 4 sample images
c1ed941 feat(images): add images to key definitions in energie-climat, biodiversite, economie-circulaire
```

---

## COMPTAGE EXACT DES DÉFINITIONS (170 TOTAL)

| Catégorie | Fichier | Définitions | Statut |
|-----------|---------|-------------|--------|
| economie-circulaire | economie-circulaire.json | 12 | Original |
| biodiversite | biodiversite.json | 14 | Densifié |
| energie-climat | energie-climat.json | 14 | Densifié |
| developpement-durable | developpement-durable.json | 10 | Original |
| dechets | dechets.json | 9 | Original |
| eau | eau.json | 11 | Densifié |
| agriculture-alimentation | agriculture-alimentation.json | 10 | Original |
| urbanisme-durable | urbanisme-durable.json | 8 | Original |
| pollution | pollution.json | 8 | Original |
| **forets-oceans** | forets-oceans.json | 22 | **NOUVEAU** |
| **finance-verte** | finance-verte.json | 17 | **NOUVEAU** |
| **droit-environnement** | droit-environnement.json | 15 | **NOUVEAU** |
| **technologies-vertes** | technologies-vertes.json | 20 | **NOUVEAU** |
| **TOTAL** | | **170** | Objectif: 300 |

---

## TÂCHE EN COURS : AJOUT DES IMAGES

### Demande utilisateur
L'utilisateur a demandé : "je veux qu'à chaque définition soit associée au moins une image soit libre de droit soit créée soit correspondant à un rapport très pertinent dans le domaine"

### Choix utilisateur (via AskUserQuestion)
- **Hébergement** : Local (/public/images/) - MAIS on utilise des URLs Wikimedia Commons stables pour l'instant
- **Type d'images** : Mix adapté (photos, schémas, logos selon pertinence)

### Travail effectué sur les images

#### 1. Modification du type TypeScript (FAIT)
Fichier : `/Users/raouldelpech/projets/greengraph/src/types/index.ts`
```typescript
export type ImageType = 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration';

export interface DefinitionImage {
  src: string;           // Chemin relatif (/images/...) ou URL
  alt: string;           // Description alternative
  credit?: string;       // Source/crédit (ex: "Wikimedia Commons")
  type?: ImageType;      // Type d'image
  legende?: string;      // Légende optionnelle
}
```

Ajout dans l'interface Definition :
```typescript
image?: DefinitionImage; // Image principale illustrant le concept
```

#### 2. Composant d'affichage (FAIT)
Fichier : `/Users/raouldelpech/projets/greengraph/src/components/Definition/DefinitionPanel.tsx`

Ajout du composant `DefinitionImageDisplay` avec :
- Gestion du chargement (skeleton loader)
- Gestion des erreurs (masque l'image si erreur)
- Affichage de la légende et du crédit

#### 3. Images ajoutées aux définitions (PARTIEL)

**energie-climat.json** (8 images sur 14) :
- changement-climatique : NASA temperature anomaly chart
- gaz-effet-serre : CO2 concentration 800k years
- empreinte-carbone : Carbon footprint breakdown
- neutralite-carbone : Net zero emissions diagram
- energie-renouvelable : Renewable energy sources
- energie-fossile : Oil pumpjack photo
- (manquent : transition-energetique, efficacite-energetique, sobriete-energetique, giec, adaptation-climatique, attenuation-climatique, boucle-retroaction, point-basculement)

**biodiversite.json** (1 image sur 14) :
- biodiversite : Wetland ecosystem photo

**economie-circulaire.json** (1 image sur 12) :
- economie-circulaire : Circular economy diagram

#### 4. Script d'automatisation créé
Fichier : `/Users/raouldelpech/projets/greengraph/scripts/add_images.py`

Script Python avec mapping complet des images pour 6 catégories :
- IMAGES_ENERGIE_CLIMAT (14 termes)
- IMAGES_BIODIVERSITE (8 termes)
- IMAGES_ECONOMIE_CIRCULAIRE (6 termes)
- IMAGES_DECHETS (4 termes)
- IMAGES_EAU (4 termes)
- IMAGES_DEVELOPPEMENT_DURABLE (5 termes)

**CE SCRIPT N'A PAS ENCORE ÉTÉ EXÉCUTÉ**

---

## PROCHAINES ACTIONS IMMÉDIATES

1. **Exécuter le script add_images.py** pour ajouter les images en batch
2. **Compléter le script** pour les catégories manquantes :
   - agriculture-alimentation
   - urbanisme-durable
   - pollution
   - forets-oceans
   - finance-verte
   - droit-environnement
   - technologies-vertes
3. **Commit et push** des images
4. **Vérifier le build**
5. **Densifier les catégories** pour atteindre 300 définitions

---

## ARCHITECTURE DU PROJET

```
/Users/raouldelpech/projets/greengraph/
├── .claude/
│   ├── MESSAGE_REPRISE_GREENGRAPH_2025-12-27_V4_ULTRA.md  # CE FICHIER
│   ├── SPECIFICATIONS.md
│   └── SPECIFICATIONS_UX_V2.md
├── public/
│   ├── data/
│   │   ├── index.json                    # 13 catégories
│   │   └── categories/
│   │       ├── agriculture-alimentation.json  # 10 déf
│   │       ├── biodiversite.json              # 14 déf, 1 image
│   │       ├── dechets.json                   # 9 déf
│   │       ├── developpement-durable.json     # 10 déf
│   │       ├── droit-environnement.json       # 15 déf NOUVEAU
│   │       ├── eau.json                       # 11 déf
│   │       ├── economie-circulaire.json       # 12 déf, 1 image
│   │       ├── energie-climat.json            # 14 déf, 8 images
│   │       ├── finance-verte.json             # 17 déf NOUVEAU
│   │       ├── forets-oceans.json             # 22 déf NOUVEAU
│   │       ├── pollution.json                 # 8 déf
│   │       ├── technologies-vertes.json       # 20 déf NOUVEAU
│   │       └── urbanisme-durable.json         # 8 déf
│   └── images/                            # Dossiers créés, vides
│       ├── economie-circulaire/
│       ├── biodiversite/
│       ├── energie-climat/
│       ├── ... (13 sous-dossiers)
│       └── logos/
├── scripts/
│   └── add_images.py                      # Script ajout images (À EXÉCUTER)
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── Definition/
│   │   │   ├── DefinitionPanel.tsx        # MODIFIÉ (ajout DefinitionImageDisplay)
│   │   │   └── DefinitionDepthToggle.tsx
│   │   ├── Graph/GraphView.tsx
│   │   ├── Layout/Header.tsx, Sidebar.tsx
│   │   ├── Search/SearchBar.tsx
│   │   ├── Chat/ChatPanel.tsx             # Vouvoiement
│   │   ├── List/ListView.tsx
│   │   └── Onboarding/OnboardingTour.tsx
│   ├── hooks/
│   │   ├── useDefinitions.ts
│   │   ├── useGraph.ts
│   │   ├── useChat.ts                     # MODIFIÉ (orientation + vouvoiement)
│   │   └── useKeyboardNavigation.ts
│   └── types/
│       └── index.ts                       # MODIFIÉ (ajout DefinitionImage)
└── dist/                                  # Build OK
```

---

## STRUCTURE D'UNE DÉFINITION (SCHÉMA COMPLET)

```typescript
{
  id: string,                              // Slug unique
  terme: string,                           // Nom affiché
  categorie: string,                       // ID catégorie

  // 3 niveaux de définition
  resume: string,                          // NIVEAU 1 : 1-2 phrases
  definition: string,                      // NIVEAU 2 : Standard
  definitionEtendue: {                     // NIVEAU 3 : Expert
    introduction: string,
    mecanismes: string,
    contexteScientifique: string,
    enjeuxActuels: string,
    perspectives: string
  },

  // Sources scientifiques
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

  // Métadonnées
  niveauValidation: 'vérifié',
  derniereMiseAJour: '2025-12-27',
  motsClésScientifiques: string[],

  // Relations
  relations: [{
    cible: string,
    type: 'renvoie_a' | 'est_type_de' | 'contribue_a' | 'proche_de' | 'oppose_a',
    score: number,
    direction?: 'positif' | 'negatif'
  }],

  // Enrichissement
  exemples?: string[],
  synonymes?: string[],
  indicateursQuantitatifs?: [{ valeur, source, annee }],

  // IMAGE (NOUVEAU)
  image?: {
    src: string,      // URL Wikimedia ou chemin local
    alt: string,
    credit?: string,
    type?: 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration',
    legende?: string
  }
}
```

---

## NOUVELLES CATÉGORIES CRÉÉES (DÉTAIL)

### forets-oceans.json (22 définitions)
- deforestation, reforestation, foret-primaire, sylviculture-durable
- puits-carbone-forestier, ocean-acidification, recif-corallien, surpeche
- aire-marine-protegee, carbone-bleu, mangrove, plastique-ocean
- zone-morte-oceanique, agroforesterie, bois-construction, incendie-foret
- haute-mer, erosion-cotiere, espece-marine-migratrice, algue-invasive
- herbier-marin, aquaculture-durable

### finance-verte.json (17 définitions)
- finance-durable, criteres-esg, obligation-verte, taxonomie-ue
- csrd, sfdr, risque-climatique-financier, desinvestissement-fossile
- finance-impact, credit-carbone, marche-carbone, label-isr
- greenwashing-financier, engagement-actionnarial, finance-biodiversite
- blended-finance, science-based-targets

### droit-environnement.json (15 définitions)
- droit-environnement, principe-pollueur-payeur, principe-precaution
- accord-paris, contentieux-climatique, ecocide, devoir-vigilance
- droits-nature, convention-biodiversite, etude-impact-environnemental
- prejudice-ecologique, acces-justice-environnementale, directive-habitats
- reglementation-reach, loi-climat-resilience

### technologies-vertes.json (20 définitions)
- energie-solaire-photovoltaique, eolien, hydrogene-vert, batterie-lithium
- vehicule-electrique, captage-carbone, pompe-chaleur, smart-grid
- agriculture-precision, biocarburant, recyclage-avance, impression-3d
- dessalement, bioplastique, stockage-energie, nucleaire-nouvelle-generation
- materiau-biosource, intelligence-artificielle-environnement, geothermie

---

## AMÉLIORATIONS DÉJÀ EFFECTUÉES

### Chat IA (commit fc5092e)
- Détection qualité matches (good/partial/weak) via scores Fuse.js
- Orientation vers catégories quand question hors définitions
- Prompt système enrichi avec vouvoiement

### Qualité données (commit 36ead01)
- Correction URLs génériques → URLs spécifiques
- Ajout indicateurs quantitatifs manquants
- Passage au vouvoiement dans l'UI

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build

# Dev
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite dev

# TypeScript check
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx tsc --noEmit

# Git
git status && git log --oneline -5
git push origin main

# Script images
python3 scripts/add_images.py
```

---

## TODO LIST ACTUELLE

1. [COMPLETED] Créer 4 nouvelles catégories (74 déf)
2. [COMPLETED] Support images (type + frontend)
3. [IN_PROGRESS] Ajouter images aux définitions (10/170 faites)
4. [PENDING] Densifier pour atteindre 300 définitions
5. [PENDING] Build et déploiement final

---

## RAPPEL IMPÉRATIF

**AVANT CHAQUE COMPACTAGE, TU DOIS :**
1. Mettre à jour ce fichier avec l'état exact
2. Créer un nouveau MESSAGE_REPRISE avec cette même structure
3. Le message doit commencer par : "RELIS ABSOLUMENT TOUTE la doc..."
4. Inclure TOUS les détails des tâches en cours

---

**Signature** : Lalou
**Date** : 2025-12-27 ~12h00
**État** : 170 définitions, 10 images ajoutées, script prêt à exécuter

# MESSAGE DE REPRISE GREENGRAPH - 2025-12-28 V12 - REFONTE UI MAJEURE

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

**OBLIGATION ABSOLUE** : Quand tu n'auras plus beaucoup de contexte, tu DOIS rédiger un nouveau message ultra-exhaustif qui reprend EXACTEMENT cette consigne pour gérer le prochain compactage.

---

## PROJET GREENGRAPH

### Informations générales
- **Nom** : GreenGraph - Glossaire interactif écologique
- **URL Production** : https://raouldelpech.github.io/greengraph/
- **Repo GitHub** : https://github.com/RaoulDelpech/greengraph
- **Local** : `/Users/raouldelpech/projets/greengraph/`
- **Stack** : React 19 + TypeScript + Vite 7 + TailwindCSS
- **Déploiement** : GitHub Pages via GitHub Actions

### Commits récents (du plus récent au plus ancien)
```
368329b fix(images): complete developpement-durable image audit
d6195f3 feat(ui): complete redesign - hierarchical list layout
7ed28e3 feat(ui): institutional redesign for professional quality
9b433eb fix(images): replace 45 non-pertinent images with relevant Wikimedia URLs
```

---

## ÉTAT ACTUEL : 179 DÉFINITIONS - REFONTE UI MAJEURE EN COURS

### Comptage par catégorie

| Catégorie | Définitions | Images sans sourceUrl/legende |
|-----------|-------------|-------------------------------|
| energie-climat | 24 | 20 |
| forets-oceans | 22 | 15 |
| technologies-vertes | 19 | 11 |
| finance-verte | 17 | 5 |
| droit-environnement | 15 | 10 |
| biodiversite | 14 | 12 |
| economie-circulaire | 12 | 9 |
| eau | 11 | 6 |
| developpement-durable | 10 | **0** (TERMINÉ) |
| agriculture-alimentation | 10 | 10 |
| dechets | 9 | 9 |
| pollution | 8 | 6 |
| urbanisme-durable | 8 | 8 |
| **TOTAL** | **179** | **~121 à corriger** |

---

## CE QUI A ÉTÉ FAIT CETTE SESSION (2025-12-28)

### 1. REFONTE UI COMPLÈTE (commits d6195f3 + 7ed28e3)

L'utilisateur a demandé une refonte totale car l'ancienne interface (graphe ReactFlow avec cartes qui se chevauchent) ressemblait à un "projet de lycée". Il voulait un niveau "institutionnel type UNESCO/ONU".

#### Questions posées et réponses (Q1-Q10) :

| # | Question | Réponse utilisateur |
|---|----------|---------------------|
| Q1 | Représentation accueil | D - Liste hiérarchique sobre |
| Q2 | Tri catégories | C - Thématique groupée (Nature → Activités → Cadre) |
| Q3 | Affichage définitions | A - Liste simple + panneau latéral |
| Q4 | Palette couleurs | B - Dégradé vert → turquoise → bleu |
| Q5 | Transitions | A - Élégant minimal (fade + cascade) |
| Q6 | Relations | B - Mini-graphe contextuel dans le panneau |
| Q7 | Recherche | C - Intelligente avec suggestions liées |
| Q8 | Header | A - Compact fixe 50px |
| Q9 | Mobile | C - Deux modes (liste par défaut + graphe option) |
| Q10 | Ton visuel | A - Institutionnel élégant (blanc, épuré) |

#### Nouveaux composants créés :

1. **`src/components/Home/CategoryList.tsx`**
   - Groupement thématique des 13 catégories en 4 groupes :
     - Nature & Écosystèmes (biodiversite, forets-oceans, eau)
     - Climat & Énergie (energie-climat, technologies-vertes, pollution)
     - Économie & Production (economie-circulaire, agriculture-alimentation, dechets)
     - Société & Gouvernance (droit-environnement, finance-verte, urbanisme-durable, developpement-durable)
   - Accordéon avec expansion/collapse
   - Comptage dynamique des définitions par groupe

2. **`src/components/Home/DefinitionList.tsx`**
   - Liste alphabétique des définitions d'une catégorie
   - Tri par ordre alphabétique
   - Aperçu du résumé (line-clamp-2)
   - Badge vérifié si niveauValidation === 'vérifié'

3. **`src/components/Definition/MiniGraph.tsx`**
   - Visualisation SVG des 6 voisins max d'un concept
   - Noeud central (terme actuel) + noeuds périphériques (relations)
   - Couleurs par type de relation (renvoie_a, contribue_a, proche_de, oppose_a, est_type_de)
   - Cliquable pour naviguer

4. **`src/components/Layout/Footer.tsx`**
   - Footer institutionnel avec 3 colonnes
   - Licence CC BY-SA 4.0
   - Lien GitHub
   - (Non utilisé car layout plein écran - info mise dans Sidebar à la place)

#### Fichiers modifiés :

- **`index.html`** : lang="fr", titre complet, meta description, Open Graph, Twitter Cards, polices Google Fonts (Source Serif 4 + Inter)
- **`src/index.css`** : Nouvelle palette (forest-900 à forest-50, ocean-900 à ocean-100), animations (fadeIn, fadeInUp, cascade)
- **`src/App.tsx`** : Nouveau layout 3 panneaux (navigation | contenu | définition), suppression ReactFlow
- **`src/components/Layout/Header.tsx`** : Header compact 50px, onGoHome prop
- **`src/components/Layout/Sidebar.tsx`** : Footer intégré avec licence CC et lien GitHub
- **`src/components/Definition/DefinitionPanel.tsx`** : Import MiniGraph, remplacement section relations par MiniGraph

#### Résultat :
- **Bundle size réduit** : 414KB → 259KB (-38%) car ReactFlow supprimé
- **Design** : Institutionnel élégant, blanc dominant, typographie serif pour titres

### 2. AUDIT IMAGES - developpement-durable TERMINÉ (commit 368329b)

L'utilisateur a signalé que l'image de "développement durable" était l'ODD 4 EN ARABE (fichier `Sustainable_Development_Goal_4-ar.png`). Totalement absurde.

#### Les 10 images corrigées dans developpement-durable :

| Terme | Problème | Correction |
|-------|----------|------------|
| developpement-durable | ODD4 en arabe | Logo des 17 ODD |
| rse | Pas de légende/sourceUrl | Ajouté |
| greenwashing | OK (déjà corrigé) | - |
| empreinte-ecologique | Pas de légende/sourceUrl | Ajouté |
| limites-planetaires | Pas de légende/sourceUrl | Ajouté |
| transition-ecologique | Pas de légende/sourceUrl | Ajouté |
| agroecologie | OK (déjà corrigé) | - |
| economie-sociale-solidaire | Image non pertinente | Remplacée par coopérative |
| sobriete | Image non pertinente | Remplacée par vélos Toulouse |
| capital-naturel | Pas de légende/sourceUrl | Ajouté |

#### Format attendu pour chaque image :
```json
"image": {
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/.../1024px-....jpg",
  "alt": "Description détaillée de ce que montre l'image",
  "credit": "Auteur - Licence (CC BY-SA 4.0)",
  "sourceUrl": "https://commons.wikimedia.org/wiki/File:...",
  "type": "photo|schema|logo|infographie|illustration",
  "legende": "Explication du lien entre l'image et le concept"
}
```

---

## CE QUI RESTE À FAIRE

### PRIORITÉ 1 : Audit des 121 images restantes

Catégories par nombre d'images à corriger :

1. **energie-climat** : 20/24 (plus grande, à faire en priorité)
2. **forets-oceans** : 15/22
3. **biodiversite** : 12/14
4. **technologies-vertes** : 11/19
5. **droit-environnement** : 10/15
6. **agriculture-alimentation** : 10/10
7. **economie-circulaire** : 9/12
8. **dechets** : 9/9
9. **urbanisme-durable** : 8/8
10. **eau** : 6/11
11. **pollution** : 6/8
12. **finance-verte** : 5/17

Pour chaque image :
1. Vérifier la pertinence (pas de texte arabe, pas d'image sans rapport)
2. Ajouter `sourceUrl` vers Wikimedia Commons
3. Ajouter `legende` explicative
4. Vérifier que le `credit` inclut la licence

### PRIORITÉ 2 : Recherche intelligente (Q7)

La SearchBar actuelle fait une recherche basique. L'utilisateur a choisi "recherche intelligente avec suggestions liées". À implémenter :
- Grouper les résultats par catégorie
- Suggérer des termes liés (basé sur les relations)

### PRIORITÉ 3 : Mode mobile graphe simplifié (Q9)

L'utilisateur a choisi "deux modes sur mobile" avec graphe simplifié en option. À implémenter :
- Toggle liste/graphe sur mobile
- Version simplifiée du graphe (moins de noeuds)

### PRIORITÉ 4 : Densification vers 300 définitions

Objectif : +121 définitions à créer
Statut : Non commencé

---

## ARCHITECTURE FICHIERS ACTUELLE

```
/Users/raouldelpech/projets/greengraph/
├── public/
│   ├── favicon.svg              # NOUVEAU - Logo feuille+graphe
│   └── data/
│       ├── index.json           # 13 catégories avec images sidebar
│       └── categories/
│           ├── energie-climat.json        # 24 déf
│           ├── forets-oceans.json         # 22 déf
│           ├── technologies-vertes.json   # 19 déf
│           ├── finance-verte.json         # 17 déf
│           ├── droit-environnement.json   # 15 déf
│           ├── biodiversite.json          # 14 déf
│           ├── economie-circulaire.json   # 12 déf
│           ├── eau.json                   # 11 déf
│           ├── developpement-durable.json # 10 déf ✅ AUDITÉ
│           ├── agriculture-alimentation.json # 10 déf
│           ├── dechets.json               # 9 déf
│           ├── pollution.json             # 8 déf
│           └── urbanisme-durable.json     # 8 déf
├── src/
│   ├── App.tsx                  # REFAIT - Layout 3 panneaux
│   ├── index.css                # REFAIT - Palette + animations
│   ├── types/index.ts           # Types TS (DefinitionImage avec sourceUrl)
│   ├── components/
│   │   ├── Home/                # NOUVEAU
│   │   │   ├── CategoryList.tsx # Groupement thématique accordéon
│   │   │   ├── DefinitionList.tsx # Liste définitions catégorie
│   │   │   └── index.ts
│   │   ├── Definition/
│   │   │   ├── DefinitionPanel.tsx # Panneau définition
│   │   │   ├── MiniGraph.tsx    # NOUVEAU - Graphe SVG relations
│   │   │   └── DefinitionDepthToggle.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx       # REFAIT - Compact 50px
│   │   │   ├── Sidebar.tsx      # REFAIT - Footer intégré
│   │   │   ├── Footer.tsx       # NOUVEAU (non utilisé)
│   │   │   └── index.ts
│   │   ├── Graph/               # OBSOLÈTE (ReactFlow supprimé)
│   │   ├── Search/SearchBar.tsx
│   │   ├── Chat/ChatPanel.tsx
│   │   └── Onboarding/OnboardingTour.tsx
│   └── hooks/
│       ├── useDefinitions.ts
│       └── useChat.ts
└── .claude/
    └── MESSAGE_REPRISE_*.md
```

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build

# TypeScript check
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx tsc --noEmit

# Git
git add -A && git commit -m "message" && git push origin main

# Compter définitions
for f in public/data/categories/*.json; do
  echo "$(basename $f .json): $(python3 -c \"import json; print(len(json.load(open('$f'))['definitions']))\")"
done

# Compter images sans sourceUrl
for f in public/data/categories/*.json; do
  cat=$(basename $f .json)
  echo "$cat: $(grep -c '"sourceUrl":' $f) / $(grep -c '"src":' $f)"
done
```

---

## EXIGENCES UTILISATEUR POUR LES IMAGES

1. **PERTINENCE** : Image = concept illustré exactement (PAS de texte arabe aléatoire !)
2. **DROITS** : Licence libre (CC BY-SA, CC0, Public Domain)
3. **CRÉDIT** : Source obligatoire avec auteur et licence
4. **LIEN SOURCE** : URL vers page Wikimedia Commons cliquable (`sourceUrl`)
5. **LÉGENDE** : Explication du lien image-concept (`legende`)
6. **PAS DE PLACEHOLDER** : Pas d'images générées ou Picsum

---

## CHOIX UI VALIDÉS PAR L'UTILISATEUR

| Aspect | Choix |
|--------|-------|
| Layout accueil | Liste hiérarchique avec groupement thématique |
| Navigation | Fil d'Ariane + accordéon catégories |
| Couleurs | Dégradé vert forêt → turquoise → bleu océan |
| Typographie | Source Serif 4 (titres) + Inter (corps) |
| Animations | Fade 300ms + cascade (50ms entre éléments) |
| Relations | Mini-graphe SVG dans panneau définition |
| Header | Compact 50px, logo + recherche + stats |
| Mobile | Liste par défaut, graphe simplifié en option |
| Ton | Institutionnel élégant (blanc, épuré, sobre) |

---

## SIGNATURE

- **Auteur** : Lalou
- **Date** : 2025-12-28 ~00h15
- **État** : 179 définitions, refonte UI terminée, audit images 10/179 (developpement-durable OK), 121 images à corriger
- **Dernier commit** : 368329b fix(images): complete developpement-durable image audit

---

**Copie ce message après /compact pour reprendre sans perte.**

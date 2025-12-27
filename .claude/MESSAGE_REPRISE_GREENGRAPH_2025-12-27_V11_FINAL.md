# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 V11 ULTRA-EXHAUSTIF

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
- **Stack** : React 19 + TypeScript + Vite 7 + ReactFlow 11 + TailwindCSS
- **Déploiement** : GitHub Pages via GitHub Actions

### Dernier commit (JUSTE POUSSÉ)
```
9b433eb fix(images): replace 45 non-pertinent images with relevant Wikimedia URLs
```

---

## ÉTAT ACTUEL : 179 DÉFINITIONS - IMAGES CORRIGÉES

### Comptage par catégorie

| Catégorie | Définitions |
|-----------|-------------|
| energie-climat | 24 |
| forets-oceans | 22 |
| technologies-vertes | 19 |
| finance-verte | 17 |
| droit-environnement | 15 |
| biodiversite | 14 |
| economie-circulaire | 12 |
| eau | 11 |
| developpement-durable | 10 |
| agriculture-alimentation | 10 |
| dechets | 9 |
| pollution | 8 |
| urbanisme-durable | 8 |
| **TOTAL** | **179** |

**Objectif** : 300 définitions (+121 à créer)

---

## CE QUI VIENT D'ÊTRE FAIT (SESSION DU 2025-12-27)

### Problème initial signalé par l'utilisateur
**"Les images ne sont pas pertinentes"** - Exemple : "haute-mer" montrait une planche à voile !

### Analyse exhaustive effectuée
J'ai analysé les 179 images une par une avec ce verdict :
- **EXCELLENT** : 65 (36%)
- **PERTINENT** : 41 (23%)
- **MOYEN** : 28 (16%)
- **PEU PERTINENT** : **45 (25%)** ← REMPLACÉES

### Les 45 images remplacées

| Catégorie | Nb | Exemples de problèmes corrigés |
|-----------|----|----|
| finance-verte | 12 | sfdr (PDF finance islamique→logo Commission), sbti (PDF→courbe températures) |
| forets-oceans | 7 | **haute-mer (windsurf→océan Atlantique)**, surpêche (cabanes→chalutier) |
| technologies-vertes | 7 | **dessalement (toast→usine osmose)**, smart-grid (PDF→schéma) |
| eau | 5 | **cycle-eau (cycle du PLOMB→schéma USGS)**, eau-virtuelle (famine coton→champ coton) |
| droit-environnement | 5 | **précaution (peste 1665→panneaux danger)**, CDB (skyline Perth→récif corail) |
| energie-climat | 4 | GIEC (PDF→logo IPCC), point-basculement (fjord→Groenland) |
| economie-circulaire | 3 | **réparabilité (guide Madère 1800→Repair Café)**, écologie-industrielle (→Kalundborg) |
| pollution | 2 | qualité-air (capteurs écolo→station mesure), bruit (PDF→mur anti-bruit) |
| developpement-durable | 2 | greenwashing (PDF→schéma), agroécologie (PDF→culture diversifiée) |
| biodiversite | 2 | espece-parapluie (PDF→ours polaire), hotspot (PDF→forêt amazonienne) |

### Modifications techniques effectuées

#### 1. Nouveau champ `sourceUrl` dans les types
**Fichier** : `src/types/index.ts` (ligne 60-67)
```typescript
export interface DefinitionImage {
  src: string;           // URL Wikimedia
  alt: string;           // Description
  credit?: string;       // "Auteur - Licence CC"
  sourceUrl?: string;    // NOUVEAU: Lien vers page Wikimedia Commons
  type?: ImageType;      // 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration'
  legende?: string;      // Explication lien image-concept
}
```

#### 2. Crédit cliquable dans DefinitionPanel
**Fichier** : `src/components/Definition/DefinitionPanel.tsx` (lignes 27-46)
```typescript
{image.credit && (
  image.sourceUrl ? (
    <a
      href={image.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-700 hover:underline text-right flex-shrink-0"
    >
      {image.credit}
    </a>
  ) : (
    <span className="text-gray-400 text-right flex-shrink-0">
      {image.credit}
    </span>
  )
)}
```

#### 3. Format des nouvelles images
Chaque image remplacée a ce format :
```json
{
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/.../1024px-....jpg",
  "alt": "Description détaillée de ce que montre l'image",
  "credit": "Auteur - CC BY-SA 4.0",
  "sourceUrl": "https://commons.wikimedia.org/wiki/File:...",
  "type": "photo",
  "legende": "Explication du lien entre l'image et le concept"
}
```

---

## ARCHITECTURE FICHIERS

```
/Users/raouldelpech/projets/greengraph/
├── public/data/
│   ├── index.json                 # 13 catégories avec images sidebar
│   └── categories/
│       ├── energie-climat.json    # 24 définitions
│       ├── forets-oceans.json     # 22 définitions
│       ├── technologies-vertes.json # 19 définitions
│       ├── finance-verte.json     # 17 définitions
│       ├── droit-environnement.json # 15 définitions
│       ├── biodiversite.json      # 14 définitions
│       ├── economie-circulaire.json # 12 définitions
│       ├── eau.json               # 11 définitions
│       ├── developpement-durable.json # 10 définitions
│       ├── agriculture-alimentation.json # 10 définitions
│       ├── dechets.json           # 9 définitions
│       ├── pollution.json         # 8 définitions
│       └── urbanisme-durable.json # 8 définitions
├── src/
│   ├── types/index.ts             # Types TS (Definition, DefinitionImage avec sourceUrl)
│   ├── components/
│   │   ├── Definition/DefinitionPanel.tsx  # Affiche définition + image cliquable
│   │   ├── Layout/Sidebar.tsx              # Liste catégories + miniatures
│   │   ├── Graph/GraphView.tsx             # Visualisation ReactFlow
│   │   └── Chat/ChatPanel.tsx              # Chat Mistral AI
│   └── hooks/
│       ├── useDefinitions.ts      # Chargement JSON
│       └── useChat.ts             # Logique chat
└── .claude/
    └── MESSAGE_REPRISE_*.md       # Messages de reprise
```

---

## HISTORIQUE GIT RÉCENT

```
9b433eb fix(images): replace 45 non-pertinent images with relevant Wikimedia URLs
22cac53 docs: MESSAGE_REPRISE V10 ultra-complet
de97db2 fix(images): add referrerPolicy + update category images
dcd49a9 fix(images): replace all 179 images with verified Wikimedia URLs
8e5a567 feat(images): complete all 169 definitions with images (100%)
8d007ec feat(ui): add category images to sidebar
4703b29 feat(data): add technologies-vertes category with 20 definitions
```

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npx vite build

# TypeScript check
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npx tsc --noEmit

# Git
git add -A && git commit -m "message" && git push origin main

# Compter définitions
for f in public/data/categories/*.json; do
  echo "$(basename $f .json): $(python3 -c "import json; print(len(json.load(open('$f'))['definitions']))")"
done
```

---

## EXIGENCES UTILISATEUR POUR LES IMAGES

1. **PERTINENCE** : Image = concept illustré exactement
2. **DROITS** : Licence libre (CC BY-SA, CC0, Public Domain)
3. **CRÉDIT** : Source obligatoire avec auteur et licence
4. **LIEN SOURCE** : URL vers page Wikimedia Commons cliquable
5. **LÉGENDE** : Explication si pas évident
6. **PAS DE PLACEHOLDER** : Pas d'images générées ou Picsum

---

## PROCHAINES ÉTAPES

1. **Vérifier en production** : https://raouldelpech.github.io/greengraph/
2. **DENSIFIER** : Atteindre 300 définitions (+121 à créer)

---

## SIGNATURE

- **Auteur** : Lalou
- **Date** : 2025-12-27 ~20h25
- **État** : 179 définitions, **45 images corrigées et poussées** (commit 9b433eb), build à vérifier

---

**Copie ce message après /compact pour reprendre sans perte.**

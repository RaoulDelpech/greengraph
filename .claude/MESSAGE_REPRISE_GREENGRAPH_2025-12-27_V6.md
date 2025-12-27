# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 V6

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

**OBLIGATION ABSOLUE** : Quand tu n'auras plus beaucoup de contexte, tu DOIS rédiger un nouveau message ultra-exhaustif qui reprend EXACTEMENT cette consigne pour gérer le prochain compactage.

---

## ÉTAT EXACT AU 2025-12-27 ~13h15

### Infos Projet
- **URL Production** : https://raouldelpech.github.io/greengraph/
- **Repo** : https://github.com/RaoulDelpech/greengraph
- **Local** : `/Users/raouldelpech/projets/greengraph/`
- **Stack** : React 19 + TypeScript + Vite 7 + ReactFlow 11 + TailwindCSS

### Dernier commit (vient d'être poussé)
```
8d007ec feat(ui): add category images to sidebar
```

Commits récents :
```
8d007ec feat(ui): add category images to sidebar
42a1193 feat(images): add 10 images to agriculture, urbanisme, pollution
8a746bf feat(images): add 22 images to new categories
acd9d12 feat(images): add 26 images via batch script
34cb56d docs: add ultra-exhaustive recovery message V4 + images batch script
c1ed941 feat(images): add images to key definitions
656d483 feat(images): add image support with 4 sample images
4703b29 feat(data): add technologies-vertes category with 20 definitions
42141b8 feat(data): add droit-environnement category with 15 definitions
f16ef02 feat(data): add forets-oceans (25) + finance-verte (20)
```

---

## COMPTAGE : 170 DÉFINITIONS + 66 IMAGES

| Catégorie | Déf | Img | Fichier |
|-----------|-----|-----|---------|
| energie-climat | 14 | 14 | energie-climat.json |
| technologies-vertes | 20 | 8 | technologies-vertes.json |
| forets-oceans | 22 | 7 | forets-oceans.json |
| biodiversite | 14 | 5 | biodiversite.json |
| finance-verte | 17 | 4 | finance-verte.json |
| developpement-durable | 10 | 4 | developpement-durable.json |
| economie-circulaire | 12 | 4 | economie-circulaire.json |
| eau | 11 | 4 | eau.json |
| dechets | 9 | 3 | dechets.json |
| droit-environnement | 15 | 3 | droit-environnement.json |
| agriculture-alimentation | 10 | 5 | agriculture-alimentation.json |
| urbanisme-durable | 8 | 3 | urbanisme-durable.json |
| pollution | 8 | 2 | pollution.json |
| **TOTAL** | **170** | **~66** | 13 catégories |

---

## CE QUI VIENT D'ÊTRE FAIT (commité et poussé)

1. **Images catégories dans index.json** : Chaque catégorie a maintenant un champ `image` avec une URL Wikimedia (200px)

2. **Type Categorie mis à jour** (`src/types/index.ts`) :
```typescript
export interface Categorie {
  id: string;
  nom: string;
  description: string;
  couleur: string;
  icone?: string;
  image?: string;  // AJOUTÉ - Image miniature pour l'écran principal
  fichier: string;
}
```

3. **Sidebar.tsx modifié** : Affiche maintenant les images des catégories (10x10 miniatures) avec indicateur de sélection

---

## FICHIERS CLÉS

### Types (src/types/index.ts)
- `DefinitionImage` : Interface pour images des définitions (src, alt, credit, type, legende)
- `ImageType` : 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration'
- `Definition` : Inclut `image?: DefinitionImage`
- `Categorie` : Inclut `image?: string`

### Composants modifiés
- `src/components/Definition/DefinitionPanel.tsx` : Affiche images définitions
- `src/components/Layout/Sidebar.tsx` : Affiche images catégories
- `src/components/Chat/ChatPanel.tsx` : Vouvoiement
- `src/hooks/useChat.ts` : Orientation questions hors sujet

### Données
- `public/data/index.json` : 13 catégories avec images
- `public/data/categories/*.json` : 170 définitions, ~66 avec images

### Scripts
- `scripts/add_images.py` : Batch pour ajouter images aux définitions

---

## PROCHAINES ÉTAPES

1. **Continuer images** : Ajouter images aux définitions restantes (~104)
2. **Densifier** : Atteindre 300 définitions (+130 à créer)
3. **Build final** et vérification

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build

# TypeScript
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx tsc --noEmit

# Script images
python3 scripts/add_images.py

# Git
git add -A && git commit -m "message" && git push origin main
```

---

## DEMANDES UTILISATEUR EN COURS

L'utilisateur a demandé :
1. "je veux qu'à chaque définition soit associée au moins une image" -> EN COURS (66/170)
2. "ajoute une sélection d'images pour l'écran principal" -> FAIT (images catégories)

---

## RAPPEL IMPÉRATIF

**AVANT CHAQUE COMPACTAGE :**
1. Créer MESSAGE_REPRISE_V7.md, V8.md, etc.
2. Commencer par "RELIS ABSOLUMENT TOUTE la doc..."
3. Inclure état exact : commits, comptages, fichiers modifiés

---

**Signature** : Lalou
**Date** : 2025-12-27 ~13h15
**État** : 170 déf, 66 images déf, 13 images catégories, tout commité et poussé

# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 V5 FINAL

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

**OBLIGATION ABSOLUE** : Quand tu n'auras plus beaucoup de contexte, tu DOIS rédiger un nouveau message ultra-exhaustif qui reprend EXACTEMENT cette consigne pour gérer le prochain compactage.

---

## ÉTAT EXACT AU 2025-12-27 ~13h00

### Infos Projet
- **URL Production** : https://raouldelpech.github.io/greengraph/
- **Repo GitHub** : https://github.com/RaoulDelpech/greengraph
- **Répertoire local** : `/Users/raouldelpech/projets/greengraph/`
- **Stack** : React 19 + TypeScript + Vite 7 + ReactFlow 11 + TailwindCSS

### Derniers commits (du plus récent au plus ancien)
```
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

## COMPTAGE DÉFINITIONS : 170 TOTAL

| Catégorie | Définitions | Images | Fichier |
|-----------|-------------|--------|---------|
| energie-climat | 14 | 14/14 | energie-climat.json |
| technologies-vertes | 20 | 8/20 | technologies-vertes.json |
| forets-oceans | 22 | 7/22 | forets-oceans.json |
| biodiversite | 14 | 5/14 | biodiversite.json |
| finance-verte | 17 | 4/17 | finance-verte.json |
| developpement-durable | 10 | 4/10 | developpement-durable.json |
| economie-circulaire | 12 | 4/12 | economie-circulaire.json |
| eau | 11 | 4/11 | eau.json |
| dechets | 9 | 3/9 | dechets.json |
| droit-environnement | 15 | 3/15 | droit-environnement.json |
| agriculture-alimentation | 10 | 5/10 | agriculture-alimentation.json |
| urbanisme-durable | 8 | 3/8 | urbanisme-durable.json |
| pollution | 8 | 2/8 | pollution.json |
| **TOTAL** | **170** | **~66** | 13 catégories |

---

## TÂCHE EN COURS : IMAGES ÉCRAN PRINCIPAL

### Ce qui vient d'être fait (non commité)
- Ajout d'un champ `image` à chaque catégorie dans `index.json`
- Images miniatures (200px) Wikimedia pour les 13 catégories
- Exemple : économie-circulaire a maintenant l'image du schéma circulaire

### Ce qui reste à faire
1. Modifier le type `Categorie` dans `src/types/index.ts` pour ajouter `image?: string`
2. Modifier `Sidebar.tsx` pour afficher les images des catégories
3. Commit et push
4. Vérifier le build

---

## STRUCTURE DES DONNÉES

### Type Definition (dans src/types/index.ts)
```typescript
export interface Definition {
  id: string;
  terme: string;
  categorie: string;
  resume?: string;
  definition: string;
  definitionEtendue?: DefinitionEtendue;
  sources: Source[];
  niveauValidation?: NiveauValidation;
  derniereMiseAJour?: string;
  motsClésScientifiques?: string[];
  relations?: Relation[];
  exemples?: string[];
  synonymes?: string[];
  indicateursQuantitatifs?: IndicateurQuantitatif[];
  image?: DefinitionImage;  // AJOUTÉ
}

export interface DefinitionImage {
  src: string;
  alt: string;
  credit?: string;
  type?: ImageType;  // 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration'
  legende?: string;
}
```

### Type Categorie (À MODIFIER)
```typescript
export interface Categorie {
  id: string;
  nom: string;
  description: string;
  couleur: string;
  icone?: string;
  image?: string;  // À AJOUTER
  fichier: string;
}
```

---

## FICHIERS MODIFIÉS RÉCEMMENT

### Composants
- `src/components/Definition/DefinitionPanel.tsx` : Ajout composant `DefinitionImageDisplay`
- `src/components/Chat/ChatPanel.tsx` : Vouvoiement + orientation
- `src/hooks/useChat.ts` : Détection qualité matches + vouvoiement

### Données
- `public/data/index.json` : 13 catégories avec images (JUSTE MODIFIÉ, NON COMMITÉ)
- Tous les fichiers `public/data/categories/*.json` : Images ajoutées aux définitions

### Scripts
- `scripts/add_images.py` : Script batch pour ajouter images (fonctionne)

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build

# TypeScript check
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx tsc --noEmit

# Script images
python3 scripts/add_images.py

# Git
git add -A && git commit -m "message" && git push origin main
```

---

## PROCHAINES ÉTAPES IMMÉDIATES

1. **URGENT** : Modifier `src/types/index.ts` pour ajouter `image?: string` à Categorie
2. **URGENT** : Modifier `Sidebar.tsx` pour afficher images catégories
3. Commit les modifications
4. Vérifier build
5. Push vers GitHub

---

## OBJECTIFS GLOBAUX RESTANTS

1. [FAIT] 4 nouvelles catégories créées (74 définitions)
2. [FAIT] Support images ajouté (type + composant)
3. [PARTIEL] Images définitions : 66/170 (~39%)
4. [EN COURS] Images catégories pour écran principal
5. [PENDING] Densifier pour 300 définitions (+130 à créer)
6. [PENDING] Build et déploiement final

---

## RAPPEL IMPÉRATIF AVANT COMPACTAGE

**AVANT CHAQUE COMPACTAGE, TU DOIS :**
1. Mettre à jour ce fichier MESSAGE_REPRISE avec l'état exact
2. Créer un nouveau fichier V6, V7, etc.
3. Le message DOIT commencer par : "RELIS ABSOLUMENT TOUTE la doc..."
4. Inclure TOUS les détails des tâches en cours et des fichiers modifiés non commités

---

**Signature** : Lalou
**Date** : 2025-12-27 ~13h00
**État résumé** : 170 définitions, 66 images définitions, images catégories en cours d'ajout (index.json modifié non commité)

# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 V7

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

**OBLIGATION ABSOLUE** : Quand tu n'auras plus beaucoup de contexte, tu DOIS rédiger un nouveau message ultra-exhaustif qui reprend EXACTEMENT cette consigne pour gérer le prochain compactage.

---

## ÉTAT EXACT AU 2025-12-27 ~14h30

### Infos Projet
- **URL Production** : https://raouldelpech.github.io/greengraph/
- **Repo** : https://github.com/RaoulDelpech/greengraph
- **Local** : `/Users/raouldelpech/projets/greengraph/`
- **Stack** : React 19 + TypeScript + Vite 7 + ReactFlow 11 + TailwindCSS

### Dernier commit
```
8e5a567 feat(images): complete all 169 definitions with images (100%)
```

Commits récents :
```
8e5a567 feat(images): complete all 169 definitions with images (100%)
712dd3f docs: add MESSAGE_REPRISE V6 with complete state
8d007ec feat(ui): add category images to sidebar
42a1193 feat(images): add 10 images to agriculture, urbanisme, pollution
8a746bf feat(images): add 22 images to new categories
acd9d12 feat(images): add 26 images via batch script
```

---

## COMPTAGE FINAL : 169 DÉFINITIONS + 169 IMAGES (100%)

| Catégorie | Déf | Img | Statut |
|-----------|-----|-----|--------|
| energie-climat | 14 | 14 | 100% |
| technologies-vertes | 19 | 19 | 100% |
| forets-oceans | 22 | 22 | 100% |
| finance-verte | 17 | 17 | 100% |
| droit-environnement | 15 | 15 | 100% |
| biodiversite | 14 | 14 | 100% |
| economie-circulaire | 12 | 12 | 100% |
| eau | 11 | 11 | 100% |
| developpement-durable | 10 | 10 | 100% |
| dechets | 9 | 9 | 100% |
| pollution | 8 | 8 | 100% |
| agriculture-alimentation | 10 | 10 | 100% |
| urbanisme-durable | 8 | 8 | 100% |
| **TOTAL** | **169** | **169** | **100%** |

---

## CE QUI A ÉTÉ FAIT CETTE SESSION

### Session images (~14h00-14h30)
103 images ajoutées pour atteindre 100% de couverture :
- forets-oceans: 15 (forêts primaires, récifs, baleines, mangroves...)
- finance-verte: 13 (ESG, taxonomie UE, SBTi, ISR...)
- droit-environnement: 12 (Aarhus, Natura 2000, REACH...)
- technologies-vertes: 11 (captage CO2, SMR, agriculture précision...)
- biodiversite: 9 (lémurien, écoduc, rewilding, hotspots...)
- economie-circulaire: 8 (Kalundborg, repair café, consigne...)
- eau: 7 (aquifères, GIRE, assainissement...)
- developpement-durable: 6 (empreinte, sobriété, ESS...)
- dechets: 6 (hiérarchie, REP, biodéchets...)
- pollution: 6 (microplastiques, lumineuse, sonore...)
- agriculture-alimentation: 5 (circuits courts, semences...)
- urbanisme-durable: 5 (écoquartier Vauban, ZFE...)

### Type d'images
- Mix réaliste : photos de terrain, paysages, infrastructures
- Mix esthétique : images spectaculaires (baleines, forêts, récifs)
- Schémas pour concepts abstraits (finance, droit)
- Logos pour standards/labels (ISR, Natura 2000, SBTi)

---

## FICHIERS CLÉS

### Types (src/types/index.ts)
- `DefinitionImage` : src, alt, credit, type, legende
- `ImageType` : 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration'
- `Definition` : inclut `image?: DefinitionImage`
- `Categorie` : inclut `image?: string`

### Composants
- `src/components/Definition/DefinitionPanel.tsx` : Affiche images définitions
- `src/components/Layout/Sidebar.tsx` : Affiche images catégories (10x10)
- `src/components/Chat/ChatPanel.tsx` : Vouvoiement
- `src/hooks/useChat.ts` : Orientation questions hors sujet

### Données
- `public/data/index.json` : 13 catégories avec images miniatures
- `public/data/categories/*.json` : 169 définitions, 169 images

### Scripts
- `scripts/add_images.py` : Batch pour ajouter images aux définitions

---

## PROCHAINES ÉTAPES

1. **Densifier** : Atteindre 300 définitions (+131 à créer)
2. **Qualité images** : Vérifier que toutes les URLs Wikimedia fonctionnent
3. **Build final** et vérification production

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build

# TypeScript
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx tsc --noEmit

# Comptage images
for f in public/data/categories/*.json; do name=$(basename "$f" .json); total=$(python3 -c "import json; data=json.load(open('$f')); print(len(data.get('definitions', [])))"); with_img=$(python3 -c "import json; data=json.load(open('$f')); print(sum(1 for d in data.get('definitions', []) if 'image' in d))"); echo "$name: $with_img/$total"; done

# Git
git add -A && git commit -m "message" && git push origin main
```

---

## RAPPEL IMPÉRATIF

**AVANT CHAQUE COMPACTAGE :**
1. Créer MESSAGE_REPRISE_V8.md, V9.md, etc.
2. Commencer par "RELIS ABSOLUMENT TOUTE la doc..."
3. Inclure état exact : commits, comptages, fichiers modifiés

---

**Signature** : Lalou
**Date** : 2025-12-27 ~14h30
**État** : 169 déf, 169 images (100%), 13 images catégories, tout commité et poussé, build OK

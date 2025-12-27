# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 V8

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

**OBLIGATION ABSOLUE** : Quand tu n'auras plus beaucoup de contexte, tu DOIS rédiger un nouveau message ultra-exhaustif qui reprend EXACTEMENT cette consigne pour gérer le prochain compactage.

---

## ÉTAT EXACT AU 2025-12-27 ~15h30

### Infos Projet
- **URL Production** : https://raouldelpech.github.io/greengraph/
- **Repo** : https://github.com/RaoulDelpech/greengraph
- **Local** : `/Users/raouldelpech/projets/greengraph/`
- **Stack** : React 19 + TypeScript + Vite 7 + ReactFlow 11 + TailwindCSS

### Dernier commit
```
dcd49a9 fix(images): replace all 179 images with verified Wikimedia URLs
```

---

## PROBLÈME RÉSOLU : IMAGES 404

### Cause du problème
Les URLs Wikimedia Commons initiales étaient FICTIVES (noms de fichiers inventés qui n'existaient pas).

### Solution appliquée
1. Utilisation de l'API Wikimedia Commons pour chercher de vraies images
2. Script Python qui :
   - Cherche chaque terme sur Wikimedia Commons
   - Récupère l'URL réelle via l'API `imageinfo`
   - Met à jour les fichiers JSON avec des URLs vérifiées (HTTP 200)
3. 179 images mises à jour avec des URLs fonctionnelles

### Vérification
Toutes les URLs testées retournent HTTP 200.

---

## COMPTAGE : 179 DÉFINITIONS (toutes avec images)

| Catégorie | Déf | Images |
|-----------|-----|--------|
| energie-climat | 24 | 24 |
| technologies-vertes | 19 | 19 |
| forets-oceans | 22 | 22 |
| finance-verte | 17 | 17 |
| droit-environnement | 15 | 15 |
| biodiversite | 14 | 14 |
| economie-circulaire | 12 | 12 |
| eau | 11 | 11 |
| developpement-durable | 10 | 10 |
| dechets | 9 | 9 |
| pollution | 8 | 8 |
| agriculture-alimentation | 10 | 10 |
| urbanisme-durable | 8 | 8 |
| **TOTAL** | **179** | **179** |

---

## FICHIERS CLÉS

### Scripts
- Script de mise à jour images via API Wikimedia dans conversation (non sauvegardé en fichier)
- `scripts/add_images.py` : Version précédente (URLs fictives, obsolète)

### Types
- `src/types/index.ts` : DefinitionImage, Categorie avec image

### Composants
- `src/components/Definition/DefinitionPanel.tsx` : DefinitionImageDisplay
- `src/components/Layout/Sidebar.tsx` : Images catégories

---

## PROCHAINES ÉTAPES

1. **Densifier** : Atteindre 300 définitions (+121 à créer)
2. **Vérifier en production** : Tester les images sur https://raouldelpech.github.io/greengraph/

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" npx vite build

# Vérifier une URL image
curl -s -o /dev/null -w "%{http_code}" "URL"

# Git
git add -A && git commit -m "message" && git push origin main
```

---

**Signature** : Lalou
**Date** : 2025-12-27 ~15h30
**État** : 179 déf, 179 images FONCTIONNELLES, build OK, poussé

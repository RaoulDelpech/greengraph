# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 V9 ULTRA-EXHAUSTIF

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

**OBLIGATION ABSOLUE** : Quand tu n'auras plus beaucoup de contexte, tu DOIS rédiger un nouveau message ultra-exhaustif qui reprend EXACTEMENT cette consigne pour gérer le prochain compactage.

---

## ÉTAT EXACT AU 2025-12-27 ~16h00

### Infos Projet
- **URL Production** : https://raouldelpech.github.io/greengraph/
- **Repo** : https://github.com/RaoulDelpech/greengraph
- **Local** : `/Users/raouldelpech/projets/greengraph/`
- **Stack** : React 19 + TypeScript + Vite 7 + ReactFlow 11 + TailwindCSS

### Dernier commit (non poussé)
Des modifications sont en cours, non commitées.

---

## PROBLÈME ACTUEL EN COURS DE RÉSOLUTION

### Problème signalé par l'utilisateur
**"Les images ne sont pas pertinentes"** - Exemple : "haute-mer" montre une planche à voile !

### Exigences utilisateur pour les images
1. **Images pertinentes** : Chaque image doit correspondre exactement au concept
2. **Droits clairs** : Licences permettant reproduction (CC BY, CC BY-SA, domaine public)
3. **Source citée** : Chaque image doit avoir une source/crédit
4. **Explication** : Si l'image n'est pas évidente, ajouter une légende explicative
5. **PAS d'images générées** : Uniquement photos/schémas réels

### Ce qui a été fait (incomplet)
1. Remplacement des URLs fictives par URLs via API Wikimedia
2. Ajout de `referrerPolicy="no-referrer"` et `crossOrigin="anonymous"` aux balises img
3. Mise à jour de index.json avec nouvelles URLs catégories

### Ce qui reste à faire
1. **VÉRIFIER MANUELLEMENT** chaque image pour pertinence
2. **Ajouter des légendes explicatives** à chaque image
3. **Vérifier les licences** Wikimedia (CC BY-SA typiquement OK)
4. Commit et push des changements

---

## COMPTAGE ACTUEL : 179 DÉFINITIONS

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

---

## HISTORIQUE DES COMMITS RÉCENTS

```
dcd49a9 fix(images): replace all 179 images with verified Wikimedia URLs
c7a2ead docs: add MESSAGE_REPRISE V7 - 100% image coverage
8e5a567 feat(images): complete all 169 definitions with images (100%)
712dd3f docs: add MESSAGE_REPRISE V6 with complete state
8d007ec feat(ui): add category images to sidebar
```

---

## STRUCTURE DU CODE

### Types (src/types/index.ts)
```typescript
export interface DefinitionImage {
  src: string;           // URL de l'image
  alt: string;           // Description alternative
  credit?: string;       // Source/crédit OBLIGATOIRE pour Wikimedia
  type?: ImageType;      // 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration'
  legende?: string;      // Légende IMPORTANTE pour expliquer le lien avec le concept
}

export interface Categorie {
  id: string;
  nom: string;
  description: string;
  couleur: string;
  icone?: string;
  image?: string;  // Image miniature sidebar
  fichier: string;
}
```

### Composants clés

**DefinitionPanel.tsx** (lignes 6-36) :
```typescript
function DefinitionImageDisplay({ image }: { image: DefinitionImage }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <figure className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
      )}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-48 object-cover rounded-lg...`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        loading="lazy"
      />
      {/* Légende et crédit affichés ici */}
    </figure>
  );
}
```

**Sidebar.tsx** : Affiche images catégories avec mêmes attributs

---

## SCRIPT DE RECHERCHE D'IMAGES

Le script Python utilise l'API Wikimedia Commons :
```python
def search_wikimedia_image(query):
    # 1. Cherche sur Commons avec la query
    # 2. Filtre les vidéos (.webm, .ogg)
    # 3. Récupère l'URL thumb via imageinfo
    # 4. Retourne URL ou None
```

Problème : La recherche automatique ne garantit pas la pertinence !

---

## SOLUTION RECOMMANDÉE POUR LES IMAGES

### Option 1 : Curation manuelle (recommandée)
Pour chaque définition :
1. Aller sur commons.wikimedia.org
2. Chercher une image VRAIMENT pertinente
3. Vérifier la licence (CC BY-SA, CC0, Public Domain)
4. Copier l'URL exacte
5. Ajouter crédit et légende explicative

### Option 2 : Améliorer les requêtes de recherche
Rendre les requêtes plus spécifiques pour chaque terme.

### Format image attendu
```json
{
  "src": "https://upload.wikimedia.org/wikipedia/commons/...",
  "alt": "Description précise de ce que montre l'image",
  "credit": "Auteur - Wikimedia Commons CC BY-SA 4.0",
  "type": "photo",
  "legende": "Explication du lien entre l'image et le concept"
}
```

---

## FICHIERS MODIFIÉS NON COMMITÉS

1. `src/components/Definition/DefinitionPanel.tsx` - Ajout referrerPolicy
2. `src/components/Layout/Sidebar.tsx` - Ajout referrerPolicy
3. `public/data/index.json` - Nouvelles URLs catégories

---

## COMMANDES UTILES

```bash
# Build
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npx vite build

# Tester une URL
curl -s -o /dev/null -w "%{http_code}" "URL"

# Git
git add -A && git status
git commit -m "message"
git push origin main

# Compter définitions
python3 -c "
import json, glob
total = sum(len(json.load(open(f)).get('definitions',[]))
            for f in glob.glob('public/data/categories/*.json'))
print(f'Total: {total}')
"
```

---

## PROCHAINES ACTIONS IMMÉDIATES

1. **Commit les modifications actuelles** (referrerPolicy + index.json)
2. **Décider de l'approche images** : curation manuelle vs automatique améliorée
3. **Si curation manuelle** : Traiter catégorie par catégorie avec images vérifiées
4. **Objectif final** : 300 définitions avec images pertinentes et sourcées

---

## RAPPEL CRITIQUE

L'utilisateur veut :
- **Pertinence** : Image = concept illustré
- **Droits** : Licence libre citée
- **Source** : Crédit obligatoire
- **Explication** : Légende si besoin

**NE PAS utiliser d'images générées ou placeholders !**

---

**Signature** : Lalou
**Date** : 2025-12-27 ~16h00
**État** : 179 déf, images partiellement corrigées, problème de pertinence à résoudre

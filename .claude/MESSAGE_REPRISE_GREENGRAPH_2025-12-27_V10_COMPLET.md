# MESSAGE DE REPRISE GREENGRAPH - 2025-12-27 V10 ULTRA-COMPLET

## INSTRUCTION CRITIQUE POUR CLAUDE

RELIS ABSOLUMENT TOUTE la doc avec un niveau de profondeur absolument maximal et pareil pour le code et pareil pour l'architecture et reprend le travail là où tu étais sans la MOINDRE déperdition.

**OBLIGATION ABSOLUE** : Quand tu n'auras plus beaucoup de contexte, tu DOIS rédiger un nouveau message ultra-exhaustif qui reprend EXACTEMENT cette consigne pour gérer le prochain compactage. Ce message doit faire plusieurs centaines de lignes et contenir TOUS les détails.

---

## 1. INFORMATIONS PROJET

### Identité
- **Nom** : GreenGraph
- **Description** : Glossaire interactif de l'écologie et du développement durable avec visualisation en graphe
- **URL Production** : https://raouldelpech.github.io/greengraph/
- **Repo GitHub** : https://github.com/RaoulDelpech/greengraph
- **Répertoire local** : `/Users/raouldelpech/projets/greengraph/`

### Stack technique
- **Frontend** : React 19 + TypeScript
- **Build** : Vite 7
- **Visualisation** : ReactFlow 11 (graphe interactif des relations)
- **Styling** : TailwindCSS
- **Déploiement** : GitHub Pages via GitHub Actions

### Commande de build
```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build
```

---

## 2. ARCHITECTURE DES FICHIERS

### Structure complète
```
/Users/raouldelpech/projets/greengraph/
├── .claude/
│   └── MESSAGE_REPRISE_*.md          # Messages de reprise (ce fichier)
├── public/
│   ├── data/
│   │   ├── index.json                # Liste des 13 catégories avec images
│   │   └── categories/
│   │       ├── agriculture-alimentation.json  (10 déf)
│   │       ├── biodiversite.json              (14 déf)
│   │       ├── dechets.json                   (9 déf)
│   │       ├── developpement-durable.json     (10 déf)
│   │       ├── droit-environnement.json       (15 déf)
│   │       ├── eau.json                       (11 déf)
│   │       ├── economie-circulaire.json       (12 déf)
│   │       ├── energie-climat.json            (24 déf)
│   │       ├── finance-verte.json             (17 déf)
│   │       ├── forets-oceans.json             (22 déf)
│   │       ├── pollution.json                 (8 déf)
│   │       ├── technologies-vertes.json       (19 déf)
│   │       └── urbanisme-durable.json         (8 déf)
│   └── images/                        # Dossiers vides (images externes)
├── src/
│   ├── App.tsx                        # Composant principal
│   ├── main.tsx                       # Point d'entrée
│   ├── types/
│   │   └── index.ts                   # Tous les types TypeScript
│   ├── components/
│   │   ├── Definition/
│   │   │   ├── DefinitionPanel.tsx    # Panneau détail + DefinitionImageDisplay
│   │   │   └── DefinitionDepthToggle.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx            # Liste catégories + images miniatures
│   │   ├── Graph/
│   │   │   └── GraphView.tsx          # Visualisation ReactFlow
│   │   ├── List/
│   │   │   └── ListView.tsx           # Vue mobile
│   │   ├── Chat/
│   │   │   └── ChatPanel.tsx          # Chat avec Mistral AI
│   │   ├── Search/
│   │   │   └── SearchBar.tsx
│   │   └── Onboarding/
│   │       └── OnboardingTour.tsx
│   ├── hooks/
│   │   ├── useDefinitions.ts          # Chargement données JSON
│   │   ├── useChat.ts                 # Logique chat Mistral
│   │   └── useKeyboardNavigation.ts
│   └── utils/
│       └── mistralClient.ts           # Client API Mistral
├── scripts/
│   └── add_images.py                  # Script batch images (OBSOLÈTE)
├── dist/                              # Build production
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 3. TYPES TYPESCRIPT COMPLETS

### Fichier src/types/index.ts

```typescript
// Types de relation entre définitions
export type RelationType =
  | 'renvoie_a'      // Référence directe
  | 'est_type_de'    // Relation hiérarchique
  | 'contribue_a'    // Lien causal
  | 'proche_de'      // Similarité
  | 'oppose_a';      // Contraste

// Types de source
export type SourceType =
  | 'article_peer_reviewed'
  | 'rapport_institution'
  | 'ouvrage_reference'
  | 'loi'
  | 'norme_iso'
  | 'these'
  | 'article' | 'livre' | 'rapport' | 'institution';  // legacy

export type NiveauPreuve = 'elevé' | 'moyen' | 'faible';

export interface Source {
  titre: string;
  auteur?: string;
  url?: string;
  doi?: string;
  annee?: number;
  type: SourceType;
  journal?: string;
  institution?: string;
  niveauPreuve?: NiveauPreuve;
}

export interface Relation {
  cible: string;           // ID définition liée
  type: RelationType;
  score: number;           // Proximité 0-100
  direction?: 'positif' | 'negatif';
}

// Définition étendue niveau expert
export interface DefinitionEtendue {
  introduction: string;
  mecanismes: string;
  contexteScientifique: string;
  enjeuxActuels: string;
  perspectives: string;
}

export interface IndicateurQuantitatif {
  valeur: string;
  source: string;
  annee: number;
}

// TYPES IMAGES - IMPORTANT
export type ImageType = 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration';

export interface DefinitionImage {
  src: string;           // URL Wikimedia Commons
  alt: string;           // Description alternative
  credit?: string;       // OBLIGATOIRE: "Auteur - Licence"
  type?: ImageType;
  legende?: string;      // IMPORTANT: Explication du lien image-concept
}

export type NiveauValidation = 'vérifié' | 'préliminaire' | 'en_révision';

// DÉFINITION COMPLÈTE
export interface Definition {
  id: string;              // Slug unique (ex: "changement-climatique")
  terme: string;           // Nom affiché

  // Niveaux de définition
  resume?: string;                    // 1-2 phrases
  definition: string;                 // 2-3 paragraphes
  definitionEtendue?: DefinitionEtendue;  // Niveau expert

  // Sources
  sources: Source[];
  niveauValidation?: NiveauValidation;
  derniereMiseAJour?: string;

  // Classification
  categorie: string;
  tags?: string[];
  motsClésScientifiques?: string[];

  // Relations
  relations?: Relation[];

  // Enrichissement
  exemples?: string[];
  synonymes?: string[];
  indicateursQuantitatifs?: IndicateurQuantitatif[];

  // IMAGE - CHAMP CLÉ
  image?: DefinitionImage;
}

// CATÉGORIE
export interface Categorie {
  id: string;
  nom: string;
  description: string;
  couleur: string;        // Hex color
  icone?: string;
  image?: string;         // URL miniature sidebar
  fichier: string;        // Nom fichier JSON
}

export interface CategoriesIndex {
  categories: Categorie[];
}

// Chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: string[];
  sources?: Source[];
}

export type DefinitionDepth = 'resume' | 'standard' | 'expert';
```

---

## 4. COMPOSANTS CLÉS

### DefinitionImageDisplay (DefinitionPanel.tsx lignes 6-36)

```typescript
function DefinitionImageDisplay({ image }: { image: DefinitionImage }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;  // Cache si erreur chargement

  return (
    <figure className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
      )}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"      // AJOUTÉ pour Wikimedia
        crossOrigin="anonymous"            // AJOUTÉ pour CORS
        loading="lazy"                     // AJOUTÉ pour performance
      />
      {(image.legende || image.credit) && (
        <figcaption className="mt-1.5 text-xs text-gray-500 flex justify-between">
          {image.legende && <span className="italic">{image.legende}</span>}
          {image.credit && <span className="text-gray-400">{image.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
```

### Sidebar.tsx - Images catégories (lignes 58-68)

```typescript
<img
  src={category.image}
  alt={category.nom}
  className="w-10 h-10 rounded-lg object-cover"
  onError={(e) => { e.currentTarget.style.display = 'none'; }}
  referrerPolicy="no-referrer"
  crossOrigin="anonymous"
  loading="lazy"
/>
```

---

## 5. ÉTAT DES DONNÉES

### Comptage par catégorie (179 définitions total)

| Catégorie | Fichier | Déf | Images |
|-----------|---------|-----|--------|
| energie-climat | energie-climat.json | 24 | 24 |
| forets-oceans | forets-oceans.json | 22 | 22 |
| technologies-vertes | technologies-vertes.json | 19 | 19 |
| finance-verte | finance-verte.json | 17 | 17 |
| droit-environnement | droit-environnement.json | 15 | 15 |
| biodiversite | biodiversite.json | 14 | 14 |
| economie-circulaire | economie-circulaire.json | 12 | 12 |
| eau | eau.json | 11 | 11 |
| developpement-durable | developpement-durable.json | 10 | 10 |
| agriculture-alimentation | agriculture-alimentation.json | 10 | 10 |
| dechets | dechets.json | 9 | 9 |
| pollution | pollution.json | 8 | 8 |
| urbanisme-durable | urbanisme-durable.json | 8 | 8 |
| **TOTAL** | | **179** | **179** |

### Objectif : 300 définitions (+121 à créer)

---

## 6. HISTORIQUE GIT COMPLET

```
de97db2 fix(images): add referrerPolicy + update category images + recovery V9
dcd49a9 fix(images): replace all 179 images with verified Wikimedia URLs
c7a2ead docs: add MESSAGE_REPRISE V7 - 100% image coverage
8e5a567 feat(images): complete all 169 definitions with images (100%)
712dd3f docs: add MESSAGE_REPRISE V6 with complete state
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

## 7. PROBLÈME ACTUEL - IMAGES NON PERTINENTES

### Constat utilisateur
Les images ajoutées automatiquement via l'API Wikimedia Commons ne sont PAS pertinentes.
Exemple : "haute-mer" montre une planche à voile au lieu de l'océan ouvert.

### Exigences utilisateur pour les images
1. **PERTINENCE** : L'image doit illustrer EXACTEMENT le concept
2. **DROITS** : Licence libre (CC BY-SA, CC0, Public Domain)
3. **CRÉDIT** : Source obligatoire dans le champ `credit`
4. **LÉGENDE** : Explication si le lien n'est pas évident
5. **PAS DE PLACEHOLDER** : Pas de Picsum, pas d'images générées

### Cause du problème
Le script de recherche automatique via API Wikimedia :
```python
def search_wikimedia_image(query):
    # Cherche sur commons.wikimedia.org
    # Prend le premier résultat
    # Ne vérifie PAS la pertinence
```

### Solution nécessaire
**CURATION MANUELLE** :
1. Aller sur https://commons.wikimedia.org
2. Chercher une image VRAIMENT appropriée
3. Vérifier la licence
4. Copier l'URL thumb exacte
5. Remplir credit et legende

---

## 8. FORMAT JSON ATTENDU POUR LES IMAGES

### Exemple correct
```json
{
  "image": {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Example.jpg/640px-Example.jpg",
    "alt": "Description précise de ce que montre l'image",
    "credit": "Auteur - Wikimedia Commons CC BY-SA 4.0",
    "type": "photo",
    "legende": "Cette image illustre [concept] car [explication]"
  }
}
```

### Exemple MAUVAIS (actuel)
```json
{
  "image": {
    "src": "https://upload.wikimedia.org/...",
    "alt": "Haute mer",
    "credit": "Wikimedia Commons",
    "type": "photo"
    // PAS DE LÉGENDE, IMAGE NON PERTINENTE (planche à voile)
  }
}
```

---

## 9. SCRIPT API WIKIMEDIA (pour référence)

Le script utilisé recherche via l'API :
```python
import json
import urllib.request
import urllib.parse
import ssl
import time

ssl._create_default_https_context = ssl._create_unverified_context

def search_wikimedia_image(query, limit=3):
    try:
        # Recherche
        search_url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}+-filetype:webm+-filetype:ogg+-filetype:svg&srnamespace=6&format=json&srlimit={limit}"
        req = urllib.request.Request(search_url, headers={'User-Agent': 'GreenGraph/1.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())

        for result in data.get('query', {}).get('search', []):
            title = result['title'].replace('File:', '')
            # Skip videos
            if any(ext in title.lower() for ext in ['.webm', '.ogg', '.ogv', '.mp4']):
                continue

            # Get thumb URL
            info_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles=File:{urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&iiurlwidth=640&format=json"
            req = urllib.request.Request(info_url, headers={'User-Agent': 'GreenGraph/1.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode())

            for page in data.get('query', {}).get('pages', {}).values():
                imageinfo = page.get('imageinfo', [{}])
                if imageinfo:
                    return imageinfo[0].get('thumburl')
        return None
    except:
        return None
```

---

## 10. COMMANDES UTILES

### Build et TypeScript
```bash
# Build production
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx vite build

# Check TypeScript
PATH="/opt/homebrew/opt/node@20/bin:$PATH:/bin:/usr/bin" /opt/homebrew/opt/node@20/bin/npx tsc --noEmit

# Dev server
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run dev
```

### Git
```bash
git add -A && git status
git commit -m "message"
git push origin main
git log --oneline -10
```

### Comptage définitions
```bash
for f in public/data/categories/*.json; do
  name=$(basename "$f" .json)
  count=$(python3 -c "import json; print(len(json.load(open('$f')).get('definitions',[])))")
  echo "$name: $count"
done
```

### Test URL image
```bash
curl -s -o /dev/null -w "%{http_code}" "URL"
```

---

## 11. PROCHAINES ACTIONS

### Priorité 1 : Résoudre le problème des images
- Option A : Curation manuelle (recommandée mais longue)
- Option B : Améliorer les requêtes de recherche
- L'utilisateur a refusé les images non pertinentes

### Priorité 2 : Densifier les définitions
- Objectif : 300 définitions (actuellement 179)
- À créer : 121 nouvelles définitions
- Avec images pertinentes dès la création

### Priorité 3 : Build et déploiement
- Vérifier le fonctionnement en production
- Tester l'affichage des images

---

## 12. DEMANDES UTILISATEUR HISTORIQUES

1. "je veux qu'à chaque définition soit associée au moins une image" → FAIT (179/179)
2. "ajoute une sélection d'images pour l'écran principal" → FAIT (sidebar)
3. "les images ne sont pas pertinentes" → À RÉSOUDRE
4. "je veux des images réalistes et esthétiques" → À FAIRE
5. "droits permettant reproduction en citant la source" → À VÉRIFIER

---

## 13. RÈGLES CLAUDE.MD

- Toujours tutoyer
- Jamais d'emojis sauf demande
- Signature : "Lalou"
- Questions avec options et recommandation

---

**Signature** : Lalou
**Date** : 2025-12-27 ~16h15
**Dernier commit** : de97db2
**État** : 179 déf, images NON PERTINENTES à corriger, demande curation manuelle
**Prochaine action** : Décider approche images avec utilisateur

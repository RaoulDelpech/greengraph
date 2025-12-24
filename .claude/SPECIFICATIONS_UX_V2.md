# SPÉCIFICATIONS UX V2 - GREENGRAPH

## Audit réalisé le 2025-12-24
## Basé sur benchmark des meilleures pratiques (Cambridge Intelligence, Stanford CS520, WCAG 2.1)

---

## PARTIE 1 : ÉCARTS IDENTIFIÉS (Code actuel vs Best Practices)

### 1.1 Navigation

| Élément | État actuel | Best Practice | Écart | Priorité |
|---------|-------------|---------------|-------|----------|
| Fil d'Ariane | Basique (Catégories > Terme) | Hiérarchie complète cliquable | Moyen | P1 |
| Navigation clavier | Aucune | Tab, Enter, Arrow keys | Critique | P1 |
| Sidebar concepts liés | Dans panneau seulement | Toujours visible à droite | Moyen | P2 |
| Retour rapide | Bouton Catégories | Historique de navigation | Faible | P3 |

### 1.2 Densité d'information

| Élément | État actuel | Best Practice | Écart | Priorité |
|---------|-------------|---------------|-------|----------|
| Définitions | 1 paragraphe court | Multi-paragraphes scientifiques avec toggle | Critique | P1 |
| Sources | Liste simple | Qualité scientifique (peer-reviewed, DOI) | Critique | P1 |
| Progressive disclosure | Partiel | 3 niveaux (aperçu, standard, expert) | Élevé | P1 |
| Vue tableau | Absente | Alternative au graphe | Moyen | P2 |

### 1.3 Mobile

| Élément | État actuel | Best Practice | Écart | Priorité |
|---------|-------------|---------------|-------|----------|
| Vue par défaut | Graphe (problématique) | Liste/outline collapsible | Élevé | P1 |
| Touch targets | Variable | 44px minimum | Moyen | P2 |
| Swipe navigation | Aucune | Gauche/droite pour navigation | Moyen | P2 |

### 1.4 Recherche

| Élément | État actuel | Best Practice | Écart | Priorité |
|---------|-------------|---------------|-------|----------|
| Type de recherche | Full-text (Fuse.js) | Sémantique + full-text | Moyen | P2 |
| Suggestions | Basiques | Groupées par catégorie | Faible | P3 |
| Résultats | Liste simple | Preview + contexte | Moyen | P2 |

### 1.5 Chat IA

| Élément | État actuel | Best Practice | Écart | Priorité |
|---------|-------------|---------------|-------|----------|
| Attribution sources | Citations [terme] | Sources complètes avec liens | Élevé | P1 |
| Fallback | Message générique | "Je ne sais pas + suggestions" | Moyen | P2 |
| Contexte | Définitions seules | Définitions étendues + relations | Élevé | P1 |

### 1.6 Accessibilité

| Élément | État actuel | Best Practice | Écart | Priorité |
|---------|-------------|---------------|-------|----------|
| Contraste | Non vérifié | WCAG 7:1+ | Critique | P1 |
| ARIA labels | Absents | Complets | Critique | P1 |
| Focus visible | Par défaut | 3px solid emerald | Élevé | P1 |
| Screen reader | Non testé | Annonces dynamiques | Critique | P1 |

### 1.7 Onboarding

| Élément | État actuel | Best Practice | Écart | Priorité |
|---------|-------------|---------------|-------|----------|
| Tour guidé | Absent | 3 étapes interactives | Élevé | P2 |
| Tooltips contextuels | Absents | Premiers usages | Moyen | P2 |
| Aide accessible | Aucune | ? icon + aide en ligne | Moyen | P3 |

---

## PARTIE 2 : STRUCTURE DES DÉFINITIONS SCIENTIFIQUES

### 2.1 Nouveau schéma de données

```typescript
interface DefinitionScientifique {
  id: string;
  terme: string;

  // NIVEAU 1 : Aperçu (1-2 phrases)
  resumé: string;

  // NIVEAU 2 : Standard (2-3 paragraphes)
  definition: string;

  // NIVEAU 3 : Expert (scientifique, multi-paragraphes)
  definitionEtendue: {
    introduction: string;
    mecanismes: string;        // Processus, fonctionnement
    contexteScientifique: string;  // Historique, découvertes
    enjeuxActuels: string;     // Débats, recherches en cours
    perspectives: string;       // Évolutions, tendances
  };

  // Sources de haute qualité
  sources: SourceScientifique[];

  // Métadonnées
  niveauValidation: 'vérifié' | 'préliminaire' | 'en_révision';
  derniereMiseAJour: string;  // ISO date
  auteurValidation?: string;

  // Relations, exemples, etc. (existants)
  categorie: string;
  tags?: string[];
  relations?: Relation[];
  exemples?: string[];
  synonymes?: string[];

  // Nouveaux champs
  motsClésScientifiques?: string[];  // Pour recherche sémantique
  referencesCroisees?: string[];     // Liens vers autres définitions
  indicateursQuantitatifs?: {        // Données chiffrées
    valeur: string;
    source: string;
    annee: number;
  }[];
}

interface SourceScientifique {
  titre: string;
  auteur?: string;
  url?: string;
  doi?: string;           // Digital Object Identifier
  annee?: number;
  type: 'article_peer_reviewed' | 'rapport_institution' | 'ouvrage_reference' | 'loi' | 'norme_iso' | 'these';
  journal?: string;       // Pour articles
  institution?: string;   // ADEME, GIEC, etc.
  niveauPreuve: 'elevé' | 'moyen' | 'faible';  // Qualité scientifique
}
```

### 2.2 Exemple de définition enrichie

```json
{
  "id": "economie-circulaire",
  "terme": "Économie circulaire",

  "resumé": "Modèle économique régénératif visant à découpler croissance et épuisement des ressources.",

  "definition": "L'économie circulaire est un modèle économique qui rompt avec le schéma linéaire 'extraire-produire-jeter'. Elle repose sur trois principes fondamentaux définis par la Fondation Ellen MacArthur : éliminer les déchets et la pollution dès la conception, maintenir les produits et matériaux en circulation à leur plus haute valeur, et régénérer les systèmes naturels.",

  "definitionEtendue": {
    "introduction": "Le concept d'économie circulaire émerge dans les années 1970 avec les travaux de Kenneth Boulding sur l'économie en vase clos ('Spaceship Earth', 1966) et Walter Stahel sur l'économie de la performance (1976). Il s'est structuré avec l'écologie industrielle (Frosch & Gallopoulos, 1989) et le concept Cradle to Cradle de McDonough et Braungart (2002).",

    "mecanismes": "L'économie circulaire opère à travers plusieurs boucles de valeur hiérarchisées : la réduction à la source (moins de matière utilisée), le réemploi (même fonction), la réparation et remise à neuf, le remanufacturing (désassemblage et réassemblage), et enfin le recyclage. Plus la boucle est courte, plus la valeur est préservée. Le modèle intègre également les flux biologiques (retour au sol des nutriments) et techniques (maintien des matériaux dans le cycle industriel).",

    "contexteScientifique": "La littérature scientifique distingue plusieurs approches : l'approche 'strong' (transformation systémique incluant les limites planétaires) et l'approche 'weak' (optimisation des flux sans remise en cause du modèle de croissance). Les travaux de Kirchherr et al. (2017) ont recensé 114 définitions de l'économie circulaire, révélant une fragmentation conceptuelle. Le débat scientifique porte notamment sur la question du découplage absolu entre croissance et impact environnemental.",

    "enjeuxActuels": "Les recherches actuelles portent sur : (1) la mesure de la circularité (Material Circularity Indicator, Circulytics), (2) les effets rebond potentiels (augmentation de la consommation annulant les gains), (3) l'intégration des aspects sociaux souvent négligés, (4) la dimension territoriale et les questions de gouvernance. Le Green Deal européen (2019) et le plan d'action pour l'économie circulaire de la Commission européenne constituent le cadre réglementaire majeur.",

    "perspectives": "Les évolutions attendues incluent l'émergence de 'passeports numériques des produits' (traçabilité complète), le développement de modèles économiques de l'usage (Product-as-a-Service), et l'intégration de l'intelligence artificielle pour l'optimisation des flux. La recherche s'oriente vers une économie 'régénérative' allant au-delà de la simple circularité."
  },

  "sources": [
    {
      "titre": "Towards the Circular Economy Vol. 1: An economic and business rationale for an accelerated transition",
      "auteur": "Ellen MacArthur Foundation",
      "url": "https://www.ellenmacarthurfoundation.org/towards-the-circular-economy-vol-1-an-economic-and-business-rationale-for-an",
      "annee": 2012,
      "type": "rapport_institution",
      "institution": "Ellen MacArthur Foundation",
      "niveauPreuve": "elevé"
    },
    {
      "titre": "Conceptualizing the circular economy: An analysis of 114 definitions",
      "auteur": "Kirchherr, J., Reike, D., & Hekkert, M.",
      "doi": "10.1016/j.resconrec.2017.09.005",
      "journal": "Resources, Conservation and Recycling",
      "annee": 2017,
      "type": "article_peer_reviewed",
      "niveauPreuve": "elevé"
    },
    {
      "titre": "Loi n° 2020-105 relative à la lutte contre le gaspillage et à l'économie circulaire (AGEC)",
      "url": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000041553759",
      "annee": 2020,
      "type": "loi",
      "institution": "République Française",
      "niveauPreuve": "elevé"
    },
    {
      "titre": "The circular economy: a new sustainability paradigm?",
      "auteur": "Geissdoerfer, M., Savaget, P., Bocken, N.M.P., & Hultink, E.J.",
      "doi": "10.1016/j.jclepro.2016.12.048",
      "journal": "Journal of Cleaner Production",
      "annee": 2017,
      "type": "article_peer_reviewed",
      "niveauPreuve": "elevé"
    }
  ],

  "niveauValidation": "vérifié",
  "derniereMiseAJour": "2025-12-24",

  "indicateursQuantitatifs": [
    {
      "valeur": "Taux de circularité mondial : 7,2% (2023)",
      "source": "Circle Economy - Circularity Gap Report",
      "annee": 2023
    },
    {
      "valeur": "Objectif UE : 70% de recyclage des emballages d'ici 2030",
      "source": "Commission Européenne - Plan d'action économie circulaire",
      "annee": 2020
    }
  ],

  "motsClésScientifiques": [
    "découplage",
    "boucles de valeur",
    "métabolisme industriel",
    "régénératif",
    "limites planétaires"
  ]
}
```

---

## PARTIE 3 : SPÉCIFICATIONS TECHNIQUES UX

### 3.1 Toggle Niveau de Détail

**Composant : DefinitionDepthToggle**

```
┌──────────────────────────────────────┐
│ Niveau de détail :                   │
│ ○ Aperçu  ● Standard  ○ Expert       │
└──────────────────────────────────────┘
```

- Position : En haut du panneau définition
- Persistance : localStorage pour mémoriser le choix
- Animation : Transition smooth entre niveaux

### 3.2 Navigation Clavier

| Touche | Action |
|--------|--------|
| Tab | Naviguer entre éléments focusables |
| Enter | Activer / Ouvrir noeud |
| Escape | Fermer panneau / Retour |
| ← → | Naviguer entre voisins (en mode focus) |
| ↑ ↓ | Naviguer dans la liste des relations |
| / | Focus sur recherche |
| ? | Afficher aide |

### 3.3 Vue Liste Mobile

```
Mobile (< 768px) :
┌─────────────────────────┐
│ 🔍 Rechercher...        │
├─────────────────────────┤
│ ▼ Économie circulaire   │
│   │                     │
│   ├─ ▶ Écoconception    │
│   ├─ ▶ Recyclage        │
│   └─ ▶ Réutilisation    │
│                         │
│ ▶ Biodiversité          │
│ ▶ Énergie & Climat      │
└─────────────────────────┘

Touch : Tap = expand/collapse
        Swipe gauche = détails
```

### 3.4 Sources Haute Qualité - Affichage

```
┌────────────────────────────────────────┐
│ Sources (4)                    [Filtrer]│
├────────────────────────────────────────┤
│ ★★★ Article peer-reviewed              │
│ Kirchherr et al. (2017)                │
│ Resources, Conservation and Recycling  │
│ DOI: 10.1016/j.resconrec.2017.09.005  │
│ [Voir] [Citer]                         │
├────────────────────────────────────────┤
│ ★★★ Rapport institutionnel             │
│ Ellen MacArthur Foundation (2012)      │
│ "Towards the Circular Economy Vol. 1"  │
│ [Voir PDF]                             │
├────────────────────────────────────────┤
│ ★★☆ Loi                                │
│ Loi AGEC (2020)                        │
│ Legifrance                             │
│ [Voir]                                 │
└────────────────────────────────────────┘

Légende étoiles = niveauPreuve
★★★ = élevé (peer-reviewed, institution majeure)
★★☆ = moyen (rapport, institution)
★☆☆ = faible (article web, blog)
```

### 3.5 Onboarding - Tour Guidé

**Étape 1 (obligatoire)**
```
┌─────────────────────────────────────┐
│ 🌿 Bienvenue sur GreenGraph         │
│                                     │
│ Clique sur une catégorie pour       │
│ explorer les concepts               │
│                                     │
│ [Commencer →]                       │
└─────────────────────────────────────┘
```

**Étape 2 (après premier clic)**
Highlight du panneau définition avec tooltip :
"Tu peux changer le niveau de détail ici"

**Étape 3 (après lecture)**
Highlight des relations :
"Clique sur un concept lié pour l'explorer"

### 3.6 Palette Couleurs WCAG

```css
:root {
  /* Texte et éléments */
  --color-text-primary: #1F2937;      /* ratio 16:1 sur blanc */
  --color-text-secondary: #4B5563;    /* ratio 7:1 */
  --color-text-muted: #6B7280;        /* ratio 5.5:1 */

  /* Surfaces */
  --color-bg-primary: #F8F9F7;
  --color-bg-secondary: #FFFFFF;
  --color-bg-accent: #ECFDF5;

  /* Accents - thème écologie */
  --color-primary: #047857;           /* ratio 6.8:1 - emerald 700 */
  --color-primary-dark: #065F46;      /* ratio 8.5:1 */
  --color-secondary: #0891B2;         /* ratio 7.4:1 - teal */

  /* Relations */
  --color-relation-renvoie: #2563EB;  /* bleu */
  --color-relation-type: #6B7280;     /* gris */
  --color-relation-contribue: #059669;/* vert */
  --color-relation-oppose: #DC2626;   /* rouge */
  --color-relation-proche: #9CA3AF;   /* gris clair */

  /* Focus */
  --color-focus-ring: #0891B2;
  --focus-ring-width: 3px;
}
```

---

## PARTIE 4 : PLAN D'IMPLÉMENTATION

### Phase 1 : Fondations (Priorité P1)

1. **Enrichir les définitions** (2-3 définitions pilotes)
   - Ajouter definitionEtendue
   - Ajouter sources scientifiques avec DOI
   - Ajouter indicateurs quantitatifs

2. **Toggle niveau de détail**
   - Composant DefinitionDepthToggle
   - Affichage conditionnel des sections

3. **Accessibilité de base**
   - ARIA labels sur tous les éléments interactifs
   - Focus visible amélioré
   - Navigation clavier graphe

### Phase 2 : Mobile & UX (Priorité P1-P2)

4. **Vue liste mobile**
   - Composant ListView (outline collapsible)
   - Détection et switch auto < 768px

5. **Amélioration recherche**
   - Grouper par catégorie
   - Afficher preview de définition

6. **Onboarding**
   - Tour guidé 3 étapes
   - localStorage pour ne pas répéter

### Phase 3 : Enrichissement (Priorité P2)

7. **Toutes les définitions enrichies**
   - 56 définitions avec niveau scientifique
   - Sources haute qualité

8. **Chat amélioré**
   - Contexte étendu (definitionEtendue)
   - Sources dans les réponses

---

## PARTIE 5 : SOURCES HAUTE QUALITÉ À UTILISER

### Institutions de référence

| Institution | Type | Domaines | URL |
|-------------|------|----------|-----|
| GIEC/IPCC | Intergouvernemental | Climat | ipcc.ch |
| ADEME | Agence française | Environnement | ademe.fr |
| UICN/IUCN | ONG internationale | Biodiversité | iucn.org |
| Ellen MacArthur Foundation | Fondation | Économie circulaire | ellenmacarthurfoundation.org |
| Agence Européenne Environnement | Agence UE | Multi | eea.europa.eu |
| WWF | ONG | Multi | wwf.org |
| UNEP | ONU | Multi | unep.org |

### Revues scientifiques peer-reviewed

| Revue | Impact Factor | Domaines |
|-------|---------------|----------|
| Nature Climate Change | 30.7 | Climat |
| Ecological Economics | 7.0 | Économie environnementale |
| Resources, Conservation and Recycling | 13.2 | Économie circulaire |
| Journal of Cleaner Production | 11.1 | Production durable |
| Journal of Industrial Ecology | 6.1 | Écologie industrielle |
| Environmental Science & Technology | 11.4 | Multi |
| Biodiversity and Conservation | 3.9 | Biodiversité |

### Bases de données

- **Scopus** : Articles scientifiques
- **Web of Science** : Citations
- **HAL** : Archives ouvertes françaises
- **EUR-Lex** : Législation européenne
- **Légifrance** : Législation française

---

**Signature** : Lalou
**Date** : 2025-12-24

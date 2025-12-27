// Types principaux pour GreenGraph

export type RelationType =
  | 'renvoie_a'      // Référence directe dans la définition
  | 'est_type_de'    // Relation hiérarchique (hyponymie)
  | 'contribue_a'    // Lien causal positif/négatif
  | 'proche_de'      // Similarité conceptuelle
  | 'oppose_a';      // Contraste conceptuel

export type SourceType =
  | 'article_peer_reviewed'
  | 'rapport_institution'
  | 'ouvrage_reference'
  | 'loi'
  | 'norme_iso'
  | 'these'
  | 'article'        // legacy
  | 'livre'          // legacy
  | 'rapport'        // legacy
  | 'institution';   // legacy

export type NiveauPreuve = 'elevé' | 'moyen' | 'faible';

export interface Source {
  titre: string;
  auteur?: string;
  url?: string;
  doi?: string;           // Digital Object Identifier
  annee?: number;
  type: SourceType;
  journal?: string;       // Pour articles peer-reviewed
  institution?: string;   // ADEME, GIEC, etc.
  niveauPreuve?: NiveauPreuve;
}

export interface Relation {
  cible: string;           // ID de la définition liée
  type: RelationType;      // Type de relation
  score: number;           // Proximité 0-100
  direction?: 'positif' | 'negatif'; // Pour contribue_a
}

// Structure pour définitions étendues (niveau scientifique)
export interface DefinitionEtendue {
  introduction: string;         // Contexte historique et émergence
  mecanismes: string;           // Processus, fonctionnement
  contexteScientifique: string; // Historique, découvertes, débats
  enjeuxActuels: string;        // Recherches en cours, défis
  perspectives: string;         // Évolutions, tendances futures
}

export interface IndicateurQuantitatif {
  valeur: string;
  source: string;
  annee: number;
}

export type ImageType = 'photo' | 'schema' | 'logo' | 'infographie' | 'illustration';

export interface DefinitionImage {
  src: string;           // Chemin relatif (/images/...) ou URL
  alt: string;           // Description alternative
  credit?: string;       // Source/crédit (ex: "Wikimedia Commons")
  type?: ImageType;      // Type d'image
  legende?: string;      // Légende optionnelle
}

export type NiveauValidation = 'vérifié' | 'préliminaire' | 'en_révision';

export interface Definition {
  id: string;              // Slug unique
  terme: string;           // Nom affiché

  // Niveaux de définition
  resume?: string;               // NIVEAU 1 : Aperçu (1-2 phrases)
  definition: string;            // NIVEAU 2 : Standard (2-3 paragraphes)
  definitionEtendue?: DefinitionEtendue;  // NIVEAU 3 : Expert (scientifique)

  // Sources et validation
  sources: Source[];             // Références bibliographiques
  niveauValidation?: NiveauValidation;
  derniereMiseAJour?: string;    // ISO date
  auteurValidation?: string;

  // Classification
  categorie: string;       // ID de la catégorie
  tags?: string[];         // Mots-clés additionnels
  motsClésScientifiques?: string[];  // Pour recherche sémantique

  // Relations
  relations?: Relation[];  // Liens vers autres définitions
  referencesCroisees?: string[];  // IDs de définitions liées dans le texte

  // Enrichissement
  exemples?: string[];     // Exemples concrets
  synonymes?: string[];    // Termes équivalents
  indicateursQuantitatifs?: IndicateurQuantitatif[];  // Données chiffrées
  image?: DefinitionImage; // Image principale illustrant le concept
}

export interface Categorie {
  id: string;
  nom: string;
  description: string;
  couleur: string;
  icone?: string;
  image?: string;  // Image miniature pour l'écran principal
  fichier: string;
}

export interface CategorieData {
  id: string;
  nom: string;
  description: string;
  couleur: string;
  definitions: Definition[];
}

export interface CategoriesIndex {
  categories: Categorie[];
}

// Types pour la recherche
export type MatchType = 'exact' | 'fulltext' | 'semantic';

export interface SearchResult {
  definition: Definition;
  score: number;
  matchType: MatchType;
  highlights?: string[];
}

// Types pour le chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: string[]; // IDs des définitions citées
  sources?: Source[];   // Sources utilisées dans la réponse
}

// Type pour le niveau de détail affiché
export type DefinitionDepth = 'resume' | 'standard' | 'expert';

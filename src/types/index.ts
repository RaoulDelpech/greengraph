// Types principaux pour GreenGraph

export type RelationType =
  | 'renvoie_a'      // Référence directe dans la définition
  | 'est_type_de'    // Relation hiérarchique (hyponymie)
  | 'contribue_a'    // Lien causal positif/négatif
  | 'proche_de'      // Similarité conceptuelle
  | 'oppose_a';      // Contraste conceptuel

export type SourceType = 'article' | 'livre' | 'rapport' | 'institution' | 'loi';

export interface Source {
  titre: string;
  auteur?: string;
  url?: string;
  annee?: number;
  type: SourceType;
}

export interface Relation {
  cible: string;           // ID de la définition liée
  type: RelationType;      // Type de relation
  score: number;           // Proximité 0-100
  direction?: 'positif' | 'negatif'; // Pour contribue_a
}

export interface Definition {
  id: string;              // Slug unique
  terme: string;           // Nom affiché
  definition: string;      // Texte de la définition
  sources: Source[];       // Références bibliographiques
  categorie: string;       // ID de la catégorie
  tags?: string[];         // Mots-clés additionnels
  relations?: Relation[];  // Liens vers autres définitions
  exemples?: string[];     // Exemples concrets
  synonymes?: string[];    // Termes équivalents
}

export interface Categorie {
  id: string;
  nom: string;
  description: string;
  couleur: string;
  icone?: string;
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
}

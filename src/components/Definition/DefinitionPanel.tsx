import { useState, useEffect } from 'react';
import type { Definition, Categorie, RelationType, DefinitionDepth, Source, DefinitionImage } from '../../types';
import { DefinitionDepthToggle } from './DefinitionDepthToggle';

// Composant pour afficher l'image de définition
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
        className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        loading="lazy"
      />
      {(image.legende || image.credit) && (
        <figcaption className="mt-1.5 text-xs text-gray-500 flex justify-between items-start">
          {image.legende && <span className="italic">{image.legende}</span>}
          {image.credit && (
            <span className="text-gray-400 text-right">
              {image.credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

interface DefinitionPanelProps {
  definition: Definition;
  categories: Categorie[];
  allDefinitions: Definition[];
  onNavigate: (id: string) => void;
  onClose: () => void;
}

const RELATION_LABELS: Record<RelationType, string> = {
  renvoie_a: 'Renvoie à',
  est_type_de: 'Est un type de',
  contribue_a: 'Contribue à',
  proche_de: 'Proche de',
  oppose_a: "S'oppose à",
};

const RELATION_COLORS: Record<RelationType, string> = {
  renvoie_a: 'bg-blue-100 text-blue-700 border-blue-200',
  est_type_de: 'bg-gray-100 text-gray-700 border-gray-200',
  contribue_a: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  proche_de: 'bg-slate-100 text-slate-600 border-slate-200',
  oppose_a: 'bg-red-100 text-red-700 border-red-200',
};

const SOURCE_TYPE_LABELS: Record<string, string> = {
  'article_peer_reviewed': 'Article peer-reviewed',
  'rapport_institution': 'Rapport institutionnel',
  'ouvrage_reference': 'Ouvrage de référence',
  'loi': 'Texte législatif',
  'norme_iso': 'Norme ISO',
  'these': 'Thèse',
  'article': 'Article',
  'livre': 'Livre',
  'rapport': 'Rapport',
  'institution': 'Institution',
};

function getSourceQualityStars(source: Source): string {
  if (source.niveauPreuve === 'elevé') return '★★★';
  if (source.niveauPreuve === 'moyen') return '★★☆';
  if (source.niveauPreuve === 'faible') return '★☆☆';
  // Fallback basé sur le type
  if (source.type === 'article_peer_reviewed' || source.doi) return '★★★';
  if (source.type === 'rapport_institution' || source.type === 'loi') return '★★☆';
  return '★☆☆';
}

export function DefinitionPanel({
  definition,
  categories,
  allDefinitions,
  onNavigate,
  onClose,
}: DefinitionPanelProps) {
  const [depth, setDepth] = useState<DefinitionDepth>(() => {
    const saved = localStorage.getItem('greengraph_definition_depth');
    return (saved as DefinitionDepth) || 'standard';
  });

  // Persister le choix
  useEffect(() => {
    localStorage.setItem('greengraph_definition_depth', depth);
  }, [depth]);

  const category = categories.find((c) => c.id === definition.categorie);
  const hasExpertContent = !!definition.definitionEtendue;

  // Grouper les relations par type
  const relationsByType = definition.relations?.reduce(
    (acc, rel) => {
      if (!acc[rel.type]) acc[rel.type] = [];
      acc[rel.type].push(rel);
      return acc;
    },
    {} as Record<RelationType, typeof definition.relations>
  );

  const getDefinitionLabel = (id: string) => {
    const def = allDefinitions.find((d) => d.id === id);
    return def?.terme || id;
  };

  // Contenu selon le niveau
  const renderDefinitionContent = () => {
    if (depth === 'resume') {
      return (
        <p className="text-gray-800 text-sm leading-relaxed">
          {definition.resume || definition.definition.split('.')[0] + '.'}
        </p>
      );
    }

    if (depth === 'standard') {
      return (
        <p className="text-gray-800 text-sm leading-relaxed">
          {definition.definition}
        </p>
      );
    }

    // Expert
    if (definition.definitionEtendue) {
      const ext = definition.definitionEtendue;
      return (
        <div className="space-y-4 text-sm text-gray-800 leading-relaxed">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Contexte historique</h4>
            <p>{ext.introduction}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Mécanismes</h4>
            <p>{ext.mecanismes}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Débat scientifique</h4>
            <p>{ext.contexteScientifique}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Enjeux actuels</h4>
            <p>{ext.enjeuxActuels}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Perspectives</h4>
            <p>{ext.perspectives}</p>
          </div>
        </div>
      );
    }

    // Fallback si pas de contenu expert
    return (
      <p className="text-gray-800 text-sm leading-relaxed">
        {definition.definition}
      </p>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white shadow-xl">
      {/* Header compact */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <span
                  className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: category.couleur }}
                >
                  {category.nom}
                </span>
              )}
              {definition.niveauValidation === 'vérifié' && (
                <span className="text-emerald-600 text-xs font-medium flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Vérifié
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {definition.terme}
            </h2>
            {definition.synonymes && definition.synonymes.length > 0 && (
              <p className="text-xs text-gray-500 mt-1 italic">
                {definition.synonymes.join(' · ')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Toggle niveau de détail */}
        <div className="mt-3">
          <DefinitionDepthToggle
            depth={depth}
            onChange={setDepth}
            hasExpertContent={hasExpertContent}
          />
        </div>
      </div>

      {/* Content avec scroll */}
      <div className="flex-1 overflow-y-auto">
        {/* Image si présente */}
        {definition.image && (
          <div className="p-4 pb-2 border-b border-gray-100">
            <DefinitionImageDisplay image={definition.image} />
          </div>
        )}

        {/* Définition - section principale */}
        <div className="p-4 bg-emerald-50/50 border-b border-gray-100">
          {renderDefinitionContent()}
        </div>

        <div className="p-4 space-y-5">
          {/* Indicateurs quantitatifs (si expert) */}
          {depth === 'expert' && definition.indicateursQuantitatifs && definition.indicateursQuantitatifs.length > 0 && (
            <section className="bg-blue-50 p-3 rounded-lg">
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Chiffres clés
              </h3>
              <ul className="space-y-1.5">
                {definition.indicateursQuantitatifs.map((ind, idx) => (
                  <li key={idx} className="text-sm text-blue-900">
                    <span className="font-medium">{ind.valeur}</span>
                    <span className="text-blue-600 text-xs ml-2">
                      ({ind.source}, {ind.annee})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Relations - section importante */}
          {relationsByType && Object.keys(relationsByType).length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Concepts liés
              </h3>
              <div className="space-y-3">
                {(Object.entries(relationsByType) as [RelationType, typeof definition.relations][]).map(
                  ([type, relations]) => (
                    <div key={type}>
                      <p className="text-xs text-gray-500 mb-1.5 font-medium">
                        {RELATION_LABELS[type]}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {relations?.map((rel) => {
                          const exists = allDefinitions.some((d) => d.id === rel.cible);
                          return (
                            <button
                              key={rel.cible}
                              onClick={() => exists && onNavigate(rel.cible)}
                              disabled={!exists}
                              className={`
                                px-2.5 py-1 rounded-lg text-xs font-medium border
                                transition-all duration-200
                                ${RELATION_COLORS[type]}
                                ${exists
                                  ? 'hover:shadow-md hover:scale-105 cursor-pointer'
                                  : 'opacity-40 cursor-not-allowed'
                                }
                              `}
                            >
                              {getDefinitionLabel(rel.cible)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          {/* Exemples */}
          {definition.exemples && definition.exemples.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Exemples
              </h3>
              <ul className="space-y-1.5">
                {definition.exemples.map((exemple, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{exemple}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Sources - améliorées avec qualité */}
          {definition.sources && definition.sources.length > 0 && (
            <section className="pt-3 border-t border-gray-100">
              <details className="group" open={depth === 'expert'}>
                <summary className="text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer flex items-center gap-2 list-none">
                  <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Sources ({definition.sources.length})
                </summary>
                <ul className="mt-2 space-y-2">
                  {definition.sources.map((source, index) => (
                    <li key={index} className="text-xs bg-gray-50 p-2.5 rounded-lg">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 leading-tight">{source.titre}</p>
                          {source.auteur && (
                            <p className="text-gray-500 mt-0.5">{source.auteur}</p>
                          )}
                          {source.journal && (
                            <p className="text-gray-500 italic">{source.journal}</p>
                          )}
                        </div>
                        <span className="text-amber-500 text-xs font-mono" title="Niveau de preuve">
                          {getSourceQualityStars(source)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="px-1.5 py-0.5 bg-gray-200 rounded text-xs text-gray-600">
                          {SOURCE_TYPE_LABELS[source.type] || source.type}
                        </span>
                        {source.annee && (
                          <span className="text-gray-400">{source.annee}</span>
                        )}
                        {source.doi && (
                          <a
                            href={`https://doi.org/${source.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            DOI
                          </a>
                        )}
                        {source.url && !source.doi && (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline ml-auto"
                          >
                            Lien
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            </section>
          )}

          {/* Tags et mots-clés scientifiques */}
          {((definition.tags && definition.tags.length > 0) ||
            (definition.motsClésScientifiques && definition.motsClésScientifiques.length > 0)) && (
            <section className="pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-1.5">
                {definition.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {depth === 'expert' && definition.motsClésScientifiques?.map((mot) => (
                  <span
                    key={mot}
                    className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-medium"
                  >
                    {mot}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Dernière mise à jour */}
          {definition.derniereMiseAJour && (
            <p className="text-xs text-gray-400 text-right pt-2">
              Mis à jour : {new Date(definition.derniereMiseAJour).toLocaleDateString('fr-FR')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

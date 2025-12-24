import type { Definition, Categorie, RelationType } from '../../types';

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

export function DefinitionPanel({
  definition,
  categories,
  allDefinitions,
  onNavigate,
  onClose,
}: DefinitionPanelProps) {
  const category = categories.find((c) => c.id === definition.categorie);

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

  return (
    <div className="h-full flex flex-col bg-white shadow-xl">
      {/* Header compact */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {category && (
              <span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-white mb-2"
                style={{ backgroundColor: category.couleur }}
              >
                {category.nom}
              </span>
            )}
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
      </div>

      {/* Content avec scroll */}
      <div className="flex-1 overflow-y-auto">
        {/* Définition - section principale */}
        <div className="p-4 bg-emerald-50/50 border-b border-gray-100">
          <p className="text-gray-800 text-sm leading-relaxed">{definition.definition}</p>
        </div>

        <div className="p-4 space-y-5">
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

          {/* Sources - collapsible style */}
          {definition.sources && definition.sources.length > 0 && (
            <section className="pt-3 border-t border-gray-100">
              <details className="group">
                <summary className="text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer flex items-center gap-2 list-none">
                  <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Sources ({definition.sources.length})
                </summary>
                <ul className="mt-2 space-y-2">
                  {definition.sources.map((source, index) => (
                    <li key={index} className="text-xs bg-gray-50 p-2.5 rounded-lg">
                      <p className="font-medium text-gray-800 leading-tight">{source.titre}</p>
                      {source.auteur && (
                        <p className="text-gray-500 mt-0.5">{source.auteur}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="px-1.5 py-0.5 bg-gray-200 rounded text-xs text-gray-600">
                          {source.type}
                        </span>
                        {source.annee && (
                          <span className="text-gray-400">{source.annee}</span>
                        )}
                        {source.url && (
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

          {/* Tags - discrets */}
          {definition.tags && definition.tags.length > 0 && (
            <section className="pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-1.5">
                {definition.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

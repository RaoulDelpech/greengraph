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
  renvoie_a: 'bg-blue-100 text-blue-800',
  est_type_de: 'bg-gray-100 text-gray-800',
  contribue_a: 'bg-green-100 text-green-800',
  proche_de: 'bg-slate-100 text-slate-700',
  oppose_a: 'bg-red-100 text-red-800',
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
    <div className="h-full flex flex-col bg-white border-l border-gray-200 shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: category.couleur }}
                >
                  {category.nom}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{definition.terme}</h2>
            {definition.synonymes && definition.synonymes.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Aussi : {definition.synonymes.join(', ')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Définition */}
        <section>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Définition
          </h3>
          <p className="text-gray-800 leading-relaxed">{definition.definition}</p>
        </section>

        {/* Sources */}
        {definition.sources && definition.sources.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Sources ({definition.sources.length})
            </h3>
            <ul className="space-y-2">
              {definition.sources.map((source, index) => (
                <li key={index} className="text-sm bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-800">{source.titre}</p>
                  {source.auteur && (
                    <p className="text-gray-600">{source.auteur}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-gray-200 rounded text-xs text-gray-600">
                      {source.type}
                    </span>
                    {source.annee && (
                      <span className="text-xs text-gray-500">{source.annee}</span>
                    )}
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline ml-auto"
                      >
                        Voir la source
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Relations */}
        {relationsByType && Object.keys(relationsByType).length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Relations
            </h3>
            <div className="space-y-3">
              {(Object.entries(relationsByType) as [RelationType, typeof definition.relations][]).map(
                ([type, relations]) => (
                  <div key={type}>
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      {RELATION_LABELS[type]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {relations?.map((rel) => {
                        const exists = allDefinitions.some((d) => d.id === rel.cible);
                        return (
                          <button
                            key={rel.cible}
                            onClick={() => exists && onNavigate(rel.cible)}
                            disabled={!exists}
                            className={`
                              px-3 py-1 rounded-full text-sm font-medium
                              transition-all
                              ${RELATION_COLORS[type]}
                              ${exists ? 'hover:opacity-80 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                            `}
                          >
                            {getDefinitionLabel(rel.cible)}
                            <span className="ml-1 text-xs opacity-70">({rel.score}%)</span>
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
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Exemples
            </h3>
            <ul className="space-y-2">
              {definition.exemples.map((exemple, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  {exemple}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tags */}
        {definition.tags && definition.tags.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Mots-clés
            </h3>
            <div className="flex flex-wrap gap-2">
              {definition.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

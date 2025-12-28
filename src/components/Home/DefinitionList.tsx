import type { Definition, Categorie } from '../../types';

interface DefinitionListProps {
  definitions: Definition[];
  category: Categorie;
  onSelectDefinition: (id: string) => void;
  selectedDefinition?: string;
}

export function DefinitionList({
  definitions,
  category,
  onSelectDefinition,
  selectedDefinition,
}: DefinitionListProps) {
  // Trier par ordre alphabétique
  const sortedDefinitions = [...definitions].sort((a, b) =>
    a.terme.localeCompare(b.terme, 'fr')
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header de la catégorie */}
      <div
        className="px-5 py-4 border-b border-gray-100"
        style={{ backgroundColor: `${category.couleur}10` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.couleur }}
          />
          <div>
            <h2 className="font-serif font-semibold text-gray-900 text-lg">
              {category.nom}
            </h2>
            <p className="text-sm text-gray-500">
              {definitions.length} définition{definitions.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Liste des définitions */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {sortedDefinitions.map((definition, index) => {
            const isSelected = selectedDefinition === definition.id;

            return (
              <button
                key={definition.id}
                onClick={() => onSelectDefinition(definition.id)}
                className={`
                  w-full px-5 py-3 text-left transition-all duration-200
                  border-l-2 hover:bg-gray-50
                  ${
                    isSelected
                      ? 'bg-gray-50 border-l-current'
                      : 'border-l-transparent'
                  }
                `}
                style={{
                  borderLeftColor: isSelected ? category.couleur : 'transparent',
                  animationDelay: `${index * 30}ms`,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium transition-colors ${
                        isSelected ? 'text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      {definition.terme}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {definition.resume || definition.definition.slice(0, 100)}...
                    </p>
                  </div>
                  {definition.niveauValidation === 'vérifié' && (
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {definition.tags && definition.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {definition.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

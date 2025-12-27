import type { Categorie } from '../../types';

interface SidebarProps {
  categories: Categorie[];
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export function Sidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  onSelectAll,
  onClearAll,
}: SidebarProps) {
  const allSelected = selectedCategories.length === categories.length;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* En-tête catégories */}
      <div className="p-4 border-b border-gray-200 bg-forest-50">
        <h2 className="font-serif font-semibold text-forest-900 text-lg">Catégories</h2>
        <p className="text-xs text-gray-500 mt-0.5">{categories.length} thématiques</p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={onSelectAll}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
              allSelected
                ? 'bg-forest-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-forest-100 hover:text-forest-700'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={onClearAll}
            className="text-xs px-3 py-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors"
          >
            Aucune
          </button>
        </div>
      </div>

      {/* Liste des catégories */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <button
              key={category.id}
              onClick={() => onToggleCategory(category.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                transition-all duration-200 group
                ${isSelected
                  ? 'bg-forest-50 ring-1 ring-forest-200'
                  : 'hover:bg-gray-50'
                }
              `}
            >
              {/* Image de catégorie ou checkbox */}
              {category.image ? (
                <div className="relative w-10 h-10 flex-shrink-0">
                  <img
                    src={category.image}
                    alt={category.nom}
                    className={`w-10 h-10 rounded-lg object-cover transition-all ${
                      isSelected ? 'ring-2 ring-forest-500' : 'opacity-80 group-hover:opacity-100'
                    }`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center bg-forest-600"
                    >
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0`}
                  style={{
                    borderColor: category.couleur,
                    backgroundColor: isSelected ? category.couleur : 'transparent',
                  }}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm truncate ${
                  isSelected ? 'text-forest-800' : 'text-gray-700'
                }`}>
                  {category.nom}
                </p>
                <p className="text-xs text-gray-500 truncate">{category.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Légende des relations */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">
          Types de relations
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-ocean-600 rounded"></div>
            <span className="text-gray-600">Renvoie à</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-gray-400" style={{ borderTop: '2px dashed' }}></div>
            <span className="text-gray-600">Est un type de</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-forest-600 rounded"></div>
            <span className="text-gray-600">Contribue à</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-gray-300 rounded"></div>
            <span className="text-gray-600">Proche de</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-red-500" style={{ borderTop: '2px dashed' }}></div>
            <span className="text-gray-600">S'oppose à</span>
          </div>
        </div>
      </div>

      {/* Pied de sidebar - informations projet */}
      <div className="p-4 border-t border-gray-200 bg-forest-900 text-white">
        <div className="text-xs space-y-2">
          <p className="text-forest-300">
            Contenu sous licence{' '}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest-200 hover:text-white underline underline-offset-2"
            >
              CC BY-SA 4.0
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/RaoulDelpech/greengraph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

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
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Catégories</h2>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onSelectAll}
            className={`text-xs px-2 py-1 rounded ${
              allSelected ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={onClearAll}
            className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Aucune
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <button
              key={category.id}
              onClick={() => onToggleCategory(category.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                transition-all duration-200
                ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}
              `}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors`}
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
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">{category.nom}</p>
                <p className="text-xs text-gray-500 truncate">{category.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Légende des relations */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Légende
        </h3>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-blue-500"></div>
            <span className="text-gray-600">Renvoie à</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-gray-400 border-dashed border-t-2 border-gray-400"></div>
            <span className="text-gray-600">Est un type de</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-green-500"></div>
            <span className="text-gray-600">Contribue à</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-gray-300"></div>
            <span className="text-gray-600">Proche de</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-red-500 border-dashed border-t-2 border-red-500"></div>
            <span className="text-gray-600">S'oppose à</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

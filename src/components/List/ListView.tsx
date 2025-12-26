import { useState, useCallback, useRef } from 'react';
import type { TouchEvent } from 'react';
import type { Definition, Categorie } from '../../types';

interface ListViewProps {
  definitions: Definition[];
  categories: Categorie[];
  onSelectDefinition: (id: string) => void;
}

export function ListView({ definitions, categories, onSelectDefinition }: ListViewProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const swipedItemId = useRef<string | null>(null);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const getDefinitionsForCategory = useCallback((categoryId: string) => {
    return definitions.filter(d => d.categorie === categoryId);
  }, [definitions]);

  // Gestion du swipe
  const handleTouchStart = useCallback((e: TouchEvent, definitionId: string) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swipedItemId.current = definitionId;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent, definitionId: string) => {
    if (swipedItemId.current !== definitionId) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = Math.abs(touchStartY.current - touchEndY);

    // Swipe gauche détecté (> 50px horizontal, < 30px vertical)
    if (deltaX > 50 && deltaY < 30) {
      onSelectDefinition(definitionId);
    }

    swipedItemId.current = null;
  }, [onSelectDefinition]);

  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* En-tête */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <h2 className="text-lg font-semibold text-gray-800">
          Catégories
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Tap pour ouvrir, swipe gauche pour les détails
        </p>
      </div>

      {/* Liste des catégories */}
      <div className="divide-y divide-gray-100">
        {categories.map(category => {
          const isExpanded = expandedCategories.has(category.id);
          const categoryDefs = getDefinitionsForCategory(category.id);

          return (
            <div key={category.id}>
              {/* En-tête catégorie */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                style={{ minHeight: '48px' }} // Touch target 48px
              >
                {/* Chevron */}
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                {/* Pastille couleur */}
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.couleur }}
                />

                {/* Nom catégorie */}
                <span className="flex-1 text-left font-medium text-gray-800">
                  {category.nom}
                </span>

                {/* Compteur */}
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {categoryDefs.length}
                </span>
              </button>

              {/* Définitions (si expandé) */}
              {isExpanded && (
                <div className="bg-gray-50">
                  {categoryDefs.map((def, index) => (
                    <button
                      key={def.id}
                      onClick={() => onSelectDefinition(def.id)}
                      onTouchStart={(e) => handleTouchStart(e, def.id)}
                      onTouchEnd={(e) => handleTouchEnd(e, def.id)}
                      className="w-full flex items-start gap-3 px-4 py-3 pl-12 hover:bg-gray-100 active:bg-gray-200 transition-colors text-left border-l-2"
                      style={{
                        minHeight: '48px',
                        borderLeftColor: category.couleur
                      }}
                    >
                      {/* Connecteur visuel */}
                      <span className="text-gray-300 flex-shrink-0 mt-0.5">
                        {index === categoryDefs.length - 1 ? '└' : '├'}
                      </span>

                      <div className="flex-1 min-w-0">
                        {/* Terme */}
                        <span className="font-medium text-gray-700 block truncate">
                          {def.terme}
                        </span>

                        {/* Résumé court */}
                        {def.resume && (
                          <span className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                            {def.resume}
                          </span>
                        )}
                      </div>

                      {/* Indicateur swipe */}
                      <svg
                        className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats en bas */}
      <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{categories.length} catégories</span>
          <span>{definitions.length} définitions</span>
        </div>
      </div>
    </div>
  );
}

import { useState, useCallback, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import Fuse from 'fuse.js';
import type { Definition, Categorie } from '../../types';

interface SearchBarProps {
  definitions: Definition[];
  categories: Categorie[];
  onSelectResult: (id: string) => void;
}

export interface SearchBarHandle {
  focus: () => void;
}

interface SearchResult {
  item: Definition;
  score?: number;
}

interface GroupedResults {
  category: Categorie;
  results: SearchResult[];
}

export const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(function SearchBar(
  { definitions, categories, onSelectResult },
  ref
) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Exposer la méthode focus() via ref
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  // Map catégorie ID -> catégorie
  const categoryMap = useMemo(() => {
    const map = new Map<string, Categorie>();
    categories.forEach(cat => map.set(cat.id, cat));
    return map;
  }, [categories]);

  // Grouper les résultats par catégorie
  const groupedResults = useMemo((): GroupedResults[] => {
    const groups = new Map<string, SearchResult[]>();

    results.forEach(result => {
      const catId = result.item.categorie;
      if (!groups.has(catId)) {
        groups.set(catId, []);
      }
      groups.get(catId)!.push(result);
    });

    return Array.from(groups.entries())
      .map(([catId, catResults]) => ({
        category: categoryMap.get(catId) || { id: catId, nom: catId, description: '', couleur: '#6b7280', fichier: '' },
        results: catResults,
      }))
      .sort((a, b) => a.category.nom.localeCompare(b.category.nom));
  }, [results, categoryMap]);

  // Liste plate pour la navigation clavier
  const flatResults = useMemo(() => {
    return groupedResults.flatMap(g => g.results);
  }, [groupedResults]);

  // Configurer Fuse.js pour la recherche full-text
  const fuse = useRef(
    new Fuse(definitions, {
      keys: [
        { name: 'terme', weight: 2 },
        { name: 'definition', weight: 1 },
        { name: 'tags', weight: 1.5 },
        { name: 'synonymes', weight: 1.5 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    })
  );

  // Mettre à jour l'index Fuse quand les définitions changent
  useEffect(() => {
    fuse.current = new Fuse(definitions, {
      keys: [
        { name: 'terme', weight: 2 },
        { name: 'definition', weight: 1 },
        { name: 'tags', weight: 1.5 },
        { name: 'synonymes', weight: 1.5 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [definitions]);

  // Recherche avec debounce
  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);

      if (value.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      const searchResults = fuse.current.search(value).slice(0, 8);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setSelectedIndex(0);
    },
    []
  );

  // Fermer la liste au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation clavier
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            onSelectResult(flatResults[selectedIndex].item.id);
            setQuery('');
            setIsOpen(false);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    },
    [isOpen, flatResults, selectedIndex, onSelectResult]
  );

  const handleResultClick = useCallback(
    (id: string) => {
      onSelectResult(id);
      setQuery('');
      setIsOpen(false);
    },
    [onSelectResult]
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder="Rechercher... (appuyer sur /)"
          aria-label="Rechercher une définition"
          aria-describedby="search-hint"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
          role="combobox"
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-3 focus:ring-emerald-500/50 focus:border-emerald-500
                     text-gray-800 placeholder-gray-500"
        />
        <span id="search-hint" className="sr-only">
          Tapez au moins 2 caractères pour rechercher. Utilisez les flèches pour naviguer et Entrée pour sélectionner.
        </span>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Résultats groupés par catégorie */}
      {isOpen && groupedResults.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          aria-label="Résultats de recherche"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
        >
          <div className="max-h-96 overflow-y-auto">
            {groupedResults.map((group) => {
              // Calculer l'index global pour chaque résultat du groupe
              let globalIndex = 0;
              for (const g of groupedResults) {
                if (g === group) break;
                globalIndex += g.results.length;
              }

              return (
                <div key={group.category.id}>
                  {/* En-tête catégorie */}
                  <div
                    className="sticky top-0 px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: group.category.couleur }}
                    />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {group.category.nom}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({group.results.length})
                    </span>
                  </div>

                  {/* Résultats de la catégorie */}
                  <ul>
                    {group.results.map((result, idx) => {
                      const itemGlobalIndex = globalIndex + idx;
                      const isSelected = itemGlobalIndex === selectedIndex;

                      return (
                        <li
                          key={result.item.id}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <button
                            onClick={() => handleResultClick(result.item.id)}
                            tabIndex={-1}
                            className={`
                              w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors
                              focus:outline-none border-l-3
                              ${isSelected ? 'bg-emerald-50 border-l-emerald-500' : 'border-l-transparent'}
                            `}
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800">{result.item.terme}</p>
                                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                                  {result.item.resume || result.item.definition.slice(0, 120)}
                                </p>
                              </div>
                              <svg
                                className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Footer avec raccourci clavier */}
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <span>{flatResults.length} résultat{flatResults.length > 1 ? 's' : ''}</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">↑↓</kbd>
              naviguer
              <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 ml-2">↵</kbd>
              sélectionner
            </span>
          </div>
        </div>
      )}

      {/* Aucun résultat */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
        >
          <p className="text-gray-600 text-center">Aucune définition trouvée pour "{query}"</p>
        </div>
      )}
    </div>
  );
});

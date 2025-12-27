import { forwardRef } from 'react';
import { SearchBar } from '../Search';
import type { SearchBarHandle } from '../Search';
import type { Definition, Categorie } from '../../types';

interface HeaderProps {
  definitions: Definition[];
  categories: Categorie[];
  onSelectDefinition: (id: string) => void;
  isMobile?: boolean;
  onToggleMobileSidebar?: () => void;
}

export const Header = forwardRef<SearchBarHandle, HeaderProps>(function Header(
  {
    definitions,
    categories,
    onSelectDefinition,
    isMobile,
    onToggleMobileSidebar,
  },
  ref
) {
  return (
    <div className="flex-shrink-0">
      {/* Bandeau institutionnel supérieur */}
      <div className="bg-gradient-institutional text-white text-xs py-1.5 px-4 text-center tracking-wide hidden sm:block">
        <span className="opacity-90">Ressource pédagogique open-source</span>
        <span className="mx-2 opacity-50">|</span>
        <span className="opacity-90">{definitions.length} concepts environnementaux</span>
      </div>

      {/* Header principal */}
      <header className="h-14 md:h-16 bg-white border-b border-gray-200 px-3 md:px-6 flex items-center justify-between gap-3 md:gap-6 shadow-sm">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Bouton hamburger mobile */}
          {isMobile && onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="p-2 -ml-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Logo avec favicon SVG */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0">
              <img
                src="/greengraph/favicon.svg"
                alt="GreenGraph"
                className="w-full h-full"
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-forest-900 font-serif leading-tight">
                GreenGraph
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                Glossaire interactif de l'environnement
              </p>
            </div>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="flex-1 max-w-md md:max-w-lg">
          <SearchBar
            ref={ref}
            definitions={definitions}
            categories={categories}
            onSelectResult={onSelectDefinition}
          />
        </div>

        {/* Stats (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-forest-800">
              {definitions.length}
            </p>
            <p className="text-xs text-gray-500">définitions</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="text-right">
            <p className="text-sm font-semibold text-forest-800">
              {categories.length}
            </p>
            <p className="text-xs text-gray-500">catégories</p>
          </div>
        </div>
      </header>
    </div>
  );
});

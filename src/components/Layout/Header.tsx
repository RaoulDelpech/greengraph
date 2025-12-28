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
  onGoHome?: () => void;
}

export const Header = forwardRef<SearchBarHandle, HeaderProps>(function Header(
  {
    definitions,
    categories,
    onSelectDefinition,
    isMobile,
    onToggleMobileSidebar,
    onGoHome,
  },
  ref
) {
  return (
    <header className="h-[50px] bg-white border-b border-gray-200 px-4 flex items-center justify-between gap-4 flex-shrink-0 shadow-sm">
      {/* Logo et titre */}
      <div className="flex items-center gap-3">
        {/* Bouton hamburger mobile */}
        {isMobile && onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="p-1.5 -ml-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <img
            src="/greengraph/favicon.svg"
            alt="GreenGraph"
            className="w-7 h-7"
          />
          <div className="hidden sm:block">
            <h1 className="font-serif font-semibold text-gray-900 text-base leading-tight">
              GreenGraph
            </h1>
          </div>
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="flex-1 max-w-lg">
        <SearchBar
          ref={ref}
          definitions={definitions}
          categories={categories}
          onSelectResult={onSelectDefinition}
        />
      </div>

      {/* Stats (desktop) */}
      <div className="hidden md:flex items-center text-sm text-gray-500">
        <span className="font-medium text-gray-700">{definitions.length}</span>
        <span className="ml-1">définitions</span>
      </div>
    </header>
  );
});

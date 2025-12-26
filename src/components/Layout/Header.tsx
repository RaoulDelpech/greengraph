import { forwardRef } from 'react';
import { SearchBar } from '../Search';
import type { SearchBarHandle } from '../Search';
import type { Definition } from '../../types';

interface HeaderProps {
  definitions: Definition[];
  onSelectDefinition: (id: string) => void;
  isMobile?: boolean;
  onToggleMobileSidebar?: () => void;
}

export const Header = forwardRef<SearchBarHandle, HeaderProps>(function Header(
  {
    definitions,
    onSelectDefinition,
    isMobile,
    onToggleMobileSidebar,
  },
  ref
) {
  return (
    <header className="h-14 md:h-16 bg-white border-b border-gray-200 px-3 md:px-4 flex items-center justify-between gap-2 md:gap-4 shadow-sm flex-shrink-0">
      <div className="flex items-center gap-2 md:gap-3">
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

        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <div className="hidden sm:block">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">GreenGraph</h1>
          <p className="text-xs text-gray-500 hidden md:block">Taxonomie environnementale</p>
        </div>
      </div>

      <div className="flex-1 max-w-md md:max-w-lg">
        <SearchBar ref={ref} definitions={definitions} onSelectResult={onSelectDefinition} />
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {definitions.length} définitions
        </span>
      </div>
    </header>
  );
});

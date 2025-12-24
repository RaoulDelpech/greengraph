import { SearchBar } from '../Search';
import type { Definition } from '../../types';

interface HeaderProps {
  definitions: Definition[];
  onSelectDefinition: (id: string) => void;
}

export function Header({ definitions, onSelectDefinition }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">GreenGraph</h1>
          <p className="text-xs text-gray-500">Taxonomie environnementale</p>
        </div>
      </div>

      <SearchBar definitions={definitions} onSelectResult={onSelectDefinition} />

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          {definitions.length} définitions
        </span>
      </div>
    </header>
  );
}

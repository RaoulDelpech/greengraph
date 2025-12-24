import type { DefinitionDepth } from '../../types';

interface DefinitionDepthToggleProps {
  depth: DefinitionDepth;
  onChange: (depth: DefinitionDepth) => void;
  hasExpertContent: boolean;
}

const DEPTH_OPTIONS: { value: DefinitionDepth; label: string; description: string }[] = [
  { value: 'resume', label: 'Aperçu', description: 'Essentiel en 1-2 phrases' },
  { value: 'standard', label: 'Standard', description: 'Définition complète' },
  { value: 'expert', label: 'Expert', description: 'Analyse scientifique' },
];

export function DefinitionDepthToggle({
  depth,
  onChange,
  hasExpertContent,
}: DefinitionDepthToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
      {DEPTH_OPTIONS.map((option) => {
        const isDisabled = option.value === 'expert' && !hasExpertContent;
        const isActive = depth === option.value;

        return (
          <button
            key={option.value}
            onClick={() => !isDisabled && onChange(option.value)}
            disabled={isDisabled}
            title={option.description}
            className={`
              px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
              ${isActive
                ? 'bg-white text-emerald-700 shadow-sm'
                : isDisabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

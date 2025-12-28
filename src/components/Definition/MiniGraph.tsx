import { useMemo } from 'react';
import type { Definition, RelationType } from '../../types';

interface MiniGraphProps {
  definition: Definition;
  allDefinitions: Definition[];
  onNavigate: (id: string) => void;
}

const RELATION_COLORS: Record<RelationType, string> = {
  renvoie_a: '#4A7FB2',
  est_type_de: '#718096',
  contribue_a: '#40916C',
  proche_de: '#A0AEC0',
  oppose_a: '#C53030',
};

const RELATION_LABELS: Record<RelationType, string> = {
  renvoie_a: 'Renvoie à',
  est_type_de: 'Type de',
  contribue_a: 'Contribue à',
  proche_de: 'Proche de',
  oppose_a: 'Opposé à',
};

export function MiniGraph({ definition, allDefinitions, onNavigate }: MiniGraphProps) {
  const neighbors = useMemo(() => {
    if (!definition.relations) return [];

    return definition.relations
      .map((rel) => {
        const target = allDefinitions.find((d) => d.id === rel.cible);
        if (!target) return null;
        return {
          ...rel,
          target,
        };
      })
      .filter(Boolean)
      .slice(0, 6); // Max 6 voisins
  }, [definition, allDefinitions]);

  if (neighbors.length === 0) {
    return null;
  }

  // Calculer les positions en cercle autour du centre
  const centerX = 120;
  const centerY = 100;
  const radius = 70;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Concepts liés
      </h4>

      <div className="relative" style={{ height: '200px' }}>
        <svg
          viewBox="0 0 240 200"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Liens */}
          {neighbors.map((neighbor, index) => {
            if (!neighbor) return null;
            const angle = (index / neighbors.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            return (
              <line
                key={`line-${neighbor.cible}`}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={RELATION_COLORS[neighbor.type]}
                strokeWidth="2"
                strokeOpacity="0.5"
                className="transition-all duration-300"
              />
            );
          })}

          {/* Noeud central */}
          <g className="cursor-default">
            <circle
              cx={centerX}
              cy={centerY}
              r="28"
              fill="#1B4332"
              className="transition-all duration-300"
            />
            <text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="9"
              fontWeight="600"
              className="pointer-events-none"
            >
              {definition.terme.length > 12
                ? definition.terme.slice(0, 10) + '...'
                : definition.terme}
            </text>
          </g>

          {/* Noeuds voisins */}
          {neighbors.map((neighbor, index) => {
            if (!neighbor) return null;
            const angle = (index / neighbors.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            return (
              <g
                key={neighbor.cible}
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={() => onNavigate(neighbor.cible)}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="22"
                  fill="white"
                  stroke={RELATION_COLORS[neighbor.type]}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#2D3748"
                  fontSize="8"
                  fontWeight="500"
                  className="pointer-events-none"
                >
                  {neighbor.target!.terme.length > 10
                    ? neighbor.target!.terme.slice(0, 8) + '...'
                    : neighbor.target!.terme}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Légende */}
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
        {Array.from(new Set(neighbors.map((n) => n?.type))).map((type) => {
          if (!type) return null;
          return (
            <div key={type} className="flex items-center gap-1.5 text-xs text-gray-500">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: RELATION_COLORS[type] }}
              />
              <span>{RELATION_LABELS[type]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

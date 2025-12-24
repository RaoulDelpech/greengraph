import { useMemo } from 'react';
import type { Node, Edge } from 'reactflow';
import type { Definition, Categorie, RelationType } from '../types';

interface UseGraphProps {
  definitions: Definition[];
  categories: Categorie[];
  selectedId?: string;
  filterCategories?: string[];
}

interface UseGraphReturn {
  nodes: Node[];
  edges: Edge[];
}

// Couleurs des relations
const RELATION_COLORS: Record<RelationType, string> = {
  renvoie_a: '#3b82f6',      // bleu
  est_type_de: '#6b7280',    // gris
  contribue_a: '#22c55e',    // vert (positif par défaut)
  proche_de: '#9ca3af',      // gris clair
  oppose_a: '#ef4444',       // rouge
};

// Styles des arêtes selon le type
const EDGE_STYLES: Record<RelationType, { strokeDasharray?: string; animated?: boolean }> = {
  renvoie_a: {},
  est_type_de: { strokeDasharray: '5 5' },
  contribue_a: { animated: true },
  proche_de: { strokeDasharray: '2 2' },
  oppose_a: { strokeDasharray: '10 5' },
};

export function useGraph({
  definitions,
  categories,
  selectedId,
  filterCategories,
}: UseGraphProps): UseGraphReturn {
  const nodes = useMemo(() => {
    const categoryColorMap = new Map(categories.map((c) => [c.id, c.couleur]));

    // Filtrer par catégorie si nécessaire
    const filteredDefs = filterCategories?.length
      ? definitions.filter((d) => filterCategories.includes(d.categorie))
      : definitions;

    // Disposition en cercle pour le MVP
    const radius = Math.max(300, filteredDefs.length * 30);
    const angleStep = (2 * Math.PI) / filteredDefs.length;

    return filteredDefs.map((def, index): Node => {
      const angle = index * angleStep - Math.PI / 2;
      const x = radius * Math.cos(angle) + radius;
      const y = radius * Math.sin(angle) + radius;

      return {
        id: def.id,
        type: 'definition',
        position: { x, y },
        data: {
          label: def.terme,
          definition: def.definition,
          categorie: def.categorie,
          color: categoryColorMap.get(def.categorie) || '#6b7280',
          isSelected: def.id === selectedId,
        },
      };
    });
  }, [definitions, categories, selectedId, filterCategories]);

  const edges = useMemo(() => {
    const nodeIds = new Set(nodes.map((n) => n.id));
    const edgeList: Edge[] = [];

    definitions.forEach((def) => {
      if (!def.relations) return;
      if (!nodeIds.has(def.id)) return;

      def.relations.forEach((rel) => {
        // Ne créer l'arête que si la cible existe dans les noeuds affichés
        if (!nodeIds.has(rel.cible)) return;

        // Éviter les doublons (A->B et B->A)
        const edgeId = [def.id, rel.cible].sort().join('-') + '-' + rel.type;
        if (edgeList.some((e) => e.id === edgeId)) return;

        let strokeColor = RELATION_COLORS[rel.type];

        // Pour contribue_a, changer la couleur selon la direction
        if (rel.type === 'contribue_a' && rel.direction === 'negatif') {
          strokeColor = '#f97316'; // orange
        }

        const style = EDGE_STYLES[rel.type];
        const opacity = rel.score / 100;

        edgeList.push({
          id: edgeId,
          source: def.id,
          target: rel.cible,
          type: 'smoothstep',
          animated: style.animated,
          style: {
            stroke: strokeColor,
            strokeWidth: Math.max(1, rel.score / 30),
            opacity: Math.max(0.3, opacity),
            strokeDasharray: style.strokeDasharray,
          },
          label: rel.type.replace('_', ' '),
          labelStyle: { fontSize: 10, fill: '#64748b' },
          labelBgStyle: { fill: 'white', fillOpacity: 0.8 },
        });
      });
    });

    return edgeList;
  }, [definitions, nodes]);

  return { nodes, edges };
}

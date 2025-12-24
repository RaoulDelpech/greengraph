import { useMemo } from 'react';
import type { Node, Edge } from 'reactflow';
import type { Definition, Categorie, RelationType } from '../types';

interface UseGraphProps {
  definitions: Definition[];
  categories: Categorie[];
  focusedId?: string;
  filterCategories?: string[];
}

interface UseGraphReturn {
  nodes: Node[];
  edges: Edge[];
  neighbors: Definition[];
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

// Labels français pour les types de relation
const RELATION_LABELS: Record<RelationType, string> = {
  renvoie_a: 'renvoie à',
  est_type_de: 'est un type de',
  contribue_a: 'contribue à',
  proche_de: 'proche de',
  oppose_a: 'opposé à',
};

export function useGraph({
  definitions,
  categories,
  focusedId,
  filterCategories,
}: UseGraphProps): UseGraphReturn {

  // Trouver les voisins directs d'une définition
  const getNeighbors = useMemo(() => {
    return (defId: string): Definition[] => {
      const def = definitions.find(d => d.id === defId);
      if (!def) return [];

      const neighborIds = new Set<string>();

      // Relations sortantes
      def.relations?.forEach(rel => {
        neighborIds.add(rel.cible);
      });

      // Relations entrantes (autres définitions qui pointent vers celle-ci)
      definitions.forEach(d => {
        d.relations?.forEach(rel => {
          if (rel.cible === defId) {
            neighborIds.add(d.id);
          }
        });
      });

      return definitions.filter(d => neighborIds.has(d.id));
    };
  }, [definitions]);

  const neighbors = useMemo(() => {
    if (!focusedId) return [];
    return getNeighbors(focusedId);
  }, [focusedId, getNeighbors]);

  const nodes = useMemo(() => {
    const categoryColorMap = new Map(categories.map((c) => [c.id, c.couleur]));

    // Si pas de focus, afficher les catégories comme super-noeuds
    if (!focusedId) {
      // Filtrer par catégorie si nécessaire
      const filteredCategories = filterCategories?.length
        ? categories.filter(c => filterCategories.includes(c.id))
        : categories;

      const radius = 280;
      const angleStep = (2 * Math.PI) / filteredCategories.length;

      return filteredCategories.map((cat, index): Node => {
        const angle = index * angleStep - Math.PI / 2;
        const x = radius * Math.cos(angle) + 400;
        const y = radius * Math.sin(angle) + 300;

        const defsInCat = definitions.filter(d => d.categorie === cat.id);

        return {
          id: `category-${cat.id}`,
          type: 'category',
          position: { x, y },
          data: {
            label: cat.nom,
            color: cat.couleur,
            count: defsInCat.length,
            categoryId: cat.id,
          },
        };
      });
    }

    // Mode focus : définition centrale + voisins
    const focusedDef = definitions.find(d => d.id === focusedId);
    if (!focusedDef) return [];

    const nodeList: Node[] = [];

    // Noeud central (la définition focusée)
    nodeList.push({
      id: focusedDef.id,
      type: 'definition',
      position: { x: 400, y: 300 },
      data: {
        label: focusedDef.terme,
        definition: focusedDef.definition,
        categorie: focusedDef.categorie,
        color: categoryColorMap.get(focusedDef.categorie) || '#6b7280',
        isSelected: true,
        isCentral: true,
      },
    });

    // Noeuds voisins en cercle autour
    const radius = 220;
    const angleStep = neighbors.length > 0 ? (2 * Math.PI) / neighbors.length : 0;

    neighbors.forEach((neighbor, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = radius * Math.cos(angle) + 400;
      const y = radius * Math.sin(angle) + 300;

      // Trouver le type de relation
      const relationFromFocused = focusedDef.relations?.find(r => r.cible === neighbor.id);
      const relationToFocused = neighbor.relations?.find(r => r.cible === focusedId);
      const relationType = relationFromFocused?.type || relationToFocused?.type || 'proche_de';

      nodeList.push({
        id: neighbor.id,
        type: 'definition',
        position: { x, y },
        data: {
          label: neighbor.terme,
          definition: neighbor.definition,
          categorie: neighbor.categorie,
          color: categoryColorMap.get(neighbor.categorie) || '#6b7280',
          isSelected: false,
          isCentral: false,
          relationType,
        },
      });
    });

    return nodeList;
  }, [definitions, categories, focusedId, neighbors, filterCategories]);

  const edges = useMemo(() => {
    if (!focusedId) return []; // Pas d'arêtes en mode catégories

    const focusedDef = definitions.find(d => d.id === focusedId);
    if (!focusedDef) return [];

    const edgeList: Edge[] = [];
    const neighborIds = new Set(neighbors.map(n => n.id));

    // Arêtes depuis le noeud central vers ses voisins
    focusedDef.relations?.forEach((rel) => {
      if (!neighborIds.has(rel.cible)) return;

      let strokeColor = RELATION_COLORS[rel.type];
      if (rel.type === 'contribue_a' && rel.direction === 'negatif') {
        strokeColor = '#f97316'; // orange
      }

      const style = EDGE_STYLES[rel.type];

      edgeList.push({
        id: `${focusedId}-${rel.cible}-${rel.type}`,
        source: focusedId,
        target: rel.cible,
        type: 'smoothstep',
        animated: style.animated,
        style: {
          stroke: strokeColor,
          strokeWidth: 2,
          opacity: 0.8,
          strokeDasharray: style.strokeDasharray,
        },
        label: RELATION_LABELS[rel.type],
        labelStyle: { fontSize: 11, fill: '#374151', fontWeight: 500 },
        labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
        labelBgPadding: [4, 2] as [number, number],
      });
    });

    // Arêtes entrantes (des voisins vers le noeud central)
    neighbors.forEach(neighbor => {
      neighbor.relations?.forEach(rel => {
        if (rel.cible !== focusedId) return;

        // Éviter les doublons
        const existingEdge = edgeList.find(
          e => (e.source === neighbor.id && e.target === focusedId) ||
               (e.source === focusedId && e.target === neighbor.id)
        );
        if (existingEdge) return;

        let strokeColor = RELATION_COLORS[rel.type];
        if (rel.type === 'contribue_a' && rel.direction === 'negatif') {
          strokeColor = '#f97316';
        }

        const style = EDGE_STYLES[rel.type];

        edgeList.push({
          id: `${neighbor.id}-${focusedId}-${rel.type}`,
          source: neighbor.id,
          target: focusedId,
          type: 'smoothstep',
          animated: style.animated,
          style: {
            stroke: strokeColor,
            strokeWidth: 2,
            opacity: 0.8,
            strokeDasharray: style.strokeDasharray,
          },
          label: RELATION_LABELS[rel.type],
          labelStyle: { fontSize: 11, fill: '#374151', fontWeight: 500 },
          labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
          labelBgPadding: [4, 2] as [number, number],
        });
      });
    });

    return edgeList;
  }, [definitions, focusedId, neighbors]);

  return { nodes, edges, neighbors };
}

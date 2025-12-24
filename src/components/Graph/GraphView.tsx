import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { DefinitionNode } from './DefinitionNode';
import { CategoryNode } from './CategoryNode';
import { useGraph } from '../../hooks/useGraph';
import type { Definition, Categorie } from '../../types';

interface GraphViewProps {
  definitions: Definition[];
  categories: Categorie[];
  focusedId?: string;
  filterCategories?: string[];
  onSelectDefinition: (id: string) => void;
  onBackToCategories: () => void;
}

const nodeTypes = {
  definition: DefinitionNode,
  category: CategoryNode,
};

export function GraphView({
  definitions,
  categories,
  focusedId,
  filterCategories,
  onSelectDefinition,
  onBackToCategories,
}: GraphViewProps) {
  const { nodes: initialNodes, edges: initialEdges, neighbors } = useGraph({
    definitions,
    categories,
    focusedId,
    filterCategories,
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Mettre à jour les noeuds quand les données changent
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node: Node) => {
      if (node.type === 'category') {
        // Clic sur une catégorie : afficher la première définition de cette catégorie
        const categoryId = node.data.categoryId;
        const firstDef = definitions.find(d => d.categorie === categoryId);
        if (firstDef) {
          onSelectDefinition(firstDef.id);
        }
      } else {
        // Clic sur une définition : la focuser
        onSelectDefinition(node.id);
      }
    },
    [definitions, onSelectDefinition]
  );

  const focusedDef = focusedId ? definitions.find(d => d.id === focusedId) : undefined;

  if (definitions.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <p className="text-gray-500">Aucune définition à afficher</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Fil d'Ariane / Navigation */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <button
          onClick={onBackToCategories}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${focusedId
              ? 'bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-emerald-600'
              : 'bg-emerald-600 text-white shadow-lg'
            }
          `}
        >
          Catégories
        </button>
        {focusedDef && (
          <>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="px-3 py-2 bg-white rounded-lg shadow-md text-sm font-semibold text-gray-800">
              {focusedDef.terme}
            </span>
          </>
        )}
      </div>

      {/* Info sur les voisins */}
      {focusedId && neighbors.length > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-emerald-600">{neighbors.length}</span> concept{neighbors.length > 1 ? 's' : ''} lié{neighbors.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Titre central si pas de focus */}
      {!focusedId && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-emerald-800/20">GreenGraph</h1>
            <p className="text-lg text-emerald-600/30 mt-2">Cliquez sur une catégorie</p>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, maxZoom: 1.2 }}
        minZoom={0.5}
        maxZoom={2}
        attributionPosition="bottom-left"
        className="bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50"
      >
        <Background color="#d1d5db" gap={24} size={1} />
        <Controls
          className="!bg-white !shadow-lg !rounded-xl !border-0"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}

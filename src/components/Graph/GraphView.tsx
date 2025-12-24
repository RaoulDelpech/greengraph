import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { DefinitionNode } from './DefinitionNode';
import { useGraph } from '../../hooks/useGraph';
import type { Definition, Categorie } from '../../types';

interface GraphViewProps {
  definitions: Definition[];
  categories: Categorie[];
  selectedId?: string;
  filterCategories?: string[];
  onSelectDefinition: (id: string) => void;
}

const nodeTypes = {
  definition: DefinitionNode,
};

export function GraphView({
  definitions,
  categories,
  selectedId,
  filterCategories,
  onSelectDefinition,
}: GraphViewProps) {
  const { nodes: initialNodes, edges: initialEdges } = useGraph({
    definitions,
    categories,
    selectedId,
    filterCategories,
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Mettre à jour les noeuds quand les données changent
  useMemo(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node: Node) => {
      onSelectDefinition(node.id);
    },
    [onSelectDefinition]
  );

  // Couleurs pour la minimap
  const nodeColor = useCallback(
    (node: Node) => node.data?.color || '#6b7280',
    []
  );

  if (definitions.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Aucune définition à afficher</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="bottom-left"
      >
        <Background color="#e2e8f0" gap={20} />
        <Controls className="!bg-white !shadow-md !rounded-lg !border !border-gray-200" />
        <MiniMap
          nodeColor={nodeColor}
          className="!bg-white !shadow-md !rounded-lg !border !border-gray-200"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}

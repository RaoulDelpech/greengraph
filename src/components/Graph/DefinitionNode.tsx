import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';

interface DefinitionNodeData {
  label: string;
  definition: string;
  categorie: string;
  color: string;
  isSelected: boolean;
}

function DefinitionNodeComponent({ data }: NodeProps<DefinitionNodeData>) {
  const { label, definition, color, isSelected } = data;

  // Tronquer la définition pour l'aperçu
  const preview = definition.length > 80 ? definition.slice(0, 80) + '...' : definition;

  return (
    <div
      className={`
        px-4 py-3 rounded-lg shadow-md border-2 bg-white
        min-w-[180px] max-w-[250px] cursor-pointer
        transition-all duration-200 hover:shadow-lg
        ${isSelected ? 'ring-2 ring-offset-2' : ''}
      `}
      style={{
        borderColor: color,
        ...(isSelected && { ringColor: color }),
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400 !w-2 !h-2"
      />

      <div className="flex items-start gap-2">
        <div
          className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-800 truncate">
            {label}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {preview}
          </p>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400 !w-2 !h-2"
      />
    </div>
  );
}

export const DefinitionNode = memo(DefinitionNodeComponent);

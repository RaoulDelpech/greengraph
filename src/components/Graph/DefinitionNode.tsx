import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';

interface DefinitionNodeData {
  label: string;
  definition: string;
  categorie: string;
  color: string;
  isSelected: boolean;
  isCentral?: boolean;
  relationType?: string;
}

function DefinitionNodeComponent({ data }: NodeProps<DefinitionNodeData>) {
  const { label, definition, color, isSelected, isCentral } = data;

  // Tronquer la définition pour l'aperçu
  const preview = definition.length > 60 ? definition.slice(0, 60) + '...' : definition;

  return (
    <div
      className={`
        rounded-xl shadow-md border-2 bg-white cursor-pointer
        transition-all duration-300 hover:shadow-xl
        ${isCentral
          ? 'px-6 py-4 min-w-[220px] max-w-[280px] scale-110 ring-4 ring-opacity-30'
          : 'px-4 py-3 min-w-[160px] max-w-[200px] hover:scale-105'
        }
        ${isSelected && !isCentral ? 'ring-2 ring-offset-2' : ''}
      `}
      style={{
        borderColor: color,
        ...(isCentral && { ringColor: color }),
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
      />

      <div className="flex items-start gap-3">
        <div
          className={`rounded-full flex-shrink-0 ${isCentral ? 'w-4 h-4 mt-1' : 'w-3 h-3 mt-0.5'}`}
          style={{ backgroundColor: color }}
        />
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-gray-800 ${isCentral ? 'text-base' : 'text-sm'}`}>
            {label}
          </h3>
          {isCentral && (
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              {preview}
            </p>
          )}
        </div>
      </div>

      {!isCentral && (
        <p className="text-xs text-emerald-600 mt-2 font-medium">
          Cliquer pour explorer
        </p>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}

export const DefinitionNode = memo(DefinitionNodeComponent);

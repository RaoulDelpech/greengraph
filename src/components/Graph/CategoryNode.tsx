import { memo } from 'react';
import type { NodeProps } from 'reactflow';

interface CategoryNodeData {
  label: string;
  color: string;
  count: number;
  categoryId: string;
}

function CategoryNodeComponent({ data }: NodeProps<CategoryNodeData>) {
  const { label, color, count } = data;

  return (
    <div
      className="
        px-6 py-4 rounded-2xl shadow-lg border-2 bg-white
        min-w-[160px] cursor-pointer
        transition-all duration-300 hover:shadow-xl hover:scale-105
        flex flex-col items-center gap-2
      "
      style={{ borderColor: color }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
        style={{ backgroundColor: color }}
      >
        {count}
      </div>
      <h3 className="font-semibold text-sm text-gray-800 text-center">
        {label}
      </h3>
      <p className="text-xs text-gray-500">
        Cliquer pour explorer
      </p>
    </div>
  );
}

export const CategoryNode = memo(CategoryNodeComponent);

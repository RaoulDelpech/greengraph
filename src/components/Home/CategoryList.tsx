import { useState } from 'react';
import type { Categorie, Definition } from '../../types';

interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  categories: string[];
  colorClass: string;
}

// Groupement thématique des catégories
const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'nature',
    name: 'Nature & Écosystèmes',
    description: 'Biodiversité, forêts, océans et ressources naturelles',
    categories: ['biodiversite', 'forets-oceans', 'eau'],
    colorClass: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'climat',
    name: 'Climat & Énergie',
    description: 'Changement climatique, énergies et technologies',
    categories: ['energie-climat', 'technologies-vertes', 'pollution'],
    colorClass: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'economie',
    name: 'Économie & Production',
    description: 'Économie circulaire, agriculture et gestion des ressources',
    categories: ['economie-circulaire', 'agriculture-alimentation', 'dechets'],
    colorClass: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'societe',
    name: 'Société & Gouvernance',
    description: 'Droit, finance, urbanisme et développement durable',
    categories: ['droit-environnement', 'finance-verte', 'urbanisme-durable', 'developpement-durable'],
    colorClass: 'from-blue-500 to-indigo-500',
  },
];

interface CategoryListProps {
  categories: Categorie[];
  definitions: Definition[];
  onSelectCategory: (categoryId: string) => void;
  selectedCategory?: string;
}

export function CategoryList({
  categories,
  definitions,
  onSelectCategory,
  selectedCategory,
}: CategoryListProps) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>('nature');

  const getCategoryById = (id: string) => categories.find((c) => c.id === id);
  const getDefinitionCount = (categoryId: string) =>
    definitions.filter((d) => d.categorie === categoryId).length;

  const toggleGroup = (groupId: string) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };

  return (
    <div className="space-y-3">
      {CATEGORY_GROUPS.map((group, groupIndex) => {
        const isExpanded = expandedGroup === group.id;
        const groupCategories = group.categories
          .map(getCategoryById)
          .filter(Boolean) as Categorie[];
        const totalDefinitions = group.categories.reduce(
          (sum, catId) => sum + getDefinitionCount(catId),
          0
        );

        return (
          <div
            key={group.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
            style={{
              animationDelay: `${groupIndex * 100}ms`,
            }}
          >
            {/* Group header */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${group.colorClass}`}
                />
                <div className="text-left">
                  <h3 className="font-serif font-semibold text-gray-900 text-lg">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {group.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  {totalDefinitions} définitions
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Categories list */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-4 space-y-1">
                {groupCategories.map((category, catIndex) => {
                  const count = getDefinitionCount(category.id);
                  const isSelected = selectedCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => onSelectCategory(category.id)}
                      className={`
                        w-full px-4 py-3 rounded-lg text-left transition-all duration-200
                        flex items-center justify-between group
                        ${
                          isSelected
                            ? 'bg-gray-100 shadow-inner'
                            : 'hover:bg-gray-50'
                        }
                      `}
                      style={{
                        animationDelay: `${(groupIndex * 100) + (catIndex * 50)}ms`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                          style={{ backgroundColor: category.couleur }}
                        />
                        <span
                          className={`font-medium transition-colors ${
                            isSelected ? 'text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          {category.nom}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{count}</span>
                        <svg
                          className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

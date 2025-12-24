import { useState, useEffect, useCallback } from 'react';
import type { Definition, CategoriesIndex, CategorieData, Categorie } from '../types';

interface UseDefinitionsReturn {
  definitions: Definition[];
  categories: Categorie[];
  loading: boolean;
  error: string | null;
  getDefinitionById: (id: string) => Definition | undefined;
  getDefinitionsByCategory: (categoryId: string) => Definition[];
  getRelatedDefinitions: (definitionId: string) => Definition[];
}

export function useDefinitions(): UseDefinitionsReturn {
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // Cache-busting pour forcer le rechargement des données
        const cacheBust = `?v=${Date.now()}`;

        // Charger l'index des catégories
        const indexResponse = await fetch(`${import.meta.env.BASE_URL}data/index.json${cacheBust}`);
        if (!indexResponse.ok) throw new Error('Impossible de charger l\'index des catégories');
        const indexData: CategoriesIndex = await indexResponse.json();

        setCategories(indexData.categories);

        // Charger toutes les catégories en parallèle
        const categoryPromises = indexData.categories.map(async (cat) => {
          const response = await fetch(`${import.meta.env.BASE_URL}data/categories/${cat.fichier}${cacheBust}`);
          if (!response.ok) throw new Error(`Impossible de charger la catégorie ${cat.nom}`);
          const data: CategorieData = await response.json();
          return data.definitions;
        });

        const allDefinitions = await Promise.all(categoryPromises);
        const flatDefinitions = allDefinitions.flat();

        setDefinitions(flatDefinitions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const getDefinitionById = useCallback(
    (id: string): Definition | undefined => {
      return definitions.find((d) => d.id === id);
    },
    [definitions]
  );

  const getDefinitionsByCategory = useCallback(
    (categoryId: string): Definition[] => {
      return definitions.filter((d) => d.categorie === categoryId);
    },
    [definitions]
  );

  const getRelatedDefinitions = useCallback(
    (definitionId: string): Definition[] => {
      const definition = getDefinitionById(definitionId);
      if (!definition?.relations) return [];

      const relatedIds = definition.relations.map((r) => r.cible);
      return definitions.filter((d) => relatedIds.includes(d.id));
    },
    [definitions, getDefinitionById]
  );

  return {
    definitions,
    categories,
    loading,
    error,
    getDefinitionById,
    getDefinitionsByCategory,
    getRelatedDefinitions,
  };
}

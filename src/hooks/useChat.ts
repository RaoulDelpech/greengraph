import { useState, useCallback } from 'react';
import Fuse from 'fuse.js';
import { sendChatMessage, getApiKey } from '../utils/mistralClient';
import type { Definition, ChatMessage } from '../types';

interface UseChatProps {
  definitions: Definition[];
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  hasApiKey: boolean;
}

const SYSTEM_PROMPT = `Vous êtes un assistant pédagogue spécialisé en écologie, environnement et développement durable.

RÈGLES DE RÉPONSE :
1. Répondez en vous basant sur les définitions fournies dans le contexte
2. Citez les termes utilisés entre [crochets] pour permettre la navigation
3. Mentionnez naturellement les sources (ex: "selon le GIEC", "d'après l'ADEME")
4. Soyez concis et accessible
5. Vouvoyez toujours l'utilisateur

SI LA QUESTION N'A PAS DE CORRESPONDANCE DIRECTE :
- Ne dites JAMAIS simplement "je n'ai pas de définition"
- Identifiez la thématique la plus proche parmi celles disponibles
- Proposez 2-3 termes connexes qui pourraient intéresser l'utilisateur
- Reformulez ce que vous comprenez de la question et orientez vers les concepts pertinents
- Exemple : "Votre question sur X touche à plusieurs thématiques. Je vous propose d'explorer [terme1] qui traite de... et [terme2] qui aborde..."

CATÉGORIES DISPONIBLES : économie circulaire, biodiversité, énergie et climat, développement durable, déchets, eau, agriculture et alimentation, urbanisme durable, pollution.

Répondez toujours en français, de manière engageante et pédagogue, en vouvoyant l'utilisateur.`;

// Catégories avec leurs mots-clés pour l'orientation
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'economie-circulaire': ['recyclage', 'réutilisation', 'déchet', 'produit', 'consommation', 'industrie', 'production'],
  'biodiversite': ['espèce', 'animal', 'plante', 'forêt', 'nature', 'écosystème', 'habitat', 'faune', 'flore'],
  'energie-climat': ['climat', 'température', 'carbone', 'CO2', 'énergie', 'solaire', 'éolien', 'fossile', 'réchauffement'],
  'developpement-durable': ['durable', 'ODD', 'RSE', 'entreprise', 'investissement', 'social', 'économique'],
  'dechets': ['poubelle', 'tri', 'compost', 'plastique', 'emballage', 'ordure', 'recyclage'],
  'eau': ['eau', 'rivière', 'mer', 'océan', 'nappe', 'pluie', 'sécheresse', 'inondation'],
  'agriculture-alimentation': ['agriculture', 'ferme', 'bio', 'alimentation', 'nourriture', 'élevage', 'pesticide'],
  'urbanisme-durable': ['ville', 'urbain', 'transport', 'mobilité', 'bâtiment', 'logement', 'quartier'],
  'pollution': ['pollution', 'air', 'sol', 'santé', 'toxique', 'chimique', 'nuisance'],
};

export function useChat({ definitions }: UseChatProps): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Index Fuse pour trouver les définitions pertinentes
  const fuse = new Fuse(definitions, {
    keys: [
      { name: 'terme', weight: 2 },
      { name: 'definition', weight: 1 },
      { name: 'resume', weight: 1.2 },
      { name: 'tags', weight: 1.5 },
      { name: 'synonymes', weight: 1.5 },
      { name: 'motsClésScientifiques', weight: 1.3 },
    ],
    threshold: 0.5, // Plus permissif pour capturer plus de résultats
    includeScore: true,
  });

  // Détecter les catégories pertinentes basées sur les mots-clés
  const detectRelevantCategories = useCallback((query: string): string[] => {
    const queryLower = query.toLowerCase();
    const matches: { category: string; count: number }[] = [];

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      const count = keywords.filter(kw => queryLower.includes(kw.toLowerCase())).length;
      if (count > 0) {
        matches.push({ category, count });
      }
    }

    return matches
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(m => m.category);
  }, []);

  const findRelevantDefinitions = useCallback(
    (query: string, limit: number = 7): { definitions: Definition[]; matchQuality: 'good' | 'partial' | 'weak' } => {
      const results = fuse.search(query);

      // Analyser la qualité des matches
      const goodMatches = results.filter(r => (r.score || 1) < 0.3);
      const partialMatches = results.filter(r => (r.score || 1) >= 0.3 && (r.score || 1) < 0.5);

      let matchQuality: 'good' | 'partial' | 'weak';
      if (goodMatches.length >= 2) {
        matchQuality = 'good';
      } else if (goodMatches.length >= 1 || partialMatches.length >= 2) {
        matchQuality = 'partial';
      } else {
        matchQuality = 'weak';
      }

      return {
        definitions: results.slice(0, limit).map((r) => r.item),
        matchQuality,
      };
    },
    [fuse]
  );

  // Construire le contexte avec les définitions et l'orientation
  const buildContext = useCallback((
    relevantDefs: Definition[],
    matchQuality: 'good' | 'partial' | 'weak',
    suggestedCategories: string[],
    query: string
  ): string => {
    let context = '';

    // Ajouter une note sur la qualité du match pour guider le LLM
    if (matchQuality === 'weak') {
      context += `⚠️ ATTENTION: La question "${query}" ne correspond pas directement aux définitions disponibles.\n`;
      context += `Vous devez orienter l'utilisateur vers les thématiques proches.\n`;
      if (suggestedCategories.length > 0) {
        const categoryNames: Record<string, string> = {
          'economie-circulaire': 'Économie circulaire',
          'biodiversite': 'Biodiversité',
          'energie-climat': 'Énergie et climat',
          'developpement-durable': 'Développement durable',
          'dechets': 'Déchets',
          'eau': 'Ressources en eau',
          'agriculture-alimentation': 'Agriculture et alimentation',
          'urbanisme-durable': 'Urbanisme durable',
          'pollution': 'Pollution et santé',
        };
        const catNames = suggestedCategories.map(c => categoryNames[c] || c).join(', ');
        context += `Catégories suggérées: ${catNames}\n`;
      }
      context += '\n---\n\n';
    } else if (matchQuality === 'partial') {
      context += `ℹ️ Note: Correspondance partielle trouvée. Complète ta réponse en proposant d'explorer d'autres termes connexes.\n\n---\n\n`;
    }

    if (relevantDefs.length === 0) {
      // Proposer des pistes même sans définition directe
      context += `Aucune définition directement pertinente, mais voici les thématiques disponibles:\n`;
      context += `- Économie circulaire (recyclage, réemploi, écoconception...)\n`;
      context += `- Biodiversité (espèces, écosystèmes, corridors écologiques...)\n`;
      context += `- Énergie et climat (GES, transition, renouvelables...)\n`;
      context += `- Eau (cycle, stress hydrique, assainissement...)\n`;
      context += `- Agriculture (agroécologie, bio, circuits courts...)\n`;
      context += `- Urbanisme (mobilité, ville durable, ZFE...)\n`;
      context += `- Pollution (air, sols, santé environnementale...)\n`;
      return context;
    }

    // Ajouter les définitions pertinentes
    context += relevantDefs
      .map((def) => {
        let defContext = `[${def.terme}] (catégorie: ${def.categorie}): ${def.definition}`;

        // Ajouter le contenu expert si disponible
        if (def.definitionEtendue) {
          const ext = def.definitionEtendue;
          if (ext.mecanismes) {
            defContext += `\nMécanismes: ${ext.mecanismes}`;
          }
          if (ext.enjeuxActuels) {
            defContext += `\nEnjeux actuels: ${ext.enjeuxActuels}`;
          }
        }

        // Ajouter les indicateurs quantitatifs
        if (def.indicateursQuantitatifs && def.indicateursQuantitatifs.length > 0) {
          const indicators = def.indicateursQuantitatifs
            .map(ind => `${ind.valeur} (${ind.source}, ${ind.annee})`)
            .join('; ');
          defContext += `\nDonnées chiffrées: ${indicators}`;
        }

        // Ajouter les sources principales
        if (def.sources && def.sources.length > 0) {
          const topSources = def.sources
            .filter(s => s.niveauPreuve === 'elevé')
            .slice(0, 2)
            .map(s => s.auteur || s.institution || s.titre)
            .join(', ');
          if (topSources) {
            defContext += `\nSources principales: ${topSources}`;
          }
        }

        // Ajouter les relations pour suggérer des termes connexes
        if (def.relations && def.relations.length > 0) {
          const related = def.relations.slice(0, 3).map(r => r.cible).join(', ');
          defContext += `\nTermes connexes: ${related}`;
        }

        if (def.exemples && def.exemples.length > 0) {
          defContext += `\nExemples: ${def.exemples.join(', ')}`;
        }

        return defContext;
      })
      .join('\n\n---\n\n');

    return context;
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const apiKey = getApiKey();
      if (!apiKey) {
        setError('Clé API Mistral non configurée. Accédez aux paramètres pour la configurer.');
        return;
      }

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // Trouver les définitions pertinentes avec la qualité du match
        const { definitions: relevantDefs, matchQuality } = findRelevantDefinitions(content, 7);

        // Détecter les catégories suggérées basées sur les mots-clés
        const suggestedCategories = detectRelevantCategories(content);

        // Construire le contexte enrichi avec l'orientation
        const context = buildContext(relevantDefs, matchQuality, suggestedCategories, content);

        // Collecter les sources de haute qualité des définitions utilisées
        const usedSources = relevantDefs
          .flatMap(def => def.sources || [])
          .filter(s => s.niveauPreuve === 'elevé')
          .slice(0, 4);

        // Construire les messages pour Mistral
        const chatMessages = [
          { role: 'system' as const, content: SYSTEM_PROMPT },
          {
            role: 'user' as const,
            content: `Contexte (définitions disponibles):\n${context}\n\nQuestion de l'utilisateur: ${content}`,
          },
        ];

        // Appeler l'API
        const response = await sendChatMessage(apiKey, chatMessages);

        // Extraire les citations (termes entre crochets)
        const citations = response.match(/\[([^\]]+)\]/g)?.map((c) => c.slice(1, -1)) || [];

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          citations,
          sources: usedSources,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    },
    [findRelevantDefinitions, detectRelevantCategories, buildContext]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    hasApiKey: !!getApiKey(),
  };
}

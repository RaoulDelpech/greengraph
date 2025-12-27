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

const SYSTEM_PROMPT = `Tu es un assistant spécialisé en écologie, environnement et économie circulaire.
Tu réponds UNIQUEMENT en te basant sur les définitions fournies dans le contexte.
Si aucune définition ne permet de répondre à la question, dis-le clairement : "Je n'ai pas de définition sur ce sujet dans ma base."
Cite toujours les termes utilisés entre [crochets] pour permettre la navigation.
Quand tu utilises des informations d'une source, mentionne-la naturellement (ex: "selon le GIEC", "d'après l'ADEME").
Sois concis et pédagogue. Réponds en français.`;

export function useChat({ definitions }: UseChatProps): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Index Fuse pour trouver les définitions pertinentes
  const fuse = new Fuse(definitions, {
    keys: [
      { name: 'terme', weight: 2 },
      { name: 'definition', weight: 1 },
      { name: 'tags', weight: 1.5 },
      { name: 'synonymes', weight: 1.5 },
    ],
    threshold: 0.4,
    includeScore: true,
  });

  const findRelevantDefinitions = useCallback(
    (query: string, limit: number = 5): Definition[] => {
      const results = fuse.search(query);
      return results.slice(0, limit).map((r) => r.item);
    },
    [fuse]
  );

  const buildContext = useCallback((relevantDefs: Definition[]): string => {
    if (relevantDefs.length === 0) {
      return 'Aucune définition pertinente trouvée.';
    }

    return relevantDefs
      .map((def) => {
        let context = `[${def.terme}]: ${def.definition}`;

        // Ajouter le contenu expert si disponible
        if (def.definitionEtendue) {
          const ext = def.definitionEtendue;
          if (ext.mecanismes) {
            context += `\nMécanismes: ${ext.mecanismes}`;
          }
          if (ext.enjeuxActuels) {
            context += `\nEnjeux actuels: ${ext.enjeuxActuels}`;
          }
        }

        // Ajouter les indicateurs quantitatifs
        if (def.indicateursQuantitatifs && def.indicateursQuantitatifs.length > 0) {
          const indicators = def.indicateursQuantitatifs
            .map(ind => `${ind.valeur} (${ind.source}, ${ind.annee})`)
            .join('; ');
          context += `\nDonnées chiffrées: ${indicators}`;
        }

        // Ajouter les sources principales
        if (def.sources && def.sources.length > 0) {
          const topSources = def.sources
            .filter(s => s.niveauPreuve === 'elevé')
            .slice(0, 2)
            .map(s => s.auteur || s.institution || s.titre)
            .join(', ');
          if (topSources) {
            context += `\nSources principales: ${topSources}`;
          }
        }

        if (def.exemples && def.exemples.length > 0) {
          context += `\nExemples: ${def.exemples.join(', ')}`;
        }

        return context;
      })
      .join('\n\n---\n\n');
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
        // Trouver les définitions pertinentes
        const relevantDefs = findRelevantDefinitions(content, 7);
        const context = buildContext(relevantDefs);

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
    [findRelevantDefinitions, buildContext]
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

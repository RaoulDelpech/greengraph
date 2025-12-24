import { useState, useCallback } from 'react';
import { useDefinitions } from './hooks/useDefinitions';
import { Header, Sidebar } from './components/Layout';
import { GraphView } from './components/Graph';
import { DefinitionPanel } from './components/Definition';
import { ChatPanel } from './components/Chat';

function App() {
  const { definitions, categories, loading, error, getDefinitionById } = useDefinitions();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sélectionner toutes les catégories au premier chargement
  if (categories.length > 0 && selectedCategories.length === 0) {
    setSelectedCategories(categories.map((c) => c.id));
  }

  const handleSelectDefinition = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedId(undefined);
  }, []);

  const handleToggleCategory = useCallback((id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAllCategories = useCallback(() => {
    setSelectedCategories(categories.map((c) => c.id));
  }, [categories]);

  const handleClearAllCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const selectedDefinition = selectedId ? getDefinitionById(selectedId) : undefined;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des définitions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Header definitions={definitions} onSelectDefinition={handleSelectDefinition} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onSelectAll={handleSelectAllCategories}
          onClearAll={handleClearAllCategories}
        />

        <main className="flex-1 relative">
          <GraphView
            definitions={definitions}
            categories={categories}
            selectedId={selectedId}
            filterCategories={selectedCategories.length > 0 ? selectedCategories : undefined}
            onSelectDefinition={handleSelectDefinition}
          />

          {/* Bouton Chat flottant */}
          {!isChatOpen && (
            <button
              onClick={handleToggleChat}
              className="absolute bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-105 flex items-center justify-center"
              title="Ouvrir le chat"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
          )}
        </main>

        {selectedDefinition && (
          <div className="w-96 flex-shrink-0">
            <DefinitionPanel
              definition={selectedDefinition}
              categories={categories}
              allDefinitions={definitions}
              onNavigate={handleSelectDefinition}
              onClose={handleClosePanel}
            />
          </div>
        )}

        {isChatOpen && (
          <div className="w-96 flex-shrink-0">
            <ChatPanel
              definitions={definitions}
              onDefinitionClick={handleSelectDefinition}
              onClose={handleToggleChat}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

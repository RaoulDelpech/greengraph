import { useState, useCallback, useEffect } from 'react';
import { useDefinitions } from './hooks/useDefinitions';
import { Header, Sidebar } from './components/Layout';
import { GraphView } from './components/Graph';
import { ListView } from './components/List';
import { DefinitionPanel } from './components/Definition';
import { ChatPanel } from './components/Chat';

function App() {
  const { definitions, categories, loading, error, getDefinitionById } = useDefinitions();
  const [focusedId, setFocusedId] = useState<string | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showDefinitionPanel, setShowDefinitionPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Détection automatique mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sélectionner toutes les catégories au premier chargement
  if (categories.length > 0 && selectedCategories.length === 0) {
    setSelectedCategories(categories.map((c) => c.id));
  }

  const handleFocusDefinition = useCallback((id: string) => {
    setFocusedId(id);
    setShowDefinitionPanel(true);
    setShowMobileSidebar(false);
  }, []);

  const handleBackToCategories = useCallback(() => {
    setFocusedId(undefined);
    setShowDefinitionPanel(false);
  }, []);

  const handleClosePanel = useCallback(() => {
    setShowDefinitionPanel(false);
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
    if (isMobile) setShowDefinitionPanel(false);
  }, [isMobile]);

  const handleToggleMobileSidebar = useCallback(() => {
    setShowMobileSidebar((prev) => !prev);
  }, []);

  const focusedDefinition = focusedId ? getDefinitionById(focusedId) : undefined;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des définitions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
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
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header avec bouton hamburger mobile */}
      <Header
        definitions={definitions}
        onSelectDefinition={handleFocusDefinition}
        isMobile={isMobile}
        onToggleMobileSidebar={handleToggleMobileSidebar}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - masquée sur mobile, overlay quand ouverte */}
        {(!isMobile || showMobileSidebar) && (
          <>
            {/* Overlay sur mobile */}
            {isMobile && showMobileSidebar && (
              <div
                className="fixed inset-0 bg-black/50 z-30 md:hidden"
                onClick={() => setShowMobileSidebar(false)}
              />
            )}
            <div className={`
              ${isMobile
                ? 'fixed left-0 top-14 bottom-0 z-40 w-64 transform transition-transform duration-300'
                : 'relative flex-shrink-0'
              }
              ${isMobile && !showMobileSidebar ? '-translate-x-full' : 'translate-x-0'}
            `}>
              <Sidebar
                categories={categories}
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
                onSelectAll={handleSelectAllCategories}
                onClearAll={handleClearAllCategories}
              />
            </div>
          </>
        )}

        {/* Zone principale */}
        <main className="flex-1 relative">
          {isMobile ? (
            <ListView
              definitions={definitions.filter(d =>
                selectedCategories.length === 0 || selectedCategories.includes(d.categorie)
              )}
              categories={categories.filter(c =>
                selectedCategories.length === 0 || selectedCategories.includes(c.id)
              )}
              onSelectDefinition={handleFocusDefinition}
            />
          ) : (
            <GraphView
              definitions={definitions}
              categories={categories}
              focusedId={focusedId}
              filterCategories={selectedCategories.length > 0 ? selectedCategories : undefined}
              onSelectDefinition={handleFocusDefinition}
              onBackToCategories={handleBackToCategories}
            />
          )}

          {/* Bouton Chat flottant */}
          {!isChatOpen && (
            <button
              onClick={handleToggleChat}
              className={`
                absolute bottom-4 right-4 md:bottom-6 md:right-6
                w-12 h-12 md:w-14 md:h-14 bg-emerald-600 text-white rounded-full
                shadow-lg hover:bg-emerald-700 transition-all hover:scale-105
                flex items-center justify-center z-20
              `}
              title="Ouvrir le chat"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* Panneau définition - plein écran sur mobile */}
        {showDefinitionPanel && focusedDefinition && (
          <div className={`
            ${isMobile
              ? 'fixed inset-0 z-50 bg-white'
              : 'w-96 flex-shrink-0 border-l border-gray-200'
            }
          `}>
            <DefinitionPanel
              definition={focusedDefinition}
              categories={categories}
              allDefinitions={definitions}
              onNavigate={handleFocusDefinition}
              onClose={handleClosePanel}
            />
          </div>
        )}

        {/* Chat panel - plein écran sur mobile */}
        {isChatOpen && (
          <div className={`
            ${isMobile
              ? 'fixed inset-0 z-50 bg-white'
              : 'w-96 flex-shrink-0'
            }
          `}>
            <ChatPanel
              definitions={definitions}
              onDefinitionClick={handleFocusDefinition}
              onClose={handleToggleChat}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

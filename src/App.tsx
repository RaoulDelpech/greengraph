import { useState, useCallback, useEffect, useRef } from 'react';
import { useDefinitions } from './hooks/useDefinitions';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { Header } from './components/Layout';
import { CategoryList, DefinitionList } from './components/Home';
import { DefinitionPanel } from './components/Definition';
import { ChatPanel } from './components/Chat';
import type { SearchBarHandle } from './components/Search';

type ViewState = 'home' | 'category' | 'definition';

function App() {
  const { definitions, categories, loading, error, getDefinitionById } = useDefinitions();
  const [viewState, setViewState] = useState<ViewState>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();
  const [selectedDefinitionId, setSelectedDefinitionId] = useState<string | undefined>();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchBarRef = useRef<SearchBarHandle>(null);

  // Navigation clavier globale
  useKeyboardNavigation({
    onFocusSearch: () => searchBarRef.current?.focus(),
    onClosePanel: () => {
      if (isChatOpen) {
        setIsChatOpen(false);
      } else if (viewState === 'definition') {
        setViewState('category');
      } else if (viewState === 'category') {
        setViewState('home');
      }
    },
  });

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handlers
  const handleGoHome = useCallback(() => {
    setViewState('home');
    setSelectedCategoryId(undefined);
    setSelectedDefinitionId(undefined);
  }, []);

  const handleSelectCategory = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedDefinitionId(undefined);
    setViewState('category');
  }, []);

  const handleSelectDefinition = useCallback((definitionId: string) => {
    const def = getDefinitionById(definitionId);
    if (def) {
      setSelectedCategoryId(def.categorie);
      setSelectedDefinitionId(definitionId);
      setViewState('definition');
    }
  }, [getDefinitionById]);

  const handleCloseDefinition = useCallback(() => {
    setSelectedDefinitionId(undefined);
    setViewState('category');
  }, []);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  // Données dérivées
  const selectedCategory = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId)
    : undefined;
  const categoryDefinitions = selectedCategoryId
    ? definitions.filter((d) => d.categorie === selectedCategoryId)
    : [];
  const selectedDefinition = selectedDefinitionId
    ? getDefinitionById(selectedDefinitionId)
    : undefined;

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
          <p className="text-red-600 font-medium">Erreur de chargement</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header compact */}
      <Header
        ref={searchBarRef}
        definitions={definitions}
        categories={categories}
        onSelectDefinition={handleSelectDefinition}
        isMobile={isMobile}
        onGoHome={handleGoHome}
      />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panneau gauche : Navigation */}
        <div
          className={`
            bg-white border-r border-gray-200 overflow-hidden transition-all duration-300
            ${isMobile ? 'hidden' : 'w-80 flex-shrink-0'}
          `}
        >
          <div className="h-full overflow-y-auto">
            {/* Fil d'Ariane */}
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <nav className="flex items-center gap-2 text-sm">
                <button
                  onClick={handleGoHome}
                  className={`transition-colors ${
                    viewState === 'home'
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Accueil
                </button>
                {selectedCategory && (
                  <>
                    <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <button
                      onClick={() => setViewState('category')}
                      className={`transition-colors truncate max-w-[150px] ${
                        viewState === 'category'
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {selectedCategory.nom}
                    </button>
                  </>
                )}
              </nav>
            </div>

            {/* Contenu selon l'état */}
            <div className="p-4">
              {viewState === 'home' && (
                <div className="animate-fadeIn">
                  <CategoryList
                    categories={categories}
                    definitions={definitions}
                    onSelectCategory={handleSelectCategory}
                    selectedCategory={selectedCategoryId}
                  />
                </div>
              )}

              {(viewState === 'category' || viewState === 'definition') && selectedCategory && (
                <div className="animate-fadeIn">
                  <DefinitionList
                    definitions={categoryDefinitions}
                    category={selectedCategory}
                    onSelectDefinition={handleSelectDefinition}
                    selectedDefinition={selectedDefinitionId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panneau central/droit : Contenu */}
        <div className="flex-1 flex overflow-hidden">
          {/* Zone principale */}
          <main className="flex-1 overflow-y-auto">
            {viewState === 'home' && !isMobile && (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <img
                    src="/greengraph/favicon.svg"
                    alt="GreenGraph"
                    className="w-20 h-20 mx-auto mb-6 opacity-30"
                  />
                  <h2 className="font-serif text-2xl text-gray-300 mb-3">
                    Glossaire interactif
                  </h2>
                  <p className="text-gray-400">
                    Sélectionnez une catégorie pour explorer les {definitions.length} concepts environnementaux.
                  </p>
                </div>
              </div>
            )}

            {viewState === 'category' && selectedCategory && !selectedDefinitionId && (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: `${selectedCategory.couleur}20` }}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: selectedCategory.couleur }}
                    />
                  </div>
                  <h2 className="font-serif text-xl text-gray-700 mb-2">
                    {selectedCategory.nom}
                  </h2>
                  <p className="text-gray-500">
                    {categoryDefinitions.length} définitions disponibles.
                    <br />
                    Sélectionnez un terme dans la liste.
                  </p>
                </div>
              </div>
            )}

            {/* Mobile : afficher CategoryList ou DefinitionList ici */}
            {isMobile && viewState === 'home' && (
              <div className="p-4 animate-fadeIn">
                <CategoryList
                  categories={categories}
                  definitions={definitions}
                  onSelectCategory={handleSelectCategory}
                  selectedCategory={selectedCategoryId}
                />
              </div>
            )}

            {isMobile && viewState === 'category' && selectedCategory && (
              <div className="animate-fadeIn">
                <DefinitionList
                  definitions={categoryDefinitions}
                  category={selectedCategory}
                  onSelectDefinition={handleSelectDefinition}
                  selectedDefinition={selectedDefinitionId}
                />
              </div>
            )}
          </main>

          {/* Panneau de définition */}
          {selectedDefinition && (
            <div
              className={`
                bg-white shadow-xl overflow-hidden transition-all duration-300
                ${isMobile
                  ? 'fixed inset-0 z-50'
                  : 'w-[420px] flex-shrink-0 border-l border-gray-200'
                }
              `}
            >
              <DefinitionPanel
                definition={selectedDefinition}
                categories={categories}
                allDefinitions={definitions}
                onNavigate={handleSelectDefinition}
                onClose={handleCloseDefinition}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bouton Chat */}
      {!isChatOpen && (
        <button
          onClick={handleToggleChat}
          className="fixed bottom-6 right-6 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-105 flex items-center justify-center z-20"
          title="Assistant"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      {isChatOpen && (
        <div
          className={`
            ${isMobile
              ? 'fixed inset-0 z-50 bg-white'
              : 'fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden z-30'
            }
          `}
        >
          <ChatPanel
            definitions={definitions}
            onDefinitionClick={handleSelectDefinition}
            onClose={handleToggleChat}
          />
        </div>
      )}
    </div>
  );
}

export default App;

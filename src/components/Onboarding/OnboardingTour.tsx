import { useState, useEffect, useCallback } from 'react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for highlight
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Bienvenue sur GreenGraph',
    description: 'Explore les concepts clés de l\'écologie à travers un graphe interactif. Clique sur une catégorie pour commencer.',
  },
  {
    id: 'depth',
    title: 'Niveaux de détail',
    description: 'Chaque définition propose 3 niveaux : Aperçu (résumé), Standard (complet), Expert (scientifique).',
  },
  {
    id: 'relations',
    title: 'Concepts liés',
    description: 'Les définitions sont interconnectées. Clique sur un concept lié pour l\'explorer.',
  },
];

const STORAGE_KEY = 'greengraph-onboarding-completed';

interface OnboardingTourProps {
  onComplete?: () => void;
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Vérifier si l'onboarding a déjà été complété
  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      // Petit délai pour laisser l'app se charger
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Terminer l'onboarding
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsVisible(false);
      onComplete?.();
    }
  }, [currentStep, onComplete]);

  const handleSkip = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  if (!isVisible) return null;

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <>
      {/* Overlay sombre */}
      <div
        className="fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300"
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Modal centrale */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101]
                   w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden
                   animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Header avec icône */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            {currentStep === 0 && (
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
            {currentStep === 1 && (
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            )}
            {currentStep === 2 && (
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            )}
          </div>
          <h2 id="onboarding-title" className="text-xl font-bold text-white">
            {step.title}
          </h2>
        </div>

        {/* Contenu */}
        <div className="px-6 py-6">
          <p className="text-gray-600 text-center leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Indicateurs de progression */}
        <div className="flex justify-center gap-2 pb-4">
          {ONBOARDING_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentStep ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100
                       rounded-lg transition-colors text-sm font-medium"
          >
            Passer
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg
                       hover:bg-emerald-700 transition-colors text-sm font-medium
                       flex items-center justify-center gap-2"
          >
            {isLastStep ? 'Commencer' : 'Suivant'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

// Hook pour réinitialiser l'onboarding (utile pour les tests)
export function useResetOnboarding() {
  return useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }, []);
}

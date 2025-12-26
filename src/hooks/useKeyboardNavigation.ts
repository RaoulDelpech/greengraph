import { useEffect, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  onFocusSearch: () => void;
  onClosePanel: () => void;
  onShowHelp?: () => void;
}

export function useKeyboardNavigation({
  onFocusSearch,
  onClosePanel,
  onShowHelp,
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignorer si on est dans un champ de saisie
      const target = e.target as HTMLElement;
      const isInputField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // "/" pour focus sur recherche (sauf si déjà dans un input)
      if (e.key === '/' && !isInputField) {
        e.preventDefault();
        onFocusSearch();
        return;
      }

      // "?" pour afficher l'aide (sauf si dans un input)
      if (e.key === '?' && !isInputField && onShowHelp) {
        e.preventDefault();
        onShowHelp();
        return;
      }

      // "Escape" pour fermer les panneaux
      if (e.key === 'Escape') {
        onClosePanel();
        return;
      }
    },
    [onFocusSearch, onClosePanel, onShowHelp]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

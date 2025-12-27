export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-white mt-auto">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* À propos */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-3 text-forest-200">
              GreenGraph
            </h3>
            <p className="text-sm text-forest-300 leading-relaxed">
              Glossaire interactif de l'environnement. Une ressource pédagogique
              open-source pour comprendre les enjeux écologiques contemporains.
            </p>
          </div>

          {/* Méthodologie */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-3 text-forest-200">
              Méthodologie
            </h3>
            <ul className="text-sm text-forest-300 space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-forest-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Sources scientifiques vérifiées</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-forest-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Relations sémantiques documentées</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-forest-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mises à jour régulières</span>
              </li>
            </ul>
          </div>

          {/* Licence et liens */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-3 text-forest-200">
              Open Source
            </h3>
            <div className="text-sm text-forest-300 space-y-2">
              <p>
                Contenu sous licence{' '}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-200 hover:text-white underline underline-offset-2"
                >
                  CC BY-SA 4.0
                </a>
              </p>
              <p>
                Code source sur{' '}
                <a
                  href="https://github.com/RaoulDelpech/greengraph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-200 hover:text-white underline underline-offset-2"
                >
                  GitHub
                </a>
              </p>
              <p className="text-forest-400 text-xs mt-3">
                Images : Wikimedia Commons (CC BY-SA)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-forest-400">
          <p>
            © {currentYear} GreenGraph. Projet éducatif indépendant.
          </p>
          <p className="flex items-center gap-1">
            <span>Fait avec</span>
            <svg className="w-3.5 h-3.5 text-forest-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>pour la planète</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

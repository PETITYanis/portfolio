(() => {
  "use strict";

  const MARGE = 24;

  /** Position de défilement qui place l'élément juste sous le header sticky. */
  function positionDeLaCible(element) {
    const header = document.querySelector(".header");
    const hauteurHeader = header ? header.offsetHeight : 0;
    return window.scrollY + element.getBoundingClientRect().top - hauteurHeader - MARGE;
  }

  function allerVers(id) {
    const element = document.getElementById(id);
    if (!element) return;
    window.scrollTo({ top: Math.max(0, positionDeLaCible(element)), behavior: "smooth" });
  }

  /** Cartes bento cliquables : elles portent un attribut data-scroll-target. */
  function initCartes() {
    document.querySelectorAll(".bento-card[data-scroll-target]").forEach((carte) => {
      carte.addEventListener("click", (event) => {
        const cible = event.target.closest("[data-scroll-target]");
        allerVers(cible?.dataset.scrollTarget);
      });

      // Clavier : Entrée / Espace sur la carte (les boutons internes le gèrent déjà)
      carte.addEventListener("keydown", (event) => {
        if (event.target === carte && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          allerVers(carte.dataset.scrollTarget);
        }
      });
    });
  }

  /** Liens d'ancre internes (#id) : défilement doux ; "#" seul = haut de page. */
  function initLiensAncres() {
    document.querySelectorAll('a[href^="#"]').forEach((lien) => {
      lien.addEventListener("click", (event) => {
        const id = lien.getAttribute("href").slice(1);

        if (!id) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (document.getElementById(id)) {
          event.preventDefault();
          allerVers(id);
        }
      });
    });
  }

  initCartes();
  initLiensAncres();
})();

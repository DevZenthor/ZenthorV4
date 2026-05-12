import { createContext, useContext, useState } from "react";

/* ─────────────────────────────────────────
   TOUTES LES TRADUCTIONS DU SITE ICI
   Ajoute / modifie les clés selon tes pages
───────────────────────────────────────── */
const translations = {
  fr: {
    /* Navbar */
    nav: {
      home:       "Accueil",
      projects:   "Projets",
      skills:     "Compétences",
      resume:     "CV",
      contact:    "Contact",
      cta:        "Me contacter",
    },
    /* Footer */
    footer: {
      tagline:    "Développeur Fullstack & Manager",
      rights:     "Tous droits réservés.",
      madeWith:   "Fait avec",
      links:      "Liens rapides",
      social:     "Réseaux",
      contact:    "Contact",
      location:   "Bruxelles, Belgique",
      available:  "Disponible pour missions",
    },
    /* Hero (pour plus tard) */
    hero: {
      badge:      "Disponible pour missions",
      title1:     "Développeur",
      title2:     "& Manager",
      title3:     "Fullstack",
      sub:        "Je conçois des applications React · Node.js performantes et pilote des équipes techniques avec une approche Agile.",
      btnProjects:"Voir mes projets",
      btnCV:      "Télécharger CV",
    },
  },

  en: {
    /* Navbar */
    nav: {
      home:       "Home",
      projects:   "Projects",
      skills:     "Skills",
      resume:     "Resume",
      contact:    "Contact",
      cta:        "Hire me",
    },
    /* Footer */
    footer: {
      tagline:    "Fullstack Developer & Manager",
      rights:     "All rights reserved.",
      madeWith:   "Made with",
      links:      "Quick links",
      social:     "Social",
      contact:    "Contact",
      location:   "Brussels, Belgium",
      available:  "Available for projects",
    },
    /* Hero */
    hero: {
      badge:      "Available for projects",
      title1:     "Developer",
      title2:     "& Manager",
      title3:     "Fullstack",
      sub:        "I build performant React · Node.js apps and lead technical teams with an Agile mindset.",
      btnProjects:"View my projects",
      btnCV:      "Download Resume",
    },
  },
};

/* ── Context ── */
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("fr");
  const t = translations[lang];
  const toggle = () => setLang((l) => (l === "fr" ? "en" : "fr"));
  const setLang_ = (l) => setLang(l);

  return (
    <LangContext.Provider value={{ lang, t, toggle, setLang: setLang_ }}>
      {children}
    </LangContext.Provider>
  );
}

/* Hook d'accès rapide */
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
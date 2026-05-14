import { createContext, useContext, useState } from "react";

/* ─────────────────────────────────────────
   TOUTES LES TRADUCTIONS DU SITE ICI
   Ajoute / modifie les clés selon tes pages
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   INFOS PERSONNELLES — modifier ici
───────────────────────────────────────── */
export const CONTACT_INFO = {
  email:    "zenthorpro@outlook.com",
  github:   "https://github.com/DevZenthor",
  githubHandle: "DevZenthor",
  twitter:  "https://x.com/zenthor1480",
  twitterHandle: "@zenthor1480",
  location: { fr: "Bruxelles, Belgique", en: "Brussels, Belgium" },
};

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
      tagline:    "Développeur Fullstack · 1 an d'expérience",
      rights:     "Tous droits réservés.",
      madeWith:   "Fait avec",
      links:      "Liens rapides",
      social:     "Réseaux",
      contact:    "Contact",
      location:   "Bruxelles, Belgique",
      available:  "Disponible pour missions",
    },
    /* Hero */
    hero: {
      badge:      "Disponible pour missions",
      title1:     "Développeur",
      title2:     "& Manager",
      title3:     "Fullstack",
      sub:        "Développeur Fullstack passionné avec 1 an d'expérience. Je construis des applications React · Node.js modernes et propres.",
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
      tagline:    "Fullstack Developer · 1 year of experience",
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
      sub:        "Passionate Fullstack Developer with 1 year of experience. I build modern, clean React · Node.js applications.",
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
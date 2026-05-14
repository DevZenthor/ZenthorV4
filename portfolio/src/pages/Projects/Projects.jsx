import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiGithubLine,
  RiExternalLinkLine,
  RiStarFill,
  RiCodeBoxLine,
  RiGamepadLine,
  RiLiveLine,
  RiBuildingLine,
  RiVideoLine,
  RiFilmLine,
  RiCloseLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCalendarLine,
  RiStackLine,
} from "react-icons/ri";
import { useLang, CONTACT_INFO } from "../../context/LangContext";
import "./Projects.css";

/* ── Données complètes des projets ── */
const PROJECTS_DATA = {
  fr: [
    {
      id: 1,
      icon: "gamepad",
      color: "#C060FF",
      title: "ZoneControl",
      badge: "Personnel",
      year: "2026",
      status: "Terminé",
      statusColor: "#22D97A",
      short: "Manager & tracker de parties pour Fortnite et autres jeux.",
      desc: "Application web pour manager et tracker ses parties Fortnite et autres jeux — stats, historique de matchs, classements personnels et suivi de progression.",
      tags: ["React", "Vite", "JavaScript", "SQL"],
      github: "https://github.com/DevZenthor",
      live: "https://zonecontrol.vercel.app/",
      stars: 8,
      features: {
        fr: ["Suivi des stats par match", "Historique complet des parties", "Classements personnels", "Graphiques de progression", "Support multi-jeux"],
        en: ["Per-match stat tracking", "Full match history", "Personal leaderboards", "Progression charts", "Multi-game support"],
      },
    },
    {
      id: 2,
      icon: "live",
      color: "#61DAFB",
      title: "Overlay 1P",
      badge: "One Prodige",
      year: "2026",
      status: "Terminé",
      statusColor: "#22D97A",
      short: "Overlay temps réel pour streams via APIs externes.",
      desc: "Overlay en temps réel pour streams — consomme des APIs externes (stats jeux, météo, alertes) et affiche les données dynamiquement en superposition sur le stream.",
      tags: ["HTML", "JS", "API", "CSS"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 8.5,
      features: {
        fr: ["Temps réel via WebSocket", "Intégration APIs externes", "Compatible OBS", "Thèmes personnalisables", "Alertes configurables"],
        en: ["Real-time via WebSocket", "External API integration", "OBS compatible", "Custom themes", "Configurable alerts"],
      },
    },
    {
      id: 3,
      icon: "building",
      color: "#fbff00",
      title: "Intranet 1P",
      badge: "One Prodige",
      year: "2026",
      status: "Terminé",
      statusColor: "#22D97A",
      short: "Zone de travail personnelle tout-en-un.",
      desc: "Zone de travail personnelle tout-en-un : notes, tâches, agenda, liens rapides et tableau de bord — un espace centralisé pour organiser son workflow au quotidien.",
      tags: ["React", "Node.js", "Bootstrap", "LocalStorage"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 9,
      features: {
        fr: ["Prise de notes rapide", "Gestionnaire de tâches", "Agenda intégré", "Liens rapides", "Dashboard centralisé"],
        en: ["Quick note-taking", "Task manager", "Integrated calendar", "Quick links", "Centralized dashboard"],
      },
    },
    {
      id: 4,
      icon: "video",
      color: "#FF6B6B",
      title: "Ryze : Portfolio Monteur",
      badge: "Portfolio",
      year: "2026",
      status: "Terminé",
      statusColor: "#22D97A",
      short: "Portfolio vidéo pour Ryze, monteur professionnel.",
      desc: "Portfolio complet pour un monteur vidéo professionnel : showreel, galerie de projets clients, page de contact et présentation des services. Design immersif centré sur la vidéo.",
      tags: ["React", "Vite", "Bootstrap", "JavaScript"],
      github: "https://github.com/DevZenthor",
      live: "https://ryzeprod.vercel.app/",
      stars: 9,
      features: {
        fr: ["Showreel vidéo intégré", "Galerie de projets clients", "Page de contact", "Design immersif", "Responsive mobile"],
        en: ["Integrated video showreel", "Client project gallery", "Contact page", "Immersive design", "Mobile responsive"],
      },
    },
    {
      id: 5,
      icon: "film",
      color: "#A8FF78",
      title: "Nitsy : Portfolio Graphiste",
      badge: "Portfolio",
      year: "2026",
      status: "Terminé",
      statusColor: "#22D97A",
      short: "Portfolio créatif pour Nitsy, graphiste professionnel.",
      desc: "Portfolio pour un graphiste professionnel : présentation des créations, projets clients, galerie visuelle et formulaire de contact. Interface moderne et épurée pensée pour mettre en valeur le travail graphique.",
      tags: ["React", "Vite", "Bootstrap", "JavaScript"],
      github: "https://github.com/DevZenthor",
      live: "https://nitsy-portfolio.vercel.app/",
      stars: 9,
      features: {
        fr: ["Présentation des créations", "Projets clients", "Galerie visuelle", "Formulaire de contact", "Design épuré"],
        en: ["Creative work showcase", "Client projects", "Visual gallery", "Contact form", "Clean design"],
      },
    },
  ],
  en: [
    {
      id: 1,
      icon: "gamepad",
      color: "#C060FF",
      title: "ZoneControl",
      badge: "Personal",
      year: "2026",
      status: "Finished",
      statusColor: "#22D97A",
      short: "Manager & tracker for Fortnite and other games.",
      desc: "Web app to manage and track Fortnite and other game sessions — match stats, history, personal leaderboards and progression tracking.",
      tags: ["React", "Vite", "JavaScript", "SQL"],
      github: "https://github.com/DevZenthor",
      live: "https://zonecontrol.vercel.app/",
      stars: 8,
      features: {
        fr: ["Suivi des stats par match", "Historique complet des parties", "Classements personnels", "Graphiques de progression", "Support multi-jeux"],
        en: ["Per-match stat tracking", "Full match history", "Personal leaderboards", "Progression charts", "Multi-game support"],
      },
    },
    {
      id: 2,
      icon: "live",
      color: "#61DAFB",
      title: "Overlay 1P",
      badge: "One Prodige",
      year: "2026",
      status: "Finished",
      statusColor: "#22D97A",
      short: "Real-time stream overlay using external APIs.",
      desc: "Real-time stream overlay — consumes external APIs (game stats, weather, alerts) and displays live data dynamically over the stream.",
      tags: ["HTML", "JS", "API", "CSS"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 7,
      features: {
        fr: ["Temps réel via WebSocket", "Intégration APIs externes", "Compatible OBS", "Thèmes personnalisables", "Alertes configurables"],
        en: ["Real-time via WebSocket", "External API integration", "OBS compatible", "Custom themes", "Configurable alerts"],
      },
    },
    {
      id: 3,
      icon: "building",
      color: "#fbff00",
      title: "Intranet 1P",
      badge: "One Prodige",
      year: "2026",
      status: "Finished",
      statusColor: "#22D97A",
      short: "All-in-one personal workspace.",
      desc: "All-in-one personal workspace: notes, tasks, calendar, quick links and dashboard — a centralized space to organize your daily workflow.",
      tags: ["React", "Node.js", "Bootstrap", "LocalStorage"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 5,
      features: {
        fr: ["Prise de notes rapide", "Gestionnaire de tâches", "Agenda intégré", "Liens rapides", "Dashboard centralisé"],
        en: ["Quick note-taking", "Task manager", "Integrated calendar", "Quick links", "Centralized dashboard"],
      },
    },
    {
      id: 4,
      icon: "video",
      color: "#FF6B6B",
      title: "Ryze : Video Editor Portfolio",
      badge: "Porfolio",
      year: "2026",
      status: "Finished",
      statusColor: "#22D97A",
      short: "Video portfolio for Ryze, professional video editor.",
      desc: "Full portfolio for a professional video editor: showreel, client project gallery, contact page and service presentation. Immersive design centered around video.",
      tags: ["React", "Vite", "Bootstrap", "JavaScript"],
      github: "https://github.com/DevZenthor",
      live: "https://ryzeprod.vercel.app/",
      stars: 9,
      features: {
        fr: ["Showreel vidéo intégré", "Galerie de projets clients", "Page de contact", "Design immersif", "Responsive mobile"],
        en: ["Integrated video showreel", "Client project gallery", "Contact page", "Immersive design", "Mobile responsive"],
      },
    },
    {
      id: 5,
      icon: "film",
      color: "#A8FF78",
      title: "Nitsy : Graphic Designer Portfolio",
      badge: "Portfolio",
      year: "2026",
      status: "Finished",
      statusColor: "#22D97A",
      short: "Creative portfolio for Nitsy, professional graphic designer.",
      desc: "Portfolio for a professional graphic designer: creative work showcase, client projects, visual gallery and contact form. Modern and clean interface designed to highlight graphic work.",
      tags: ["React", "Vite", "Bootstrap", "JavaScript"],
      github: "https://github.com/DevZenthor",
      live: "https://nitsy-portfolio.vercel.app/",
      stars: 9,
      features: {
        fr: ["Présentation des créations", "Projets clients", "Galerie visuelle", "Formulaire de contact", "Design épuré"],
        en: ["Creative work showcase", "Client projects", "Visual gallery", "Contact form", "Clean design"],
      },
    },
  ],
};

const PROJECT_ICONS = {
  gamepad:  <RiGamepadLine />,
  live:     <RiLiveLine />,
  building: <RiBuildingLine />,
  video:    <RiVideoLine />,
  film:     <RiFilmLine />,
};

const ALL_TAGS    = ["Tous", "React", "Vite", "Node.js", "HTML", "JavaScript", "Bootstrap", "One Prodige", "Personnel", "Portfolio"];
const ALL_TAGS_EN = ["All",  "React", "Vite", "Node.js", "HTML", "JavaScript", "Bootstrap", "One Prodige", "Personal", "Portfolio"];

export default function Projects() {
  const { lang, t } = useLang();
  const projects = PROJECTS_DATA[lang];
  const [filter, setFilter]   = useState("Tous");
  const [selected, setSelected] = useState(null);

  const tags    = lang === "fr" ? ALL_TAGS    : ALL_TAGS_EN;
  const allWord = lang === "fr" ? "Tous" : "All";

  const filtered = filter === allWord
    ? projects
    : projects.filter(p =>
        p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())) ||
        p.badge.toLowerCase().includes(filter.toLowerCase())
      );

  const openModal  = (p) => { setSelected(p); document.body.style.overflow = "hidden"; };
  const closeModal = ()  => { setSelected(null); document.body.style.overflow = ""; };

  return (
    <div className="projects-page">

      {/* ── HEADER ── */}
      <section className="proj-header">
        <div className="proj-header__back">
          <NavLink to="/" className="back-link">
            <RiArrowLeftLine /> {lang === "fr" ? "Accueil" : "Home"}
          </NavLink>
        </div>
        <div className="proj-header__content">
          <p className="eyebrow">{lang === "fr" ? "Mes réalisations" : "My work"}</p>
          <h1 className="proj-header__title">
            {lang === "fr" ? <>Tous mes <span>projets</span></> : <>All my <span>projects</span></>}
          </h1>
          <p className="proj-header__sub">
            {lang === "fr"
              ? "Des projets personnels construits avec passion — du code propre, des outils utiles."
              : "Personal projects built with passion — clean code, useful tools."}
          </p>
        </div>

        {/* Stats rapides */}
        <div className="proj-header__stats">
          <div className="proj-qstat">
            <span className="proj-qstat__num">{projects.length}</span>
            <span className="proj-qstat__label">{lang === "fr" ? "Projets" : "Projects"}</span>
          </div>
          <div className="proj-qstat__sep" />
          <div className="proj-qstat">
            <span className="proj-qstat__num">{projects.reduce((a,p) => a + p.stars, 0)}</span>
            <span className="proj-qstat__label">Stars GitHub</span>
          </div>
          <div className="proj-qstat__sep" />
          <div className="proj-qstat">
            <span className="proj-qstat__num">2024</span>
            <span className="proj-qstat__label">{lang === "fr" ? "Année" : "Year"}</span>
          </div>
        </div>
      </section>

      {/* ── FILTRES ── */}
      <section className="proj-filters">
        <div className="filters-row">
          {tags.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${filter === tag ? "active" : ""}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <span className="proj-count">
          {filtered.length} {lang === "fr" ? "projet" : "project"}{filtered.length > 1 ? "s" : ""}
        </span>
      </section>

      {/* ── GRILLE ── */}
      <section className="proj-grid-section">
        <div className="proj-grid">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="pcard"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => openModal(p)}
            >
              {/* Shine effect */}
              <div className="pcard__shine" />

              {/* Top */}
              <div className="pcard__top">
                <div className="pcard__left">
                  <div className="pcard__ico" style={{ color: p.color, borderColor: `${p.color}44`, background: `${p.color}16` }}>
                    {PROJECT_ICONS[p.icon]}
                  </div>
                  <span className="pcard__badge">{p.badge}</span>
                </div>
                <div className="pcard__links" onClick={e => e.stopPropagation()}>
                  <a href={p.github} target="_blank" rel="noreferrer" className="pcard__link" title="GitHub">
                    <RiGithubLine />
                  </a>
                </div>
              </div>

              {/* Title + status */}
              <div className="pcard__titlerow">
                <h3 className="pcard__title">{p.title}</h3>
                <span className="pcard__status" style={{ color: p.statusColor, borderColor: `${p.statusColor}40`, background: `${p.statusColor}12` }}>
                  <span className="pcard__status-dot" style={{ background: p.statusColor, boxShadow: `0 0 6px ${p.statusColor}` }} />
                  {p.status}
                </span>
              </div>

              <p className="pcard__short">{p.short}</p>

              {/* Tags */}
              <div className="pcard__tags">
                {p.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="pcard__tag">{tag}</span>
                ))}
                {p.tags.length > 3 && <span className="pcard__tag pcard__tag--more">+{p.tags.length - 3}</span>}
              </div>

              {/* Footer */}
              <div className="pcard__footer">
                <span className="pcard__stars"><RiStarFill style={{ color: "#FAB432" }} /> {p.stars}</span>
                <span className="pcard__year"><RiCalendarLine /> {p.year}</span>
                <span className="pcard__cta">
                  {lang === "fr" ? "Voir plus" : "See more"} <RiArrowRightLine />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="proj-empty">
            <RiCodeBoxLine />
            <p>{lang === "fr" ? "Aucun projet pour ce filtre." : "No projects for this filter."}</p>
          </div>
        )}
      </section>

      {/* ── CTA GitHub ── */}
      <section className="proj-github-cta">
        <div className="proj-github-cta__inner">
          <div className="proj-github-cta__glow" />
          <RiGithubLine className="proj-github-cta__icon" />
          <div>
            <h3>{lang === "fr" ? "Voir tout sur GitHub" : "See everything on GitHub"}</h3>
            <p>{lang === "fr" ? "D'autres projets et expérimentations sur mon profil." : "More projects and experiments on my profile."}</p>
          </div>
          <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="proj-github-cta__btn">
            github.com/{CONTACT_INFO.githubHandle} <RiArrowRightLine />
          </a>
        </div>
      </section>

      {/* ── MODAL ── */}
      {selected && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal__close" onClick={closeModal}><RiCloseLine /></button>

            {/* Header */}
            <div className="modal__header">
              <div className="modal__ico" style={{ color: selected.color, borderColor: `${selected.color}44`, background: `${selected.color}16` }}>
                {PROJECT_ICONS[selected.icon]}
              </div>
              <div>
                <div className="modal__titlerow">
                  <h2 className="modal__title">{selected.title}</h2>
                  <span className="modal__status" style={{ color: selected.statusColor, borderColor: `${selected.statusColor}40`, background: `${selected.statusColor}12` }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: selected.statusColor, boxShadow: `0 0 6px ${selected.statusColor}`, display: "inline-block" }} />
                    {selected.status}
                  </span>
                </div>
                <p className="modal__badge">{selected.badge} · {selected.year}</p>
              </div>
            </div>

            <div className="modal__divider" />

            {/* Description */}
            <p className="modal__desc">{selected.desc}</p>

            {/* Features */}
            <div className="modal__section">
              <h4 className="modal__section-title">
                <RiStackLine /> {lang === "fr" ? "Fonctionnalités" : "Features"}
              </h4>
              <ul className="modal__features">
                {selected.features[lang].map((f, i) => (
                  <li key={i} className="modal__feature">
                    <span className="modal__feature-dot" style={{ background: selected.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="modal__section">
              <h4 className="modal__section-title">
                <RiCodeBoxLine /> Stack
              </h4>
              <div className="modal__tags">
                {selected.tags.map(tag => (
                  <span key={tag} className="modal__tag" style={{ borderColor: `${selected.color}44`, color: selected.color, background: `${selected.color}10` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="modal__actions">
              <a href={selected.github} target="_blank" rel="noreferrer" className="modal__btn modal__btn--fill">
                <RiGithubLine />
                {lang === "fr" ? "Voir sur GitHub" : "View on GitHub"}
              </a>
              {selected.live !== "#" && (
                <a href={selected.live} target="_blank" rel="noreferrer" className="modal__btn modal__btn--outline">
                  <RiExternalLinkLine />
                  {lang === "fr" ? "Demo live" : "Live demo"}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
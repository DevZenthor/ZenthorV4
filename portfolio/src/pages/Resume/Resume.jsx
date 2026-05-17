import { useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiDownloadLine,
  RiMapPinLine,
  RiMailLine,
  RiGithubLine,
  RiTwitterXLine,
  RiCodeBoxLine,
  RiToolsLine,
  RiTeamLine,
  RiBriefcaseLine,
  RiBookOpenLine,
  RiStarLine,
  RiCheckLine,
} from "react-icons/ri";
import {
  SiReact, SiJavascript, SiHtml5, SiNodedotjs,
  SiBootstrap, SiVite, SiPython, SiGit,
  SiMysql, SiDocker, SiJest,
} from "react-icons/si";
import { useLang, CONTACT_INFO } from "../../context/LangContext";
import "./Resume.css";

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */

const TECH = [
  { icon: <SiJavascript />, name: "JavaScript", color: "#F7DF1E" },
  { icon: <SiReact />,      name: "React",       color: "#61DAFB" },
  { icon: <SiHtml5 />,      name: "HTML",        color: "#E34F26" },
  { icon: <SiNodedotjs />,  name: "Node.js",     color: "#68A063" },
  { icon: <SiBootstrap />,  name: "Bootstrap",   color: "#7952B3" },
  { icon: <SiVite />,       name: "Vite",        color: "#A259FF" },
  { icon: <SiMysql />,      name: "SQL",         color: "#4479A1" },
  { icon: <SiPython />,     name: "Python",      color: "#3776AB" },
  { icon: <SiGit />,        name: "Git",         color: "#F05032" },
  { icon: <SiDocker />,     name: "Docker",      color: "#2496ED" },
  { icon: <SiJest />,       name: "Jest",        color: "#C21325" },
];

const PROJECTS = {
  fr: [
    { title: "ZoneControl",    badge: "Personnel",  tags: ["React","Vite","JS","SQL"],             desc: "Tracker de parties Fortnite — stats, classements et progression.",         link: "https://zonecontrol.vercel.app/" },
    { title: "Overlay 1P",     badge: "One Prodige",tags: ["HTML","JS","API","CSS"],              desc: "Overlay temps réel pour streams via WebSocket et APIs externes.",           link: null },
    { title: "Intranet 1P",    badge: "One Prodige",tags: ["React","Node.js","Bootstrap"],         desc: "Zone de travail personnelle : notes, tâches, agenda et dashboard.",          link: null },
    { title: "Ryze Portfolio",  badge: "Monteur",tags: ["React","Vite","Bootstrap"],           desc: "Portfolio vidéo pour monteur professionnel.",                               link: "https://ryzeprod.vercel.app/" },
    { title: "Nitsy Portfolio", badge: "Graphiste",tags: ["React","Vite","Bootstrap"],           desc: "Portfolio graphiste pour designer professionnel.",                           link: "https://nitsy-portfolio.vercel.app/" },
  ],
  en: [
    { title: "ZoneControl",    badge: "Personal",   tags: ["React","Vite","JS","SQL"],             desc: "Fortnite match tracker — stats, leaderboards and progression.",              link: "https://zonecontrol.vercel.app/" },
    { title: "Overlay 1P",     badge: "One Prodige",tags: ["HTML","JS","API","CSS"],              desc: "Real-time stream overlay via WebSocket and external APIs.",                  link: null },
    { title: "Intranet 1P",    badge: "One Prodige",tags: ["React","Node.js","Bootstrap"],         desc: "Personal workspace: notes, tasks, calendar and dashboard.",                  link: null },
    { title: "Ryze Portfolio",  badge: "Editor",tags: ["React","Vite","Bootstrap"],           desc: "Video portfolio for a professional editor.",                                 link: "https://ryzeprod.vercel.app/" },
    { title: "Nitsy Portfolio", badge: "Designer",tags: ["React","Vite","Bootstrap"],           desc: "Graphic design portfolio for a professional designer.",                      link: "https://nitsy-portfolio.vercel.app/" },
  ],
};

const SOFT = {
  fr: ["Travail en équipe", "Autonomie", "Gestion du temps", "Communication", "Résolution de problèmes", "Sens du détail"],
  en: ["Teamwork", "Autonomy", "Time management", "Communication", "Problem solving", "Attention to detail"],
};

const LEARNING = {
  fr: ["TypeScript", "NestJS", "GraphQL", "Unity", "Unreal Engine", "Python avancé"],
  en: ["TypeScript", "NestJS", "GraphQL", "Unity", "Unreal Engine", "Advanced Python"],
};

export default function Resume() {
  const { lang } = useLang();
  const projects = PROJECTS[lang];
  const softs    = SOFT[lang];
  const learning = LEARNING[lang];
  const cvRef    = useRef();

  const handlePrint = () => window.print();

  return (
    <div className="resume-page">
      <div className="resume-topbar no-print">
        <NavLink to="/" className="back-link">
          <RiArrowLeftLine /> {lang === "fr" ? "Accueil" : "Home"}
        </NavLink>
        <div className="resume-topbar__actions">
          <span className="resume-topbar__hint">
            {lang === "fr" ? "Aperçu de ton CV" : "Preview of your CV"}
          </span>
          <button className="resume-dl-btn" onClick={handlePrint}>
            <RiDownloadLine />
            {lang === "fr" ? "Télécharger PDF" : "Download PDF"}
          </button>
        </div>
      </div>
      <div className="cv-sheet" ref={cvRef}>
        <aside className="cv-sidebar">
          <div className="cv-avatar-wrap">
            <div className="cv-avatar">Z</div>
            <div className="cv-avatar-glow" />
          </div>
          <h1 className="cv-name">Zenthor</h1>
          <p className="cv-role">
            {lang === "fr" ? "Développeur Fullstack" : "Fullstack Developer"}
          </p>
          <div className="cv-sidebar-div" />
          <div className="cv-sidebar-section">
            <h3 className="cv-sidebar-title">Contact</h3>
            <ul className="cv-contact-list">
              <li>
                <RiMapPinLine />
                <span>Bruxelles, Belgique</span>
              </li>
              <li>
                <RiMailLine />
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </li>
              <li>
                <RiGithubLine />
                <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer">
                  github.com/{CONTACT_INFO.githubHandle}
                </a>
              </li>
              <li>
                <RiTwitterXLine />
                <a href={CONTACT_INFO.twitter} target="_blank" rel="noreferrer">
                  {CONTACT_INFO.twitterHandle}
                </a>
              </li>
            </ul>
          </div>
          <div className="cv-sidebar-div" />
          <div className="cv-sidebar-section">
            <h3 className="cv-sidebar-title">
              <RiCodeBoxLine /> {lang === "fr" ? "Stack technique" : "Tech stack"}
            </h3>
            <div className="cv-tech-pills">
              {TECH.map(t => (
                <span key={t.name} className="cv-tech-pill" style={{ borderColor: `${t.color}44`, color: t.color, background: `${t.color}10` }}>
                  <span className="cv-tech-ico" style={{ color: t.color }}>{t.icon}</span>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
          <div className="cv-sidebar-div" />
          <div className="cv-sidebar-section">
            <h3 className="cv-sidebar-title">
              <RiTeamLine /> Soft skills
            </h3>
            <ul className="cv-soft-list">
              {softs.map(s => (
                <li key={s}>
                  <RiCheckLine />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="cv-sidebar-div" />
          <div className="cv-sidebar-section">
            <h3 className="cv-sidebar-title">
              {lang === "fr" ? "Langues" : "Languages"}
            </h3>
            <ul className="cv-lang-list">
              <li>
                <span>{lang === "fr" ? "Français" : "French"}</span>
                <span className="cv-lang-level">{lang === "fr" ? "Natif" : "Native"}</span>
              </li>
              <li>
                <span>English</span>
                <span className="cv-lang-level">{lang === "fr" ? "Courant" : "Fluent"}</span>
              </li>
            </ul>
          </div>
        </aside>
        <main className="cv-main">
          <section className="cv-section">
            <h2 className="cv-section-title">
              <RiStarLine />
              {lang === "fr" ? "Profil" : "Profile"}
            </h2>
            <p className="cv-profile-text">
              {lang === "fr"
                ? "Développeur Fullstack passionné avec 1 an d'expérience dans la conception et le développement d'applications web modernes. Maîtrise de React, JavaScript, Node.js et Bootstrap. Rigoureux, autonome et orienté qualité — je construis des interfaces propres et des backends robustes. Actuellement en apprentissage de NestJS, GraphQL, Unity et Unreal Engine."
                : "Passionate Fullstack Developer with 1 year of experience designing and building modern web applications. Proficient in React, JavaScript, Node.js and Bootstrap. Rigorous, autonomous and quality-focused — I build clean interfaces and robust backends. Currently learning NestJS, GraphQL, Unity and Unreal Engine."}
            </p>
          </section>
          <div className="cv-main-div" />
          <section className="cv-section">
            <h2 className="cv-section-title">
              <RiBriefcaseLine />
              {lang === "fr" ? "Projets réalisés" : "Projects"}
            </h2>
            <div className="cv-timeline">
              {projects.map((p, i) => (
                <div key={i} className="cv-timeline-item">
                  <div className="cv-timeline-dot" />
                  <div className="cv-timeline-content">
                    <div className="cv-tl-header">
                      <div className="cv-tl-left">
                        <h3 className="cv-tl-title">{p.title}</h3>
                        {p.link && (
                          <a href={p.link} target="_blank" rel="noreferrer" className="cv-tl-link">↗</a>
                        )}
                      </div>
                      <div className="cv-tl-right">
                        <span className="cv-tl-badge">{p.badge}</span>
                        <span className="cv-tl-year">2024</span>
                      </div>
                    </div>
                    <p className="cv-tl-desc">{p.desc}</p>
                    <div className="cv-tl-tags">
                      {p.tags.map(tag => (
                        <span key={tag} className="cv-tl-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="cv-main-div" />
          <section className="cv-section">
            <h2 className="cv-section-title">
              <RiBookOpenLine />
              {lang === "fr" ? "Formation" : "Education"}
            </h2>
            <div className="cv-timeline">
              <div className="cv-timeline-item">
                <div className="cv-timeline-dot" />
                <div className="cv-timeline-content">
                  <div className="cv-tl-header">
                    <div className="cv-tl-left">
                      <h3 className="cv-tl-title">
                        {lang === "fr" ? "Auto-formation Développement Web" : "Self-taught Web Development"}
                      </h3>
                    </div>
                    <span className="cv-tl-year">2023 — {lang === "fr" ? "présent" : "present"}</span>
                  </div>
                  <p className="cv-tl-desc">
                    {lang === "fr"
                      ? "Apprentissage en autonomie via documentation officielle, projets personnels et plateformes (MDN, freeCodeCamp, YouTube). Spécialisation React, Node.js et développement Fullstack."
                      : "Self-directed learning via official documentation, personal projects and platforms (MDN, freeCodeCamp, YouTube). Specialization in React, Node.js and Fullstack development."}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="cv-main-div" />
          <section className="cv-section">
            <h2 className="cv-section-title">
              <RiToolsLine />
              {lang === "fr" ? "En apprentissage" : "Currently learning"}
            </h2>
            <div className="cv-learning-grid">
              {learning.map((item, i) => (
                <div key={i} className="cv-learning-item">
                  <span className="cv-learning-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
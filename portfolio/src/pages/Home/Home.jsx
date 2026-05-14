import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiArrowRightLine,
  RiDownloadLine,
  RiGithubLine,
  RiTwitterXLine,
  RiMailLine,
  RiCodeBoxLine,
  RiTerminalBoxLine,
  RiServerLine,
  RiTeamLine,
  RiExternalLinkLine,
  RiStarFill,
  RiMapPinLine,
  RiCalendarLine,
  RiShieldCheckLine,
  RiGamepadLine,
  RiLiveLine,
  RiBuildingLine,
} from "react-icons/ri";
import {
  SiReact, SiJavascript, SiHtml5, SiNodedotjs,
  SiMysql, SiGit, SiBootstrap, SiPython,
} from "react-icons/si";
import { useLang, CONTACT_INFO } from "../../context/LangContext";
import zenthorImg from "../../assets/zenthor.jpg";
import "./Home.css";

/* ── Projets ── */
const PROJECTS = {
  fr: [
    {
      id: 1,
      icon: "gamepad",
      badge: "Personnel",
      title: "ZoneControl",
      desc: "Application web pour manager et tracker ses parties Fortnite et autres jeux — stats, historique de matchs, classements personnels et suivi de progression.",
      tags: ["React", "Vite", "javascript", "SQL"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 8,
      wip: false,
      color: "#C060FF",
    },
    {
      id: 2,
      icon: "live",
      badge: "One Prodige",
      title: "Overlay 1P",
      desc: "Overlay en temps réel pour streams — consomme des APIs externes (stats jeux, météo, alertes) et affiche les données dynamiquement en superposition sur le stream.",
      tags: ["HTML", "JS", "API", "CSS"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 8.5,
      wip: false,
      color: "#61DAFB",
    },
    {
      id: 3,
      icon: "building",
      badge: "One Prodige",
      title: "Intranet 1P",
      desc: "Zone de travail personnelle tout-en-un : notes, tâches, agenda, liens rapides et tableau de bord — un espace centralisé pour organiser son workflow au quotidien.",
      tags: ["React", "Node.js", "Bootstrap", "LocalStorage"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 9,
      wip: false,
      color: "#fbff00",
    },
  ],
  en: [
    {
      id: 1,
      icon: "gamepad",
      badge: "Personal",
      title: "ZoneControl",
      desc: "Web app to manage and track Fortnite and other game sessions — match stats, history, personal leaderboards and progression tracking.",
      tags: ["React", "Vite", "javascript", "SQL"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 12,
      wip: false,
      color: "#C060FF",
    },
    {
      id: 2,
      icon: "live",
      badge: "One Prodige",
      title: "Overlay 1P",
      desc: "Real-time stream overlay — consumes external APIs (game stats, weather, alerts) and displays live data dynamically over the stream.",
     tags: ["HTML", "JS", "API", "CSS"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 7,
      wip: false,
      color: "#61DAFB",
    },
    {
      id: 3,
      icon: "building",
      badge: "One Prodige",
      title: "Intranet 1P",
      desc: "All-in-one personal workspace: notes, tasks, calendar, quick links and dashboard — a centralized space to organize your daily workflow.",
      tags: ["React", "Node.js", "Bootstrap", "LocalStorage"],
      github: "https://github.com/DevZenthor",
      live: "#",
      stars: 5,
      wip: false,
      color: "#fbff00",
    },
  ],
};

/* Map icon key → react-icons component */
const PROJECT_ICONS = {
  gamepad:  <RiGamepadLine />,
  live:     <RiLiveLine />,
  building: <RiBuildingLine />,
};

const SKILLS = [
  { icon:<SiReact />,      name:"React",       pct:85, color:"#61DAFB" },
  { icon:<SiJavascript />, name:"JavaScript",  pct:88, color:"#F7DF1E" },
  { icon:<SiHtml5 />,      name:"HTML / CSS",  pct:92, color:"#E34F26" },
  { icon:<SiNodedotjs />,  name:"Node.js",     pct:72, color:"#68A063" },
  { icon:<SiMysql />,      name:"SQL",         pct:65, color:"#4479A1" },
  { icon:<SiGit />,        name:"Git",         pct:80, color:"#F05032" },
  { icon:<SiBootstrap />,  name:"Bootstrap",   pct:87, color:"#7952B3" },
  { icon:<SiPython />,     name:"Python",      pct:45, color:"#3776AB" },
];

const SOCIAL = [
  { icon:<RiGithubLine />,   href: CONTACT_INFO.github,               label:"GitHub" },
  { icon:<RiTwitterXLine />, href: CONTACT_INFO.twitter,              label:"X / Twitter" },
  { icon:<RiMailLine />,     href: `mailto:${CONTACT_INFO.email}`,    label:"Email" },
];

const MARQUEE = ["React","Vite","Node.js","TypeScript","Bootstrap",
  "PostgreSQL","Docker","Git","Scrum","Management","CI/CD","REST API"];

/* ── Counter animé ── */
function Counter({ to, suffix="" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let cur = 0;
      const tick = () => {
        cur += Math.max(1, Math.ceil((to - cur) / 18));
        if (cur >= to) { setVal(to); return; }
        setVal(cur);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ══════════════════════════════════════
   HOME
══════════════════════════════════════ */
export default function Home() {
  const { lang, t } = useLang();
  const projects = PROJECTS[lang];

  return (
    <div className="home">

      {/* ══ HERO ══ */}
      <section className="hero">

        {/* LEFT */}
        <div className="hero__left">

          <div className="hero__badge">
            <span className="hero__badge-dot" />
            {t.hero.badge}
          </div>

          <h1 className="hero__title">
            <span className="hero__t-small">{t.hero.title1}</span>
            <span className="hero__t-name">Zenthor</span>
            <span className="hero__t-role">
              {t.hero.title2}&nbsp;
              <span className="hero__t-accent">{t.hero.title3}</span>
            </span>
          </h1>

          <p className="hero__sub">{t.hero.sub}</p>

          <div className="hero__meta">
            <span className="hero__meta-item"><RiMapPinLine /> Bruxelles, BE</span>
            <span className="hero__meta-item">
              <RiCalendarLine />
              {lang === "fr" ? "Disponible maintenant" : "Available now"}
            </span>
            <span className="hero__meta-item">
              <RiShieldCheckLine />
              {lang === "fr" ? "1 an d'XP" : "1 yr XP"}
            </span>
          </div>

          <div className="hero__btns">
            <NavLink to="/projects" className="hero__btn hero__btn--fill">
              <RiCodeBoxLine />
              {t.hero.btnProjects}
              <RiArrowRightLine className="hero__btn-arrow" />
            </NavLink>
            <a href={`mailto:${CONTACT_INFO.email}`} className="hero__btn hero__btn--outline">
              <RiDownloadLine />
              {t.hero.btnCV}
            </a>
          </div>

          <div className="hero__socials">
            {SOCIAL.map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="hero__social" aria-label={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="hero__right">
          <div className="hero__photo-wrap">

            {/* Glow blob */}
            <div className="hero__glow" />

            {/* Anneaux orbitaux */}
            <div className="hero__ring hero__ring--1" />
            <div className="hero__ring hero__ring--2" />

            {/* Particules coins */}
            <span className="hero__spark hero__spark--tl" />
            <span className="hero__spark hero__spark--tr" />
            <span className="hero__spark hero__spark--bl" />
            <span className="hero__spark hero__spark--br" />

            {/* Cadre hexagonal */}
            <div className="hero__frame">
              <img src={zenthorImg} alt="Zenthor" className="hero__photo" />
              <div className="hero__frame-border" />
            </div>

            {/* Badges flottants */}
            <div className="hero__float hero__float--tl">
              <RiTerminalBoxLine />
              <span>Fullstack</span>
            </div>
            <div className="hero__float hero__float--br">
              <RiTeamLine />
              <span>Manager</span>
            </div>
            <div className="hero__float hero__float--tr">
              <RiServerLine />
              <span>DevOps</span>
            </div>
            <div className="hero__float hero__float--bl">
              <span className="hero__float-dot" />
              Open to work
            </div>
          </div>
        </div>

      </section>

      {/* ══ MARQUEE ══ */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <section className="stats">
        {[
          { num:8,  s:"+", label: lang==="fr" ? "Projets livrés"    : "Projects shipped" },
          { num:5,  s:"+", label: lang==="fr" ? "Clients satisfaits": "Happy clients"    },
          { num:1,  s:" an", label: lang==="fr" ? "d'expérience"    : "year of XP"       },
          { num:3,  s:"+", label: lang==="fr" ? "Technos maîtrisées": "Tech stacks"      },
        ].map(({ num, s, label }) => (
          <div key={label} className="stat">
            <div className="stat__num"><Counter to={num} suffix={s} /></div>
            <div className="stat__label">{label}</div>
          </div>
        ))}
      </section>

      {/* ══ PROJETS ══ */}
      <section className="section">
        <div className="sec-head">
          <div>
            <p className="eyebrow">{lang==="fr" ? "Réalisations" : "Work"}</p>
            <h2 className="sec-title">{lang==="fr" ? "Projets récents" : "Recent projects"}</h2>
          </div>
          <NavLink to="/projects" className="link-more">
            {lang==="fr" ? "Tous les projets" : "All projects"} <RiArrowRightLine />
          </NavLink>
        </div>
        <div className="proj-grid">
          {projects.map(p => (
            <div key={p.id} className="proj-card">
              <div className="proj-card__shine" />
              {/* Top bar */}
              <div className="proj-card__top">
                <div className="proj-card__left">
                  <span className="proj-card__ico" style={{ color: p.color, borderColor: `${p.color}33`, background: `${p.color}14` }}>
                    {PROJECT_ICONS[p.icon]}
                  </span>
                  <span className="proj-card__badge">{p.badge}</span>
                </div>
                <div className="proj-card__links">
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-card__link" aria-label="GitHub">
                    <RiGithubLine />
                  </a>
                  {p.live !== "#" && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="proj-card__link" aria-label="Live">
                      <RiExternalLinkLine />
                    </a>
                  )}
                </div>
              </div>
              {/* Title + WIP */}
              <div className="proj-card__title-row">
                <h3 className="proj-card__title">{p.title}</h3>
                {p.wip && (
                  <span className="proj-card__wip">
                    {lang === "fr" ? "En cours" : "WIP"}
                  </span>
                )}
              </div>
              <p className="proj-card__desc">{p.desc}</p>
              <div className="proj-card__footer">
                <div className="proj-card__tags">
                  {p.tags.map(tag => <span key={tag} className="proj-card__tag">{tag}</span>)}
                </div>
                <span className="proj-card__stars">
                  <RiStarFill style={{ color: "#FAB432" }} /> {p.stars}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section className="section" style={{paddingTop:0}}>
        <div className="sec-head">
          <div>
            <p className="eyebrow">{lang==="fr" ? "Expertise" : "Skills"}</p>
            <h2 className="sec-title">{lang==="fr" ? "Stack technique" : "Tech stack"}</h2>
          </div>
          <NavLink to="/skills" className="link-more">
            {lang==="fr" ? "Tout voir" : "See all"} <RiArrowRightLine />
          </NavLink>
        </div>
        <div className="skills-grid">
          {SKILLS.map(({ icon, name, pct, color }) => (
            <div key={name} className="sk-card">
              <div className="sk-card__icon" style={{ color }}>{icon}</div>
              <div className="sk-card__body">
                <div className="sk-card__header">
                  <span className="sk-card__name">{name}</span>
                  <span className="sk-card__pct">{pct}%</span>
                </div>
                <div className="sk-card__bar">
                  <div
                    className="sk-card__fill"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, #6B10CC, ${color})`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="cta-band">
        <div className="cta-band__glow" />
        <div className="cta-band__content">
          <p className="cta-band__eyebrow">
            {lang==="fr" ? "Parlons de votre projet" : "Let's build something"}
          </p>
          <h2 className="cta-band__title">
            {lang==="fr"
              ? <>Prêt à collaborer ?<br/><span>Je réponds en &lt; 24h.</span></>
              : <>Ready to collaborate?<br/><span>I reply within 24h.</span></>
            }
          </h2>
        </div>
        <NavLink to="/contact" className="hero__btn hero__btn--fill cta-band__btn">
          <RiMailLine />
          {lang==="fr" ? "Me contacter" : "Get in touch"}
          <RiArrowRightLine className="hero__btn-arrow" />
        </NavLink>
      </section>

    </div>
  );
}
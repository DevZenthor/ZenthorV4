import { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCodeBoxLine,
  RiPaletteLine,
  RiToolsLine,
  RiTeamLine,
  RiLightbulbLine,
  RiTimeLine,
  RiCommunityLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import {
  SiReact,
  SiVite,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiPython,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiMysql,
  SiDocker,
} from "react-icons/si";
import { useLang } from "../../context/LangContext";
import "./Skills.css";

const CssIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.548-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
  </svg>
);

const TECH_SKILLS = [
  { icon: <SiJavascript />, name: "JavaScript", pct: 88, color: "#F7DF1E", level: { fr: "Avancé",        en: "Advanced"     } },
  { icon: <SiReact />,      name: "React",       pct: 85, color: "#61DAFB", level: { fr: "Avancé",        en: "Advanced"     } },
  { icon: <SiHtml5 />,      name: "HTML",        pct: 92, color: "#E34F26", level: { fr: "Expert",        en: "Expert"       } },
  { icon: <CssIcon />,      name: "CSS",         pct: 88, color: "#264DE4", level: { fr: "Avancé",        en: "Advanced"     } },
  { icon: <SiNodedotjs />,  name: "Node.js",     pct: 72, color: "#68A063", level: { fr: "Intermédiaire", en: "Intermediate" } },
  { icon: <SiBootstrap />,  name: "Bootstrap",   pct: 87, color: "#7952B3", level: { fr: "Avancé",        en: "Advanced"     } },
  { icon: <SiVite />,       name: "Vite",        pct: 82, color: "#A259FF", level: { fr: "Avancé",        en: "Advanced"     } },
  { icon: <SiMysql />,      name: "SQL",         pct: 65, color: "#4479A1", level: { fr: "Intermédiaire", en: "Intermediate" } },
  { icon: <SiPython />,     name: "Python",      pct: 45, color: "#3776AB", level: { fr: "Débutant",      en: "Beginner"     } },
];

const TOOL_SKILLS = [
  { icon: <SiGit />,             name: "Git",     pct: 80, color: "#F05032" },
  { icon: <SiGithub />,          name: "GitHub",  pct: 82, color: "#ffffff" },
  { icon: <SiDocker />,          name: "Docker",  pct: 50, color: "#2496ED" },
];

const SOFT_SKILLS = {
  fr: [
    { icon: <RiTeamLine />,           label: "Travail en équipe",       desc: "Communication fluide, collaboration active et adaptabilité dans des contextes variés." },
    { icon: <RiLightbulbLine />,      label: "Résolution de problèmes", desc: "Approche analytique et créative pour décomposer et résoudre des défis techniques complexes." },
    { icon: <RiTimeLine />,           label: "Gestion du temps",        desc: "Organisation rigoureuse, respect des deadlines et capacité à prioriser efficacement." },
    { icon: <RiCommunityLine />,      label: "Communication",           desc: "À l'aise à l'écrit comme à l'oral, capacité à vulgariser des sujets techniques." },
    { icon: <RiCheckboxCircleLine />, label: "Autonomie",               desc: "Capacité à prendre des initiatives et à mener des projets de bout en bout en solo." },
    { icon: <RiPaletteLine />,        label: "Sens du détail",          desc: "Souci constant de la qualité du code et du rendu visuel, rien n'est laissé au hasard." },
  ],
  en: [
    { icon: <RiTeamLine />,           label: "Teamwork",            desc: "Smooth communication, active collaboration and adaptability in various contexts." },
    { icon: <RiLightbulbLine />,      label: "Problem solving",     desc: "Analytical and creative approach to break down and solve complex technical challenges." },
    { icon: <RiTimeLine />,           label: "Time management",     desc: "Rigorous organisation, meeting deadlines and ability to prioritize effectively." },
    { icon: <RiCommunityLine />,      label: "Communication",       desc: "Comfortable in writing and speaking, able to explain technical topics simply." },
    { icon: <RiCheckboxCircleLine />, label: "Autonomy",            desc: "Able to take initiative and lead projects from start to finish independently." },
    { icon: <RiPaletteLine />,        label: "Attention to detail", desc: "Constant focus on code quality and visual output — nothing is left to chance." },
  ],
};

const LEARNING = ["TypeScript", "Next.js", "GraphQL", "Unity", "Unreal", "Python"];


function AnimatedBar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setWidth(pct), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, delay]);

  return (
    <div className="sk-bar" ref={ref}>
      <div
        className="sk-bar__fill"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, #6B10CC, ${color})`,
          transition: `width 1.2s cubic-bezier(.4,0,.2,1) ${delay}ms`,
        }}
      />
    </div>
  );
}

export default function Skills() {
  const { lang } = useLang();
  const softs    = SOFT_SKILLS[lang];

  return (
    <div className="skills-page">
      <section className="sk-header">
        <div className="sk-header__back">
          <NavLink to="/" className="back-link">
            <RiArrowLeftLine /> {lang === "fr" ? "Accueil" : "Home"}
          </NavLink>
        </div>
        <div className="sk-header__content">
          <p className="eyebrow">{lang === "fr" ? "Mon expertise" : "My expertise"}</p>
          <h1 className="sk-header__title">
            {lang === "fr" ? <>Mes <span>compétences</span></> : <>My <span>skills</span></>}
          </h1>
          <p className="sk-header__sub">
            {lang === "fr"
              ? "1 an d'expérience à construire des apps modernes avec des technos actuelles."
              : "1 year of experience building modern apps with current technologies."}
          </p>
        </div>

        <div className="sk-header__stats">
          <div className="sk-qstat">
            <span className="sk-qstat__num">{TECH_SKILLS.length + TOOL_SKILLS.length}</span>
            <span className="sk-qstat__label">{lang === "fr" ? "Technos" : "Technologies"}</span>
          </div>
          <div className="sk-qstat__sep" />
          <div className="sk-qstat">
            <span className="sk-qstat__num">{softs.length}</span>
            <span className="sk-qstat__label">Soft skills</span>
          </div>
          <div className="sk-qstat__sep" />
          <div className="sk-qstat">
            <span className="sk-qstat__num">1</span>
            <span className="sk-qstat__label">{lang === "fr" ? "An d'XP" : "Year XP"}</span>
          </div>
        </div>
      </section>
      <section className="sk-section">
        <div className="sk-section__head">
          <div className="sk-section__icon"><RiCodeBoxLine /></div>
          <div>
            <p className="eyebrow">{lang === "fr" ? "Développement" : "Development"}</p>
            <h2 className="sk-section__title">
              {lang === "fr" ? "Langages & Frameworks" : "Languages & Frameworks"}
            </h2>
          </div>
        </div>
        <div className="tech-grid">
          {TECH_SKILLS.map((sk, i) => (
            <div key={sk.name} className="tech-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="tech-card__top">
                <div className="tech-card__ico" style={{ color: sk.color }}>{sk.icon}</div>
                <div className="tech-card__info">
                  <div className="tech-card__row">
                    <span className="tech-card__name">{sk.name}</span>
                    <span className="tech-card__pct">{sk.pct}%</span>
                  </div>
                  <span className="tech-card__level" style={{ color: sk.color }}>{sk.level[lang]}</span>
                </div>
              </div>
              <AnimatedBar pct={sk.pct} color={sk.color} delay={i * 60} />
            </div>
          ))}
        </div>
      </section>
      <section className="sk-section sk-section--alt">
        <div className="sk-section__head">
          <div className="sk-section__icon"><RiToolsLine /></div>
          <div>
            <p className="eyebrow">{lang === "fr" ? "Environnement" : "Environment"}</p>
            <h2 className="sk-section__title">
              {lang === "fr" ? "Outils & logiciels" : "Tools & software"}
            </h2>
          </div>
        </div>

        <div className="tools-grid">
          {TOOL_SKILLS.map((sk, i) => (
            <div key={sk.name} className="tool-card" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="tool-card__ico" style={{ color: sk.color }}>{sk.icon}</div>
              <div className="tool-card__body">
                <div className="tool-card__row">
                  <span className="tool-card__name">{sk.name}</span>
                  <span className="tool-card__pct">{sk.pct}%</span>
                </div>
                <AnimatedBar pct={sk.pct} color={sk.color} delay={i * 70 + 200} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="sk-section">
        <div className="sk-section__head">
          <div className="sk-section__icon"><RiTeamLine /></div>
          <div>
            <p className="eyebrow">{lang === "fr" ? "Humain" : "Human"}</p>
            <h2 className="sk-section__title">Soft skills</h2>
          </div>
        </div>
        <div className="soft-grid">
          {softs.map((s, i) => (
            <div key={i} className="soft-card" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="soft-card__icon">{s.icon}</div>
              <h3 className="soft-card__label">{s.label}</h3>
              <p className="soft-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="sk-section sk-section--alt">
        <div className="sk-section__head">
          <div className="sk-section__icon"><RiLightbulbLine /></div>
          <div>
            <p className="eyebrow">{lang === "fr" ? "En cours" : "Learning"}</p>
            <h2 className="sk-section__title">
              {lang === "fr" ? "En apprentissage" : "Currently learning"}
            </h2>
          </div>
        </div>
        <div className="learning-list">
          {LEARNING.map((item, i) => (
            <div key={i} className="learning-item" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="learning-item__dot" />
              <span className="learning-item__name">{item}</span>
              <span className="learning-item__badge">
                {lang === "fr" ? "🚀 En cours" : "🚀 In progress"}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="sk-cta">
        <div className="sk-cta__glow" />
        <div className="sk-cta__content">
          <p className="sk-cta__eyebrow">
            {lang === "fr" ? "Travaillons ensemble" : "Let's work together"}
          </p>
          <h2 className="sk-cta__title">
            {lang === "fr"
              ? <>Envie de me voir <span>coder</span> ?</>
              : <>Want to see me <span>code</span>?</>}
          </h2>
          <p className="sk-cta__sub">
            {lang === "fr"
              ? "Découvre mes projets ou contacte-moi directement."
              : "Check out my projects or reach out directly."}
          </p>
          <div className="sk-cta__btns">
            <NavLink to="/projects" className="sk-btn sk-btn--fill">
              <RiCodeBoxLine />
              {lang === "fr" ? "Voir mes projets" : "View my projects"}
              <RiArrowRightLine className="sk-btn__arrow" />
            </NavLink>
            <NavLink to="/contact" className="sk-btn sk-btn--outline">
              {lang === "fr" ? "Me contacter" : "Contact me"}
              <RiArrowRightLine className="sk-btn__arrow" />
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
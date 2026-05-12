import { NavLink } from "react-router-dom";
import {
  RiGithubLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiMailLine,
  RiMapPinLine,
  RiCodeBoxLine,
  RiHeart2Fill,
  RiArrowUpLine,
  RiHome4Line,
  RiToolsLine,
  RiFileTextLine,
} from "react-icons/ri";
import { useLang } from "../../context/LangContext";
import "./Footer.css";

const SOCIAL = [
  { icon: <RiGithubLine />,       href: "https://github.com",    label: "GitHub" },
  { icon: <RiLinkedinBoxLine />,  href: "https://linkedin.com",  label: "LinkedIn" },
  { icon: <RiTwitterXLine />,     href: "https://x.com",         label: "X / Twitter" },
  { icon: <RiMailLine />,         href: "mailto:hello@devmgr.be",label: "Email" },
];

const QUICK_LINKS = [
  { key: "home",     path: "/",         icon: <RiHome4Line /> },
  { key: "projects", path: "/projects", icon: <RiCodeBoxLine /> },
  { key: "skills",   path: "/skills",   icon: <RiToolsLine /> },
  { key: "resume",   path: "/resume",   icon: <RiFileTextLine /> },
  { key: "contact",  path: "/contact",  icon: <RiMailLine /> },
];

export default function Footer() {
  const { lang, t, toggle } = useLang();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">

      {/* ── BANDE SUPÉRIEURE ── */}
      <div className="footer__top">

        {/* Colonne 1 — Brand */}
        <div className="footer__col footer__col--brand">
          <NavLink to="/" className="footer__logo">
            dev<em>.</em>mgr
          </NavLink>
          <p className="footer__tagline">{t.footer.tagline}</p>

          <div className="footer__location">
            <RiMapPinLine />
            <span>{t.footer.location}</span>
          </div>

          <div className="footer__available">
            <span className="footer__avail-dot" />
            {t.footer.available}
          </div>

          {/* Social */}
          <div className="footer__social">
            {SOCIAL.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label={label}
                title={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Colonne 2 — Liens rapides */}
        <div className="footer__col">
          <h4 className="footer__col-title">{t.footer.links}</h4>
          <ul className="footer__nav">
            {QUICK_LINKS.map(({ key, path, icon }) => (
              <li key={key}>
                <NavLink to={path} end={path === "/"} className="footer__nav-link">
                  <span className="footer__nav-icon">{icon}</span>
                  {t.nav[key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 — Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">{t.footer.contact}</h4>
          <ul className="footer__contact-list">
            <li>
              <a href="mailto:hello@devmgr.be" className="footer__contact-link">
                <RiMailLine />
                hello@devmgr.be
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__contact-link">
                <RiLinkedinBoxLine />
                /in/devmgr
              </a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__contact-link">
                <RiGithubLine />
                github.com/devmgr
              </a>
            </li>
          </ul>

          {/* Lang switcher dans le footer aussi */}
          <div className="footer__lang">
            <button
              className={`footer__lang-btn ${lang === "fr" ? "active" : ""}`}
              onClick={() => lang !== "fr" && toggle()}
            >
              🇫🇷 FR
            </button>
            <div className="footer__lang-sep" />
            <button
              className={`footer__lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => lang !== "en" && toggle()}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>

      </div>

      {/* ── LIGNE DE SÉPARATION ── */}
      <div className="footer__divider" />

      {/* ── BANDE INFÉRIEURE ── */}
      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} dev.mgr —{" "}
          {t.footer.rights}
        </p>

        <p className="footer__made">
          {t.footer.madeWith}{" "}
          <RiHeart2Fill className="footer__heart" />{" "}
          &amp; <RiCodeBoxLine className="footer__code-ico" /> React
        </p>

        <button className="footer__scroll-top" onClick={scrollTop} aria-label="Retour en haut">
          <RiArrowUpLine />
        </button>
      </div>

    </footer>
  );
}
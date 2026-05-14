import { NavLink } from "react-router-dom";
import {
  RiGithubLine,
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
import { CONTACT_INFO } from "../../context/LangContext";
import "./Footer.css";

const SOCIAL = [
  { icon: <RiGithubLine />,   href: CONTACT_INFO.github,  label: "GitHub" },
  { icon: <RiTwitterXLine />, href: CONTACT_INFO.twitter, label: "X / Twitter" },
  { icon: <RiMailLine />,     href: `mailto:${CONTACT_INFO.email}`, label: "Email" },
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
            Zenthor<em>.</em>dev
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
                target={href.startsWith("mailto") ? undefined : "_blank"}
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
              <a href={`mailto:${CONTACT_INFO.email}`} className="footer__contact-link">
                <RiMailLine />
                {CONTACT_INFO.email}
              </a>
            </li>
            <li>
              <a href={CONTACT_INFO.twitter} target="_blank" rel="noreferrer" className="footer__contact-link">
                <RiTwitterXLine />
                {CONTACT_INFO.twitterHandle}
              </a>
            </li>
            <li>
              <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="footer__contact-link">
                <RiGithubLine />
                github.com/{CONTACT_INFO.githubHandle}
              </a>
            </li>
          </ul>

          {/* Lang switcher */}
          <div className="footer__lang">
            <button
              className={`footer__lang-btn ${lang === "fr" ? "active" : ""}`}
              onClick={() => lang !== "fr" && toggle()}
            >
              🇫🇷 FR
            </button>
            <button
              className={`footer__lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => lang !== "en" && toggle()}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>

      </div>

      {/* ── SÉPARATION ── */}
      <div className="footer__divider" />

      {/* ── BANDE INFÉRIEURE ── */}
      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} Zenthor —{" "}
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
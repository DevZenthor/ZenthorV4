import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  RiHome4Line,
  RiCodeBoxLine,
  RiToolsLine,
  RiFileTextLine,
  RiMailLine,
  RiMenuLine,
  RiCloseLine,
  RiTranslate2,
} from "react-icons/ri";
import { useLang } from "../../context/LangContext";
import "./Navbar.css";

/* Liens de nav avec icône + clé de traduction */
const NAV_ITEMS = [
  { key: "home",     path: "/",         icon: <RiHome4Line /> },
  { key: "projects", path: "/projects", icon: <RiCodeBoxLine /> },
  { key: "skills",   path: "/skills",   icon: <RiToolsLine /> },
  { key: "resume",   path: "/resume",   icon: <RiFileTextLine /> },
  { key: "contact",  path: "/contact",  icon: <RiMailLine /> },
];

export default function Navbar() {
  const { lang, t, toggle } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  /* Scroll detection → fond plus opaque */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Ferme le menu mobile en cas de resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Lock scroll quand menu ouvert */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

        {/* ── LOGO ── */}
        <NavLink to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          Zenthor<em>.</em>dev
        </NavLink>

        {/* ── LIENS DESKTOP ── */}
        <ul className="navbar__links">
          {NAV_ITEMS.map(({ key, path, icon }) => (
            <li key={key}>
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                <span className="navbar__link-icon">{icon}</span>
                {t.nav[key]}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── DROITE : switcher langue + CTA ── */}
        <div className="navbar__right">

          {/* Lang switcher */}
          <button
            className="lang-switcher"
            onClick={toggle}
            aria-label="Changer de langue"
            title={lang === "fr" ? "Switch to English" : "Passer en français"}
          >
            <RiTranslate2 className="lang-switcher__icon" />
            <span className="lang-switcher__track">
              <span className={`lang-switcher__pill ${lang === "fr" ? "left" : "right"}`} />
              <span className={`lang-switcher__opt ${lang === "fr" ? "active" : ""}`}>FR</span>
              <span className={`lang-switcher__opt ${lang === "en" ? "active" : ""}`}>EN</span>
            </span>
          </button>

          <NavLink to="/contact" className="navbar__cta">
            {t.nav.cta}
          </NavLink>

          {/* Burger mobile */}
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
      </nav>

      {/* ── MENU MOBILE ── */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <ul className="mobile-menu__links">
          {NAV_ITEMS.map(({ key, path, icon }) => (
            <li key={key}>
              <NavLink
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-menu__icon">{icon}</span>
                {t.nav[key]}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mobile-menu__bottom">
          <button className="lang-switcher lang-switcher--large" onClick={toggle}>
            <RiTranslate2 className="lang-switcher__icon" />
            <span className="lang-switcher__track">
              <span className={`lang-switcher__pill ${lang === "fr" ? "left" : "right"}`} />
              <span className={`lang-switcher__opt ${lang === "fr" ? "active" : ""}`}>FR</span>
              <span className={`lang-switcher__opt ${lang === "en" ? "active" : ""}`}>EN</span>
            </span>
          </button>
          <NavLink to="/contact" className="navbar__cta" onClick={() => setMenuOpen(false)}>
            {t.nav.cta}
          </NavLink>
        </div>
      </div>

      {/* Overlay backdrop mobile */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiMailLine,
  RiTwitterXLine,
  RiGithubLine,
  RiSendPlaneLine,
  RiCheckboxCircleLine,
  RiMapPinLine,
  RiTimeLine,
  RiUserLine,
  RiChatSmile2Line,
  RiAlertLine,
} from "react-icons/ri";
import { useLang, CONTACT_INFO } from "../../context/LangContext";
import "./Contact.css";


const FORMSPREE_ID = "mykoqwnl";

const SOCIALS = [
  {
    icon:   <RiGithubLine />,
    label:  "GitHub",
    handle: `github.com/${CONTACT_INFO.githubHandle}`,
    href:   CONTACT_INFO.github,
    color:  "#ffffff",
    desc:   { fr: "Voir mes projets & repos", en: "Browse my projects & repos" },
  },
  {
    icon:   <RiTwitterXLine />,
    label:  "X / Twitter",
    handle: CONTACT_INFO.twitterHandle,
    href:   CONTACT_INFO.twitter,
    color:  "#1DA1F2",
    desc:   { fr: "Suivre mon actualité", en: "Follow my updates" },
  },
  {
    icon:   <RiMailLine />,
    label:  "Email",
    handle: CONTACT_INFO.email,
    href:   `mailto:${CONTACT_INFO.email}`,
    color:  "#C060FF",
    desc:   { fr: "Réponse en moins de 24h", en: "Reply within 24h" },
  },
];

const INFO_ITEMS = {
  fr: [
    { icon: <RiMapPinLine />, label: "Localisation", value: "Bruxelles, Belgique" },
    { icon: <RiTimeLine />,   label: "Disponibilité", value: "Disponible dès maintenant" },
    { icon: <RiMailLine />,   label: "Email",         value: CONTACT_INFO.email },
  ],
  en: [
    { icon: <RiMapPinLine />, label: "Location",     value: "Brussels, Belgium" },
    { icon: <RiTimeLine />,   label: "Availability", value: "Available right now" },
    { icon: <RiMailLine />,   label: "Email",        value: CONTACT_INFO.email },
  ],
};

export default function Contact() {
  const { lang } = useLang();
  const info = INFO_ITEMS[lang];

  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); 
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = lang === "fr" ? "Champ requis" : "Required field";
    if (!form.email.trim())   e.email   = lang === "fr" ? "Champ requis" : "Required field";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = lang === "fr" ? "Email invalide" : "Invalid email";
    if (!form.message.trim()) e.message = lang === "fr" ? "Champ requis" : "Required field";
    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      });
      if (res.ok) setStatus("sent");
      else        setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div className="contact-page">

      {/* ── HEADER ── */}
      <section className="ct-header">
        <NavLink to="/" className="back-link">
          <RiArrowLeftLine /> {lang === "fr" ? "Accueil" : "Home"}
        </NavLink>
        <div className="ct-header__content">
          <p className="ct-eyebrow">{lang === "fr" ? "Restons en contact" : "Get in touch"}</p>
          <h1 className="ct-header__title">
            {lang === "fr"
              ? <>Parlons de votre <span>projet</span></>
              : <>Let's talk about your <span>project</span></>}
          </h1>
          <p className="ct-header__sub">
            {lang === "fr"
              ? "Une idée, une mission, une collaboration ? Je lis tous les messages et réponds toujours en moins de 24h."
              : "An idea, a mission, a collaboration? I read every message and always reply within 24h."}
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="ct-body">

        {/* ── ASIDE ── */}
        <aside className="ct-aside">
          <div className="ct-info-card">
            <p className="ct-card-title">{lang === "fr" ? "Informations" : "Information"}</p>
            <ul className="ct-info-list">
              {info.map((item, i) => (
                <li key={i} className="ct-info-item">
                  <span className="ct-info-ico">{item.icon}</span>
                  <div>
                    <span className="ct-info-lbl">{item.label}</span>
                    <span className="ct-info-val">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="ct-socials-wrap">
            <p className="ct-card-title">{lang === "fr" ? "Retrouve-moi sur" : "Find me on"}</p>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="ct-soc-card"
              >
                <div className="ct-soc-ico" style={{ color: s.color, borderColor: `${s.color}33`, background: `${s.color}10` }}>
                  {s.icon}
                </div>
                <div className="ct-soc-body">
                  <span className="ct-soc-name">{s.label}</span>
                  <span className="ct-soc-handle" style={{ color: s.color }}>{s.handle}</span>
                  <span className="ct-soc-desc">{s.desc[lang]}</span>
                </div>
                <span className="ct-soc-arrow">→</span>
              </a>
            ))}
          </div>
        </aside>

        {/* ── FORM CARD ── */}
        <div className="ct-form-card">

          {status === "sent" && (
            <div className="ct-success">
              <div className="ct-success__ico"><RiCheckboxCircleLine /></div>
              <h2 className="ct-success__title">
                {lang === "fr" ? "Message envoyé !" : "Message sent!"}
              </h2>
              <p className="ct-success__sub">
                {lang === "fr"
                  ? "Merci ! Je te réponds en moins de 24h."
                  : "Thanks! I'll get back to you within 24h."}
              </p>
              <button className="ct-success__btn" onClick={reset}>
                {lang === "fr" ? "Envoyer un autre message" : "Send another message"}
              </button>
            </div>
          )}

          {status !== "sent" && (
            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <h2 className="ct-form__title">
                {lang === "fr" ? "Envoie-moi un message" : "Send me a message"}
              </h2>
              <p className="ct-form__hint">
                {lang === "fr" ? "Les champs * sont obligatoires." : "Fields marked * are required."}
              </p>

              {status === "error" && (
                <div className="ct-error-banner">
                  <RiAlertLine />
                  {lang === "fr"
                    ? "Une erreur est survenue. Réessaie ou contacte-moi directement."
                    : "Something went wrong. Retry or contact me directly."}
                </div>
              )}

              {/* Nom */}
              <div className={`ct-field ${errors.name ? "ct-field--err" : ""}`}>
                <label className="ct-lbl">
                  <RiUserLine /> {lang === "fr" ? "Nom *" : "Name *"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={lang === "fr" ? "Votre nom" : "Your name"}
                  className="ct-input"
                  autoComplete="name"
                />
                {errors.name && <span className="ct-err-msg">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className={`ct-field ${errors.email ? "ct-field--err" : ""}`}>
                <label className="ct-lbl">
                  <RiMailLine /> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={lang === "fr" ? "votre@email.com" : "your@email.com"}
                  className="ct-input"
                  autoComplete="email"
                />
                {errors.email && <span className="ct-err-msg">{errors.email}</span>}
              </div>

              {/* Sujet */}
              <div className="ct-field">
                <label className="ct-lbl">
                  <RiChatSmile2Line /> {lang === "fr" ? "Sujet" : "Subject"}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={lang === "fr" ? "À propos de votre projet..." : "About your project..."}
                  className="ct-input"
                />
              </div>

              {/* Message */}
              <div className={`ct-field ${errors.message ? "ct-field--err" : ""}`}>
                <label className="ct-lbl">
                  <RiSendPlaneLine /> Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={lang === "fr"
                    ? "Décris ton projet, ta demande ou juste dis bonjour..."
                    : "Describe your project, your request or just say hi..."}
                  className="ct-input ct-textarea"
                  rows={6}
                />
                {errors.message && <span className="ct-err-msg">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`ct-submit ${status === "sending" ? "sending" : ""}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <><span className="ct-spinner" /> {lang === "fr" ? "Envoi..." : "Sending..."}</>
                ) : (
                  <><RiSendPlaneLine /> {lang === "fr" ? "Envoyer le message" : "Send message"}</>
                )}
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
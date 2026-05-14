import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./context/LangContext";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";

/* À décommenter au fur et à mesure */
// import Projects from "./pages/Projects/Projects";
// import Skills   from "./pages/Skills/Skills";
// import Resume   from "./pages/Resume/Resume";
// import Contact  from "./pages/Contact/Contact";

/* Placeholder pour les pages pas encore créées */
const Placeholder = ({ name }) => (
  <div style={{
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "16px",
  }}>
    <p style={{ fontFamily: "Syne, sans-serif", fontSize: "2.5rem", color: "#C060FF" }}>
      🚧
    </p>
    <p style={{ fontFamily: "Syne, sans-serif", fontSize: "1.4rem", color: "#fff", fontWeight: 700 }}>
      {name}
    </p>
    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)" }}>
      Page en cours de construction
    </p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <AnimatedBackground>

          <Navbar />

          <main>
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/projects" element={<Placeholder name="Projects" />} />
              <Route path="/skills"   element={<Placeholder name="Skills" />} />
              <Route path="/resume"   element={<Placeholder name="Resume" />} />
              <Route path="/contact"  element={<Placeholder name="Contact" />} />
              {/* 404 */}
              <Route path="*" element={<Placeholder name="404 — Page introuvable" />} />
            </Routes>
          </main>

          <Footer />

        </AnimatedBackground>
      </LangProvider>
    </BrowserRouter>
  );
}
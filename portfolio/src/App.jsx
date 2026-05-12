import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./context/LangContext";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

/* Pages — crée-les au fur et à mesure */
// import Home     from "./pages/Home";
// import Projects from "./pages/Projects";
// import Skills   from "./pages/Skills";
// import Resume   from "./pages/Resume";
// import Contact  from "./pages/Contact";

/* Placeholder temporaire */
const Placeholder = ({ name }) => (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <p style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", color: "#C060FF" }}>
      📄 {name}
    </p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <AnimatedBackground>

          <Navbar />

          <main style={{ paddingTop: "68px" }}>
            <Routes>
              <Route path="/"         element={<Placeholder name="Home" />} />
              <Route path="/projects" element={<Placeholder name="Projects" />} />
              <Route path="/skills"   element={<Placeholder name="Skills" />} />
              <Route path="/resume"   element={<Placeholder name="Resume" />} />
              <Route path="/contact"  element={<Placeholder name="Contact" />} />
            </Routes>
          </main>

          <Footer />

        </AnimatedBackground>
      </LangProvider>
    </BrowserRouter>
  );
}
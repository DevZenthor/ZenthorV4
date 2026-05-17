import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./context/LangContext";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home     from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Skills   from "./pages/Skills/Skills";
import Contact  from "./pages/Contact/Contact";
import Resume   from "./pages/Resume/Resume";

const Placeholder = ({ name }) => (
  <div style={{
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "16px",
  }}>
    <p style={{ fontFamily: "Syne, sans-serif", fontSize: "2.5rem", color: "#C060FF" }}>🚧</p>
    <p style={{ fontFamily: "Syne, sans-serif", fontSize: "1.4rem", color: "#fff", fontWeight: 700 }}>{name}</p>
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
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills"   element={<Skills />} />
              <Route path="/contact"  element={<Contact />} />
              <Route path="/resume"   element={<Resume />} />
              <Route path="*"         element={<Placeholder name="404" />} />
            </Routes>
          </main>
          <Footer />
        </AnimatedBackground>
      </LangProvider>
    </BrowserRouter>
  );
}
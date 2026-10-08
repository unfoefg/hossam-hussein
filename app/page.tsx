
// Step 05–13 — App Layer
// Composes the single-page experience. It only assembles sections (all Server
// Components except the few interactive ones), so the page itself stays tiny.
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import DesignShowcase from "@/sections/DesignShowcase";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Services from "@/sections/Services";
import Skills from "@/sections/Skills";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <DesignShowcase />
        <Contact />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
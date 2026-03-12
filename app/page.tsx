import Cursor from "@/components/Cursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Client providers — no markup */}
      <SmoothScrollProvider />
      <Cursor />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

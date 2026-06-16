import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { ExtraMile } from "@/components/sections/ExtraMile";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ExtraMile />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

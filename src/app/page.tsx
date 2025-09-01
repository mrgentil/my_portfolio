import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Technologies from '@/components/Technologies';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

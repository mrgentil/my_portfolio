"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';
  const isExp = pathname.startsWith('/experiences');

  const base = 'transition-colors';
  const idle = 'text-gray-300 hover:text-blue-400';
  const active = 'text-blue-400 border-b-2 border-blue-400 pb-1';

  // Active section on home, for scroll spy
  const [activeSection, setActiveSection] = useState<'home'|'services'|'technologies'|'projets'|'contact'>('home');

  useEffect(() => {
    if (!isHome) return;
    const ids = ['home', 'services', 'technologies', 'projets', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry most in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]) {
          const id = visible[0].target.id as typeof activeSection;
          setActiveSection(id);
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const clsHome = `${base} ${isHome && activeSection === 'home' ? active : idle}`;
  const clsServices = `${base} ${isHome && activeSection === 'services' ? active : idle}`;
  const clsTech = `${base} ${isHome && activeSection === 'technologies' ? active : idle}`;
  const clsProjets = `${base} ${isHome && activeSection === 'projets' ? active : idle}`;
  const clsContact = `${base} ${isHome && activeSection === 'contact' ? active : idle}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              Bedi TSHITSHOMPO
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/#home" className={clsHome}>
              Accueil
            </Link>
            <Link href="/experiences" className={`${base} ${isExp ? active : idle}`}>
              Expériences
            </Link>
            <Link href="/#services" className={clsServices}>
              Services
            </Link>
            <Link href="/#technologies" className={clsTech}>
              Technologies
            </Link>
            <Link href="/#projets" className={clsProjets}>
              Projets
            </Link>
            <Link href="/#contact" className={clsContact}>
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-blue-400" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

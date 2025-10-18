"use client";
import { motion } from '@/lib/motion';

export default function Services() {
  const items = [
    {
      title: 'Développement Web',
      desc: "Sites, apps et APIs performants avec Next.js et Node.js.",
    },
    {
      title: 'Gestion de Projets',
      desc: "De l’idée au déploiement : backlog, roadmap, qualité et suivi.",
    },
    {
      title: 'Développement mobile',
      desc: "Apps iOS/Android avec Flutter ou React Native, perf et UX soignée.",
    },
    {
      title: 'Formation',
      desc: "Ateliers, coaching et accompagnement d’équipes techniques.",
    },
  ];

  return (
    <section id="services" className="bg-gray-950 text-gray-100 py-20 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Services</h2>
          <p className="text-gray-400 mt-3">Des solutions sur mesure pour propulser votre présence digitale</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

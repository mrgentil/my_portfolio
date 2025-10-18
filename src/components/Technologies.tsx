"use client";
import { motion } from '@/lib/motion';

export default function Technologies() {
  const stacks: { group: string; items: string[] }[] = [
    { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS'] },
    { group: 'Backend', items: ['Node.js','Nest.js', 'Express', 'REST', 'Prisma', 'Laravel'] },
    { group: 'Mobile', items: ['Flutter', 'React Native'] },
    { group: 'Bases de données', items: ['PostgreSQL', 'MySQL', 'SQLite'] },
    { group: 'Outils', items: ['Git', 'Docker', 'CI/CD'] },
  ];

  return (
    <section id="technologies" className="bg-gray-950 text-gray-100 py-20 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Technologies</h2>
          <p className="text-gray-400 mt-3">Stack utilisée au quotidien</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stacks.map((s, idx) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6"
            >
              <h3 className="font-semibold mb-3">{s.group}</h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm border border-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

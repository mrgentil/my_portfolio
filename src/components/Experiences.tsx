"use client";
import { motion } from '@/lib/motion';

type Experience = {
  period: string;
  role: string;
  company: string;
  details: string[];
  stack?: string[];
};

const PRO_EXPS: Experience[] = [
  {
    period: '2023 — Présent',
    role: 'Développeur Web & Campaign Manager',
    company: 'Totem RDC (Kinshasa)',
    details: [
      'Responsable du portail Orange RDC (orange.cd) et des campagnes.',
      'Pilotage des campagnes (création, suivi, rapports) et optimisations.',
    ],
    stack: ['Next.js', 'Laravel', 'React', 'Analytics', 'SEO'],
  },
  {
    period: '2021 — 2023',
    role: 'Développeur Full Stack',
    company: 'Aguima Web Agency (Kinshasa)',
    details: [
      "Conception d'une application de maintenance et d’un environnement de test.",
      'APIs REST, création de nouvelles fonctionnalités.',
      'Déploiements sur Play Store et App Store.',
      'Chargé du déploiement des portails Orange RDC.',
    ],
    stack: ['Laravel', 'Node.js', 'Flutter', 'React Native', 'MySQL'],
  },
  {
    period: '2020 — 2021',
    role: 'Développeur Back End',
    company: 'MAISHAPAY SARL (Kinshasa)',
    details: [
      'Développement de nouvelles fonctionnalités et contrôle qualité du code.',
      'Déploiement du code selon les exigences, priorisation des projets.',
      'Chargé du déploiement des applications côté backend.',
    ],
    stack: ['Laravel', 'Node.js', 'PostgreSQL', 'CI/CD'],
  },
  {
    period: '2018 — 2019',
    role: 'Superviseur Brand Of Ambassador',
    company: 'Vodacom Square (Kinshasa)',
    details: [
      'Traitement des plaintes clients avec empathie et calme.',
      'Participation active aux réunions, amélioration des pratiques.',
      'Support multi‑canal (appels, emails, en présentiel).',
      "Objectifs atteints (court & long terme). Déploiement de l’app VODACOM APP RDC.",
    ],
  },
];

const EDUCATION: { period: string; title: string; place: string; notes?: string }[] = [
  {
    period: '2019 — 2021',
    title: 'Certificat en Digital Marketing',
    place: 'Smart Academy (Kinshasa)',
    notes: 'Bases, médiaplanning et stratégie marketing digitale.',
  },
  {
    period: '2013 — 2016',
    title: 'Bac +5 en Génie Informatique',
    place: 'Université Panafricaine du Congo (Mont Ngafula)',
    notes: 'Conception & développement systèmes, réseaux et architecture.',
  },
  {
    period: '2007 — 2013',
    title: 'Bac en Électronique Commutation',
    place: 'Institut Technique Industrielle de la Gombe (Kinshasa/Gombe)',
  },
];

const SKILLS = [
  'WordPress',
  'PrestaShop',
  'Bootstrap',
  'Atom',
  'Joomla',
  'Android Studio',
];

export default function Experiences() {
  return (
    <section className="bg-gray-950 text-gray-100 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-300 text-sm mb-3">
            Parcours
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">Expériences</h1>
          <p className="text-gray-400 mt-3">Mon parcours en un coup d’œil
Expérience, savoir-faire & passion
Ce qui forge mon expertise
De l’apprentissage à la maîtrise</p>
        </motion.div>

        {/* Expériences Pro — timeline */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Expériences professionnelles</h2>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-700/40 via-gray-700/40 to-purple-700/40" />
            <div className="space-y-10">
              {PRO_EXPS.map((exp, idx) => (
                <motion.div
                  key={exp.period + exp.role}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="relative grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {/* Bloc période, alterne gauche/droite en >= sm */}
                  <div
                    className={`flex sm:block items-center gap-3 pr-6 ${
                      idx % 2 === 1
                        ? 'sm:col-start-2 sm:pl-10 sm:pr-0 sm:text-left'
                        : 'sm:col-start-1 sm:pr-10 sm:text-right'
                    }`}
                  >
                    <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow" />
                    <div className="text-sm text-gray-400">{exp.period}</div>
                  </div>

                  {/* Carte, alternée */}
                  <div
                    className={`rounded-2xl border border-gray-800 bg-gray-900/60 p-6 ${
                      idx % 2 === 1 ? 'sm:col-start-1' : 'sm:col-start-2'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                      <h3 className="text-lg font-semibold">{exp.role}</h3>
                      <span className="text-gray-400">• {exp.company}</span>
                    </div>
                    <ul className="mt-3 space-y-2 text-gray-300 text-sm leading-relaxed list-disc pl-5">
                      {exp.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    {exp.stack && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.stack.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Formations & Certificats */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Formations & Certificats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION.map((e, idx) => (
              <motion.div
                key={e.title + e.period}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5"
              >
                <div className="text-sm text-gray-400">{e.period}</div>
                <div className="mt-1 font-semibold">{e.title}</div>
                <div className="text-gray-400 text-sm">{e.place}</div>
                {e.notes && <p className="text-gray-300 text-sm mt-2">{e.notes}</p>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Compétences */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Compétences</h2>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap gap-2"
          >
            {SKILLS.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-sm">
                {s}
              </span>
            ))}
          </motion.div>
        </section>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from 'react';
import { motion } from '@/lib/motion';

type GitProject = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
};

export default function Projects() {
  const [items, setItems] = useState<GitProject[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallbackUsed, setFallbackUsed] = useState(false);

  const reposList = [
    'rh_app_new',
    'orange-music-talents',
    'kgbPharma',
    'e-influencers',
    'school_manage',
    'HrManage',
  ];

  useEffect(() => {
    let active = true;
    const repos = reposList.join(',');
    fetch(`/api/projects?user=mrgentil&repos=${encodeURIComponent(repos)}`, { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) {
          const txt = await r.text().catch(() => '');
          throw new Error(txt || r.statusText);
        }
        return r.json();
      })
      .then((data) => {
        if (!active) return;
        const list = (data?.items || []) as GitProject[];
        if (list.length === 0) {
          // API responded but empty (likely rate-limit or fetch failed per-repo)
          const fallback: GitProject[] = reposList.map((name) => ({
            name,
            description: null,
            url: `https://github.com/mrgentil/${name}`,
            stars: 0,
            language: null,
          }));
          setFallbackUsed(true);
          setItems(fallback);
        } else {
          setItems(list);
        }
      })
      .catch(() => {
        if (!active) return;
        setError('Impossible de charger les projets GitHub. Affichage en mode dégradé.');
        // Fallback minimal à partir de la liste fournie
        const fallback: GitProject[] = reposList.map((name) => ({
          name,
          description: null,
          url: `https://github.com/mrgentil/${name}`,
          stars: 0,
          language: null,
        }));
        setFallbackUsed(true);
        setItems(fallback);
      });
    return () => {
      active = false;
    };
  }, []);

  const skeleton = Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 animate-pulse">
      <div className="aspect-video rounded-lg bg-gray-800/60 border border-gray-700 mb-4" />
      <div className="h-4 w-2/3 bg-gray-800 rounded mb-2" />
      <div className="h-3 w-4/5 bg-gray-800 rounded" />
    </div>
  ));

  return (
    <section id="projets" className="bg-gray-950 text-gray-100 py-20 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Projets</h2>
          <p className="text-gray-400 mt-3">Quelques dépôts GitHub sélectionnés</p>
        </motion.div>

        {error && (
          <div className="mb-2 text-center text-sm text-red-400">{error}</div>
        )}
        {fallbackUsed && (
          <div className="mb-6 text-center text-xs text-gray-500">Affichage en mode dégradé (limite API GitHub). Les étoiles et descriptions peuvent être incomplètes.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {!items && skeleton}
          {items &&
            items.map((p, idx) => (
              <motion.a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noreferrer noopener"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="group rounded-2xl border border-gray-800 bg-gray-900/60 p-6 hover:bg-gray-900 transition-colors block"
              >
                <div className="rounded-lg overflow-hidden border border-gray-700 mb-4 bg-gray-800/60">
                  <img
                    src={`https://opengraph.githubassets.com/1/mrgentil/${p.name}`}
                    alt={`Aperçu du dépôt ${p.name}`}
                    className="w-full h-auto object-cover"
                    loading={idx < 2 ? 'eager' : 'lazy'}
                  />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-white">{p.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{p.description || '—'}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  {p.language && (
                    <span className="px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700">{p.language}</span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700">★ {p.stars}</span>
                </div>
                <div className="mt-3">
                  <span className="inline-block px-2.5 py-1 rounded-md border border-gray-700 bg-gray-800/50 text-gray-300 text-xs group-hover:border-gray-600">Voir sur GitHub →</span>
                </div>
              </motion.a>
            ))}
        </div>
      </div>
    </section>
  );
}

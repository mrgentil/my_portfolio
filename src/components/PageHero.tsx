"use client";
import { motion } from '@/lib/motion';

type Props = {
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function PageHero({ title, subtitle, ctaHref, ctaLabel }: Props) {
  return (
    <section className="relative bg-gray-950 text-gray-100 pt-28 pb-16 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black)] opacity-10" />
        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          {subtitle && (
            <p className="text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
          )}
          {ctaHref && ctaLabel && (
            <div className="mt-6">
              <a href={ctaHref} className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded-lg">
                {ctaLabel}
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

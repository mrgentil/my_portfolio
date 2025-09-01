"use client";
import Image from 'next/image';
import { motion } from '@/lib/motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 text-gray-100 pt-24 sm:pt-0 scroll-mt-24 md:scroll-mt-28"
    >
      {/* subtle grid background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black)] opacity-10" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.05, 1], opacity: [0, 0.7, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-blue-600/20 blur-3xl"
        />
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: [1.1, 0.95, 1], opacity: [0, 0.6, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
          className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-purple-600/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-300 text-sm mb-4">
              Disponible pour missions & CDI
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Développeur Full Stack
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
              Création d’expériences web modernes, performantes et accessibles. Spécialisé en
              Next.js, API Node, bases de données et intégrations cloud.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#projets" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center">
                Voir mes projets
              </a>
              <a href="#contact" className="border border-gray-700 text-gray-200 px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors text-center">
                Télécharger CV
              </a>
            </div>
          </motion.div>

          <div className="flex justify-center lg:justify-end px-4 sm:px-0">
            <motion.div
              className="relative mb-8 sm:mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.4 }}
            >
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-900/20 border border-blue-600/30 flex items-center justify-center overflow-hidden shadow-xl sm:shadow-2xl mx-auto">
                <div className="w-[95%] h-[85%] rounded-full bg-gray-800/50 flex items-center justify-center overflow-hidden border border-gray-700/50">
                  <Image
                    src="/images/pr.png"
                    alt="Photo de profil"
                    width={400}
                    height={400}
                    className="object-cover scale-110"
                    priority
                  />
                </div>
              </div>

              {/* floating badges */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.9, 1, 0.98, 1], opacity: 1 }}
                transition={{ delay: 1.0, type: 'spring' }}
                className="absolute bottom-0 right-0 sm:-bottom-4 sm:-right-4 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 z-10 text-xs sm:text-sm"
              >
                <span className="w-4 h-4 rounded-full bg-white/80 inline-block" />
                <span className="font-medium">Dev Full</span>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.9, 1, 0.98, 1], opacity: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute top-0 left-0 sm:-top-4 sm:-left-4 bg-gradient-to-r from-emerald-600 to-cyan-600 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 z-10 text-xs sm:text-sm"
              >
                <span className="w-4 h-4 rounded-full bg-white/80 inline-block" />
                <span className="font-medium">Gestion Projets</span>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.9, 1, 0.98, 1], opacity: 1 }}
                transition={{ delay: 1.4, type: 'spring' }}
                className="absolute top-1/4 -right-2 sm:-right-12 bg-gradient-to-r from-orange-600 to-amber-600 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 z-10 text-xs sm:text-sm"
              >
                <span className="w-4 h-4 rounded-full bg-white/80 inline-block" />
                <span className="font-medium">Formateur</span>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.9, 1, 0.98, 1], opacity: 1 }}
                transition={{ delay: 1.6, type: 'spring' }}
                className="absolute bottom-1/4 -left-2 sm:-left-24 bg-gradient-to-r from-pink-600 to-rose-600 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 z-10 text-xs sm:text-sm"
              >
                <span className="w-4 h-4 rounded-full bg-white/80 inline-block" />
                <span className="font-medium">Développement mobile</span>
              </motion.div>

              {/* glow */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 1.3 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-xl -z-10"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

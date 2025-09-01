// next.config.mjs
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

// ⚠️ Mets le nom exact de ton repo GitHub:
const repoName = 'clone' // <-- change si besoin

export default {
    // Active l’export statique
    output: 'export',

    // Indispensable pour GitHub Project Pages
    basePath: isProd ? `/${repoName}` : '',
    assetPrefix: isProd ? `/${repoName}/` : '',

    // Pour que next/image sorte des <img> statiques
    images: { unoptimized: true },

    // Évite les 404 sur GitHub Pages pour les liens /routes/
    trailingSlash: true,
}
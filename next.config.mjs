// next.config.mjs
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isNetlify = process.env.NETLIFY === 'true';

// ⚠️ Mets le nom exact de ton repo GitHub:
const repoName = 'clone'; // <-- change si besoin

const isStaticExport = isProd && !isNetlify;

const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

if (isStaticExport) {
  Object.assign(config, {
    output: 'export',
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
    trailingSlash: true,
    images: {
      ...config.images,
      unoptimized: true,
    },
  });
}

export default config;

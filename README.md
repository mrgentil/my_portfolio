# Portfolio – Bedi TSHITSHOMPO

Site personnel construit avec Next.js 15 (App Router) et Tailwind CSS. Il reprend le style du site de référence avec sections Hero, Services, Technologies, Projets, Contact et une page Expériences (timeline alternée).

• Démo locale: http://localhost:3000

## Aperçu

![Accueil](docs/screenshot-home.png)
![Expériences](docs/screenshot-experiences.png)
![Projets](docs/screenshot-projects.png)

Place tes captures d’écran dans `docs/` avec ces noms pour qu’elles s’affichent.

## Fonctionnalités

- Thème sombre, fond grille, halos, animations (shim si framer-motion manquant)
- Header fixe, scroll-smooth + offset (ancres `/#services` etc.)
- Expériences: timeline gauche/droite + formations + compétences
- Projets: récupération depuis GitHub (fallback si rate‑limit)
- Contact: honeypot, rate‑limit, reCAPTCHA v3, sanitation HTML, SMTP (Gmail) ou Resend
- Sécurité: CSP/HSTS/headers via middleware

## Prérequis

- Node.js 18+
- npm (ou pnpm/yarn)

## Installation

```bash
npm install
npm run dev
```

## Configuration

Extrait `.env.local` (déjà présent et commenté dans le repo):

```
# SMTP (Gmail app password)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=ton_email@gmail.com
MAIL_PASSWORD=mot_de_passe_application
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="ton_email@gmail.com"
MAIL_FROM_NAME="Portfolio"
CONTACT_TO_EMAIL="ton_email@gmail.com"

# reCAPTCHA v3 (prod recommandé)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET=

# GitHub (évite le rate limit)
GITHUB_TOKEN=

# Option Resend
RESEND_API_KEY=
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

## Déploiement

- Vercel: ajoute les variables d’environnement et déploie.
- Autres: `npm run build && npm start`.

## Sécurité

- reCAPTCHA v3 requis en production sur `/api/contact`
- Rate‑limit 5 req/10min/IP, sanitation HTML, erreurs masquées en prod
- CSP/HSTS/X-Frame-Options/Referrer-Policy via `middleware.ts`

## Licences / Crédits

Usage personnel/portfolio.

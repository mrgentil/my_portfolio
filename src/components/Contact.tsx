"use client";
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { motion } from '@/lib/motion';

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'ok' | 'error'>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [captchaReady, setCaptchaReady] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!siteKey) return;
    const id = setInterval(() => {
      if (
        typeof window !== 'undefined' &&
        window.grecaptcha &&
        typeof window.grecaptcha.execute === 'function'
      ) {
        clearInterval(id);
        setCaptchaReady(true);
      }
    }, 300);
    return () => clearInterval(id);
  }, [siteKey]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      message: String(fd.get('message') || ''),
      website: String(fd.get('website') || ''), // honeypot
    };
    setLoading(true);
    setStatus(null);
    setErrorMsg('');
    try {
      let captchaToken: string | undefined = undefined;
      if (siteKey && captchaReady && typeof window !== 'undefined' && window.grecaptcha) {
        try {
          captchaToken = await window.grecaptcha.execute(siteKey, { action: 'contact' });
        } catch {
          // ignore, will fail server-side
        }
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, captchaToken }),
      });
      if (!res.ok) {
        throw new Error('send_failed');
      }
      setStatus('ok');
      form.reset();
      setShowToast(true);
    } catch {
      setStatus('error');
      setErrorMsg("Impossible d'envoyer le message. Réessaie plus tard.");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(t);
  }, [showToast]);

  return (
    <section id="contact" className="bg-gray-950 text-gray-100 py-20 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {siteKey && (
          <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />
        )}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Contact</h2>
          <p className="text-gray-400 mt-3">Discutons de votre projet</p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-gray-800 bg-gray-900/60 p-6"
        >
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Nom</label>
              <input
                name="name"
                required
                disabled={loading}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                disabled={loading}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              minLength={10}
              disabled={loading}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white px-6 py-2 rounded-lg"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                  Envoi…
                </span>
              ) : (
                'Envoyer'
              )}
            </button>
            <div className="text-gray-400 text-sm">
              Ou écrivez-moi :{' '}
              <a href="mailto:tshitshob@gmail.com" className="text-blue-400 hover:text-blue-300">
                tshitshob@gmail.com
              </a>
            </div>
          </div>

          {loading && (
            <div className="absolute inset-0 rounded-2xl bg-black/40 backdrop-blur-[1px] flex items-center justify-center" aria-live="polite" aria-busy="true">
              <div className="flex items-center gap-3 text-gray-200">
                <span className="inline-block w-6 h-6 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                <span>Envoi du message…</span>
              </div>
            </div>
          )}
        </motion.form>
      </div>

      {showToast && status === 'ok' && (
        <div
          role="status"
          aria-live="polite"
          className="fixed z-50 rounded-lg border border-emerald-600/30 bg-emerald-600/15 text-emerald-200 px-4 py-3 shadow
                     bottom-4 left-1/2 -translate-x-1/2 transform md:bottom-auto md:left-auto md:top-4 md:right-4 md:translate-x-0"
        >
          <div className="flex items-start gap-3">
            <span>Message envoyé avec succès. Merci !</span>
            <button
              type="button"
              aria-label="Fermer la notification"
              onClick={() => setShowToast(false)}
              className="ml-2 text-emerald-200/80 hover:text-emerald-100"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showToast && status === 'error' && (
        <div
          role="status"
          aria-live="assertive"
          className="fixed z-50 rounded-lg border border-red-600/30 bg-red-600/15 text-red-200 px-4 py-3 shadow
                     bottom-4 left-1/2 -translate-x-1/2 transform md:bottom-auto md:left-auto md:top-4 md:right-4 md:translate-x-0"
        >
          <div className="flex items-start gap-3">
            <span>Échec de l’envoi: {errorMsg}</span>
            <button
              type="button"
              aria-label="Fermer la notification"
              onClick={() => setShowToast(false)}
              className="ml-2 text-red-200/80 hover:text-red-100"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
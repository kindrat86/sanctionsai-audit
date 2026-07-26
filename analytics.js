/**
 * SanctionsAI — Analytics & Conversion Tracking
 * Drop-in: <script src="/analytics.js" defer></script>
 *
 * Tracks: page views, CTA clicks (via data-track attrs), and key funnel events.
 * Set your real IDs in the placeholders below before going to prod.
 *
 * GA4 Measurement ID:  G-XXXXXXXXXX   ← replace
 * Meta Pixel ID:        1234567890     ← replace
 * Facebook CAPI access token:          ← optional, for server-side
 */

(function(){
  'use strict';

  // ── CONFIG (replace before production) ──
  var GA4_ID = 'G-XXXXXXXXXX';
  var META_PIXEL_ID = '1234567890';
  var DEBUG = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  var queue = [];                     // event queue before libs load
  var ready = false;

  function logEv(cat, label, val) {
    if (DEBUG) console.log('[sai-track]', cat, label, val || '');
  }

  // Public tracking API (callable immediately — queued until libs load)
  window.__saiTrack = function(name, value) {
    queue.push({ n: name, v: value, t: Date.now() });
    if (ready) flush();
  };

  function flush() {
    while (queue.length) {
      var e = queue.shift();
      if (typeof gtag !== 'undefined') gtag('event', e.n, { event_label: e.v });
      if (typeof fbq !== 'undefined') fbq('trackCustom', e.n, { value: e.v });
    }
  }

  // ── GA4 ──
  if (GA4_ID !== 'G-XXXXXXXXXX') {
    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(gs);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA4_ID, { send_page_view: true });
    logEv('ga4', 'loaded');
  }

  // ── Meta Pixel ──
  if (META_PIXEL_ID !== '1234567890') {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments);};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
    logEv('meta', 'loaded');
  }

  // ── Auto-track CTA clicks via data-track attributes ──
  document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    var name = el.getAttribute('data-track');
    var value = el.getAttribute('data-track-value') || '';
    if (!name) return;
    window.__saiTrack(name, value);
    logEv('click', name, value);
  }, true);

  // ── Funnel-step identification (auto-guess from URL) ──
  function funnelStep() {
    var p = location.pathname;
    if (p === '/' || p === '/index' || p === '') return 'landing';
    if (p === '/webinar') return 'optin';
    if (p === '/thank-you') return 'thank_you';
    if (p === '/checkout-bump') return 'checkout';
    if (p === '/check') return 'demo';
    if (p === '/about') return 'about';
    if (p === '/pricing') return 'pricing';
    return 'other';
  }
  var step = funnelStep();
  window.__saiTrack('page_view', step);

  // ── Page-visibility time-on-page tracking ──
  var entered = Date.now();
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      var sec = Math.round((Date.now() - entered) / 1000);
      window.__saiTrack('time_on_page', sec);
    }
  });

  // Mark libs loaded after a short delay (allows GA/Meta to init)
  setTimeout(function(){ ready = true; flush(); }, 1200);

  // Expose config for debug
  window.__saiConfig = { ga4: GA4_ID, pixel: META_PIXEL_ID, debug: DEBUG };
})();

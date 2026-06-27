/* =====================================================================
   i18n — tradução PT | EN do conteúdo da página.
   Sem dependências: troca os textos marcados com data-i18n / data-i18n-html,
   lembra a escolha (localStorage) e detecta o idioma do navegador na 1ª visita.
   Mensagens dinâmicas (status da live) são lidas pelo main.js via window.MGI18n.
   ===================================================================== */
(function () {
  'use strict';

  const translations = {
    pt: {
      'doc.title': 'Machado Gamer — Canal Oficial',

      'nav.live': 'Ao vivo',
      'nav.about': 'Sobre',
      'nav.schedule': 'Agenda',
      'nav.socials': 'Redes',
      'nav.partners': 'Parcerias',
      'nav.followTwitch': 'Seguir na Twitch',

      'hero.tagline': 'Reacts, gameplays e muita zoeira ao vivo. Chega mais e cola na live! 🎮🪓',
      'hero.watchLive': '▶ Assistir ao vivo',
      'hero.instagram': 'Ver no Instagram',
      'hero.pix': '💸 Apoie no Live PIX',
      'hero.paypal': '🎁 Apoie no PayPal',

      'live.title': 'Transmissão ao vivo',
      'live.checking': 'Verificando se a live está rolando…',
      'live.online': '🎮 Tô AO VIVO agora! Cola na live e vem trocar ideia no chat!',
      'live.offline': 'No momento estamos offline. Ative as notificações na Twitch e não perca a próxima live!',
      'live.titleOnline': 'AO VIVO agora',
      'live.titleOffline': 'Offline',

      'about.title': 'Sobre o canal',
      'about.p1': 'E aí, galera! Eu sou o <strong>Machado Gamer</strong>, criador de conteúdo focado em reacts, gameplays e diversão ao vivo. Aqui o clima é leve, com muita interação com a galera do chat.',
      'about.p2': 'Cola nas lives, deixa o follow e faz parte dessa comunidade! 🪓',
      'about.statTwitch': '📺 Seguidores Twitch',
      'about.statInsta': '📸 Seguidores Instagram',
      'about.statGames': 'Vários games',

      'schedule.title': '🗓️ Agenda de lives',
      'schedule.weekdays': 'Segunda a Sexta',
      'schedule.time1': '06h às 08h',
      'schedule.time2': '19h às 21h',
      'schedule.morning': 'Live da manhã',
      'schedule.night': 'Live da noite',
      'schedule.note': 'A programação pode variar.<br />Confirme em nossas redes sociais.<br />Horário de Brasília.',

      'socials.title': 'Redes sociais',
      'socials.sub': 'Segue em todas pra não perder nada!',
      'socials.joinGroup': 'Entrar no grupo',
      'socials.joinServer': 'Entrar no servidor',

      'partners.title': '🤝 Parcerias',
      'partners.sub': 'Quem caminha junto com a gente!',
      'partners.emersonDesc': 'Jogos em mídia digital há quase 10 anos',

      'footer.rights': 'Todos os direitos reservados.',
      'footer.credits': 'Feito com 🤠 para a comunidade.'
    },

    en: {
      'doc.title': 'Machado Gamer — Official Channel',

      'nav.live': 'Live',
      'nav.about': 'About',
      'nav.schedule': 'Schedule',
      'nav.socials': 'Socials',
      'nav.partners': 'Partners',
      'nav.followTwitch': 'Follow on Twitch',

      'hero.tagline': 'Reacts, gameplays and tons of fun live. Come hang out in the stream! 🎮🪓',
      'hero.watchLive': '▶ Watch live',
      'hero.instagram': 'See on Instagram',
      'hero.pix': '💸 Support via Live PIX',
      'hero.paypal': '🎁 Support via PayPal',

      'live.title': 'Live stream',
      'live.checking': 'Checking if the stream is live…',
      'live.online': "🎮 I'm LIVE right now! Join the stream and come chat with us!",
      'live.offline': "We're currently offline. Turn on notifications on Twitch so you don't miss the next stream!",
      'live.titleOnline': 'LIVE now',
      'live.titleOffline': 'Offline',

      'about.title': 'About the channel',
      'about.p1': "Hey there! I'm <strong>Machado Gamer</strong>, a content creator focused on reacts, gameplays and live fun. The vibe here is laid-back, with lots of chat interaction.",
      'about.p2': 'Join the streams, hit follow and become part of this community! 🪓',
      'about.statTwitch': '📺 Twitch followers',
      'about.statInsta': '📸 Instagram followers',
      'about.statGames': 'Various games',

      'schedule.title': '🗓️ Stream schedule',
      'schedule.weekdays': 'Monday to Friday',
      'schedule.time1': '6 AM – 8 AM',
      'schedule.time2': '7 PM – 9 PM',
      'schedule.morning': 'Morning stream',
      'schedule.night': 'Evening stream',
      'schedule.note': 'Schedule may vary.<br />Check our social media.<br />Brasília time (GMT-3).',

      'socials.title': 'Social media',
      'socials.sub': "Follow on all of them so you don't miss a thing!",
      'socials.joinGroup': 'Join the group',
      'socials.joinServer': 'Join the server',

      'partners.title': '🤝 Partners',
      'partners.sub': 'Those who walk alongside us!',
      'partners.emersonDesc': 'Digital media games for almost 10 years',

      'footer.rights': 'All rights reserved.',
      'footer.credits': 'Made with 🤠 for the community.'
    }
  };

  const SUPPORTED = ['pt', 'en'];
  const STORAGE_KEY = 'mg-lang';
  let current = 'pt';

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignora */ }
  }
  function detect() {
    const saved = getStored();
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    const nav = (navigator.language || 'pt').toLowerCase();
    return nav.indexOf('en') === 0 ? 'en' : 'pt';
  }

  function t(key) {
    const dict = translations[current] || translations.pt;
    if (key in dict) return dict[key];
    return (key in translations.pt) ? translations.pt[key] : key;
  }

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'pt';
    current = lang;
    document.documentElement.lang = (lang === 'en') ? 'en' : 'pt-BR';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });

    document.title = t('doc.title');

    document.querySelectorAll('.lang-btn').forEach((b) => {
      const active = b.dataset.lang === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    store(lang);
    document.dispatchEvent(new CustomEvent('mg:langchange', { detail: { lang: lang } }));
  }

  function init() {
    document.querySelectorAll('.lang-btn').forEach((b) => {
      b.addEventListener('click', () => apply(b.dataset.lang));
    });
    apply(detect());
  }

  // Exposto para o main.js (mensagens dinâmicas do status da live).
  window.MGI18n = {
    t: t,
    apply: apply,
    get current() { return current; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

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

      'hero.tagline': 'Reacts, gameplays e muita zoeira ao vivo. As luzes acendem, o chat esquenta — cola na live! 🎮🌴',
      'hero.watchLive': '▶ Assistir ao vivo',
      'hero.instagram': 'Ver no Instagram',
      'hero.pix': 'Apoie no Live PIX',
      'hero.paypal': 'Apoie no PayPal',

      'live.title': 'Transmissão ao vivo',
      'live.checking': 'Verificando se a live está rolando…',
      'live.online': '🎮 Tô AO VIVO agora! As luzes acesas — cola na live e vem trocar ideia no chat!',
      'live.offline': 'As luzes estão apagadas por enquanto. Ative as notificações na Twitch e não perca a próxima live!',
      'live.titleOnline': 'AO VIVO agora',
      'live.titleOffline': 'Offline',

      'about.title': 'Sobre o canal',
      'about.p1': 'E aí, galera! Eu sou o <strong>Machado Gamer</strong>, criador de conteúdo focado em reacts, gameplays e diversão ao vivo. Aqui o clima é neon: papo solto, chat na área e aquela vibe de fim de tarde na orla.',
      'about.p2': 'Cola nas lives, deixa o follow e entra pro bonde! 🌴',
      'about.statTwitch': '📺 Seguidores Twitch',
      'about.statInsta': '📸 Seguidores Instagram',

      'schedule.title': '🌆 Agenda de lives',
      'schedule.weekdays': 'Segunda a Sexta',
      'schedule.time1': '06h às 08h',
      'schedule.time2': '19h às 21h',
      'schedule.morning': 'Sessão da manhã',
      'schedule.night': 'Sessão da noite',
      'schedule.note': 'A programação pode variar.<br />Confirme em nossas redes sociais.<br />Horário de Brasília.',

      'socials.title': 'Redes sociais',
      'socials.sub': 'Segue em todas pra não perder nada!',
      'socials.joinGroup': 'Entrar no grupo',
      'socials.joinServer': 'Entrar no servidor',

      'picks.title': '🛒 Minhas indicações',
      'picks.sub': 'Produtos que eu uso e recomendo',
      'picks.name': 'Vitrine de recomendações',
      'picks.desc': 'Games, acessórios e itens do meu setup — com curadoria minha, direto no Mercado Livre.',
      'picks.cta': 'Ver vitrine no Mercado Livre →',

      'partners.title': '🤝 Parcerias',
      'partners.sub': 'Quem tá no corre junto com a gente!',
      'partners.emersonDesc': 'Jogos em mídia digital há quase 10 anos',
      'partners.idealizeDesc': 'Impressões e projetos 3D sob medida',

      'footer.rights': 'Todos os direitos reservados.',
      'footer.credits': 'Feito na vibe neon para a comunidade. 🌴'
    },

    en: {
      'doc.title': 'Machado Gamer — Official Channel',

      'nav.live': 'Live',
      'nav.about': 'About',
      'nav.schedule': 'Schedule',
      'nav.socials': 'Socials',
      'nav.partners': 'Partners',
      'nav.followTwitch': 'Follow on Twitch',

      'hero.tagline': 'Reacts, gameplays and tons of fun live. Lights on, chat heating up — jump in! 🎮🌴',
      'hero.watchLive': '▶ Watch live',
      'hero.instagram': 'See on Instagram',
      'hero.pix': 'Support via Live PIX',
      'hero.paypal': 'Support via PayPal',

      'live.title': 'Live stream',
      'live.checking': 'Checking if the stream is live…',
      'live.online': "🎮 I'm LIVE right now! Lights are on — join the stream and come chat with us!",
      'live.offline': "The lights are off for now. Turn on notifications on Twitch so you don't miss the next stream!",
      'live.titleOnline': 'LIVE now',
      'live.titleOffline': 'Offline',

      'about.title': 'About the channel',
      'about.p1': "Hey there! I'm <strong>Machado Gamer</strong>, a content creator focused on reacts, gameplays and live fun. The vibe here is neon — laid-back talk, chat in the mix, and that sunset-on-the-strip energy.",
      'about.p2': 'Join the streams, hit follow and roll with the crew! 🌴',
      'about.statTwitch': '📺 Twitch followers',
      'about.statInsta': '📸 Instagram followers',

      'schedule.title': '🌆 Stream schedule',
      'schedule.weekdays': 'Monday to Friday',
      'schedule.time1': '6 AM – 8 AM',
      'schedule.time2': '7 PM – 9 PM',
      'schedule.morning': 'Morning session',
      'schedule.night': 'Night session',
      'schedule.note': 'Schedule may vary.<br />Check our social media.<br />Brasília time (GMT-3).',

      'socials.title': 'Social media',
      'socials.sub': "Follow on all of them so you don't miss a thing!",
      'socials.joinGroup': 'Join the group',
      'socials.joinServer': 'Join the server',

      'picks.title': '🛒 My picks',
      'picks.sub': 'Products I use and recommend',
      'picks.name': 'Recommendations storefront',
      'picks.desc': 'Games, accessories and gear from my setup — hand-picked by me, right on Mercado Livre.',
      'picks.cta': 'See my storefront on Mercado Livre →',

      'partners.title': '🤝 Partners',
      'partners.sub': 'The crew riding with us!',
      'partners.emersonDesc': 'Digital media games for almost 10 years',
      'partners.idealizeDesc': 'Custom 3D prints and projects',

      'footer.rights': 'All rights reserved.',
      'footer.credits': 'Made with neon vibes for the community. 🌴'
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

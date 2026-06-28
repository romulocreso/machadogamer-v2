// ===== Ano automático no rodapé =====
document.getElementById('ano').textContent = new Date().getFullYear();

// ===== Menu mobile (hambúrguer) =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

// Fecha o menu ao clicar em um link (no mobile)
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Contador de seguidores da Twitch (atualiza sozinho) =====
// Usa o DecAPI (gratuito, sem token). Atualiza a cada visita/refresh.
const twEl = document.getElementById('twitchFollowers');
if (twEl) {
  const canal = twEl.dataset.channel;
  fetch(`https://decapi.me/twitch/followcount/${canal}`)
    .then((r) => r.text())
    .then((txt) => {
      const n = parseInt(String(txt).replace(/\D/g, ''), 10);
      twEl.textContent = Number.isFinite(n) ? n.toLocaleString('pt-BR') : '—';
    })
    .catch(() => { twEl.textContent = '—'; });
}

// ===== Status AO VIVO (bolinha verde/vermelha) =====
// Usa o DecAPI (gratuito, sem token). O endpoint /uptime retorna o tempo de
// transmissão quando o canal está online, ou "... is offline" quando offline.
const liveDot = document.getElementById('liveDot');
if (liveDot) {
  const canal = liveDot.dataset.channel;
  const liveMsg = document.getElementById('liveMsg');
  let lastOnline = null; // null = ainda verificando

  // Lê a tradução atual (PT/EN) se o i18n estiver carregado; senão, fallback PT.
  const tr = (key, fallback) => (window.MGI18n ? window.MGI18n.t(key) : fallback);

  const render = () => {
    if (lastOnline === null) {
      if (liveMsg) liveMsg.textContent = tr('live.checking', 'Verificando se a live está rolando…');
      return;
    }
    liveDot.classList.remove('is-checking', 'is-online', 'is-offline');
    liveDot.classList.add(lastOnline ? 'is-online' : 'is-offline');
    liveDot.title = lastOnline ? tr('live.titleOnline', 'AO VIVO agora') : tr('live.titleOffline', 'Offline');
    if (liveMsg) {
      liveMsg.textContent = lastOnline
        ? tr('live.online', '🎮 Tô AO VIVO agora! Cola na live e vem trocar ideia no chat!')
        : tr('live.offline', 'No momento estamos offline. Ative as notificações na Twitch e não perca a próxima live!');
    }
  };

  const setStatus = (online) => { lastOnline = online; render(); };
  const checkLive = () => {
    fetch(`https://decapi.me/twitch/uptime/${canal}`, { cache: 'no-store' })
      .then((r) => r.text())
      .then((txt) => setStatus(!/offline/i.test(txt)))
      .catch(() => setStatus(false));
  };

  // Reaplica a mensagem no idioma novo quando o usuário troca PT/EN.
  document.addEventListener('mg:langchange', render);

  render();     // mostra "verificando…" já no idioma certo
  checkLive();
  // Reverifica a cada 60s para refletir mudanças sem recarregar a página.
  setInterval(checkLive, 60000);
}

// ===== Seguidores do Instagram (atualizado por GitHub Action) =====
// Um workflow lê o perfil a cada 6h e grava data/instagram.json.
// Se a leitura falhar, mantém o último valor escrito no HTML.
const igEl = document.getElementById('igFollowers');
if (igEl) {
  fetch('data/instagram.json', { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((d) => { if (d && d.followers) igEl.textContent = d.followers; })
    .catch(() => { /* mantém o valor já presente no HTML */ });
}

// ===== Camada de UX (scroll): reveals, header reativo, indicador e parallax =====
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Marca elementos para "reveal" ao entrar na tela.
  const blockSelectors = ['.section-head', '.about-media', '.about-text', '.schedule-note'];
  blockSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.classList.add('reveal'));
  });

  // Grupos de cards entram em sequência (stagger).
  const groupSelectors = ['.socials', '.partners', '.schedule'];
  groupSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        child.classList.add('reveal');
        child.dataset.delay = String((i % 6) + 1);
      });
    });
  });

  // IntersectionObserver dispara o reveal.
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  // Header reativo + parallax sutil no hero + hero "pinado" (estilo GTA VI).
  const header = document.querySelector('.site-header');
  const heroBg = document.querySelector('.hero-bg');
  const heroPin = document.querySelector('.hero-pin');
  const heroContent = document.querySelector('.hero-content');

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;

    // Header ganha sombra/fundo sólido e revela o CTA após sair do topo.
    if (header) header.classList.toggle('is-scrolled', y > 40);

    if (!reduceMotion) {
      // Parallax sutil no fundo do hero.
      if (heroBg && y < vh) {
        heroBg.style.transform = 'translateY(' + (y * 0.18).toFixed(1) + 'px)';
      }
      // Hero cinematográfico: desvanece e recua suavemente enquanto sai da tela
      // (ao longo de ~60% de um viewport de rolagem). Sem vão vazio depois.
      if (heroContent && y < vh) {
        const p = Math.min(1, Math.max(0, y / (vh * 0.6))); // progresso 0 → 1
        heroContent.style.opacity = String(1 - p);
        heroContent.style.transform =
          'translateY(' + (-p * 50).toFixed(1) + 'px) scale(' + (1 - p * 0.06).toFixed(3) + ')';
      }
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  // Lenis: scroll suavizado com inércia. Só ativa se o usuário não pediu
  // movimento reduzido e a lib carregou. Mantém o window.scroll sincronizado.
  if (!reduceMotion && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      lerp: 0.12,            // assenta um pouco mais rápido (menos "deriva")
      smoothWheel: true,
      wheelMultiplier: 0.8,  // cada giro da roda anda menos → menos overshoot
    });
    lenis.on('scroll', onScroll);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  onScroll();

  // Esconde a tela de carregamento quando tudo terminar de carregar.
  const loader = document.getElementById('loader');
  if (loader) {
    const MIN_VISIBLE = 900; // ms — tempo mínimo na tela p/ não "piscar"
    const start = performance.now();
    const hideLoader = () => {
      const wait = Math.max(0, MIN_VISIBLE - (performance.now() - start));
      setTimeout(() => loader.classList.add('is-hidden'), wait);
    };
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
      // Rede de segurança: nunca deixa o loader preso na tela.
      setTimeout(hideLoader, 3500);
    }
  }
})();

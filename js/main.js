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
  const setStatus = (online) => {
    liveDot.classList.remove('is-checking', 'is-online', 'is-offline');
    liveDot.classList.add(online ? 'is-online' : 'is-offline');
    liveDot.title = online ? 'AO VIVO agora' : 'Offline';
    if (liveMsg) {
      liveMsg.textContent = online
        ? '🎮 Tô AO VIVO agora! Cola na live e vem trocar ideia no chat!'
        : 'No momento estamos offline. Ative as notificações na Twitch e não perca a próxima live!';
    }
  };
  const checkLive = () => {
    fetch(`https://decapi.me/twitch/uptime/${canal}`, { cache: 'no-store' })
      .then((r) => r.text())
      .then((txt) => setStatus(!/offline/i.test(txt)))
      .catch(() => setStatus(false));
  };
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

  // Header reativo + indicador de scroll + parallax sutil no hero.
  const header = document.querySelector('.site-header');
  const scrollCue = document.querySelector('.scroll-cue');
  const heroBg = document.querySelector('.hero-bg');

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (scrollCue) scrollCue.classList.toggle('is-hidden', y > 60);
    if (heroBg && !reduceMotion && y < window.innerHeight) {
      heroBg.style.transform = 'translateY(' + (y * 0.18).toFixed(1) + 'px)';
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  onScroll();
})();

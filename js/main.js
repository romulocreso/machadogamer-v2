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

// ===== Carrossel de vídeos/clipes da Twitch =====
const carousel = document.getElementById('vodCarousel');
if (carousel) {
  // Usa o domínio atual como "parent" (funciona no GitHub Pages e em localhost)
  const PARENT = location.hostname || 'romulocreso.github.io';
  const CANAL_VIDEOS = 'https://www.twitch.tv/machadogameroficial/videos';

  const novoSlide = (html) => {
    const el = document.createElement('div');
    el.className = 'car-slide';
    el.innerHTML = html;
    return el;
  };

  const cardVazio = () => novoSlide(
    `<a class="vod-empty" href="${CANAL_VIDEOS}" target="_blank" rel="noopener">
       <span class="vod-empty-ic">🎬</span>
       <strong>Ver todos os vídeos</strong>
       <span>no canal da Twitch →</span>
     </a>`
  );

  fetch('data/twitch-videos.json', { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      const vids = (data && Array.isArray(data.videos)) ? data.videos : [];
      if (!vids.length) { carousel.appendChild(cardVazio()); return; }
      vids.forEach((v) => {
        const src = v.type === 'clip'
          ? `https://clips.twitch.tv/embed?clip=${encodeURIComponent(v.id)}&parent=${PARENT}&autoplay=false`
          : `https://player.twitch.tv/?video=${encodeURIComponent(v.id)}&parent=${PARENT}&autoplay=false`;
        carousel.appendChild(novoSlide(
          `<div class="vod-frame">
             <iframe src="${src}" title="${v.title || 'Vídeo da Twitch'}" allowfullscreen loading="lazy" scrolling="no"></iframe>
           </div>
           ${v.title ? `<p class="vod-title">${v.title}</p>` : ''}`
        ));
      });
    })
    .catch(() => { carousel.appendChild(cardVazio()); });

  // Setas de navegação (rolam ~1 card por clique)
  const passo = () => {
    const s = carousel.querySelector('.car-slide');
    return s ? s.getBoundingClientRect().width + 16 : 360;
  };
  const prev = document.getElementById('vodPrev');
  const next = document.getElementById('vodNext');
  if (prev) prev.addEventListener('click', () => carousel.scrollBy({ left: -passo(), behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => carousel.scrollBy({ left: passo(), behavior: 'smooth' }));
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

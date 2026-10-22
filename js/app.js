/* =========================================================
   影像档案 · 交互脚本
   渲染数据 / 筛选 / 视频弹层 / 图片灯箱 / 滚动出现
   ========================================================= */
(function () {
  'use strict';

  const data = window.PORTFOLIO_DATA || { videos: [], images: [] };
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  /* ---------- 滚动出现 ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  function watchReveal(el) {
    revealObserver.observe(el);
  }

  /* 首屏元素直接显示（无需滚动） */
  $$('.hero .reveal').forEach((el) => el.classList.add('visible'));

  /* ---------- 导航滚动状态 ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 视频卡片 ---------- */
  function videoCard(v) {
    const card = document.createElement('article');
    card.className = 'work-card tilt';
    card.dataset.category = v.category;
    card.style.setProperty('--from', v.cover.from);
    card.style.setProperty('--to', v.cover.to);
    card.style.setProperty('--tint', v.cover.tint);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', '播放 ' + v.title);

    card.innerHTML =
      '<div class="work-cover">' +
        '<span class="work-glyph">' + v.glyph + '</span>' +
        '<div class="work-hover"><span class="play-btn">▶</span></div>' +
      '</div>' +
      '<div class="work-info">' +
        '<h3>' + v.title + '</h3>' +
        '<p class="work-meta">' + v.category + ' · ' + v.year + '</p>' +
        '<p class="work-desc">' + v.description + '</p>' +
      '</div>';

    card.addEventListener('click', () => openVideo(v));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(v); }
    });
    return card;
  }

  const featuredGrid = $('#featured-grid');
  const videoGrid = $('#video-grid');

  data.videos.slice(0, 3).forEach((v) => featuredGrid.appendChild(videoCard(v)));

  const videoCards = [];
  data.videos.forEach((v) => {
    const c = videoCard(v);
    videoCards.push(c);
    videoGrid.appendChild(c);
  });

  /* ---------- 分类筛选 ---------- */
  const filtersEl = $('#filters');
  const categories = ['全部'].concat(
    Array.from(new Set(data.videos.map((v) => v.category)))
  );

  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
    btn.type = 'button';
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      $$('.filter-btn', filtersEl).forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      videoCards.forEach((card) => {
        const show = cat === '全部' || card.dataset.category === cat;
        card.classList.toggle('hidden', !show);
      });
    });
    filtersEl.appendChild(btn);
  });

  /* ---------- 视频弹层 ---------- */
  const modal = $('#video-modal');
  const modalVideo = $('#modal-video');
  const modalFallback = $('#modal-fallback');
  const modalTitle = $('#modal-title');
  const modalMeta = $('#modal-meta');

  function openVideo(v) {
    modalTitle.textContent = v.title;
    modalMeta.textContent = v.category + ' · ' + v.year;
    modalFallback.hidden = true;
    modalVideo.hidden = false;

    modalVideo.onerror = () => {
      modalVideo.hidden = true;
      modalFallback.hidden = false;
    };

    modalVideo.src = v.video;
    modalVideo.load();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const play = modalVideo.play();
    if (play && play.catch) play.catch(() => {});
    $('.modal-close', modal).focus();
  }

  function closeVideo() {
    modal.hidden = true;
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
  }

  $$('[data-close="video"]').forEach((el) => el.addEventListener('click', closeVideo));

  /* ---------- 图片卡片 ---------- */
  const imageGrid = $('#image-grid');
  const lights = [];

  data.images.forEach((img) => {
    const tile = document.createElement('div');
    tile.className = 'image-tile';
    tile.style.setProperty('--from', img.from);
    tile.style.setProperty('--to', img.to);
    tile.style.setProperty('--tint', img.tint);
    tile.setAttribute('role', 'button');
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('aria-label', '查看 ' + img.title);

    tile.innerHTML =
      '<div class="tile-art" style="aspect-ratio:' + img.ratio + '">' +
        '<span class="tile-glyph">' + img.glyph + '</span>' +
        '<img alt="" loading="lazy" style="display:none;width:100%;height:100%;object-fit:cover">' +
      '</div>' +
      '<div class="tile-info"><h4>' + img.title + '</h4><span>' + img.category + '</span></div>';

    const tileImg = $('img', tile);
    tileImg.src = img.src;
    tileImg.onerror = () => { tileImg.style.display = 'none'; };
    tileImg.onload = () => { tileImg.style.display = 'block'; };

    tile.addEventListener('click', () => openLightbox(lights.indexOf(tile)));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(lights.indexOf(tile)); }
    });

    lights.push(tile);
    imageGrid.appendChild(tile);
  });

  /* ---------- 灯箱 ---------- */
  const lightbox = $('#lightbox');
  const lbArt = $('#lb-art');
  const lbTitle = $('#lb-title');
  const lbDesc = $('#lb-desc');
  const lbCount = $('#lb-count');
  const lbPrev = $('#lb-prev');
  const lbNext = $('#lb-next');
  let lbIndex = 0;

  function openLightbox(index) {
    lbIndex = Math.max(0, Math.min(index, data.images.length - 1));
    renderLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function renderLightbox() {
    const img = data.images[lbIndex];
    const tile = lights[lbIndex];
    const tileImg = tile ? $('img', tile) : null;

    lbArt.style.setProperty('--from', img.from);
    lbArt.style.setProperty('--to', img.to);
    lbArt.style.setProperty('--tint', img.tint);
    lbArt.innerHTML = '<span class="lb-glyph">' + img.glyph + '</span>';

    const bigImg = document.createElement('img');
    bigImg.alt = img.title;
    bigImg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:none';
    bigImg.onload = () => { bigImg.style.display = 'block'; };
    bigImg.onerror = () => {};
    bigImg.src = img.src;
    if (tileImg && tileImg.style.display !== 'none') {
      bigImg.style.display = 'block';
    }
    lbArt.appendChild(bigImg);

    lbTitle.textContent = img.title;
    lbDesc.textContent = img.description;
    lbCount.textContent = String(lbIndex + 1).padStart(2, '0') + ' / ' + String(data.images.length).padStart(2, '0');
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function stepLightbox(delta) {
    lbIndex = (lbIndex + delta + data.images.length) % data.images.length;
    renderLightbox();
  }

  lbPrev.addEventListener('click', () => stepLightbox(-1));
  lbNext.addEventListener('click', () => stepLightbox(1));
  $$('[data-close="lb"]').forEach((el) => el.addEventListener('click', closeLightbox));

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') stepLightbox(-1);
    else if (e.key === 'ArrowRight') stepLightbox(1);
  });

  /* ---------- 滚动出现（动态渲染的元素） ---------- */
  $$('.section-head, .filters, .work-card, .image-tile, .about-body, .contact-body').forEach((el) => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    watchReveal(el);
  });

  /* ---------- 3D 倾斜 ---------- */
  $$('.tilt').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        'perspective(1000px) rotateX(' + (-py * 7).toFixed(2) + 'deg) rotateY(' +
        (px * 9).toFixed(2) + 'deg) translateY(-4px)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ---------- 首屏视差 ---------- */
  const heroScene = $('.hero-scene');
  if (heroScene && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroScene.style.transform = 'translateY(' + (y * 0.16).toFixed(1) + 'px)';
      }
    }, { passive: true });
  }

  /* ---------- 背景音乐（低音量，仅氛围） ---------- */
  const bgm = $('#bgm');
  const bgmToggle = $('#bgm-toggle');
  if (bgm && bgmToggle) {
    bgm.volume = 0.12;

    const setBgmState = (on) => {
      bgmToggle.classList.toggle('is-muted', !on);
      bgmToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    };

    const tryPlayBgm = () =>
      bgm.play().then(
        () => { setBgmState(true); return true; },
        () => { setBgmState(false); return false; }
      );

    bgmToggle.addEventListener('click', () => {
      if (bgm.paused) {
        localStorage.setItem('bgm-muted', '0');
        tryPlayBgm();
      } else {
        localStorage.setItem('bgm-muted', '1');
        bgm.pause();
        setBgmState(false);
      }
    });

    bgm.addEventListener('play', () => setBgmState(true));
    bgm.addEventListener('pause', () => setBgmState(false));

    // 浏览器禁止带声音自动播放：先尝试，失败则等用户第一次交互再播放
    if (localStorage.getItem('bgm-muted') !== '1') {
      tryPlayBgm().then((ok) => {
        if (!ok) {
          const resume = () => {
            if (localStorage.getItem('bgm-muted') !== '1') tryPlayBgm();
          };
          document.addEventListener('pointerdown', resume, { once: true });
          document.addEventListener('keydown', resume, { once: true });
        }
      });
    }
  }
})();

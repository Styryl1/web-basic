export const initHeaderBehavior = (): void => {
  if (typeof window === 'undefined') return;

  const header = document.querySelector('[data-ep-header]');
  if (!(header instanceof HTMLElement)) return;

  const menuButton = header.querySelector('[data-ep-menu-btn]');
  const mobilePanel = document.getElementById('mobile-nav');
  const panelCloseButton = header.querySelector('[data-ep-menu-close]');
  const closeTargets = header.querySelectorAll('[data-ep-menu-link], [data-ep-menu-close]');
  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const openMenuLabel = header.dataset.epMenuOpenLabel || 'Open menu';
  const closeMenuLabel = header.dataset.epMenuCloseLabel || 'Close menu';

  let menuOpen = false;
  let closeTimer: number | undefined;
  let lastScrollY = Math.max(window.scrollY, 0);
  let ticking = false;
  let refreshMarquees = (): void => {};
  let isDesktopViewport = window.innerWidth >= 1024;

  const setScrolled = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  const syncHeaderVisibility = () => {
    const currentScrollY = Math.max(window.scrollY, 0);
    const delta = currentScrollY - lastScrollY;
    const directionThreshold = 2;
    const hideThreshold = 120;

    setScrolled();

    if (menuOpen) {
      header.classList.remove('is-hidden');
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY <= 10) {
      header.classList.remove('is-hidden');
    } else if (delta > directionThreshold && currentScrollY > hideThreshold) {
      header.classList.add('is-hidden');
    } else if (delta < -directionThreshold) {
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
  };

  const closeMenu = () => {
    if (!(menuButton instanceof HTMLButtonElement) || !(mobilePanel instanceof HTMLElement)) return;
    if (!menuOpen) return;
    menuOpen = false;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', openMenuLabel);
    if (panelCloseButton instanceof HTMLButtonElement) {
      panelCloseButton.setAttribute('aria-expanded', 'false');
      panelCloseButton.setAttribute('aria-label', closeMenuLabel);
    }
    mobilePanel.style.opacity = '0';
    mobilePanel.style.transform = 'translateY(-8px)';
    document.body.style.removeProperty('overflow');
    if (closeTimer) window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      header.classList.remove('is-menu-open');
      mobilePanel.hidden = true;
    }, motionReduced ? 0 : 220);
  };

  const openMenu = () => {
    if (!(menuButton instanceof HTMLButtonElement) || !(mobilePanel instanceof HTMLElement)) return;
    if (menuOpen) return;
    if (closeTimer) window.clearTimeout(closeTimer);
    menuOpen = true;
    header.classList.add('is-menu-open');
    header.classList.remove('is-hidden');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', closeMenuLabel);
    if (panelCloseButton instanceof HTMLButtonElement) {
      panelCloseButton.setAttribute('aria-expanded', 'true');
      panelCloseButton.setAttribute('aria-label', closeMenuLabel);
    }
    mobilePanel.hidden = false;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => {
      mobilePanel.style.opacity = '1';
      mobilePanel.style.transform = 'translateY(0px)';
    });
  };

  if (menuButton instanceof HTMLButtonElement && mobilePanel instanceof HTMLElement) {
    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (menuOpen) closeMenu();
      else openMenu();
    });

    closeTargets.forEach((node) => {
      node.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  const marqueeTracks = Array.from(document.querySelectorAll('[data-biomarker-marquee]'))
    .map((node) => {
      if (!(node instanceof HTMLElement)) return null;
      return {
        node,
        speed: Number(node.dataset.marqueeSpeed || '36'),
        offset: Number(node.dataset.marqueeOffset || '0'),
        loopWidth: 0,
      };
    })
    .filter((item): item is { node: HTMLElement; speed: number; offset: number; loopWidth: number } => item !== null);

  if (marqueeTracks.length > 0 && !motionReduced) {
    let marqueeRaf = 0;
    let lastFrame = performance.now();
    let resizeObserver: ResizeObserver | undefined;

    const recalcWidths = () => {
      marqueeTracks.forEach((track) => {
        track.loopWidth = track.node.scrollWidth / 2;
        if (track.loopWidth > 0) {
          track.offset %= track.loopWidth;
        }
      });
    };

    const tickMarquee = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      marqueeTracks.forEach((track) => {
        if (!track.loopWidth) return;
        if (isDesktopViewport) {
          track.node.style.transform = 'translateX(0px)';
          return;
        }
        track.offset = (track.offset + track.speed * dt) % track.loopWidth;
        track.node.style.transform = `translateX(${-track.offset}px)`;
      });

      marqueeRaf = window.requestAnimationFrame(tickMarquee);
    };

    recalcWidths();
    marqueeRaf = window.requestAnimationFrame(tickMarquee);
    refreshMarquees = recalcWidths;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        recalcWidths();
      });
      marqueeTracks.forEach((track) => {
        resizeObserver?.observe(track.node);
      });
    }

    window.addEventListener('beforeunload', () => {
      if (marqueeRaf) window.cancelAnimationFrame(marqueeRaf);
      resizeObserver?.disconnect();
    });
  } else if (marqueeTracks.length > 0) {
    marqueeTracks.forEach((track) => {
      track.node.style.transform = 'translateX(0px)';
    });
  }

  syncHeaderVisibility();
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        syncHeaderVisibility();
        ticking = false;
      });
    },
    { passive: true },
  );
  window.addEventListener('resize', () => {
    isDesktopViewport = window.innerWidth >= 1024;
    refreshMarquees();
    syncHeaderVisibility();
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
};

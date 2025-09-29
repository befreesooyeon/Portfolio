// modal.js
import { portfolioData } from './data.js';
import { galleryData } from './galleryData.js';
import { renderProjectDetail } from './works-detail.js';

let currentGalleryIndex = -1;
let modalInited = false;
let currentProjectIndex = -1;

// 모달 내 스크롤 컨테이너 찾기
function getScroller() {
  const modal = document.getElementById('projectModal');
  if (!modal) return null;
  return (
    modal.querySelector('.modal-content .content') ||
    modal.querySelector('.modal-content') ||
    modal
  );
}

// 모달 스크롤 초기화
function resetModalScroll() {
  const scroller = getScroller();
  if (scroller) scroller.scrollTop = 0;
}

/* ---------- Modal Open ---------- */
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  modal.classList.add('active');
  const header = document.querySelector('header');
  if (header?.style) header.style.zIndex = 0;
  document.querySelector('.narrative-container')?.classList.add('modal-open');

  resetModalScroll();

  const content = modal.querySelector('.modal-content');

  if (content) {
    if (modalId === 'folderModal') {
      // 📂 작은 모달: scale + slide
      gsap.fromTo(
        content,
        { scale: 0.95, y: 20, opacity: 1 },
        { scale: 1, y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    } else if (modalId === 'photoModal') {
      // 🖼 포토 모달: zoom in
      gsap.fromTo(
        content,
        { scale: 1.05, opacity: 1 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      // 📌 풀사이즈 모달 (fortune/project): slide only
      gsap.fromTo(
        content,
        { y: 1920, opacity: 1 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }
}

/* ---------- Modal Close ---------- */
export function closeModal() {
  document.querySelectorAll('.modal-overlay.active').forEach(modal => {
    const content = modal.querySelector('.modal-content');

    if (content) {
      if (modal.id === 'folderModal') {
        // 📂 작은 모달
        gsap.to(content, {
          scale: 0.95,
          y: 20,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            modal.classList.remove('active');
            gsap.set(content, { clearProps: 'all' });
          }
        });
      } else if (modal.id === 'photoModal') {
        // 🖼 포토 모달
        gsap.to(content, {
          scale: 0.95,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            modal.classList.remove('active');
            gsap.set(content, { clearProps: 'all' });
          }
        });
      } else {
        // 📌 풀사이즈 모달 (fortune/project): slide only
        gsap.to(content, {
          y: 1920,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            modal.classList.remove('active');
            gsap.set(content, { clearProps: 'all' });
          }
        });
      }
    } else {
      modal.classList.remove('active');
    }
  });

  // 공통 처리
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.querySelector('.narrative-container')?.classList.remove('modal-open');
  const header = document.querySelector('header');
  if (header) header.style.zIndex = 10000;
  currentGalleryIndex = -1;

  resetModalScroll();

  if (window.ScrollTrigger) {
    const modal = document.getElementById('projectModal');
    const inModal = el => modal && modal.contains(el);
    ScrollTrigger.getAll().forEach(st => {
      if (inModal(st.trigger)) st.kill();
    });
    ScrollTrigger.refresh();
  }
}

/* ---------- Photo Modal ---------- */
function updatePhotoModal(galleryItem, index) {
  const modalContent = document.querySelector('#photoModal .content');
  currentGalleryIndex = index;
  if (!modalContent) return;

  const isDarkMode = document.body.classList.contains('dark-mode');
  const strokeColor = isDarkMode ? '#dbdbdb' : '#252525';

  modalContent.innerHTML = `
    <p class="modal-close-btn">CLOSE</p>
    <button class="modal-nav-btn modal-nav-prev" ${index === 0 ? 'disabled' : ''}>←</button>
    <button class="modal-nav-btn modal-nav-next" ${index === galleryData.length - 1 ? 'disabled' : ''}>→</button>
    <div class="modal-photo-wrapper">
      <img src="${galleryItem.image}" alt="${galleryItem.title}" class="modal-photo-image" />
    </div>
    <div class="modal-photo-info">
      <h3 class="modal-photo-title">${galleryItem.title}</h3>
      <p class="modal-photo-description">${galleryItem.description}</p>
    </div>
  `;
}

function navigateGallery(direction) {
  const newIndex = direction === 'prev' ? currentGalleryIndex - 1 : currentGalleryIndex + 1;
  if (newIndex >= 0 && newIndex < galleryData.length)
    updatePhotoModal(galleryData[newIndex], newIndex);
}

/* ---------- Project Detail ---------- */
function killModalScrollTriggers() {
  if (!window.ScrollTrigger) return;
  const scroller = getScroller();
  if (!scroller) return;
  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger && scroller.contains(st.trigger)) st.kill();
  });
}

function initProjectMediaScroll() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const scroller = getScroller();
  if (!scroller) return;

  killModalScrollTriggers();

  // 배너 이미지 패럴럭스
  const bannerImg = scroller.querySelector('.project-banner .project-banner-image');
  if (bannerImg) {
    gsap.set(bannerImg, { yPercent: -10, willChange: 'transform' });
    gsap.to(bannerImg, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: bannerImg.closest('.project-banner'),
        scroller,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 프로젝트 미디어 애니메이션
  scroller.querySelectorAll('.project-media').forEach(section => {
    const track = section.querySelector('.imgBoxSli');
    const box1 = track?.querySelector('.Box1');
    const box2 = track?.querySelector('.Box2');
    const title = section.querySelector('.categoryTit');
    const phoneM = section.querySelector('.phoneM');
    const phone1 = phoneM?.querySelector('.phone1');
    const phone2 = phoneM?.querySelector('.phone2');
    const phone3 = phoneM?.querySelector('.phone3');

    if (box1) gsap.set(box1, { xPercent: 0, willChange: 'transform' });
    if (box2) gsap.set(box2, { xPercent: 0, willChange: 'transform' });
    if (title) gsap.set(title, { xPercent: 0, willChange: 'transform', position: 'relative' });
    if (phoneM) gsap.set([phone1, phone2, phone3], { yPercent: 0, willChange: 'transform' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    if (box1) tl.to(box1, { xPercent: -50, ease: 'none' }, 0);
    if (box2) tl.to(box2, { xPercent: 50, ease: 'none' }, 0);
    if (title) tl.to(title, { xPercent: 100, ease: 'none' }, 0);

    if (phone1) tl.to(phone1, { yPercent: 20, ease: 'none' }, 0);
    if (phone2) tl.to(phone2, { yPercent: -10, ease: 'none' }, 0);
    if (phone3) tl.to(phone3, { yPercent: 20, ease: 'none' }, 0);

    const imgs = section.querySelectorAll('img');
    if (imgs.length) {
      const onSettled = () => ScrollTrigger.refresh();
      imgs.forEach(img => {
        if (img.complete) return;
        img.addEventListener('load', onSettled, { once: true });
        img.addEventListener('error', onSettled, { once: true });
      });
    }
  });

  // 공통 미디어 순차 등장
  const medias = scroller.querySelectorAll('.media-asset');
  if (medias.length) {
    gsap.set(medias, { opacity: 0, scale: 1.05, willChange: 'transform, opacity' });

    gsap.to(medias, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: scroller.querySelector('.project-detail-root'),
        scroller,
        start: 'top 80%',
        once: true
      }
    });
  }

  ScrollTrigger.refresh();
}

function updateProjectNavTitles(index) {
  const prevTitleEl = document.getElementById('prevTitle');
  const nextTitleEl = document.getElementById('nextTitle');
  if (!prevTitleEl || !nextTitleEl) return;

  const total = portfolioData.length;
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  prevTitleEl.textContent =
    portfolioData[prevIndex]?.navTitle || portfolioData[prevIndex]?.title || '';
  nextTitleEl.textContent =
    portfolioData[nextIndex]?.navTitle || portfolioData[nextIndex]?.title || '';
}

function mountProject(project) {
  const scroller = getScroller();
  if (!scroller) return;

  killModalScrollTriggers();

  scroller.querySelector('.project-detail')?.remove();
  const html = renderProjectDetail(project);
  const wrapper = document.createElement('div');
  wrapper.className = 'project-detail';
  wrapper.innerHTML = html;
  scroller.appendChild(wrapper);

  currentProjectIndex = portfolioData.findIndex(p => String(p.id) === String(project.id));
  resetModalScroll();
  updateProjectNavTitles(currentProjectIndex);

  requestAnimationFrame(() => {
    initProjectMediaScroll();
  });
}

/* ---------- Init Triggers ---------- */
export function initModalTriggers() {
  if (modalInited) return;
  modalInited = true;

  document.querySelector('.now .inner .folder-content')?.addEventListener('click', () =>
    openModal('folderModal')
  );

  document
    .querySelector('.fortune-trigger')
    ?.addEventListener('click', e => {
      e.preventDefault();
      openModal('fortuneModal');
    });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-close-btn')) {
      e.preventDefault();
      closeModal();
    }

    if (e.target.closest('.modal-nav-prev')) navigateGallery('prev');
    if (e.target.closest('.modal-nav-next')) navigateGallery('next');

    if (e.target.classList.contains('photo-view-btn')) {
      e.preventDefault();
      const title = e.target.getAttribute('data-title');
      const idx = galleryData.findIndex(item => item.title === title);
      if (idx !== -1) {
        updatePhotoModal(galleryData[idx], idx);
        openModal('photoModal');
      }
    }

    if (e.target.closest('.project-nav-prev')) {
      e.preventDefault();
      if (currentProjectIndex < 0) return;
      const total = portfolioData.length;
      const prevIndex = (currentProjectIndex - 1 + total) % total;
      mountProject(portfolioData[prevIndex]);
    }
    if (e.target.closest('.project-nav-next')) {
      e.preventDefault();
      if (currentProjectIndex < 0) return;
      const total = portfolioData.length;
      const nextIndex = (currentProjectIndex + 1) % total;
      mountProject(portfolioData[nextIndex]);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();

    const photoModal = document.getElementById('photoModal');
    if (photoModal?.classList.contains('active')) {
      if (e.key === 'ArrowLeft') navigateGallery('prev');
      if (e.key === 'ArrowRight') navigateGallery('next');
    }
  });

  document.querySelectorAll('.r').forEach(btn =>
    btn.addEventListener('click', closeModal)
  );
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });
  });

  const portfolioGrid = document.querySelector('.portfolio-grid');
  if (portfolioGrid) {
    portfolioGrid.addEventListener('click', e => {
      const card = e.target.closest('.card');
      if (!card) return;
      const id = String(card.dataset.id);
      const project = portfolioData.find(item => String(item.id) === id);
      if (!project) return;

      mountProject(project);
      openModal('projectModal');
    });
  }
}

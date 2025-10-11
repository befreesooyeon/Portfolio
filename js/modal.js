// modal.js
import { portfolioData } from './data.js';
import { galleryData } from './galleryData.js';
import { renderProjectDetail } from './works-detail.js';

let currentGalleryIndex = -1;
let modalInited = false;
let currentProjectIndex = -1;

/* -------------------- 공통 유틸 -------------------- */
function isDarkMode() {
return document.body.classList.contains('dark-mode');
}

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

function syncModalTheme() {
  const dark = isDarkMode();

  // ---- projectModal (배경 & 텍스트) ----
  const projectModal = document.getElementById('projectModal');
  if (projectModal?.classList.contains('active')) {
    const contentEl = projectModal.querySelector('.modal-content');
    if (contentEl) {
      contentEl.style.backgroundColor = dark ? '#000000' : '#f5f5f5';
    }

    // 텍스트 + 버튼 border 한 번에 선택
    const projectEls = projectModal.querySelectorAll(`
      .modal-content .content .project-visual .inner .bottom .project-text,
      .modal-content .content .project-overview .inner .project-text,
      .modal-content .content .project-block .project-list li,
      .modal-content .content .project-overview .project-block .project-quote,
      #projectModal .modal-content .content .project-overview .project-cta .btn.btn-ghost .btn-rotate
    `);

    projectEls.forEach(el => {
      if (el.classList.contains('btn-rotate')) {
        // 버튼 border-color
        el.style.setProperty('border-color', dark ? '#dbdbdb' : '#252525', 'important');
      } else {
        // 텍스트 color
        el.style.setProperty('color', dark ? '#999999' : '#666666', 'important');
      }
    });
  }

  // ---- photoModal (배경 투명 & 화살표 stroke) ----
  const photoModal = document.getElementById('photoModal');
  if (photoModal?.classList.contains('active')) {
    const photoContent = photoModal.querySelector('.modal-content');
    if (photoContent) {
      // 항상 투명 배경(요청사항) — 테마와 무관
      photoContent.style.backgroundColor = 'transparent';
    }

    // 네비게이션 버튼 색: currentColor 사용 + path stroke 동시 강제
    const arrowColor = dark ? '#dbdbdb' : '#252525';

    const navBtns = photoModal.querySelectorAll('.modal-nav-btn');
    navBtns.forEach(btn => {
      btn.style.setProperty('color', arrowColor, 'important');
    });

    const paths = photoModal.querySelectorAll('.modal-nav-btn svg path');
    paths.forEach(p => {
      p.setAttribute('stroke', arrowColor);
      p.style.setProperty('stroke', arrowColor, 'important');
    });
  }
}


const themeObserver = new MutationObserver(mutations => {
for (const m of mutations) {
  if (m.type === 'attributes' && m.attributeName === 'class' && m.target === document.body) {
    // 다크/라이트 전환 시, 열려 있는 모달에 즉시 반영
    syncModalTheme();
  }
}
});
themeObserver.observe(document.body, { attributes: true });



/* -------------------- Modal Open/Close -------------------- */
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

//  모달을 연 직후 테마 반영 (애니 끝나기 기다릴 필요 없음)
syncModalTheme();
// 혹시 GSAP가 중간에 값을 건드려도 한 프레임 뒤 다시 고정
requestAnimationFrame(syncModalTheme);
}

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

/* -------------------- Photo Modal -------------------- */
function updatePhotoModal(galleryItem, index) {
  const modalContent = document.querySelector('#photoModal .content');
  currentGalleryIndex = index;
  if (!modalContent) return;

  // =========================
  // 1️⃣ 모달 콘텐츠 생성
  // =========================
  modalContent.innerHTML = `
    <p class="modal-close-btn">CLOSE</p>

    <button class="modal-nav-btn modal-nav-prev" ${index === 0 ? 'disabled' : ''}>
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="36" viewBox="0 0 60 36" fill="none">
        <path d="M20 0.5C20 2.355 18.1675 5.125 16.3125 7.45C13.9275 10.45 11.0775 13.0675 7.81 15.065C5.36 16.5625 2.39 18 0 18
        C2.39 18 5.3625 19.4375 7.81 20.935C11.0775 22.935 13.9275 25.5525 16.3125 28.5475C18.1675 30.875 20 33.65 20 35.5
        M0 18L60 18" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    </button>

    <button class="modal-nav-btn modal-nav-next" ${index === galleryData.length - 1 ? 'disabled' : ''}>
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="36" viewBox="0 0 60 36" fill="none">
        <path d="M40 0.5C40 2.355 41.8325 5.125 43.6875 7.45C46.0725 10.45 48.9225 13.0675 52.19 15.065C54.64 16.5625 57.61 18 60 18
        C57.61 18 54.6375 19.4375 52.19 20.935C48.9225 22.935 46.0725 25.5525 43.6875 28.5475C41.8325 30.875 40 33.65 40 35.5
        M60 18L0 18" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    </button>

    <div class="modal-photo-wrapper">
      <img src="${galleryItem.image}" alt="${galleryItem.title}" class="modal-photo-image" />
    </div>

    <div class="modal-photo-info">
      <h3 class="modal-photo-title">${galleryItem.title}</h3>
      <p class="modal-photo-description">${galleryItem.description}</p>
    </div>
  `;

  // =========================
  // 2️⃣ 테마 동기화
  // =========================
  syncModalTheme();

  // =========================
  // 3️⃣ 버튼 이벤트 새로 등록
  // =========================
  const prevBtn = modalContent.querySelector(".modal-nav-prev");
  const nextBtn = modalContent.querySelector(".modal-nav-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      lastDirection = "prev";
      navigateGallery("prev");
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      lastDirection = "next";
      navigateGallery("next");
    });
  }

  // =========================
  // 4️⃣ GSAP 애니메이션
  // =========================
  const img = modalContent.querySelector(".modal-photo-image");
  const title = modalContent.querySelector(".modal-photo-title");
  const desc = modalContent.querySelector(".modal-photo-description");

  const direction = (typeof lastDirection !== "undefined") ? lastDirection : "next";
  const xDir = direction === "next" ? 100 : -100;

  gsap.set(img, { opacity: 0, x: xDir, filter: "blur(10px)" });
  gsap.set([title, desc], { opacity: 0, y: 40 });

  const tl = gsap.timeline();
  tl.to(img, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 0.9,
    ease: "power3.out"
  })
  .to(title, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.4")
  .to(desc, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.45");
}

function navigateGallery(direction) {
const newIndex = direction === 'prev' ? currentGalleryIndex - 1 : currentGalleryIndex + 1;
if (newIndex >= 0 && newIndex < galleryData.length)
  updatePhotoModal(galleryData[newIndex], newIndex);
}


/* -------------------- Project Detail -------------------- */
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

// 기존 상세 제거 후 새로 렌더링
scroller.querySelector('.project-detail')?.remove();
const html = renderProjectDetail(project);
const wrapper = document.createElement('div');
wrapper.className = 'project-detail';
wrapper.innerHTML = html;
scroller.appendChild(wrapper);

currentProjectIndex = portfolioData.findIndex(p => String(p.id) === String(project.id));
resetModalScroll();
updateProjectNavTitles(currentProjectIndex);

// 콘텐츠 교체 후에도 테마 재적용 (배경/텍스트)
syncModalTheme();

requestAnimationFrame(() => {
  initProjectMediaScroll();
});
}

/* -------------------- Init Triggers -------------------- */
export function initModalTriggers() {
if (modalInited) return;
modalInited = true;

// folder modal
document.querySelector('.now .inner .folder-content')?.addEventListener('click', () =>
  openModal('folderModal')
);

// fortune modal
document.querySelector('.fortune-trigger')?.addEventListener('click', e => {
  e.preventDefault();
  openModal('fortuneModal');
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-close-btn')) {
    e.preventDefault();
    closeModal();
    return;
  }

  if (e.target.closest('.modal-nav-prev')) navigateGallery('prev');
  if (e.target.closest('.modal-nav-next')) navigateGallery('next');

  // photo modal
  if (e.target.classList.contains('photo-view-btn')) {
    e.preventDefault();
    const title = e.target.getAttribute('data-title');
    const idx = galleryData.findIndex(item => item.title === title);
    if (idx !== -1) {
      updatePhotoModal(galleryData[idx], idx);
      openModal('photoModal'); // open 후에도 sync 호출됨
    }
    return;
  }

  // project modal 내부 네비
  if (e.target.closest('.project-nav-prev')) {
    e.preventDefault();
    if (currentProjectIndex < 0) return;
    const total = portfolioData.length;
    const prevIndex = (currentProjectIndex - 1 + total) % total;
    mountProject(portfolioData[prevIndex]);
    return;
  }
  if (e.target.closest('.project-nav-next')) {
    e.preventDefault();
    if (currentProjectIndex < 0) return;
    const total = portfolioData.length;
    const nextIndex = (currentProjectIndex + 1) % total;
    mountProject(portfolioData[nextIndex]);
    return;
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

// project modal: 카드 클릭으로 열기
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
  portfolioGrid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const id = String(card.dataset.id);
    const project = portfolioData.find(item => String(item.id) === id);
    if (!project) return;

    mountProject(project);
    openModal('projectModal'); // open 후에도 sync 호출됨
  });
}
}

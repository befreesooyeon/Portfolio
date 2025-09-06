// modal.js
import { portfolioData } from './data.js';
import { galleryData } from './galleryData.js';
import { renderProjectDetail } from './works-detail.js';

let currentGalleryIndex = -1;
let modalInited = false;
let currentProjectIndex = -1; // 현재 열린 프로젝트의 index (portfolioData 기준)

/* ---------- Modal: Open / Close ---------- */
export function openModal(modalId) {
const modal = document.getElementById(modalId);
if (!modal) return;
document.body.classList.add('modal-open');
document.body.style.overflow = 'hidden';
modal.classList.add('active');
const header = document.querySelector('header');
if (header) header.style.zIndex = 0;
document.querySelector('.narrative-container')?.classList.add('modal-open');
}

export function closeModal() {
document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
document.body.classList.remove('modal-open');
document.body.style.overflow = '';
document.querySelector('.narrative-container')?.classList.remove('modal-open');
const header = document.querySelector('header');
if (header) header.style.zIndex = 10000;
currentGalleryIndex = -1;

// GSAP 정리
if (window.ScrollTrigger) {
const modal = document.getElementById('projectModal');
const inModal = el => modal && modal.contains(el);
ScrollTrigger.getAll().forEach(st => { if (inModal(st.trigger)) st.kill(); });
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
<button class="modal-nav-btn modal-nav-prev" ${index === 0 ? 'disabled' : ''}>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M13.3333 8.33301C13.3333 9.56967 12.1117 11.4163 10.875 12.9663C9.285 14.9663 7.385 16.7113 5.20667 18.043C3.57333 19.0413 1.59333 19.9997 0 19.9997M0 19.9997C1.59333 19.9997 3.575 20.958 5.20667 21.9563C7.385 23.2897 9.285 25.0347 10.875 27.0313C12.1117 28.583 13.3333 30.433 13.3333 31.6663M0 19.9997L40 19.9997" stroke="${strokeColor}"/>
    </svg>
</button>
<button class="modal-nav-btn modal-nav-next" ${index === galleryData.length - 1 ? 'disabled' : ''}>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M26.6667 8.33301C26.6667 9.56967 27.8883 11.4163 29.125 12.9663C30.715 14.9663 32.615 16.7113 34.7933 18.043C36.4267 19.0413 38.4067 19.9997 40 19.9997M40 19.9997C38.4067 19.9997 36.425 20.958 34.7933 21.9563C32.615 23.2897 30.715 25.0347 29.125 27.0313C27.8883 29.084 26.6667 30.433 26.6667 31.6663M40 19.9997L0 19.9997" stroke="${strokeColor}"/>
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
}

function navigateGallery(direction) {
const newIndex = direction === 'prev' ? currentGalleryIndex - 1 : currentGalleryIndex + 1;
if (newIndex >= 0 && newIndex < galleryData.length) updatePhotoModal(galleryData[newIndex], newIndex);
}

/* ---------- Project Detail Mount & Helpers ---------- */
function getScroller() {
return document.querySelector('#projectModal .modal-content .content');
}

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

// 혹시 남아있는 트리거 정리
killModalScrollTriggers();

scroller.querySelectorAll('.project-media').forEach(section => {
const track  = section.querySelector('.imgBoxSli');
const box1   = track?.querySelector('.Box1');
const box2   = track?.querySelector('.Box2');
const title  = section.querySelector('.categoryTit');
const phoneM = section.querySelector('.phoneM');
const phone1 = phoneM?.querySelector('.phone1');
const phone2 = phoneM?.querySelector('.phone2');
const phone3 = phoneM?.querySelector('.phone3');

if (track && box1 && box2) {
    gsap.set(box1, { left: 0, right: 'auto' });
    gsap.set(box2, { right: 0, left: 'auto' });
    if (title) gsap.set(title, { left: 0 });

    gsap.timeline({
    scrollTrigger: { trigger: section, scroller, start: 'top top', end: 'bottom top', scrub: 1, invalidateOnRefresh: true }
    })
    .to(box1, { left: '-50%', ease: 'power2.in' }, 0)
    .to(box2, { right: '-50%', ease: 'power2.in' }, 0)
    .to(title, { left: '100%', ease: 'power2.in' }, 0);
}

if (phoneM) {
    gsap.set([phone1, phone2, phone3], { yPercent: 0, willChange: 'transform' });
    const tlPhones = gsap.timeline({
    scrollTrigger: { trigger: phoneM, scroller, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true }
    });
    if (phone1) tlPhones.to(phone1, { yPercent: 20, ease: 'power2.in' }, 0);
    if (phone2) tlPhones.to(phone2, { yPercent: -10, ease: 'power2.in' }, 0);
    if (phone3) tlPhones.to(phone3, { yPercent: 20, ease: 'power2.in' }, 0);
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

prevTitleEl.textContent = portfolioData[prevIndex]?.navTitle || portfolioData[prevIndex]?.title || '';
nextTitleEl.textContent = portfolioData[nextIndex]?.navTitle || portfolioData[nextIndex]?.title || '';
}

function mountProject(project) {
const scroller = getScroller();
if (!scroller) return;

// 기존 ScrollTrigger 정리
killModalScrollTriggers();

// 기존 내용 교체
const prev = scroller.querySelector('.project-detail-root');
if (prev) prev.remove();

const html = renderProjectDetail(project);
const wrapper = document.createElement('div');
wrapper.className = 'project-detail';
wrapper.innerHTML = html;
scroller.appendChild(wrapper);

// 현재 index 보관
currentProjectIndex = portfolioData.findIndex(p => String(p.id) === String(project.id));

// 스크롤 최상단으로 즉시 이동 (하단에서 시작 방지)
scroller.scrollTop = 0;

// 내비 타이틀 갱신
updateProjectNavTitles(currentProjectIndex);

// GSAP 재초기화
requestAnimationFrame(() => { initProjectMediaScroll(); });
}

/* ---------- Init Triggers ---------- */
export function initModalTriggers() {
if (modalInited) return;
modalInited = true;

// 폴더/포춘
document.querySelector('.now .inner .folder-content')?.addEventListener('click', () => openModal('folderModal'));
document.querySelector('.fortune-trigger')?.addEventListener('click', e => { e.preventDefault(); openModal('fortuneModal'); });

// 공통 위임
document.addEventListener('click', e => {
// 닫기
if (e.target.classList.contains('modal-close-btn')) { e.preventDefault(); closeModal(); }

// 포토 모달
if (e.target.closest('.modal-nav-prev')) navigateGallery('prev');
if (e.target.closest('.modal-nav-next')) navigateGallery('next');
if (e.target.classList.contains('photo-view-btn')) {
    e.preventDefault();
    const title = e.target.getAttribute('data-title');
    const idx = galleryData.findIndex(item => item.title === title);
    if (idx !== -1) { updatePhotoModal(galleryData[idx], idx); openModal('photoModal'); }
}

// 프로젝트 내비(prev/next) — 순환 이동 + 스크롤 0
if (e.target.closest('.project-nav-prev')) {
    e.preventDefault();
    if (currentProjectIndex < 0) return;
    const total = portfolioData.length;
    const prevIndex = (currentProjectIndex - 1 + total) % total;
    const project = portfolioData[prevIndex];
    mountProject(project);
}
if (e.target.closest('.project-nav-next')) {
    e.preventDefault();
    if (currentProjectIndex < 0) return;
    const total = portfolioData.length;
    const nextIndex = (currentProjectIndex + 1) % total;
    const project = portfolioData[nextIndex];
    mountProject(project);
}
});

// 키보드
document.addEventListener('keydown', e => {
if (e.key === 'Escape') closeModal();

const photoModal = document.getElementById('photoModal');
if (photoModal?.classList.contains('active')) {
    if (e.key === 'ArrowLeft') navigateGallery('prev');
    if (e.key === 'ArrowRight') navigateGallery('next');
}
});

// 닫기 바리에이션
document.querySelectorAll('.r').forEach(btn => btn.addEventListener('click', closeModal));
document.querySelectorAll('.modal-overlay').forEach(overlay => {
overlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
});

// 카드 클릭 → 프로젝트 모달 열기
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
portfolioGrid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const id = String(card.dataset.id);
    const project = portfolioData.find(item => String(item.id) === id);
    if (!project) return;

    // 그리기 + 상단으로 초기화 + 내비 갱신
    mountProject(project);
    openModal('projectModal');
});
}
}

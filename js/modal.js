// modal.js
import { portfolioData } from './data.js';
import { galleryData } from './galleryData.js';
import { renderProjectDetail } from './works-detail.js';

let currentGalleryIndex = -1;
let modalInited = false;
let currentProjectIndex = -1;

/* 공용: 모달 내 실제 스크롤 컨테이너 찾기 */
function getScroller() {
const modal = document.getElementById('projectModal');
if (!modal) return null;
// 보통 .content가 스크롤러지만, 프로젝트별 CSS에 따라 .modal-content가 스크롤러일 수도 있어 대비
return modal.querySelector('.modal-content .content')
    || modal.querySelector('.modal-content')
    || modal;
}

/* 공용: 모달 스크롤 리셋 */
function resetModalScroll() {
const scroller = getScroller();
if (scroller) scroller.scrollTop = 0;
}

/* ---------- Modal: Open / Close ---------- */
export function openModal(modalId) {
const modal = document.getElementById(modalId);
if (!modal) return;

document.body.classList.add('modal-open');
document.body.style.overflow = 'hidden';
modal.classList.add('active');
document.querySelector('header')?.style && (document.querySelector('header').style.zIndex = 0);
document.querySelector('.narrative-container')?.classList.add('modal-open');

// 모달 열 때 항상 최상단부터
resetModalScroll();
}

export function closeModal() {
document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
document.body.classList.remove('modal-open');
document.body.style.overflow = '';
document.querySelector('.narrative-container')?.classList.remove('modal-open');
const header = document.querySelector('header');
if (header) header.style.zIndex = 10000;
currentGalleryIndex = -1;

// 닫을 때도 스크롤 위치 초기화 (다음 열림 대비)
resetModalScroll();

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

// 기존 트리거 정리
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
    if (phone1) tlPhones.to(phone1, { yPercent: 20,  ease: 'power2.in' }, 0);
    if (phone2) tlPhones.to(phone2, { yPercent: -10, ease: 'power2.in' }, 0);
    if (phone3) tlPhones.to(phone3, { yPercent: 20,  ease: 'power2.in' }, 0);
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

// GSAP 정리
killModalScrollTriggers();

// 이전 내용 제거 후 새로 삽입
scroller.querySelector('.project-detail')?.remove();
const html = renderProjectDetail(project);
const wrapper = document.createElement('div');
wrapper.className = 'project-detail';
wrapper.innerHTML = html;
scroller.appendChild(wrapper);

// 현재 인덱스 기록
currentProjectIndex = portfolioData.findIndex(p => String(p.id) === String(project.id));

// 항상 최상단부터 시작 (핵심!)
resetModalScroll();

// 내비 타이틀 갱신
updateProjectNavTitles(currentProjectIndex);

// GSAP 다시 세팅
requestAnimationFrame(() => { initProjectMediaScroll(); });
}

/* ---------- Init Triggers ---------- */
export function initModalTriggers() {
if (modalInited) return;
modalInited = true;

document.querySelector('.now .inner .folder-content')
?.addEventListener('click', () => openModal('folderModal'));

document.querySelector('.fortune-trigger')
?.addEventListener('click', e => { e.preventDefault(); openModal('fortuneModal'); });

document.addEventListener('click', e => {
if (e.target.classList.contains('modal-close-btn')) { e.preventDefault(); closeModal(); }

if (e.target.closest('.modal-nav-prev')) navigateGallery('prev');
if (e.target.closest('.modal-nav-next')) navigateGallery('next');

if (e.target.classList.contains('photo-view-btn')) {
    e.preventDefault();
    const title = e.target.getAttribute('data-title');
    const idx = galleryData.findIndex(item => item.title === title);
    if (idx !== -1) { updatePhotoModal(galleryData[idx], idx); openModal('photoModal'); }
}

// 프로젝트 내비게이션 (순환)
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

document.querySelectorAll('.r').forEach(btn => btn.addEventListener('click', closeModal));
document.querySelectorAll('.modal-overlay').forEach(overlay => {
overlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
});

// 카드 클릭 → 프로젝트 모달
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
portfolioGrid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const id = String(card.dataset.id);
    const project = portfolioData.find(item => String(item.id) === id);
    if (!project) return;

    mountProject(project);    // 내용 먼저 그리고
    openModal('projectModal'); // 모달 열기
});
}
}

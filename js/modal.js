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
return modal.querySelector('.modal-content .content')
    || modal.querySelector('.modal-content')
    || modal;
}

// 모달 스크롤 초기화
function resetModalScroll() {
const scroller = getScroller();
if (scroller) scroller.scrollTop = 0;
}

/* ---------- Modal Open / Close ---------- */
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
}

export function closeModal() {
document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
document.body.classList.remove('modal-open');
document.body.style.overflow = '';
document.querySelector('.narrative-container')?.classList.remove('modal-open');
const header = document.querySelector('header');
if (header) header.style.zIndex = 10000;
currentGalleryIndex = -1;

resetModalScroll();

// GSAP 트리거 정리
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
    <path d="M13.3 8.3C13.3 9.6 12.1 11.4 10.9 13c-1.6 2-3.5 3.7-5.7 5  -1.6 1-3.6 2-5.2 2M0 20c1.6 0 3.6 1 5.2 2 2.2 1.3 4.1 3.1 5.7 5 1.2 1.6 2.4 3.4 2.4 4.7M0 20L40 20" stroke="${strokeColor}"/>
    </svg>
</button>
<button class="modal-nav-btn modal-nav-next" ${index === galleryData.length - 1 ? 'disabled' : ''}>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M26.7 8.3C26.7 9.6 27.9 11.4 29.1 13c1.6 2 3.5 3.7 5.7 5 1.6 1 3.6 2 5.2 2M40 20c-1.6 0-3.6 1-5.2 2-2.2 1.3-4.1 3.1-5.7 5-1.2 1.6-2.4 3.4-2.4 4.7M40 20L0 20" stroke="${strokeColor}"/>
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

killModalScrollTriggers();

// 배너 이미지 패럴럭스
const bannerImg = scroller.querySelector('.project-banner .project-banner-image');
if (bannerImg) {
gsap.set(bannerImg, { yPercent: -5, willChange: 'transform' });
gsap.to(bannerImg, {
yPercent: 5,
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

// 프로젝트 미디어 애니메이션 (좌우/상하 이동)
scroller.querySelectorAll('.project-media').forEach(section => {
const track  = section.querySelector('.imgBoxSli');
const box1   = track?.querySelector('.Box1');
const box2   = track?.querySelector('.Box2');
const title  = section.querySelector('.categoryTit');
const phoneM = section.querySelector('.phoneM');
const phone1 = phoneM?.querySelector('.phone1');
const phone2 = phoneM?.querySelector('.phone2');
const phone3 = phoneM?.querySelector('.phone3');

if (box1)  gsap.set(box1,  { xPercent: 0, willChange: 'transform' });
if (box2)  gsap.set(box2,  { xPercent: 0, willChange: 'transform' });
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

if (box1)  tl.to(box1,  { xPercent: -50, ease: 'none' }, 0);
if (box2)  tl.to(box2,  { xPercent:  50, ease: 'none' }, 0);
if (title) tl.to(title, { xPercent: 100, ease: 'none' }, 0);

if (phone1) tl.to(phone1, { yPercent:  20, ease: 'none' }, 0);
if (phone2) tl.to(phone2, { yPercent: -10, ease: 'none' }, 0);
if (phone3) tl.to(phone3, { yPercent:  20, ease: 'none' }, 0);

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

// 공통 미디어 순차 등장 (fade+scale, 모달 열릴 때 1회)
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

prevTitleEl.textContent = portfolioData[prevIndex]?.navTitle || portfolioData[prevIndex]?.title || '';
nextTitleEl.textContent = portfolioData[nextIndex]?.navTitle || portfolioData[nextIndex]?.title || '';
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

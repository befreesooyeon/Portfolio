// modal.js
import { portfolioData } from './data.js';
import { galleryData } from './galleryData.js';
import { renderProjectDetail } from './works-detail.js';

let currentGalleryIndex = -1;
let modalInited = false;

/* Modal: Open / Close */
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

if (window.ScrollTrigger) {
const modal = document.getElementById('projectModal');
const inModal = el => modal && modal.contains(el);
ScrollTrigger.getAll().forEach(st => { if (inModal(st.trigger)) st.kill(); });
ScrollTrigger.refresh();
}
}

/* Photo Modal */
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
    <path d="M26.6667 8.33301C26.6667 9.56967 27.8883 11.4163 29.125 12.9663C30.715 14.9663 32.615 16.7113 34.7933 18.043C36.4267 19.0413 38.4067 19.9997 40 19.9997M40 19.9997C38.4067 19.9997 36.425 20.958 34.7933 21.9563C32.615 23.2897 30.715 25.0347 29.125 27.0313C27.8883 28.583 26.6667 30.433 26.6667 31.6663M40 19.9997L0 19.9997" stroke="${strokeColor}"/>
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

/* Works / Project Detail Mount */
function mountProjectDetail(html) {
const content = document.querySelector('#projectModal .modal-content .content');
if (!content) return;
const prev = content.querySelector('.project-detail');
if (prev) prev.remove();
const wrapper = document.createElement('div');
wrapper.className = 'project-detail';
wrapper.innerHTML = html;
content.appendChild(wrapper);
}

/* GSAP: project-media (좌우 슬라이드 + 타이틀 + phone 상하 이동) */
function initProjectMediaScroll() {
if (!window.gsap || !window.ScrollTrigger) return;
gsap.registerPlugin(ScrollTrigger);

const scroller = document.querySelector('#projectModal .modal-content .content');
if (!scroller) return;

// cleanup
ScrollTrigger.getAll().forEach(st => {
if (st.trigger && scroller.contains(st.trigger)) st.kill();
});

scroller.querySelectorAll('.project-media').forEach(section => {
const track  = section.querySelector('.imgBoxSli');
const box1   = track?.querySelector('.Box1');
const box2   = track?.querySelector('.Box2');
const title  = section.querySelector('.categoryTit');
const phoneM = section.querySelector('.phoneM');
const phone1 = phoneM?.querySelector('.phone1');
const phone2 = phoneM?.querySelector('.phone2');
const phone3 = phoneM?.querySelector('.phone3');

// 좌우 슬라이드 + 타이틀
if (track && box1 && box2) {
    gsap.set(box1, { left: 0, right: 'auto' });
    gsap.set(box2, { right: 0, left: 'auto' });
    if (title) gsap.set(title, { left: 0 });

    gsap.timeline({
    scrollTrigger: { trigger: section, scroller, start: 'top top', end: 'bottom top', scrub: 1, invalidateOnRefresh: true }
    })
    .to(box1, { left: '-50%',  ease: 'power2.in' }, 0)
    .to(box2, { right: '-50%', ease: 'power2.in' }, 0)
    .to(title, { left: '100%',  ease: 'power2.in' }, 0);
}

// phoneM: y 0 → 스크롤 시 지정값으로 (섹션 내부에서만)
if (phoneM) {
    gsap.set([phone1, phone2, phone3], { yPercent: 0, willChange: 'transform' });

    const tlPhones = gsap.timeline({
    scrollTrigger: { trigger: phoneM, scroller, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true }
    });

    if (phone1) tlPhones.to(phone1, { yPercent: 10, ease: 'power2.in' }, 0); 
    if (phone2) tlPhones.to(phone2, { yPercent: -5,  ease: 'power2.in' }, 0); 
    if (phone3) tlPhones.to(phone3, { yPercent: 10, ease: 'power2.in' }, 0); 
}
});

ScrollTrigger.refresh();
}

/* Init Triggers */
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
    const id = Number(card.dataset.id);
    const project = portfolioData.find(item => Number(item.id) === id);
    if (!project) return;

    mountProjectDetail(renderProjectDetail(project));
    openModal('projectModal');

    requestAnimationFrame(() => { initProjectMediaScroll(); });
});
}
}

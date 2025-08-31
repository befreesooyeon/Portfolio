// modal.js

import { portfolioData } from './data.js';
import { galleryData } from './galleryData.js';
import { renderProjectDetail } from './works-detail.js';

let currentGalleryIndex = -1;

// ✅ 중복 초기화 방지 플래그
let modalInited = false;

export function openModal(modalId) {
const modal = document.getElementById(modalId);
const body = document.body;
const container = document.querySelector('.narrative-container');
const header = document.querySelector('header');

if (!modal) return;

modal.classList.add('active');
body.classList.add('modal-open');
container?.classList.add('modal-open');
if (header) header.style.zIndex = 0;
document.body.style.overflow = 'hidden';
}

export function closeModal() {
const modals = document.querySelectorAll('.modal-overlay');
const body = document.body;
const container = document.querySelector('.narrative-container');
const header = document.querySelector('header');

modals.forEach(modal => modal.classList.remove('active'));
body.classList.remove('modal-open');
container?.classList.remove('modal-open');
if (header) header.style.zIndex = 10000;
document.body.style.overflow = '';
currentGalleryIndex = -1;
}

function updatePhotoModal(galleryItem, index) {
const modalContent = document.querySelector('#photoModal .content');
currentGalleryIndex = index;

const isDarkMode = document.body.classList.contains('dark-mode');
const strokeColor = isDarkMode ? '#dbdbdb' : '#252525';

if (!modalContent) return;

modalContent.innerHTML = `
<p class="modal-close-btn">CLOSE</p>
<button class="modal-nav-btn modal-nav-prev" ${index === 0 ? 'disabled' : ''}>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M13.3333 8.33301C13.3333 9.56967 12.1117 11.4163 10.875 12.9663C9.285 14.9663 7.385 16.7113 5.20667 18.043C3.57333 19.0413 1.59333 19.9997 5.09966e-07 19.9997M5.09966e-07 19.9997C1.59333 19.9997 3.575 20.958 5.20667 21.9563C7.385 23.2897 9.285 25.0347 10.875 27.0313C12.1117 28.583 13.3333 30.433 13.3333 31.6663M5.09966e-07 19.9997L40 19.9997" stroke="${strokeColor}"/>
    </svg>
</button>
<button class="modal-nav-btn modal-nav-next" ${index === galleryData.length - 1 ? 'disabled' : ''}>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M26.6667 8.33301C26.6667 9.56967 27.8883 11.4163 29.125 12.9663C30.715 14.9663 32.615 16.7113 34.7933 18.043C36.4267 19.0413 38.4067 19.9997 40 19.9997M40 19.9997C38.4067 19.9997 36.425 20.958 34.7933 21.9563C32.615 23.2897 30.715 25.0347 29.125 27.0313C27.8883 28.583 26.6667 30.433 26.6667 31.6663M40 19.9997L4.43708e-07 19.9997" stroke="${strokeColor}"/>
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
if (newIndex >= 0 && newIndex < galleryData.length) {
updatePhotoModal(galleryData[newIndex], newIndex);
}
}

export function initModalTriggers() {
if (modalInited) return;
modalInited = true;

// 폴더 모달
const folderTrigger = document.querySelector('.now .inner .folder-content');
if (folderTrigger) {
folderTrigger.addEventListener('click', () => openModal('folderModal'));
}

// 포춘 모달
const fortuneTrigger = document.querySelector('.fortune-trigger');
if (fortuneTrigger) {
fortuneTrigger.addEventListener('click', e => {
    e.preventDefault();
    openModal('fortuneModal');
});
}

// 공통 이벤트 위임
document.addEventListener('click', e => {
// CLOSE 버튼
if (e.target.classList.contains('modal-close-btn')) {
    e.preventDefault();
    closeModal();
}

// 포토모달 네비게이션
if (e.target.closest('.modal-nav-prev')) navigateGallery('prev');
if (e.target.closest('.modal-nav-next')) navigateGallery('next');

// 갤러리 View 버튼
if (e.target.classList.contains('photo-view-btn')) {
    e.preventDefault();
    const title = e.target.getAttribute('data-title');
    const selectedIndex = galleryData.findIndex(item => item.title === title);
    if (selectedIndex !== -1) {
    updatePhotoModal(galleryData[selectedIndex], selectedIndex);
    openModal('photoModal');
    }
}
});

// 키보드 이벤트
document.addEventListener('keydown', e => {
if (e.key === 'Escape') closeModal();

// 포토모달이 활성화된 경우에만 방향키 동작
const photoModal = document.getElementById('photoModal');
if (photoModal && photoModal.classList.contains('active')) {
    if (e.key === 'ArrowLeft') navigateGallery('prev');
    if (e.key === 'ArrowRight') navigateGallery('next');
}
});

// 기존 닫기 이벤트들
document.querySelectorAll('.r').forEach(btn =>
btn.addEventListener('click', closeModal)
);

document.querySelectorAll('.modal-overlay').forEach(overlay =>
overlay.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
})
);

// ⭐ 포트폴리오 카드 → projectModal
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
portfolioGrid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;

    const id = Number(card.dataset.id);
    const project = portfolioData.find(item => Number(item.id) === id);
    if (!project) return;

    // ✅ 전역이 아니라, 모달 노드 안에서만 .content 선택 (스코프 고정)
    const modal = document.getElementById('projectModal');
    const modalInner = modal?.querySelector('.content');
    if (!modalInner) return;

    // CLOSE는 남기고 나머지 직계 자식만 제거
    Array.from(modalInner.children).forEach(el => {
    if (!el.classList.contains('modal-close-btn')) el.remove();
    });

    // 상세 내용 주입
    modalInner.insertAdjacentHTML('beforeend', renderProjectDetail(project));
    openModal('projectModal');
});
}
}

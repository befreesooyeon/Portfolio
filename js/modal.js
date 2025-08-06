// modal.js

// export function openModal(modalId) {
// const modal = document.getElementById(modalId);
// const body = document.body;
// const container = document.querySelector('.narrative-container');
// const header = document.querySelector('header');

// modal.classList.add('active');
// body.classList.add('modal-open');
// container.classList.add('modal-open');
// header.style.zIndex = 0;
// }

// export function closeModal() {
// const modals = document.querySelectorAll('.modal-overlay');
// const body = document.body;
// const container = document.querySelector('.narrative-container');
// const header = document.querySelector('header');

// modals.forEach(modal => modal.classList.remove('active'));
// body.classList.remove('modal-open');
// container.classList.remove('modal-open');
// header.style.zIndex = 10000;
// }

// export function initModalTriggers() {
// // 📌 폴더 모달 열기
// const folderTrigger = document.querySelector('.now .inner .folder-content');
// if (folderTrigger) {
// folderTrigger.addEventListener('click', () => openModal('folderModal'));
// }

// // 📌 포춘 모달 열기
// const fortuneTrigger = document.querySelector('.fortune-trigger');
// if (fortuneTrigger) {
// fortuneTrigger.addEventListener('click', e => {
//     e.preventDefault();
//     openModal('fortuneModal');
// });
// }

// // 📌 BACK 버튼 클릭 시 닫기 (포춘 모달)
// const fortuneBackBtn = document.querySelector('#fortuneModal .content a');
// if (fortuneBackBtn) {
// fortuneBackBtn.addEventListener('click', e => {
//     e.preventDefault();
//     closeModal();
// });
// }

// // 📌 빨간 닫기 버튼
// document.querySelectorAll('.r').forEach(btn =>
// btn.addEventListener('click', closeModal)
// );

// // 📌 오버레이 클릭 시 닫기
// document.querySelectorAll('.modal-overlay').forEach(overlay =>
// overlay.addEventListener('click', function (e) {
//     if (e.target === this) closeModal();
// })
// );

// // 📌 ESC 키로 닫기
// document.addEventListener('keydown', e => {
// if (e.key === 'Escape') closeModal();
// });
// }

import { portfolioData } from './data.js';

export function openModal(modalId) {
const modal = document.getElementById(modalId);
const body = document.body;
const container = document.querySelector('.narrative-container');
const header = document.querySelector('header');

modal.classList.add('active');
body.classList.add('modal-open');
container.classList.add('modal-open');
header.style.zIndex = 0;
}

export function closeModal() {
const modals = document.querySelectorAll('.modal-overlay');
const body = document.body;
const container = document.querySelector('.narrative-container');
const header = document.querySelector('header');

modals.forEach(modal => modal.classList.remove('active'));
body.classList.remove('modal-open');
container.classList.remove('modal-open');
header.style.zIndex = 10000;
}

export function initModalTriggers() {
// 📌 폴더 모달 열기
const folderTrigger = document.querySelector('.now .inner .folder-content');
if (folderTrigger) {
folderTrigger.addEventListener('click', () => openModal('folderModal'));
}

// 📌 포춘 모달 열기
const fortuneTrigger = document.querySelector('.fortune-trigger');
if (fortuneTrigger) {
fortuneTrigger.addEventListener('click', e => {
e.preventDefault();
openModal('fortuneModal');
});
}

// 📌 BACK 버튼 클릭 시 닫기 (포춘 모달)
const fortuneBackBtn = document.querySelector('#fortuneModal .content a');
if (fortuneBackBtn) {
fortuneBackBtn.addEventListener('click', e => {
e.preventDefault();
closeModal();
});
}

// 📌 빨간 닫기 버튼
document.querySelectorAll('.r').forEach(btn =>
btn.addEventListener('click', closeModal)
);

// 📌 오버레이 클릭 시 닫기
document.querySelectorAll('.modal-overlay').forEach(overlay =>
overlay.addEventListener('click', function (e) {
if (e.target === this) closeModal();
})
);

// 📌 ESC 키로 닫기
document.addEventListener('keydown', e => {
if (e.key === 'Escape') closeModal();
});

// ============================
// 📌 포트폴리오 카드 → projectModal 열기
// ============================
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
portfolioGrid.addEventListener('click', e => {
const card = e.target.closest('.card');
if (!card) return;

const id = card.dataset.id;
const project = portfolioData.find(item => item.id === id);
if (!project) return;

const modalInner = document.querySelector('#projectModal .modal-inner');
modalInner.innerHTML = `
<h2>${project.title}</h2>
<img src="${project.image}" alt="${project.title}">
<p>${project.description}</p>
`;

openModal('projectModal');
});
}
}

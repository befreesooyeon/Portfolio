// modal.js

// import { portfolioData } from './data.js';
// import { galleryData } from './galleryData.js';

// export function openModal(modalId) {
//     const modal = document.getElementById(modalId);
//     const body = document.body;
//     const container = document.querySelector('.narrative-container');
//     const header = document.querySelector('header');
    
//     modal.classList.add('active');
//     body.classList.add('modal-open');
//     container.classList.add('modal-open');
//     header.style.zIndex = 0;
// }

// export function closeModal() {
//     const modals = document.querySelectorAll('.modal-overlay');
//     const body = document.body;
//     const container = document.querySelector('.narrative-container');
//     const header = document.querySelector('header');
    
//     modals.forEach(modal => modal.classList.remove('active'));
//     body.classList.remove('modal-open');
//     container.classList.remove('modal-open');
//     header.style.zIndex = 10000;
// }

// function updatePhotoModal(galleryItem) {
//     const modalContent = document.querySelector('#photoModal .content');
    
//     modalContent.innerHTML = `
//         <p class="modal-close-btn">CLOSE</p>
//         <div class="modal-photo-wrapper">
//             <img src="${galleryItem.image}" alt="${galleryItem.title}" class="modal-photo-image" />
//         </div>
//         <div class="modal-photo-info">
//             <h3 class="modal-photo-title">${galleryItem.title}</h3>
//             <p class="modal-photo-description">${galleryItem.description}</p>
//         </div>
//     `;
// }

// export function initModalTriggers() {
//     // 폴더 모달
//     const folderTrigger = document.querySelector('.now .inner .folder-content');
//     if (folderTrigger) {
//         folderTrigger.addEventListener('click', () => openModal('folderModal'));
//     }

//     // 포춘 모달
//     const fortuneTrigger = document.querySelector('.fortune-trigger');
//     if (fortuneTrigger) {
//         fortuneTrigger.addEventListener('click', e => {
//             e.preventDefault();
//             openModal('fortuneModal');
//         });
//     }

//     // CLOSE 버튼 처리
//     document.addEventListener('click', e => {
//         if (e.target.classList.contains('modal-close-btn')) {
//             e.preventDefault();
//             closeModal();
//         }
//     });

//     // 빨간 닫기 버튼
//     document.querySelectorAll('.r').forEach(btn =>
//         btn.addEventListener('click', closeModal)
//     );

//     // 오버레이 클릭 닫기
//     document.querySelectorAll('.modal-overlay').forEach(overlay =>
//         overlay.addEventListener('click', function (e) {
//             if (e.target === this) closeModal();
//         })
//     );

//     // ESC 키 닫기
//     document.addEventListener('keydown', e => {
//         if (e.key === 'Escape') closeModal();
//     });

//     // 포트폴리오 카드 → projectModal
//     const portfolioGrid = document.querySelector('.portfolio-grid');
//     if (portfolioGrid) {
//         portfolioGrid.addEventListener('click', e => {
//             const card = e.target.closest('.card');
//             if (!card) return;

//             const id = card.dataset.id;
//             const project = portfolioData.find(item => item.id === id);
//             if (!project) return;

//             const modalInner = document.querySelector('#projectModal .modal-inner');
//             modalInner.innerHTML = `
//                 <h2>${project.title}</h2>
//                 <img src="${project.image}" alt="${project.title}">
//                 <p>${project.description}</p>
//             `;

//             openModal('projectModal');
//         });
//     }

//     // 갤러리 View 버튼 → photoModal
//     document.addEventListener('click', e => {
//         if (e.target.classList.contains('photo-view-btn')) {
//             e.preventDefault();
            
//             const title = e.target.getAttribute('data-title');
//             const selectedItem = galleryData.find(item => item.title === title);
            
//             if (selectedItem) {
//                 updatePhotoModal(selectedItem);
//                 openModal('photoModal');
//             }
//         }
//     });
// }

import { portfolioData } from './data.js';
import { galleryData } from './galleryData.js';

export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const body = document.body;
    const container = document.querySelector('.narrative-container');
    const header = document.querySelector('header');

    modal.classList.add('active');
    body.classList.add('modal-open');
    container.classList.add('modal-open');
    header.style.zIndex = 0;
    
    // 배경 스크롤 방지
    document.body.style.overflow = 'hidden';
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
    
    // 배경 스크롤 복원
    document.body.style.overflow = '';
}

function updatePhotoModal(galleryItem) {
    const modalContent = document.querySelector('#photoModal .content');
    
    modalContent.innerHTML = `
        <p class="modal-close-btn">CLOSE</p>
        <div class="modal-photo-wrapper">
            <img src="${galleryItem.image}" alt="${galleryItem.title}" class="modal-photo-image" />
        </div>
        <div class="modal-photo-info">
            <h3 class="modal-photo-title">${galleryItem.title}</h3>
            <p class="modal-photo-description">${galleryItem.description}</p>
        </div>
    `;
}

export function initModalTriggers() {
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
    
    // CLOSE 버튼 처리
    document.addEventListener('click', e => {
        if (e.target.classList.contains('modal-close-btn')) {
            e.preventDefault();
            closeModal();
        }
    });
    
    // 빨간 닫기 버튼
    document.querySelectorAll('.r').forEach(btn =>
        btn.addEventListener('click', closeModal)
    );
    
    // 오버레이 클릭 닫기
    document.querySelectorAll('.modal-overlay').forEach(overlay =>
        overlay.addEventListener('click', function (e) {
            if (e.target === this) closeModal();
        })
    );
    
    // ESC 키 닫기
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
    
    // 포트폴리오 카드 → projectModal
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
    
    // 갤러리 View 버튼 → photoModal
    document.addEventListener('click', e => {
        if (e.target.classList.contains('photo-view-btn')) {
            e.preventDefault();
            
            const title = e.target.getAttribute('data-title');
            const selectedItem = galleryData.find(item => item.title === title);
            
            if (selectedItem) {
                updatePhotoModal(selectedItem);
                openModal('photoModal');
            }
        }
    });
}
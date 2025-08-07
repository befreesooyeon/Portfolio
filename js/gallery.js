// gallery.js

import { galleryData } from './galleryData.js';

const galleryWrapper = document.querySelector('.gallery-wrapper');
let rotationTween;
let lastScrollY = 0;
let scrollTimeout;
let resizeTimer;

function createGallery() {
    const inner = document.querySelector('.my-photo .inner');
    const availableWidth = inner.getBoundingClientRect().width;
    const availableHeight = inner.getBoundingClientRect().height;
    const centerX = availableWidth / 2;
    const centerY = availableHeight * 0.85; // 더 아래로 이동 (85% 위치)

    const baseWidth = 1008;
    const scale = Math.min(availableWidth / baseWidth, 1);

    const baseRadius = 550;
    const radius = scale < 1 ? baseRadius * scale * 0.7 : baseRadius;
    const angleStep = 360 / galleryData.length;

    galleryData.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('gallery-card');
        
        card.innerHTML = `
            <div class="card-img">
                <img src="${item.image}" alt="${item.title}" />
                <div class="card-hover">
                    <button class="photo-view-btn" data-title="${item.title}">View</button>
                </div>
            </div>
            <div class="card-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        galleryWrapper.appendChild(card);
        
        const angle = angleStep * index - 90;
        const cardWidth = 348 * scale;
        const cardHeight = 450 * scale;
        const x = centerX + radius * Math.cos(angle * Math.PI / 180) - (cardWidth / 2);
        const y = centerY + radius * Math.sin(angle * Math.PI / 180) - (cardHeight / 2);
        
        gsap.set(card, { 
            x, 
            y, 
            rotation: angleStep * index,
            scale: scale,
            transformOrigin: "center center"
        });
    });

    gsap.set(galleryWrapper, {
        transformOrigin: `${centerX}px ${centerY}px`
    });

    rotationTween = gsap.to(galleryWrapper, {
        rotation: -360,
        duration: 120,
        ease: "none",
        repeat: -1
    });

    if (!window.scrollHandlerSetup) {
        setupScrollHandler();
        window.scrollHandlerSetup = true;
    }
}

function setupScrollHandler() {
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

        rotationTween.timeScale(scrollDirection === 'down' ? 50 : -50);
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            gsap.to(rotationTween, { timeScale: 1, duration: 1 });
        }, 300);
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

function handleResize() {
    if (rotationTween) rotationTween.kill();
    galleryWrapper.innerHTML = '';
    createGallery();
}

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
});

document.addEventListener('DOMContentLoaded', createGallery);
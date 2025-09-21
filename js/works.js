// works
import { portfolioData } from './data.js';
import { initFilters } from './filter.js';
import { initModalTriggers } from './modal.js';

const portfolioGrid = document.querySelector('.portfolio-grid');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentFilter = 'ALL';
let currentIndex = 6;
let currentData = portfolioData;

function renderThumbMedia(src, altText = '') {
if (!src) return '';
const ext = src.split('.').pop().toLowerCase();
const isVideo = ext === 'mp4' || ext === 'webm';
if (isVideo) {
return `<video src="${src}" autoplay muted loop playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;display:block;"></video>`;
}
return `<img src="${src}" alt="${altText}">`;
}

export function renderCards(data) {
portfolioGrid.innerHTML = data
.map(item => `
    <div class="card" data-category="${item.category}" data-id="${item.id}">
    <div class="thumbnail">
        ${renderThumbMedia(item.image, item.title)}
        <div class="icon-circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path d="M7.10682 18.3874L5.69261 16.9731L14.1779 8.48786H6.39971V6.47968H17.6003V17.6803H15.5921V9.90208L7.10682 18.3874Z" fill="#252525"/>
        </svg>
        </div>
    </div>
    <div class="card-content">
        <div class="tit">
        <h3>${item.title}</h3>
        <p>${item.category}</p>
        </div>
        <p class="description">${item.description}</p>
    </div>
    </div>
`)
.join('');

initModalTriggers?.();
}

export function updateLoadMoreButton(data, filter, shownCount) {
currentFilter = filter;
currentIndex = shownCount;
currentData = data;

if (data.length > shownCount) {
loadMoreBtn.style.display = 'inline-block'; // ⭐ display 고정
} else {
loadMoreBtn.style.display = 'none';
}
}

export function resetLoadState() {
currentIndex = 6;
}

document.addEventListener("DOMContentLoaded", () => {
renderCards(portfolioData.slice(0, 6));
updateLoadMoreButton(portfolioData, "ALL", 6);
initFilters();
});

loadMoreBtn.addEventListener('click', () => {
const nextItems = currentData.slice(currentIndex, currentIndex + 3);
const newHTML = nextItems
.map(item => `
    <div class="card" data-category="${item.category}" data-id="${item.id}">
    <div class="thumbnail">
        ${renderThumbMedia(item.image, item.title)}
        <div class="icon-circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path d="M7.10682 18.3874L5.69261 16.9731L14.1779 8.48786H6.39971V6.47968H17.6003V17.6803H15.5921V9.90208L7.10682 18.3874Z" fill="#252525"/>
        </svg>
        </div>
    </div>
    <div class="card-content">
        <div class="tit">
        <h3>${item.title}</h3>
        <p>${item.category}</p>
        </div>
        <p class="description">${item.description}</p>
    </div>
    </div>
`)
.join('');

portfolioGrid.insertAdjacentHTML('beforeend', newHTML);
currentIndex += 3;

if (currentIndex >= currentData.length) {
loadMoreBtn.style.display = 'none';
}
});

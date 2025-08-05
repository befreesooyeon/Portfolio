import { portfolioData } from './data.js';

// 예시: 첫 6개만 출력
const portfolioGrid = document.querySelector('.portfolio-grid');

function renderCards(data) {
const cardsHTML = data
.map(item => `
    <div class="card" data-category="${item.category}">
    <div class="thumbnail">
        <img src="${item.image}" alt="${item.title}">
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

portfolioGrid.innerHTML = cardsHTML;
}

// 초기 6개만 보여줌
renderCards(portfolioData.slice(0, 6));

import { portfolioData } from './data.js';
import { renderCards, resetVisibleCount } from './works.js';

export function initFilter() {
const filterItems = document.querySelectorAll('.filter-item');

filterItems.forEach(item => {
item.addEventListener('click', () => {
    const category = item.dataset.filter;

    document.querySelectorAll('.filter-item').forEach(btn =>
    btn.classList.remove('active')
    );
    item.classList.add('active');

    resetVisibleCount();

    const filtered = category === 'all'
    ? portfolioData
    : portfolioData.filter(work => work.category === category);

    renderCards(filtered);
});
});
}

// filter.js

import { portfolioData } from "./data.js";
import { renderCards, updateLoadMoreButton, resetLoadState } from "./works.js";

const filterItems = document.querySelectorAll(".filter-item");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentFilter = "ALL";

function getFilteredData() {
return currentFilter === "ALL"
? portfolioData
: portfolioData.filter(item => item.category === currentFilter);
}

export function initFilters() {
filterItems.forEach(item => {
item.addEventListener("click", () => {
    currentFilter = item.dataset.filter;
    filterItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const filteredData = getFilteredData();
    resetLoadState();
    renderCards(filteredData.slice(0, 6));
    updateLoadMoreButton(filteredData, currentFilter, 6);
});
});
}

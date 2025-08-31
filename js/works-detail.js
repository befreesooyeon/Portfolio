// works-detail.js
export function renderProjectDetail(project) {
const slot = (v) => (v ? v : '');
const list = (arr) =>
Array.isArray(arr) && arr.length
    ? arr.map((v) => `<li>${v}</li>`).join('')
    : '';

return `
<section class="project-visual">
    <div class="inner">  
    <div class="top">
    <p class="visual-left">${slot(project.viewLabel || 'WORKS - TAMBURINS')}</p>
    ${project.image ? `
    <div class="visual-media">
        <img class="visual-image" src="${slot(project.image)}" alt="${slot(project.title)}">
    </div>` : ''}
    <div class="visual-right">
    ${project.siteUrl 
        ? `<a class="visual-link" href="${project.siteUrl}" target="_blank" rel="noopener">(WEB SITE)</a>` 
        : `<p class="visual-label">(WEB SITE)</p>`}
    </div>
    </div>
    <div class="bottom">
    <div class="project-about-block">
        <h3 class="project-label">ABOUT</h3>
        <p class="project-text">${slot(project.about)}</p>
    </div>
    <div class="project-about-block">
        <h3 class="project-label">DATE</h3>
        <p class="project-text">${slot(project.aboutDate || project.date)}</p>
    </div>
    <div class="project-about-block">
        <h3 class="project-label">ROLE & CONTRIBUTION</h3>
        <p class="project-text">${slot(project.aboutRole || project.role)}</p>
    </div>
    <div class="project-about-block">
        <h3 class="project-label">CATEGORY</h3>
        <p class="project-text">${slot(project.aboutCategory || project.category)}</p>
    </div>
    </div>
    </section>

    <!-- 배너 -->
    ${project.bannerImage ? `
    <section class="project-banner">
    <img class="project-banner-image" src="${slot(project.bannerImage)}" alt="${slot(project.title)}">
    </section>` : ''}

    <!-- OVERVIEW -->
    ${(project.overview || project.overviewRoles?.length || project.overviewImpact?.length || project.overviewQuote) ? `
    <section class="project-overview">
    <h3 class="project-section-title">OVERVIEW-</h3>
    ${project.overview ? `<p class="project-text">${project.overview}</p>` : ''}

    <div class="project-overview-sub">
        ${project.overviewRoles?.length ? `
        <div class="project-block">
            <h4 class="project-sub-title">Role</h4>
            <ul class="project-list">${list(project.overviewRoles)}</ul>
        </div>` : ''}

        ${project.overviewImpact?.length ? `
        <div class="project-block">
            <h4 class="project-sub-title">Impact</h4>
            <ul class="project-list">${list(project.overviewImpact)}</ul>
        </div>` : ''}

        ${project.overviewQuote ? `
        <div class="project-block">
            <h4 class="project-sub-title">Quote</h4>
            <p class="project-quote">${project.overviewQuote}</p>
        </div>` : ''}
    </div>

    <div class="project-cta">
        ${project.figmaLink ? `<a class="btn btn-ghost" href="${project.figmaLink}" target="_blank" rel="noopener">FIGMA →</a>` : ''}
        ${project.pdfLink ? `<a class="btn btn-ghost" href="${project.pdfLink}" target="_blank" rel="noopener">PDF →</a>` : ''}
    </div>

    ${project.overviewImage ? `
    <div class="project-overview-media">
        <img class="project-overview-image" src="${project.overviewImage}" alt="${slot(project.title)}">
    </div>` : ''}
    </section>` : ''}

    <!-- SOLUTION -->
    ${(project.solution || project.solutionThumbs?.length || project.solutionHero) ? `
    <section class="project-solution">
    <h3 class="project-section-title">SOLUTION-</h3>
    ${project.solution ? `<p class="project-text">${project.solution}</p>` : ''}

    <div class="project-solution-grid">
        ${project.solutionThumbs?.length ? `
        <div class="project-solution-thumbs">
            ${project.solutionThumbs.map(src => `<img src="${src}" alt="">`).join('')}
        </div>` : ''}
        ${project.solutionHero ? `
        <div class="project-solution-hero">
            <img class="project-solution-image" src="${project.solutionHero}" alt="${slot(project.title)}">
        </div>` : ''}
    </div>
    </section>` : ''}

</div>
`;
}

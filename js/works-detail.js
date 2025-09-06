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
        <img class="visual-image" src="${slot(project.visualImg)}" alt="${slot(project.title)}">
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
    <div class="inner">
    <div class="info">
        <h3 class="project-section-title">OVERVIEW-</h3>

        ${Array.isArray(project.overview)
        ? project.overview.map(text => `<p class="project-text">${text}</p>`).join('')
        : (project.overview ? `<p class="project-text">${project.overview}</p>` : '')
        }

        <div class="project-sub">
        ${project.overviewRoles?.length ? `
        <div class="project-block">
            <h4 class="project-sub-title">➀ Role</h4>
            <ul class="project-list">${list(project.overviewRoles)}</ul>
        </div>` : ''}

        ${project.overviewImpact?.length ? `
        <div class="project-block">
            <h4 class="project-sub-title">➁ Impact</h4>
            <ul class="project-list">${list(project.overviewImpact)}</ul>
        </div>` : ''}

        ${project.overviewQuote ? `
        <div class="project-block">
            <h4 class="project-sub-title">➂ Quote</h4>
            <p class="project-quote">${project.overviewQuote}</p>
        </div>` : ''}
        </div>

        <div class="project-cta">
        ${project.figmaLink ? `
            <a class="btn btn-ghost" href="${project.figmaLink}" target="_blank" rel="noopener">
            <span class="btn-rotate"></span>
            <span class="btn-text">FIGMA →</span>
            </a>` : ''}

        ${project.BriefLink ? `
            <a class="btn btn-ghost" href="${project.BriefLink}" target="_blank" rel="noopener">
            <span class="btn-rotate"></span>
            <span class="btn-text">BRIEF →</span>
            </a>` : ''}
        </div>
        </div>

        ${project.overviewImage ? `
        <div class="project-overview-media">
        <img class="project-overview-image" src="${project.overviewImage}" alt="${slot(project.title)}">
        </div>` : ''}
    </div>
    </section>` : ''}


    <!-- SOLUTION -->
    ${(project.solution || project.solutionCollabo?.length || project.solutionTest?.length || project.solutionAchieve || project.solutionAddImg || project.solutionImage) ? `
    <section class="project-solution">
    <div class="inner">
    <div class="info">
    <h3 class="project-section-title">SOLUTION-</h3>

    <div class="project-sub">
    ${project.solutionCollabo?.length ? `
    <div class="project-block">
        <h4 class="project-sub-title">➀ Collaboration & Publishing</h4>
        <ul class="project-list">${list(project.solutionCollabo)}</ul>
    </div>` : ''}

    ${project.solutionTest?.length ? `
    <div class="project-block">
        <h4 class="project-sub-title">➁ Usability Test</h4>
        <ul class="project-list">${list(project.solutionTest)}</ul>
    </div>` : ''}

    ${project.solutionAchieve?.length ? `
        <div class="project-block">
            <h4 class="project-sub-title">➂ Achievements</h4>
            <ul class="project-list">${list(project.solutionAchieve)}</ul>
        </div>` : ''}
        </div>

    ${project.solutionAddImg ? `
        <div class="project-AddImg">
        <img class="add-image" src="${project.solutionAddImg1}" alt="${slot(project.title)}">
        <img class="add-image" src="${project.solutionAddImg2}" alt="${slot(project.title)}">
        <img class="add-image" src="${project.solutionAddImg3}" alt="${slot(project.title)}">
        </div>` : ''}
    </div>

    ${project.solutionImage ? `
        <div class="project-solution-media">
        <img class="project-solution-image" src="${project.solutionImage}" alt="${slot(project.title)}">
        </div>` : ''}
    </div>
    </section>` : ''}

    <!-- MEDIA -->
    ${(project.categoryTit || project.box1Imgs?.length || project.box2Imgs?.length || project.bannerImgt || project.phone1Img ||project.phone2Img || project.phone3Img) ? `
    <section class="project-media">
    <div class="inner">
    ${project.categoryTit ? `<h2 class="categoryTit">${slot(project.categoryTit)}</h2>` : ''}
    </div>

    ${(project.box1Imgs?.length || project.box2Imgs?.length) ? `
    <div class="imgBoxSli">
        ${project.box1Imgs?.length ? `
        <div class="Box1">
            ${project.box1Imgs.map(src => `
            <div class="imgItem"><img src="${src}" alt="${slot(project.title)}"></div>
            `).join('')}
        </div>` : ''}

        ${project.box2Imgs?.length ? `
        <div class="Box2">
            ${project.box2Imgs.map(src => `
            <div class="imgItem"><img src="${src}" alt="${slot(project.title)}"></div>
            `).join('')}
        </div>` : ''}
    </div>` : ''}


    ${project.bannerImgt ? `
    <div class="bannerImgt">
        <img src="${project.bannerImgt}" alt="${slot(project.title)}">
    </div>` : ''}


    ${(project.phone1Img || project.phone2Img || project.phone3Img) ? `
    <div class="phoneM">
        ${project.phone1Img ? `
        <div class="phone1">
        <img src="${project.phone1Img}" alt="${slot(project.title)}">
        </div>` : ''}

        ${project.phone2Img ? `
        <div class="phone2">
        <img src="${project.phone2Img}" alt="${slot(project.title)}">
        </div>` : ''}

        ${project.phone3Img ? `
        <div class="phone3">
        <img src="${project.phone3Img}" alt="${slot(project.title)}">
        </div>` : ''}
    </div>` : ''}

    <nav class="project-nav">
        <button type="button" class="project-nav-btn project-nav-prev" aria-label="Previous">‹</button>
        <button type="button" class="project-nav-btn project-nav-next" aria-label="Next">›</button>
    </nav>
    </section>` : ''}
</div>
`;
}
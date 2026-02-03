// works-detail.js
export function renderProjectDetail(project) {
const slot = (v) => (v ? v : '');
const list = (arr) =>
Array.isArray(arr) && arr.length
    ? arr.map((v) => `<li>${v}</li>`).join('')
    : '';

// 이미지/비디오 렌더링 처리
const renderMedia = (src, alt, className = '') => {
if (!src) return '';
const ext = src.split('.').pop().toLowerCase();
if (ext === 'mp4' || ext === 'webm') {
    return `<video class="media-asset ${className}" src="${slot(
    src
    )}" autoplay muted loop playsinline></video>`;
}
return `<img class="media-asset ${className}" src="${slot(
    src
)}" alt="${slot(alt)}">`;
};

// 비주얼 소스 선택 (visualImg > image)
const visualSrc = project.visualImg || project.image;

// id별 OVERVIEW + SOLUTION 타이틀 커스텀 매핑
const customTitles = {
    1: { 
    // Overview 제목
    role: '① Role & Project Type', 
    impact: '② Scope', 
    quote: '③ What I Did',
    // Solution 제목 추가
    solutionCollabo: '➀ Collaboration & Publishing',
    solutionTest: '➁ Interactive Design',  // 변경된 제목
    solutionAchieve: '➂ Key Learnings'     // 변경된 제목
    },
    // 필요 시 다른 id도 추가 가능
};

    // 프로젝트 id에 맞는 타이틀 가져오기 (없으면 기본값 사용)
const titles = customTitles[project.id] || {
role: '➀ Role',
impact: '➁ Impact',
quote: '➂ Quote',
// Solution 기본값 추가
solutionCollabo: '➀ Collaboration & Publishing',
solutionTest: '➁ Usability Test',
solutionAchieve: '➂ Achievements'
};

// SOLUTION 섹션에서 info를 숨길 id 모음
const hideSolutionInfoIds = ["2"];

return `
<div class="project-detail-root">

<!-- VISUAL -->
<section class="project-visual">
    <div class="inner">
    <div class="top">
        <p class="visual-left">${slot(project.viewLabel)}</p>

        ${
        visualSrc
            ? `
        <div class="visual-media">
        ${renderMedia(visualSrc, project.title, 'visual-media-asset')}
        </div>`
            : ''
        }

        <div class="visual-right">
        ${
            project.siteUrl
            ? `<a class="visual-link" href="${project.siteUrl}" target="_blank" rel="noopener">(WEB SITE)</a>`
            : `<p class="visual-label">(WEB SITE)</p>`
        }
        </div>
    </div>

    <div class="bottom">
        <div class="project-about-block"><h3 class="project-label">ABOUT</h3><p class="project-text">${slot(
        project.about
        )}</p></div>
        <div class="project-about-block"><h3 class="project-label">DATE</h3><p class="project-text">${slot(
        project.aboutDate || project.date
        )}</p></div>
        <div class="project-about-block"><h3 class="project-label">ROLE & CONTRIBUTION</h3><p class="project-text">${slot(
        project.aboutRole || project.role
        )}</p></div>
        <div class="project-about-block"><h3 class="project-label">CATEGORY</h3><p class="project-text">${slot(
        project.aboutCategory || project.category
        )}</p></div>
    </div>
    </div>
</section>

<!-- BANNER -->
${
    project.bannerImage
    ? `
<section class="project-banner">
    ${renderMedia(project.bannerImage, project.title, 'project-banner-image')}
</section>`
    : ''
}

<!-- OVERVIEW -->
${
    project.overview ||
    project.overviewRoles?.length ||
    project.overviewImpact?.length ||
    project.overviewQuote
    ? `
<section class="project-overview">
    <div class="inner">
    <div class="info">
        <h3 class="project-section-title">OVERVIEW-</h3>

        ${
        Array.isArray(project.overview)
            ? project.overview
                .map((text) => `<p class="project-text">${text}</p>`)
                .join('')
            : project.overview
            ? `<p class="project-text">${project.overview}</p>`
            : ''
        }

        <div class="project-sub">
        ${
            project.overviewRoles?.length
            ? `
        <div class="project-block">
            <h4 class="project-sub-title">${titles.role}</h4>
            <ul class="project-list">${list(project.overviewRoles)}</ul>
        </div>`
            : ''
        }

        ${
            project.overviewImpact?.length
            ? `
        <div class="project-block">
            <h4 class="project-sub-title">${titles.impact}</h4>
            <ul class="project-list">${list(project.overviewImpact)}</ul>
        </div>`
            : ''
        }

        ${
            project.overviewQuote
            ? `
        <div class="project-block">
            <h4 class="project-sub-title">${titles.quote}</h4>
            <ul class="project-list">${list(project.overviewQuote)}</ul>
        </div>`
            : ''
        }
        </div>

        <div class="project-cta">
        ${
            project.webLink
            ? `
        <a class="btn btn-ghost" href="${project.webLink}" target="_blank" rel="noopener">
            <span class="btn-rotate"></span><span class="btn-text">WEB →</span>
        </a>`
            : ''
        }

        ${
            project.figmaLink
            ? `
        <a class="btn btn-ghost" href="${project.figmaLink}" target="_blank" rel="noopener">
            <span class="btn-rotate"></span><span class="btn-text">FIGMA →</span>
        </a>`
            : ''
        }

        ${
            project.BriefLink
            ? `
        <a class="btn btn-ghost" href="${project.BriefLink}" target="_blank" rel="noopener">
            <span class="btn-rotate"></span><span class="btn-text">BRIEF →</span>
        </a>`
            : ''
        }
        </div>
    </div>

    ${
        project.overviewImage
        ? `
    <div class="project-overview-media">
        ${renderMedia(
        project.overviewImage,
        project.title,
        'project-overview-image'
        )}
    </div>`
        : ''
    }
    </div>
</section>`
    : ''
}

<!-- SOLUTION -->
${
    project.solution ||
    project.solutionCollabo?.length ||
    project.solutionTest?.length ||
    project.solutionAchieve ||
    project.solutionAddImg ||
    project.solutionImage
    ? `
<section class="project-solution">
    <div class="inner ${hideSolutionInfoIds.includes(project.id) ? 'no-info' : ''}">

    ${
        !hideSolutionInfoIds.includes(project.id)
        ? `
    <div class="info">
        <h3 class="project-section-title">SOLUTION-</h3>

        <div class="project-sub">
        ${
            project.solutionCollabo?.length
            ? `
        <div class="project-block">
            <h4 class="project-sub-title">${titles.solutionCollabo}</h4>
            <ul class="project-list">${list(project.solutionCollabo)}</ul>
        </div>`
            : ''
        }

        ${
            project.solutionTest?.length
            ? `
        <div class="project-block">
            <h4 class="project-sub-title">${titles.solutionTest}</h4>
            <ul class="project-list">${list(project.solutionTest)}</ul>
        </div>`
            : ''
        }

        ${
            project.solutionAchieve?.length
            ? `
        <div class="project-block">
            <h4 class="project-sub-title">${titles.solutionAchieve}</h4>
            <ul class="project-list">${list(project.solutionAchieve)}</ul>
        </div>`
            : ''
        }
        </div>

        ${
        project.solutionAddImg
            ? `
        <div class="project-AddImg">
        ${
            project.solutionAddImg1
            ? renderMedia(project.solutionAddImg1, project.title, 'add-image')
            : ''
        }
        ${
            project.solutionAddImg2
            ? renderMedia(project.solutionAddImg2, project.title, 'add-image')
            : ''
        }
        ${
            project.solutionAddImg3
            ? renderMedia(project.solutionAddImg3, project.title, 'add-image')
            : ''
        }
        </div>`
            : ''
        }
    </div>`
        : ''
    }

    ${
        project.solutionImage
        ? `
    <div class="project-solution-media">
        ${renderMedia(
        project.solutionImage,
        project.title,
        'project-solution-image'
        )}
    </div>`
        : ''
    }

    </div>
</section>`
    : ''
}

<!-- MEDIA -->
${
    project.categoryTit ||
    project.box1Imgs?.length ||
    project.box2Imgs?.length ||
    project.bannerImgt ||
    project.phone1Img ||
    project.phone2Img ||
    project.phone3Img
    ? `
<section class="project-media">
    <div class="inner">
    ${
        project.categoryTit
        ? `<h2 class="categoryTit">${slot(project.categoryTit)}</h2>`
        : ''
    }
    </div>

    ${
    project.box1Imgs?.length || project.box2Imgs?.length
        ? `
    <div class="imgBoxSli">
    ${
        project.box1Imgs?.length
        ? `
    <div class="Box1">
        ${project.box1Imgs
        .map((src) => `<div class="imgItem">${renderMedia(src, project.title)}</div>`)
        .join('')}
    </div>`
        : ''
    }

    ${
        project.box2Imgs?.length
        ? `
    <div class="Box2">
        ${project.box2Imgs
        .map((src) => `<div class="imgItem">${renderMedia(src, project.title)}</div>`)
        .join('')}
    </div>`
        : ''
    }
    </div>`
        : ''
    }

    ${
    project.bannerImgt
        ? `
    <div class="bannerImgt">
    ${renderMedia(project.bannerImgt, project.title)}
    </div>`
        : ''
    }

    ${
    project.phone1Img || project.phone2Img || project.phone3Img
        ? `
    <div class="phoneM">
    ${
        project.phone1Img
        ? `<div class="phone1">${renderMedia(
            project.phone1Img,
            project.title
            )}</div>`
        : ''
    }
    ${
        project.phone2Img
        ? `<div class="phone2">${renderMedia(
            project.phone2Img,
            project.title
            )}</div>`
        : ''
    }
    ${
        project.phone3Img
        ? `<div class="phone3">${renderMedia(
            project.phone3Img,
            project.title
            )}</div>`
        : ''
    }
    </div>`
        : ''
    }
    <!-- Prev / Next Navigation -->
    <nav class="project-nav">
    <div class="project-nav-prev">
        <span class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
            <g clip-path="url(#clip0_prev)">
            <path d="M13.3333 8.83398C13.3333 10.0707 12.1117 11.9173 10.875 13.4673C9.285 15.4673 7.385 17.2123 5.20667 18.544C3.57333 19.5423 1.59333 20.5007 0 20.5007M0 20.5007C1.59333 20.5007 3.575 21.459 5.20667 22.4573C7.385 23.7907 9.285 25.5357 10.875 27.5323C12.1117 29.084 13.3333 30.934 13.3333 32.1673M0 20.5007L40 20.5006" stroke="#252525"/>
            </g>
            <defs>
            <clipPath id="clip0_prev">
                <rect width="40" height="40" fill="white" transform="matrix(0 1 1 0 0 0.5)"/>
            </clipPath>
            </defs>
        </svg>
        </span>
        <div class="label">
        <p class="nav-type">PREVIOUS</p>
        <p class="nav-title" id="prevTitle"></p>
        </div>
    </div>

    <div class="project-nav-next">
        <div class="label">
        <p class="nav-type">NEXT</p>
        <p class="nav-title" id="nextTitle"></p>
        </div>
        <span class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
            <g clip-path="url(#clip0_next)">
            <path d="M26.6667 8.83398C26.6667 10.0707 27.8883 11.9173 29.125 13.4673C30.715 15.4673 32.615 17.2123 34.7933 18.544C36.4267 19.5423 38.4067 20.5007 40 20.5007M40 20.5007C38.4067 20.5007 36.425 21.459 34.7933 22.4573C32.615 23.7907 30.715 25.5357 29.125 27.5323C27.8883 29.084 26.6667 30.934 26.6667 32.1673M40 20.5007L0 20.5006" stroke="#252525"/>
            </g>
            <defs>
            <clipPath id="clip0_next">
                <rect width="40" height="40" fill="white" transform="translate(40 0.5) rotate(90)"/>
            </clipPath>
            </defs>
        </svg>
        </span>
    </div>
    </nav>
</section>`
    : ''
}

</div>
`;
}

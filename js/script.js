//  script.js
document.addEventListener("DOMContentLoaded", () => {
  const gnb = document.querySelector('.gnb-c');
  const highlight = gnb.querySelector('.highlight');
  const gnbLinks = gnb.querySelectorAll('a');
  const padX = 8;
  let activeLink = null;
  let lastScrollY = window.scrollY;

  // 부드러운 스크롤
  function smoothScrollTo(targetY, duration = 1, ease = "power2.inOut") {
    gsap.to(window, { scrollTo: targetY, duration, ease });
  }

  function handleAnchorClick(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      let targetY;
      const headerOffset = 130;
      if (targetId === '#home') targetY = 0;
      else if (targetId === '#footer') targetY = document.documentElement.scrollHeight - window.innerHeight;
      else {
        const target = document.querySelector(targetId);
        if (!target) return;
        targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      }
      smoothScrollTo(targetY);
    }
  }

  function moveHighlightTo(link, speedFactor = 1) {
    if (!link || !highlight) return;
    const gnbRect = gnb.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const linkLeft = linkRect.left - gnbRect.left;
    const linkWidth = linkRect.width;

    gsap.to(highlight, {
      left: linkLeft - padX,
      width: linkWidth + padX * 2,
      duration: 0.3 / speedFactor,
      ease: speedFactor > 1 ? "elastic.out(1, 0.5)" : "power2.out"
    });
  }

  function setActiveLink(link, speedFactor = 1) {
    if (!link) return;
    gnbLinks.forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    activeLink = link;
    applyLinkColors();
    moveHighlightTo(link, speedFactor);
  }

  if (gnbLinks.length > 0) {
    activeLink = gnbLinks[0];
    setTimeout(() => setActiveLink(activeLink), 100);
  }

  gnbLinks.forEach(link => link.addEventListener('mouseenter', () => moveHighlightTo(link)));
  gnb.addEventListener('mouseleave', () => activeLink && moveHighlightTo(activeLink));

  gnbLinks.forEach(link => link.addEventListener('click', e => { setActiveLink(link); handleAnchorClick(e, link); }));

  const sections = [
    { link: Array.from(gnbLinks).find(link => link.getAttribute('href') === '#home'), section: document.querySelector('#home') },
    { link: Array.from(gnbLinks).find(link => link.getAttribute('href') === '#about'), section: document.querySelector('#about') },
    { link: Array.from(gnbLinks).find(link => link.getAttribute('href') === '#works'), section: document.querySelector('#works') }
  ].filter(item => item.link && item.section);

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      const headerOffset = 140;
      const scrollSpeed = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      const speedFactor = Math.min(Math.max(scrollSpeed / 50, 1), 3);
      let current = null;

      if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        current = Array.from(gnbLinks).find(link => link.getAttribute('href') === '#footer');
      } else {
        for (const { link, section } of sections.reverse()) {
          if (scrollY >= section.offsetTop - headerOffset) {
            current = link;
            break;
          }
        }
        sections.reverse();
      }

      if (current && current !== activeLink) setActiveLink(current, speedFactor);
    }, 10);
  });

  window.addEventListener('resize', () => setTimeout(() => activeLink && moveHighlightTo(activeLink), 100));

  document.querySelectorAll('a[href^="#"]:not(.gnb-c a)').forEach(link =>
    link.addEventListener('click', e => handleAnchorClick(e, link))
  );

  // -----------------------------
  // 🎨 다크/라이트 모드
  // -----------------------------
  function applyLinkColors() {
    const isDark = document.body.classList.contains('dark-mode');
    gnbLinks.forEach(a => a.style.color = isDark ? "#dbdbdb" : "#252525");
    if (activeLink) activeLink.style.color = isDark ? "#252525" : "#ffffff";
  }

const themeAnimationConfig = {
  dark: {
    buttonText: 'DARK',
    animations: [
      ["body", { backgroundColor: "#f5f5f5", color: "#dbdbdb" }],
      [".wrap", { backgroundColor: "#000", color: "#dbdbdb" }],

      ["#themeToggle span", { backgroundColor: "#dbdbdb", scale: 1.3, yoyo: true, repeat: 1, duration: 0.2 }],

      [".section-light", { backgroundColor: "#f5f5f5" }],
      [".section-dark", { backgroundColor: "#000000", color: "#dbdbdb" }],
      [".text-dark", { color: "#dbdbdb" }],
      ["#projectModal .modal-content", { backgroundColor: "#000000", }],
      ["#fortuneModal .modal-content", { backgroundColor: "#000000", }],
      
      

      // SVG
      ["svg path", { fill: "#dbdbdb", stroke: "#dbdbdb" }],
      ["header .innerHeader .gnb-r ul li a svg path, .about .inner .profile .left a svg path", { fill: "#dbdbdb", stroke: "#dbdbdb" }],
      [".tooltip-tail path", { fill: "#4A6CF7", stroke: "none" }],
      [".orizin .inner .orizin-marquee .o-marquee .marquee-track .content1 .icon1 path, .works .title svg path, .footer .inner .footer-bottom .footer-spin path", { fill: "#B7D3C6", stroke: "#B7D3C6" }],
      [".orizin .inner .orizin-marquee .o-marquee .marquee-track .content2 .icon path", { fill: "none", stroke: "#dbdbdb" }],
      [".about .inner .contents .box .grid .title .skill-icon svg path", { fill: "none", stroke: "#dbdbdb" }],
      [".about .inner .contents .box .accordion-list .accordion-item .accordion-icon path, .works .inner .portfolio-grid .card .thumbnail .icon-circle svg path", { fill: "#dbdbdb", stroke: "none" }],
      [".about .inner .profile .left .resume:hover svg path", { fill: "#dbdbdb", stroke: "none" }],
      ["#photoModal .modal-nav-btn svg path", {stroke: "#dbdbdb" }],
      

      
      // Borders
      ["header .innerHeader .gnb-c", { borderColor: "#dbdbdb" }],
      ["header .innerHeader .gnb-r ul li", { borderColor: "#dbdbdb" }],
      [".orizin .inner .orizin-marquee .o-marquee", { borderColor: "#dbdbdb" }],
      [".become .inner .left .tit .point", { borderColor: "#dbdbdb" }],
      [".become .inner .right img", { borderColor: "#dbdbdb" }],
      [".keyWords .textWrap .line3", { borderColor: "#dbdbdb" }],
      [".marquee", { borderColor: "#dbdbdb" }],
      [".about .inner .profile .left .info span, .about .inner .profile .left a ", { borderColor: "#dbdbdb" }],
      [".about .inner .contents .box ", { borderColor: "#dbdbdb" }],
      [".about .inner .contents .box .list li, .about .inner .contents .box .accordion-list .accordion-item  ", { borderColor: "#dbdbdb" }],
      [".works .inner .filter-wrapper .filter-navigation, #loadMoreBtn", { borderColor: "#dbdbdb" }],
      [".my-photo .inner .text-wrap a", { borderColor: "#dbdbdb", backgroundColor: "#000000" }],
      [".footer .inner .footer-meta", { borderColor: "#252525"}],
      ["#projectModal .modal-content .content .project-overview .project-cta .btn.btn-ghost .btn-rotate", { borderColor: "#dbdbdb"}],
      ["#fortuneModal .modal-content .content .select-btn", { borderColor: "#dbdbdb"}],


      // Highlights / Buttons
      ["header .innerHeader .gnb-c .highlight", { backgroundColor: "#d4d4d4" }],
      ["header .innerHeader .gnb-r ul li a span", { backgroundColor: "#dbdbdb" }],
      [".narrative .scroll-btn", { backgroundColor: "#000000", borderColor: "#dbdbdb" }],
      [".narrative .scroll-btn svg path", { fill: "none", stroke: "#dbdbdb" }],
      [".orizin .inner .orizin-marquee .o-marquee svg", { fill: "none", stroke: "#dbdbdb" }],
      [".keyWords .textWrap .line-divider", { backgroundColor: "#dbdbdb" }],
      ["header .innerHeader .gnb-r ul li a .icon-wrap path, .about .inner .profile .left a svg path", { fill: "#dbdbdb", stroke: "none" }],
      [".works .inner .portfolio-grid .card .thumbnail .icon-circle", {backgroundColor: "#000000"}],


      // Text
      [".visual .subText .copyright, .now .inner .left .folder .folder-content .textBox", { color: "#999999" }],
      [".works .inner .portfolio-grid .card .card-content .tit p, .works .inner .portfolio-grid .card .card-content .description", { color: "#999999" }],
      [".gallery-card .card-info", { color: "#f5f5f5"}],
      [".gallery-card .card-info p", { color: "#dbdbdb"}],
      [".footer", { color: "#252525", backgroundColor: "#dbdbdb"}],
      // [".fill-btn span", {color: "#dbdbdb"}],
      ["#projectModal .modal-content .content .project-visual .inner .bottom .project-text", "#projectModal .modal-content .content .project-overview .inner .project-text", {color: "#666666"}],,

    ]
  },

  light: {
    buttonText: 'LIGHT',
    animations: [
      ["body", { backgroundColor: "#000000", color: "#252525" }],
      [".wrap", { backgroundColor: "#f5f5f5", color: "#252525" }],

      ["#themeToggle span", { backgroundColor: "#000", scale: 1.3, yoyo: true, repeat: 1, duration: 0.2 }],

      [".section-light", { backgroundColor: "#f5f5f5" }],
      [".section-dark", { backgroundColor: "#000000", color: "#dbdbdb" }],
      [".text-dark", { color: "#252525" }],
      ["#projectModal .modal-content", { backgroundColor: "#f5f5f5", }],
      ["#fortuneModal .modal-content", { backgroundColor: "#f5f5f5", }],

      // SVG
      ["svg path", { fill: "#252525", stroke: "#252525" }],
      ["header .innerHeader .gnb-r ul li a svg path, .about .inner .profile .left a svg path", { fill: "#252525", stroke: "#252525" }],
      [".tooltip-tail path", { fill: "#4A6CF7", stroke: "none" }],
      [".orizin .inner .orizin-marquee .o-marquee .marquee-track .content1 .icon1 path, .works .title svg path, .footer .inner .footer-bottom .footer-spin path", { fill: "#B7D3C6", stroke: "#B7D3C6" }],
      [".orizin .inner .orizin-marquee .o-marquee .marquee-track .content2 .icon path", { fill: "none", stroke: "#252525" }],
      [".about .inner .contents .box .grid .title .skill-icon svg path", { fill: "none", stroke: "#252525" }],
      [".about .inner .contents .box .accordion-list .accordion-item .accordion-icon path, .works .inner .portfolio-grid .card .thumbnail .icon-circle svg path", { fill: "#252525", stroke: "none" }],

      
      ["#photoModal .modal-nav-btn svg path", {stroke: "#252525" }],
      

      // Borders
      ["header .innerHeader .gnb-c", { borderColor: "#252525" }],
      ["header .innerHeader .gnb-r ul li", { borderColor: "#252525" }],
      [".orizin .inner .orizin-marquee .o-marquee", { borderColor: "#252525" }],
      [".become .inner .left .tit .point", { borderColor: "#252525" }],
      [".become .inner .right img", { borderColor: "#252525" }],
      [".keyWords .textWrap .line3", { borderColor: "#252525" }],
      [".marquee", { borderColor: "#252525" }],
      [".about .inner .profile .left .info span, .about .inner .profile .left a ", { borderColor: "#252525" }],
      [".about .inner .contents .box ", { borderColor: "#252525" }],
      [".about .inner .contents .box .list li, .about .inner .contents .box .accordion-list .accordion-item  ", { borderColor: "#252525" }],
      [".works .inner .filter-wrapper .filter-navigation, #loadMoreBtn", { borderColor: "#252525" }],
      [".my-photo .inner .text-wrap a", { borderColor: "#252525", backgroundColor: "#f5f5f5" }],
      [".footer .inner .footer-meta", { borderColor: "#dbdbdb"}], 
      ["#projectModal .modal-content .content .project-overview .project-cta .btn.btn-ghost .btn-rotate", { borderColor: "#252525"}],
      ["#fortuneModal .modal-content .content .select-btn", { borderColor: "#252525"}],

      // Highlights / Buttons
      ["header .innerHeader .gnb-c .highlight", { backgroundColor: "#d4d4d4" }],
      ["header .innerHeader .gnb-r ul li a span", { backgroundColor: "#000000" }],
      [".narrative .scroll-btn", { backgroundColor: "#f5f5f5", borderColor: "#252525" }],
      [".narrative .scroll-btn svg path", { fill: "none", stroke: "#252525" }],
      [".orizin .inner .orizin-marquee .o-marquee svg", { fill: "none", stroke: "#252525" }],
      [".keyWords .textWrap .line-divider", { backgroundColor: "#252525" }],
      ["header .innerHeader .gnb-r ul li a .icon-wrap path, .about .inner .profile .left a svg path", { fill: "#252525", stroke: "none" }],
      [".works .inner .portfolio-grid .card .thumbnail .icon-circle", {backgroundColor: "#ffffff"}],
      

      // Text
      [".visual .subText .copyright", { color: "#777777" }],
      [".now .inner .left .folder .folder-content .textBox", { color: "#666666" }],
      [".works .inner .portfolio-grid .card .card-content .tit p, .works .inner .portfolio-grid .card .card-content .description", { color: "#666666" }],
      [".gallery-card .card-info", { color: "#333333"}],
      [".gallery-card .card-info p", { color: "#666666"}],
      [".footer", { color: "#dbdbdb", backgroundColor: "#000000"}],
      ["#projectModal .modal-content .content .project-visual .inner .bottom .project-text","#projectModal .modal-content .content .project-overview .inner .project-text", "#projectModal .modal-content .content .project-block .project-list li", "#projectModal .modal-content .content .project-overview .project-block .project-quote", {color: "#999999"}],


      // fill-btn
      // [".fill-btn:hover svg path", {fill: "#dbdbdb;"}],

    ]
  }
};

// ⭐⭐ Dark Mode 토글 + Hover 효과
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const span = themeToggle.querySelector('span');

//  테마 전환 시 CSS 변수 적용 함수
function applyThemeVariables(isDark) {
  const root = document.documentElement;
  
  if (isDark) {
    root.style.setProperty('--fill-btn-color', '#dbdbdb');
    root.style.setProperty('--fill-btn-border', '#dbdbdb');
    root.style.setProperty('--fill-btn-bg', '#dbdbdb');
    root.style.setProperty('--fill-btn-hover-text', '#252525');
    root.style.setProperty('--fill-btn-hover-fill', '#252525');
  } else {
    root.style.setProperty('--fill-btn-color', '#252525');
    root.style.setProperty('--fill-btn-border', '#252525');
    root.style.setProperty('--fill-btn-bg', '#252525');
    root.style.setProperty('--fill-btn-hover-text', '#dbdbdb');
    root.style.setProperty('--fill-btn-hover-fill', '#dbdbdb');
  }
}

//  페이지 로드 시 초기 테마 적용
const isDarkOnLoad = document.body.classList.contains('dark-mode');
applyThemeVariables(isDarkOnLoad);



// ⭐ 클릭 시 다크/라이트 모드 전환
themeToggle.addEventListener('click', function (e) {
  e.preventDefault();

  const body = document.body;
  const isDark = body.classList.toggle('dark-mode');
  const config = isDark ? themeAnimationConfig.dark : themeAnimationConfig.light;

  const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } });
  this.firstChild.textContent = config.buttonText;

  config.animations.forEach(([selector, props]) => {
    tl.to(selector, props, 0);
  });

  applyThemeVariables(isDark);
  applyLinkColors();
});


  
  //  Hover → pulse 효과
  themeToggle.addEventListener('mouseenter', () => {
    gsap.to(span, {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1 // scale → 원래 크기 → 다시 scale
    });
  });

  themeToggle.addEventListener('mouseleave', () => {
    gsap.to(span, {
      scale: 1,
      duration: 0.2,
      ease: "power2.inOut"
    });
  });
}

}); // ← Header block end


// ------------------------------------
// ② ScrollTrigger / Narrative / About motion
// ------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // =====================================================
  // [1] Horizontal Scroll Setup
  // =====================================================
  const sections = gsap.utils.toArray(".narrative-container section");
  const getScrollLen = () => sections.reduce((s, el) => s + el.offsetWidth, 0) - window.innerWidth;
  let scrollLen = getScrollLen();

  // 가로 스크롤 기본 애니메이션
  const horizontalScroll = gsap.to(sections, {
    x: -scrollLen,
    ease: "none",
    scrollTrigger: {
      id: "narrativeScroll",
      trigger: ".narrative-container",
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => "+=" + scrollLen,
      invalidateOnRefresh: true,
    },
  });

  // Scroll 버튼 (→ 다음 섹션 이동)
  document.querySelector(".scroll-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#next-section");
    const st = ScrollTrigger.getById("narrativeScroll");
    if (target && st)
      gsap.to(window, {
        scrollTo: st.start + target.offsetLeft,
        duration: 1,
        ease: "power2.inOut",
      });
  });

  window.addEventListener("resize", () => {
    scrollLen = getScrollLen();
    ScrollTrigger.refresh();
  });

  // =====================================================
  // [2] Hero Intro
  // =====================================================
  gsap.from(".mainTitle p, .visual .subText .copyright, .visual .subText .desc", {
    y: 300,
    opacity: 0,
    duration: 1.4,
    ease: "expo.out",
    stagger: 0.15,
  });

  gsap.from(".logo-spin", {
    rotate: -180,
    opacity: 0,
    duration: 1.8,
    ease: "power3.out",
    delay: 0.5,
  });

    // 로고 회전
  [
    { selector: ".line1 .logo-spin", trigger: ".visual", start: "top top", end: "bottom top" },
    { selector: ".footer-spin", trigger: "body", start: "top bottom", end: "bottom top" }
  ].forEach(cfg => {
    gsap.to(cfg.selector, {
      rotation: 360,
      ease: "none",
      scrollTrigger: { trigger: cfg.trigger, start: cfg.start, end: cfg.end, scrub: 0.1 }
    });
  });

  gsap.to(".image-view img", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".narrative",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.from(".about .right img", {
    opacity: 0,
    y: 60,
    rotate: -3,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about", start: "top 80%" },
  });

  // =====================================================
  // [3] Narrative 탭 hover 시 메인 이미지 & 텍스트 변경
  // =====================================================
  const tabs = document.querySelectorAll(".tab");
  const mainImage = document.getElementById("mainImage");
  const mainTxt = document.getElementById("mainTxt");
  const defaultImage = "images/narrativePhoto.png";
  const defaultText = "각 키워드에 호버해보세요 ☺";

  tabs.forEach((tab) => {
    tab.addEventListener("mouseenter", () => {
      gsap.to(mainImage, { opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(mainTxt, { opacity: 0, y: -10, duration: 0.3, ease: "power2.out" });

      setTimeout(() => {
        mainImage.src = `images/${tab.dataset.image}`;
        mainTxt.textContent = tab.dataset.text;
        gsap.to(mainImage, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(
          mainTxt,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }, 300);
    });

    tab.addEventListener("mouseleave", () => {
      gsap.to(mainImage, { opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(mainTxt, { opacity: 0, y: -10, duration: 0.3, ease: "power2.out" });

      setTimeout(() => {
        mainImage.src = defaultImage;
        mainTxt.textContent = defaultText;
        gsap.to(mainImage, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(
          mainTxt,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }, 300);
    });
  });

  // =====================================================
  // [4] Section Animations (containerAnimation 기준)
  // =====================================================

  // ① 키워드 (narrative)
  gsap.from(".narrative .tabList li", {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".narrative",
      containerAnimation: horizontalScroll,
      start: "left 80%",
      once: true,
    },
  });

  // ② Orizin

  gsap.from(".orizin .imgs li:nth-child(1)", {
    x: -80,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".orizin",
      containerAnimation: horizontalScroll,
      start: "left center",
      once: true,
    },
  });

  gsap.from(".orizin .imgs li:nth-child(2)", {
    x: 80,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out",
    delay: 0.1,
    scrollTrigger: {
      trigger: ".orizin",
      containerAnimation: horizontalScroll,
      start: "left center",
      once: true,
    },
  });

  gsap.from(".orizin .des", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".orizin",
      containerAnimation: horizontalScroll,
      start: "left 70%",
      once: true,
    },
  });




// ③ Now (폴더 열림 + 이미지 인입 + 패럴랙스 + 텍스트)

// 0️. 초기 세팅
gsap.set(".now .inner .left .folder .images .img01", { x: -200, y: 50, rotate: -10, opacity: 0 });
gsap.set(".now .inner .left .folder .images .img02", { x: 250, y: -80, rotate: 8, opacity: 0 });
gsap.set(".now .inner .left .folder .images .img03", { x: 120, y: 200, rotate: -5, opacity: 0 });
gsap.set(".now .inner .left .folder .folder-content img", { transformOrigin: "bottom center", rotateX: 0 });

// 1️. 폴더 열림 + 이미지 인입 타임라인
const nowTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".now",
    containerAnimation: horizontalScroll,
    start: "left center",
    once: true,
  },
});

// (1) 폴더 아이콘 열림
nowTL.to(".now .inner .left .folder .folder-content img", {
  rotateX: 25,
  duration: 0.5,
  ease: "power2.out",
})
// (2) 이미지 등장
.to(".now .inner .left .folder .images .img01", {
  x: 0,
  y: 0,
  rotate: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power3.out",
}, "-=0.1")
.to(".now .inner .left .folder .images .img02", {
  x: 0,
  y: 0,
  rotate: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power3.out",
}, "-=0.8")
.to(".now .inner .left .folder .images .img03", {
  x: 0,
  y: 0,
  rotate: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power3.out",
}, "-=0.8")
// (3) 폴더 닫히듯 복귀
.to(".now .inner .left .folder .folder-content img", {
  rotateX: 0,
  duration: 0.6,
  ease: "power1.inOut",
}, "-=0.5");

// 2. 폴더 패럴랙스 (스크롤 시 위아래 살짝 움직임)
gsap.utils.toArray(".now .inner .left .folder").forEach((folder, i) => {
  gsap.to(folder, {
    y: i % 2 === 0 ? -20 : 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".now",
      containerAnimation: horizontalScroll,
      start: "left center",
      end: "right center",
      scrub: 1,
    },
  });
});

// 3. 텍스트 페이드업
gsap.from(".now .des", {
  opacity: 0,
  y: 60,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".now",
    containerAnimation: horizontalScroll,
    start: "left 80%",
    once: true,
  },
});


// ④ Become (시네마틱 리빌)
const becomeTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".become",
    containerAnimation: horizontalScroll, // ✅ 가로 스크롤 연동
    start: "left center",
    once: true,
  },
});

// 1️. 타이틀 등장 (각 단어별 stagger)
becomeTL.from(".become .left h2 span", {
  yPercent: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
  stagger: 0.15,
});

// 2️. 타원형 DESIGN 버튼
becomeTL.from(".become .left .oval-text", {
  scale: 0.85,
  opacity: 0,
  filter: "blur(6px)",
  duration: 1.1,
  ease: "back.out(1.7)",
}, "-=0.8");

// 3️. 서브 카피 [Evolving Vision]
becomeTL.from(".become .left .vision", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power3.out",
  stagger: 0.15,
}, "-=0.6");

//  4. 텍스트 페이드업
gsap.from(".become .des", {
  opacity: 0,
  y: 60,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".become",
    containerAnimation: horizontalScroll,
    start: "left 80%",
    once: true,
  },
});

// 5. Become Right Image (Reactive 3D Tilt)
const becomeImg = document.querySelector(".become .inner .right img");

if (becomeImg) {
  // 등장 애니메이션 (살짝 오른쪽에서 fade-in)
  gsap.from(becomeImg, {
    x: 100,
    opacity: 0,
    scale: 0.98,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".become",
      containerAnimation: horizontalScroll,
      start: "left 70%",
      once: true,
    },
  });

  // 리액티브 3D tilt (마우스 움직임에 반응)
  const maxRotate = 6; // 기울기 강도
  const maxMove = 20; // 이동량

  becomeImg.addEventListener("mousemove", (e) => {
    const rect = becomeImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 중앙 기준 -0.5 ~ 0.5로 정규화
    const rotateY = ((x / rect.width) - 0.5) * maxRotate * 2;
    const rotateX = ((y / rect.height) - 0.5) * -maxRotate * 2;
    const moveX = ((x / rect.width) - 0.5) * maxMove;
    const moveY = ((y / rect.height) - 0.5) * maxMove;

    gsap.to(becomeImg, {
      rotateY,
      rotateX,
      x: moveX,
      y: moveY,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  // 마우스 나가면 원래 위치로 복귀
  becomeImg.addEventListener("mouseleave", () => {
    gsap.to(becomeImg, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  });
}

});



// ------------------------------------
// ③ Tooltip, Keywords, Accordion, Works Filter
// ------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.querySelector(".tooltip");
  const nowSection = document.querySelector(".narrative-container .now");
  if (tooltip && nowSection) {
    gsap.to(tooltip, {
      top: "50%",
      left: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: ".now",
        start: "top",
        end: () => "+=" + (nowSection.offsetLeft + nowSection.offsetWidth) + "px",
        scrub: 1
      }
    });
  }

  // Works Title Cinematic Entrance
  gsap.from(".works .title", {
    x: -250,
    scale: 0.95,
    opacity: 0,
    duration: 1.8,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".works .title",
      start: "top 85%",
      once: true
    }
  });

  const scrollText = document.querySelector(".keyWords .scrollText");
  if (scrollText) {
    scrollText.innerHTML = scrollText.innerHTML.repeat(3);
    gsap.to(scrollText, { x: "-50%", ease: "none", scrollTrigger: { trigger: ".keyWords", start: "top bottom", end: "bottom top", scrub: 1 } });
  }

  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach(item => {
    const tit = item.querySelector(".accordion-tit");
    const content = item.querySelector(".accordion-content");
    tit.addEventListener("click", () => {
      const active = item.classList.contains("active");
      accordionItems.forEach(i => { i.classList.remove("active"); i.querySelector(".accordion-content").style.maxHeight = 0; });
      if (!active) { item.classList.add("active"); content.style.maxHeight = content.scrollHeight + "px"; }
    });
  });

  const filterItems = document.querySelectorAll(".filter-item");
  const indicator = document.querySelector(".filter-indicator");
  filterItems.forEach(item => {
    item.addEventListener("click", () => {
      filterItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      gsap.to(indicator, { x: item.offsetLeft, duration: 0.5, ease: "power2.out" });
    });
  });
  
});

// ===============================
// Icon-circle Cinematic Hover Animation (모든 카드 자동 감지)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".works .inner .portfolio-grid");
  if (!grid) return;

  grid.addEventListener("mouseenter", e => {
    const card = e.target.closest(".card");
    if (!card) return;

    const icon = card.querySelector(".icon-circle");
    if (!icon) return;

    // 트윈 중복 방지
    gsap.killTweensOf(icon);

    // hover-in: 회전 + scale + glow
    gsap.fromTo(icon,
      {
        scale: 0.7,
        opacity: 0,
        rotate: -25,
        filter: "drop-shadow(0 0 0px rgba(255,255,255,0))"
      },
      {
        scale: 1.05,
        opacity: 1,
        rotate: 0,
        filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
        duration: 0.5,
        ease: "power3.out"
      }
    );

    // subtle pulse (빛이 1회 살짝 퍼졌다 사라짐)
    gsap.to(icon, {
      scale: 1,
      filter: "drop-shadow(0 0 0px rgba(255,255,255,0))",
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.45
    });
  }, true);

  const svg = icon.querySelector("svg");
gsap.fromTo(svg, { rotate: -45 }, { rotate: 0, duration: 0.5, ease: "expo.out" });

});





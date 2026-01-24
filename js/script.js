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
      [".works .title svg path, .footer .inner .footer-bottom .footer-spin path", { fill: "#B7D3C6", stroke: "#B7D3C6" }],
      [".about .inner .contents .box .grid .title .skill-icon svg path", { fill: "none", stroke: "#dbdbdb" }],
      [".about .inner .contents .box .accordion-list .accordion-item .accordion-icon path, .works .inner .portfolio-grid .card .thumbnail .icon-circle svg path", { fill: "#dbdbdb", stroke: "none" }],
      [".about .inner .profile .left .resume:hover svg path", { fill: "#dbdbdb", stroke: "none" }],
      ["#photoModal .modal-nav-btn svg path", {stroke: "#dbdbdb" }],
      

      
      // Borders
      ["header .innerHeader .gnb-c", { borderColor: "#dbdbdb" }],
      ["header .innerHeader .gnb-r ul li", { borderColor: "#dbdbdb" }],
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
      ["header .innerHeader .gnb-r ul li a .icon-wrap path, .about .inner .profile .left a svg path", { fill: "#dbdbdb", stroke: "none" }],
      [".works .inner .portfolio-grid .card .thumbnail .icon-circle", {backgroundColor: "#000000"}],


      // Text
      [".visual .subText .copyright, .now .inner .left .folder .folder-content .textBox", { color: "#999999" }],
      [".works .inner .portfolio-grid .card .card-content .tit p, .works .inner .portfolio-grid .card .card-content .description", { color: "#999999" }],
      [".gallery-card .card-info", { color: "#f5f5f5"}],
      [".gallery-card .card-info p", { color: "#dbdbdb"}],
      [".footer", { color: "#252525", backgroundColor: "#dbdbdb"}],
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
      [".works .title svg path, .footer .inner .footer-bottom .footer-spin path", { fill: "#B7D3C6", stroke: "#B7D3C6" }],
      [".about .inner .contents .box .grid .title .skill-icon svg path", { fill: "none", stroke: "#252525" }],
      [".about .inner .contents .box .accordion-list .accordion-item .accordion-icon path, .works .inner .portfolio-grid .card .thumbnail .icon-circle svg path", { fill: "#252525", stroke: "none" }],

      
      ["#photoModal .modal-nav-btn svg path", {stroke: "#252525" }],
      

      // Borders
      ["header .innerHeader .gnb-c", { borderColor: "#252525" }],
      ["header .innerHeader .gnb-r ul li", { borderColor: "#252525" }],
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
      ["header .innerHeader .gnb-r ul li a .icon-wrap path, .about .inner .profile .left a svg path", { fill: "#252525", stroke: "none" }],
      [".works .inner .portfolio-grid .card .thumbnail .icon-circle", {backgroundColor: "#ffffff"}],
      

      // Text
      [".visual .subText .copyright", { color: "#777777" }],
      [".works .inner .portfolio-grid .card .card-content .tit p, .works .inner .portfolio-grid .card .card-content .description", { color: "#666666" }],
      [".gallery-card .card-info", { color: "#333333"}],
      [".gallery-card .card-info p", { color: "#666666"}],
      [".footer", { color: "#dbdbdb", backgroundColor: "#000000"}],
      ["#projectModal .modal-content .content .project-visual .inner .bottom .project-text","#projectModal .modal-content .content .project-overview .inner .project-text", "#projectModal .modal-content .content .project-block .project-list li", "#projectModal .modal-content .content .project-overview .project-block .project-quote", {color: "#999999"}],
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
// 1. ScrollTrigger / Narrative / About motion
// ------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ======================================
// 2.VISUAL INTRO (GLOBAL)
// ======================================
function initVisualIntro() {
  const visual = document.querySelector(".visual");
  if (!visual) return;

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  // 
  tl.from(".bg-blur", {
    y: 40,
    scale: 0.96,
    opacity: 0,
    duration: 1.6
  });

  // 텍스트 인트로
  tl
    .from(".visual .top .en9", {
      y: 40,
      opacity: 0,
      duration: 0.9
    }, "-=0.9")
    .from(".visual .top .tit-sans", {
      y: 28,
      opacity: 0,
      duration: 0.8
    }, "-=0.6")
    .from(".visual .bottom .caption", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08
    }, "-=0.5")
    .from(".visual .center-wrap", {
      y: 18,
      opacity: 0,
      duration: 0.6
    }, "-=0.4");

  const wrap = visual.querySelector(".center-wrap");
  const circle = wrap?.querySelector(".circle-text");
  if (!wrap || !circle) return;

  let isAnimating = false;

  wrap.addEventListener("mouseenter", () => {
    if (isAnimating) return;
    isAnimating = true;

    gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => (isAnimating = false)
    })
      .to(circle, { x: 14, rotation: -5, duration: 0.14 })
      .to(circle, { x: -10, rotation: 4, duration: 0.16 })
      .to(circle, { x: 6, rotation: -2, duration: 0.16 })
      .to(circle, { x: 0, rotation: 0, duration: 0.24, ease: "power3.out" });
  });
}
initVisualIntro();
});


// 가로 스크롤 애니메이션 & hover
document.addEventListener("DOMContentLoaded", () => {

  const marquee = document.querySelector(".marquee");
  const track = marquee?.querySelector(".marquee-track");
  if (!marquee || !track) return;

  const tween = gsap.fromTo(
    track,
    { x: 0 },
    { x: "-50%", duration: 20, ease: "linear", repeat: -1 }
  );

  marquee.addEventListener("mouseenter", () => {
    gsap.to(tween, { timeScale: 0.3, duration: 0.4 });
    gsap.to(marquee, { backgroundColor: "#B7D3C6", duration: 0.3 });
  });

  marquee.addEventListener("mouseleave", () => {
    gsap.to(tween, { timeScale: 1, duration: 0.4 });
    gsap.to(marquee, { backgroundColor: "transparent", duration: 0.3 });
  });

});




// ------------------------------------
// 3. Accordion, Works Filter
// ------------------------------------
window.addEventListener("DOMContentLoaded", () => {
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
// 4. Icon-circle Cinematic Hover Animation (모든 카드 자동 감지)
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


document.addEventListener("DOMContentLoaded", () => {
  const myPhoto = document.querySelector(".my-photo");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        myPhoto.classList.add("visible");
        observer.unobserve(myPhoto); // 한 번만 실행
      }
    });
  }, { threshold: 0.4 }); // 40% 정도 화면에 들어오면 실행

  observer.observe(myPhoto);
});











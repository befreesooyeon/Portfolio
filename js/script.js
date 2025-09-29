// header highlight + 스크롤 연동 + 속도 반응형 애니메이션
document.addEventListener("DOMContentLoaded", () => {
  const gnb = document.querySelector('.gnb-c');
  const highlight = gnb.querySelector('.highlight');
  const gnbLinks = gnb.querySelectorAll('a');
  const padX = 8; // 가상 padding-left/right
  let activeLink = null; // 현재 active 상태의 링크 저장
  let lastScrollY = window.scrollY; // 마지막 스크롤 위치 저장

  // 📌 공통 스크롤 애니메이션 함수
  function smoothScrollTo(targetY, duration = 1, ease = "power2.inOut") {
    gsap.to(window, {
      scrollTo: targetY,
      duration: duration,
      ease: ease
    });
  }

  // 📌 앵커 링크 스크롤 처리 함수
  function handleAnchorClick(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      let targetY;
      const headerOffset = 130; // 헤더 높이
      
      // #home 클릭 시 페이지 맨 위로 이동
      if (targetId === '#home') {
        targetY = 0;
      } 
      // #footer 클릭 시 스크롤 가능한 맨 아래로 이동 (margin-bottom 포함)
      else if (targetId === '#footer') {
        targetY = document.documentElement.scrollHeight - window.innerHeight;
      } 
      else {
        const target = document.querySelector(targetId);
        if (target) {
          targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        } else {
          return;
        }
      }
      
      smoothScrollTo(targetY);
    }
  }

  // highlight 이동 + 크기 설정 함수
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

  // active 상태 적용
  function setActiveLink(link, speedFactor = 1) {
    if (!link) return;
    
    gnbLinks.forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    activeLink = link;

    applyLinkColors();
    moveHighlightTo(link, speedFactor);
  }

  // 📌 페이지 로드 시 기본 활성화 (첫 번째 링크)
  if (gnbLinks.length > 0) {
    activeLink = gnbLinks[0];
    setTimeout(() => {
      setActiveLink(activeLink);
    }, 100);
  }

  
  // 📌 마우스 올리면 하이라이트 이동
  gnbLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveHighlightTo(link));
  });

  // 📌 메뉴 전체에서 마우스 나가면 active 위치로 복귀
  gnb.addEventListener('mouseleave', () => {
    if (activeLink) moveHighlightTo(activeLink);
  });

  // 📌 클릭 시 active 고정 + 스크롤 이동
  gnbLinks.forEach(link => {
    link.addEventListener('click', e => {
      setActiveLink(link);
      handleAnchorClick(e, link);
    });
  });

  // 📌 스크롤 시 현재 섹션에 맞춰 active 변경 + 속도 반응형 애니메이션
  const sections = [
    { 
      link: Array.from(gnbLinks).find(link => link.getAttribute('href') === '#home'),
      section: document.querySelector('#home')
    },
    { 
      link: Array.from(gnbLinks).find(link => link.getAttribute('href') === '#about'),
      section: document.querySelector('#about')
    },
    { 
      link: Array.from(gnbLinks).find(link => link.getAttribute('href') === '#works'),
      section: document.querySelector('#works')
    }
  ].filter(item => item.link && item.section);

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      const headerOffset = 140;

      // 📌 스크롤 속도 계산
      const scrollSpeed = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      const speedFactor = Math.min(Math.max(scrollSpeed / 50, 1), 3); 

      let current = null;
      
      // 페이지 맨 아래에서 CONTACT 활성화
      if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        current = Array.from(gnbLinks).find(link => link.getAttribute('href') === '#footer');
      } else {
        // 각 섹션의 시작점 기준으로 활성화
        for (const { link, section } of sections.reverse()) {
          const sectionTop = section.offsetTop - headerOffset;
          
          if (scrollY >= sectionTop) {
            current = link;
            break;
          }
        }
        sections.reverse();
      }

      if (current && current !== activeLink) {
        setActiveLink(current, speedFactor);
      }
    }, 10);
  });

  // 📌 창 크기 변경 시 active 위치 재조정
  window.addEventListener('resize', () => {
    setTimeout(() => {
      if (activeLink) moveHighlightTo(activeLink);
    }, 100);
  });

  // 📌 전체 페이지 내 a[href^="#"] 클릭 시 부드러운 스크롤 적용 (gnb 제외)
  const allLinks = document.querySelectorAll('a[href^="#"]:not(.gnb-c a)');
  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      handleAnchorClick(e, this);
    });
  });

    // 다크/라이트 모드에 맞춰 링크 색상 적용
  function applyLinkColors() {
    const isDark = document.body.classList.contains('dark-mode');
    gnbLinks.forEach(a => a.style.color = isDark ? "#dbdbdb" : "#252525");
    if (activeLink) {
      activeLink.style.color = isDark ? "#252525" : "#ffffff";
    }
  }

  // 📌 Dark Mode 애니메이션 설정 객체
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
      [".modal-content", { backgroundColor: "#000000" }],

      // SVG
      ["svg path", { fill: "#dbdbdb", stroke: "#dbdbdb" }],
      ["header .innerHeader .gnb-r ul li a svg path, .about .inner .profile .left a svg path", { fill: "#dbdbdb", stroke: "#dbdbdb" }],
      [".tooltip-tail path", { fill: "#4A6CF7", stroke: "none" }],
      [".orizin .inner .orizin-marquee .o-marquee .marquee-track .content1 .icon1 path, .works .title svg path, .footer .inner .footer-bottom .footer-spin path", { fill: "#B7D3C6", stroke: "#B7D3C6" }],
      [".orizin .inner .orizin-marquee .o-marquee .marquee-track .content2 .icon path", { fill: "none", stroke: "#dbdbdb" }],
      [".about .inner .contents .box .grid .title .skill-icon svg path", { fill: "none", stroke: "#dbdbdb" }],
      [".about .inner .contents .box .accordion-list .accordion-item .accordion-icon path, .works .inner .portfolio-grid .card .thumbnail .icon-circle svg path", { fill: "#dbdbdb", stroke: "none" }],
      
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


      // Highlights / Buttons
      ["header .innerHeader .gnb-c .highlight", { backgroundColor: "#d4d4d4" }],
      ["header .innerHeader .gnb-r ul li a span", { backgroundColor: "#dbdbdb" }],
      [".narrative .scroll-btn", { backgroundColor: "#000000", borderColor: "#dbdbdb" }],
      [".narrative .scroll-btn svg path", { fill: "none", stroke: "#dbdbdb" }],
      [".orizin .inner .orizin-marquee .o-marquee svg", { fill: "none", stroke: "#dbdbdb" }],
      [".keyWords .textWrap .line-divider", { backgroundColor: "#dbdbdb" }],
      ["header .innerHeader .gnb-r ul li a .icon-wrap path, .about .inner .profile .left a svg path", { fill: "#dbdbdb", stroke: "none" }],
      [".works .inner .portfolio-grid .card .thumbnail .icon-circle", {backgroundColor: "#000000"}],
      ["#photoModal .modal-nav-btn svg path", {stroke: "#dbdbdb"}],

      // Text
      [".visual .subText .copyright, .now .inner .left .folder .folder-content .textBox", { color: "#999999" }],
      [".works .inner .portfolio-grid .card .card-content .tit p, .works .inner .portfolio-grid .card .card-content .description", { color: "#999999" }],
      [".gallery-card .card-info", { color: "#f5f5f5"}],
      [".gallery-card .card-info p", { color: "#dbdbdb"}],
      [".footer", { color: "#252525", backgroundColor: "#dbdbdb"}],
      ["#projectModal .modal-content .content .project-visual .inner .bottom .project-text", {color: "#999999"}],


      
      // fortune
      ["#fortuneModal .modal-content, #fortuneModal .modal-content .content .select-btn", {backgroundColor: "#000000", color: "#dbdbdb", borderColor: "#dbdbdb"}],
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
      [".modal-content", { backgroundColor: "#f5f5f5" }],

      // SVG
      ["svg path", { fill: "#252525", stroke: "#252525" }],
      ["header .innerHeader .gnb-r ul li a svg path, .about .inner .profile .left a svg path", { fill: "#252525", stroke: "#252525" }],
      [".tooltip-tail path", { fill: "#4A6CF7", stroke: "none" }],
      [".orizin .inner .orizin-marquee .o-marquee .marquee-track .content1 .icon1 path, .works .title svg path, .footer .inner .footer-bottom .footer-spin path", { fill: "#B7D3C6", stroke: "#B7D3C6" }],
      [".orizin .inner .orizin-marquee .o-marquee .marquee-track .content2 .icon path", { fill: "none", stroke: "#252525" }],
      [".about .inner .contents .box .grid .title .skill-icon svg path", { fill: "none", stroke: "#252525" }],
      [".about .inner .contents .box .accordion-list .accordion-item .accordion-icon path, .works .inner .portfolio-grid .card .thumbnail .icon-circle svg path", { fill: "#252525", stroke: "none" }],
      

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

      // Highlights / Buttons
      ["header .innerHeader .gnb-c .highlight", { backgroundColor: "#d4d4d4" }],
      ["header .innerHeader .gnb-r ul li a span", { backgroundColor: "#000000" }],
      [".narrative .scroll-btn", { backgroundColor: "#f5f5f5", borderColor: "#252525" }],
      [".narrative .scroll-btn svg path", { fill: "none", stroke: "#252525" }],
      [".orizin .inner .orizin-marquee .o-marquee svg", { fill: "none", stroke: "#252525" }],
      [".keyWords .textWrap .line-divider", { backgroundColor: "#252525" }],
      ["header .innerHeader .gnb-r ul li a .icon-wrap path, .about .inner .profile .left a svg path", { fill: "#252525", stroke: "none" }],
      [".works .inner .portfolio-grid .card .thumbnail .icon-circle", {backgroundColor: "#ffffff"}],
      ["#photoModal .modal-nav-btn svg path", {stroke: "#252525"}],
      

      // Text
      [".visual .subText .copyright", { color: "#777777" }],
      [".now .inner .left .folder .folder-content .textBox", { color: "#666666" }],
      [".works .inner .portfolio-grid .card .card-content .tit p, .works .inner .portfolio-grid .card .card-content .description", { color: "#666666" }],
      [".gallery-card .card-info", { color: "#333333"}],
      [".gallery-card .card-info p", { color: "#666666"}],
      [".footer", { color: "#dbdbdb", backgroundColor: "#000000"}],
      ["#projectModal .modal-content .content .project-visual .inner .bottom .project-text", {color: "#666666"}],

      // fortune
      ["#fortuneModal .modal-content, #fortuneModal .modal-content .content .select-btn", {backgroundColor: "#f5f5f5", color: "#252525", borderColor: "#252525"}],
    ]
  }
};

// Dark Mode 토글 + Hover 효과
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const span = themeToggle.querySelector('span');

  // 클릭 시 다크/라이트 모드 전환
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

    applyLinkColors();
  });

  // ⭐ Hover → pulse 효과
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


});

// 가로스크롤 start
// 가로 스크롤 + 버튼 이동
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // ScrollToPlugin 없으면 등록만 되고 무시됨

  const sections = gsap.utils.toArray(".narrative-container section");
  const getScrollLen = () => sections.reduce((s, el) => s + el.offsetWidth, 0) - window.innerWidth;

  let scrollLen = getScrollLen();

  gsap.to(sections, {
    x: -scrollLen,
    ease: "none",
    scrollTrigger: {
      id: "narrativeScroll",            // ← 이 id로 찾음
      trigger: ".narrative-container",
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => "+=" + scrollLen
    }
  });

  // 스크롤 버튼 → #next-section으로
  document.querySelector(".scroll-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#next-section");
    const st = ScrollTrigger.getById("narrativeScroll");
    if (!target || !st) return;

    // 가로 offsetLeft → 세로 스크롤 위치로 변환
    const y = Math.min(st.start + target.offsetLeft, st.end);

    if (gsap.plugins && gsap.plugins.scrollTo) {
      gsap.to(window, { scrollTo: y, duration: 1, ease: "power2.inOut" });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" }); // 플러그인 없을 때도 동작
    }
  });

  // 리사이즈 반영
  window.addEventListener("resize", () => {
    scrollLen = getScrollLen();
    ScrollTrigger.refresh();
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

  // 표지 hover 시 메인 이미지 변경
  const tabs = document.querySelectorAll(".tab");
  const mainImage = document.getElementById("mainImage");
  const mainTxt = document.getElementById("mainTxt");
  const defaultImage = "images/narrativePhoto.png";
  const defaultText = "각 키워드에 호버해보세요 ☺";

tabs.forEach(tab => {
  tab.addEventListener("mouseenter", () => {
    // 이미지 애니메이션
    mainImage.classList.add("reveal");
    mainTxt.classList.add("text-out");

    setTimeout(() => {
      // 새로운 이미지 & 텍스트 적용
      mainImage.src = `images/${tab.dataset.image}`;
      mainTxt.textContent = tab.dataset.text;

      // 애니메이션 리셋 + 반대방향으로 나타남
      mainImage.classList.remove("reveal");
      mainTxt.classList.remove("text-out");
      mainTxt.classList.add("text-in");

      // text-in 효과 끝나면 제거 (다음 애니를 위해)
      setTimeout(() => mainTxt.classList.remove("text-in"), 600);
    }, 400);
  });

  tab.addEventListener("mouseleave", () => {
    // 원래 이미지/텍스트로 복귀
    mainImage.classList.add("reveal");
    mainTxt.classList.add("text-out");

    setTimeout(() => {
      mainImage.src = defaultImage;
      mainTxt.textContent = defaultText;

      mainImage.classList.remove("reveal");
      mainTxt.classList.remove("text-out");
      mainTxt.classList.add("text-in");

      setTimeout(() => mainTxt.classList.remove("text-in"), 600);
    }, 400);
  });
});



  // Tooltip 이동
  const tooltip = document.querySelector(".tooltip");
  const nowSection = document.querySelector(".narrative-container .now");
  if (tooltip && nowSection) {
    gsap.to(tooltip, {
      top: "50%",
      left: "18%",
      ease: "none",
      scrollTrigger: {
        trigger: ".now",
        start: "top",
        end: () => "+=" + (nowSection.offsetLeft + nowSection.offsetWidth) + "px",
        scrub: 1
      }
    });
  }

  // keywords 반복 텍스트
  const scrollText = document.querySelector(".keyWords .scrollText");
  if (scrollText) {
    scrollText.innerHTML = scrollText.innerHTML.repeat(3);
    gsap.to(scrollText, {
      x: "-50%",
      ease: "none",
      scrollTrigger: {
        trigger: ".keyWords",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }

  // About 아코디언
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach(item => {
    const tit = item.querySelector(".accordion-tit");
    const content = item.querySelector(".accordion-content");
    tit?.addEventListener("click", () => {
      const active = item.classList.contains("active");
      accordionItems.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".accordion-content").style.maxHeight = 0;
      });
      if (!active) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Works filter indicator
  const filterItems = document.querySelectorAll(".filter-item");
  const indicator = document.querySelector(".filter-indicator");
  filterItems.forEach(item => {
    item.addEventListener("click", () => {
      filterItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      gsap.to(indicator, { x: item.offsetLeft, duration: 0.5, ease: "power2.out" });
    });
  });

  // Works 카드 hover → icon-circle 애니메이션
  const portfolioGrid = document.querySelector(".works .inner .portfolio-grid");
  portfolioGrid?.addEventListener("mouseenter", e => {
    const card = e.target.closest(".card");
    if (!card) return;
    const icon = card.querySelector(".icon-circle svg");
    if (!icon) return;
    gsap.to(icon, {
      xPercent: 100,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(icon, { xPercent: -100 });
        gsap.to(icon, { xPercent: 0, duration: 0.25, ease: "power2.out" });
      }
    });
  }, true);
});




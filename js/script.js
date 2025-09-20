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

      // fortune
      ["#fortuneModal .modal-content, #fortuneModal .modal-content .content .select-btn", {backgroundColor: "#f5f5f5", color: "#252525", borderColor: "#252525"}],
    ]
  }
};




  // Dark Mode
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function (e) {
      e.preventDefault();

      const body = document.body;
      const isDark = body.classList.toggle('dark-mode');
      const btn = this;
      const config = isDark ? themeAnimationConfig.dark : themeAnimationConfig.light;

      const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } });
      
      btn.firstChild.textContent = config.buttonText;
      
      // 애니메이션 적용
      config.animations.forEach(([selector, props]) => {
        tl.to(selector, props, 0);
      });

      // 모드 변경 후 현재 활성 메뉴 색상 갱신
      applyLinkColors();
    });
  }
});

// 가로스크롤 start
window.addEventListener("DOMContentLoaded", () => { 
  let sections = gsap.utils.toArray(".narrative-container section");
  
  let totalWidth = 0;
  sections.forEach(section => {
    totalWidth += section.offsetWidth;
  });

  let scrollTween = gsap.to(sections, {
    x: -totalWidth + window.innerWidth, // 실제 너비로 계산
    ease: "none",
    scrollTrigger: {
      trigger: '.narrative-container',
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => "+=" + totalWidth + "px", // 실제 너비로 end 계산
    }
  });

  // 📌 로고 회전 애니메이션 설정
  const logoRotationConfigs = [
    {
      selector: ".line1 .logo-spin",
      trigger: ".visual",
      start: "top top",
      end: "bottom top",
      scrub: 0.1
    },
    {
      selector: ".works .title svg",
      trigger: ".works",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.1
    },
    {
      selector: ".footer-spin",
      trigger: "body",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.1
    }
  ];

  logoRotationConfigs.forEach(config => {
    gsap.to(config.selector, {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        trigger: config.trigger,
        start: config.start,
        end: config.end,
        scrub: config.scrub
      }
    });
  });

  // narrtive 표지 마우스 hover시 사진 변경
  const tabs = document.querySelectorAll('.tab');
  const mainImage = document.getElementById('mainImage');
  const mainTxt = document.getElementById('mainTxt');
  const defaultImage = 'images/narrativePhoto.png';
  const defaultText = '각 키워드에 마우스를 올려보세요 ☺';

  tabs.forEach(tab => {
    tab.addEventListener('mouseenter', () => {
      const imageName = tab.getAttribute('data-image');
      const text = tab.getAttribute('data-text');
      mainImage.setAttribute('src', `images/${imageName}`);
      mainTxt.textContent = text;
    });

    tab.addEventListener('mouseleave', () => {
      // 이미지 & 텍스트 원래대로
      mainImage.setAttribute('src', defaultImage);
      mainTxt.textContent = defaultText;
    });
  });

  // narrtive 표지 Scroll-btn 클릭 시 페이지 이동
  document.querySelector('.scroll-btn').addEventListener('click', function (e) {
    e.preventDefault();

    const container = document.querySelector('.narrative-container');
    const target = document.querySelector('#next-section');

    if (container && target) {
      const targetPosition = target.offsetLeft;

      // 부드러운 스크롤
      container.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });

      
    }

    
  });

  // Tooltip 스크롤
  const tooltip = document.querySelector(".tooltip");
  const nowSection = document.querySelector(".narrative-container .now");

  gsap.to(tooltip, {
    top: "50%",
    left: "18%",
    ease: "none",
    scrollTrigger: {
      trigger: '.now',
      start: 'top',
      end: () => "+=" + (nowSection.offsetLeft + nowSection.offsetWidth) + "px", // .now 섹션이 끝나는 지점
      scrub: 1,
    }
  }); 

  // keywords gsap
  const scrollText = document.querySelector('.keyWords .scrollText');
  const originalHTML = scrollText.innerHTML;
  scrollText.innerHTML = originalHTML + originalHTML + originalHTML;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.keyWords',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      ease: "power1.inOut"
    }
  });

  tl.to(scrollText, {
    x: '-50%',
    duration: 1,
    ease: "none"
  });

  // About-accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const accordionTit = item.querySelector('.accordion-tit');
    const accordionContent = item.querySelector('.accordion-content');
    
    accordionTit.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // 모든 아코디언 항목 닫기
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.accordion-content');
        otherContent.style.maxHeight = '0';
      });
      
      // 클릭한 항목이 닫혀있었다면 열기
      if (!isActive) {
        item.classList.add('active');
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      }
    });
  });

  // ⭐️ WORKS-filter 클릭 시 클래스 적용
  const filterItems = document.querySelectorAll('.filter-item');
  const indicator = document.querySelector('.filter-indicator');

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      // active 클래스 이동
      filterItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const leftPos = item.offsetLeft + 0;

      gsap.to(indicator, {
        duration: 0.5,
        x: leftPos,
        ease: 'power2.out',
      });
    });
  });

  // ⭐️ hover 시 효과
  document.querySelectorAll('.works .inner .portfolio-grid .card').forEach(card => {
    const icon = card.querySelector('.icon-circle svg');
    if (!icon) return; // 아이콘 없으면 패스

    card.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        xPercent: 100,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(icon, { xPercent: -100 });
          gsap.to(icon, {
            xPercent: 0,
            duration: 0.25,
            ease: 'power2.out'
          });
        }
      });
    });
  });





  

});
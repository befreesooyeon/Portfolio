
// header highlight
document.addEventListener("DOMContentLoaded", () => {
  const gnb = document.querySelector('.gnb-c');
  const highlight = gnb.querySelector('.highlight');
  const links = gnb.querySelectorAll('a');
  const padX = 8; // 가상 padding-left/right
  const padY = 4; // 가상 padding-top/bottom

  // highlight 이동 + 크기 설정 함수
  function moveHighlightTo(link) {
    const linkLeft = link.offsetLeft;
    const linkWidth = link.offsetWidth;
    highlight.style.left = `${linkLeft - padX}px`;
    highlight.style.width = `${linkWidth + padX * 2}px`;
  }

  // active 상태 적용
  function setActiveLink(link) {
    links.forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    // 색상 적용
    applyLinkColors();
    moveHighlightTo(link);
  }

  // 다크/라이트 모드에 맞춰 링크 색상 적용
  function applyLinkColors() {
    const isDark = document.body.classList.contains('dark-mode');
    links.forEach(a => a.style.color = isDark ? "#dbdbdb" : "#252525");
    const activeLink = document.querySelector('.gnb-c a.active');
    if (activeLink) {
      activeLink.style.color = isDark ? "#252525" : "#ffffff";
    }
  }

// Heeader nav 메뉴 클릭 시 active 이동 + GSAP 스크롤 이동
links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    setActiveLink(this);

    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 130; // 헤더 높이
        const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        gsap.to(window, {
          scrollTo: targetY,
          duration: 1, // 스크롤 시간(초)
          ease: "power2.inOut" // 자연스러운 감속/가속
        });
      }
    }
  });
});

  // Dark Mode
  document.getElementById('themeToggle').addEventListener('click', function (e) {
    e.preventDefault();

    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    const btn = this;

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } });

if (isDark) {
  btn.firstChild.textContent = 'DARK';
  tl.to("body", { backgroundColor: "#000", color: "#dbdbdb" }, 0)
    .to("#themeToggle span", { backgroundColor: "#dbdbdb", scale: 1.3, yoyo: true, repeat: 1, duration: 0.2 }, 0)
    .to(".section-light", { backgroundColor: "#f5f5f5" }, 0)
    .to(".section-dark", { backgroundColor: "#000000", color: "#dbdbdb" }, 0)
    .to(".text-dark", { color: "#dbdbdb" }, 0)
    .to("svg path", { fill: "#dbdbdb", stroke: "#dbdbdb" }, 0)
    .to("header .innerHeader .gnb-c", {borderColor: "#dbdbdb" }, 0)
    .to("header .innerHeader .gnb-r ul li", {borderColor: "#dbdbdb" }, 0)
    .to("header .innerHeader .gnb-c .highlight", { backgroundColor: "#d4d4d4" }, 0)
    .to("header .innerHeader .gnb-r ul li a span", { backgroundColor: "#dbdbdb" }, 0)
    .to("header .innerHeader .gnb-r ul li a svg path, .about .inner .profile .left a svg path", { stroke: "none" }, 0)
    .to(".visual .subText .copyright", { color: "#999999" }, 0);
} 
  else {
  btn.firstChild.textContent = 'LIGHT';
  tl.to("body", { backgroundColor: "#f5f5f5", color: "#252525" }, 0)
    .to("#themeToggle span", { backgroundColor: "#000", scale: 1.3, yoyo: true, repeat: 1, duration: 0.2 }, 0)
    .to(".section-light", { backgroundColor: "#f5f5f5" }, 0)
    .to(".section-dark", { backgroundColor: "#000000", color: "#dbdbdb" }, 0)
    .to(".text-dark", { color: "#252525" }, 0)
    .to("svg path", { fill: "#252525", stroke: "#252525" }, 0)
    .to("header .innerHeader .gnb-c", {borderColor: "#252525" }, 0)
    .to("header .innerHeader .gnb-r ul li", {borderColor: "#252525" }, 0)
    .to("header .innerHeader .gnb-c .highlight", { backgroundColor: "#d4d4d4" }, 0)
    .to("header .innerHeader .gnb-r ul li a span", { backgroundColor: "#000" }, 0)
    .to("header .innerHeader .gnb-r ul li a svg path", { stroke: "none" }, 0)
    .to("header .innerHeader .gnb-r ul li a svg path, .about .inner .profile .left a svg path", { stroke: "none" }, 0)
    .to(".visual .subText .copyright", { color: "#777777" }, 0);
}

    // 모드 변경 후 현재 활성 메뉴 색상 갱신
    applyLinkColors();
  });

  // 페이지 로드 시 첫 번째 메뉴 활성화
  setActiveLink(links[0]);


  // 초기 세팅
  const savedIndex = window.activeIndex || 0;
  const initialLink = links[savedIndex] || links[0];
  setActiveLink(initialLink);

  // 이벤트
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      moveHighlightTo(link);
    });

    link.addEventListener('click', e => {
      // e.preventDefault(); (a 태그 기본 동작 막는 코드)
      setActiveLink(link);
    });
  });

  gnb.addEventListener('mouseleave', () => {
    const activeLink = gnb.querySelector('a.active');
    moveHighlightTo(activeLink);
  });
});

function copyEmail() {
    navigator.clipboard.writeText('qazxcvbnm322@naver.com');
    alert('이메일이 복사되었습니다!');
}


// Visual-Logo-spin Gsap
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".line1 .logo-spin", {
    rotation: 360,
    ease: "none",
    scrollTrigger: {
      trigger: ".visual",
      start: "top top",
      end: "bottom top",
      scrub: 0.1,
    }
  });

  // 가로스크롤 start
  gsap.registerPlugin(ScrollTrigger);   

  let sections = gsap.utils.toArray(".narrative-container section");
  {
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

// narrtive 표지 마우스 hover시 사진 변경
const tabs = document.querySelectorAll('.tab');
const mainImage = document.getElementById('mainImage');
const mainTxt = document.getElementById('mainTxt');

tabs.forEach(tab => {
  tab.addEventListener('mouseenter', () => {
    const imageName = tab.getAttribute('data-image');
    const text = tab.getAttribute('data-text');
    mainImage.setAttribute('src', `images/${imageName}`);
    mainTxt.textContent = text;
  });

  tab.addEventListener('mouseleave', () => {
    // 이미지 & 텍스트 원래대로
    mainImage.setAttribute('src', 'images/narrativePhoto.png');
    mainTxt.textContent = '각 키워드에 마우스를 올려보세요 ☺';
  });
});





// narrtive 표지  Scroll-btn 클릭 시 페이지 이동
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





// orizin marquee
  function cloneMarqueeContent(trackSelector) {
    const track = document.querySelector(trackSelector);
    const content = track.children[0].cloneNode(true);
    track.appendChild(content);
  }

  cloneMarqueeContent('#marquee1 .marquee-track');
  cloneMarqueeContent('#marquee2 .marquee-track');

  
//  Tooltip 스크롤
const tooltip = document.querySelector(".tooltip");
const nowSection = document.querySelector(".narrative-container .now");

gsap.to(tooltip, {
  top: "50%",
  left: "20%",
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
      const accordionIcon = item.querySelector('.accordion-icon');
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

    const parentRect = item.parentElement.getBoundingClientRect();
    const leftPos = item.offsetLeft + 0;

    gsap.to(indicator, {
      duration: 0.5,
      x: leftPos,
      ease: 'power2.out',
    });
  });
});

// ⭐️ hover 시 효과
document.querySelectorAll('.icon-circle').forEach(circle => {
  const icon = circle.querySelector('svg');

  circle.addEventListener('mouseenter', () => {
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





















  }
});
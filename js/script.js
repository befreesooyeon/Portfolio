// header highlight
document.addEventListener("DOMContentLoaded", () => {
  const gnb = document.querySelector('.gnb-c');
  const highlight = gnb.querySelector('.highlight');
  const links = gnb.querySelectorAll('a');

  const padX = 8; // 가상 padding-left/right
  const padY = 4;  // 가상 padding-top/bottom

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
    // localStorage 대신 메모리에 저장
    window.activeIndex = [...links].indexOf(link);
    moveHighlightTo(link);
  }

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
      e.preventDefault();
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

  tabs.forEach(tab => {
    tab.addEventListener('mouseenter', () => {
      const imageName = tab.getAttribute('data-image');
      mainImage.setAttribute('src', `images/${imageName}`);
    });

    tab.addEventListener('mouseleave', () => {
      // 기본 이미지로 다시 복귀 (원한다면)
      mainImage.setAttribute('src', 'images/narrativePhoto.png');
    });
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
  top: "55%",
  left: "67%",
  ease: "none",
  scrollTrigger: {
    trigger: '.narrative-container',
    start: 'top top',
    end: () => "+=" + (nowSection.offsetLeft + nowSection.offsetWidth) + "px", // .now 섹션이 끝나는 지점
    scrub: 1,
  }
});

document.addEventListener('mousemove', (e) => {
  if (!draggedElement) return;
  
  const container = draggedElement.closest('.images').getBoundingClientRect();
  draggedElement.style.left = (e.clientX - container.left - offsetX) + 'px';
  draggedElement.style.top = (e.clientY - container.top - offsetY) + 'px';
});

document.addEventListener('mouseup', () => {
  if (draggedElement) {
    draggedElement.classList.remove('dragging');
    draggedElement = null;
  }
});


// 모달 이벤트 시작
// 모달 열기
document.querySelector('.now .folder > img').addEventListener('click', function() {
  const modal = document.getElementById('folderModal');
  const body = document.body;
  const container = document.querySelector('.narrative-container');
  
  modal.classList.add('active');
  body.classList.add('modal-open');
  container.classList.add('modal-open');
});

// 모달 닫기 함수
function closeModal() {
  const modal = document.getElementById('folderModal');
  const body = document.body;
  const container = document.querySelector('.narrative-container');
  
  modal.classList.remove('active');
  body.classList.remove('modal-open');
  container.classList.remove('modal-open');
}

// 빨간 버튼 클릭시 닫기
document.querySelector('.r').addEventListener('click', closeModal);

// 오버레이 클릭시 닫기
document.querySelector('.modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
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












  }
});
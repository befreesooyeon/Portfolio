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
    localStorage.setItem('activeIndex', [...links].indexOf(link));
    moveHighlightTo(link);
  }

  // 초기 세팅
  const savedIndex = localStorage.getItem('activeIndex');
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

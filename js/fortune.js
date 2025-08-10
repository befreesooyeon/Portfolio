class FortuneCardModal {
    constructor() {
        this.selectedCard = null;
        this.isFortuneShown = false;
        this.fortunePool = this.createFortunePool();
        this.todaysCards = []; // 오늘의 3장 카드
        
        this.init();
    }

    // 디자이너 운세 50개 풀
    createFortunePool() {
        return [
            { title: "창의력 폭발의 날! 🎨", description: "오늘은 당신의 창의적 아이디어가 빛을 발하는 날입니다.\n새로운 디자인 컨셉이나 색상 조합을 과감히 시도해보세요." },
            { title: "협업의 황금기 ⭐", description: "동료들과의 소통이 특히 원활한 날입니다.\n팀 프로젝트나 브레인스토밍에서 좋은 결과를 얻을 거예요." },
            { title: "완벽주의자의 날 ✨", description: "디테일에 집중하기 좋은 날입니다.\n평소 미뤄두었던 세밀한 작업들을 완성하기에 최적의 시기예요." },
            { title: "컬러 마법사 🌈", description: "색상에 대한 감각이 최고조에 달한 날!\n평소 시도하지 않았던 컬러 팔레트를 실험해보세요." },
            { title: "타이포의 신 📝", description: "폰트와 텍스트 레이아웃이 술술 풀리는 날입니다.\n새로운 타이포그래피 스타일에 도전해보세요." },
            { title: "레이아웃 달인 📐", description: "공간 활용과 배치 감각이 뛰어난 하루!\n복잡한 레이아웃도 깔끔하게 정리될 거예요." },
            { title: "아이디어 샘물 💡", description: "끊임없이 새로운 아이디어가 떠오르는 날입니다.\n메모장을 준비하고 모든 영감을 기록하세요." },
            { title: "클라이언트 천사 😇", description: "클라이언트와의 소통이 매우 원활할 예정!\n수정 요청도 건설적이고 협조적일 거예요." },
            { title: "트렌드 센서 📡", description: "최신 디자인 트렌드를 빠르게 캐치하는 날!\n새로운 스타일을 작업에 적극 반영해보세요." },
            { title: "브랜딩 마스터 🏆", description: "브랜드 아이덴티티 작업에 최적화된 하루입니다.\n로고나 브랜딩 요소가 완벽하게 표현될 거예요." },
            { title: "일러스트 요정 🧚‍♀️", description: "그림 그리는 손이 특히 부드러운 날!\n일러스트레이션 작업이 술술 진행될 예정이에요." },
            { title: "UI 천재 📱", description: "사용자 경험을 고려한 인터페이스 디자인이 빛나는 날!\n직관적이고 아름다운 UI가 탄생할 거예요." },
            { title: "포토샵 신 🖼️", description: "이미지 보정과 합성 실력이 절정에 달한 하루!\n어떤 까다로운 작업도 완벽하게 처리할 수 있어요." },
            { title: "프레젠테이션 스타 🌟", description: "작업물을 멋지게 발표하기 좋은 날입니다.\n당신의 디자인이 모든 이의 시선을 사로잡을 거예요." },
            { title: "디테일 탐정 🔍", description: "작은 오류나 개선점을 찾아내는 능력이 뛰어난 날!\n완성도 높은 결과물을 만들어낼 수 있어요." },
            { title: "감성 디자이너 💝", description: "감정을 표현하는 디자인이 특히 잘 나오는 하루!\n따뜻하고 인간적인 작품이 완성될 거예요." },
            { title: "미니멀 마에스트로 ⚪", description: "군더더기 없는 깔끔한 디자인의 대가가 되는 날!\n'Less is more'의 진정한 의미를 보여주세요." },
            { title: "패키지 아티스트 📦", description: "포장 디자인이나 3D 표현에 뛰어난 감각을 보이는 날!\n입체적 사고가 작품에 생명을 불어넣을 거예요." },
            { title: "모션 마법사 🎬", description: "움직이는 그래픽 디자인에 재능을 발휘하는 하루!\n애니메이션과 인터랙션이 생생하게 살아날 예정이에요." },
            { title: "소셜미디어 킹 👑", description: "SNS 콘텐츠 디자인이 대박 나는 날!\n바이럴될 만한 비주얼을 만들어낼 수 있어요." },
            { title: "웹디자인 구루 💻", description: "웹사이트 디자인이 완벽하게 구현되는 하루!\n사용자 친화적이면서 아름다운 웹페이지가 탄생할 거예요." },
            { title: "아이덴티티 크리에이터 🎭", description: "독특하고 기억에 남는 시각적 정체성을 만드는 날!\n당신만의 스타일이 선명하게 드러날 거예요." },
            { title: "컨셉 제너레이터 ⚡", description: "기획 단계에서 번뜩이는 아이디어가 샘솟는 날!\n남들이 생각하지 못한 참신한 컨셉을 제시할 수 있어요." },
            { title: "칼라 하모니스트 🎵", description: "색상 조합이 완벽한 하모니를 이루는 날!\n어떤 컬러를 매치해도 조화로운 결과를 얻을 거예요." },
            { title: "공간 디자이너 🏠", description: "공간감과 깊이 표현이 뛰어난 하루입니다.\n평면 작업에서도 입체적 느낌을 살릴 수 있어요." },
            { title: "스토리텔러 📚", description: "디자인으로 이야기를 전달하는 능력이 빛나는 날!\n보는 이의 마음을 움직이는 서사가 담긴 작품이 나올 거예요." },
            { title: "퍼펙셔니스트 💎", description: "완벽을 추구하는 당신의 성향이 최고의 결과를 만드는 날!\n100% 만족스러운 작품이 완성될 예정이에요." },
            { title: "트러블 슈터 🛠️", description: "문제 해결 능력이 뛰어난 하루입니다.\n까다로운 디자인 이슈도 창의적으로 해결할 수 있어요." },
            { title: "인스피레이션 자석 🧲", description: "어디서든 영감을 끌어오는 날!\n일상의 소소한 것들이 모두 디자인 아이디어가 될 거예요." },
            { title: "커뮤니케이터 💬", description: "디자인으로 메시지를 전달하는 능력이 최고조!\n복잡한 정보도 직관적으로 표현할 수 있어요." },
            { title: "이모션 디렉터 🎭", description: "감정을 자유자재로 조절하는 디자인이 나오는 날!\n보는 이의 마음을 원하는 대로 움직일 수 있어요." },
            { title: "비주얼 스토리텔러 📖", description: "그림만으로도 완전한 이야기를 전달하는 날!\n텍스트 없이도 메시지가 명확하게 전달될 거예요." },
            { title: "하모니 크리에이터 🎼", description: "모든 요소들이 완벽한 균형을 이루는 날!\n디자인의 모든 부분이 조화롭게 어우러질 거예요." },
            { title: "이노베이터 🚀", description: "혁신적인 아이디어로 업계를 놀라게 하는 날!\n아무도 시도하지 않은 새로운 방식을 선보일 수 있어요." },
            { title: "클래식 모던 ⚖️", description: "전통과 현대를 완벽하게 결합하는 능력이 빛나는 날!\n시대를 초월하는 아름다운 디자인이 탄생할 거예요." },
            { title: "감각적 아티스트 👁️", description: "시각적 센스가 극도로 예민해지는 하루!\n미묘한 차이도 놓치지 않는 날카로운 안목을 발휘할 수 있어요." },
            { title: "프로젝트 매니저 📊", description: "여러 작업을 동시에 완벽하게 관리하는 날!\n효율성과 퀄리티를 모두 잡을 수 있어요." },
            { title: "크리에이티브 디렉터 🎪", description: "전체적인 비전을 제시하고 팀을 이끄는 리더십이 빛나는 날!\n당신의 창의적 방향성이 프로젝트를 성공으로 이끌 거예요." },
            { title: "디지털 아티스트 🎨", description: "디지털 도구를 마법처럼 다루는 하루!\n새로운 기술이나 소프트웨어도 금세 마스터할 수 있어요." },
            { title: "브랜드 스토리텔러 📝", description: "브랜드의 본질을 시각적으로 완벽하게 표현하는 날!\n기업의 철학과 가치가 디자인에 고스란히 담길 거예요." },
            { title: "유저 익스피리언스 닌자 🥷", description: "사용자의 마음을 읽는 직감이 뛰어난 하루!\n편의성과 아름다움을 동시에 만족시키는 디자인이 나올 거예요." },
            { title: "비주얼 아이덴티티 마스터 🎯", description: "강력하고 기억에 남는 시각적 정체성을 창조하는 날!\n한 번 보면 잊을 수 없는 임팩트 있는 디자인이 완성될 거예요." },
            { title: "크로스 플랫폼 전문가 📱💻", description: "다양한 매체와 플랫폼에 최적화된 디자인이 나오는 날!\n어떤 화면에서 봐도 완벽한 비주얼을 구현할 수 있어요." },
            { title: "컨텐츠 큐레이터 🎬", description: "정보를 보기 좋게 정리하고 배치하는 능력이 최고조!\n복잡한 콘텐츠도 직관적이고 매력적으로 표현할 수 있어요." },
            { title: "아트 디렉터 🖼️", description: "전체적인 예술적 방향성을 제시하는 안목이 빛나는 날!\n프로젝트의 비주얼 톤앤매너를 완벽하게 설정할 수 있어요." },
            { title: "패턴 메이커 🔄", description: "반복적 요소와 패턴 디자인에 천재적 감각을 보이는 날!\n단순한 형태도 리듬감 있는 아름다운 패턴으로 승화시킬 거예요." },
            { title: "아이코노그래퍼 🔣", description: "아이콘과 픽토그램 디자인이 완벽하게 나오는 하루!\n복잡한 개념도 단순하고 직관적인 심볼로 표현할 수 있어요." },
            { title: "에디토리얼 디자이너 📰", description: "텍스트와 이미지를 조화롭게 배치하는 능력이 뛰어난 날!\n읽는 재미와 보는 즐거움을 동시에 만족시킬 수 있어요." },
            { title: "익스피리멘탈 아티스트 🔬", description: "실험적이고 도전적인 디자인을 시도하기 좋은 날!\n새로운 기법이나 스타일을 과감하게 적용해보세요." },
            { title: "비주얼 코뮤니케이터 📡", description: "시각적 언어로 완벽하게 소통하는 날!\n말하지 않아도 느껴지는, 보는 것만으로도 이해되는 디자인이 나올 거예요." },
            { title: "럭키 디자이너 🍀", description: "오늘은 모든 일이 순조롭게 풀리는 행운의 날!\n평소보다 빠르고 만족스러운 결과를 얻을 수 있을 거예요." }
        ];
    }

    init() {
        this.checkDailyLimit();
        this.bindEvents();
    }

    // 하루 한 번 제한 체크
    checkDailyLimit() {
        const today = new Date().toDateString();
        const lastDrawDate = localStorage.getItem('fortuneDrawDate');
        
        if (lastDrawDate === today) {
            // 이미 오늘 뽑았음
            this.showTodayAlreadyDrawn();
        } else {
            // 오늘 첫 뽑기 - 새로운 3장 카드 생성
            this.generateTodaysCards();
        }
    }

    // 오늘의 카드 3장 랜덤 생성
    generateTodaysCards() {
        const shuffled = [...this.fortunePool].sort(() => Math.random() - 0.5);
        this.todaysCards = shuffled.slice(0, 3);
    }

    // 이미 오늘 뽑았을 때 상태 복원
    showTodayAlreadyDrawn() {
        const savedCards = localStorage.getItem('todaysCards');
        const drawnCard = localStorage.getItem('drawnCardIndex');
        
        if (savedCards && drawnCard) {
            this.todaysCards = JSON.parse(savedCards);
            const cardIndex = parseInt(drawnCard);
            
            // UI 상태 복원
            this.selectedCard = cardIndex + 1;
            this.isFortuneShown = true;
            this.restoreDrawnState(cardIndex);
        }
    }

    // 뽑기 완료 상태 복원
    restoreDrawnState(cardIndex) {
        const selectedCardEl = document.querySelector(`[data-card="${cardIndex + 1}"]`);
        const otherCards = document.querySelectorAll(`.cards li:not([data-card="${cardIndex + 1}"])`);
        const fortune = this.todaysCards[cardIndex];

        // 다른 카드들 숨기기
        otherCards.forEach(card => {
            card.style.display = 'none';
        });

        // 선택된 카드 상태 설정
        selectedCardEl.classList.add('selected', 'center');
        const cardInner = selectedCardEl.querySelector('.card-inner');
        cardInner.classList.add('flipped');

        // 카드 내용 설정
        const cardTitleEl = selectedCardEl.querySelector('.fortune-title');
        const cardDescEl = selectedCardEl.querySelector('.fortune-description');
        cardTitleEl.textContent = fortune.title;
        cardDescEl.textContent = fortune.description;

        // 타이틀 숨기기
        document.querySelector('.main-title').classList.add('fade-out');

        // 버튼 상태
        const btn = document.getElementById('selectBtn');
        btn.textContent = '포트폴리오도 함께 살펴보세요! 📂';
        btn.classList.add('show');
    }

    bindEvents() {
        // 카드 클릭 이벤트
        document.querySelectorAll('.cards li').forEach(card => {
            card.addEventListener('click', () => {
                const cardNumber = parseInt(card.dataset.card);
                this.selectCard(cardNumber);
            });
        });

        // 버튼 클릭 이벤트
        document.getElementById('selectBtn').addEventListener('click', () => {
            if (this.isFortuneShown) {
                this.closeModal();
            } else {
                this.showFortune();
            }
        });

        // 닫기 버튼
        document.querySelector('.modal-close-btn').addEventListener('click', () => {
            this.closeModal();
        });
    }

    selectCard(cardNumber) {
        // 이미 오늘 뽑았으면 선택 불가
        const today = new Date().toDateString();
        const lastDrawDate = localStorage.getItem('fortuneDrawDate');
        
        if (lastDrawDate === today && this.isFortuneShown) {
            return;
        }

        // 이전 선택 해제
        document.querySelectorAll('.cards li').forEach(card => {
            card.classList.remove('selected');
        });

        // 새 카드 선택
        const selectedCardEl = document.querySelector(`[data-card="${cardNumber}"]`);
        selectedCardEl.classList.add('selected');
        this.selectedCard = cardNumber;

        // 버튼 표시
        this.showButton();
    }

    showButton() {
        const btn = document.getElementById('selectBtn');
        btn.classList.add('show');
    }

    hideButton() {
        const btn = document.getElementById('selectBtn');
        btn.classList.remove('show');
    }

    showFortune() {
        if (!this.selectedCard || this.isFortuneShown) return;

        const cardIndex = this.selectedCard - 1; // 0-based index
        const selectedCardEl = document.querySelector(`[data-card="${this.selectedCard}"]`);
        const otherCards = document.querySelectorAll(`.cards li:not([data-card="${this.selectedCard}"])`);
        const fortune = this.todaysCards[cardIndex];

        this.isFortuneShown = true;

        // 로컬스토리지에 저장 (하루 제한용)
        const today = new Date().toDateString();
        localStorage.setItem('fortuneDrawDate', today);
        localStorage.setItem('todaysCards', JSON.stringify(this.todaysCards));
        localStorage.setItem('drawnCardIndex', cardIndex.toString());

        // 버튼 숨기기
        this.hideButton();

        // 타이틀 페이드아웃
        document.querySelector('.main-title').classList.add('fade-out');

        // 다른 카드들 즉시 숨기기
        otherCards.forEach(card => {
            card.style.display = 'none';
        });

        // 카드 뒷면 내용 설정
        const cardTitleEl = selectedCardEl.querySelector('.fortune-title');
        const cardDescEl = selectedCardEl.querySelector('.fortune-description');
        cardTitleEl.textContent = fortune.title;
        cardDescEl.textContent = fortune.description;

        // 선택된 카드를 중앙으로 이동하고 확대
        setTimeout(() => {
            selectedCardEl.classList.add('center');
            
            // 3D 회전 시작
            setTimeout(() => {
                const cardInner = selectedCardEl.querySelector('.card-inner');
                cardInner.classList.add('flipped');
                
                // 버튼 텍스트 변경 후 표시
                setTimeout(() => {
                    const btn = document.getElementById('selectBtn');
                    btn.textContent = '포트폴리오도 함께 살펴보세요! 📂';
                    btn.classList.add('show');
                }, 1500);
                
            }, 800);
        }, 600);
    }

    closeModal() {
        const modal = document.getElementById('fortuneModal');
        modal.classList.add('hidden');
        
        // 상태 초기화 (오늘 뽑았다면 초기화하지 않음)
        const today = new Date().toDateString();
        const lastDrawDate = localStorage.getItem('fortuneDrawDate');
        
        if (lastDrawDate !== today) {
            setTimeout(() => {
                this.resetFortune();
            }, 300);
        }
    }

    openModal() {
        const modal = document.getElementById('fortuneModal');
        modal.classList.remove('hidden');
    }

    resetFortune() {
        // 상태 초기화
        this.selectedCard = null;
        this.isFortuneShown = false;

        // 모든 요소 초기 상태로 복귀
        document.querySelectorAll('.cards li').forEach(card => {
            card.classList.remove('selected', 'hide', 'center');
            card.style.display = 'block';
            const cardInner = card.querySelector('.card-inner');
            cardInner.classList.remove('flipped');
        });

        document.querySelector('.main-title').classList.remove('fade-out');
        
        const btn = document.getElementById('selectBtn');
        btn.textContent = '운세 열어보기';
        btn.classList.remove('show');

        // 새로운 3장 카드 생성
        this.generateTodaysCards();
    }
}

// 전역 함수
function openModal() {
    if (window.fortuneModal) {
        window.fortuneModal.openModal();
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.fortuneModal = new FortuneCardModal();
}); 
// ---------- МИНИ-ИГРА: НАЙДИ ПАРУ ----------
let currentGameData = [];

function startMiniGame(gameType) {
    if (gameType === 'pair') {
        loadPairGame();
    }
}

function loadPairGame() {
    const grid = document.getElementById('mini-game-content');
    grid.innerHTML = '<div class="pair-game-grid" id="pair-grid"></div>';
    const pairGrid = document.getElementById('pair-grid');
    
    // Создаём пары
    const pairs = [];
    for (let i = 0; i < currentGameData.length; i++) {
        const q = currentGameData[i];
        const correctWord = q.options[q.correctIndex];
        let image = "";
        if (typeof q.image === 'string' && q.image.startsWith('http')) {
            image = '<img src="' + q.image + '" style="width: 80px; height: 80px;">';
        } else {
            image = q.image;
        }
        pairs.push({ image: image, word: correctWord });
    }
    
    // Перемешиваем
    const allCards = [];
    for (let i = 0; i < pairs.length; i++) {
        allCards.push({ type: 'image', value: pairs[i].image, pairId: i });
        allCards.push({ type: 'word', value: pairs[i].word, pairId: i });
    }
    for (let i = allCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }
    
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    
    allCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'pair-card';
        cardElement.dataset.pairId = card.pairId;
        cardElement.dataset.type = card.type;
        cardElement.dataset.value = card.value;
        
        if (card.type === 'image') {
            cardElement.innerHTML = card.value;
        } else {
            cardElement.innerHTML = '<div class="word">' + card.value + '</div>';
        }
        
        cardElement.onclick = () => {
            if (lockBoard) return;
            if (cardElement.classList.contains('matched')) return;
            cardElement.classList.add('flipped');
            
            if (!firstCard) {
                firstCard = cardElement;
            } else if (!secondCard) {
                secondCard = cardElement;
                lockBoard = true;
                
                if (firstCard.dataset.pairId === secondCard.dataset.pairId) {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        firstCard = null;
                        secondCard = null;
                        lockBoard = false;
                    }, 1000);
                }
            }
        };
        pairGrid.appendChild(cardElement);
    });
}

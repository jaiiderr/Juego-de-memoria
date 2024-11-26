// Definir las cartas
const cardValues = ['🍎', '🍌', '🍇', '🍉', '🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍒', '🍓', '🍊', '🍍', '🍊', '🍍'];

// Variables para los intentos y emparejamientos
let num = 32
let attempts = num;
let matchedPairs = 0;
let flippedCards = []; 
const matchedFruits = []; 
document.getElementById('attempts').textContent = attempts;

// Barajar las cartas aleatoriamente
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

// Crear el tablero de cartas
function createBoard() {
    const board = document.querySelector('.board');
    shuffle(cardValues); 

    
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', index);
        card.setAttribute('data-value', value);

        
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${value}</div>
        `;
        
        
        card.addEventListener('click', flipCard);
        
        board.appendChild(card);
    });
}

// Actualizar el contador de intentos y frutas emparejadas
function updateScore() {
    document.getElementById('score').textContent = matchedPairs; 
    document.getElementById('attempts').textContent = attempts; 

    
    const matchedList = document.getElementById('matched-fruits');
    matchedList.innerHTML = '';
    matchedFruits.forEach(fruit => {
        const listItem = document.createElement('span');
        listItem.textContent = fruit;
        matchedList.appendChild(listItem);
    });
}

// Giro de las cartas
function flipCard(event) {
    const card = event.target.closest('.card');

    if (flippedCards.length === 2 || card.classList.contains('flipped') || attempts <= 0) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    
    attempts--;

    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800); 
    }

    updateScore(); 
}

// Comprobar si las cartas coinciden
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    
    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchedPairs++;
        matchedFruits.push(firstCard.getAttribute('data-value')); 
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
    } else {
        
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    
    flippedCards = [];

    
    if (matchedPairs === cardValues.length / 2) {
        showModal(true); 
    }

    if (attempts === 0 && matchedPairs < cardValues.length / 2) {
        showModal(false); 
    }

    updateScore(); 
}

// Mostrar el modal
function showModal(isWinner) {
    const modal = document.getElementById('end-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalFruits = document.getElementById('modal-fruits');
    const modalAttempts = document.getElementById('modal-attempts');
    const resetButton = document.getElementById('reset-button');
    
    
    modal.style.display = 'flex';

    
    if (isWinner) {
        modalMessage.textContent = '¡Felicidades, has ganado! 🎉';
        modalAttempts.textContent = `Intentos restantes: ${attempts}`;
        modalFruits.textContent = ''; 
        modal.classList.add('modal-green');  
        modal.classList.remove('modal-red'); 
    } else {
        modalMessage.textContent = '¡Lo siento, has perdido! 😞';
        modalAttempts.textContent = `Frutas emparejadas: ${matchedFruits.join(', ')}`;
        modalFruits.textContent = ''; 
        modal.classList.add('modal-red');  
        modal.classList.remove('modal-green'); 
    }

    
    resetButton.addEventListener('click', resetGame);
    
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            resetGame();
        }
    });
}

// Reiniciar el juego
function resetGame() {
    
    attempts = num;
    matchedPairs = 0;
    flippedCards = [];
    matchedFruits.length = 0;

    
    document.querySelector('.board').innerHTML = '';
    document.getElementById('matched-fruits').innerHTML = '';
    createBoard(); 

    
    updateScore();

    
    const modal = document.getElementById('end-modal');
    modal.style.display = 'none';
}

createBoard();

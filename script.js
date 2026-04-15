/* --- APP INITIALIZATION --- */
window.addEventListener('load', () => {
    startBlinking();
});

function getDoraemonElement() {
    return document.querySelector('.doraemon');
}

// --- REGULAR ANIMATIONS ---
function startBlinking() {
    setInterval(() => {
        const d = getDoraemonElement();
        if (!d) return;

        if (!d.classList.contains('cool') && !d.classList.contains('proud') && !d.classList.contains('laughing') && !d.classList.contains('sleepy')) {
            d.classList.add('blink');
            setTimeout(() => d.classList.remove('blink'), 150);
        }
    }, 4000 + Math.random() * 2000);
}

window.setEmotion = function(emotion) {
    const d = getDoraemonElement();
    if (!d) return;

    d.className = 'doraemon'; 
    document.querySelectorAll('.eyeball').forEach(el => el.style.display = '');
    if (emotion !== 'normal') d.classList.add(emotion);
};

// --- CHAT SYSTEM ---
window.sendMessage = function() {
    const input = document.getElementById('user-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = ''; 
    processUserMessage(text);
};

// --- STATE MANAGEMENT FOR GAMES ---
let activeGame = null;
let gameState = {};

window.startGame = function(game) {
    activeGame = game;
    gameState = {};
    const chatInput = document.getElementById('user-input');
    
    if (game === 'rps') {
        setEmotion('happy');
        showReply('Rock Paper Scissors! Choose Rock, Paper, or Scissors in chat!');
    } else if (game === 'numguess') {
        setEmotion('thinking');
        gameState.secret = Math.floor(Math.random() * 20) + 1;
        gameState.attempts = 0;
        showReply('I am thinking of a number between 1 and 20. Guess it!');
    } else if (game === 'truthdare') {
        setEmotion('cool');
        showReply('Truth or Dare? Type Truth or Dare in the chat!');
    }
    if (chatInput) chatInput.focus();
};

window.endGame = function() {
    activeGame = null;
    gameState = {};
};

function processUserMessage(text) {
    const t = text.toLowerCase();

    if (t.includes('stop') || t.includes('quit') || t.includes('exit')) {
        endGame();
        return showReply('Game ended. Back to normal mode!');
    }

    if (activeGame === 'rps') return playRPS(t);
    if (activeGame === 'numguess') return playNumGuess(t);
    if (activeGame === 'truthdare') return playTruthDare(t);

    const response = getOfflineBrain(t);
    window.setEmotion(response.emotion);
    showReply(response.reply);
}

// --- CHAT-BASED GAMES LOGIC ---
function playRPS(text) {
    const choices = ['rock', 'paper', 'scissors'];
    let userChoice = choices.find(c => text.includes(c));
    
    if (!userChoice) {
        setEmotion('thinking');
        return showReply('Type your choice: Rock, Paper, or Scissors!');
    }

    const dChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';

    if (userChoice === dChoice) result = 'It is a tie!';
    else if (
        (userChoice === 'rock' && dChoice === 'scissors') ||
        (userChoice === 'paper' && dChoice === 'rock') ||
        (userChoice === 'scissors' && dChoice === 'paper')
    ) {
        result = 'You win!';
        setEmotion('cry'); 
    } else {
        result = 'I win!';
        setEmotion('proud');
    }
    
    showReply('I chose ' + dChoice + '... ' + result + ' Let us play again!');
}

function playNumGuess(text) {
    let num = parseInt(text.replace(/[^0-9]/g, ''));
    if (isNaN(num)) {
        setEmotion('thinking');
        return showReply('That is not a number! Guess a number 1-20.');
    }
    
    gameState.attempts++;
    if (num === gameState.secret) {
        setEmotion('laughing');
        showReply('You got it in ' + gameState.attempts + ' attempts! Great job!');
        endGame();
    } else if (num < gameState.secret) {
        setEmotion('shocked');
        showReply('Too low! Guess higher!');
    } else {
        setEmotion('shocked');
        showReply('Too high! Guess lower!');
    }
}

const truths = ['Who is your secret crush?', 'What is the most embarrassing thing you have done?', 'If you could be invisible, what would you do?'];
const dares = ['Do 10 jumping jacks.', 'Sing a song loudly.', 'Speak in a funny voice for the next minute.'];

function playTruthDare(text) {
    if (text.includes('truth')) {
        setEmotion('laughing');
        showReply(truths[Math.floor(Math.random() * truths.length)]);
    } else if (text.includes('dare')) {
        setEmotion('laughing');
        showReply(dares[Math.floor(Math.random() * dares.length)]);
    } else {
        setEmotion('thinking');
        showReply('Type Truth or Dare!');
    }
}

// --- OFFLINE/HARDCODED CHAT BRAIN ---
function getOfflineBrain(text) {
    const t = text.toLowerCase();
    
    if(t.includes('hello') || t.includes('hi')) return {reply: 'Hello there!', emotion: 'happy'};
    if(t.includes('how are you')) return {reply: 'I am doing great! Ready for some Dorayaki?', emotion: 'cool'};
    if(t.includes('dorayaki')) return {reply: 'YUMMY! I LOVE DORAYAKI!', emotion: 'love'};
    if(t.includes('who are you')) return {reply: 'I am Doraemon, a robot cat from the 22nd century!', emotion: 'proud'};
    if(t.includes('cute')) return {reply: 'Hehe, thank you!', emotion: 'laughing'};
    if(t.includes('mouse')) return {reply: 'IEEE! A MOUSE!', emotion: 'scared'};
    if(t.includes('gadget') || t.includes('anywhere door')) return {reply: 'Tara-raa! Anywhere Door!', emotion: 'proud'};
    if(t.includes('nobita')) return {reply: 'Nobita is always in trouble...', emotion: 'sad'};

    const randomReplies = [
        'Hmm, I see!', 
        'That is very interesting nari!', 
        'Let me see if I have a gadget for that.',
        'Oh really? I did not know that!'
    ];

    const reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
    return {reply: reply, emotion: 'normal'};
}

// --- UI HELPER ---
function showReply(text, isFinal = true) {
    const bubble = document.getElementById('doraemon-reply');
    if (!bubble) return;

    bubble.innerText = text;
    bubble.classList.add('visible');
    
    if (isFinal) {
        setTimeout(() => bubble.classList.remove('visible'), Math.max(3000, text.length * 100));
    }
}

/* --- MODAL GAMES (TIC TAC TOE & MEMORY) --- */
window.openGameModal = function(game) {
    const modal = document.getElementById('game-modal');
    const content = document.getElementById('game-content');
    const title = document.getElementById('game-title');
    
    if (!modal) return;
    modal.classList.add('active');
    
    if (game === 'tictactoe') {
        title.innerText = 'Tic Tac Toe';
        initTicTacToe();
    } else if (game === 'memory') {
        title.innerText = 'Memory Game';
        initMemoryGame();
    }
};

window.closeGameModal = function() {
    const modal = document.getElementById('game-modal');
    if (modal) modal.classList.remove('active');
    document.getElementById('game-content').innerHTML = '';
};

/* --- TIC TAC TOE LOGIC --- */
function initTicTacToe() {
    const content = document.getElementById('game-content');
    let boardHTML = '<div class="ttt-board">';
    for(let i=0; i<9; i++) {
        boardHTML += '<div class="ttt-cell" id="ttt-' + i + '" onclick="tttClick(' + i + ')"></div>';
    }
    boardHTML += '</div><button class="btn btn-cute btn-blue" style="margin:auto; display:block;" onclick="initTicTacToe()">Restart</button>';
    content.innerHTML = boardHTML;
    
    window.tttBoard = ['', '', '', '', '', '', '', '', ''];
    window.tttPlayer = 'X';
    setEmotion('happy');
}

window.tttClick = function(i) {
    if (window.tttBoard[i] !== '') return;
    
    window.tttBoard[i] = window.tttPlayer;
    document.getElementById('ttt-' + i).innerText = window.tttPlayer;
    
    if (checkTicTacToeWinner(window.tttPlayer)) {
        showReply(window.tttPlayer === 'X' ? 'You won the game!' : 'I won the game! Muhaha!', true);
        setEmotion(window.tttPlayer === 'X' ? 'sad' : 'proud');
        return;
    }
    
    if (!window.tttBoard.includes('')) {
        showReply('It is a draw!');
        setEmotion('cool');
        return;
    }
    
    window.tttPlayer = window.tttPlayer === 'X' ? 'O' : 'X';

    if (window.tttPlayer === 'O') {
        setTimeout(() => {
            let emptySpots = [];
            for (let j=0; j<9; j++) if (window.tttBoard[j] === '') emptySpots.push(j);
            if(emptySpots.length > 0) {
                let randomSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
                window.tttClick(randomSpot);
            }
        }, 500);
    }
};

function checkTicTacToeWinner(p) {
    const b = window.tttBoard;
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let w of wins) {
        if (b[w[0]] === p && b[w[1]] === p && b[w[2]] === p) return true;
    }
    return false;
}

/* --- MEMORY GAME LOGIC --- */
function initMemoryGame() {
    const content = document.getElementById('game-content');
    let html = '<div class="memory-board">';
    for(let i=0; i<4; i++) {
        html += '<div class="mem-cell" id="mem-' + i + '" onclick="memClick(' + i + ')"></div>';
    }
    html += '</div><h3 id="mem-status" style="color:#333;">Get Ready!</h3>';
    html += '<button class="btn btn-cute btn-blue" style="margin:auto; display:block;" onclick="startMemorySequence()">Start Sequence</button>';
    content.innerHTML = html;
    
    window.memSequence = [];
    window.memPlayerSeq = [];
}

window.startMemorySequence = function() {
    window.memSequence.push(Math.floor(Math.random() * 4));
    window.memPlayerSeq = [];
    document.getElementById('mem-status').innerText = 'Watch closely... (Level ' + window.memSequence.length + ')';
    setEmotion('thinking');
    
    let i = 0;
    let interval = setInterval(() => {
        flashMemCell(window.memSequence[i]);
        i++;
        if(i >= window.memSequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('mem-status').innerText = 'Your Turn! Repeat.';
            }, 800);
        }
    }, 800);
};

function flashMemCell(id) {
    const cell = document.getElementById('mem-' + id);
    if(!cell) return;
    cell.classList.add('flash');
    setTimeout(() => cell.classList.remove('flash'), 400);
}

window.memClick = function(id) {
    if (!document.getElementById('mem-status').innerText.includes('Your Turn')) return;
    
    flashMemCell(id);
    window.memPlayerSeq.push(id);
    
    let currentIdx = window.memPlayerSeq.length - 1;
    if (window.memPlayerSeq[currentIdx] !== window.memSequence[currentIdx]) {
        document.getElementById('mem-status').innerText = 'Game Over!';
        setEmotion('cry');
        setTimeout(initMemoryGame, 2000);
        return;
    }
    
    if (window.memPlayerSeq.length === window.memSequence.length) {
        document.getElementById('mem-status').innerText = 'Correct! Level Up...';
        setEmotion('happy');
        setTimeout(window.startMemorySequence, 1500);
    }
};

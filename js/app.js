// ********** Global Variables **********
//Create a list that holds all of your cards
const deck = document.querySelector('.deck');
const scorePanel = document.querySelector('.score-panel');
const popUp = document.querySelector('.pop-up');
let card = document.getElementsByClassName('card');
let gameStart = 0;
let gameTime = 0;
let moveCount = 0;
let flippedCards = [];
let matchedCards = [];
let cardList = ['fa-diamond', 
    'fa-paper-plane-o', 
    'fa-anchor', 
    'fa-bolt', 
    'fa-cube', 
    'fa-leaf', 
    'fa-bicycle', 
    'fa-bomb', 
    'fa-diamond', 
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'];

// ********** Restart the Game **********
//listen for click to the restart button
scorePanel.addEventListener('click', event => {
    const resetButton = event.target;    
    if (resetButton.classList.contains('fa-repeat')) {
        restartGame();
    }
})

//ADD a start new button with an event listener to run these functions?

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {
    let currentIndex = cardList.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardList[currentIndex];
        cardList[currentIndex] = cardList[randomIndex];
        cardList[randomIndex] = temporaryValue;
    }
    return cardList;
}

//Do a for look that loops through the cardList array and creates all 16 <li class="card"></li> within the <ul class="deck">
function dealTheCards() { 
    deck.innerHTML = ''; //clear the deck out
    for (let i = 0; i < cardList.length; i++) {
        let li = document.createElement("li");
        li.classList.add("card");
        let icon = document.createElement("i");
        li.appendChild(icon);
        icon.classList.add("fa");
        icon.classList.add(cardList[i]);
        deck.appendChild(li);
    }
}  
    
// ********** Move Counter **********

//keep count of the moves and publish the count to the counter
function trackMoves(moveCount) {
    //moveCount++;
    let movesText = document.querySelector('.moves');
    movesText.innerHTML = moveCount;
}

//********** Star Rating Code **********

//determine if a star needs to be removed from the score
function starRating () {
    if ( moveCount === 20 || moveCount === 30 ) {
        decrementStar();
    }
} 

//remove a star from the score
function decrementStar() {
    const stars = document.querySelectorAll('.stars li');
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break
        }
    }
}


// ********** Game Clock Code **********


//start the game clock
function startGameClock() {
    if (gameStart == 0) {
        gameStart = 1;
        gameClock(); 
    }
}

//calculate and publish the game time
function gameClock(gameStart) {
    if (gameStart == 1) {
        clockId = setInterval(() => {
        gameTime++;       
        publishGameClock(gameTime);
        }, 1000);
    }   
}

function publishGameClock(gameTime) {
    const clock = document.querySelector('.gameclock');
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    if (seconds < 10) { 
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    } 
}

function stopGameClock() {    
    clearInterval(clockId);
}

// **********Game Play Code**********

//set up the event listener for a card.
//make sure that it's the card that's being clicked and make sure that the array is only storing 2 cards at a time
deck.addEventListener('click', event => {
    const clickedCard = event.target;    
    if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('match')
        &&  flippedCards.length < 2
        && !flippedCards.includes(clickedCard)) {
        flipCardOver(clickedCard);
        addFlippedCards(clickedCard); 
        startGameClock();  
        if (gameStart == 1) {
            gameClock(gameStart);
        }  
        gameStart = 2;       
        if (flippedCards.length === 2) {
            checkMatching(flippedCards);
            moveCount++;
            trackMoves(moveCount);
            starRating(moveCount);
        }         
    } 
    //checkWinCondition(matchedCards);
    if (matchedCards.length == 16) {
        endTheGame(moveCount, gameTime);
        }
})

//flip the cards over
function flipCardOver (clickedCard) {
    clickedCard.classList.toggle('open');
    clickedCard.classList.toggle('show');  
}

//add flipped cards to the array
function addFlippedCards(clickedCard) {
    flippedCards.push(clickedCard);
}

//check to see if the cards are matching
function checkMatching (flippedCards) {
    if ( flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className ) {
        //leave cards flipped over since they match, empty flippedCards array to signal new turn
        matchingCards(flippedCards);
     } else { 
        //flip cards back over since no match, empty flippedCards array to signal new turn
        nonMatchingCards(flippedCards);        
    }
}
//remove 'open' and 'show' from the HTML classes of the cards and add in 'match'
function matchingCards (flippedCards) {
    flippedCards[0].classList.toggle('match');
    flippedCards[1].classList.toggle('match');
    flippedCards[0].classList.toggle('open');
    flippedCards[0].classList.toggle('show');
    flippedCards[1].classList.toggle('open');
    flippedCards[1].classList.toggle('show');
    matchedCards.push(flippedCards[0], flippedCards[1]);
    flippedCards.length = 0;
}
//remove 'open' and 'show' from the HTML classes of the cards to flip the cards back over
function nonMatchingCards (flippedCards) {
    setTimeout(() => {
        flippedCards[0].classList.toggle('open');
        flippedCards[0].classList.toggle('show');
        flippedCards[1].classList.toggle('open');
        flippedCards[1].classList.toggle('show');
        flippedCards.length = 0;
        }, 1000);
}


// ********** Resetting/restarting the game **********

//master restart function
function restartGame() {
    stopGameClock();
    resetGameClock();
    resetMoves();
    resetStars();
    resetCards();
    shuffle();
    dealTheCards();
    hidePopUp();
    gameStart = 0;
    gameTime = 0;
    moveCount = 0;
    flippedCards = [];
    matchedCards = [];
}

function resetGameClock() {
    gameTime = 0;
    const clock = document.querySelector('.gameclock');
    clock.innerHTML = '00:00';
}

function resetMoves() {
    moveCount = 0;
    let movesText = document.querySelector('.moves');
    movesText.innerHTML = moveCount;
}

function resetCards(card) { for (const i = 0; i < cardList.keys().length; i++) {
        if (card.classList.contains('open')) {
        card.style.display.classList.remove('open');
        }
        if (card.classList.contains('show')) {
        card.style.display.classList.remove('show');
        }
        if (card.classList.contains('match')) {
        card.style.display.classList.remove('match');
        }
    }
}

function resetStars() {
    const stars = document.querySelectorAll('.stars li');
    for (star of stars) {
        if (star.classList.contains('none')) {
        star.style.display.classList.remove('none');
        }
    }
}

//********** Make and show the pop up when winning the game **********

function endTheGame(moveCount, gameTime) {
        //stop the timer
        stopGameClock();
        //data fill pop up
        writeStatsToPopUp(moveCount, gameTime);
        //display the pop up
        displayPopUp();
}

function writeStatsToPopUp(moveCount, gameTime) {
    let finalMovesText = document.querySelector('.final-moves');
    finalMovesText.innerHTML = moveCount;
    let finalGameTime = document.querySelector('.final-gametime');  
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    if (seconds < 10) { 
        finalGameTime.innerHTML = `${minutes}:0${seconds}`;
    } else {
        finalGameTime.innerHTML = `${minutes}:${seconds}`;
    } 
}

function displayPopUp() {
        popUp.classList.remove('hide');
}

function hidePopUp() {
        popUp.classList.add('hide');
}

//event listener for the replay/restart button
popUp.addEventListener('click', event => {
    const replayButton = event.target;    
    if (replayButton.classList.contains('replay-button')) {
        restartGame();
    }
})

//event listener for the close pop up button
popUp.addEventListener('click', event => {
    const closeButton = event.target;
    if (closeButton.classList.contains('close-button')) {
        popUp.classList.add('hide');
    }
})
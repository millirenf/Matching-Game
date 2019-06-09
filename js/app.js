//Create a list that holds all of your cards
let moveCount = 0;
const cardList = [
     "fa fa-diamond",
     "fa fa-paper-plane-o",
     "fa fa-anchor",
     "fa fa-bolt",
     "fa fa-cube",
     "fa fa-leaf",
     "fa fa-bicycle",
     "fa fa-bomb",
     "fa fa-diamond",
     "fa fa-paper-plane-o",
     "fa fa-anchor",
     "fa fa-bolt",
     "fa fa-cube",
     "fa fa-leaf",
     "fa fa-bicycle",
     "fa fa-bomb"];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//ADD a start new button with an event listener to run these functions?

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardList) {
    var currentIndex = cardList.length, temporaryValue, randomIndex;

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
//function dealTheCards { for (const i = 0; i < cardList.length; i++) {
    //create the html card with <li class="card"> 
    const newCard = document.createElement('li', { is : 'card' });
    // and give it some content 
    const newCardType = document.createElement('i', { is : [cardList]}); 
    // add the text node to the newly created div
    newCard.appendChild(newCardType);  
    //search for the class 'deck' and assign it to the variable 'deckDiv'
    const deckDiv = document.getElementsByClassName('deck');
    //insert the new card into the deck
    //document.body.insertAdjacentHTML(newCard, deckDiv); 
    
          
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) - DONE
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//store clicked cards in an array
let flippedCards = [];

//set up the event listener for a card.
//make sure that it's the card that's being clicked and make sure that the array is only storing 2 cards at a time
const deck = document.querySelector('.deck')


deck.addEventListener('click', event => {
    const clickedCard = event.target;    
    if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('match')
        &&  flippedCards.length < 2
        && !flippedCards.includes(clickedCard)) {
        flipCardOver(clickedCard);
        addFlippedCards(clickedCard);
        if (flippedCards.length === 2) {
            //checkMatching();            
            console.log('2 cards have been selected');
            checkMatching(flippedCards);
            trackMoves();
            //moveCount++;
            console.log(moveCount);
        }         
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

function matchingCards (flippedCards) {
    flippedCards[0].classList.toggle('match');
    flippedCards[1].classList.toggle('match');
    flippedCards[0].classList.toggle('open');
    flippedCards[0].classList.toggle('show');
    flippedCards[1].classList.toggle('open');
    flippedCards[1].classList.toggle('show');
    flippedCards.length = 0;
}

function nonMatchingCards (flippedCards) {
    setTimeout(() => {
        flippedCards[0].classList.toggle('open');
        flippedCards[0].classList.toggle('show');
        flippedCards[1].classList.toggle('open');
        flippedCards[1].classList.toggle('show');
        flippedCards.length = 0;
        }, 1000);
}


function trackMoves(moveCount) {
    moveCount++;
    let movesText = document.querySelector('.moves');
    movesText.innerHTML = moveCount;
}
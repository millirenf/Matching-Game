/*
 * Create a list that holds all of your cards
 */const cardList = [
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
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//set up the event listener for a card.
//make sure that it's the card that's being clicked and make sure that the array is only storing 2 cards at a time
const deck = document.querySelector('.deck')

deck.addEventListener('click', checkCardOrNot);

function checkCardOrNot () {
    const clickedCard = event.target;
    
    if (clickedCard.classList.contains('card') && flippedCards.length < 2) {
        flipCardOver (clickedCard);
    }
}

//flip the cards over
function flipCardOver (clickedCard) {
    clickedCard.classList.toggle('open');
    clickedCard.classList.toggle('show');  
}

//store clicked cards in an array
let flippedCards = [];

function addFlippedCards (clickedCard) {
    flippedCards.push(clickedCard);
}

//https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/

//lines 74-84 work. They only trigger when clicking on a card and it returns the class of the card, both 'li' and 'i'
//next steps - capture first and second clicks using a while loop, comparing the event.targets of the two clicks.  Event target 1 = whatever, event target 2 = whatever, compare them.
//how do I send the 'over show' class to the 'li'? then switch it back or lock it as a match?
//change the check on event.target to contains 'card' AND does not contain show AND does not contain match, eliminating the chance of errant clicks




 //*  - display the card's symbol (put this functionality in another function that you call from this one)

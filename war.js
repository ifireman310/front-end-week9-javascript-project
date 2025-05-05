/*
This final project is an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.    

    The game itself will automatically play using console.log() to display turns, points, cards used, and the outcome of the game. No user input via prompts is required.
 
The completed project should, when executed, do the following:

    - Deal 26 Cards to each Player from a Deck of 52 cards.
    - Iterate through the turns where each Player plays a Card.
    - The Player who played the higher card is awarded a point.
        - Ties result in zero points for both Players.
    - After all cards have been played, display the score and declare the winner.

    Author: Ian Fireman
*/

class Card {
    constructor (rank, suit, value) {
        this.rank = rank;
        this.suit = suit;
        this.value = value;
    }
}

class Deck {

    constructor () {
        this.cards = []; // Array of card objects, full deck is 52 cards
    }

    // Use this method to create & full deck of cards and shuffle them
    buildFullDeck() {
        this._populate();
        this._shuffle();
        return this.cards;
    }

    // Private method that creates a sorted 52 card deck
    _populate() {
        const cardSuits = ['♠', '♣', '♥', '♦'];
        const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        for (let i = 0; i < cardSuits.length; i++) { // Loop over the 4 different suits
            for (let j = 0; j < values.length; j++) { // Loop over the 13 different card values
                this.cards.push(new Card(ranks[j],cardSuits[i],values[j]));
            }
        }
    }

    // Private method that shuffles a deck of cards
    _shuffle() {
        // Using method 2 from : https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
        this.cards.sort(() => Math.random() - 0.5);
    }

}

class Player {

    constructor(name) {
        this.name = name;
        this.score = 0;
        this.deck = []
    }

}

class App {

    constructor() {
        this._players = [];
        this._deck = [];
    }

    startWarGame() {
        console.log("**** Welcome to War! ****")
        let input = prompt("Press 0 to exit, or any key to play");
        while (input != '0') {
            switch (input) {
                case '0':
                    exit;
                default:
                    this._createNewGame();
                    break;
            }  
            input = prompt("Would you like to play again? 0 to exit, any other key to play again");
        }
    }

    _createNewGame() {

        console.log("**** Starting new Game! ****")
        // First create the players for the game
        this._players[0] = new Player("Player 1");
        this._players[1] = new Player("Player 2");

        // Create a shuffled deck
        console.log("Building the deck...")
        const dealerDeck = new Deck().buildFullDeck();

        // Allocate half the deck to each player
        console.log("Dealing player hands...")
        let deckSize = dealerDeck.length; // Allow for different sized decks (potential future update?)

        if (deckSize % 2 != 0) {
            // If deck size is not even, remove the last card
            dealerDeck.pop;
            deckSize = dealerDeck.length
        }
        this._players[0].deck = [...dealerDeck.slice(0,deckSize/2)];
        this._players[1].deck = [...dealerDeck.slice(deckSize/2,deckSize)];

        // Now play out the game!
        console.log("Let the war begin!");
        console.log(`Starting score: ${this._players[0].name}: ${this._players[0].score}. ${this._players[1].name}: ${this._players[1].score}.`);

        for (let i = 0; i < deckSize/2; i++) {

            // Output what each player has drawn
            console.log(`Round ${i+1}. ${this._players[0].name} has the ${this._players[0].deck[i].rank} of ${this._players[0].deck[i].suit}`);
            console.log(`${this._players[1].name} has the ${this._players[1].deck[i].rank} of ${this._players[1].deck[i].suit}`);

            // Determine winner
            if (this._players[0].deck[i].value > this._players[1].deck[i].value) {
                // Player 1 wins this round
                this._players[0].score += 1;
                console.log(`${this._players[0].name} wins this round! New score: ${this._players[0].name}: ${this._players[0].score}. ${this._players[1].name}: ${this._players[1].score}.`);
            } else if (this._players[0].deck[i].value < this._players[1].deck[i].value ) {
                // Player 2 wins this round
                this._players[1].score += 1;
                console.log(`${this._players[1].name} wins this round! New score: ${this._players[0].name}: ${this._players[0].score}. ${this._players[1].name}: ${this._players[1].score}.`);
            } else {
                console.log(`This round is a tie! The score is unchanged: ${this._players[0].name}: ${this._players[0].score}. ${this._players[1].name}: ${this._players[1].score}.`);
            }
        }

        // Now determine the winner:
        console.log(`The game has concluded!`);
        if (this._players[0].score > this._players[1].score) {
            // Player 1 wins
            console.log(`${this._players[0].name} won with a score of ${this._players[0].score}!`);
        } else if (this._players[0].score < this._players[1].score){
            // Player 2 wins
            console.log(`${this._players[1].name} won with a score of ${this._players[1].score}!`);
        } else {
            // Tie
            console.log("The result is a tie! There are no winners in war...");
        }
    }
}

const app = new App();
app.startWarGame();

//creates cards array and stores cards objects into it

var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}
];

var cardsInPlay = [];

/*if uncommented: creates a shuffle function that will change 
the cards placement every time the board is created 

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
*/


/* checks whether the cards match or not
also, stores & displays number of times the game has won */

var checkForMatch = function(){
	var scoreMessage = document.getElementById('resultMessage');
	var scoreCount = document.getElementById('numberOfWins');
	if (cardsInPlay[0] === cardsInPlay[1]){

/* if a simple alert box is wanted to display the result 
message this code could be uncommented:
alert("Sou found a match!"); */

		scoreMessage.innerHTML="You found a match!";

//this code is for storing the winning score in the browser storage		
		var re;
		if (sessionStorage.getItem('score')===null){
		sessionStorage.setItem('score',1);
		re = sessionStorage.getItem('score');}
		else {
		re = parseInt(sessionStorage.getItem('score'))+1;
sessionStorage.setItem('score',re);
	};
		scoreCount.innerHTML=re;
	   document.getElementById('scoreBlock').appendChild(scoreMessage); 
	   document.getElementById('numberOfWins').appendChild(scoreCount); 
	}
	else {

/* if a simple alert box is wanted to display the result 
message this code could be uncommented:
alert("Sorry, try again."); */

		scoreMessage.innerHTML="Sorry, try again!";
	   document.getElementById('scoreBlock').appendChild(scoreMessage); 
/*I have chosen to display the score message differently 
in order to allow the 2nd card to be flipped before the 
message is displayed, which is something the alert box prevented*/
	};
};

//flips card when clicked and calls the checkForMatch function

var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	console.log("User flipped "+cards[cardId].rank)
	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	this.setAttribute('src',cards[cardId].cardImage);
	if (cardsInPlay.length === 2){	
	checkForMatch(); };
	};

//creates the board of cards everytime the page is loaded

var createBoard = function(){
	/*if uncommented calls the shuffle function before creating the board
	shuffle(cards); */
	for (var i = 0; i < cards.length; i++) {
var cardElement = document.createElement('img');
cardElement.setAttribute('src','images/back.png');
cardElement.setAttribute('data-id',i);
cardElement.addEventListener('click',flipCard);
document.getElementById('game-board').appendChild(cardElement);
};
};

//calls the createBoard function
createBoard();

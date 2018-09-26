

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

// creates a shuffle function that will change 
// the cards placement every time the board is created 

var shuffle = function(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}



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


//this function is to show the card when hovered over

var flipFront = function() {
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src',cards[cardId].cardImage);

};

//this function is to reverse the hoverover action
var flipBack = function() {
	if (this.getAttribute('id') === '1'){
	this.setAttribute('src','images/back.png');
};
};

//flips card when clicked and calls the checkForMatch function

var flipCard = function() {
	if (cardsInPlay.length < 2){
	var cardId = this.getAttribute('data-id');
	console.log("User flipped "+cards[cardId].rank)
	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	this.setAttribute('src',cards[cardId].cardImage);
	this.setAttribute('id','0')
	if (cardsInPlay.length === 2){	
	checkForMatch(); };
	} else {
//this alert box displays when the player has already gotten a result and continues to click on the cards
	alert("Play Again!");
	 };
	};

//creates the board of cards everytime the page is loaded

var createBoard = function(){
	// calls the shuffle function before creating the board
	shuffle(cards); 
	for (var i = 0; i < cards.length; i++) {
var cardElement = document.createElement('img');
cardElement.setAttribute('src','images/back.png');
cardElement.setAttribute('data-id',i);
cardElement.setAttribute('id','1');
//the player hovers over a card to find the solution
cardElement.addEventListener('mouseover',flipFront);
cardElement.addEventListener('mouseout',flipBack);
cardElement.addEventListener('click',flipCard);
document.getElementById('game-board').appendChild(cardElement);
};
};

//calls the createBoard function
createBoard();

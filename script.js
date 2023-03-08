const gameContainer = document.getElementById("game");

let card1 = null; // variable to store the first clicked card
let card2 = null; // variable to store the second clicked card
let cardsFlipped = 0; // counter to keep track of the number of flipped cards
let noClicking = false; // flag to prevent clicking while cards are flipping back
let score = 0 // variable to store the player's score

const COLORS = [
  "hotpink",
  "deepskyblue",
  "lime",
  "orangered",
  "purple",
  "hotpink",
  "deepskyblue",
  "lime",
  "orangered",
  "purple"
];

// Function to shuffle an array in place
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS); // shuffle the colors array

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// Function to handle clicks on cards
function handleCardClick(e) {
  if (noClicking) return; // if flag is set, do not execute the rest of the function
  if (e.target.classList.contains("flipped")) return; // if the card has already been flipped, do not execute the rest of the function

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0]; // show the color of the card

  // If no cards have been clicked yet, set the first card to card1 and the second card to null
  // If only one card has been clicked, set the second card to the current card
  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  // If both card1 and card2 have been set, compare the two cards to check if they have the same color
  if (card1 && card2) {
    noClicking = true; // set flag to prevent further clicking

    let color1 = card1.className;
    let color2 = card2.className;

    // If the cards have the same color, increment the score and the cardsFlipped counter by 2
    // Remove the click event listener from

    if (color1 === color2) {
      cardsFlipped += 2;
      score += 5;
      document.getElementById("score").innerHTML = score; // update the score element
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } 
    
    // If the cards do not have the same color, flip them back after 1 second
    else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
    }
    
    // If all cards have been flipped, display a message to the player and ask if they want to play again
    if (cardsFlipped === COLORS.length) {
      let message = `YOU WIN! Your score was ${score}! Do you want to play again?`;
      let playAgain = window.confirm(message); // display the confirm window
    
      if (playAgain) {
        resetGame();
      }
    }
    }
    
    createDivsForColors(shuffledColors); // create the cards
    
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetGame); // add event listener for reset button
    
    // Function to reset the game
    function resetGame() {
      // Remove all cards from the game container
      while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
      }
    
      // Reset the variables
      card1 = null;
      card2 = null;
      cardsFlipped = 0;
      noClicking = false;
      score = 0;
      document.getElementById("score").innerHTML = score;
    
      // Shuffle the COLORS array and create new cards
      shuffledColors = shuffle(COLORS);
      createDivsForColors(shuffledColors);
    }
    
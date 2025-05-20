
const choices = ["baba", "love", "power"];

const playerChoiceP = document.getElementById("player-choice");
const computerChoiceP = document.getElementById("computer-choice");
const winnerDiv = document.getElementById("winner");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;

// Rules: who beats who
const rules = {
  baba: "power",   // Baba beats Power
  power: "love",   // Power beats Love
  love: "baba"     // Love beats Baba
};

// Add event listeners to buttons
document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.getAttribute("data-choice");
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    updateResult(playerChoice, computerChoice, winner);
  });
});

// Random computer choice
function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Determine winner
function getWinner(player, computer) {
  if (player === computer) return "draw";
  if (rules[player] === computer) return "player";
  return "computer";
}

// Update UI and handle scoring & game end
function updateResult(player, computer, winner) {
  playerChoiceP.textContent = `Your Choice: ${capitalize(player)}`;
  computerChoiceP.textContent = `Computer's Choice: ${capitalize(computer)}`;

  if (winner === "player") {
    winnerDiv.textContent = "🎉 You win this round!";
    playerScore++;
  } else if (winner === "computer") {
    winnerDiv.textContent = "😢 Computer wins this round!";
    computerScore++;
  } else {
    winnerDiv.textContent = "😐 It's a draw!";
  }

  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;

  // Check if someone reached 21 points
  if (playerScore >= 21 || computerScore >= 21) {
    let overallWinner = playerScore >= 21 ? "You win the game! 🎉" : "Computer wins the game! 😢";
    if (confirm(`${overallWinner}\nDo you want to play again?`)) {
      // Reset scores and UI for new game
      playerScore = 0;
      computerScore = 0;
      playerScoreSpan.textContent = playerScore;
      computerScoreSpan.textContent = computerScore;
      winnerDiv.textContent = "Who wins? 🤔";
      playerChoiceP.textContent = "Your Choice: -";
      computerChoiceP.textContent = "Computer's Choice: -";

      // Re-enable buttons if they were disabled
      document.querySelectorAll(".choice").forEach(button => button.disabled = false);
    } else {
      // Disable buttons to end the game
      document.querySelectorAll(".choice").forEach(button => button.disabled = true);
      winnerDiv.textContent = "Game Over! Refresh to play again.";
    }
  }
}

// Capitalize first letter helper
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');

  // Hide automatically after 3 seconds
  setTimeout(() => {
    splash.style.display = 'none';
  }, 5500);

  // OR allow user to click to hide early
  splash.addEventListener('click', () => {
    splash.style.display = 'none';
  });
});


window.addEventListener('load', () => {
  const rules = document.getElementById('game-rules');
  
  setTimeout(() => {
    // Hide the rules overlay after 5 seconds
    rules.style.display = 'none';
  }, 5000);
});

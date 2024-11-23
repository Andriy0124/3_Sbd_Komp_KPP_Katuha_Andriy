let playerWins = 0;
let computerWins = 0;
let draws = 0;
let tournamentPlayerWins = 0;
let tournamentComputerWins = 0;
let tournamentWinLimit = 5; 
let playerHistory = []; 

function showSinglePlayerMode() {
  document.getElementById('single-player-mode').style.display = 'block';
  document.getElementById('tournament-mode').style.display = 'none';
}

function showTournamentMode() {
  document.getElementById('single-player-mode').style.display = 'none';
  document.getElementById('tournament-mode').style.display = 'block';
}

function startTournament() {
  tournamentWinLimit = parseInt(document.getElementById('tournament-win-limit').value);
  resetTournament();
}

function getComputerChoice() {
  const choices = ['камінь', 'папір', 'ножиці'];
  const choiceFrequencies = {
    камінь: playerHistory.filter(choice => choice === 'камінь').length,
    папір: playerHistory.filter(choice => choice === 'папір').length,
    ножиці: playerHistory.filter(choice => choice === 'ножиці').length,
  };

  const maxChoice = Object.keys(choiceFrequencies).reduce((a, b) => 
    choiceFrequencies[a] > choiceFrequencies[b] ? a : b
  );

  if (maxChoice === 'камінь') return 'папір';
  if (maxChoice === 'папір') return 'ножиці';
  if (maxChoice === 'ножиці') return 'камінь';

  return choices[Math.floor(Math.random() * choices.length)];
}

function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  playerHistory.push(userChoice);

  animateChoice(userChoice);

  if (userChoice === computerChoice) {
    draws++;
    updateScoreboard('Нічия!', 'yellow');
  } else if (
    (userChoice === 'камінь' && computerChoice === 'ножиці') ||
    (userChoice === 'ножиці' && computerChoice === 'папір') ||
    (userChoice === 'папір' && computerChoice === 'камінь')
  ) {
    playerWins++;
    updateScoreboard(`Ви виграли! ${userChoice} перемагає ${computerChoice}`, 'green');
  } else {
    computerWins++;
    updateScoreboard(`Ви програли! ${computerChoice} перемагає ${userChoice}`, 'red');
  }

  checkGameEnd();
}

function playTournament(userChoice) {
  const computerChoice = getComputerChoice();
  playerHistory.push(userChoice);

  animateChoice(userChoice);

  if (userChoice === computerChoice) {
    updateTournamentScoreboard('Нічия!', 'yellow');
  } else if (
    (userChoice === 'камінь' && computerChoice === 'ножиці') ||
    (userChoice === 'ножиці' && computerChoice === 'папір') ||
    (userChoice === 'папір' && computerChoice === 'камінь')
  ) {
    tournamentPlayerWins++;
    updateTournamentScoreboard(`Ви виграли! ${userChoice} перемагає ${computerChoice}`, 'green');
  } else {
    tournamentComputerWins++;
    updateTournamentScoreboard(`Ви програли! ${computerChoice} перемагає ${userChoice}`, 'red');
  }

  checkTournamentEnd();  
}

function updateScoreboard(message, color) {
  document.getElementById('result').textContent = message;
  document.getElementById('result').style.color = color;
  document.getElementById('player-wins').textContent = playerWins;
  document.getElementById('computer-wins').textContent = computerWins;
  document.getElementById('draws').textContent = draws;
}

function updateTournamentScoreboard(message, color) {
  document.getElementById('tournament-result').textContent = message;
  document.getElementById('tournament-result').style.color = color;
  document.getElementById('tournament-player-wins').textContent = tournamentPlayerWins;
  document.getElementById('tournament-computer-wins').textContent = tournamentComputerWins;
}

function checkGameEnd() {
  if (playerWins === winLimit || computerWins === winLimit) {
    setTimeout(() => alert(playerWins === winLimit ? 'Ви виграли гру!' : 'Ви програли гру!'), 200);
    resetGame();
  }
}

function checkTournamentEnd() {
  if (tournamentPlayerWins >= tournamentWinLimit) {
    setTimeout(() => alert('Ви виграли турнір!'), 200);
    resetTournament();
  } else if (tournamentComputerWins >= tournamentWinLimit) {
    setTimeout(() => alert('Ви програли турнір!'), 200);
    resetTournament();
  }
}

function resetGame() {
  playerWins = 0;
  computerWins = 0;
  draws = 0;
  playerHistory = [];
  updateScoreboard('Гра закінчена, зробіть новий вибір!', 'black');
}

function resetTournament() {
  tournamentPlayerWins = 0;
  tournamentComputerWins = 0;
  playerHistory = [];
  updateTournamentScoreboard('Турнір закінчений, зробіть новий вибір!', 'black');
}

function animateChoice(userChoice) {
  gsap.fromTo(`button[data-choice="${userChoice}"]`, 
    { scale: 1 }, 
    { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1 });
}

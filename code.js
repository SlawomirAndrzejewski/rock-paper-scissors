const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: '',
    aiHand: '',
}

const options = [...document.querySelectorAll('.options > img')];

//First function
function optionSelector() {
    game.playerHand = this.dataset.option;

    options.forEach(hand => hand.classList.remove('active'));
    this.classList.add('active');
}

//Checking result function
function checkResult(player, ai) {
    if (player === ai) {
        return "draw";
    } else if ((player === "papier" && ai === "kamien") || (player === "kamien" && ai === "nozyce") || (player === "nozyce" && ai === "papier")) {
        return "victory";
    } else {
        return "defeat"
    }
}

//Initialization function
function startGame() {

    if (!game.playerHand) {               //if (game.playerHand === ''); - same thing !
        return alert("Choose!");
    }

    game.aiHand = aiChoice();

    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);

    endGame();
    game.playerHand = '';
}

//AI choice function
function aiChoice() {
    const aiHand = options[Math.floor(Math.random()*3)].dataset.option;
    return aiHand;

}

//Result function 
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    
    gameSummary.numbers++;
    document.querySelector('p.numbers span').textContent = +gameSummary.numbers;

    if(result == "victory") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "Victory!";
    } else if(result == "defeat") {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "Defeat";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "Draw";
    }
}

//End game function
function endGame () {
    document.querySelector(`[data-option="${game.playerHand}"]`).classList.remove("active");
}

options.forEach(hand => hand.addEventListener('click', optionSelector));

document.querySelector('.start').addEventListener('click', startGame);
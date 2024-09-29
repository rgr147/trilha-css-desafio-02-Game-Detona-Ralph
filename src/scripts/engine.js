const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timeId: null,
        gameVelocity: 30,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
    },
    actions: {
        countDownTimerId: setInterval(countDown,1000),
        timeId: setInterval(randomSquare, 1000),
    }
}

function playAudio(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime < 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition) {
                playAudio('hit');
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        });
    });
}
function initialize() {
    addListenerHitbox();
}

initialize();
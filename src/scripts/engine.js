const state = {
    view: {
        squares: document.querySelectorAll(".square"), // consulta os valores das classes square
        enemy: document.querySelector(".enemy"), // consullta od valores das classes enemy 
        timeLeft: document.querySelector("#time-left"), // consulta o valor contido na tag com id #timeLeft 
        score: document.querySelector("#score"), // consulta o valor contido na tag  com id #score
        lives: document.querySelector("#lives"), // consulta o valor contido na classe menu-lives, onde mostra a quantidade de vidas restantes
        rankPositionName1: document.getElementById("rank-nick-01"),
        rankPositionName2: document.getElementById("rank-nick-02"),
        rankPositionName3: document.getElementById("rank-nick-03"),
        rankPositionPoints1: document.getElementById("rank-points-01"),
        rankPositionPoints2: document.getElementById("rank-points-02"),
        rankPositionPoints3: document.getElementById("rank-points-03"),
    },
    values: {
        timeId: null, 
        gameVelocity: 500, //velocidade do game
        hitPosition: 0, //posição atual do ralph
        result: 0, //pontuação do jogador
        currentTime: 30, //timer iniciado com o jogo
        startLives: 3, //quantidade inicial de vidas
        positionNick1: "",
        positionNick2: "",
        positionNick3: "",
        positionPoints1: "",
        positionPoints2: "",
        positionPoints3: "",
    },
    actions: {
        countDownTimerId: setInterval(countDown,1000), // define, em misegundos, o tempo para o jogo acabar
        timeId: setInterval(randomSquare, 700   ), //define, em milisegundos, a velocidade que o ralph troca de square
    }
}
function insertNameInRanking() {
    let nick = prompt('Digite seu nome');
    state.view.rankPositionName1.textContent = nick;
    state.view.rankPositionPoints1.textContent = state.values.result;
}
// função para tocar efeito sonoro
function playAudio(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}
// função para atualizar e mostrar o tempo restante, além de encerrar o jogo quando o timer estiver zerado.
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}
// função para remover o ralph da posição atual e gerar valor aleatório de 1 à 9 para definir a nova posição do ralph. 
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}
// função que identifica clique do mouse para pontuar se o jogador acertou para atualizar o socre
function addListenerHitbox() {
    state.view.lives.textContent = `x${state.values.startLives}`;
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition) {
                playAudio('hit');
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            } else if(square.id != state.values.hitPosition) {
                state.values.startLives--;
                state.view.lives.textContent = `x${state.values.startLives}`;
                if (state.values.startLives === 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timeId);
                    alert("Game Over! O seu resultado foi: " + state.values.result);
                }
            }
        });
    });
}
function initialize() {
    addListenerHitbox();
}

initialize();
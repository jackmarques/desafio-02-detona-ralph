const state = {
    // a view pode ser utilizada para alterar elementos visuais na tela. 
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        vidas: document.querySelector("#vidas"), // Adicionando a visualização das vidas
    },
     // a value pode ser utilizada para alterar um valor interno (o que o usuário não vê). 
    values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        vidas: 3, // o jogador começa com 3 vidas
    },
    // ações que acontecem por trás da aplicação.
    actions:{
        countDownTimerId: setInterval(countDown, 1000),
    }
};

// Função para reiniciar o jogo
function resetGame() {
    // Zera o score e o tempo
    state.values.result = 0;  // Redefine a pontuação para 0
    state.view.score.textContent = state.values.result;  // Atualiza o texto na tela com a nova pontuação

    state.values.currentTime = 60;  // Define o tempo restante para 60 segundos
    state.view.timeLeft.textContent = state.values.currentTime;  // Atualiza o texto na tela com o tempo restante

    state.values.vidas = 3;  // Define as vidas do jogador para 3
    state.view.vidas.textContent = `x${state.values.vidas}`;  // Atualiza a tela com as vidas restantes

    // Reinicia os timers
    clearInterval(state.actions.countDownTimerId);  // Limpa o timer de contagem regressiva anterior
    clearInterval(state.view.timerId);  // Limpa o outro timer anterior
    state.actions.countDownTimerId = setInterval(countDown, 1000);  // Inicia um novo timer de contagem regressiva, chamando a função 'countDown' a cada segundo

    moveEnemy();  // Inicia ou reinicia o movimento do inimigo
}
// função para tocar o som de acerto
function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        resetGame(); // Reinicia o jogo quando o tempo acabar
    }
}

function randomSquare(){
    // forEach significa 'para cada elemento...'
    state.view.squares.forEach((square) => {
    // o comando abaixo está percorrendo todos os quadrados e removendo o inimigo de todo eles.
    square.classList.remove("enemy");

    });
    // a função random sorteia um número aleatório de 1 a 9
    let randomNumber = Math.floor(Math.random() * 9);
    // peguei o numero sorteado e vamos adicionar a classe enemy
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.view.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            } else{
                // Quando o jogador erra, perde uma vida
                state.values.vidas--;
                state.view.vidas.textContent = `x${state.values.vidas}`; // Atualiza a tela com as vidas restantes

                if (state.values.vidas <= 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    alert("Game Over! Você perdeu todas as vidas. Seu resultado foi: " + state.values.result);
                    resetGame(); // Reinicia o jogo quando o jogador perde todas as vidas
                }
            }
        });
    });
}
// função principal do jogo
function initialize(){
    moveEnemy();
    addListenerHitBox();
}

initialize()

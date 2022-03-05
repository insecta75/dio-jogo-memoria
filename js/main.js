const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; //somente permite virar duas cartas por vez (trava o tabuleiro, evitando que outras cartas sejam viradas)

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return; //evita que se clicar duas vezes na carta, o conteudo da carta fica permanentemente exposta

    this.classList.add('flip'); //this: contexto da funcao, add: adiciona apenas uma vez; 
    if(!hasFlippedCard) { //hasFlippedCard = false
        hasFlippedCard = true;
        firstCard = this; //primeira carta igual ao elemento que foi clicado
        return;
    }
    secondCard = this;
    hasFlippedCard = false; //zera a cada rodada, para evitar comparar sempre a mesma carta
    checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) { //cartas iguais
        disableCards(); //desabilita o clique da carta
        return;
    }
    unflipCards(); //cartas diferentes
}

function disableCards() { //quando duas cartas sao iguais, ficam expostas o conteudo
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard(); //evita valores ficarem acumulados na memória
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => { //metodo que recebe uma funcao e um tempo para realizar a funcao
        firstCard.classList.remove('flip'); //nao vira mais, volta ao que era antes
        secondCard.classList.remove('flip');
        //lockBoard = false;
        resetBoard();
    }, 1500); //tempo que o conteudo das cartas ficam expostas
}

function resetBoard() { //reinicia o tabuleiro
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {//muda a ordem das 12 div, para evitar que as imagens fiquem na mesma posicao em cada reinicio do tabuleiro
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12); //floor: numero inteiro (arredonda)
        card.style.order = randomPosition;
    });
})(); //funcao encapsulada (funcao será iniciada toda vez que o codigo sera rodado): Immediately invoked function (funcao que será renderizada quando for chamada)

cards.forEach((card) => { //Percorre cada item da lista de cartas
    card.addEventListener('click', flipCard); //Para cada carta clicada, adiciona o flip
});
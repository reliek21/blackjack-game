const myModule = (() => {
    'use strict'

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playerPoints = [];

    // references of the HTML
    const btnRequest = document.querySelector('#btnRequest'),
        btnStop = document.querySelector('#btnStop');

    const divPlayersCards = document.querySelectorAll('.divCard'),
        smallText = document.querySelectorAll('small');

    // this function starts the game
    const startGame = (numPlayers = 2) => {
        deck = createDeck();

        playerPoints = [];

        for (let i = 0; i < numPlayers; i++) {
            playerPoints.push(0);
        }

        smallText.forEach(elem => elem.innerHTML = 0);
        divPlayersCards.forEach(elem => elem.innerHTML = '');

        btnRequest.disabled = false;
        btnStop.disabled = false;
    }

    // create deck
    const createDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }

        for (let type of types) {
            for (let special of specials) {
                deck.push(special + type);
            }
        }

        // take the array and return random cards
        return _.shuffle(deck);
    }


    // take a new card
    const requestCard = () => {
        if (deck.length === 0) {
            throw 'No card in the deck';
        }

        return deck.pop();
    }

    // get the value of the card
    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);

        // check if it is a number
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : Number(value);
    }

    // points
    const points = (card, turn) => {
        playerPoints[turn] = playerPoints[turn] + cardValue(card);
        smallText[turn].innerText = playerPoints[turn];
        return playerPoints[turn];
    }

    // create card
    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assests/cards/${card}.png`;
        imgCard.classList.add('card');
        divPlayersCards[turn].append(imgCard);
    }

    // select winner
    const selectWinner = () => {
        const [minPoints, pointsComputer] = playerPoints;

        setTimeout(() => {
            if (pointsComputer === minPoints) {
                alert('Nobody win!');
            } else if (minPoints > 21) {
                alert('Computer won');
            } else if (pointsComputer > 21) {
                alert('Player won');
            } else {
                alert('Computer won!');
            }
        }, 100);

    }


    // computer turn
    const computerTurn = (minPoints) => {
        let pointsComputer = 0;

        do {
            const card = requestCard();
            pointsComputer = points(card, playerPoints.length - 1);
            createCard(card, playerPoints.length - 1);

        } while ((pointsComputer < minPoints) && (minPoints <= 21));

        selectWinner();
    }



    // events
    // btnRequest
    btnRequest.addEventListener('click', () => {
        const card = requestCard();
        const pointsPlayer = points(card, 0);
        createCard(card, 0);

        if (pointsPlayer > 21) {
            btnRequest.disabled = true;
            btnStop.disabled = true;
            computerTurn(pointsPlayer);
        } else if (pointsPlayer === 21) {
            btnRequest.disabled = true;
            btnStop.disabled = true;
            computerTurn(pointsPlayer);
        }
    });

    // btnStop
    btnStop.addEventListener('click', () => {
        btnRequest.disabled = true;
        btnStop.disabled = true;
        computerTurn(playerPoints[0]);
    });

    return {
        newGame: startGame
    };

})();
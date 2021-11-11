let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let pointsPlayer = 0;
let pointsComputer = 0;

// references of the HTML
const btnNew = document.querySelector('#btnNew');
const btnRequest = document.querySelector('#btnRequest');
const btnStop = document.querySelector('#btnStop');

const divPlayerCard = document.querySelector('#card-player');
const divComputerCard = document.querySelector('#card-computer');

const smallText = document.querySelectorAll('small');

// create deck
const createDeck = () => {
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
    deck = _.shuffle(deck);
    return deck;
}

// call the createDeck function
createDeck();


// take a new card
const requestCard = () => {
    if (deck.length === 0) {
        throw 'No card in the deck';
    }

    const card = deck.pop();
    return card;
}

// get the value of the card
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    // check if it is a number
    let points = (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : Number(value);

    return points;
}


// computer turn
const computerTurn = (minPoints) => {
    do {
        const card = requestCard();
        pointsComputer = pointsComputer + cardValue(card);
        smallText[1].innerText = pointsComputer;

        // createCard
        const imgCard = document.createElement('img');
        imgCard.src = `assests/cards/${card}.png`;
        imgCard.classList.add('card');
        divComputerCard.append(imgCard);

        if (minPoints > 21) {
            break;
        }

    } while ((pointsComputer < minPoints) && (minPoints <= 21));


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



// events
// btnRequest
btnRequest.addEventListener('click', () => {
    const card = requestCard();

    pointsPlayer = pointsPlayer + cardValue(card);
    smallText[0].innerText = pointsPlayer;

    // createCard
    const imgCard = document.createElement('img');
    imgCard.src = `assests/cards/${card}.png`;
    imgCard.classList.add('card');
    divPlayerCard.append(imgCard);

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
    computerTurn(pointsPlayer);
});

// btnNew
btnNew.addEventListener('click', () => {
    deck = [];
    deck = createDeck();

    pointsPlayer = 0;
    pointsComputer = 0;

    smallText[0].innerText = 0;
    smallText[1].innerText = 0;
    
    divPlayerCard.innerHTML = '';
    divComputerCard.innerHTML = '';

    btnRequest.disabled = false;
    btnStop.disabled = false;
});
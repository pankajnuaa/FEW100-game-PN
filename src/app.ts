import { getRandomInt } from "./numbers";
let squares: NodeList;
let numberOfTries: number = 1;
export function runApp() {
    console.log(("The app is running"));
    //select a square as the secret square    
    //pick a random number, 1-6 inclusive
    const secretNumber = getRandomInt(1, 6);
    //find the correlated square and blessed it 
    squares = document.querySelectorAll('.square');
    let currentSquare = 1;
    squares.forEach((sq: HTMLDivElement) => {
        if (currentSquare === secretNumber) {
            //mark the square somehow
            sq.dataset.secret = "true";
        }
        sq.addEventListener('click', handleClick);
        currentSquare++;
    })

}

function handleClick() {
    const isWinner = this.dataset.secret === 'true';
    const clickedSquare = this;
    if (isWinner) {
        //make it pretty
        clickedSquare.classList.add('winner');
        let h = document.createElement('h1');
        let t = document.createTextNode('You win')
        h.appendChild(t);
        document.body.appendChild(h);
        disableAll(clickedSquare);
        setTimeout(() => {
            location.reload()
        }, 5000);
        // reloadGame();
        // squares.forEach((sq: HTMLDivElement) => {
        //     if (sq !== clickedSquare) {
        //         sq.classList.add('looser');
        //         sq.removeEventListener('click', handleClick);
        //     }
        // })
    } else {
        if (numberOfTries < 3) {
            clickedSquare.classList.add('looser');
            numberOfTries++;
        } else {
            disableAll(clickedSquare);
            this.classList.add('looser');
            setTimeout(() => {
                location.reload()
            }, 5000);
        }


    }
    console.log('you clicked on ', this)
}

function disableAll(clickedSquare: any) {
    squares.forEach((sq: HTMLDivElement) => {
        if (sq !== clickedSquare) {
            sq.classList.add('looser');
            sq.removeEventListener('click', handleClick);
        }
    })
}

function reloadGame() {

    location.reload();
}
//put h1 "you win " when you win
//you get only 3 tries
// and reload 
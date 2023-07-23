'use strict';
const scoresButton = document.querySelector('.scoresButton');
const scoresBoard = document.querySelector('.scoresBoard');
    export class Player {
        constructor(pseudo, tryNumber, loseNumber, winNumber) {
            this.pseudo = pseudo;
            this.tryNumber = tryNumber;
            this.loseNumber = loseNumber;
            this.winNumber = winNumber;
        }

        showScores(scoresBoard) {
            scoresBoard.classList.remove('d-none');
            scoresBoard.classList.add('d-flex');
        }
        closeBoard() {
            scoresBoard.classList.remove('d-flex');
            scoresBoard.classList.add('d-none');
        }
    }

    // let player = new Player(1, 0, 0);
    // console.log(player.tryNumber);
    // console.log(player.loseNumber);
    // console.log(player.winNumber);
    // sessionStorage.setItem('pseudo', this.pseudo);
    // sessionStorage.setItem('tryNumber', this.tryNumber);
    // sessionStorage.setItem('loseNumber', this.loseNumber);
    // sessionStorage.setItem('winNumber', this.winNumber);
    // console.log(sessionStorage.getItem('pseudo'));
    // console.log(sessionStorage.getItem('tryNumber'));
    // console.log(sessionStorage.getItem('loseNumber'));
    // console.log(sessionStorage.getItem('winNumber'));
    // scoresButton.addEventListener('click', this.showScores);



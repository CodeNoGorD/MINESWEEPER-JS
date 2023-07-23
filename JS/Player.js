'use strict';
const scoresButton = document.querySelector('.scores-button');
const scoresBoard = document.querySelector('.scores-board');
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



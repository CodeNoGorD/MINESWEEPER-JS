'use strict';
import {Player} from "./Player.js";
import {Tools} from "./Tools.js";

window.addEventListener('load', () => {

    const formArea = document.querySelector('.form-area');
    const gridArea = document.querySelector('.grid-area');
    const title = document.querySelector('.title');
    const rows = document.querySelector('#rows');
    const cols = document.querySelector('#cols');
    const mines = document.querySelector('#mines');
    const btnStart = document.querySelector('#btn-submit');
    const resultBoard = document.querySelector('.result-board');
    const resultImage = document.querySelector('.result-image');
    const resultText = document.querySelector('.result-text');
    const restartButton = document.querySelector('.restart-button');
    const pseudo = document.querySelector('#pseudo');
    const scoresButton = document.querySelector('.scores-button');
    const scoresBoard = document.querySelector('.scores-board');
    const scoresClose = document.querySelector('.scores-close');
    const errorsBoard = document.querySelector('.errors-board');
    const rulesButton = document.querySelector('.rules-button');
    const rulesBoard = document.querySelector('.rules-board');
    const rulesCloseButton = document.querySelector('.close-rules-button');
    const scoresSave = document.querySelector('.scores-save');
    let GAMEOVER = false;
    let RESULT;

    class Game {
        constructor(rows, cols, mines) {
            this.rows = rows;
            this.cols = cols;
            this.mines = mines;
        }

        getDatas(url) {
            try {
                let datas = fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => data);
                return datas;
            } catch (e) {
                console.error('Erreur de connexion à l\'API');
            }
        }

        drawArea(gameDatas) {
            console.table(gameDatas);
            Tools.dataToHTML(gameDatas);
        }

        static revealSquare(row, col) {
            const square = document.querySelector(`[data-row-index = '${row}'][data-col-index = '${col}']`);
            square.classList.remove('square-hidden');
            square.style.background = '#5947d5';
            square.innerText = square.dataset.value;
        }

        static checkSquareToReveal(line, col) {
            let tab = JSON.parse(localStorage.getItem('tableau'));
            line = Number(line);
            col = Number(col);
            if (tab[line - 1] != undefined && tab[line - 1][col - 1] != undefined) {
                const topLeft = document.querySelector(`[data-row-index = '${line - 1}'][data-col-index = '${col - 1}']`)
                if (topLeft.dataset.value == 0 && topLeft.classList.contains('square-hidden')) {
                    Game.revealSquare(topLeft.dataset.rowIndex, topLeft.dataset.colIndex);
                    Game.checkSquareToReveal(line - 1, col - 1);
                }
            }
            if (tab[line - 1] != undefined && tab[line - 1][col] != undefined) {
                const top = document.querySelector(`[data-row-index = '${line - 1}'][data-col-index = '${col}']`)
                if (top.dataset.value == 0 && top.classList.contains('square-hidden')) {
                    Game.revealSquare(top.dataset.rowIndex, top.dataset.colIndex);
                    Game.checkSquareToReveal(line - 1, col);
                }
            }
            if (tab[line - 1] != undefined && tab[line - 1][col + 1] != undefined) {
                const topRight = document.querySelector(`[data-row-index = '${line - 1}'][data-col-index = '${col + 1}']`)
                if (topRight.dataset.value == 0 && topRight.classList.contains('square-hidden')) {
                    Game.revealSquare(topRight.dataset.rowIndex, topRight.dataset.colIndex);
                    Game.checkSquareToReveal(line - 1, col + 1);
                }
            }
            if (tab[line] != undefined && tab[line][col - 1] != undefined) {
                const left = document.querySelector(`[data-row-index = '${line}'][data-col-index = '${col - 1}']`)
                if (left.dataset.value == 0 && left.classList.contains('square-hidden')) {
                    Game.revealSquare(left.dataset.rowIndex, left.dataset.colIndex);
                    Game.checkSquareToReveal(line, col - 1);
                }
            }
            if (tab[line] != undefined && tab[line][col + 1] != undefined) {
                const right = document.querySelector(`[data-row-index = '${line}'][data-col-index = '${col + 1}']`)
                if (right.dataset.value == 0 && right.classList.contains('square-hidden')) {
                    Game.revealSquare(right.dataset.rowIndex, right.dataset.colIndex);
                    Game.checkSquareToReveal(line, col + 1);
                }
            }
            if (tab[line + 1] != undefined && tab[line + 1][col - 1] != undefined) {
                const bottomLeft = document.querySelector(`[data-row-index = '${line + 1}'][data-col-index = '${col - 1}']`)
                if (bottomLeft.dataset.value == 0 && bottomLeft.classList.contains('square-hidden')) {
                    Game.revealSquare(bottomLeft.dataset.rowIndex, bottomLeft.dataset.colIndex);
                    Game.checkSquareToReveal(line + 1, col - 1);
                }
            }
            if (tab[line + 1] != undefined && tab[line + 1][col] != undefined) {
                const bottom = document.querySelector(`[data-row-index = '${line + 1}'][data-col-index = '${col}']`)
                if (bottom.dataset.value == 0 && bottom.classList.contains('square-hidden')) {
                    Game.revealSquare(bottom.dataset.rowIndex, bottom.dataset.colIndex);
                    Game.checkSquareToReveal(line + 1, col);
                }
            }
            if (tab[line + 1] != undefined && tab[line + 1][col + 1] != undefined) {
                const bottomRight = document.querySelector(`[data-row-index = '${line + 1}'][data-col-index = '${col + 1}']`)
                if (bottomRight.dataset.value == 0 && bottomRight.classList.contains('square-hidden')) {
                    Game.revealSquare(bottomRight.dataset.rowIndex, bottomRight.dataset.colIndex);
                    Game.checkSquareToReveal(line + 1, col + 1);
                }
            }
        }

        static endGame(bool, result) {
            if (bool == true && result == 'lose') {
                resultBoard.classList.remove('d-none');
                resultBoard.classList.add('d-flex');
                resultImage.src = './public/img/alien.png';
                resultText.innerText = `PERDU: VOUS FEREZ MIEUX LA PROCHAINE FOIS ${pseudo.value.toUpperCase()} ...`;
                gridArea.style.pointerEvents = 'none';
                let partyNbrTmp = parseInt(sessionStorage.getItem('tryNumber')) + 1;
                sessionStorage.setItem('tryNumber', partyNbrTmp.toString());
                let loseNumberIncrease = parseInt(sessionStorage.getItem('loseNumber')) + 1;
                sessionStorage.setItem('loseNumber', loseNumberIncrease.toString());
                Game.restartGame();
            }
            if (bool == true && result == 'victory') {
                resultBoard.classList.remove('d-none');
                resultBoard.classList.add('d-flex');
                resultImage.src = './public/img/happy.png';
                resultText.innerText = `BRAVO ${pseudo.value.toUpperCase()} VOUS ETES TROP FORT !`;
                gridArea.style.pointerEvents = 'none';
                let partyNbrTmp = parseInt(sessionStorage.getItem('tryNumber')) + 1;
                sessionStorage.setItem('tryNumber', partyNbrTmp.toString());
                let winNumberIncrease = parseInt(sessionStorage.getItem('winNumber')) + 1;
                sessionStorage.setItem('winNumber', winNumberIncrease.toString());
                Game.restartGame();
            }
        }

        static restartGame() {
            restartButton.addEventListener('click', () => {
                gridArea.style.pointerEvents = 'auto';
                gridArea.classList.remove('d-flex');
                gridArea.classList.add('d-none');
                formArea.classList.remove('d-none');
                formArea.classList.add('d-block');
                resultBoard.classList.remove('d-flex');
                resultBoard.classList.add('d-none');
                title.classList.remove('d-block');
                title.classList.add('d-none');
                while (gridArea.hasChildNodes()) {
                    gridArea.removeChild(gridArea.firstChild);
                }
            });
        }

        static checkForm() {
            let errors = [];
            let regexp = new RegExp('^[a-zA-Z0-9]{3,20}$', 'g');

            if (pseudo.value == '' || pseudo.value.length < 3 || pseudo.value.length > 20) {
                errors.push('pseudoTaille');
            }
            if (!regexp.test(pseudo.value)) {
                errors.push('pseudoFormat')
            }
            if (rows.value > 100) {
                errors.push('rowMaxLength');
            }
            if (cols.value > 100) {
                errors.push('colMaxLength');
            }
            if (mines.value > (rows.value * cols.value) - 1) {
                errors.push('minesNumber');
            }
            return errors;
        }
    }

    sessionStorage.setItem('tryNumber', '0');
    sessionStorage.setItem('loseNumber', '0');
    sessionStorage.setItem('winNumber', '0');
    // sessionStorage.clear();
    // localStorage.clear();

    // VALIDATION DU FORMULAIRE ET DEMARRAGE DU JEU
    btnStart.addEventListener('click', async (e) => {
        const errorsBoard = document.querySelector('.errors-board');
        let errorsList = []
        e.preventDefault();

        errorsBoard.innerHTML = '';
        errorsList = Game.checkForm();
        if (errorsList.length == 0) {
            // CREATION DU JEU
            sessionStorage.setItem('pseudo', pseudo.value);
            let game = new Game(rows.value, cols.value, mines.value);
            Tools.showScoreLine();

            // RECUPERATION DES DATAS EN SE CONNECTANT A l'API
            let gameDatas = await game.getDatas(`https://minesweeper.js.apprendre-est.fun/generate_grid.php?
        rows=${rows.value}&cols=${cols.value}&mines=${mines.value}`);
            //TRANSITION DE LA PAGE AVEC APPARITION DE LA GRILLE
            formArea.classList.add('d-none');
            title.classList.remove('d-none');
            title.classList.add('d-block');
            title.innerText = `Bienvenue ${sessionStorage.getItem('pseudo').toUpperCase()}`;
            gridArea.classList.remove('d-none');
            gridArea.classList.add('d-flex');

            // INVERSION DU SIGNE 1 DANS LE TABLEAU POUR EVITER LES CONFLITS
            let reversedDatas = Tools.reverseSign(gameDatas);
            let savedData = JSON.parse(JSON.stringify(reversedDatas));

            // INSCRIRE LES VALEURS DANS LE TABLEAU
            let filledDatas = Tools.fillDatas(savedData, game.rows, game.cols);
            let JSONArray = JSON.stringify(filledDatas);
            localStorage.setItem('tableau', JSONArray);
            // DESSINER LA GRILLE
            game.drawArea(filledDatas);
        } else {
            Tools.showErrors(errorsList);
            errorsBoard.classList.remove('d-none');
            errorsBoard.classList.add('d-block');
        }
    });


    // INTERACTIONS AVEC LA GRILLE
    // INTERACTIONS CLIC GAUCHE
    gridArea.addEventListener('click', (e) => {
        if (e.target.classList.contains('square-hidden') && e.target.dataset.value != -1 && !e.target.classList.contains('flag')) {
            e.target.classList.remove('square-hidden');
            e.target.style.background = '#5947d5';
            e.target.innerText = e.target.dataset.value;
            const remainingSquares = document.querySelectorAll('.square-hidden');
            if (remainingSquares.length == mines.value) {
                GAMEOVER = true;
                RESULT = 'victory';
                Game.endGame(GAMEOVER, 'victory');
            }
            if (e.target.dataset.value == 0) {
                Game.checkSquareToReveal(e.target.dataset.rowIndex, e.target.dataset.colIndex);
            }
            if (e.target.classList.contains('flag')) {
                e.target.style.pointerEvents = 'none';
            }
        }

        if (e.target.dataset.value == -1 && !e.target.classList.contains('flag')) {
            e.target.style.backgroundImage = "url(/public/img/mine2.png)";
            GAMEOVER = true;
            RESULT = 'lose';
            Game.endGame(GAMEOVER, 'lose');
        }
    });
    // INTERACTIONS CLIC DROIT
    gridArea.addEventListener('contextmenu', (e) => {
        if (e.target.classList.contains('square-hidden') && e.target.classList.contains('flag')) {
            e.preventDefault();
            e.target.classList.remove('flag');
            e.target.style.backgroundImage = 'none';
        } else if (e.target.classList.contains('square-hidden') && !e.target.classList.contains('flag')) {
            e.preventDefault();
            e.target.classList.add('flag');
            e.target.style.backgroundImage = 'url(../public/img/flag_little.png)';
        }
    });

    //INTERACTIONS AVEC BOUTON SCORES
    scoresButton.addEventListener('click', () => {
        let player = new Player(
            sessionStorage.getItem('pseudo'),
            sessionStorage.getItem('tryNumber'),
            sessionStorage.getItem('loseNumber'),
            sessionStorage.getItem('winNumber')
        );

        const scoresPseudo = document.querySelector('.scores-pseudo');
        const scoresTry = document.querySelector('.scores-try');
        const scoresLose = document.querySelector('.scores-lose');
        const scoresWin = document.querySelector('.scores-win');

        player.showScores(scoresBoard);
        scoresPseudo.innerText = sessionStorage.getItem('pseudo').toUpperCase();
        scoresTry.innerText = sessionStorage.getItem('tryNumber');
        scoresLose.innerText = sessionStorage.getItem('loseNumber');
        scoresWin.innerText = sessionStorage.getItem('winNumber');
        scoresClose.addEventListener('click', () => {
        player.closeBoard();
        });
    });

    //INTERACTIONS AVEC BOUTON REGLES
    rulesButton.addEventListener('click', () => {
        rulesBoard.classList.remove('d-none');
        rulesBoard.classList.add('d-flex');
        rulesCloseButton.addEventListener('click', () => {
            rulesBoard.classList.remove('d-flex');
            rulesBoard.classList.add('d-none');
        });
    });

    //INTERACTIONS AVEC BOUTON SAUVEGARDE SCORES

    scoresSave.addEventListener('click', () => {
        Tools.createScoreLine();
    });

});
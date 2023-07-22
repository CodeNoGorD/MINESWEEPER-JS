'use strict';
import {Player} from "./Player.js";
import {Tools} from "./Tools.js";

window.addEventListener('load', () => {

    const formArea = document.querySelector('.form-area');
    const gridArea = document.querySelector('.grid-area');
    const title = document.querySelector('.title');
    const pseudo = document.querySelector('#pseudo');
    const rows = document.querySelector('#rows');
    const cols = document.querySelector('#cols');
    const mines = document.querySelector('#mines');
    const btnStart = document.querySelector('#btn-submit');
    const resultBoard = document.querySelector('.resultBoard');
    const resultImage = document.querySelector('.resultImage');
    const resultText = document.querySelector('.resultText');
    const restartButton = document.querySelector('.restartButton');
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

        static endGame(bool, result) {
            if (bool == true && result == 'defaite') {
                resultBoard.classList.remove('d-none');
                resultBoard.classList.add('d-flex');
                resultImage.src = './public/img/alien.png';
                resultText.innerText = `PERDU: VOUS FEREZ MIEUX LA PROCHAINE FOIS ${pseudo.value.toUpperCase()} ...`;
                gridArea.style.pointerEvents = 'none';
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
            if (bool == true && result == 'victoire') {
                resultBoard.classList.remove('d-none');
                resultBoard.classList.add('d-flex');
                resultImage.src = './public/img/happy.png';
                resultText.innerText = `BRAVO ${pseudo.value.toUpperCase()} VOUS ETES TROP FORT !`;
                gridArea.style.pointerEvents = 'none';
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
                    // pour supprimer les enfants de la grille précédente
                    while (gridArea.hasChildNodes()) {
                        gridArea.removeChild(gridArea.firstChild);
                    }
                });
            }
        }
    }

    // VALIDATION DU FORMULAIRE ET DEMARRAGE DU JEU
    btnStart.addEventListener('click', async (e) => {
        e.preventDefault();
        // CREATION DU JEU
        let game = new Game(rows.value, cols.value, mines.value);
        // RECUPERATION DES DATAS EN SE CONNECTANT A l'API
        let gameDatas = await game.getDatas(`https://minesweeper.js.apprendre-est.fun/generate_grid.php?
        rows=${rows.value}&cols=${cols.value}&mines=${mines.value}`);
        //TRANSITION DE LA PAGE AVEC APPARITION DE LA GRILLE
        formArea.classList.add('d-none');
        title.classList.remove('d-none');
        title.classList.add('d-block');
        title.innerText = `Bienvenue ${pseudo.value}`;
        gridArea.classList.remove('d-none');
        gridArea.classList.add('d-flex');
        console.dir(gameDatas);

        // INVERSION DU SIGNE 1 DANS LE TABLEAU POUR EVITER LES CONFLITS
        let reversedDatas = Tools.reverseSign(gameDatas);
        console.dir(reversedDatas);
        let savedData = JSON.parse(JSON.stringify(reversedDatas));
        console.dir(savedData);

        // INSCRIRE LES VALEURS DANS LE TABLEAU
        let filledDatas = Tools.fillDatas(savedData, game.rows, game.cols);
        console.dir(filledDatas);
        // DESSINER LA GRILLE
        game.drawArea(filledDatas);
    });


    // INTERACTION AVEC LA GRILLE
    gridArea.addEventListener('click', (e) => {
        if (e.target.classList.contains('square-hidden') && !e.target.classList.contains('flag')) {
            e.target.classList.remove('square-hidden');
            e.target.style.background = '#5947d5';
            e.target.innerText = e.target.dataset.value;
            const remainingSquares = document.querySelectorAll('.square-hidden');
           if (remainingSquares.length == mines.value) {
               GAMEOVER = true;
               RESULT = 'victoire';
               Game.endGame(GAMEOVER, 'victoire');
               console.dir('vous avez gagnée');
           }
           if (e.target.classList.contains('flag')){
               e.target.style.pointerEvents = 'none';
           }
        }
        if (e.target.dataset.value == -1) {
            e.target.style.backgroundImage = "url(/public/img/mine2.png)";
            GAMEOVER = true;
            RESULT = 'defaite';
            Game.endGame(GAMEOVER, 'defaite');
        }
    });
    gridArea.addEventListener('contextmenu', (e) => {
        if (e.target.classList.contains('square-hidden') && e.target.classList.contains('flag')) {
            e.preventDefault();
            e.target.classList.remove('flag');
            e.target.style.backgroundImage = 'none';
        } else if (e.target.classList.contains('square-hidden') && !e.target.classList.contains('flag')){
            e.preventDefault();
            e.target.classList.add('flag');
            e.target.style.backgroundImage = 'url(../public/img/flag_little.png)';
        }
    });
});
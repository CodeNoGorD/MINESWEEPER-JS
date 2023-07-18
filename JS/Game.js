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
    }

    btnStart.addEventListener('click', async (e) => {
        e.preventDefault();
        let game = new Game(rows.value, cols.value, mines.value);
        let gameDatas = await game.getDatas(`https://minesweeper.js.apprendre-est.fun/generate_grid.php?
        rows=${rows.value}&cols=${cols.value}&mines=${mines.value}`);
        formArea.classList.add('d-none');
        title.classList.remove('d-none');
        title.classList.add('d-block');
        title.innerText = `Bienvenue ${pseudo.value}`;
        gridArea.classList.remove('d-none');
        gridArea.classList.add('d-block');
        game.drawArea(gameDatas);
        console.dir(game);
    });
    gridArea.addEventListener('click', (e) => {
        if (e.target.classList.contains('square-hidden') && e.target.dataset.value != 1) {
            e.target.classList.remove('square-hidden');
            e.target.style.background = '#9c9a9a';
        }
        if (e.target.dataset.value == 1) {
            e.target.style.backgroundImage = "url(/public/img/mine2.png)";
        }
        // Tools.revealSquare();
    });
});
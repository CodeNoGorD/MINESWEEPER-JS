'use strict';
const gridArea = document.querySelector('.grid-area');

export class Tools {
    constructor() {
    }
    static dataToHTML(gameDatas){
        gameDatas.forEach((row, rowIndex) => {
            let line = document.createElement('div');
            line.classList.add('d-flex');
            row.forEach((col, colIndex) => {
                let square = document.createElement('div');
                square.classList.add('square', 'square-hidden');
                square.dataset.value = col;
                square.dataset.rowIndex = rowIndex;
                square.dataset.colIndex = colIndex;
                line.append(square);
            });
            gridArea.append(line);
        });
    }
    static revealSquare() {

        return 'ca marche';
    }
}
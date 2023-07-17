'use strict';
const gridArea = document.querySelector('.grid-area');

export class Tools {
    constructor() {

    }
    static dataToHTML(gameDatas){
        gameDatas.forEach((row) => {
            let line = document.createElement('div');
            line.classList.add('d-flex');
            row.forEach((col) => {
                let column = document.createElement('div');
                column.classList.add('square', 'd-flex', 'align-items-center', 'justify-content-center');
                column.innerText = col;
                line.append(column);
            });
            gridArea.append(line);
        });
    }
}
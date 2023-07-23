'use strict';
const gridArea = document.querySelector('.grid-area');

export class Tools {
    constructor() {
    }

    static reverseSign(arr) {
        let tab = []
        arr.forEach((row) => {
            let line = [];
            row.forEach((col) => {
                if (col == 1) {
                    line.push(-col);
                } else {
                    line.push(col);
                }
            });
            tab.push(line);
        });
        return tab;
    }

    static checkMines(arr, row, col, nbRows, nbCols) {
        let mines = 0;

        // GESTION DU CENTRE
        if (arr[row - 1] != undefined && arr[row + 1] != undefined
            && arr[row][col - 1] != undefined && arr[row][col + 1] != undefined) {
            arr[row - 1][col - 1] == -1 ? mines++ : '';
            arr[row - 1][col] == -1 ? mines++ : '';
            arr[row - 1][col + 1] == -1 ? mines++ : '';
            arr[row][col - 1] == -1 ? mines++ : '';
            arr[row][col + 1] == -1 ? mines++ : '';
            arr[row + 1][col - 1] == -1 ? mines++ : '';
            arr[row + 1][col] == -1 ? mines++ : '';
            arr[row + 1][col + 1] == -1 ? mines++ : '';
        }

        // GESTION DES BORDS
        // GESTION HAUT
        if (arr[row - 1] == undefined) {
            if (arr[row][col - 1] == undefined) {
                arr[row + 1][col] == -1 ? mines++ : '';
                arr[row + 1][col + 1] == -1 ? mines++ : '';
                arr[row][col + 1] == -1 ? mines++ : '';
            } else if (arr[row][col + 1] == undefined) {
                arr[row + 1][col] == -1 ? mines++ : '';
                arr[row + 1][col - 1] == -1 ? mines++ : '';
                arr[row][col - 1] == -1 ? mines++ : '';
            } else {
                arr[row][col - 1] == -1 ? mines++ : '';
                arr[row][col + 1] == -1 ? mines++ : '';
                arr[row + 1][col - 1] == -1 ? mines++ : '';
                arr[row + 1][col] == -1 ? mines++ : '';
                arr[row + 1][col + 1] == -1 ? mines++ : '';
            }
        }

        // GESTION BAS
        if (arr[row + 1] == undefined) {
            if (arr[row][col - 1] == undefined) {
                arr[row - 1][col] == -1 ? mines++ : '';
                arr[row - 1][col + 1] == -1 ? mines++ : '';
                arr[row][col + 1] == -1 ? mines++ : '';
            } else if (arr[row][col + 1] == undefined) {
                arr[row - 1][col] == -1 ? mines++ : '';
                arr[row - 1][col - 1] == -1 ? mines++ : '';
                arr[row][col - 1] == -1 ? mines++ : '';
            } else {
                arr[row][col - 1] == -1 ? mines++ : '';
                arr[row][col + 1] == -1 ? mines++ : '';
                arr[row - 1][col - 1] == -1 ? mines++ : '';
                arr[row - 1][col] == -1 ? mines++ : '';
                arr[row - 1][col + 1] == -1 ? mines++ : '';
            }
        }

        // GESTION DES COTES
        if (arr[row - 1] != undefined && arr[row + 1] != undefined) {
            if (arr[row][col - 1] == undefined) {
                arr[row - 1][col] == -1 ? mines++ : '';
                arr[row - 1][col + 1] == -1 ? mines++ : '';
                arr[row][col + 1] == -1 ? mines++ : '';
                arr[row + 1][col + 1] == -1 ? mines++ : '';
                arr[row + 1][col] == -1 ? mines++ : '';
            }
            if (arr[row][col + 1] == undefined) {
                arr[row - 1][col] == -1 ? mines++ : '';
                arr[row - 1][col - 1] == -1 ? mines++ : '';
                arr[row][col - 1] == -1 ? mines++ : '';
                arr[row + 1][col - 1] == -1 ? mines++ : '';
                arr[row + 1][col] == -1 ? mines++ : '';
            }
        }
        return mines;
    }

    static fillDatas(datas, nbRows, nbCols) {
        datas.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col != - 1) {
                    let nbrMines = Tools.checkMines(datas, rowIndex, colIndex, nbRows, nbCols);
                    if (nbrMines > 0) {
                        datas[rowIndex][colIndex] += nbrMines;
                    } else {
                        datas[rowIndex][colIndex] = 0;
                    }
                }
            })
        });
        return datas;
    }

    static dataToHTML(gameDatas) {
        gameDatas.forEach((row, rowIndex) => {
            let line = document.createElement('div');
            line.classList.add('d-flex');
            line.classList.add('line');
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

    static checkForm() {

    }
}

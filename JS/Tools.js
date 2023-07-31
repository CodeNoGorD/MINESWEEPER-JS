'use strict';
const gridArea = document.querySelector('.grid-area');
const errorsBoard = document.querySelector('.errors-board');

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
                if (col != -1) {
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

    static createAlertMessage(msg) {
        let message = document.createElement('div');
        message.innerText = msg;
        message.classList.add('alert', 'alert-danger', 'alert-rows');
        errorsBoard.append(message);
    }

    static showErrors(arr) {
        let messages = {
            pseudoTaille: 'Veuillez saisir un pseudo de minimum 3 caractères et max 20',
            pseudoFormat: 'Veuillez ne saisir que des caractères de a à z en minuscule ou majuscule et des nombres de 0 à 9',
            rowMaxLength: 'Merci de saisir un nombre de lignes inférieur ou égal à 100',
            colMaxLength: 'Merci de saisir un nombre de colonnes inférieur ou égal à 100',
            minesNumber: 'Merci de saisir un nombre de mines raisonnable sinon ca va être compliqué 😊',
        };
        arr.forEach((row) => {
            switch (row) {
                case 'pseudoTaille':
                    Tools.createAlertMessage(messages.pseudoTaille);
                    break;
                case 'pseudoFormat':
                    Tools.createAlertMessage(messages.pseudoFormat);
                    break;
                case 'rowMaxLength':
                    Tools.createAlertMessage(messages.rowMaxLength);
                    break;
                case 'colMaxLength':
                    Tools.createAlertMessage(messages.colMaxLength);
                    break;
                case 'minesNumber':
                    Tools.createAlertMessage(messages.minesNumber);
                    break;
                default:
                    console.log('Cela ne marche pas');
            }
        });
    }

    static createScoreLine() {
        const tableScores = document.querySelector('.table-scores');
        let pseudo = sessionStorage.getItem('pseudo');
        let tryNbr = sessionStorage.getItem('tryNumber');
        let loseNbr= sessionStorage.getItem('loseNumber');
        let winNbr = sessionStorage.getItem('winNumber');

        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${pseudo}</td>
                        <td>${tryNbr}</td>
                        <td>${loseNbr}</td>
                        <td>${winNbr}</td>`;
        tableScores.appendChild(tr);
        localStorage.setItem('pseudo', pseudo);
        localStorage.setItem('tryNumber', tryNbr);
        localStorage.setItem('loseNumber', loseNbr);
        localStorage.setItem('winNumber', winNbr);
    }
    static showScoreLine() {
        const tableScores = document.querySelector('.table-scores');
        let pseudo = localStorage.getItem('pseudo');
        let tryNbr = localStorage.getItem('tryNumber');
        let loseNbr= localStorage.getItem('loseNumber');
        let winNbr = localStorage.getItem('winNumber');

        if (pseudo != sessionStorage.getItem('pseudo') && tryNbr > 0) {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${pseudo}</td>
                        <td>${tryNbr}</td>
                        <td>${loseNbr}</td>
                        <td>${winNbr}</td>`;
            tableScores.appendChild(tr);
        }
    }
}

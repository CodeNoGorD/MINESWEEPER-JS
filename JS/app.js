window.addEventListener('load', () => {

    const formArea = document.querySelector('.form-area');
    const pseudo = document.querySelector('#pseudo');
    const rows = document.querySelector('#rows');
    const cols = document.querySelector('#cols');
    const mines = document.querySelector('#mines');
    const btnSubmit = document.querySelector('#btn-submit');

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        formArea.style.display = 'none';
    });
});
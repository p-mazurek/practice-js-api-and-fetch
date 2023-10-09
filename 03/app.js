document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM');
    const button = document.querySelector('button')
    const API_URL = 'https://api.ipify.org?format=json'

    button.addEventListener('click', () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                const span = document.querySelector('span')
                span.innerText = data.ip
            })
    })


}
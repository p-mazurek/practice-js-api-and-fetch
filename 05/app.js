const apiUrl = 'http://localhost:3000/users';
const form = document.querySelector('.form')

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadUsers();
}

function loadUsers() {

    const promise = fetchGet(apiUrl);

    promise
        .then(data => insertUsers(data))
        .catch(err => console.error(err));
}

function fetchGet(url) {
    return fetch(url)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            }

            return Promise.reject(resp);
        })

}

function insertUsers(usersList) {
    const ulElement = document.querySelector('.users');
    ulElement.innerHTML = '';
    usersList.forEach(user => {
        const liElement = document.createElement('li');
        liElement.dataset.id = user.id
        liElement.innerText = `${user.firstName} ${user.lastName}`;

        ulElement.appendChild(liElement);
    });
}


const addUser = e => {
    e.preventDefault();
    const [firstName, lastName] = e.target.elements;
    const data = {
        id: '',
        firstName: firstName.value,
        lastName: lastName.value,
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(apiUrl, options)
        .then(res => res.json())
        .catch(err => console.log(err))
        .finally(loadUsers)
}


form.addEventListener('submit', addUser)







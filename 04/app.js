import key from './API.js'

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM');
    function renderWeatherDetails(lat, lon, weatherDesc, temp) {
        const latUnit = document.querySelector('.weather__lat')
        const lonUnit = document.querySelector('.weather__lng')
        const weatherUnit = document.querySelector('.weather__summary')
        const tempUnit = document.querySelector('.weather__temperature')

        latUnit.innerText = lat
        lonUnit.innerText = lon
        weatherUnit.innerText = weatherDesc
        tempUnit.innerText = temp

    }
    async function checkStatusURL(url) {
        try {
            const respond = await fetch(url);
            respond.status === 200 ? true : console.error('Wystąpił błąd podczas wczytywania strony');
        }
        catch {
            console.error('Blędny URL')
        }
    }

    document.forms[0].addEventListener('submit', (e) => {
        e.preventDefault()

        const latitude = document.querySelector('.form__field--lat').value;
        const longitude = document.querySelector('.form__field--lng').value;
        const API_URL = `https://api.weatherbit.io/v2.0/current?key=${key}&lang=pl&units=I&lat=${latitude}&lon=${longitude}`

        if (checkStatusURL(API_URL)) {
            fetch(API_URL)
                .then(res => res.json())
                .then(object => {
                    const data = {
                        lat: object.data[0].lat,
                        lon: object.data[0].lon,
                        description: object.data[0].weather.description,
                        temp: object.data[0].app_temp,
                    }
                    renderWeatherDetails(data.lat, data.lon, data.description, data.temp)
                    document.forms[0].reset()

                })
        } else {
            console.log('Wystąpił błąd w czasie ładowania danych z API')
        }

    })

}






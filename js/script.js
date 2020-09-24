(function () {
    const locationElement = document.querySelector('[data-location]');
    const satusElement = document.querySelector('[data-status]');
    const windElement = document.querySelector('[data-wind]');
    const temperatureElement = document.querySelector('[data-temperature]');
    const humidityElement = document.querySelector('[data-humidity]');
    var skycons = new Skycons({ "color": "#222" });
    // on Android, a nasty hack is needed: {"resizeClear": true}

    // you can add a canvas by it's ID...
    skycons.add("icon", 'clear-day');
    // start animation!
    skycons.play();

    const api = {
        key: "dfcf382470d0a924570d2f645b8b0dac",
        baseurl: "https://api.openweathermap.org/data/2.5/"
    }
    const searchForm = document.querySelector('#search-form');
    const searchElement = document.querySelector('[data-city-search]');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        getResults(searchElement.value)
    });

    function getResults(query) {
        fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(weather => {
                if (weather.status >= 200 && weather.status <= 299) {
                    return weather.json();
                } else {
                    throw Error(weather.statusText);
                }
            })
            .then((data) => {
                console.log(data);
                displayResults(data)
            })
            .catch((err) => {
                //console.log(err);
               alert(err);
            })
    }

    function displayResults(weather) {
        //console.log(weather);

        locationElement.textContent = weather.name;
        satusElement.textContent = weather.weather[0].description;
        temperatureElement.textContent = weather.main.temp;
        humidityElement.textContent = weather.main.humidity;
        windElement.textContent = weather.wind.speed;
        /*skycons.set("icon", weather.weather[0].icon);
        skycons.play();*/
    }
})();

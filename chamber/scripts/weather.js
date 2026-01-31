const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastDiv = document.querySelector('#forecast');

const myKey = "e4837c1d283271d11aaffb591cae6c8d";
const myLat = "10.3991";
const myLong = "123.9993";

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`;

async function apiFetch() {
    try {
        const response = await fetch(currentURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function forecastFetch() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `<strong>${Math.round(data.main.temp)}&deg;F</strong>`;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Added @2x for better quality
    const desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    document.querySelector('#desc-text').textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

    document.querySelector('#temp-high').innerHTML = `${Math.round(data.main.temp_max)}&deg;`;
    document.querySelector('#temp-low').innerHTML = `${Math.round(data.main.temp_min)}&deg;`;
    document.querySelector('#humidity').textContent = `${data.main.humidity}%`;

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    document.querySelector('#sunrise').textContent = formatTime(data.sys.sunrise);
    document.querySelector('#sunset').textContent = formatTime(data.sys.sunset);
}

function displayForecast(data) {
    forecastDiv.innerHTML = "";
    let dayCount = 0;

    data.list.forEach(item => {
        if (item.dt_txt.includes("12:00:00") && dayCount < 3) {
            const day = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
            const temp = Math.round(item.main.temp);

            const p = document.createElement("p");
            p.innerHTML = `${day}: <strong>${temp}&deg;F</strong>`;
            forecastDiv.appendChild(p);

            dayCount++;
        }
    });
}

apiFetch();
forecastFetch();
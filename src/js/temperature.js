import { getCityFromLocation} from './location.js';

const apiKey = "9728aefdb047afef74f257f4758a672b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data); // This will log the actual data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
        document.querySelector(".wind").innerHTML = data.wind.speed+" km/hr";
        var temperature = data.main.temp;
        (temperature <= 0) ? weatherIcon.src = "/src/images/snow.png" : (temperature>40 ? weatherIcon.src = "/src/images/clear.png" : weatherIcon.src = "/src/images/"+data.weather[0].main.toLowerCase()+".png");

        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        checkWeather(searchBox.value);
    }
});

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

//default city should be taken from the location
document.addEventListener("DOMContentLoaded", () => {


    getCityFromLocation().then(
        city => {
            checkWeather(city);
            console.log("Success got city from location : " + city);
        }
    );

});
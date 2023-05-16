//openweather map api key / url
const apiKey = "6666be5ff325814a0b88abedf7bb245c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


//user input are captured in this search box
const searchInput  = document.querySelector("#search input");
const searchBtn  = document.querySelector(".current");
const weatherData = document.querySelector("#weatherData")
const errorDisplay = document.querySelector(".error")


//function to pull data from api and displaying on web ap
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); //fecting api url + apiKey
    const data = await response.json(); 

    //incorrect city name 
    if (city ===""){
           weatherData.style.display = "none"
           errorDisplay.style.display = "block"
           errorDisplay.textContent = "You must enter a city!"
           return;

    }
    if(response.status==404){
        errorDisplay.style.display = "block"; //display error msg
        errorDisplay.style.display = "none"; //hides weather div
    } else {
        console.log(data)
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/hr";

        //view appears onclick search
        weatherData.style.display = "block"; //displays weather
        errorDisplay.style.display = "none"; //hides error msg
    }
}

//calling function
checkWeather();

//event listener to search button
searchBtn.addEventListener("click",() => {

    checkWeather(searchInput.value);
})



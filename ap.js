//openweather map api key / url
const apiKey = "6666be5ff325814a0b88abedf7bb245c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


//user input are captured in this search box
const searchInput  = document.querySelector("#search input");
const searchBtn  = document.querySelector("#searchBtn");


//function to pull data from api and displaying on web ap
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); //fecting api url + apiKey
    const data = await response.json(); 

    //incorrect city name 
    if(response.status==404){
        document.querySelector(".error").style.display = "block"; //display error msg
        document.querySelector(".weather").style.display = "none"; //hides weather div
    } else {
        console.log(data)
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/hr";

        //view appears onclick search
        document.querySelector(".weather").style.display = "block"; //displays weather
        document.querySelector(".error").style.display = "none"; //hides error msg
    }
}

//calling function
checkWeather();

//event listener to search button
searchBtn.addEventListener("click",() => {

    checkWeather(searchInput.value);
})



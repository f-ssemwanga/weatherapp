//openweather map api key / url
const apiKey = "6666be5ff325814a0b88abedf7bb245c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//WeeklyData
const apiKey2="c494a5526ed24c5bbdc239247657d6a1"


//user input are captured in this search box
const searchInput  = document.querySelector("#search input");
const searchBtn  = document.querySelector(".current");
const weeklyBtn  = document.querySelector(".weekly");
const weatherData = document.querySelector("#weatherData")
const weeklyData = document.querySelector("#weekly")
const errorDisplay = document.querySelector(".error")


//function to pull data from api and displaying on web ap
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); //fecting api url + apiKey
    const data = await response.json(); 

    //incorrect city name 
    if (city ===""){
           weatherData.style.display = "none"
           weeklyData.style.display= "none"
           errorDisplay.style.display = "block"
           errorDisplay.textContent = "You must enter a city!"
           return;

    }
    if(response.status==404){
        errorDisplay.style.display = "block"; //display error msg
        errorDisplay.style.display = "none"; //hides weather div
        weeklyData.style.display="none"
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

const apiKey3 = "6666be5ff325814a0b88abedf7bb245c";
async function fetchWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey3}`;
    const response = await fetch(url);

    try{
        if(response.status === 200){
        //request was successful
        const returnedData = await response.json();
        console.log(returnedData)
        return returnedData;
    }else{
        console.log(`Error fetching weather data: ${response.status}`);
    }
    }catch(error){console.log(`Error fetching weather data: ${error}`);
    
    }
    
}

async function displayWeatherData(city){
    const data = await fetchWeatherData(city);
    console.log(data)
    weatherData.style.display = "none"
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Clear the weekly div
     weeklyData.innerHTML = "";
     for (let i = 0; i < 7; i++) {
         const day = days[i];
         const temp = data.list[i].main.temp;
         const content = `
         <h3>${day}</h3>
        <p>Temperature: ${temp} degrees Celsius</p> `;
        const div = document.createElement('div')
        div.innerHTML = content
     weeklyData.appendChild(div);
   }
}




//event listener to search button
searchBtn.addEventListener("click",() => {

    checkWeather(searchInput.value);
})


weeklyBtn.addEventListener('click',() =>{
    console.log('weekly button')
    const city = searchInput.value;
    displayWeatherData(city)
})





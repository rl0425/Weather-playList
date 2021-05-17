

const WeatherContainer = document.querySelector(".js-weather")
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const feel_like = document.querySelector(".feel_like");
const wet = document.querySelector("#summer");


export const API_KEYS = "74dc86aabe55f56431867a17662c4413";
let coords;
let weathers;
getWhere();




async function getLocation(lat, lng){
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}`);
    const weather_Json = await response.json();
    weathers = weather_Json.weather[0].main;
    //WeatherContainer.innerText = weather_Json.weather[0].main;   
    //document.getElementById("weather").className = "Class1";
   
    city.innerText = weather_Json.name;
    temp.innerText = parseInt(weather_Json.main.temp-273) + "º";
    feel_like.innerText = parseInt(weather_Json.main.feels_like-273) + "º";
    //export let weathers = weather_Json.weather[0].main;;
    
    }
    catch(err){
        console.log('Weather reading Error', err);
    }
    
}

function handleSuccess(position){
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude
    const coordsobj = [
        latitude = latitude,
        longitude = longitude
    ];
    console.log(latitude,longitude);
    getLocation(latitude,longitude);
}

function handleEroor(){
    console.error('error');
}

function getWhere(){
    navigator.geolocation.getCurrentPosition(handleSuccess, handleEroor);
}


const firebaseConfig = {
    apiKey: "AIzaSyD8mllNOgLm74z7FCLGg9C-u939istNOiQ",
    authDomain: "weather-data-f1302.firebaseapp.com",
    projectId: "weather-data-f1302",
    storageBucket: "weather-data-f1302.appspot.com",
    messagingSenderId: "36699255728",
    appId: "1:36699255728:web:ea6cdf1375e3fe51a69c75",
    measurementId: "G-EM4ZZZV4ME"
};
firebase.initializeApp(firebaseConfig);

// Reference to Firestore
var db = firebase.database();

function passwordmatch() {
    var pass1 = document.getElementById("pwd").value;
    var pass2 = document.getElementById("cpwd").value;
    let isMatchPassword = pass1 === pass2;
    let passwordlength = pass1.length >= 8;
    let isValidPassword = isMatchPassword && passwordlength;

    if (isValidPassword) {
        document.querySelector('.signup').style.display = 'none';
        document.querySelector('.login').style.display = 'block';
    } else {
        alert("Password is not matched or does not meet length requirements (minimum 8 characters).");
    }
    return false;
}

function account() {
    document.querySelector('.signup').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
    return false;
}

function passwordmatch2() {
    var pass1 = document.getElementById("pwd").value;
    var pass2 = document.getElementById("cpwd").value;
    var pass3 = document.getElementById("passwd").value;
    var email1 = document.getElementById("email").value;
    var email2 = document.getElementById("emailid").value;
    var name = document.getElementById("name").value;
    db.ref("login").set({
        Name : name,
        emailid: email1,
        passwd: pass3
    })

    let passmatch = pass1 === pass2 && pass2 === pass3;
    let emailmatch = email1 === email2;

    if (passmatch && emailmatch) {
        document.querySelector('.login').style.display = 'none';
        document.querySelector(".weatherdetails").style.display = 'block';
    } else {
        alert("Enter valid details.");
    }
    return false;
}
const apikey = "0bdf8088a54334d2054724b978ef40c3";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";  

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkweather(city){
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if(response.status==404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";


    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src="images/mist.png";
    }
    else if(data.weather[0].main=="Snow"){
            weatherIcon.src="images/snow.png";
        }
    db.ref("login"+"/"+"WeatherDetails").set({
        city_name : data.name,
        temperature : data.main.temp + "°C",
        humidity : data.main.humidity + "%",
        Wind_speed : data.wind.speed + "km/h"

    })

    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display = "none";
    }

    


}


searchBtn.addEventListener("click", ()=>{
    checkweather(searchBox.value);
})
document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
});
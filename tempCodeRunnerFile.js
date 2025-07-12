///set background according to daytime...

let back = new Date().getHours();

console.log(back);

if(back>=4 && back <12){
    document.body.style.backgroundImage = "url('https://img.freepik.com/premium-photo/beautiful-white-daisy-flowers-background_1074273-32905.jpg')";
}
else if(back >=12 && back<=16){
    document.body.style.backgroundImage="url('https://cdn.pixabay.com/photo/2018/12/14/02/29/landscape-3874123_1280.jpg')";
}
else if(back>=17 && back<=20){
    document.body.style.backgroundImage="url('https://th.bing.com/th/id/OIP.bSbReARS3vMa3VJG_ZGpSgHaEo?w=280&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3')";
}
else {
    document.body.style.backgroundImage="url('https://wallpapers.com/images/hd/mystical-full-moon-on-a-beautiful-night-tysjvdwfar6d3o8q.jpg')";
}

document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";

//set default city ///

let city = "delhi"


this.navigator.geolocation.getCurrentPosition(
    (position)=>{

        const apiKi = config.apiKey;

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log("latitude: ",position.coords.latitude);
        console.log("longitude: ",position.coords.longitude);
               
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKi}&units=metric`;

        let aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKi}`;
fetch(aqiUrl)
  .then((response) => response.json())
  .then((aqiData) => {
    const aqi = aqiData.list[0].main.aqi;

    let aqiStatus = "";
    if (aqi === 1) aqiStatus = "Good 😊";
    else if (aqi === 2) aqiStatus = "Fair 🙂";
    else if (aqi === 3) aqiStatus = "Moderate 😐";
    else if (aqi === 4) aqiStatus = "Poor 😷";
    else if (aqi === 5) aqiStatus = "Very Poor 🤢";

    // Append this to existing result div
    document.getElementById("city_aqi").innerHTML = `
      <h3><p><strong>Air Quality Index (AQI): </strong> ${aqi} - ${aqiStatus}</p></h3>
    `;
  })
  .catch((err) => {
    console.log("AQI data fetch error: ", err);
  });

        fetch(weatherUrl)
        .then(response=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            return data;
        }).then((data)=>{
            const result = `
            <h2>Weather in ${data.name}</h2>
<p><strong>Temperature : </strong> ${data.main.temp}°C</p>
<p><strong>Condition : </strong> ${data.weather[0].description}</p>
<p><strong>Humidity : </strong> ${data.main.humidity}%</p>
<p><strong>Wind : </strong> ${data.wind.speed}m/s</p>
            `;
            document.getElementById("city_weather").innerHTML=result;
        })
        .catch(err=>{
            alert('some error occurred while collecting weather data : ');
            console.log(err);
        });

    },(error)=>{
        getweatherData(city);        
        console.log("Error: ",error.message);
    }
);

///reponse upon submitting the city... okk...


document.getElementById("getWeather").addEventListener("click",function(e){
    
    let inputCity = document.getElementById("city").value.trim();

    if(inputCity===""){
        alert("enter a valid city");
        return
    }else{
        city = inputCity;
    }
    getweatherData(city);
    
});

///declaring the getWeatherData and api work...

function getweatherData(city){

const apiKey = config.apiKey;

const getUrl=`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;



fetch(getUrl)
.then(response=>{
   return response.json()
    
})
.then(geoData=>{
    if(geoData.length===0){
        alert("no such city found in our records.please try another valid/nearby location.");
        
    return;

    }
    else{
        let lat=geoData[0].lat;
        let lon = geoData[0].lon;
        
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        let aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
fetch(aqiUrl)
  .then((response) => response.json())
  .then((aqiData) => {
    const aqi = aqiData.list[0].main.aqi;

    let aqiStatus = "";
    if (aqi === 1) aqiStatus = "Good 😊";
    else if (aqi === 2) aqiStatus = "Fair 🙂";
    else if (aqi === 3) aqiStatus = "Moderate 😐";
    else if (aqi === 4) aqiStatus = "Poor 😷";
    else if (aqi === 5) aqiStatus = "Very Poor 🤢";

    // Append this to existing result div
    document.getElementById("city_aqi").innerHTML = `
      <p><strong>Air Quality Index (AQI): </strong> ${aqi} - ${aqiStatus}</p>
    `;
  })
  .catch((err) => {
    console.log("AQI data fetch error: ", err);
  });

        fetch(weatherUrl)
        .then(response=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            return data;
        }).then((data)=>{
            const result = `
            <h2>Weather in ${city}</h2>
<p><strong>Temperature : </strong> ${data.main.temp}°C</p>
<p><strong>Condition : </strong> ${data.weather[0].description}</p>
<p><strong>Humidity : </strong> ${data.main.humidity}%</p>
<p><strong>Wind : </strong> ${data.wind.speed}m/s</p>
            `;
            document.getElementById("city_weather").innerHTML=result;
            



        })
        .catch(err=>{
            alert('some error occurred while collecting weather data : ');
        })
    }
})
.catch(error=>{
    console.log("Some Error occurrec : ");
})



}
//





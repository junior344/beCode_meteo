import './style.css'
import  Chart  from 'chart.js/auto';
import { setupSuggestionName, getDataWeather,fetchSugestionName } from './suggestionName.ts'
import * as maptilersdk from '@maptiler/sdk'; // Import the MapTiler SDK

// import {google} from 'google-maps'; // Call the function to initialize the map




const weather = document.querySelector<HTMLDivElement>(".weather");
const messageError = document.querySelector<HTMLDivElement>(".error");
const searchInput = document.querySelector<HTMLInputElement>(".city-choice");
console.log("searchInput :", searchInput);
const choice = document.querySelector<HTMLDivElement>(".choice");
// Ensure the Google Maps API is loaded


// Fonction pour récupérer les suggestions
async function  getSuggestionName(query: string) {
 const apiKey = '0ab9fb62180149f1a13a9dbb973b7323'
 let apiUrL  = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`;
  const data = await fetchSugestionName(apiUrL) as { features: { properties: any }[] };
  console.log("data x2 :", data.features[0].properties);
  return data.features[0].properties;
}


// Gestionnaire d'événements pour l'événement input
searchInput?.addEventListener("input",async () => {
  if(messageError){
    messageError.innerHTML = "";
  }
   // Gestionnaire d'événements pour l'événement input
  const query = searchInput.value.trim().toLowerCase();
  if(query.length > 2) {
     const {city, state, name,country, formatted} = await getSuggestionName(query); // Appel de la fonction pour récupérer les suggestions
     if(choice) {
        choice.innerHTML = `
      <option value="${city}"></option>
      <option value="${state}"></option>
      <option value="${name}"></option>
      <option value="${country}"></option>
      <option value="${formatted}"></option>
      `
     }
    }
});

// Gestionnaire d'événements pour l'événement keydown

searchInput?.addEventListener("keydown", async (event) => {
  if(weather) {
    weather.innerHTML = "";
  }
  if (event.key === "Enter") {
    const apiKey = '7a3f0e6a419754891925cdfde284bfb2';
    const city = searchInput.value.trim().toLowerCase();
    console.log("sugestions :", searchInput.value);
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    console.log("apiUrl :", apiUrl);
    const result = await fetchSugestionName(apiUrl);
    if(result.length > 0) {
      console.log("result :", result);
      const {lat, lon} = result[0];
      displayWeather(lat, lon);
    }else{
      if(messageError) {
        messageError.innerHTML = "Ville non trouvée";
        console.log("messageError :", messageError);
      }
    }
  };
});



async function displayWeather(lat: number, lon: number) {
  console.log("lat :", lat, "lon :", lon);
  const APIkey = 'd040410ca44fc38da68fd2defe23b507';
  const apiDataWeater =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
  console.log("apiDataWeater :", apiDataWeater);
  const {city , list} = await fetchSugestionName(apiDataWeater);
  console.log("city :", city, "\n", "list :", list);
  const divCity = document.createElement("div");
  const divWeatherdata = document.createElement("div");
  divWeatherdata.className = "weather_details";
  const temp = document.createElement("h2");
  const details =  document.createElement("div");
  details.className= "details";
  const detailsLits = document.createElement("ul");
  const containerGrap = document.createElement("div");
  containerGrap.className = "weather_grap";
  const canvas = document.createElement("canvas");  
  canvas.id = "myChart";
  const map = document.createElement("div");
  map.id = "map";
  const precipitation = list[0].rain?.['3h'] ?? 0;
  console.log("voila : ", precipitation);
  detailsLits.innerHTML = `
    <li>levee du soleil: ${converDate(city.sunrise)} - couche du soleil: ${converDate(city.sunset)}</li>
    <li>Humidité: ${list[0].main.humidity}% - Vent: ${Math.round(list[0].wind.speed * 3.6)}km/h </li>
    <li>Pression: ${list[0].main.pressure}hPa - Nuages: ${list[0].clouds.all}% </li>
    <li>visibilité: ${list[0].visibility / 1000}km - precipitation ${precipitation !== 0 ? precipitation +" mm" : ": /"}</li>
    `;
  temp.className = "temp";
  temp.textContent = `${Math.round(list[0].main.temp - 273.15)}°C`;
  const description = document.createElement("p");
  description.className = "description";
  description.textContent = `ressentie ${Math.round(list[0].main.feels_like - 273.15)}°C.${list[0].weather[0].description}`;
   
  const date = document.createElement("p");
  date.className = "date";
  date.textContent = converDate(list[0].dt_txt);
  divCity.className = "weather_info";
  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = `${city.name}, ${city.country}`;

  containerGrap.appendChild(canvas);
  details.appendChild(detailsLits);
  divWeatherdata.appendChild(temp);
  divWeatherdata.appendChild(description); 
  divWeatherdata.appendChild(details);
  divCity.appendChild(date);
  divCity.appendChild(title);
  weather?.appendChild(divCity);
  weather?.appendChild(divWeatherdata);
  weather?.appendChild(containerGrap);
  weather?.appendChild(map);


  console.log("list :", weather);
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  const dateOnly = converDate(list[0].dt_txt).split(",")[0];
  let dateCompare = dateOnly;
  let heures = []
  let degres = []
  let index = 0;
  while(dateCompare === dateOnly && index < list.length) {
    const date = new Date(list[index].dt_txt);

    const tempKelvin = list[index].main.temp;
    if (typeof tempKelvin !== "number") {
      console.error("Température invalide à l'index " + index, list[index].main.temp);
      index++;
      continue;  // Passer à l'élément suivant
    }
  
    const tempCelsius = Math.round(tempKelvin - 273.15);
    console.log("Temp en Celsius à l'index " + index + ": " + tempCelsius);
  
    heures.push(date.getHours() + " : 00");
    degres.push(tempCelsius );
  
    // Incrémentez l'index pour passer à l'élément suivant
    dateCompare = converDate(list[index].dt_txt).split(",")[0];
    index++;
  }
  const heuresCopy = [...heures];
  const degresCopy = [...degres];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: heuresCopy,
      datasets: [{
        label: 'Température journalière',
        data: degresCopy,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Assurez-vous que l'échelle commence à 0 pour éviter des rendus inattendus
          ticks: {
            callback: function(value) { return value + '°C'; } // Ajouter l'unité
        }
      }
    }
  }
  });
  let  maps
  // Initialisation de la carte
  maptilersdk.config.apiKey = 'sK2PLHtSnleJQqRMwEZl';
    maps = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: [city.coord.lon, city.coord.lat], // starting position [lng, lat]
  zoom: 14 // starting zoom
  });
  console.log("maps :", maps);
  console.log("temp :", degres);
  console.log("heures :", heures)
  console.log("date:", dateOnly)
  console.log("ctx :", ctx);
}

function converDate (dateStr: string) {
  const date = new Date(dateStr);
// Formatage des éléments
  const jours = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
  const jourAbbr = jours[date.getDay()];
  const jour = date.getDate(); // Jour du mois
  const heures = date.getHours().toString().padStart(2, '00');
  const minutes = date.getMinutes().toString().padStart(2, '0');

// Assemblage du résultat
  const dateFormattee = `${jourAbbr} ${jour}, ${heures}:${minutes}`;
  return dateFormattee;
}
import './style.css'
import { setupSuggestionName, getDataWeather,fetchSugestionName } from './suggestionName.ts'

// import {google} from 'google-maps'; // Call the function to initialize the map





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
  if (event.key === "Enter") {
    const apiKey = '7a3f0e6a419754891925cdfde284bfb2';
    const city = searchInput.value.trim().toLowerCase();
    console.log("sugestions :", searchInput.value);
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    console.log("apiUrl :", apiUrl);
    const result = await fetchSugestionName(apiUrl);
    
    if(result.length > 0) {
      console.log("result :", result);
    }else{
      if(messageError) {
        messageError.innerHTML = "Ville non trouvée";
        console.log("messageError :", messageError);
      }
    }
  };
});

const weather = document.querySelector<HTMLDivElement>(".weather");

function displayWeather(lat: string, lon: string) {
  const APIkey = 'd040410ca44fc38da68fd2defe23b507';
  const apiDataWeater =  `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${APIkey}`;
  const data = getDataWeather(apiDataWeater);
  console.log("data before ftech :", data);
  // console.log("weather :", weather);
  // weather.innerHTML = `
  //   <h2>${name}</h2>
  //   <p>${main.temp}°C</p>
  //   <p>${weather[0].description}</p>
  // `;
}
export async function fetchSugestionName(apiUrl: string = '') {
    let suggestion = '';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();  
        suggestion = data;
    }catch(error){
        console.log(error);
    }
    return suggestion;
}

export async function setupSuggestionName(apiUrl: string = '') {
    let citySearch = '';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data :", data);    
        citySearch = data;
    }catch(error){
        console.log(error);
    }
    return citySearch;
}
 export async function getDataWeather( apiUrl: string = '') {
    let dataWeather = '';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data weater:", data);
        dataWeather = data;
    }catch(error){
        console.log(error);
    }
    return dataWeather;
    
 }
// The free version of OpenWeatherMap allows only 60 API calls/minute so ids of the 
// 60 most populous German cities are assembled into arrays 20 ids. 
// In a commerical setting, a higher number of API of calls would be available and more city ids could easily be added to id arrays.

// The API allows a maximum of 20 ids to be called in a group request, so an array is made for each group of 20.
const germanCityIds_1 = ["2950159", "2911297", "2867714", "2886242", "2925533", "2825297", "2934246", "2935517", "2928810", "6548737", "2944388", "2935022", "2910831", "2861650", "2934691", "2947416", "2805753", "2949186", "2946447", "2809346"];
const germanCityIds_2 = ["2921466", "2869894", "2945024", "2891122", "2874545", "2925177", "2884509", "2867543", "2892794", "2873891", "2954172", "6548487", "2911522", "2875601", "2860410", "2929670", "2874225", "2844588", "2892518", "2912621"];
const germanCityIds_3 = ["2911240", "2842647", "2867838", "2852458", "2875376", "2857458", "2878234", "2856883", "2831580", "2907911", "2905891", "2864118", "2938913", "2855745", "2849483", "2895992", "2805615", "2923544", "2806654", "3247449"];

// global object to hold data about the coldest city
const coldest = {
    name: "",
    lat: "",
    lon: "",
    temp: ""
}

// Using Promise.all to ensure each of the 3 promises is resolved. Any rejections will cause an error.
Promise.all([
    fetch(apiRequestConstructor(germanCityIds_1)),
    fetch(apiRequestConstructor(germanCityIds_2)),
    fetch(apiRequestConstructor(germanCityIds_3))

]).then((apiResponses) => {
    // Getting JSON objects from each of the responses and collating them into a response array with .map().
    return Promise.all(apiResponses.map((apiResponse) => {
        return apiResponse.json();
    }));
}).then((data) => {
    // Passing the responses array into the getData function.
    getData(data)

}).catch((error) => {
    // logging any errors in the console
    console.log(error);
});


// function to construct the long API request urls
function apiRequestConstructor(idArray) {

    // Since the OpenWeatherMap API allows a maximum of 20 cities to be called per group request, for safety, 
    // the requestCap ensures a maximum of 20 can be called regardless of the number of ids in the id array.
    // If there are fewer than 20 ids in the array, requestCap is set to the array.length to allow proper forming 
    // of the ids parameter of the request url.
    let requestCap = 20;
    if (idArray.length < 20) {
        requestCap = idArray.length;
    }

    // Container string for ids to be concatenated in.
    let ids = "";

    // Concatenating each id to the next with a comma delimiter, unless it is the last id in the array.
    for (let index = 0; index < requestCap; index++) {
        const element = idArray[index];
        if (index < requestCap - 1) {
            ids += element + ",";
        } else {
            ids += element;
        }
    }

    // Url components
    const urlBase = "https://api.openweathermap.org/data/2.5/group?id=";
    const units = "&units=metric";
    const api_key = "81ba539f1128347b30ab1dcd555bc9d4";

    // Assembling final request url and returning.
    let finalUrl = urlBase + ids + units + "&appid=" + api_key;
    return finalUrl;
}


// retrieving data from fetch to insert it into our HTML
function getData(data) {

    // Array to hold 
    const dataArray = [];

    // Object to store data about the coldest city
    // initial coldest temperature is set abitrarily high so that any temperature on the surface of the earth will be lower
    const coldestCityObj = { name: "placeholder", temp: 9999, coord: "" };

    // iterating through each of results of each of the arrays created
    for (let arrayNum = 0; arrayNum < data.length; arrayNum++) {
        for (let index = 0; index < data[arrayNum].cnt; index++) {
            const element = data[arrayNum].list[index];

            // creating new objects to store only relevant data about each city and adding them to an array
            const cityObject = { name: element.name, temp: element.main.temp, coord: element.coord };
            dataArray.push(cityObject);

        }
    }

    // Iterating through the array of city weather data to find the coldest city and assign its values to the coldestCityObj for easy access
    dataArray.forEach(element => {
        if (element.temp < coldestCityObj.temp) {
            coldestCityObj.name = element.name;
            coldestCityObj.temp = element.temp;
            coldestCityObj.coord = element.coord;
        }
    });

    coldest.name = coldestCityObj.name;
    coldest.lat = coldestCityObj.coord.lat;
    coldest.lon = coldestCityObj.coord.lon;
    coldest.temp = coldestCityObj.temp;

    // Template literals `` allow the json attributes to be referenced easily inside a string
    const html = `
        <p class="is-size-2 is-size-3-mobile mb-1 has-text-weight-medium">${coldestCityObj.name}</p>
        <p class="is-size-4 is-size-5-mobile">At ${coldestCityObj.temp}°C</p>
    `;

    // Adds the content of the html variable to a div
    const replacementDiv = document.querySelector(".coldest-city");
    replacementDiv.innerHTML = html;

}
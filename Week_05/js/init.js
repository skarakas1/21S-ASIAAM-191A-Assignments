//create leaflet map and set params
const map = L.map('map').setView([34.0709, -118.444], 1.5);

//openstreetmap attribution
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//get the datas as json
let url = "https://spreadsheets.google.com/feeds/list/1aWClrKHcuVol5z2qQ5gGsHzY98aQkMvD39fVPeXPb0Q/onpdsx9/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    //send to function to parse json
    .then(data =>{
        processData(data)}
        )
            
//function to sort data based on response
//and create a marker
//with a pop up containing relevant info
function addDataBasedonField(data){
    //determine if user has left hometown
    //if yes display hometown and what they miss
    if (data.doyoulivesomewhereelsenow == "Yes"){
        console.log('yes')
        //use leaflet API to add marker w/ info in popup
        L.marker([data.lat,data.lng]).addTo(map).bindPopup(
            '<h2>Hometown</h2>' +
            data.location +
            '<h2>Is there anything you miss?</h2>' +
            data.isthereanythingyoumissaboutyourhometown
        )
    } 
    //if no display hometown and where they would like to move
    if (data.doyoulivesomewhereelsenow == "No") {
        console.log('no')
                L.marker([data.lat,data.lng]).addTo(map).bindPopup(
                    '<h2>Hometown</h2>' +
                    data.location +
                    '<h2>Is there anywhere you would like to move to?</h2>' +
                    data.isthereanywhereyouwouldliketomoveto
                ) 
        }
}

//function to sort out old data from 1st survey iteration
function sortOldData(data){
    if (data.timestamp != ''){
        //send to function to sort based on response, add marker and popup
        addDataBasedonField(data);
    }
}

function processData(theData){
    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
    const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
    // we start a for..of.. loop here 
    for(const row of rows) { 
      const formattedRow = {}
      for(const key in row) {
        // time to get rid of the weird gsx$ format...
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      // add the clean data
      formattedData.push(formattedRow)
    }
    // lets see what the data looks like when its clean!
    console.log('formattedData')
    console.log(formattedData)
    //send to old data function
    formattedData.forEach(sortOldData)
}
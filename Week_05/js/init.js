const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let url = "https://spreadsheets.google.com/feeds/list/1aWClrKHcuVol5z2qQ5gGsHzY98aQkMvD39fVPeXPb0Q/onpdsx9/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        processData(data)}
        )
        
function addMarker(data){
   L.marker([data.lat,data.lng]).addTo(map).bindPopup(
       '<h2>English speaker?</h2>' +
       data.doyouspeakenglishfluently +
       '<h3>Survey Date & Time</h3>' +
       data.timestamp
   )
   return data.timestamp
}

/*let soups = ['gazpacho','miso','soupe a la oignon'];
for (const item in soups){
    console.log('please review '+ soups[item]);
    review(soups[item]);
}
//soups.forEach(review);
function review(data){
    console.log(data + ' is delicious!')
}*/

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
    console.log(formattedData)
    //add marker function
    formattedData.forEach(addMarker)
}

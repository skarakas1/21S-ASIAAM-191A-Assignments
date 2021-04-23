let mapConfig = {"center": [34.0709, -118.444], "zoomLevel": 14}

const map = L.map('map').setView(mapConfig.center, mapConfig.zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function onClick(e) {
    alert("Coordinates: " + this.getLatLng());
}

function addMarker(lat,lng,title,id){
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2>`).on('click',onClick)
    createButtons(lat,lng,title,id);
    console.log("addMarker happened here")
}

function description(text,num){
    console.log("description happened here")
    const newDescription = document.createElement("p");
    newDescription.id = "p"+num;
    newDescription.innerHTML = text;
    document.getElementById("content"+num).appendChild(newDescription);
}

function createButtons(lat,lng,title,id){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+id; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    //let nav = document.getElementById("nav");
    document.getElementsByTagName("nav")[0].appendChild(newButton); //this adds the button to our page.
    console.log('create buttons happened here')
}

addMarker(33.88819, -118.30460,'Tokyo Central Market',"tcm")
addMarker(34.10189, -118.3064,'Silom Supermarket',"ssm")
addMarker(34.09002, -118.30868,'Catalina\'s Supermarket',"ccm")

const tcmText = "This is my favorite Japanese grocery store in LA--the only place I've found that sells Shio Koji and they have delicious sandos, conveniently located on your way to Redondo Beach."
const ssmText = "Silom is an amazing Thai grocery store! They have everything from galangal, cilantro root, and morning glory to giant mortar and pestles, Kiwi brand knives. Stop by Bhan Kanom next door for steamed sticky rice and taro wrapped in banana leaves!"
const ccmText = "Catalina's Supermarket is an Argentinian grocery store in East Hollywood with specialty Argentinian, South American, and Spanish imports. Get your maté, morcilla, and Spanish tuna in olive oil here! They also have a deli with crazy good Cuban sandwiches and Choripan."

document.getElementById("buttontcm").addEventListener('click',function() {
    description(tcmText,"1")})
document.getElementById("buttonssm").addEventListener('click',function() {description(ssmText,"2")})
document.getElementById("buttonccm").addEventListener('click',function() {description(ccmText,"3")})
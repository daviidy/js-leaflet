
//Initialisation de la carte


var map = L.map('map').setView([45.743317, 4.815747], 13);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
 { attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>' })

 .addTo(map);


 // Chargement des données depui JCDecaux


var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=132e27d3cf194a30390caf93dfad62b69949fe27';
var oXhr = new XMLHttpRequest();

oXhr.onload = function () {
  var data = JSON.parse(this.responseText);
  // ici les données sont exploitables

  data.forEach(element => {

    var posX = element.position.lat;
    var posY = element.position.lng

     //Pour les details de la station

    var initDispo =  element.available_bike_stands;
    var dispo =  element.available_bikes;
    var adresse = element.address;

    // -------------------------------------------

    var status = element.status;

    var marker = L.marker([posX, posY]).addTo(map);

    marker.bindPopup(element.status);
    marker.on('mouseover', function(e){ marker.openPopup(); });
    marker.on('mouseout', function(e){ marker.closePopup(); });

     marker.addEventListener("click", function(){
      document.getElementById('adresseVelo').innerHTML = adresse;
      document.getElementById('nombreVelos').innerHTML = initDispo;

       Reserved.addEventListener("click", function(){
        if(element.address == adresse){
          initDispo= initDispo-1;
          document.getElementById('nombreVelos').innerHTML = initDispo;
        }
      });
    });




  });



};
oXhr.onerror = function (data) {
  console.log('Erreur ...');
};
oXhr.open('GET', url, true);
oXhr.send(null);




//pour le slider

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var jumbotrons = document.getElementsByClassName("jumbotron");
  for (i = 0; i < jumbotrons.length; i++) {
    jumbotrons[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > jumbotrons.length) {slideIndex = 1}
  jumbotrons[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 1000); // Change image every  second
}

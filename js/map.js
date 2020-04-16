var lat = 45.750000;
var lon = 4.850000;
var macarte = null;
// Fonction d'initialisation de la carte
function initMap() {
  // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
  macarte = L.map('map').setView([lat, lon], 11);
  // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    // Il est toujours bien de laisser le lien vers la source des données
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 10,
    maxZoom: 20
  }).addTo(macarte);
}
window.onload = function () {
  // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
  initMap();
};




  // APIkey JCDECAUX  
const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=44a335861424c22e4558325525e53e6809010578';
const oXhr = new XMLHttpRequest();
oXhr.onload = function () {
  const data = JSON.parse(this.responseText);
  console.log('retour : ', data);
};
oXhr.onerror = function (data) {
  console.log('Erreur ...');
};
oXhr.open('GET', url, true);
oXhr.send(null);
var marker = L.marker([lat, lon]).addTo(macarte); 


// permet affichage des positions sur la carte


var map = new ol.Map({
    target: 'map',
   layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
      ],
    view: new ol.View({
      center: ol.proj.fromLonLat([4.850000, 45.750000]),
      zoom: 13
    })
  });


let marker = ({
  element: document.getElementById('marker'),
  }) 



  // APIkey JCDECAUX  
const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=44a335861424c22e4558325525e53e6809010578';
const oXhr = new XMLHttpRequest();
oXhr.onload = function () {
  const data = JSON.parse(this.responseText);
  // ici les données sont exploitables
  console.log('retour : ', data);
};
oXhr.onerror = function (data) {
  console.log('Erreur ...');
};
oXhr.open('GET', url, true);
oXhr.send(null);




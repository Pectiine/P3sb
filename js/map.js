class Map {
  constructor(apijcd) {
    this.mymap = L.map('mapid').setView([45.750000, 4.850000], 11);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      minZoom: 13,
      maxZoom: 20,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoid2lsbHBvbW1pZXMiLCJhIjoiY2p3ZzdtdGdiMDd0NDQ0bzJ3dnMyamo3diJ9.gZBoS6dOuthMKXF5Ptk5yw'
    }).addTo(this.mymap);
    this.url = apijcd
    this.reservation()
    this.stationaff()
    this.newCanvas()
    this.autoCompName = document.getElementById("inputName")
    this.autoCompFirstname = document.getElementById("inputFirst")
    this.bookingButton = document.getElementById("bouttonr")
    this.bookingStepTwo = document.getElementById("bouttonnext")
    this.bookingButton.addEventListener("click", (e) => this.newCanvas(e));
    this.bookingStepTwo.addEventListener("click", (e) => this.completR(e));

  }
  //* Récuperons les données de l'api */
  stationaff() {
    this.ajaxGet(this.url, (reponse) => {
      const results = JSON.parse(reponse);
      for (let i = 0; i < results.length; i++) {
        const station = results[i];
        this.markerF(station);
      }
    })
  }
  // création de marker 
  markerF(station) {
    const marker = L.marker([station.position.lat, station.position.lng], { icon: this.getMarkerColor(station) });
    marker.options.station = station;
    marker.addTo(this.mymap)
      .bindPopup("<b>" + station.name + "</b><br>" + station.available_bikes + " vélos disponinbles");
    marker.addEventListener('click', () => {
      this.stationaff.marker;
      // affichage du bouton réservation
      if (document.getElementById("info").style.display === "none") {
        document.getElementById("info").style.display = "initial";
      }
      // masque le canvas et le form lors un nouveau click 
      document.getElementById("canvasB").style.display = "none";
      document.getElementById("reservation").style.display = "none";
      //Affichage des infos stations
      const status = station.status === "OPEN" ? "Ouverte" : "Fermée";
      const stationNameField = document.getElementById("stationName");
      const adresseField = document.getElementById("adress");
      const nbrePlacesField = document.getElementById("number");
      const nbreVelosField = document.getElementById("velodispo");
      const stationStatusField = document.getElementById("stationd");
      stationNameField.textContent = station.name;
      adresseField.textContent = station.address;
      nbrePlacesField.textContent = station.available_bike_stands;
      nbreVelosField.textContent = station.available_bikes;
      stationStatusField.textContent = status;
      this.bookingButton.style.display = "initial";
    })
  }
  // Efface le canvas 
  newCanvas() {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("canvas").style.display = "initial";
  }
  ajaxGet(url, callback) {
    const req = new XMLHttpRequest()
    req.open("GET", url);
    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
        callback(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText + " " + url);
      }
    })
    req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
    })
    req.send(null);
  }
  // Méthode pour ajouter des markers de couleurs selon le status de la station 
  getMarkerColor(station) {
    let colorMarker = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
    const pinSize = [25, 41];
    if (station.available_bikes > 7) {
      colorMarker = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
    }
    else
      if
        (station.available_bikes >= 1 && station.available_bikes <= 6) {
        colorMarker = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
      }
      else
        if (station.available_bikes === 0) {
          colorMarker = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
        }
    if (station.status === "CLOSED") {
      colorMarker = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png';
    }
    return new L.Icon({
      iconUrl: colorMarker,
      iconSize: pinSize,
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  //* Reservation ------------------------//
  reservation() {
    const bookingButton = document.getElementById("bouttonr");
    bookingButton.addEventListener("click", () => {
      const bikeCount = document.getElementById("velodispo").textContent;
      if (bikeCount <= 0) {
        alert("Aucun vélo n'est disponible");
      }
      else {
        document.getElementById("bouttonr").style.display = "none";
        document.getElementById("reservation").style.display = "initial";

        let autoCompName = document.getElementById("inputName");
        let autoCompFirstname = document.getElementById("inputFirst");

        if (localStorage) {
          autoCompName.value = localStorage.getItem("nom");
          autoCompFirstname.value = localStorage.getItem("prenom");
        } else {
          autoCompName.value = "";
          autoCompFirstName.value = "";
        }
      }
    })
  }
  completR() {
    if (this.autoCompName.value === "" && this.autoCompFirstname.value === "") {
      alert("Merci de tout remplir");
    } else if (this.autoCompName.value === "" || this.autoCompFirstname.value === "") {
      alert("Il semblerait que vous ayez oublié de renseigner un champ");
    } else {
      let userNameField = document.getElementById("inputName").value;
      let userFirstnameField = document.getElementById("inputFirst").value;
      localStorage.setItem("nom", userNameField);
      localStorage.setItem("prenom", userFirstnameField);
      document.getElementById("canvasB").style.display = "initial";
      document.getElementById("reservation").style.display = "none";
      document.getElementById("bouttonf").style.display = "initial";
      document.getElementById("canvas").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  }
}









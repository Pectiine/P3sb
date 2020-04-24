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
  }

  stationaff() {
    ajaxGet(this.url, (reponse) => {
      let results = JSON.parse(reponse);
      for (let i = 0; i < results.length; i++) {
        const station = results[i];
        const marker = L.marker([station.position.lat, station.position.lng])
        marker.options.station = station
        marker.addTo(this.mymap)
          .bindPopup("<b>" + station.name + "</b><br>" + station.available_bikes + " vélos disponinbles");
        marker.addEventListener('click', () => {
          const context = canvas.getContext("2d")
          context.clearRect(0, 0, canvas.width, canvas.height)

          if (document.getElementById("info").style.display == "none") {
            document.getElementById("info").style.display = "initial"
          }
          let status
          if (station.status == "OPEN") {
            status = "Ouverte"
          } else if (station.status == "CLOSED") {
            status = "Fermée"
          }
          let stationNameField = document.getElementById("stationName")
          let adresseField = document.getElementById("adress")
          let nbrePlacesField = document.getElementById("number")
          let nbreVelosField = document.getElementById("velodispo")
          let stationStatusField = document.getElementById("stationd")
          stationNameField.textContent = station.name
          adresseField.textContent = station.address
          nbrePlacesField.textContent = station.available_bike_stands
          nbreVelosField.textContent = station.available_bikes
          stationStatusField.textContent = status
          const bookingButton = document.getElementById("bouttonr")
          bookingButton.style.display = "initial"

        })

      }
    })
  }
  //* Reservation ------------------------//
  reservation() {
    const bookingButton = document.getElementById("bouttonr")
    bookingButton.addEventListener("click", () => {
      let bikeCount = document.getElementById("velodispo").textContent
      let stationStatus = document.getElementById("stationd").textContent
      if (bikeCount <= 0) {
        alert("Aucun vélo n'est disponible")
      } else if (stationStatus == "Fermée") {
        alert("Cette station est fermée pour le moment")
      } else {

        document.getElementById("bouttonr").style.display = "none"
        document.getElementById("reservation").style.display = "initial"

        let autoCompName = document.getElementById("inputName")
        let autoCompFirstname = document.getElementById("inputFirstname")

        if (localStorage) {
          autoCompName.value = localStorage.getItem("nom")
          autoCompFirstname.value = localStorage.getItem("prenom")
        } else {
          autoCompName.value = ""
          autoCompFirstName.value = ""
        }

        const bookingStepTwo = document.getElementById("bouttonnext");
        bookingStepTwo.addEventListener("click", () => {

          if (autoCompName.value == "" && autoCompFirstname.value == "") {
            alert("Merci de tout remplir")
          } else if (autoCompName.value == "" || autoCompFirstname.value == "") {
            alert("Il semblerait que vous ayez oublié de renseigner un champ")
          } else {
            let userNameField = document.getElementById("inputName").value
            let userFirstnameField = document.getElementById("inputFirst").value
            localStorage.setItem("nom", userNameField)
            localStorage.setItem("prenom", userFirstnameField)
            document.getElementById("canvasB").style.display = "initial"
            document.getElementById("reservation").style.display = "none"
            document.getElementById("bouttonf").style.display = "initial"
            document.getElementById("canvas").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          }
        })
      }
    })
  }
}

// APIkey JCDECAUX  
const map = new Map("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=44a335861424c22e4558325525e53e6809010578")

function ajaxGet(url, callback) {
  let req = new XMLHttpRequest()
  req.open("GET", url)
  req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) {
      callback(req.responseText)
    } else {
      console.error(req.status + " " + req.statusText + " " + url)
    }
  })
  req.addEventListener("error", function () {
    console.error("Erreur réseau avec l'URL " + url)
  })
  req.send(null)
}

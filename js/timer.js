class Timer {
    constructor(elementSelector, delay) {
        this.el = document.getElementById(elementSelector)
        this.delay = delay
        const oldStartRaw = sessionStorage.getItem("startDate")
        if (oldStartRaw) {
            this.startDate = parseInt(oldStartRaw)
        }
        document.getElementById("bouttonf").addEventListener("click", this.finaleR)
        document.getElementById("annuler").addEventListener("click", this.cancel)
        window.addEventListener("load", this.onLoad)
    }
    getRemainingTime() {
        const now = new Date()
        const nowTime = now.getTime()
        const diff = (this.startDate + this.delay) - nowTime

        return diff <= 0 ? 0 : diff;

    }
    run() {
        if (!this.startDate) {
            const now = new Date()
            this.startDate = now.getTime()
            sessionStorage.setItem("startDate", this.startDate)
        }

        const updateTime = () => {
            const remainingTime = this.getRemainingTime()
            if (remainingTime === 0) {
                clearInterval(this.interval)
                document.getElementById("timerR").style.display = "none"
                sessionStorage.removeItem("startDate")
                sessionStorage.removeItem("currentStation")
                sessionStorage.removeItem("bikes")
                document.getElementById("panel").style.border = "0px"
            }
            this.renderT(remainingTime)
        }
        updateTime()
        this.interval = setInterval(updateTime, 1000)
    }

    renderT(remainingTime) {

        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000).toFixed(0);

        if (isNaN(minutes) && isNaN(seconds)) {
            this.el.textContent = " "
        } else if (minutes >= 1) {
            this.el.textContent = "Vous avez réservé un vélo sur la station " + sessionStorage.getItem("currentStation") + " - " + minutes + "m:" + seconds + "s restantes avant expiration de la réservation"
        } else if (seconds <= 0) {
            this.el.textContent = "Réservation expirée"
        } else {
            this.el.textContent = "Vous avez réservé un vélo sur la station " + sessionStorage.getItem("currentStation") + " - " + seconds + "s restantes avant expiration de la réservation"
        }
    }

    // Finaliser la reservation
    finaleR() {
        sessionStorage.removeItem("startDate")
        clearInterval(timer.interval)
        clearInterval(timer.updateTime)
        timer = new Timer("time", 1200000)
        const currentStation = document.getElementById("stationName").textContent
        sessionStorage.setItem("currentStation", currentStation)
        const bikes = parseInt(document.getElementById("velodispo").textContent)
        sessionStorage.setItem("bikes", bikes)
        document.getElementById("timerR").style.display = "initial"
        document.getElementById("finalRe").style.backgroundColor = ""
        document.getElementById("panel").style.border = " "
        document.getElementById("velodispo").textContent = sessionStorage.getItem("bikes") - 1
        document.getElementById("canvasB").style.display = "none"
        timer.getRemainingTime()
        timer.run()

    }

    // annulation 
    cancel() {
        if (sessionStorage.getItem("startDate") > 1) {
            clearInterval(timer.interval)
            clearInterval(timer.updateTime)
            document.getElementById("velodispo").textContent = sessionStorage.getItem("bikes")
            sessionStorage.removeItem("startDate")
            sessionStorage.removeItem("currentStation")
            sessionStorage.removeItem("bikes")
            document.getElementById("timerR").style.display = "none"
            document.getElementById("panel").style.border = "0px"
        }
    }

    // rappel de le réservation fenêtre d'alerte
    onLoad() {
        if (sessionStorage.getItem("startDate")) {
            alert("vous avez une réservation en cours à la station " + sessionStorage.getItem("currentStation"))
            document.getElementById("timerR").style.display = "initial"
            document.getElementById("panel").style.border = " "
            timer.getRemainingTime()
            timer.run()
        }
    }

}






// Slider
class Diaporama {
    items = document.getElementsByClassName("item");
    imageNum = 0;
    playing = false;


    constructor() {
        document.getElementById("bouttonDroit").addEventListener("click", () => this.suivant());
        document.getElementById("bouttonGauche").addEventListener("click", () => this.precedent());
        document.getElementById("bouttonPause").addEventListener("click", () => this.pause());
        document.getElementById("bouttonPlay").addEventListener("click", () => this.play());
        document.addEventListener("keydown", () => this.clavier());
    }
    auto = setInterval(() => this.suivant(), 5000);

    // Bouton 
    suivant = () => {
        this.items[this.imageNum].style.opacity = "0";
        if (this.imageNum === 2) {
            this.imageNum = 0;
        } else {
            this.imageNum++;
        }
        this.items[this.imageNum].style.opacity = "1";
    }
    precedent = () => {
        this.items[this.imageNum].style.opacity = "0";
        if (this.imageNum === 0) {
            this.imageNum = 2
        } else {
            this.imageNum--;
        }
        this.items[this.imageNum].style.opacity = "1";
    }
    // Pause/play
    pause = () => {
        this.playing = false;
        clearInterval(this.auto);
    }

    play = () => {
        this.playing = true;
        this.auto = setInterval(() => {
           this.suivant()
        }, 5000)
    }

    // Fonction clavier 
    clavier = (e) => {
  
        if (e.keyCode === 39) {
            document.addEventListener("keydown", this.suivant());
          
        } else if (e.keyCode === 37) {
            document.addEventListener("keydown", this.precedent());
            
        }
    }
}

const diapo = new Diaporama();
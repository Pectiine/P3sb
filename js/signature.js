class CanvasD {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.dessins = false;
        this.ctx.lineWidth = 3;
        this.canvas.width = 200;
        this.canvas.height = 200;
        this.lastPoint = { x: 0, y: 0 };
        this.mousePos = { x: 0, y: 0 };
        this.lastPos = { x: 0, y: 0 };
        this.canvas.addEventListener("mousedown", (e) => this.debutDessin(e));
        this.canvas.addEventListener("mousemove", (e) => this.dessin(e));
        this.canvas.addEventListener("mouseup", (e) => this.finDessin(e));
        this.canvas.addEventListener("touchstart", (e) => this.debutDessinTactile(e));
        this.canvas.addEventListener("touchmove", (e) => this.dessinTactile(e));
        this.canvas.addEventListener("touchend", (e) => this.finDessinTactile(e));
    }
    dessinC() {
        if (this.dessins === true) {
            this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
            this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
            this.ctx.stroke();
            this.ctx.strokeStyle = "color(black)";
            this.ctx.beginPath();
        }
    }
    // le bouton confirmé apparaît que si il y'a un dessin
    debutDessin() {
        this.dessins = true;
        document.getElementById("bouttonf").setAttribute("style", "display : initial !important");
    }
    debutDessinTactile(e) {
        this.lastPos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
        this.lastPos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;
        this.dessins = true;
        e.preventDefault();
    }
    // dessins tactile
    dessin(e) {
        this.mousePos.x = e.clientX - this.canvas.getBoundingClientRect().left;
        this.mousePos.y = e.clientY - this.canvas.getBoundingClientRect().top;
        this.dessinC();
        this.lastPos.x = e.clientX - this.canvas.getBoundingClientRect().left;
        this.lastPos.y = e.clientY - this.canvas.getBoundingClientRect().top;
    }
    // dessins tactile
    dessinTactile(e) {
        this.dessins = true;
        this.mousePos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
        this.mousePos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;
        this.dessinC();
        this.lastPos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
        this.lastPos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top;
        e.preventDefault();
        document.getElementById("bouttonf").setAttribute("style", "display : initial !important");
    }
    // fin du dessin
    finDessin(e) {
        this.dessins = false;
    }
    // Fin du tactile
    finDessinTactile(e) {
        this.dessins = false;
        e.preventDefault();
    }
}
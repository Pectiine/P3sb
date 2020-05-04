
class Drawer {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")
        this.drawing = false
        this.ctx.lineWidth = 3
        this.canvas.width = 300
        this.canvas.height = 300
        this.lastPoint = { x: 0, y: 0 }
        this.mousePos = { x: 0, y: 0 };
        this.lastPos = { x: 0, y: 0 };
        this.drawing = false;
        this.canvas.addEventListener("mousedown", this.debutDessin.bind(this))
        this.canvas.addEventListener("mousemove", this.dessin.bind(this))
        this.canvas.addEventListener("mouseup", this.finDessin.bind(this))
        this.canvas.addEventListener("touchstart", this.debutDessinTactile.bind(this))
        this.canvas.addEventListener("touchmove", this.dessinTactile.bind(this))
        this.canvas.addEventListener("touchend", this.finDessinTactile.bind(this))
    }

    drawLine() {
        if (this.drawing === true) {
            this.ctx.moveTo(this.lastPos.x, this.lastPos.y)
            this.ctx.lineTo(this.mousePos.x, this.mousePos.y)
            this.ctx.stroke()
            this.ctx.strokeStyle = "color(black)"
            this.ctx.beginPath()
        }
    }

    debutDessin() {

        this.drawing = true

        document.getElementById("bouttonf").setAttribute("style", "display : initial !important")
    }

    debutDessinTactile(e) {

        this.lastPos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left
        this.lastPos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top
        this.drawing = true

        e.preventDefault()
    }


    dessin(e) {

        this.mousePos.x = e.clientX - this.canvas.getBoundingClientRect().left
        this.mousePos.y = e.clientY - this.canvas.getBoundingClientRect().top
        this.drawLine()
        this.lastPos.x = e.clientX - this.canvas.getBoundingClientRect().left
        this.lastPos.y = e.clientY - this.canvas.getBoundingClientRect().top
    }


    dessinTactile(e) {

        this.drawing = true
        this.mousePos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left
        this.mousePos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top
        this.drawLine()
        this.lastPos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left
        this.lastPos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top
        e.preventDefault()

        document.getElementById("bouttonf").setAttribute("style", "display : initial !important")
    }

    finDessin(e) {

        this.drawing = false
    }

    finDessinTactile(e) {
        this.drawing = false
        e.preventDefault()
    }

}

const drawer = new Drawer
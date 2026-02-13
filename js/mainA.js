const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 300;

// VARIABLES GLOBALES DE CONTROL
let globalSpeed = 1;
let colisiones = 0;
const contadorElement = document.getElementById("contador-colisiones");
const speedInput = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");

// Evento para el Slider de Velocidad
if(speedInput) {
    speedInput.addEventListener("input", function(e) {
        globalSpeed = parseFloat(e.target.value);
        speedValue.innerText = globalSpeed + "x";
    });
}

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.originalColor = color;
        this.color = color;
        this.text = text;
        this.baseSpeed = speed; // Guardamos la velocidad base
        this.dx = 1 * this.baseSpeed;
        this.dy = 1 * this.baseSpeed;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "16px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 3;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        // APLICAMOS EL FACTOR DE VELOCIDAD GLOBAL AQUÍ
        let currentDx = this.dx * globalSpeed;
        let currentDy = this.dy * globalSpeed;

        if ((this.posX + this.radius) > canvas.width) {
            this.dx = -Math.abs(this.dx);
        }
        if ((this.posX - this.radius) < 0) {
            this.dx = Math.abs(this.dx);
        }
        if ((this.posY + this.radius) > canvas.height) {
            this.dy = -Math.abs(this.dy);
        }
        if ((this.posY - this.radius) < 0) {
            this.dy = Math.abs(this.dy);
        }

        // Movemos usando la velocidad actual (base * slider)
        this.posX += currentDx;
        this.posY += currentDy;
    }
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

let miCirculo, miCirculo2;

// FUNCIÓN PARA INICIAR O REINICIAR
function resetSimulation() {
    miCirculo = new Circle(100, 100, 30, "blue", "1", 3);
    miCirculo2 = new Circle(350, 200, 45, "blue", "2", -3);
    
    // Resetear contador
    colisiones = 0;
    if(contadorElement) contadorElement.innerText = "0";
    
    // Resetear slider (opcional, si quieres que vuelva a 1x)
    globalSpeed = 1;
    if(speedInput) { speedInput.value = 1; speedValue.innerText = "1x"; }
}

// Inicializar la primera vez
resetSimulation();

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    miCirculo.update(ctx);
    miCirculo2.update(ctx);

    if (getDistance(miCirculo.posX, miCirculo.posY, miCirculo2.posX, miCirculo2.posY) < (miCirculo.radius + miCirculo2.radius)) {
        miCirculo.color = "red";
        miCirculo2.color = "red";
        
        // Aumentar contador (solo si no estaban chocando ya, para evitar que sume infinito por frame)
        // Nota simple: aquí sumará rápido mientras se toquen. 
        colisiones++;
        if(contadorElement) contadorElement.innerText = Math.floor(colisiones/10); // Dividimos para que no suba tan loco
    } else {
        miCirculo.color = miCirculo.originalColor;
        miCirculo2.color = miCirculo2.originalColor;
    }
};

updateCircle();
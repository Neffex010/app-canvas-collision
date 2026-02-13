const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.originalColor = color; // Guardamos el color original
        this.color = color;
        this.text = text;
        this.speed = speed;

        // Si speed es negativo, el círculo se mueve en dirección contraria
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color; // Usa el color actual (puede cambiar)
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 5; // Aumenté un poco el grosor para que se note más el color
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        // Rebote en paredes derecha/izquierda
        if ((this.posX + this.radius) > window_width) {
            this.dx = -Math.abs(this.dx); // Forzar dirección izquierda
        }
        if ((this.posX - this.radius) < 0) {
            this.dx = Math.abs(this.dx); // Forzar dirección derecha
        }

        // Rebote en paredes abajo/arriba
        if ((this.posY + this.radius) > window_height) {
            this.dy = -Math.abs(this.dy);
        }
        if ((this.posY - this.radius) < 0) {
            this.dy = Math.abs(this.dy);
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// Función para calcular distancia entre dos puntos (Pitágoras)
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Círculo 1
let miCirculo = new Circle(100, 100, 50, "blue", "1", 3);

// Círculo 2: Le cambié la velocidad a -3 para que vaya hacia el círculo 1 y choquen
let miCirculo2 = new Circle(450, 450, 80, "blue", "2", -3); 

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);

    // 1. Actualizar posiciones
    miCirculo.update(ctx);
    miCirculo2.update(ctx);

    // 2. Detectar Colisión
    // Si la distancia es menor a la suma de los radios, se están tocando
    if (getDistance(miCirculo.posX, miCirculo.posY, miCirculo2.posX, miCirculo2.posY) < (miCirculo.radius + miCirculo2.radius)) {
        // ¡Colisión! Cambiar a rojo
        miCirculo.color = "red";
        miCirculo2.color = "red";
        
        // (Opcional) Aquí podrías agregar lógica para que reboten entre ellos invirtiendo dx/dy
    } else {
        // No hay colisión, volver a azul
        miCirculo.color = miCirculo.originalColor;
        miCirculo2.color = miCirculo2.originalColor;
    }
};

updateCircle();
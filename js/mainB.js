const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

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
        this.originalColor = color;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() - 0.5) * this.speed; // Dirección X aleatoria
        this.dy = (Math.random() - 0.5) * this.speed; // Dirección Y aleatoria
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 5;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        // Rebote en paredes
        if ((this.posX + this.radius) > window_width) {
            this.dx = -Math.abs(this.dx);
        }
        if ((this.posX - this.radius) < 0) {
            this.dx = Math.abs(this.dx);
        }
        if ((this.posY + this.radius) > window_height) {
            this.dy = -Math.abs(this.dy);
        }
        if ((this.posY - this.radius) < 0) {
            this.dy = Math.abs(this.dy);
        }

        this.posX += this.dx;
        this.posY += this.dy;

        this.draw(context);
    }
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// ---------------------------------------------------------
// CONFIGURACIÓN DE N CÍRCULOS
// ---------------------------------------------------------

let circles = []; // Arreglo para guardar todos los círculos
const numeroDeCirculos = 10; // ¡CAMBIA ESTE NÚMERO PARA TENER MÁS O MENOS!

for (let i = 0; i < numeroDeCirculos; i++) {
    let radius = Math.floor(Math.random() * 30 + 20); // Radio entre 20 y 50
    // Generar posición aleatoria (asegurando que no queden atrapados en la pared al nacer)
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;
    let speed = 8;
    
    // Crear el círculo y agregarlo al arreglo
    circles.push(new Circle(x, y, radius, "blue", (i + 1).toString(), speed));
}

// ---------------------------------------------------------
// ANIMACIÓN
// ---------------------------------------------------------

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);

    // PASO 1: Resetear el color de todos a Azul al inicio del frame
    circles.forEach(circle => {
        circle.color = circle.originalColor;
    });

    // PASO 2: Detectar colisiones (Todos contra todos)
    // Usamos un bucle anidado. Comparamos el círculo 'i' con el círculo 'j'
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            // Calculamos distancia entre Círculo i y Círculo j
            let dist = getDistance(circles[i].posX, circles[i].posY, circles[j].posX, circles[j].posY);

            // Si la distancia es menor a la suma de sus radios... ¡Choque!
            if (dist < (circles[i].radius + circles[j].radius)) {
                circles[i].color = "red";
                circles[j].color = "red";
            }
        }
    }

    // PASO 3: Actualizar posición y dibujar
    circles.forEach(circle => {
        circle.update(ctx);
    });
};

updateCircle();
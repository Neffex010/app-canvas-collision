const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 300;

// CONTROLES
let globalSpeed = 1;
let colisiones = 0;
const contadorElement = document.getElementById("contador-colisiones");
const speedInput = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");

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
        this.baseSpeed = speed;
        this.dx = (Math.random() - 0.5) * this.baseSpeed;
        this.dy = (Math.random() - 0.5) * this.baseSpeed;
        this.mass = this.radius; 
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "14px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        // Control de velocidad
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

        this.posX += currentDx;
        this.posY += currentDy;
    }
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.dx - otherParticle.dx;
    const yVelocityDiff = particle.dy - otherParticle.dy;
    const xDist = otherParticle.posX - particle.posX;
    const yDist = otherParticle.posY - particle.posY;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(otherParticle.posY - particle.posY, otherParticle.posX - particle.posX);
        const m1 = particle.mass;
        const m2 = otherParticle.mass;
        const u1 = rotate({x: particle.dx, y: particle.dy}, angle);
        const u2 = rotate({x: otherParticle.dx, y: otherParticle.dy}, angle);
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);
        particle.dx = vFinal1.x;
        particle.dy = vFinal1.y;
        otherParticle.dx = vFinal2.x;
        otherParticle.dy = vFinal2.y;
    }
}

function rotate(velocity, angle) {
    return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
}

let circles = [];
const numeroDeCirculos = 10; 

function resetSimulation() {
    circles = [];
    colisiones = 0;
    if(contadorElement) contadorElement.innerText = "0";
    if(speedInput) { speedInput.value = 1; globalSpeed = 1; speedValue.innerText = "1x"; }

    for (let i = 0; i < numeroDeCirculos; i++) {
        let radius = Math.floor(Math.random() * 10 + 15);
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let speed = 3;
        
        // Evitar superposición inicial
        if (i !== 0) {
            for(let j = 0; j < circles.length; j++) {
                if (getDistance(x, y, circles[j].posX, circles[j].posY) - radius * 2 < 0) {
                    x = Math.random() * (canvas.width - radius * 2) + radius;
                    y = Math.random() * (canvas.height - radius * 2) + radius;
                    j = -1; 
                }
            }
        }
        circles.push(new Circle(x, y, radius, "black", (i + 1).toString(), speed));
    }
}

resetSimulation();

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => circle.color = circle.originalColor);

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (getDistance(circles[i].posX, circles[i].posY, circles[j].posX, circles[j].posY) < (circles[i].radius + circles[j].radius)) {
                circles[i].color = "red";
                circles[j].color = "red";
                
                resolveCollision(circles[i], circles[j]);
                
                // CONTADOR DE REBOTES REALES
                colisiones++;
                if(contadorElement) contadorElement.innerText = colisiones; 
            }
        }
    }

    circles.forEach(circle => circle.update(ctx));
};

updateCircle();
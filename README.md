# ⚛️ Simulación Física de Colisiones 2D

> Proyecto de simulación interactiva desarrollado con HTML5 Canvas y JavaScript, enfocado en la detección y resolución de colisiones de partículas en tiempo real.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Finalizado-success?style=for-the-badge)
![Lenguaje](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge)
![Diseño](https://img.shields.io/badge/CSS3-Glassmorphism-blue?style=for-the-badge)

---

## 👨‍💻 Información del Desarrollador

| Campo | Detalle |
| :--- | :--- |
| **Desarrollador** | **Luis Enrique Cabrera García** |
| **Materia** | Desarrollo de soluciones en ambientes virtuales |
| **Tecnología Principal** | HTML5 Canvas API & Vanilla JS |
| **Año** | 2026 |

---

## 🚀 Descripción del Proyecto

Esta aplicación web demuestra el uso de matemáticas vectoriales y programación orientada a objetos para simular comportamientos físicos. El proyecto está dividido en tres escenarios de complejidad incremental, alojados en una interfaz moderna y responsiva.

### 📚 Módulos (Casos de Estudio)

#### 🟢 Caso A: Colisión Simple
Introducción a la detección de colisiones.
- **Descripción:** Escenario con dos partículas confinadas.
- **Lógica:** Implementación del Teorema de Pitágoras para calcular la distancia euclidiana entre centros.
- **Resultado:** Cambio visual al detectar solapamiento.

#### 🔵 Caso B: Colisión Múltiple (N-Cuerpos)
Simulación de estrés con múltiples objetos.
- **Descripción:** Generación aleatoria de `N` partículas con diferentes tamaños y velocidades.
- **Lógica:** Algoritmo de detección "todos contra todos" ($O(n^2)$).
- **Resultado:** Visualización de áreas de conflicto mediante cambio de estado (Color Rojo) en tiempo real.

#### 🟣 Caso C: Rebote Físico (Choque Elástico)
Implementación avanzada de física newtoniana.
- **Descripción:** Resolución realista de choques donde las partículas transfieren energía y cambian de trayectoria.
- **Física:** Conservación del momento lineal y energía cinética.
- **Matemáticas:** Uso de rotación de sistemas de coordenadas y trigonometría (`Math.atan2`, `Math.cos`, `Math.sin`) para calcular vectores de velocidad post-colisión.

---

## 🛠️ Tecnologías y Herramientas

* **Frontend:** HTML5, CSS3 (Animaciones, Grid, Flexbox).
* **Lógica:** JavaScript (Clases, RequestAnimationFrame loop).
* **Framework CSS:** Bootstrap 5 (Navbar, Layout responsivo).
* **Diseño UI:** Estilo "Glassmorphism" (efecto vidrio esmerilado) y tipografía moderna Inter/Poppins.

## ✨ Características Interactivas

El proyecto incluye un **Panel de Control** que permite al usuario interactuar con la simulación:
* 🔄 **Reinicio:** Regeneración instantánea del escenario.
* 🎚️ **Control de Tiempo:** Slider para ajustar la velocidad de la simulación (Cámara lenta / Cámara rápida).
* 📊 **Telemetría:** Contador de colisiones en tiempo real.



## 📄 Licencia

Este proyecto fue desarrollado con fines académicos por **Luis Enrique Cabrera García**.

// Creo Variable para almacenamiento de datos.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = JSON.parse(localStorage.getItem("totalCompra")) || 0;

// Selectores DOM.
const inputNombre = document.getElementById("nombreUsuario");
const btnSaludar = document.getElementById("btnSaludar");
const saludoHTML = document.getElementById("saludo");

const botonesPeluches = document.querySelectorAll(".btnPeluche");
const totalHTML = document.getElementById("total");
const listaCarrito = document.getElementById("listaCarrito");


const btnFinalizar = document.getElementById("btnFinalizar");
const mensajeFinal = document.getElementById("mensajeFinal");

const contenedorPeluches = document.getElementById("contenedorPeluches");


//Eventos
btnSaludar.addEventListener("click", saludarUsuario);

botonesPeluches.forEach(boton => {
    boton.addEventListener("click", sumarPeluche);
});

btnFinalizar.addEventListener("click", finalizarCompra);

// Función Saludo.
function saludarUsuario() {
    const nombre = inputNombre.value;

    if (nombre !== "") {
        saludoHTML.textContent = `Hola ${nombre}, bienvenido/a a la mejor tienda de peluches!!`;
    }
}

//Logica del carrito.
function agregarPeluche(tamano, precio) {
    carrito.push({ tamano, precio });
    total += precio;
    guardarStorage();
}
//Eventos del boton
function sumarPeluche(e) {
    const boton = e.currentTarget;

    const precio = Number(boton.dataset.precio);
    const tamano = boton.dataset.tamano;

    agregarPeluche(tamano, precio);
    actualizarVista();
}
//Funciones Dom
function actualizarVista() {
    mostrarCarrito();
    mostrarTotal();
}

function mostrarTotal() {
    totalHTML.textContent = total > 0
        ? `El total hasta el momento es de $${total}`
        : "";
}

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach(peluche => {
        const li = document.createElement("li");
        li.textContent = `${peluche.tamano} - $${peluche.precio}`;
        listaCarrito.appendChild(li);
    });
}
//Uso de libreria
function finalizarCompra() {
    
    Swal.fire({
        icon: "success",
        title: "¡Compra realizada!",
        html: `
            <p>Gracias por confiar en <b>Tienda de Peluches</b> 🧸</p>
            <p><b>Total:</b> $${total}</p>
        `,
        confirmButtonText: "Genial",
    });


    carrito = [];
    total = 0;

    localStorage.removeItem("carrito");
    localStorage.removeItem("totalCompra");

    listaCarrito.innerHTML = "";
    totalHTML.textContent = "";
}

if (total > 0) {
    totalHTML.textContent = `El total hasta el momento es de $${total}`;
}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalCompra", JSON.stringify(total));
}

//Función asincrónica con fetch
function cargarPeluches() {
    fetch("./assets/data/peluches.json")
        .then(response => response.json())
        .then(data => {
            crearBotonesPeluches(data);
        })
        .catch(error => {
            console.error("Error al cargar los peluches:", error);
        });
}

function crearBotonesPeluches(peluches) {
    peluches.forEach(peluche => {
        const button = document.createElement("button");

        button.classList.add("btnPeluche");
        button.dataset.precio = peluche.precio;
        button.dataset.tamano = peluche.tamano;

        button.textContent = `Peluche ${peluche.tamano} ($${peluche.precio})`;

        button.addEventListener("click", sumarPeluche);

        contenedorPeluches.appendChild(button);
    });
}
cargarPeluches();




// Creo Variable localStorage para almacenamiento de datos en el navegador, totalcompra y carrito es la clave
// para guardar el valor, Json.parse para cambiar el texto a numero si no hay un valor devuelve 0 o array vacio

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = JSON.parse(localStorage.getItem("totalCompra")) || 0;

// SELECTORES DOM, es decir selecciono elementos del html para usarlo en js, con getElementById
// busco el elemento por su id

const inputNombre = document.getElementById("nombreUsuario");
const btnSaludar = document.getElementById("btnSaludar");
const saludoHTML = document.getElementById("saludo");

const botonesPeluches = document.querySelectorAll(".btnPeluche");
const totalHTML = document.getElementById("total");
const listaCarrito = document.getElementById("listaCarrito");


const btnFinalizar = document.getElementById("btnFinalizar");
const mensajeFinal = document.getElementById("mensajeFinal");

// los eventos son una accion que realiza el usuario en este caso un click, 
// addEvenListener utilazamos para ver que acciones realiza el usuario,
// con el forEach recorremos en cada botonesPeluche.

btnSaludar.addEventListener("click", saludarUsuario);

botonesPeluches.forEach(boton => {
    boton.addEventListener("click", sumarPeluche);
});

btnFinalizar.addEventListener("click", finalizarCompra);


// Esta función obtiene el nombre ingresado por el usuario y
// si no está vacío, muestra un saludo personalizado en el HTML utilizando textContent.

function saludarUsuario() {
    const nombre = inputNombre.value;

    if (nombre !== "") {
        saludoHTML.textContent = `Hola ${nombre}, bienvenido/a a la mejor tienda de peluches!!`;
    }
}

//Declaro la funcion sumarPeluche, "e" es el evento que se utiliza cuando el usuario hace click
//siempre devuelve string, por eso usamos Number, toma el precio de ese boton y lo  suma al total.
//data-precio y data-tamaño queda disponible para js con dataset para asociarlo a cada boton,
//Añado con .push los elementos del Array ,lo sumo al total,lo muestro en pantalla y lo guarda.

function sumarPeluche(e) {
    const precio = Number(e.target.dataset.precio);
    const tamano = e.target.dataset.tamano;

    carrito.push({ tamano, precio });
    total += precio;

    totalHTML.textContent = `El total hasta el momento es de $${total}`;

    guardarStorage();
    mostrarCarrito();
}

//Declaro la funcion , limpio el contenido anterior, forEach recorre todo el array, 
//ponemos el texto dentro y Creamos el elemento li para que appendChild lo sume al ul.

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((peluche, index) => {
        const li = document.createElement("li");
        li.textContent = `${peluche.tamano} - $${peluche.precio}`;
        listaCarrito.appendChild(li);
    });
}

//Se ejecuta cuando el usuario hace click en el botón Finalizar compra,muetra el msj en el html 
//con textContent. Con removeItem borramos la ultima compra sin quedar el ultimo total guardado.
//igual a cero y corchetes vacios permiten comenzar una nueva compra.

function finalizarCompra() {
    mensajeFinal.textContent = `Gracias por confiar en Tienda Peluches!! Total: $${total}`;

    carrito = [];
    total = 0;

    localStorage.removeItem("carrito");
    localStorage.removeItem("totalCompra");

    listaCarrito.innerHTML = "";
    totalHTML.textContent = "";
}

// ejecutamos con el if y mostramos que si el total es mayor a 0 entra, en ese caso,
// lo muestra en el DOM al cargar la página.

if (total > 0) {
    totalHTML.textContent = `El total hasta el momento es de $${total}`;
}

//Guarda el valor del total de la compra en el localStorage del navegador
//y JSON.stringifi nos guarda los datos correctamente en texto.

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalCompra", JSON.stringify(total));
}



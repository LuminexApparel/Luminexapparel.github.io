function agregarAlCarrito(nombre, precio) {
    // Aquí puedes implementar la lógica para agregar el artículo al carrito
    alert(`¡${nombre} ha sido añadido al carrito por $${precio.toFixed(2)}!`);
}


document.addEventListener("DOMContentLoaded", function() {
    // Función para verificar si un elemento está en el campo de visión
    function estaEnViewport(elemento) {
        const rect = elemento.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para manejar el desplazamiento y activar la animación cuando los elementos están en el campo de visión
    function manejarDesplazamiento() {
        const comidas = document.querySelectorAll('.comida');
        comidas.forEach(comida => {
            if (estaEnViewport(comida)) {
                comida.classList.add('visible');
            }
        });
    }

    // Añadimos un evento de desplazamiento para activar la función cuando el usuario se desplaza
    window.addEventListener('scroll', manejarDesplazamiento);

    // Llamamos a la función una vez al cargar la página para manejar las comidas inicialmente visibles
    manejarDesplazamiento();
});

// Estructura para almacenar elementos del carrito
let carrito = [];

function agregarAlCarrito(nombre, precio) {
    const platoExistente = carrito.find(item => item.nombre === nombre);

    if (platoExistente) {
        platoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
}

function mostrarCarrito() {
    const carritoVentana = document.getElementById('carrito-ventana');
    const resumenCarrito = document.getElementById('resumen-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    resumenCarrito.innerHTML = '';

    if (carrito.length > 0) {
        carrito.forEach(item => {
            const itemElemento = document.createElement('div');
            itemElemento.textContent = `${item.cantidad}x ${item.nombre} - ARS$${(item.precio * item.cantidad).toFixed(2)}`;
            
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = () => eliminarDelCarrito(item.nombre);
            itemElemento.appendChild(botonEliminar);

            resumenCarrito.appendChild(itemElemento);
        });

        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        totalCarrito.textContent = `Total: ARS$${total.toFixed(2)}`;

        resumenCarrito.appendChild(totalCarrito);
    } else {
        resumenCarrito.textContent = 'El carrito está vacío.';
        totalCarrito.textContent = '';
    }

    carritoVentana.classList.add('visible');
}

function cerrarCarrito() {
    const carritoVentana = document.getElementById('carrito-ventana');
    carritoVentana.classList.remove('visible');
}

function ordenarAHabitacion() {
    const resumenCarrito = document.getElementById('resumen-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    if (carrito.length > 0) {
        let resumen = 'Resumen de la Orden:\n\n';

        carrito.forEach(item => {
            resumen += `${item.cantidad}x ${item.nombre} - ARS$${(item.precio * item.cantidad).toFixed(2)}\n`;
        });

        var total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        resumen += `\nTotal: ARS$${total.toFixed(2)}`;

        alert(resumen);
    } else {
        alert('El carrito está vacío. Agregue elementos antes de ordenar.');
    }
}

function eliminarDelCarrito(nombre) {
    const indice = carrito.findIndex(item => item.nombre === nombre);

    if (indice !== -1) {
        carrito.splice(indice, 1);
        mostrarCarrito();
    }
}

function enviarMensajeWhatsApp(mensaje) {
    // Reemplaza '123456789' con el número de teléfono al que deseas enviar el mensaje
    var phoneNumber = '+5491123215791';

    var encodedMessage = encodeURIComponent(mensaje);

    var whatsappLink = 'https://wa.me/' + phoneNumber + '?text=' + encodedMessage;

    // Abre la ventana de chat de WhatsApp en una nueva pestaña
    window.open(whatsappLink);
}



document.getElementById('cambiar_fondo').addEventListener('click', function() {
    var divs = document.querySelectorAll('.comida');

    divs.forEach(function(div) {
        var topImg = div.querySelector('.top');
        var bottomImg = div.querySelector('.bottom');

        // Ensure topImg and bottomImg are valid
        if (topImg && bottomImg) {
            // Comprueba si la imagen superior es visible
            if (window.getComputedStyle(topImg).getPropertyValue('opacity') !== '0') {
                topImg.style.opacity = '0';
                topImg.style.display = 'none';
                bottomImg.style.opacity = '1';
                bottomImg.style.display = 'block';
            } else {
                topImg.style.opacity = '1';
                topImg.style.display = 'block';
                bottomImg.style.opacity = '0';
                bottomImg.style.display = 'none';
            }
        }

        if (div.classList.contains('color1')) {
            div.classList.remove('color1');
            div.classList.add('color2');
        } else {
            div.classList.remove('color2');
            div.classList.add('color1');
        }
    });
});



var botonCambiarFondo = document.getElementById('cambiar_fondo');
var cambio = false; // Estado inicial: no cambiado

botonCambiarFondo.addEventListener('click', function() {
    if (cambio) {
        // Restaurar el color de fondo a blanco
        document.body.style.backgroundColor = '#ef454579';
        cambio = false; // Cambiar al estado no cambiado
    } else {
        // Cambiar el color de fondo a violeta fluor
        document.body.style.backgroundColor = '#88158d'; // Violeta fluor
        cambio = true; // Cambiar al estado cambiado
    }
});



function abrirSelectorRemera() {
    console.log("La función abrirSelectorRemera() se ha llamado.");
    const selectorRemeraHTML = `
        <div id="selector-remera" class="carrito-ventana">
            <h2>Seleccionar Talle y Cantidad de Remera</h2>
            <form>
                <label for="talle">Talle:</label>
                <select id="talle" name="talle">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidad" name="cantidad" min="1" value="1">
                <button type="submit" onclick="agregarRemera()">Agregar al Carrito</button>
                <button type="button" onclick="cerrarSelectorRemera()">Cancelar</button>
            </form>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', selectorRemeraHTML);
}


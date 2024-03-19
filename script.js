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
    // Verificar si el plato ya está en el carrito
    const platoExistente = carrito.find(item => item.nombre === nombre);

    if (platoExistente) {
        // Si el plato ya está en el carrito, incrementar la cantidad
        platoExistente.cantidad++;
    } else {
        // Si el plato no está en el carrito, agregarlo
        carrito.push({ nombre, precio, cantidad: 1 });
    }
}

function mostrarCarrito() {
    const carritoVentana = document.getElementById('carrito-ventana');
    const resumenCarrito = document.getElementById('resumen-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    // Limpiar el resumen anterior
    resumenCarrito.innerHTML = '';

    // Mostrar elementos del carrito en el resumen
    if (carrito.length > 0) {
        carrito.forEach(item => {
            const itemElemento = document.createElement('div');
            itemElemento.textContent = `${item.cantidad}x ${item.nombre} - $${(item.precio * item.cantidad).toFixed(2)}`;
            
            // Agregar botón para eliminar un plato
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = () => eliminarDelCarrito(item.nombre);
            itemElemento.appendChild(botonEliminar);

            resumenCarrito.appendChild(itemElemento);
        });

        // Calcular el total del carrito
        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        // Mostrar el total del carrito
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

        // Agregar el total al final del resumen
        resumenCarrito.appendChild(totalCarrito);
    } else {
        resumenCarrito.textContent = 'El carrito está vacío.';
        totalCarrito.textContent = '';
    }

    // Mostrar la ventana del carrito
    carritoVentana.classList.add('visible');

    function eliminarDelCarrito(nombre) {
        // Encontrar el índice del plato en el carrito
        const indice = carrito.findIndex(item => item.nombre === nombre);
    
        if (indice !== -1) {
            // Eliminar el plato del carrito
            carrito.splice(indice, 1);
    
            // Volver a mostrar el carrito actualizado
            mostrarCarrito();
        }
    }
}

function cerrarCarrito() {
    const carritoVentana = document.getElementById('carrito-ventana');
    carritoVentana.classList.remove('visible');
}


function ordenarAHabitacion() {
    const resumenCarrito = document.getElementById('resumen-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    // Verificar si el carrito está vacío
    if (carrito.length > 0) {
        let resumen = 'Resumen de la Orden:\n\n';

        // Construir el resumen de la orden
        carrito.forEach(item => {
            resumen += `${item.cantidad}x ${item.nombre} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
        });

        // Calcular el total del carrito
        var total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        resumen += `\nTotal: $${total.toFixed(2)}`;

        // Enviar el mensaje de WhatsApp con el resumen del pedido
        enviarMensajeWhatsApp(resumen);
    } else {
        alert('El carrito está vacío. Agregue elementos antes de ordenar.');
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


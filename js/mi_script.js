/* 
Proyecto Final de E-commerce

Desarrollarás una página web completa, que combine todos los 
conocimientos adquiridos a lo largo del curso. El proyecto 
consistirá en la creación de un sitio web de e-commerce dinámico 
e interactivo, que consuma datos de una API REST para mostrar 
productos, y permita a los usuarios añadir productos a un 
carrito de compras.


Pasos a seguir:

HTML: Uso de etiquetas semánticas para organizar la página.

CSS: Implementación de un diseño responsivo y atractivo 
usando Bootstrap y Flexbox.

JavaScript: Integración de una API REST para obtener datos y 
renderizar productos en el DOM, además de la funcionalidad de 
un carrito de compras usando localStorage.

Accesibilidad y SEO: Implementar prácticas que mejoren la 
experiencia del usuario y optimicen la página para los motores 
de búsqueda.


Entrega de Proyecto Final

1. Estructura Básica de HTML.

Estructura semántica: El HTML debe estar dividido en las etiquetas 
semánticas principales: header, nav, main, section, footer.

README.md: Incluir un archivo que explique brevemente el propósito 
de la página.


2. Formulario de Contacto.

Formulario funcional: Crear un formulario de contacto con campos 
para nombre, correo electrónico y mensaje, utilizando Formspree para 
manejar el envío de datos.


3. Estilos Básicos Aplicados con CSS

Archivo styles.css: El proyecto debe contar con un archivo CSS externo 
que incluya:

Estilos básicos aplicados a las secciones de header, footer y lista 
de navegación.

Fuentes de Google Fonts correctamente implementadas.

Propiedades de background aplicadas en alguna sección de la página 
(color, imagen, degradado, etc.).


4. Diseño Responsivo con Flexbox y Grid

Sección "Productos": Organizada en cards de forma responsiva 
utilizando Flexbox.

Sección "Reseñas": Organizada utilizando Grid, con una distribución 
lógica y estética.

Sección "Contacto": Debe ser responsiva mediante el uso de Media 
Queries para adaptarse a diferentes tamaños de pantalla.


5. Contenido Multimedia y Navegación

Multimedia: deberá incluir archivos multimedia (imagenes, video o iframe) 
correctamente integrado en la página.

Lista de navegación: Implementar una lista desordenada con enlaces que 
simulen una navegación interna (Inicio, Productos, Contacto, etc.).


6. Subida del Proyecto.

El proyecto debe estar subido a un hosting gratuito (Netlify o GitHub 
Pages), con una URL funcional para visualizar el sitio.


7. JavaScript

Script.js: deberá incluir un archivo Debes crear un archivo script.js 
para manejar toda la interactividad de la página.

Asegúrate de enlazarlo correctamente en tu archivo HTML.

DOM: Implementa funciones para validar formularios (ej., campos requeridos 
y formato de correo).

Usa JavaScript para manipular elementos del DOM, por ejemplo, actualizar 
el carrito y mostrar mensajes al usuario

Fetch Api

Consume datos desde una API REST usando fetch.

Muestra los productos obtenidos de la API en la página en forma de 
tarjetas (cards).

Visualización de Productos:

Cada producto debe tener su imagen, título y precio, mostrando una lista 
atractiva para el usuario


8. Carrito de compras dinámico

Agregar Productos al Carrito: Implementa un carrito de compras donde los 
usuarios puedan añadir productos desde las tarjetas.

Uso de localStorage o sessionStorage: Guarda el estado del carrito en 
localStorage o sessionStorage para que no se pierda al actualizar o cerrar 
la página.

Contador Dinámico: Muestra el número total de productos en el carrito y 
asegúrate de actualizarlo en tiempo real.


9. Edición y visualización del carrito

Visualización de Productos en el Carrito: Muestra una lista de productos 
añadidos al carrito, incluyendo cantidad, precio y total.

Edición de Cantidades y Eliminación de Productos: Implementa funciones para 
que el usuario pueda editar la cantidad de cada producto o eliminarlo 
del carrito.

Total Dinámico:Actualiza el total de la compra cada vez que se modifiquen 
los productos en el carrito.


10. SEO & Accesibilidad

Buenas Prácticas de Accesibilidad:

Usa alt en las imágenes para mejorar la accesibilidad.

Asegúrate de que se pueda navegar fácilmente con el teclado.

SEO Básico:

Usa metaetiquetas en el head del HTML para optimizar el SEO.


Funcionalidad esperada:

Interactividad Completa:

La página debe permitir al usuario ver productos, añadirlos al 
carrito, editar el carrito, y simular la compra.


Formulario de Contacto:

Implementa un formulario funcional que envíe datos a través de Formspree.


Diseño Responsivo:

Asegúrate de que el diseño sea adaptable a diferentes tamaños de pantalla.


Persistencia del Carrito:

El carrito debe mantenerse activo incluso si el usuario cierra o actualiza 
la página, usando localStorage o sessionStorage.
*/


// Consumir una API REST con fetch
fetch('https://dummyjson.com/products/category/laptops')
.then(response => { 
    if (!response.ok) { 
        throw new Error(`HTTP error! Status: ${response.status}`); 
    } 
    return response.json(); 
})
.then(data => {
    const contenedor = document.getElementById("container-tarjetas");

    data.products.forEach(producto => { 
        const productoCard = ` 
            <div class="card"> 
                <img src="${producto.thumbnail}" alt="${producto.title}"> 
                <h3>${producto.title}</h3> 
                <p>${producto.description}</p>
                <p>Precio: $${producto.price}</p> 
                <button class="agregar-carrito" aria-label="Añadir ${producto.title} al carrito" data-id='${producto.id}' data-nombre='${producto.title}' data-descripcion='${producto.description}' data-precio='${producto.price}'>Añadir al carrito</button> 
            </div> 
        `;
        contenedor.innerHTML += productoCard;
    });
})
.catch(error => {
    console.error('Error en la comunicación con la API:', error);
    Swal.fire({
    icon: 'error',
    title: 'Error de comunicación',
    text: 'Error en la comunicación con la API: ' + error.message,
    confirmButtonColor: '#3085d6', // Puedes personalizar el color del botón
});
});


// Carrito dinámico con productos de la api

function renderCarrito() {
    // 1. Obtener los datos actuales del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // 2. Elementos del DOM a actualizar
    const listaCarrito = document.querySelector("#tabla-productos tbody"); 
    const contadorProductosContainer = document.getElementById('contador-productos');

    // Si por alguna razón no encuentra el elemento, evitamos que rompa el script
    if (!listaCarrito) return;

    // 3. Limpiar contenidos previos de la lista
    listaCarrito.innerHTML = ''; 

    let cantidadTotal = 0;
    let costoTotalGeneral = 0;
    
    // 4. Recorrer el carrito para generar el DOM y calcular totales
    for (let i = 0; i < carrito.length; i++) { 
        const producto = carrito[i];
        
        // Sumamos la cantidad de este producto al total de unidades
        cantidadTotal += producto.cantidad;
        
        // Calculamos el subtotal por producto y lo sumamos al total acumulado
        const subtotal = parseFloat(producto.precio) * producto.cantidad;
        costoTotalGeneral += subtotal;

        // Crear elemento visual para la lista de productos
        listaCarrito.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>${subtotal}</td>
                <td>
                    <button class="eliminar-producto" data-id="${producto.id}">Eliminar del Carrito</button> 
                </td>
            </tr>
        `;
    }
    
    // === Asignar el evento click a los botones de eliminar creados ===
    let botonesEliminar = document.getElementsByClassName('eliminar-producto'); 
    for (let i = 0; i < botonesEliminar.length; i++) { 
        // Pasamos el índice (i) para saber exactamente cuál eliminar si hay repetidos
        botonesEliminar[i].addEventListener('click', function(event) {
            eliminarProducto(i); 
        }); 
    }

    // 5. Actualizar el contador de productos en el DOM de forma limpia
    const parrafoViejo = contadorProductosContainer.querySelector('p');
    if (parrafoViejo) {
        parrafoViejo.remove();
    }

    const parrafoContador = document.createElement('p');
    parrafoContador.innerHTML = `
        <strong>Productos totales:</strong> ${cantidadTotal} <br>
        <strong>Total a pagar:</strong> $${costoTotalGeneral.toFixed(2)}
    `;
    contadorProductosContainer.appendChild(parrafoContador);
} // <--- UBICACIÓN CORRECTA: Aquí termina de manera limpia la función renderCarrito()

function agregarProducto(event) { 
    // Extraemos los datos del botón HTML
    const productoParaAgregar = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio')
    };
    
    // Se los enviamos a nuestra función lógica
    addToCart(productoParaAgregar);
}

function addToCart(producto) {
    // 1. Recuperamos el carrito actual de LocalStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
    
    // 2. Buscamos si el producto ya está en el carrito comparando sus IDs
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        // Si ya existe, incrementamos de forma segura su propiedad cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si es nuevo, lo empujamos al array asegurando que inicie con cantidad 1
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
        
    // Guardamos el array actualizado de vuelta en el LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito)); 

    // Actualizamos toda la interfaz visual llamando a tu render unificado
    renderCarrito();

    // confirmación al usuario
    Swal.fire({
    title: '¡Excelente!',
    text: `${producto.nombre} agregado con éxito.`,
    icon: 'success',
    confirmButtonText: 'Genial'
    });
}

function eliminarProducto(indice) { 
    // 1. Obtenemos el carrito actual de LocalStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
        
    // 2. Verificamos si la cantidad es mayor a 1
    if (carrito[indice].cantidad > 1) {
        // Si hay más de uno, restamos una unidad
        carrito[indice].cantidad -= 1;
    } else {
        // Si solo queda uno, lo eliminamos por completo del array
        carrito.splice(indice, 1);
    }
        
    // 3. Guardamos el carrito actualizado en la MISMA clave de LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    
    // Actualizamos toda la interfaz visual llamando a tu render unificado
    renderCarrito();
        
       
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function() { 
    renderCarrito();
});

// Delegación de eventos en el contenedor de productos
const contenedorProductos = document.getElementById('container-tarjetas');

contenedorProductos.addEventListener('click', function(event) {
    // Si el elemento que recibió el clic contiene la clase 'agregar-carrito'
    if (event.target.classList.contains('agregar-carrito')) {
        agregarProducto(event);
    }
});

// Vaciar carrito 
document.getElementById('vaciar-carrito').addEventListener('click', function() {
    localStorage.removeItem('carrito'); 
    
    // Al limpiar los datos, el render se encargará de setear todo en 0 automáticamente
    renderCarrito();
});
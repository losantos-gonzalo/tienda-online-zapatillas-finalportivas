// Inicialización del objeto carrito
const carrito = {
    productos: [],
    total: 0,
};

// Función para actualizar el carrito en el DOM
function actualizarCarritoEnDOM() {
    const carritoElement = document.getElementById("carritoElement"); // Elemento donde se mostrará el carrito

    // Limpiar el carrito antes de actualizarlo
    carritoElement.innerHTML = "";

    // Recorrer los productos en el carrito y mostrarlos visualmente
    carrito.productos.forEach(producto => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("productoCarrito");

        productoElement.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
        `;

        carritoElement.appendChild(productoElement);
    });

    // Actualizar el total del carrito
    const totalElement = document.createElement("div");
    totalElement.innerHTML = `<strong>Total: $${carrito.total}</strong>`;
    carritoElement.appendChild(totalElement);
}

// Función invocarArray
const invocarArray = async () => {
    try {
        const respuesta = await fetch("./zapatillas.json");
        const datos = await respuesta.json();
        const cajita = document.getElementById("contenedor");

        console.log(datos);

        cajita.innerHTML = ""; // Limpiar el contenedor antes de agregar elementos

        datos.productos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("cajaPadre");

            div.innerHTML = `
                <div class="card cajaContenedora" style="width: 20rem; z-index: 0;">
                    <img src="${producto.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <button type="button" class="btn btn-primary btnPrincipal"> Añadir al carrito</button>
                    </div>
                </div>
            `;
            
            cajita.appendChild(div);

            // Agregar evento click al botón "Añadir al carrito" después de crearlo
            div.querySelector(".btnPrincipal").addEventListener('click', () => {
                const nombre = producto.nombre;
                const precio = producto.precio;
                const productoNuevo = { nombre, precio };

                // Agregar el producto al carrito y actualizar visualmente
                carrito.productos.push(productoNuevo);
                carrito.total += precio;
                actualizarCarritoEnDOM();
            });
        });

    } catch (error) {
        console.error('Se ha producido un error:', error);
    }
}

// Llamar a la función invocarArray
invocarArray();


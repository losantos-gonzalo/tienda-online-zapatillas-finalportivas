const carrito = {
    productos: [],
    total: 0,
};

function actualizarCarritoEnDOM() {
    const carritoElement = document.getElementById("carritoElement");

    // Limpiar el carrito antes de actualizarlo
    carritoElement.innerHTML = "";

    // Recorrer los productos en el carrito y mostrarlos visualmente
    carrito.productos.forEach(producto => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("productoCarrito");

        productoElement.innerHTML = `
            <p>${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}</p>
        `;

        carritoElement.appendChild(productoElement);
    });

    // Actualizar el total del carrito
    const totalElement = document.createElement("div");
    totalElement.innerHTML = `<strong>Total: $${carrito.total}</strong>`;
    carritoElement.appendChild(totalElement);
}

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

                // Verificar si el producto ya está en el carrito
                const encontrado = carrito.productos.find(item => item.nombre === nombre);
                if (encontrado) {
                    encontrado.cantidad++; // Incrementar la cantidad si ya existe en el carrito
                } else {
                    const productoNuevo = { nombre, precio, cantidad: 1 }; // Si no existe, añadirlo con cantidad 1
                    carrito.productos.push(productoNuevo);
                }

                carrito.total += precio; // Actualizar el total
                actualizarCarritoEnDOM();

            });
        });

    } catch (error) {
        console.error('Se ha producido un error:', error);
    }
}
invocarArray();

function vaciarCarrito() {
    carrito.productos = [];
    carrito.total = 0;
    actualizarCarritoEnDOM()
    console.log("El carrito ha sido vaciado!");
};

let btnVaciarCarrito = document.getElementById("vaciarCarrito");

if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);

} else {
    console.error("no se ah encontrado el elemento id con vaciarcarrito!")
};
//////////////////////////////////////////////////////////////////
let btnAlert = document.getElementById("vaciarCarrito");

btnAlert.addEventListener("click", () => {

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El carrito se vacio con Exito!",
        showConfirmButton: false,
        timer: 1600,
        customClass: {
            popup: 'custom-alert'
        }
    });
});

///////////////////////////////////////////////////////////////////
setTimeout(() => {

}, 5000);




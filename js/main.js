const carrito = {
    productos: [],
    total: 0,
};

function actualizarCarritoEnDOM() {
    const carritoElement = document.getElementById("carritoElement");

    carritoElement.innerHTML = "";

    carrito.productos.forEach(producto => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("productoCarrito");

        productoElement.innerHTML = `
            <p>${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}</p>
        `;

        carritoElement.appendChild(productoElement);
    });

    const totalElement = document.createElement("div");
    totalElement.innerHTML = `<strong>Total: $${carrito.total.toFixed(2)}</strong>`;
    carritoElement.appendChild(totalElement);
}

const invocarArray = async () => {
    try {
        const respuesta = await fetch("./zapatillas.json");
        const datos = await respuesta.json();
        const cajita = document.getElementById("contenedor");

        cajita.innerHTML = "";

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

            div.querySelector(".btnPrincipal").addEventListener('click', () => {
                const nombre = producto.nombre;
                const precio = producto.precio;

                const encontrado = carrito.productos.find(item => item.nombre === nombre);

                setTimeout(() => {
                    if (encontrado) {
                        encontrado.cantidad++;
                    } else {
                        const productoNuevo = { nombre, precio, cantidad: 1 };
                        carrito.productos.push(productoNuevo);
                    }

                    carrito.total += precio;

                    localStorage.setItem('totalCompra', carrito.total.toFixed(2));

                    actualizarCarritoEnDOM();
                }, 400);

            });

        });


        const filtroInput = document.getElementById("filtro");

        filtroInput.addEventListener("input", filtrarProductos);

        function filtrarProductos() {
            const filtroTexto = filtroInput.value.toLowerCase();
            const productosFiltrados = datos.productos.filter(producto => producto.nombre.toLowerCase().includes(filtroTexto));
            const imprimirFilter = document.getElementById("filter");

            imprimirFilter.innerHTML = '';

            productosFiltrados.forEach(producto => {
                const li = document.createElement("li");
                li.textContent = producto.nombre;
                imprimirFilter.appendChild(li);
            });
        }


    } catch (error) {
        console.error('Se ha producido un error:', error);
    }
}
invocarArray();
// vaciar carrito
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

const filtroInput = document.getElementById("filtro");

window.addEventListener('load', () => {
    const totalGuardado = localStorage.getItem('totalCompra');
    if (totalGuardado) {
        carrito.total = parseFloat(totalGuardado);
        actualizarCarritoEnDOM();
    }
});

/////////////////////////////////////////////////////////////////////////
function alternarVisibilidad() {
    const elemento = document.getElementById("carritoElement"); // Reemplaza "miElemento" con el ID del elemento que quieres mostrar/ocultar

    if (elemento.style.display === "none") {
        elemento.style.display = "block";
    } else {
        elemento.style.display = "none";
    }
}

const btnMostrarCarrito = document.getElementById("mostrarCarrito");

btnMostrarCarrito.addEventListener("click", () => {
    let nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add("btnMostrarCarrito");

    document.body.appendChild(nuevoDiv);

    alternarVisibilidad();
});

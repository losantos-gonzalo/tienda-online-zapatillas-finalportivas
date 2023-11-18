const invocarArray = async () => {

    try {
        const respuesta = await fetch("./zapatillas.json");
        const datos = await respuesta.json();
        const cajita = document.getElementById("contenedor");

        console.log(datos);

        datos.productos.forEach(producto => {
            const contenidoDiv = document.getElementById("contenedor");
            const editarCajita = document.querySelectorAll(".cajaContenedora")
            //cajitas
            contenidoDiv.innerHTML += `
            <div class="cajaPadre">
                <div class="card cajaContenedora" style="width: 20rem; z-index: 0;">

                    <img src="${producto.img}" class="card-img-top" alt="...">

                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>

                        <button type="button" class="btn btn-primary btnPrincipal" id="btnPrincipal"> Añadir al carrito</button>

                    </div>

                </div>
            </div>
            `;

            //evento click
            const botones = document.querySelectorAll(".btnPrincipal");

            botones.forEach(boton => {
                boton.addEventListener('click', () => {
                    const divProducto = boton.closest(".card");
                    const nombre = divProducto.querySelector(".card-title").textContent;
                    const precioTexto = boton.querySelector(".card-text").textContent;
                    const precio = parseFloat(precioTexto.replace(/\D/g, ''));
                    const producto = { nombre, precio };

                    carrito.productos.push(producto);
                    carrito.total += precio;

                    actualizarCarritoEnDOM();
                });
            });
        });

    } catch (error) {
        console.error('Se ha producido un error:', error);
    }
}
invocarArray();


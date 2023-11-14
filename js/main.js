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
                <div class="card cajaContenedora" style="width: 20rem; z-index: -1;">

                    <img src="${producto.img}" class="card-img-top" alt="...">

                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <p class="card-text">Stock: ${producto.stock}</p>

                        <button type="button" class="btn btn-primary" id="btnPrincipal"> Añadir al carrito</button>

                    </div>

                </div>
            </div>
            `;

            //evento click
            const boton = document.getElementById("btnPrincipal");

            boton.addEventListener(`click`, () => {
                console.log(`Buenas tardes aca la respuesta del click`);
            })
        });

    } catch (error) {
        console.error('Se ha producido un error:', error);
    }
}
invocarArray();


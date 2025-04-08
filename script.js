document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("busqueda");
    const container = document.getElementById("productos-container");
    let productosGlobal = [];

   
    async function cargarProductos() {
        try {
            const response = await fetch(`http://localhost:8080/producto/list`);
            if (!response.ok) {
                throw new Error(`Error al obtener productos: ${response.status}`);
            }
            productosGlobal = await response.json();
            mostrarProductos(productosGlobal);
        } catch (error) {
            console.error("❌ Error al cargar los productos:", error);
        }
    }

  
    function mostrarProductos(productos) {
        container.innerHTML = ""; // Limpiar antes de agregar nuevos

        if (productos.length === 0) {
            container.innerHTML = "<p class='text-center'>No se encontraron productos</p>";
            return;
        }

        productos.forEach((producto) => {
            const col = document.createElement("div");
            col.classList.add("col-md-3", "mb-4");

            col.innerHTML = `
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="fw-bold">$${producto.precio}</p>
                        <button class="btn btn-primary">Agregar al carrito</button>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    }

    function filtrarProductos() {
        const texto = searchInput.value.toLowerCase();

        const productosFiltrados = productosGlobal.filter(producto =>
            producto.nombre.toLowerCase().includes(texto) ||
            producto.descripcion.toLowerCase().includes(texto)
        );
        mostrarProductos(productosFiltrados);
    }

  
    if (searchInput) {
        searchInput.addEventListener("input", filtrarProductos);
    } else {
        console.error("❌ No se encontró el input de búsqueda");
    }


    cargarProductos();
});

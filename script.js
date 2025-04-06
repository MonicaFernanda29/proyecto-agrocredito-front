document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".form-control[type='search']");
    const container = document.getElementById("productos-container");
    let productosGlobal = []; 

    async function cargarProductos() {
        const response = await fetch(`http://localhost:8080/producto/list`);
        const productos = await response.json();
        
        productosGlobal = productos; 
        mostrarProductos(productos);
    }

    function mostrarProductos(productos) {
        container.innerHTML = ""; 

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

    
    function redirigirACategoria(categoria) {
        const categorias = {
            "fertilizantes": "fertilizantes.html",
            "abonos": "abonos.html",
            "semillas": "semillas.html"
        };

        
        if (categorias[categoria]) {
            window.location.href = `pages/categories/${categorias[categoria]}`;
        }
    }

    if (searchInput) { 
        searchInput.addEventListener("input", (event) => {
            const texto = event.target.value.toLowerCase();

            
            redirigirACategoria(texto);

           
            const productosFiltrados = productosGlobal.filter(producto => 
                producto.nombre.toLowerCase().includes(texto) ||
                producto.descripcion.toLowerCase().includes(texto)
            );

            mostrarProductos(productosFiltrados);  
        });
    }

    cargarProductos();
});

function obtenerProductosPorCategoria(categoria) {
  const container = document.getElementById("productos-container");

  if (!container) {
      console.error("No se encontró el contenedor de productos.");
      return;
  }

  // Petición a Spring Boot
  fetch(`http://localhost:8080/producto/categoria/${categoria}`)
      .then(response => response.json())
      .then(productos => {
          if (productos.length === 0) {
              container.innerHTML = `<p class="text-center">No hay productos disponibles en esta categoría.</p>`;
              return;
          }

          container.innerHTML = "";
          productos.forEach(producto => {
              const col = document.createElement("div");
              col.classList.add("col-md-4", "mb-4");

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
      })
      .catch(error => {
          console.error("Error:", error);
          container.innerHTML = `<p class="text-center text-danger">Error al cargar productos.</p>`;
      });
}

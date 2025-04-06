// DESDE QUE AQUI INICIA EL MANEJO DEL USUARIO EL ADMINISTADOR

async function consultarUsuario() {
  let personaId = localStorage.getItem("userid");
  fetch(`http://localhost:8080/auth/usuario/${personaId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return respuesta.json();
    })
    .then((data) => {
      document.getElementById("nombre_admin").value = data.nombre || "";
      document.getElementById("apellido_admin").value = data.apellido || "";
      document.getElementById("celular_admin").value = data.celular || "";
      document.getElementById("ciudad_admin").value = data.ciudad || "";
      document.getElementById("direccion_admin").value = data.direccion || "";
      document.getElementById("fecha_nacimiento_admin").value =
        data.fecha_nacimiento || "";
      document.getElementById("correo_admin").value = data.correo || "";
      document.getElementById("rol_admin").value = data.rol || "";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("No se pudo cargar la información del perfil.");
    });
}

async function actualizarUsuario(event) {
  let personaId = localStorage.getItem("userid");

  const nombre = document.getElementById("nombre_admin").value;
  const apellido = document.getElementById("apellido_admin").value;
  const celular = document.getElementById("celular_admin").value;
  const ciudad = document.getElementById("ciudad_admin").value;
  const direccion = document.getElementById("direccion_admin").value;
  const fecha_nacimiento = document.getElementById(
    "fecha_nacimiento_admin"
  ).value;
  const correo = document.getElementById("correo_admin").value;
  const contrasena = document.getElementById("contrasena_admin").value;
  const rol = document.getElementById("rol_admin").value;
  const id = personaId;

  const data = {
    id,
    nombre,
    apellido,
    celular,
    ciudad,
    direccion,
    fecha_nacimiento,
    correo,
    contrasena,
    rol,
  };

  fetch("http://localhost:8080/auth/actualizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((respuesta) => {
      if (respuesta.ok) {
        alert("Actualizacion exitosa. Redirigiendo a la página de login...");
        window.location.href = "login.html";
      } else {
        alert(
          `Error: ${errorData.message || "Hubo un problema al Actualizacion."}`
        );
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema al intentar registrarte. Intenta nuevamente.");
    });
}
// DESDE QUE AQUI FINALIZA EL MANEJO DEL USUARIO EL ADMINISTADOR



// DESDE QUE AQUI INICIA EL MANEJO DEL PRODUCTOS DESDE EL ADMINISTADOR



async function consultarProductos() {
  await fetch("http://localhost:8080/producto/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener la lista de productos.");
      }
      return respuesta.json();
    })
    .then((productos) => {
      mostrarProductosEnTabla(productos);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("No se pudo cargar la lista de productos.");
    });
}

function mostrarProductosEnTabla(productos) {
  const tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = ""; // Limpiar la tabla antes de agregar datos nuevos

  productos.forEach((productos) => {
    let row = document.createElement("tr");
    row.innerHTML = `
          <td>${productos.nombre}</td>
          <td>${productos.descripcion}</td>
          <td> $${productos.precio}</td>
          <td>${productos.categoria}</td>
          <td>${productos.stock}</td>
          <td>${productos.imagen}</td>
          <td><button class="btn btn-danger btn-sm" onclick="eliminarProductos(${productos.id}, this)">Eliminar</button></td>
      `;
    tabla.appendChild(row);
  });
}


async function registerProducto(event) {
  
  const nombre = document.getElementById("nombre_producto").value;
  const descripcion = document.getElementById("descripcion_producto").value;
  const precio = document.getElementById("precio_producto").value;
  const categoria = document.getElementById("categoria_producto").value;
  const stock = document.getElementById("stock_producto").value;
  const imagen = document.getElementById("imagen_producto").value;

  const data = {
    nombre,
    descripcion,
    precio,
    categoria,
    stock,
    imagen
  };

  try {
    const response = await fetch("http://localhost:8080/producto/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Registro exitoso...");
      
      const nuevoProducto = await response.json(); // Obtener datos del usuario recién creado
      agregarProductoEnTabla(nuevoProducto); // Agregar a la tabla en tiempo real
      
      // Opcional: Limpiar formulario después del registro
      document.getElementById("productoForm").reset();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message || "Hubo un problema al registrar."}`);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un problema al intentar registrar. Intenta nuevamente.");
  }
}


// 🔹 Función para agregar un usuario a la tabla dinámicamente
function agregarProductoEnTabla(usuario) {
  const tabla = document.getElementById("tablaProductos");

  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${usuario.nombre}</td>
    <td>${usuario.apellido}</td>
    <td>${usuario.celular}</td>
    <td>${usuario.ciudad}</td>
    <td>${usuario.direccion}</td>
    <td>${usuario.fecha_nacimiento}</td>
    <td>${usuario.correo}</td>
    <td>${usuario.rol}</td>
    <td><button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id}, this)">Eliminar</button></td>
  `;

  tabla.appendChild(row);
}


async function eliminarProductos(event) {
  if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    return;
  }

  fetch(`http://localhost:8080/auth/eliminar/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((reponse) => {
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el productos.");
    }
    let fila = button.closest("tr");
    fila.remove();

    alert("Productos eliminado con éxito.");
  }).catch(error => {
    console.error("Error:", error);
    alert("No se pudo eliminar el productos.");
  });
}

// DESDE QUE AQUI FINALIZA EL MANEJO DEL PRODUCTOS DESDE EL ADMINISTADOR



// DESDE QUE AQUI INICIA EL MANEJO DEL USUARIO DESDE EL ADMINISTADOR


async function register(event) {
  
  const nombre = document.getElementById("nombre_usuario").value;
  const apellido = document.getElementById("apellido_usuario").value;
  const celular = document.getElementById("celular_usuario").value;
  const ciudad = document.getElementById("ciudad_usuario").value;
  const direccion = document.getElementById("direccion_usuario").value;
  const fecha_nacimiento = document.getElementById("fecha_nacimiento_usuario").value;
  const correo = document.getElementById("correo_usuario").value;
  const contrasena = document.getElementById("contrasena_usuario").value;
  const rol = document.getElementById("rol_usuario").value;

  const data = {
    nombre,
    apellido,
    celular,
    ciudad,
    direccion,
    fecha_nacimiento,
    correo,
    contrasena,
    rol,
  };

  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Registro exitoso...");
      
      const nuevoUsuario = await response.json(); // Obtener datos del usuario recién creado
      agregarUsuarioEnTabla(nuevoUsuario); // Agregar a la tabla en tiempo real
      
      // Opcional: Limpiar formulario después del registro
      document.getElementById("registerFormAdmin").reset();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message || "Hubo un problema al registrar."}`);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un problema al intentar registrar. Intenta nuevamente.");
  }
}

// 🔹 Función para agregar un usuario a la tabla dinámicamente
function agregarUsuarioEnTabla(productos) {
  const tabla = document.getElementById("tablaUsuarios");

  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${productos.nombre}</td>
          <td>${productos.descripcion}</td>
          <td> $${productos.precio}</td>
          <td>${productos.categoria}</td>
          <td>${productos.stock}</td>
          <td>${productos.imagen}</td>
    <td><button class="btn btn-danger btn-sm" onclick="eliminarProductos(${productos.id}, this)">Eliminar</button></td>
  `;

  tabla.appendChild(row);
}

async function eliminarUsuario(event) {
  if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    return;
  }

  fetch(`http://localhost:8080/auth/eliminar/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((reponse) => {
    if (!respuesta.ok) {
      throw new Error("Error al eliminar el usuario.");
    }
    let fila = button.closest("tr");
    fila.remove();

    alert("Usuario eliminado con éxito.");
  }).catch(error => {
    console.error("Error:", error);
    alert("No se pudo eliminar el usuario.");
  });
}




async function consultarUsuarios() {
  await fetch("http://localhost:8080/auth/traerPersonas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al obtener la lista de usuarios.");
      }
      return respuesta.json();
    })
    .then((usuarios) => {
      mostrarUsuariosEnTabla(usuarios);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("No se pudo cargar la lista de usuarios.");
    });
}

function mostrarUsuariosEnTabla(usuarios) {
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = ""; // Limpiar la tabla antes de agregar datos nuevos

  usuarios.forEach((usuario) => {
    let row = document.createElement("tr");
    row.innerHTML = `
          <td>${usuario.nombre}</td>
          <td>${usuario.apellido}</td>
          <td>${usuario.celular}</td>
          <td>${usuario.ciudad}</td>
          <td>${usuario.direccion}</td>
          <td>${usuario.fecha_nacimiento}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.rol}</td>
          <td><button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id}, this)">Eliminar</button></td>
      `;
    tabla.appendChild(row);
  });
}

//FINALIZA LA SECCION PARA EL MANEJO DEL USUARIO DESDE EL ADMINISTRADOR



//DESDE AQUI QUE MANEJAN TODOS LOS EVENTOS DENTRO DEL DOCUMENTO 

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("perfil-tab").addEventListener("click", function () {
    consultarUsuario();
  });

  document.getElementById("usuarios-tab").addEventListener("click", function () {
    consultarUsuarios();
  });

  document.getElementById("productos-tab").addEventListener("click", function () {
    consultarProductos();
  });

  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
      consultarUsuario();
    profileForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que la página se recargue
      actualizarUsuario();
    });
  }

  const productoForm = document.getElementById("productoForm");
  if (productoForm) {
    consultarProductos();
    productoForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que la página se recargue
      registerProducto();
    });
  }

  const registerFormAdmin = document.getElementById("registerFormAdmin");
  if (registerFormAdmin) {
    registerFormAdmin.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que la página se recargue
      register();
    });
  }

  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function () {
      localStorage.removeItem("userid")
      window.location.href = "login.html";
    });
  }
});


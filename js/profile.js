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
      document.getElementById("nombre").value = data.nombre || "";
      document.getElementById("apellido").value = data.apellido || "";
      document.getElementById("celular").value = data.celular || "";
      document.getElementById("ciudad").value = data.ciudad || "";
      document.getElementById("direccion").value = data.direccion || "";
      document.getElementById("fecha_nacimiento").value =
        data.fecha_nacimiento || "";
      document.getElementById("correo").value = data.correo || "";
      document.getElementById("rol").value = data.rol || "";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("No se pudo cargar la información del perfil.");
    });
}

async function actualizarUsuario(event) {
 
    event.preventDefault();
    let personaId = localStorage.getItem("userid");

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const celular = document.getElementById("celular").value;
    const ciudad = document.getElementById("ciudad").value;
    const direccion = document.getElementById("direccion").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const rol = document.getElementById("rol").value;
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
      }).then((respuesta)=> {
         if (respuesta.ok) {
        alert("Actualizacion exitosa. Redirigiendo a la página de login...");
        window.location.href = "login.html";
      } else {
        alert(
          `Error: ${errorData.message || "Hubo un problema al Actualizacion."}`
        );
      }
      }).then(error => {
         console.error("Error en la solicitud:", error);
      alert("Hubo un problema al intentar registrarte. Intenta nuevamente.");
      })

 
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("profileForm")) {
    document
      .getElementById("profileForm")
      .addEventListener("submit", actualizarUsuario);
  }
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function () {
      localStorage.removeItem("userid")
      window.location.href = "login.html";
    });
  }
});


consultarUsuario();

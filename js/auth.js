async function login(event) {
  event.preventDefault();
  localStorage.removeItem("userid")
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;

  const loginData = { correo, contrasena };

   fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((dataResponse) => {
        const esLogueado = dataResponse.esLogueado;
        const rol = dataResponse.rol.toUpperCase();
        const personaId = dataResponse.personaId;
        if (esLogueado && rol === "CLIENTE") {
          localStorage.setItem("userid", personaId);
          window.location.href = "profile.html";
      } else if(esLogueado && rol === "ADMINISTRADOR") {
          localStorage.setItem("userid", personaId);
          window.location.href = "consola-admin.html";
      }else{
        alert("revisa tus credenciales");
      }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error, intenta nuevamente");
      });
  
}


async function register(event) {
  event.preventDefault();
  localStorage.removeItem("userid")
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const celular = document.getElementById("celular").value;
  const ciudad = document.getElementById("ciudad").value;
  const direccion = document.getElementById("direccion").value;
  const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const rol = document.getElementById("rol").value;

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
      alert("Registro exitoso. Redirigiendo a la página de login...");
      window.location.href = "login.html";
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message || "Hubo un problema al registrar."}`);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un problema al intentar registrarte. Intenta nuevamente.");
  }
}

document.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("registerForm")) {
    document
      .getElementById("registerForm")
      .addEventListener("submit", register);
  }

  if (document.getElementById("registerForm-admin")) {
    document
      .getElementById("registerForm-admin")
      .addEventListener("submit", register);
  }


  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", login);
  }
});

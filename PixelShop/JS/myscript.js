function inicializarBotonesAgregar() {
  const botones = document.querySelectorAll(".btn-carrito");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const usuario = JSON.parse(sessionStorage.getItem("usuario"));
      if (!usuario) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        window.location.href = "login.html";
        return;
      }

      const tarjeta = boton.closest(".tarjeta");
      const id = boton.dataset.id;
      const nombre = tarjeta.querySelector(".card-title").textContent;
      const precioStr = tarjeta.querySelector(".card-subtitle").textContent.replace(/[^\d]/g, "");
      const precio = Number(precioStr);
      const cantidadInput = tarjeta.querySelector(".cantidad");
      const cantidad = Number(cantidadInput.value) || 1;
      const imagen = tarjeta.querySelector("img.imagen").src;
      const link = tarjeta.querySelector("a.btn-vermas")?.href || "#";

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const productoExistente = carrito.find(item => item.id == id);

      if (productoExistente) {
        productoExistente.cantidad += cantidad;
      } else {
        carrito.push({ id, nombre, precio, cantidad, imagen, link });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert(`Se agregó ${cantidad} "${nombre}" al carrito.`);
    });
  });
}
////////////////////////////////////PC ARMADAS////////////////////////////////////
//TITULO FILTRO
let computadoras = [];
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorComputadoras");
  const tituloFiltro = document.getElementById("tituloFiltro");
  const formFiltro = document.getElementById("formFiltroMarca");
  let computadoras = [];

  // Cargo los datos desde el JSON
  fetch("../JSON/productos.json")
    .then(res => res.json())
    .then(data => {
      computadoras = data.computadoras;
      mostrarComputadoras(computadoras, "todas");
    })
    .catch(error => console.error("Error al cargar JSON:", error));

  // Evento cambio filtro
  formFiltro.addEventListener("change", () => {
    const marcaSeleccionada = document.querySelector('input[name="marca"]:checked')?.value || "todas";
    const listaFiltrada = filtrarPorMarca(marcaSeleccionada);
    mostrarComputadoras(listaFiltrada, marcaSeleccionada);
  });

  // Filtrar por marca
  function filtrarPorMarca(marca) {
    if (marca === "todas") return computadoras;
    return computadoras.filter(pc => pc.marca === marca);
  }

  // Mostrar computadoras en el contenedor
  function mostrarComputadoras(lista, filtro = "todas") {
    contenedor.innerHTML = "";

    // Mostrar título del filtro solo si no es "todas"
    if (filtro !== "todas") {
      tituloFiltro.textContent = `Mostrando: ${filtro}`;
      tituloFiltro.style.display = "block";
    } else {
      tituloFiltro.style.display = "none";
    }

    lista.forEach(pc => {
      contenedor.innerHTML += `
        <div class="tarjeta">
          <div class="imagen-container">
            <img src="${pc.imagen}" alt="${pc.nombre}" class="imagen">
          </div>
          <div class="card-body">
            <h5 class="card-title">${pc.nombre}</h5>
            <h6 class="card-subtitle">$${pc.precio.toLocaleString()}</h6>
            <p class="card-text">${pc.descripcion}</p>
            <div class="producto-footer">
              <input type="number" class="cantidad" value="1" min="1">
              <button class="btn-carrito" data-id="${pc.id}">Agregar al carrito</button>
              <a href="${pc.link || '#'}" class="btn-vermas">Ver más</a>
            </div>
          </div>
        </div>
      `;
    });
    inicializarBotonesAgregar();
  }
});



////////////////////////////////////HARDWARE////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorHardware");
  const tituloFiltro = document.getElementById("tituloFiltro");
  const formFiltro = document.getElementById("formFiltroMarca");
  let productos = [];

  // Cargar datos desde el JSON
  fetch("../JSON/productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data.hardware;
      mostrarProductos(productos, "todas");
    })
    .catch(error => console.error("Error al cargar JSON:", error));

  // Evento de cambio en los filtros
  formFiltro.addEventListener("change", () => {
    const categoriaSeleccionada = document.querySelector('input[name="categoria"]:checked')?.value || "todas";
    const listaFiltrada = filtrarPorCategoria(categoriaSeleccionada);
    mostrarProductos(listaFiltrada, categoriaSeleccionada);
  });

  // Filtrar productos por categoría
  function filtrarPorCategoria(categoria) {
    if (categoria === "todas") return productos;
    return productos.filter(item => item.categoria === categoria);
  }

  // Mostrar productos
  function mostrarProductos(lista, filtro = "todas") {
    contenedor.innerHTML = "";

    if (filtro !== "todas") {
      tituloFiltro.textContent = `Mostrando: ${filtro}`;
      tituloFiltro.style.display = "block";
    } else {
      tituloFiltro.style.display = "none";
    }

    lista.forEach(item => {
      contenedor.innerHTML += `
        <div class="tarjeta">
          <div class="imagen-container">
            <img src="${item.imagen}" alt="${item.nombre}" class="imagen">
          </div>
          <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <h6 class="card-subtitle">$${item.precio.toLocaleString()}</h6>
            <p class="card-text">${item.descripcion}</p>
            <div class="producto-footer">
              <input type="number" class="cantidad" value="1" min="1">
              <button class="btn-carrito" data-id="${item.id}">Agregar al carrito</button>
              <a href="${item.link || '#'}" class="btn-vermas">Ver más</a>
            </div>
          </div>
        </div>
      `;
    });
    inicializarBotonesAgregar();
  }
});



////////////////////////////////////PERIFERICOS////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorPerifericos");
  const tituloFiltro = document.getElementById("tituloFiltro");
  const formFiltro = document.getElementById("formFiltroMarca");
  let productos = [];

  // Cargar datos desde el JSON
  fetch("../JSON/productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data.perifericos;
      mostrarProductos(productos, "todas");
    })
    .catch(error => console.error("Error al cargar JSON:", error));

  // Evento de cambio en los filtros
  formFiltro.addEventListener("change", () => {
    const categoriaSeleccionada = document.querySelector('input[name="categoria"]:checked')?.value || "todas";
    const listaFiltrada = filtrarPorCategoria(categoriaSeleccionada);
    mostrarProductos(listaFiltrada, categoriaSeleccionada);
  });

  // Filtrar productos por categoría
  function filtrarPorCategoria(categoria) {
    if (categoria === "todas") return productos;
    return productos.filter(item => item.categoria === categoria);
  }

  // Mostrar productos
  function mostrarProductos(lista, filtro = "todas") {
    contenedor.innerHTML = "";

    if (filtro !== "todas") {
      tituloFiltro.textContent = `Mostrando: ${filtro}`;
      tituloFiltro.style.display = "block";
    } else {
      tituloFiltro.style.display = "none";
    }

    lista.forEach(item => {
      contenedor.innerHTML += `
        <div class="tarjeta">
          <div class="imagen-container">
            <img src="${item.imagen}" alt="${item.nombre}" class="imagen">
          </div>
          <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <h6 class="card-subtitle">$${item.precio.toLocaleString()}</h6>
            <p class="card-text">${item.descripcion}</p>
            <div class="producto-footer">
              <input type="number" class="cantidad" value="1" min="1">
              <button class="btn-carrito" data-id="${item.id}">Agregar al carrito</button>
              <a href="${item.link || '#'}" class="btn-vermas">Ver más</a>
            </div>
          </div>
        </div>
      `;
    });
    inicializarBotonesAgregar();  
  }
});




////////////////////////////////////CONSOLAS////////////////////////////////////
//TITULO FILTRO
let consolas = [];
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorConsolas");
  const tituloFiltro = document.getElementById("tituloFiltro");
  const formFiltro = document.getElementById("formFiltroMarca");
  let consolas = [];

  // Cargo los datos desde el JSON
  fetch("../JSON/productos.json")
    .then(res => res.json())
    .then(data => {
      consolas = data.consolas;
      mostrarconsolas(consolas, "todas");
    })
    .catch(error => console.error("Error al cargar JSON:", error));

  // Evento cambio filtro
  formFiltro.addEventListener("change", () => {
    const marcaSeleccionada = document.querySelector('input[name="marca"]:checked')?.value || "todas";
    const listaFiltrada = filtrarPorMarca(marcaSeleccionada);
    mostrarconsolas(listaFiltrada, marcaSeleccionada);
  });

  // Filtrar por marca
  function filtrarPorMarca(marca) {
    if (marca === "todas") return consolas;
    return consolas.filter(pc => pc.marca === marca);
  }

  // Mostrar consolas en el contenedor
  function mostrarconsolas(lista, filtro = "todas") {
    contenedor.innerHTML = "";

    // Mostrar título del filtro solo si no es "todas"
    if (filtro !== "todas") {
      tituloFiltro.textContent = `Mostrando: ${filtro}`;
      tituloFiltro.style.display = "block";
    } else {
      tituloFiltro.style.display = "none";
    }

    lista.forEach(pc => {
      contenedor.innerHTML += `
        <div class="tarjeta">
          <div class="imagen-container">
            <img src="${pc.imagen}" alt="${pc.nombre}" class="imagen">
          </div>
          <div class="card-body">
            <h5 class="card-title">${pc.nombre}</h5>
            <h6 class="card-subtitle">$${pc.precio.toLocaleString()}</h6>
            <p class="card-text">${pc.descripcion}</p>
            <div class="producto-footer">
              <input type="number" class="cantidad" value="1" min="1">
              <button class="btn-carrito" data-id="${pc.id}">Agregar al carrito</button>
              <a href="${pc.link || '#'}" class="btn-vermas">Ver más</a>
            </div>
          </div>
        </div>
      `;
    });
    inicializarBotonesAgregar();
  }
});






document.addEventListener("DOMContentLoaded", () => {
    const navUsuario = document.getElementById("usuario-nav");

    // Verifica si hay una sesión activa
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (usuario) {
      // Si está logueado, mostrar opciones completas
      navUsuario.innerHTML = `
        <a href="carrito.html"><img src="../assets/Iconos/icono-carrito.png" alt="Carrito" class="icono">Carrito</a>
        <a href="cuenta.html"><img src="../assets/Iconos/icono-micuenta.png" alt="Mi cuenta" class="icono">Mi cuenta</a>
        <a href="#" id="cerrar-sesion"><img src="../assets/Iconos/icono-cerrarsesion.png" alt="Cerrar sesión" class="icono">Cerrar sesión</a>
        `;

      // Cerrar sesión
      document.getElementById("cerrar-sesion").addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("usuario");
        location.reload();
      });

    } else {
      // Si no está logueado, mostrar login y registro
      navUsuario.innerHTML = `
        <a href="login.html"><img src="../assets/Iconos/icono-micuenta.png" alt="Login" class="icono">Iniciar sesión</a>
        <a href="register.html"><img src="../assets/Iconos/icono-cerrarsesion.png" alt="Registro" class="icono">Registrar cuenta</a>
        `;

    }
  });
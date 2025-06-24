document.addEventListener("DOMContentLoaded", () => {
  const carritoBody = document.getElementById("carrito-body");
  const tablaCarrito = document.getElementById("tabla-carrito");
  const carritoVacio = document.getElementById("carrito-vacio");
  const totalDiv = document.getElementById("total");
  const btnVaciar = document.getElementById("btn-vaciar");
  const btnFinalizar = document.getElementById("btn-finalizar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function mostrarCarrito() {
    const envioContenedor = document.getElementById("envio-contenedor");

    if (carrito.length === 0) {
        tablaCarrito.style.display = "none";
        carritoVacio.style.display = "block";
        totalDiv.textContent = "";
        if (envioContenedor) envioContenedor.style.display = "none";
        return;
    }

    tablaCarrito.style.display = "table";
    carritoVacio.style.display = "none";
    if (envioContenedor) envioContenedor.style.display = "block";

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td>
          <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: auto; margin-right: 10px;">
          ${producto.nombre}
        </td>
        <td>$${producto.precio.toLocaleString()}</td>
        <td><input type="number" min="1" value="${producto.cantidad}" data-index="${index}" class="input-cantidad" style="width: 60px;"></td>
        <td>$${subtotal.toLocaleString()}</td>
        <td><button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">Eliminar</button></td>
      `;

        carritoBody.appendChild(fila);
    });

    actualizarTotal();
    agregarEventosCantidadEliminar();
  }

  function calcularTotalConEnvio() {
    const totalProductos = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    const metodo = document.querySelector("input[name='envio']:checked")?.value;

    let costoEnvio = 0;
    switch (metodo) {
      case "correo":
        costoEnvio = 79000;
        break;
      case "oca":
        costoEnvio = 75000;
        break;
      case "andreani":
        costoEnvio = 85000;
        break;
    }

    return totalProductos + costoEnvio;
  }

  function actualizarTotal() {
    const total = calcularTotalConEnvio();
    totalDiv.textContent = `Total con envío: $${total.toLocaleString()}`;
  }

  function agregarEventosCantidadEliminar() {
    // Cambiar cantidad
    const inputsCantidad = document.querySelectorAll(".input-cantidad");
    inputsCantidad.forEach(input => {
      input.addEventListener("change", (e) => {
        const index = e.target.dataset.index;
        let nuevaCantidad = parseInt(e.target.value);
        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
          nuevaCantidad = 1;
          e.target.value = 1;
        }
        carrito[index].cantidad = nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
      });
    });

    // Eliminar producto
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");
    btnsEliminar.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
      });
    });
  }

  btnVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });

  btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    fetch('https://fakestoreapi.com/carts', {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      date: new Date().toISOString(),
      products: carrito.map(item => ({
        productId: item.id,
        quantity: item.cantidad
      }))
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(json => {
    console.log("Simulación de orden enviada:", json);
    // Vaciar carrito
    carrito = [];
    localStorage.removeItem("carrito");
    // Redirigir al checkout de simulación
    window.location.href = "checkout.html";
  });
});

  // Escuchar cambios en el método de envío
  const radiosEnvio = document.querySelectorAll("input[name='envio']");
  radiosEnvio.forEach(radio => {
    radio.addEventListener("change", () => {
      actualizarTotal();
    });
  });

  mostrarCarrito();
});

const mp = new MercadoPago("TU_PUBLIC_KEY_DE_TEST", {
  locale: "es-AR"
});

const checkout = mp.checkout({
  preference: {
    id: "TU_ID_DE_PREFERENCIA"
  },
  autoOpen: true,
});


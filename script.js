document.addEventListener("DOMContentLoaded", function() {
    console.log("Sistemas de información");
    alert("Bienvenido al Centro Tecnológico Virelix");

    // Inicializar reloj dinámico
    actualizarReloj();
    setInterval(actualizarReloj, 1000);

    // Validación y guardado en localStorage
    const form = document.querySelector("#formulario form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita recarga

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const servicio = document.getElementById("servicio").value; // campo servicio

        // Validar que ningún campo esté vacío
        if (nombre === "" || correo === "" || mensaje === "" || servicio === "") {
            alert("Por favor, completa todos los campos antes de enviar.");
        } else {
            // Guardar datos en localStorage
            const datosFormulario = {
                nombre: nombre,
                correo: correo,
                mensaje: mensaje,
                servicio: servicio,
                fecha: new Date().toLocaleString()
            };

            // Guardar historial acumulado
            let historial = JSON.parse(localStorage.getItem("formularioHistorial")) || [];
            historial.push(datosFormulario);
            localStorage.setItem("formularioHistorial", JSON.stringify(historial));

            // Mostrar confirmación abajo
            mostrarConfirmacion("✅ Tu mensaje ha sido enviado y guardado.", "green");

            // Limpiar formulario
            form.reset();
        }
    });

    // Detectar selección en el menú desplegable de servicios
    const selectServicio = document.getElementById("servicio");
    selectServicio.addEventListener("change", function() {
        const opcionSeleccionada = selectServicio.options[selectServicio.selectedIndex].text;
        if (selectServicio.value !== "") {
            // ❌ Quitamos el alert para evitar doble ventana
            // alert("Has seleccionado: " + opcionSeleccionada);

            // ✅ Solo mostrar confirmación visual abajo
            mostrarConfirmacion("🔎 Has seleccionado: " + opcionSeleccionada, "blue");

            console.log("Servicio elegido:", opcionSeleccionada);
        }
    });

    // Detectar interacción con botones mediante mouseover/mouseleave
    const btnEnviar = document.querySelector("#formulario button[type='submit']");
    
    btnEnviar.addEventListener("mouseover", function() {
        console.log("Mouse sobre el botón ENVIAR");
        btnEnviar.style.backgroundColor = "green"; // ejemplo visual
    });

    btnEnviar.addEventListener("mouseleave", function() {
        console.log("Mouse salió del botón ENVIAR");
        btnEnviar.style.backgroundColor = ""; // vuelve al estilo original
    });
});

// Función para mostrar mensaje de confirmación interactivo
function mostrarConfirmacion(texto, color) {
    const modal = document.createElement("div");
    modal.textContent = texto;
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "#fff";
    modal.style.padding = "20px";
    modal.style.border = "2px solid " + color;
    modal.style.borderRadius = "8px";
    modal.style.color = color;
    modal.style.fontSize = "18px";
    modal.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    modal.style.zIndex = "1000";

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.remove();
    }, 3000);
}

// Función para actualizar el reloj en formato 12 horas
function actualizarReloj() {
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    let ampm = horas >= 12 ? 'PM' : 'AM';

    horas = horas % 12;
    horas = horas ? horas : 12;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    const horaFormateada = `${horas}:${minutos}:${segundos} ${ampm}`;
    document.getElementById('reloj').textContent = horaFormateada;
}

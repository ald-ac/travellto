//Botones|Acciones
const formulario = document.querySelector('#formulario');
const btnVerViajes = document.querySelector('#verViajes');

//Campos
const nombre = document.querySelector('#nombre');
const destino = document.querySelector('#destino');
const numDias = document.querySelector('#dias');

//Listeners
formulario.addEventListener('submit', validarCampos);

function validarCampos(e) {
    e.preventDefault();
    if(nombre.value !== '' && numDias.value !== '') {
        limpiarError();
        calcularPrecio();
    } else {
        mostrarError();
    }
}

function mostrarError() {
    limpiarError();

    const mensaje = document.createElement('p');
    mensaje.innerText = '¡Faltan campos por llenar!';
    mensaje.classList.add('error', 'p-3', 'mb-2', 'bg-danger', 'text-white', 'mt-2', 'text-center');
    document.querySelector('#campos').insertBefore(mensaje, document.querySelector('#btnEnviar'));

    setTimeout(() => {
        limpiarError();
    }, 2000);
}

function limpiarError() {
    const error = document.querySelector('p.error');
    if(error) { error.remove(); }
}

function calcularPrecio() {
    const valNombre = nombre.value;
    const valDestino = destino.value;
    const valNumDia = numDias.value;

    const totalPrecio = calcularTotalPrecio(valDestino, valNumDia);

    mostrarDatos(valNombre, valDestino, totalPrecio);
}

function calcularTotalPrecio(destino, dias) {
    let total = 0;
    switch (destino) {
        case "espania":
            total = (5000 * dias) * 1.15;
            break;
        case "eua":
            total = (3000 * dias) * 1.15;
            break;
        case "canada":
            total = (4000 * dias) * 1.15;
                break;
    }
    return total;
}

function mostrarDatos(nombre, destino, totalPrecio) {
    const datos = `<p>
                        Nombre: ${nombre} Destino: ${destino}  
                        Total: ${totalPrecio}
                   </p> 
    `;
    document.querySelector('#campos').insertBefore(datos, document.querySelector('#btnEnviar'));
}
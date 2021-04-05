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
    
}
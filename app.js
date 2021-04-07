//Botones|Acciones
const formulario = document.querySelector('#formulario');
const btnVerViajes = document.querySelector('#verViajes');
const resultado = document.querySelector('#resultado');
const listaViajes = document.querySelector('#lista-viajes');

//Variables
let viajes = [];

//Listeners
formulario.addEventListener('submit', calcularViaje);

btnVerViajes.addEventListener('click', listarViajes);

document.addEventListener('DOMContentLoaded', cargarViajes);

function cargarViajes() {
    viajes = JSON.parse(localStorage.getItem('viajes')) || []; //Si no hay nada en local storage dejarlo vacio
    listarViajes();
}

function listarViajes() {
    limpiarViajes();

    if(viajes.length > 0) { //Solo listar si tiene elementos el arreglo viajes

        viajes.forEach(viaje => {
            const viajeHTML = document.createElement('p');
            const detalleViaje = `Nombre: ${viaje.nombre} | Destino: ${viaje.destino} | Total: ${viaje.total}`;
            viajeHTML.innerHTML = detalleViaje;
            listaViajes.appendChild(viajeHTML);
        });
        
    }
}

function limpiarViajes() {
    while(listaViajes.firstChild) {
        listaViajes.removeChild(listaViajes.firstChild);
    }
}

function calcularViaje(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const destino = document.querySelector('#destino').value;
    const dias = parseInt(document.querySelector('#dias').value);

    if(nombre.value !== '' && dias.value !== '') { //Cuando los campos esten llenos
        limpiarError(); //Eliminar error si existe
        
        let viaje = {
            nombre,
            destino,
            dias,
            total: 0,
        }
    
        viaje = calcularTotalPrecio(viaje);
        console.log(viaje);
        mostrarDatos(viaje);
    
        //Almacenar en array y localStorage
        viajes = [...viajes, viaje];
        console.log(viajes);
        localStorage.setItem('viajes',JSON.stringify(viajes));

    } else {
        mostrarError(); 
    }
}

function mostrarError() {
    limpiarError(); //Si ya hay un error limpiarlo

    const mensaje = document.createElement('p');
    mensaje.innerText = '¡Faltan campos por llenar!';
    mensaje.classList.add('error', 'p-3', 'mb-2', 'bg-danger', 'text-white', 'mt-2', 'text-center');
    document.querySelector('#campos').insertBefore(mensaje, document.querySelector('#btnEnviar'));

    setTimeout(() => {
        limpiarError();
    }, 2000); //Mostrar error 2 segundos
}

function limpiarError() {
    const error = document.querySelector('p.error');
    if(error) { error.remove(); }
}

function calcularTotalPrecio(viaje) {
    switch (viaje.destino) {
        case "espania":
            viaje.destino = 'España';
            viaje.total = (5000 * viaje.dias) * 1.15;
            break;
        case "eua":
            viaje.destino = 'Estados Unidos';
            viaje.total = (3000 * viaje.dias) * 1.15;
            break;
        case "canada":
            viaje.destino = 'Canada';
            viaje.total = (4000 * viaje.dias) * 1.15;
                break;
    }
    return viaje;
}

function mostrarDatos(viaje) {
    const datos = `<p>
                        Nombre: ${viaje.nombre} <br> 
                        Destino: ${viaje.destino}  <br>
                        Total: $${viaje.total}
                   </p> 
    `;
    resultado.style.display = 'block';
    resultado.innerHTML = datos;

    setTimeout(() => {
        resultado.style.display = 'none';
    }, 3000);
}
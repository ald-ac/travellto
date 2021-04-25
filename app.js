//Botones|Acciones
const formulario = document.querySelector('#formulario');
const btnVerViajes = document.querySelector('#verViajes');
const resultado = document.querySelector('#resultado');
const listaViajes = document.querySelector('#lista-viajes');

//Variables
let viajes = [];

//Listeners
formulario.addEventListener('submit', calcularViaje);

btnVerViajes.addEventListener('click', mostrarOcultarViajes);

document.addEventListener('DOMContentLoaded', cargarViajes);

function cargarViajes() {
    viajes = JSON.parse(localStorage.getItem('viajes')) || []; //Si no hay nada en local storage dejarlo vacio
}

function mostrarOcultarViajes() {
    if(listaViajes.firstChild) { //Si ya estan mostrados en listaViajes
        limpiarViajes();
    } else {
        listarViajes();
    }
}

function listarViajes() {
    limpiarViajes();

    if(viajes.length > 0) { //Solo listar si tiene elementos el arreglo viajes

        viajes.forEach(viaje => {
            const viajeHTML = document.createElement('p');
            const detalleViaje = `Nombre: ${viaje.nombre} | Destino: ${viaje.destino} | Total: $${viaje.total}`;
            viajeHTML.innerHTML = detalleViaje;
            listaViajes.appendChild(viajeHTML);
        });
        //Agregar estilo cuando haya elementos
        listaViajes.classList.add('border', 'border-primary', 'p-2', 'mb-1');
    }
}

function limpiarViajes() {
    while(listaViajes.firstChild) {
        listaViajes.removeChild(listaViajes.firstChild);
    }
    //Evitar que se vea el estilo del listado cuando no hay elementos
    listaViajes.classList.remove('border', 'border-primary', 'p-2', 'mb-1'); 
}

function calcularViaje(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const destino = document.querySelector('#destino').value;
    const dias = parseInt(document.querySelector('#dias').value);

    if(nombre !== '' && !isNaN(dias)) { //Cuando el valor de los datos proporcionado no sean vacios/nulos
        limpiarError(); //Eliminar error si existe
        
        let viaje = new Viaje(nombre, destino, dias);
    
        //Llamar metodo para asignarle un total al viaje
        viaje.calcularTotalPrecio();
        mostrarDatos(viaje);
    
        //Almacenar en array y localStorage
        viajes = [...viajes, viaje];
        localStorage.setItem('viajes',JSON.stringify(viajes));

        if(listaViajes.firstChild) { //Si se estan mostrando los viajes en HTML, mostrar el nuevo agregado
            listarViajes();
        }

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

//Objeto y prototype
function Viaje(nombre, destino, dias) {
    this.nombre = nombre;
    this.destino = destino;
    this.dias = dias;
    this.total = 0;
}

Viaje.prototype.calcularTotalPrecio = function() {
    switch (this.destino) {
        case "espania":
            this.destino = 'España';
            this.total = ((5000 * this.dias) * 1.15).toFixed(2);
            break;
        case "eua":
            this.destino = 'Estados Unidos';
            this.total = ((3000 * this.dias) * 1.15).toFixed(2);
            break;
        case "canada":
            this.destino = 'Canada';
            this.total = ((4000 * this.dias) * 1.15).toFixed(2);
                break;
    }
}
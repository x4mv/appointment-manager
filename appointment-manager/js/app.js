// variables 
const formulario = document.querySelector('#nueva-cita');
const citasView = document.querySelector('#citas');
const nombreMascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput =document.querySelector('#sintomas');
const contenido = document.querySelector('#contenido');
const contenidoPadre = document.querySelector('.container');
const tituloAdministra = document.querySelector('#administra');

//clases 

class UI{

    mostrarAlerta(mensaje, tipo){

        const divAlerta = document.createElement('DIV');
        divAlerta.classList.add('text-center', 'alert');
        
        if (tipo === 'error'){
            divAlerta.classList.add('alert-danger');
        }

        contenidoPadre.insertBefore(divAlerta, contenido);
        divAlerta.textContent = mensaje;

        setTimeout(() =>{
            divAlerta.remove()
        },3000);
    }

    listarPacientes(arregloPacientes){
        this.limpiarHTML();

        if (arregloPacientes.length === 0){
            // eliminamos el h2 de administrar 
            tituloAdministra.style.display = 'none';
            // creando un nuevo li
            const h3 = document.createElement('H3');
            h3.textContent = 'No hay citas, comienza creando una';
            citasView.appendChild(h3);
            return;
        }
        tituloAdministra.style.display = '';

        arregloPacientes.forEach((paciente) => {

            const {nombreMascota, propietario , id } = paciente;

            // creando un nuevo li
            const li = document.createElement('LI');
            li.className = 'list-group-item d-flex justify-content-between align-items-center' ;

            // creando el HTML
            li.textContent = `${propietario}`;

            // Creando los botones 
            const eliminarBtn = document.createElement('button');
            eliminarBtn.classList.add("btn",  "btn-outline-danger");
            eliminarBtn.textContent = 'x';
            eliminarBtn.onclick = () => eliminarPacienteBtn(id) ;
            li.appendChild(eliminarBtn);

            const editarBtn = document.createElement('button');
            editarBtn.classList.add("btn", "btn-outline-primary")
            editarBtn.textContent = 'Editar';
            editarBtn.onclick= () => editarPacienteBtn(id);
            li.appendChild(editarBtn);

            // agregando a la vista
            citasView.appendChild(li);
        })
    }

    limpiarHTML(){

        while(citasView.firstChild){
            citasView.removeChild(citasView.firstChild);
        }
    }
}

class Paciente{
    constructor(nombreMascota, propietario, telefono,fecha,hora,sintomas,id){
        this.nombreMascota = nombreMascota;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha; 
        this.hora = hora;
        this.sintomas = sintomas;
        this.id = id;
        this.pacientes = [];
    }

    agregarPaciente(pacienteObj){
        this.pacientes = [...this.pacientes, pacienteObj];
        console.log(this.pacientes);
    }

    eliminarPaciente(id){
        this.pacientes = this.pacientes.filter((paciente) => paciente.id !== id );
        console.log(this.pacientes)
    }
}

// llamando las instancias 
const ui = new UI();
let pacienteNuevo;

// event listeners 

eventListeners();
function eventListeners(){

    window.addEventListener('DOMContentLoaded', () =>{


        pacienteNuevo = new Paciente();
        ui.listarPacientes(pacienteNuevo.pacientes)
        formulario.addEventListener('submit', crearCita);
    })
}

// funciones

function crearCita(e){
    e.preventDefault()
    
    // extraer los textos de los campos
    const nombreMascota = nombreMascotaInput.value;
    const propietario = propietarioInput.value;
    const telefono = telefonoInput.value;
    const fecha = fechaInput.value;
    const hora = horaInput.value;
    const sintomas = sintomasInput.value;
    const id = Date.now();
    
    // validar campos vacios
    if (nombreMascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    // 
    const paciente = { nombreMascota, propietario, telefono, fecha, hora, sintomas,id}

    pacienteNuevo.agregarPaciente(paciente)

    //extraer el arreglo de pacientes de la nueva instancia 
    const {pacientes} = pacienteNuevo;

    ui.listarPacientes(pacientes);

    formulario.reset();
    
    

}

function eliminarPacienteBtn(id){
    pacienteNuevo.eliminarPaciente(id);
    // extraemos la lista de los pacientes 
    const {pacientes} = pacienteNuevo;
    ui.listarPacientes(pacientes);
}

function editarPacienteBtn(id){
    console.log('editando...')
}
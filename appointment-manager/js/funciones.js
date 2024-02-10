import { pacienteNuevo, ui } from "./clases.js";

//variables
const formulario = document.querySelector('#nueva-cita');
const nombreMascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput =document.querySelector('#sintomas');
const agregarCitaBtn = document.querySelector('button[type="submit"]')


// funciones


// modelo de cita 
export let idVigente;

// modo edicion 
export let modoEdicion;
//clases 

export function crearCita(e){
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
    
    const paciente = { nombreMascota, propietario, telefono, fecha, hora, sintomas,id}

    // modo edicion 
    if (modoEdicion){

        const pacienteActualizado = { nombreMascota, propietario, telefono, fecha, hora, sintomas,idVigente}
        pacienteNuevo.editarCita(pacienteActualizado)
        ui.mostrarAlerta('Se ha editado correctamente', 'success');
        modoEdicion = false;
        
    }else{
        pacienteNuevo.agregarPaciente(paciente)
    }

    
    //extraer el arreglo de pacientes de la nueva instancia 
    const {pacientes} = pacienteNuevo;

    ui.listarPacientes(pacientes);

    formulario.reset();
    
    

}

export function eliminarPacienteBtn(id){
    pacienteNuevo.eliminarPaciente(id);
    // extraemos la lista de los pacientes 
    const {pacientes} = pacienteNuevo;
    ui.listarPacientes(pacientes);
}

export function editarPacienteBtn(cita){
    modoEdicion = true;

    const {nombreMascota, propietario, telefono,fecha, hora, sintomas, id} = cita;

    // llenando los inputs del formulario con los datos de la cita
    nombreMascotaInput.value = nombreMascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono; 
    fechaInput.value = fecha; 
    horaInput.value = hora; 
    sintomasInput.value = sintomas;

    //extraemos el id en el objeto de prueba
    idVigente = id;

    
    // cambiar el texto del boton de crear cita -> editar cita
    agregarCitaBtn.textContent = 'Editar Cita'

    agregarCitaBtn.addEventListener('click', () => agregarCitaBtn.textContent = 'Crear cita');
    

}
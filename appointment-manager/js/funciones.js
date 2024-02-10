import { pacienteNuevo, ui } from "./clases.js";

//variables
let DB;
const formulario = document.querySelector('#nueva-cita');
const nombreMascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput =document.querySelector('#sintomas');
const agregarCitaBtn = document.querySelector('button[type="submit"]')
const tituloAdministra = document.querySelector('#administra');
const citasView = document.querySelector('#citas');


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
    let id = Date.now();
    
    // validar campos vacios
    if (nombreMascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    
    const paciente = { nombreMascota, propietario, telefono, fecha, hora, sintomas,id}

    // modo edicion 
    if (modoEdicion){
        id = idVigente;
        const pacienteActualizado = { nombreMascota, propietario, telefono, fecha, hora, sintomas, id}
        
        
        
        // edita la cita en indexDB
        const transaction = DB.transaction(['AppointmentManager'], 'readwrite');
        const objectStore = transaction.objectStore('AppointmentManager')

        objectStore.put(pacienteActualizado);

        transaction.oncomplete = () => {
            ui.mostrarAlerta('Se ha editado correctamente', 'success');
            modoEdicion = false;
            
        
        }

        transaction.onerror = () => {
            ui.mostrarAlerta('Error al editar una cita', 'error')
        }
        
        
        
    }else{
        pacienteNuevo.agregarPaciente(paciente)

        // insertar cita a la bd de indexedDB
        const transaction = DB.transaction(['AppointmentManager'], 'readwrite');

        // habilitar el ObjStore
        const objectStore = transaction.objectStore('AppointmentManager');

        // agregar a la db 
        objectStore.add(paciente);

        transaction.oncomplete = function (){
            ui.mostrarAlerta('Se ha guardado correctamente', 'success');
            
        }

    }

    listarPacientes();

    formulario.reset();
    
    

}

export function eliminarPacienteBtn(id){
    //pacienteNuevo.eliminarPaciente(id);

    const transaction = DB.transaction(['AppointmentManager'], 'readwrite');
    const objectStore = transaction.objectStore('AppointmentManager');

    objectStore.delete(id);

    transaction.oncomplete = () => {
        ui.mostrarAlerta('La cita se ha eliminado correctamente', 'success');
        listarPacientes();
    }

    transaction.onerror  = () =>{
        console.log('Error al eliminar la cita')
    }
    
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


export function crearDB(){

    // crear la base de dartos version 1.0

    const crearDB = window.indexedDB.open('AppointmentManager', 1);

    // si hay un error 
    crearDB.onerror = function() {
        console.log('hubo un error')
    }

    // si sale bien
    crearDB.onsuccess = function () {
        console.log('DB creada')

        DB = crearDB.result;

        listarPacientes()
    }

    //crear el schema 
    crearDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('AppointmentManager', {
            keyPath: 'id',
            autoIncrement: true
        });

        // definir las columnas 

        objectStore.createIndex('mascota', 'mascota' , {unique: false});
        objectStore.createIndex('propietario', 'propietario' , {unique: false});
        objectStore.createIndex('telefono', 'telefono' , {unique: false});
        objectStore.createIndex('fecha', 'fecha' , {unique: false});
        objectStore.createIndex('hora', 'hora' , {unique: false});
        objectStore.createIndex('sintomas', 'sintomas' , {unique: false});
        objectStore.createIndex('id', 'id' , {unique: true});
        
    }
}


export function listarPacientes(){
    ui.limpiarHTML();


    
    const objectStore = DB.transaction('AppointmentManager').objectStore('AppointmentManager');

    const total = objectStore.count();
        total.onsuccess = function() {
            if (total.result === 0){
                // eliminamos el h2 de administrar 
                tituloAdministra.style.display = 'none';
                // creando un nuevo div
                const h3 = document.createElement('H3');
                h3.textContent = 'No hay citas, comienza creando una';
                citasView.appendChild(h3);
                return;
            }
            tituloAdministra.style.display = '';
        }

    objectStore.openCursor().onsuccess = function(e){
        
        
        const cursor = e.target.result;

        if (cursor){

            const {nombreMascota, propietario, telefono,fecha, hora, sintomas , id } = cursor.value;

            // creando un nuevo div
            const div = document.createElement('DIV');
            div.classList.add('cita', 'p-3');

            // creando el HTML
            const mascotaTitulo = document.createElement('h2');
            mascotaTitulo.classList.add('card-title', 'font-weight-bolder');
            mascotaTitulo.textContent = nombreMascota;

            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //agregarndo los parrafos al div
            div.appendChild(mascotaTitulo)
            div.appendChild(propietarioParrafo)
            div.appendChild(telefonoParrafo)
            div.appendChild(fechaParrafo)
            div.appendChild(horaParrafo)
            div.appendChild(sintomasParrafo)



            // Creando los botones 
            const eliminarBtn = document.createElement('button');
            eliminarBtn.classList.add("btn",  "btn-outline-danger");
            eliminarBtn.textContent = 'x';
            eliminarBtn.onclick = () => eliminarPacienteBtn(id) ;
            div.appendChild(eliminarBtn);

            const editarBtn = document.createElement('button');
            editarBtn.classList.add("btn", "btn-outline-primary")
            editarBtn.textContent = 'Editar';
            const cita = cursor.value;
            editarBtn.onclick= () => editarPacienteBtn(cita);
            div.appendChild(editarBtn);

            // agregando a la vista
            citasView.appendChild(div);

            
            cursor.continue()
        }

    }

    
}
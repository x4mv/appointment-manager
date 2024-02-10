// importaciones 
import { editarPacienteBtn, eliminarPacienteBtn } from "./funciones.js";

const citasView = document.querySelector('#citas');
const contenido = document.querySelector('#contenido');
const contenidoPadre = document.querySelector('.container');
const tituloAdministra = document.querySelector('#administra');

export class UI{

    mostrarAlerta(mensaje, tipo){

        const divAlerta = document.createElement('DIV');
        divAlerta.classList.add('text-center', 'alert');
        
        if (tipo === 'error'){
            divAlerta.classList.add('alert-danger');
        }else{
            divAlerta.classList.add('alert-success');
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
            // creando un nuevo div
            const h3 = document.createElement('H3');
            h3.textContent = 'No hay citas, comienza creando una';
            citasView.appendChild(h3);
            return;
        }
        tituloAdministra.style.display = '';

        arregloPacientes.forEach((paciente) => {

            const {nombreMascota, propietario, telefono,fecha, hora, sintomas , id } = paciente;

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
            editarBtn.onclick= () => editarPacienteBtn(paciente);
            div.appendChild(editarBtn);

            // agregando a la vista
            citasView.appendChild(div);
        })
    }

    limpiarHTML(){

        while(citasView.firstChild){
            citasView.removeChild(citasView.firstChild);
        }
    }
}

// llamando las instancias 
export const ui = new UI();



export class Paciente{
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

    editarCita(citaActualizada){
        this.pacientes = this.pacientes.map((cita) => cita.id === citaActualizada.idVigente ? citaActualizada : cita)
    }
}

// instancia de paciente nuevo 
export let pacienteNuevo;
pacienteNuevo = new Paciente();
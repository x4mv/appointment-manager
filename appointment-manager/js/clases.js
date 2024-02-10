// importaciones 

const citasView = document.querySelector('#citas');
const contenido = document.querySelector('#contenido');
const contenidoPadre = document.querySelector('.container');






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
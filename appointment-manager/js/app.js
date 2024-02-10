//imports 
import { pacienteNuevo, ui} from './clases.js' 
import { crearCita  } from './funciones.js';
// variables 
const formulario = document.querySelector('#nueva-cita');


// event listeners 

eventListeners();
function eventListeners(){

    window.addEventListener('DOMContentLoaded', () =>{


        ui.listarPacientes(pacienteNuevo.pacientes)
        formulario.addEventListener('submit', crearCita);
    })
}


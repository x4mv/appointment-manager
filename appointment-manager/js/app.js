//imports 
import { crearCita, listarPacientes, crearDB } from './funciones.js';
// variables 
const formulario = document.querySelector('#nueva-cita');




// event listeners 

eventListeners();
function eventListeners(){

    window.addEventListener('DOMContentLoaded', () =>{

        formulario.addEventListener('submit', crearCita);
        crearDB();
        

    })
}


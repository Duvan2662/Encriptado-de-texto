//Llamados al DOM
const textArea = document.querySelector('#texto');
const btnEncriptar = document.querySelector('#encriptar');
const btnDesencriptar = document.querySelector('#desencriptar');
const divResultado = document.querySelector('#resultado');

//Variables globales
const abecedario = "abcdefghijklmnopqrstuvwxyz"; //Me sirven para encriptar  y desencriptar
const llave = "nopqrstuvwxyzabcdefghijklm";//Me sirven para encriptar  y desencriptar
let textoGlobal = ''; // Variable que me ayuda a colocar los textos encriptados o desencriptados en el resultado
let cont = 0; //Me ayuda a que no se creen elementos en el html si el usuario envia un dato erroneo



//Evento de encriptar
btnEncriptar.addEventListener('click', () => {
    encriptar();
    if (cont!=0) {
        limpiarTextArea();
        limpiarDivMensaje();
        crearMensaje();
    }
})

//Evento de desencritar
btnDesencriptar.addEventListener('click', () => {
    if (cont!=0) {
        limpiarTextAreaResultado();
    }
    desencriptar();
    limpiarTextArea();
    limpiarDivMensaje();
    crearMensaje();
})



/**
* Funcion que me permite tomar un texto y encriptarlo 
*/
const encriptar = () => {
    const texto = textArea.value;

    // Verificar si el texto está vacío y cumple que este en minusculas y no tenga acentos
    if (!/^[a-z\s]+$/.test(texto)) {
        return alert('Verifique que el texto no este vacio o contenga letras mayusculas o acentos.');
    }

    cont ++;

    let textoEncriptado = texto.split('').map(letra => {
    const index = abecedario.indexOf(letra);
    return index !== -1 ? llave[index] : letra;
    }).join('');


    textoGlobal = textoEncriptado;
}


/**
* Funcion que limpia el text area donde el usuario digito el texto
*/
const limpiarTextArea = () => {
    textArea.value = '';
}


/**
* Funcion que elimina la imagen y los textos donde se va a mostrar el texto encriptado o desencriptado
*/
const limpiarDivMensaje = () => {
    divResultado.innerHTML = '';
}


/**
* Funcion que crea el text area y el boton donde se va a mostrar el texto encriptado o desencriptado
*/
const crearMensaje = () => {
    let textArea = document.createElement('textarea');
    let botonCopiar = document.createElement('button');

    textArea.id = 'resultado'; // ID del textarea
    textArea.value = textoGlobal; // Texto predefinido
    textArea.readOnly = true; // Hacer el textarea de solo lectura

    botonCopiar.className = 'btnPrincipal'; // Clase del botón
    botonCopiar.textContent = 'Copiar !'; // Texto del botón
    botonCopiar.id = 'copiar';

    divResultado.appendChild(textArea);
    divResultado.appendChild(botonCopiar);

    eventoCopiar(botonCopiar);
}


/**
* Funcion que aloja el evento del boton que copia el texto  
* @param {HTMLElement} boton Boton que al darle click va a copiar el texto del text area que aloja el resultado
*/
const eventoCopiar = (boton)  => {

    boton.addEventListener('click', async() => {
        try {
            await navigator.clipboard.writeText(textoGlobal);
            console.log('Texto copiado al portapapeles');
        } catch (err) {
                console.error('Error al copiar al portapapeles:', err);
            }
    })

}


/**
* Funcion que me permite tomar un texto y desencriptarlo 
*/
const desencriptar = () =>  {
    const texto = textArea.value;

    if (!/^[a-z\s]+$/.test(texto)) {
        return alert('Verifique que el texto no este vacio o contenga letras mayusculas o acentos.');
    }
    
    let textoDesencriptado = texto.split('').map(letra => {
        const index = llave.indexOf(letra);
        return index !== -1 ? abecedario[index] : letra; // Deja los espacios intactos
    }).join('');

    textoGlobal = textoDesencriptado;
}


/**
* Funcion que limpia el text area que aloja el resultado
*/
const limpiarTextAreaResultado = () => {
    const textResultado = document.querySelector('#resultado');
    textResultado.value = '';
}



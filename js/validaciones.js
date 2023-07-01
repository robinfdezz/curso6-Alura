export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = '';
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);

    }
}
const tipoDeErrores =  [
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError",
]
const mensajesDeError = {
    nombre: {
        valueMissing: 'Este campo nombre no puede estar vacio',
    },
    email: {
        valueMissing: 'Este campo email no puede estar vacio',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'Este campo password no puede estar vacio',
        patternMismatch: 'La contraseña está mal',
    },
    nacimiento: {
        valueMissing: 'Este campo nacimiento no puede estar vacio',
        customError: 'Debes tener al menos 18 anhos de edad',
    },
    numero: {
        valueMissing: 'Este campo numero no puede estar vacio',
        patternMismatch: 'Verifique la cantidad de numeros, buen animal',
    },
    direccion: {
        valueMissing: 'Este campo direccion no puede estar vacio',
        patternMismatch: 'Min: 10 letras, Max: 50',
    },
    ciudad: {
        valueMissing: 'Este campo direccion no puede estar vacio',
        patternMismatch: 'Min: 10 letras, Max: 50',
    },
    estado: {
        valueMissing: 'Este campo direccion no puede estar vacio',
        patternMismatch: 'Min: 10 letras, Max: 50',
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error])
        {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if(!mayorEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 anhos de edad.';
    }
    input.setCustomValidity(mensaje);
};

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}
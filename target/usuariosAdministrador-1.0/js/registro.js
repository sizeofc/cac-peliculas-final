document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const nameInput = form.querySelector('input[placeholder="Nombre"]');
    const lastNameInput = form.querySelector('input[placeholder="Apellido"]');
    const emailInput = form.querySelector('input[placeholder="Correo Electrónico"]');
    const passwordInput = form.querySelector('input[placeholder="Contraseña"]');
    const dateInput = form.querySelector('input[placeholder="Fecha (dd/mm/aaaa)"]');
    const countrySelect = form.querySelector('select');
    const termsCheckbox = form.querySelector('input[type="checkbox"]');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
        }
    });

    function validateForm() {
        let isValid = true;

        if (!nameInput.value.trim()) {
            setErrorFor(nameInput, 'Por favor, ingresa tu nombre');
            isValid = false;
        } else {
            setSuccessFor(nameInput);
        }

        if (!lastNameInput.value.trim()) {
            setErrorFor(lastNameInput, 'Por favor, ingresa tu apellido');
            isValid = false;
        } else {
            setSuccessFor(lastNameInput);
        }

        if (!emailInput.value.trim()) {
            setErrorFor(emailInput, 'Por favor, ingresa tu correo electrónico');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            setErrorFor(emailInput, 'El correo electrónico no es válido');
            isValid = false;
        } else {
            setSuccessFor(emailInput);
        }

        if (!passwordInput.value.trim()|| passwordInput.value.length<6) {
            setErrorFor(passwordInput, 'ingresa una contraseña valida, debe ser 6 caracteres minimo');
            isValid = false;
        } else {
            setSuccessFor(passwordInput);
        }

        if (!dateInput.value.trim()) {
            setErrorFor(dateInput, 'Por favor, ingresa tu fecha de nacimiento');
            isValid = false;
        } else {
            setSuccessFor(dateInput);
        }

        if (countrySelect.value === '') {
            setErrorFor(countrySelect, 'Por favor, selecciona tu país');
            isValid = false;
        } else {
            setSuccessFor(countrySelect);
        }

        if (!termsCheckbox.checked) {
            setErrorFor(termsCheckbox, 'Debes aceptar los términos y condiciones');
            isValid = false;
        } else {
            setSuccessFor(termsCheckbox);
        }

        return isValid;
    }

    function setErrorFor(input, message) {
        console.log(input);
        console.log(input.parentElement);
        const formControl = input.parentElement; // .form-control
        const small = formControl.querySelector('small');

        // Agregar mensaje de error
        small.innerText = message;

        // Agregar clase de error
        small.classList.add('error');
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement; // .form-control

        // Quitar clase de error
        formControl.querySelector('small').classList.remove('error');
    }

    function isValidEmail(email) {
        // Expresión regular para validar el formato del correo electrónico
        const re = /\S+@\S+\.\S+/;
        console.log(re.test(email));
        return re.test(email);
    }

    

    const container = document.getElementById('container');
    container.classList.add('active'); // Agrega la clase 'active' para iniciar la animación
});


document.getElementById('iniciar-sesion').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que la página se cambie inmediatamente
    document.getElementById('container').classList.add('slide-out');
    setTimeout(function() {
        window.location.href = 'iniciosesion.html'; // Redirige a la otra página después de  segundos
    }, 500);
});

window.addEventListener('pageshow', function(event) {
    document.getElementById('container').classList.remove('slide-out');
});
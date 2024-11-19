document.addEventListener("DOMContentLoaded", function () {

    // Elementos del DOM
    const contactButton = document.querySelector(".contact-button");
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".modal .close-btn");
    const contactForm = document.getElementById("contact-form");
    const emailInput = contactForm.querySelector("input[type='email']");
    const nameInput = contactForm.querySelector("input[type='text']");
    const messageInput = contactForm.querySelector("textarea");
    const errorMessages = contactForm.querySelectorAll(".error-message");
    const validationBox = document.querySelector(".validation-box");

    // Función para abrir el modal
    contactButton.addEventListener("click", function () {
        modal.classList.add("show");
    });

    // Función para cerrar el modal
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Cerrar el modal si se hace clic fuera de la caja de formulario
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Función para validar el formulario
    function validateForm() {
        let isValid = true;

        // Resetear errores
        errorMessages.forEach((error) => {
            error.style.display = "none";
        });
        
        // Limpiar validación anterior
        validationBox.innerHTML = `
            <ul>
                <li><span class="icon"></span> El nombre es obligatorio</li>
                <li><span class="icon"></span> El correo debe ser válido</li>
                <li><span class="icon"></span> El mensaje es obligatorio</li>
            </ul>
        `;

        // Validación de nombre
        if (nameInput.value.trim() === "") {
            isValid = false;
            showError(nameInput, "Este campo es obligatorio.", false);
        } else {
            showSuccess(nameInput, true);
        }

        // Validación de correo
        if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, "Por favor ingresa un correo electrónico válido.", false);
        } else {
            showSuccess(emailInput, true);
        }

        // Validación de mensaje
        if (messageInput.value.trim() === "") {
            isValid = false;
            showError(messageInput, "Este campo es obligatorio.", false);
        } else {
            showSuccess(messageInput, true);
        }

        return isValid;
    }

    // Función para mostrar los errores
    function showError(input, message, isValid) {
        const errorElement = input.nextElementSibling; // El elemento de error que sigue al input
        errorElement.textContent = message;
        errorElement.style.display = "block";
        input.classList.add('error');
        updateValidationBox(isValid, message);
    }

    // Función para mostrar los mensajes de éxito
    function showSuccess(input, isValid) {
        input.classList.remove('error');
        updateValidationBox(isValid, `${input.name} está correcto.`);
    }

    // Función para actualizar la caja de validación
    function updateValidationBox(isValid, message) {
        const icon = isValid ? '<span class="valid icon">✔</span>' : '<span class="invalid icon">✘</span>';
        const validationMessage = `<li>${icon} ${message}</li>`;
        validationBox.innerHTML = validationBox.innerHTML + validationMessage;
    }

    // Validación de correo electrónico
    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    // Enviar el formulario
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        if (validateForm()) {
            alert("Formulario enviado correctamente");
            modal.classList.remove("show");
            contactForm.reset(); // Limpiar los campos del formulario
        } else {
            alert("Por favor corrige los errores en el formulario.");
        }
    });

});

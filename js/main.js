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
        
        // Validación de nombre
        if (nameInput.value.trim() === "") {
            isValid = false;
            showError(nameInput, "Este campo es obligatorio.");
        }

        // Validación de correo
        if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, "Por favor ingresa un correo electrónico válido.");
        }

        // Validación de mensaje
        if (messageInput.value.trim() === "") {
            isValid = false;
            showError(messageInput, "Este campo es obligatorio.");
        }

        return isValid;
    }

    // Función para mostrar los errores
    function showError(input, message) {
        const errorElement = input.nextElementSibling; // El elemento de error que sigue al input
        errorElement.textContent = message;
        errorElement.style.display = "block";
        input.style.borderColor = "red"; // Cambiar el borde a rojo
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
